import {
  Receipt,
  CheckCircle,
  Clock,
  IndianRupee,
  Download
} from "lucide-react";

import { useEffect, useState } from "react";

import "../css/therapistPayments.css";

function TherapistPayments() {

  const [payments, setPayments] = useState([]);
const [loading, setLoading] = useState(true);
const [packages, setPackages] = useState([]);
const [packageLoading, setPackageLoading] = useState(true);
const [showPackageForm, setShowPackageForm] = useState(false);
const [packageForm, setPackageForm] = useState({
  name: "",
  totalSessions: "",
  price: "",
  perSessionRate: "",
  validityDays: ""
});



async function downloadInvoice(paymentId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/payments/${paymentId}/invoice`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (!response.ok) {
      const data = await response.json();
      alert(data.message || "Failed to download invoice");
      return;
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${paymentId}.pdf`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.log("Invoice download error:", error);
  }
}

async function createPackage() {
  try {
    const token = localStorage.getItem("token");
    console.log("Sending package:", packageForm);

    const response = await fetch(
      "http://localhost:5000/packages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          name: packageForm.name,
          totalSessions: Number(packageForm.totalSessions),
          price: Number(packageForm.price),
          perSessionRate: Number(packageForm.perSessionRate),
          validityDays: Number(packageForm.validityDays)
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
  console.log("Package error:", data);
  alert(data.message || "Failed to create package");
  return;
}

    // Add newly created package to the current UI
    setPackages([...packages, data.package]);

    // Close form
    setShowPackageForm(false);

    // Clear form
    setPackageForm({
      name: "",
      totalSessions: "",
      price: "",
      perSessionRate: "",
      validityDays: ""
    });

  } catch (error) {
    console.log("Create package error:", error);
  }
}

useEffect(() => {
  async function getPackages() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/packages",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPackages(data);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log("Get packages error:", error);
    } finally {
      setPackageLoading(false);
    }
  }

  getPackages();
}, []);

useEffect(() => {
  async function getPayments() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/payments",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPayments(data);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log("Get payments error:", error);
    } finally {
      setLoading(false);
    }
  }

  getPayments();
}, []);

  return (
    <section className="therapistPayments">

      {/* HEADER */}
      <div className="therapistPaymentsHeader">
        <div>
          <h1>Payments & Billing</h1>
          <p>
            Manage payments, transactions and invoices.
          </p>
        </div>
      </div>


      {/* SUMMARY */}
      <div className="therapistPaymentSummary">

        <div className="therapistPaymentCard">
          <div className="therapistPaymentIcon">
            <IndianRupee size={21} />
          </div>

          <div>
            <span>Total Revenue</span>
            <strong>
  ₹{payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + payment.amount, 0)}
</strong>
            <small>This month</small>
          </div>
        </div>


        <div className="therapistPaymentCard">
          <div className="therapistPaymentIcon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Paid</span>
            <strong>
  ₹{payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + payment.amount, 0)}
</strong>
            <small>
  {payments.filter((payment) => payment.status === "paid").length} transactions
</small>
          </div>
        </div>


        <div className="therapistPaymentCard">
          <div className="therapistPaymentIcon">
            <Clock size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>
  ₹{payments
    .filter((payment) => payment.status === "pending")
    .reduce((total, payment) => total + payment.amount, 0)}
</strong>
            <small>
  {payments.filter((payment) => payment.status === "pending").length} transactions
</small>
          </div>
        </div>

      </div>

    {/* PACKAGES */}

<div className="therapistPackages">

  <div className="therapistPaymentSectionHeader">
    <div>
      <h2>Session Packages</h2>
      <p>Manage your available session packages</p>
    </div>
    <button
  className="createPackageButton"
  onClick={() => setShowPackageForm(true)}
>
  + Create Package
</button>
  </div>

  {showPackageForm && (
  <div className="packageForm">

    <h3>Create Package</h3>

    <input
  type="text"
  placeholder="Package name"
  value={packageForm.name}
  onChange={(e) =>
    setPackageForm({
      ...packageForm,
      name: e.target.value
    })
  }
/>

    <input
  type="number"
  placeholder="Total sessions"
  value={packageForm.totalSessions}
  onChange={(e) =>
    setPackageForm({
      ...packageForm,
      totalSessions: e.target.value
    })
  }
/>

    <input
  type="number"
  placeholder="Total price"
  value={packageForm.price}
  onChange={(e) =>
    setPackageForm({
      ...packageForm,
      price: e.target.value
    })
  }
/>

    <input
  type="number"
  placeholder="Per session rate"
  value={packageForm.perSessionRate}
  onChange={(e) =>
    setPackageForm({
      ...packageForm,
      perSessionRate: e.target.value
    })
  }
/>

    <input
  type="number"
  placeholder="Validity in days"
  value={packageForm.validityDays}
  onChange={(e) =>
    setPackageForm({
      ...packageForm,
      validityDays: e.target.value
    })
  }
/>

    <div>
      <button
        type="button"
        onClick={() => setShowPackageForm(false)}
      >
        Cancel
      </button>

      <button
  type="button"
  onClick={createPackage}
>
  Create
</button>
    </div>

  </div>
)}

  <div className="therapistPackageGrid">

  {packageLoading ? (
    <p>Loading packages...</p>
  ) : packages.length === 0 ? (
    <p>No packages available.</p>
  ) : (
    packages.map((pkg) => (
      <div
        className="therapistPackageCard"
        key={pkg._id}
      >
        <h3>{pkg.name}</h3>

        <strong>
          ₹{pkg.price}
        </strong>

        <p>
          ₹{pkg.perSessionRate} per session
        </p>

        <span>
          Valid for {pkg.validityDays} days
        </span>
      </div>
    ))
  )}

</div>

</div>

      {/* TRANSACTIONS */}
      <div className="therapistTransactions">

        <div className="therapistPaymentSectionHeader">
          <div>
            <h2>Payment History</h2>
            <p>Recent client transactions</p>
          </div>

          <button className="therapistDownloadButton">
            <Download size={16} />
            Download Report
          </button>
        </div>


        <div className="therapistTransactionsTable">

          <div className="therapistTransactionHeader">
            <span>Date</span>
            <span>Client</span>
            <span>Session</span>
            <span>Amount</span>
            <span>Status</span>
            <span></span>
          </div>


          {loading ? (
  <div className="paymentLoading">
    Loading payments...
  </div>
) : payments.length === 0 ? (
  <div className="paymentLoading">
    No payments yet.
  </div>
) : (
  payments.map((payment) => (
    <div
      className="therapistTransactionRow"
      key={payment._id}
    >

      <span>
        {new Date(payment.createdAt).toLocaleDateString()}
      </span>

      <div className="therapistClientName">
        <Receipt size={16} />

        <span>
          {payment.client?.name || "Unknown Client"}
        </span>
      </div>

      <span>
        {payment.session?.type || "Therapy Session"}
      </span>

      <strong>
        ₹{payment.amount}
      </strong>

      <span
        className={
          payment.status === "paid"
            ? "therapistPaidBadge"
            : "therapistPendingBadge"
        }
      >
        {payment.status}
      </span>

      <button
  className="therapistInvoiceButton"
  onClick={() => downloadInvoice(payment._id)}
>
  <Download size={16} />
</button>

    </div>
  ))
)}

        </div>

      </div>

    </section>
  );
}

export default TherapistPayments;