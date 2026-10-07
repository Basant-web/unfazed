const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("./models/Client");
const Session = require("./models/Session");
require("dotenv").config();
const availabilityRoutes = require("./routes/availabilityRoutes");

const Therapist = require("./models/Therapist");
const Availability = require("./models/Availability");
const Payment = require("./models/Payment");
const Package = require("./models/Package");
const generateInvoice = require("./utils/generateInvoice");

const auth = require("./middleware/auth");
const crypto = require("crypto");
const ClientPackage = require("./models/ClientPackage");


const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);

app.use("/api/availability", availabilityRoutes);
// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.send("MindBridge Backend is Running 🚀");
});


// ==========================================
// CREATE UNIQUE SLUG
// ==========================================

async function createUniqueSlug(name) {

  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");


  let slug = baseSlug;

  let counter = 1;


  while (await Therapist.findOne({ slug })) {

    counter++;

    slug = `${baseSlug}-${counter}`;

  }


  return slug;
}


// ==========================================
// REGISTER
// ==========================================

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (!["therapist", "client"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const therapistExists = await Therapist.findOne({
      email: normalizedEmail
    });

    const clientExists = await Client.findOne({
      email: normalizedEmail
    });

    if (therapistExists || clientExists) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // CLIENT
    if (role === "client") {
      const client = new Client({
        name,
        email: normalizedEmail,
        password_hash: hashedPassword,
        role: "client"
      });

      await client.save();

      return res.status(201).json({
        message: "Client registered successfully",
        role: "client"
      });
    }

    // THERAPIST
    const slug = await createUniqueSlug(name);

    const therapist = new Therapist({
      name,
      email: normalizedEmail,
      password_hash: hashedPassword,
      role: "therapist",
      slug
    });

    await therapist.save();

    return res.status(201).json({
      message: "Therapist registered successfully",
      role: "therapist"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});

// ==========================================
// LOGIN
// ==========================================

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    let user = await Therapist.findOne({
      email: normalizedEmail
    });

    let role = "therapist";

    if (!user) {
      user = await Client.findOne({
        email: normalizedEmail
      });

      role = "client";
    }

    if (!user) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      role
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});


// ==========================================
// GET PROFILE
// ==========================================

// ==========================================
// GET PROFILE
// ==========================================

app.get("/profile", auth, async (req, res) => {
  try {
    // Therapist profile
    if (req.userRole === "therapist") {
      const therapist = await Therapist.findById(req.userId)
        .select("-password_hash");

      if (!therapist) {
        return res.status(404).json({
          message: "Therapist not found"
        });
      }

      return res.json(therapist);
    }

    // Client profile
    if (req.userRole === "client") {
      const client = await Client.findById(req.userId)
        .select("-password_hash")
        .populate(
          "therapist",
          "name email bio specializations languages"
        );

      if (!client) {
        return res.status(404).json({
          message: "Client not found"
        });
      }

      return res.json(client);
    }

    return res.status(403).json({
      message: "Invalid user role"
    });

  } catch (error) {
    console.log("Profile error:", error);

    res.status(500).json({
      message: "Error getting profile"
    });
  }
});

app.get("/clients", auth, async (req, res) => {
  try {
    const clients = await Client.find({
      therapist: req.therapistId
    })
      .select("-password_hash")
      .sort({ createdAt: -1 });

    const clientsWithSessions = await Promise.all(
      clients.map(async (client) => {
        const sessions = await Session.find({
          client: client._id,
          therapist: req.therapistId,
          status: { $ne: "cancelled" }
        }).sort({ date: -1 });

        const lastSession =
          sessions.length > 0
            ? sessions[0].date
            : null;

        // Automatic tags
        const tags = [];

        if (client.status === "active") {
          tags.push({ name: "Active" });
        } else {
          tags.push({ name: "Inactive" });
        }

        if (client.intake?.presentingConcern) {
          tags.push({ name: "Intake Completed" });
        }

        const createdDate = new Date(client.createdAt);
        const currentDate = new Date();

        if (
          createdDate.getMonth() === currentDate.getMonth() &&
          createdDate.getFullYear() === currentDate.getFullYear()
        ) {
          tags.push({ name: "New Client" });
        }

        return {
          ...client.toObject(),
          sessions: sessions.length,
          lastSession,
          tags
        };
      })
    );

    res.json(clientsWithSessions);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error getting clients"
    });
  }
});


app.get("/clients/:clientId/sessions", auth, async (req, res) => {
  try {
    const sessions = await Session.find({
      client: req.params.clientId,
      therapist: req.therapistId
    }).sort({ date: -1 });

    res.json(sessions);
  } catch (error) {
    console.log("Get client sessions error:", error);

    res.status(500).json({
      message: "Error getting client sessions"
    });
  }
});

app.put("/clients/:clientId/tags", auth, async (req, res) => {
  try {
    const { tag } = req.body;

    if (!tag || !tag.trim()) {
      return res.status(400).json({
        message: "Tag is required"
      });
    }

    const client = await Client.findOne({
      _id: req.params.clientId,
      therapist: req.therapistId
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    const tagExists = client.tags.some(
      (item) =>
        item.name.toLowerCase() === tag.trim().toLowerCase()
    );

    if (tagExists) {
      return res.status(400).json({
        message: "Tag already exists"
      });
    }

    client.tags.push({
      name: tag.trim()
    });

    await client.save();

    res.json({
      message: "Tag added successfully",
      tags: client.tags
    });

  } catch (error) {
    console.log("Add tag error:", error);

    res.status(500).json({
      message: "Error adding tag"
    });
  }
});


// ==========================================
// UPDATE PROFILE
// ==========================================

app.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, phone, bio, specializations, languages } = req.body;

    // CLIENT
    if (req.userRole === "client") {
      const client = await Client.findById(req.userId);

      if (!client) {
        return res.status(404).json({
          message: "Client not found"
        });
      }

      if (name !== undefined) client.name = name;
      if (email !== undefined) client.email = email;
      if (phone !== undefined) client.phone = phone;

      await client.save();

      return res.json({
        message: "Profile updated successfully",
        user: {
          id: client._id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          role: client.role
        }
      });
    }

    // THERAPIST
    if (req.userRole === "therapist") {
      const therapist = await Therapist.findById(req.userId);

      if (!therapist) {
        return res.status(404).json({
          message: "Therapist not found"
        });
      }

      if (name !== undefined) therapist.name = name;
      if (email !== undefined) therapist.email = email;
      if (bio !== undefined) therapist.bio = bio;
      if (specializations !== undefined) {
        therapist.specializations = specializations;
      }
      if (languages !== undefined) {
        therapist.languages = languages;
      }

      await therapist.save();

      return res.json({
        message: "Profile updated successfully",
        user: therapist
      });
    }

    return res.status(403).json({
      message: "Invalid user role"
    });

  } catch (error) {
    console.log("Profile update error:", error);

    // Duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Error updating profile"
    });
  }
});

app.put("/clients/:clientId/assign", auth, async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    client.therapist = req.therapistId;
    client.assignedAt = new Date();

    await client.save();

    res.json({
      message: "Client assigned successfully",
      client
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error assigning client"
    });
  }
});


app.get("/clients/unassigned", auth, async (req, res) => {
  try {
    const clients = await Client.find({
      therapist: null
    })
      .select("-password_hash")
      .sort({ createdAt: -1 });

    res.json(clients);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error getting unassigned clients"
    });
  }
});

app.post("/sessions", auth, async (req, res) => {
  try {
    const {
      therapistId,
      date,
      startTime,
      endTime,
      duration,
      type
    } = req.body;

    // Only clients can book sessions
    if (req.userRole !== "client") {
      return res.status(403).json({
        message: "Only clients can book sessions"
      });
    }

    if (!therapistId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Therapist, date, start time and end time are required"
      });
    }

    // Logged-in client comes from JWT
    const client = await Client.findById(req.userId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    // Make sure therapist exists
    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({
        message: "Therapist not found"
      });
    }

    // Check if this exact slot is already booked
    const existingSession = await Session.findOne({
      therapist: therapistId,
      date: new Date(`${date}T00:00:00`),
      startTime: startTime,
      status: { $ne: "cancelled" }
    });

    if (existingSession) {
      return res.status(409).json({
        message: "This time slot is already booked"
      });
    }

    // Create booking
    const session = new Session({
      therapist: therapistId,
      client: req.userId,
      date: new Date(`${date}T00:00:00`),
      startTime,
      endTime,
      duration: duration || 60,
      type: type || "Therapy Session"
    });

    await session.save();

    res.status(201).json({
      message: "Session booked successfully",
      session
    });

  } catch (error) {
    console.log("Booking error:", error);

    res.status(500).json({
      message: "Error booking session"
    });
  }
});

app.get("/sessions", auth, async (req, res) => {
  try {
    const sessions = await Session.find({
      therapist: req.therapistId
    })
      .populate("client", "name email phone")
      .sort({ date: 1 });

    res.json(sessions);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error getting sessions"
    });
  }
});

app.get("/payments", auth, async (req, res) => {
  try {
    const payments = await Payment.find({
      therapist: req.therapistId
    })
      .populate("client", "name email")
      .populate("session")
      .sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {
    console.log("Get payments error:", error);

    res.status(500).json({
      message: "Error getting payments"
    });
  }
});



app.get("/therapists", async (req, res) => {
  try {
    const therapists = await Therapist.find()
      .select("-password_hash");

    res.json(therapists);

  } catch (error) {
    console.log("Get therapists error:", error);

    res.status(500).json({
      message: "Error getting therapists"
    });
  }
});

app.put("/clients/assign-therapist/:therapistId", auth, async (req, res) => {
  try {
    // Only clients can assign themselves to a therapist
    if (req.userRole !== "client") {
      return res.status(403).json({
        message: "Only clients can assign a therapist"
      });
    }

    // Find therapist
    const therapist = await Therapist.findById(
      req.params.therapistId
    );

    if (!therapist) {
      return res.status(404).json({
        message: "Therapist not found"
      });
    }

    // Find logged-in client
    const client = await Client.findById(req.userId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    // Assign therapist
    client.therapist = therapist._id;
    client.assignedAt = new Date();

    await client.save();

    // Return updated client
    const updatedClient = await Client.findById(client._id)
      .select("-password_hash")
      .populate(
        "therapist",
        "name email bio specializations languages"
      );

    res.json({
      message: "Therapist assigned successfully",
      client: updatedClient
    });

  } catch (error) {
    console.log("Assign therapist error:", error);

    res.status(500).json({
      message: "Error assigning therapist"
    });
  }
});

app.put("/clients/intake", auth, async (req, res) => {
  try {
    // Only logged-in clients can submit their intake
    if (req.userRole !== "client") {
      return res.status(403).json({
        message: "Only clients can submit intake"
      });
    }

    const {
      dateOfBirth,
      gender,
      presentingConcern,
      history,
      consent
    } = req.body;

    if (!consent) {
      return res.status(400).json({
        message: "Consent is required"
      });
    }

    const client = await Client.findById(req.userId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    client.intake = {
      dateOfBirth,
      gender,
      presentingConcern,
      history
    };

    client.consent = {
      given: true,
      givenAt: new Date()
    };

    await client.save();

    res.json({
      message: "Intake submitted successfully"
    });

  } catch (error) {
    console.log("Intake submission error:", error);

    res.status(500).json({
      message: "Error submitting intake"
    });
  }
});

// ==========================================
// PUBLIC THERAPIST PROFILE
// ==========================================

app.get(
  "/:slug",
  async (req, res) => {

    try {

      const therapist =
        await Therapist.findOne({

          slug:
            req.params.slug,

          role:
            "therapist"

        });


      if (!therapist) {

        return res.status(404).send(

          "Therapist not found"

        );

      }


      const title =
        `${therapist.name} | Therapist`;


      const description =
        therapist.bio ||
        "Professional therapist profile";


      const url =
        `http://localhost:5000/${therapist.slug}`;


      res.send(`

<!DOCTYPE html>

<html>

<head>

  <title>
    ${title}
  </title>

  <meta
    name="description"
    content="${description}"
  />

  <meta
    property="og:title"
    content="${title}"
  />

  <meta
    property="og:description"
    content="${description}"
  />

  <meta
    property="og:url"
    content="${url}"
  />

  <meta
    property="og:type"
    content="profile"
  />

</head>


<body>

  <h1>
    ${therapist.name}
  </h1>

  <p>
    ${description}
  </p>

  <p>
    Public therapist profile
  </p>

</body>

</html>

      `);

    } catch (error) {

      console.log(
        "Public profile error:",
        error
      );


      res.status(500).send(

        "Error getting therapist profile"

      );

    }

  }
);


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB connected"
    );

  })

  .catch((error) => {

    console.log(
      "MongoDB connection error:",
      error
    );

  });


// ==========================================
// START SERVER
// ==========================================

/*app.post("/payments/create-order", auth, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required"
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      order
    });

  } catch (error) {
    console.log("Create Razorpay order error:", error);

    res.status(500).json({
      message: "Error creating payment order"
    });
  }
});*/

app.get("/payments/:paymentId/invoice", auth, async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.paymentId,
      therapist: req.userId
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    const invoicePath = generateInvoice(payment);

    res.download(invoicePath, `invoice_${payment._id}.pdf`);

  } catch (error) {
    console.log("Invoice download error:", error);

    res.status(500).json({
      message: "Error downloading invoice"
    });
  }
});

app.post("/payments/test-success", auth, async (req, res) => {
  try {
    const { clientId, sessionId, amount } = req.body;

    if (!clientId || !amount) {
      return res.status(400).json({
        message: "Client and amount are required"
      });
    }

    const platformFee = amount * 0.05;
    const netAmount = amount - platformFee;

    const payment = await Payment.create({
  therapist: req.userId,
  client: clientId,
  session: sessionId || undefined,
  amount,
  gateway_transaction_id: "TEST_" + Date.now(),
  platform_fee: platformFee,
  net_amount: amount - platformFee,
  status: "paid"
});

const invoicePath = generateInvoice(payment);

res.status(201).json({
  message: "Test payment successful",
  payment,
  invoicePath
});

  } catch (error) {
    console.log("Test payment error:", error);

    res.status(500).json({
      message: "Error creating test payment"
    });
  }
});

app.get("/packages", auth, async (req, res) => {
  try {
    const packages = await Package.find({
      therapist: req.therapistId,
      isActive: true
    }).sort({ totalSessions: 1 });

    res.json(packages);

  } catch (error) {
    console.log("Get packages error:", error);

    res.status(500).json({
      message: "Error getting packages"
    });
  }
});

app.post("/packages", auth, async (req, res) => {
  try {
    const {
      name,
      totalSessions,
      price,
      perSessionRate,
      validityDays
    } = req.body;

    if (
      !name ||
      !totalSessions ||
      !price ||
      !perSessionRate ||
      !validityDays
    ) {
      return res.status(400).json({
        message: "All package fields are required"
      });
    }

    const packageData = await Package.create({
      therapist: req.userId,
      name,
      totalSessions,
      price,
      perSessionRate,
      validityDays
    });

    res.status(201).json({
      message: "Package created successfully",
      package: packageData
    });

  } catch (error) {
    console.log("Create package error:", error);

    res.status(500).json({
      message: "Error creating package"
    });
  }
});

app.post("/payments/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];

    if (!signature) {
      return res.status(400).json({
        message: "Webhook signature missing"
      });
    }

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_WEBHOOK_SECRET
      )
      .update(req.rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({
        message: "Invalid webhook signature"
      });
    }

    const event = req.body;

    console.log("Razorpay webhook received:", event.event);

    if (event.event === "payment.captured") {
  const paymentId =
    event.payload.payment.entity.notes?.paymentId;

  if (paymentId) {
    await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: "paid",
        gateway_transaction_id:
          event.payload.payment.entity.id
      }
    );

    console.log("Payment marked as paid");
  }
}

if (event.event === "payment.failed") {
  const paymentId =
    event.payload.payment.entity.notes?.paymentId;

  if (paymentId) {
    await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: "failed",
        gateway_transaction_id:
          event.payload.payment.entity.id
      }
    );

    console.log("Payment marked as failed");
  }
}

    res.status(200).json({
      message: "Webhook received"
    });

  } catch (error) {
    console.log("Webhook error:", error);

    res.status(500).json({
      message: "Webhook processing failed"
    });
  }
});


app.post("/client-packages", auth, async (req, res) => {
  try {
    const { clientId, packageId } = req.body;

    if (!clientId || !packageId) {
      return res.status(400).json({
        message: "Client and package are required"
      });
    }

    const packageData = await Package.findOne({
      _id: packageId,
      therapist: req.userId,
      isActive: true
    });

    if (!packageData) {
      return res.status(404).json({
        message: "Package not found"
      });
    }

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() + packageData.validityDays
    );

    const clientPackage = await ClientPackage.create({
      client: clientId,
      therapist: req.userId,
      package: packageData._id,
      totalSessions: packageData.totalSessions,
      remainingSessions: packageData.totalSessions,
      purchasedAt: new Date(),
      expiresAt,
      status: "active"
    });

    res.status(201).json({
      message: "Package purchased successfully",
      clientPackage
    });

  } catch (error) {
    console.log("Purchase package error:", error);

    res.status(500).json({
      message: "Error purchasing package"
    });
  }
});

app.get("/client-packages", auth, async (req, res) => {
  try {
    const clientPackages = await ClientPackage.find({
      client: req.userId
    })
      .populate("package")
      .populate("therapist", "name");

    res.json(clientPackages);

  } catch (error) {
    console.log("Get client packages error:", error);

    res.status(500).json({
      message: "Error getting client packages"
    });
  }
});

app.listen(
  5000,
  () => {

    console.log(
      "Server running on port 5000"
    );

  }
);