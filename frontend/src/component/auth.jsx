  /**const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Profile states
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Public profile states
  const [publicProfile, setPublicProfile] = useState(null);

  const [message, setMessage] = useState("");

  // Get slug from URL
  const slug = window.location.pathname.substring(1);

  // ---------------- PUBLIC PROFILE ----------------

  useEffect(() => {
    if (slug) {
      getPublicProfile();
    }
  }, [slug]);

  async function getPublicProfile() {
    try {
      const response = await fetch(
        `http://localhost:5000/${slug}`
      );

      const data = await response.json();

      if (response.ok) {
        setPublicProfile(data);
      } else {
        setMessage("Therapist not found");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error loading profile");
    }
  }

  // ---------------- REGISTER ----------------

  async function handleRegister(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
    });

    const data = await response.text();

    setMessage(data);

    console.log(data);
  }

  // ---------------- LOGIN ----------------

  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);

      setMessage("Login successful!");

      getProfile(data.token);
    } else {
      setMessage(data.message || "Login failed");
    }
  }

  // ---------------- GET PROFILE ----------------

  async function getProfile(token) {
    const response = await fetch("http://localhost:5000/profile", {
      method: "GET",
      headers: {
        Authorization: token
      }
    });

    const data = await response.json();

    if (response.ok) {
      setProfile(data);

      setName(data.name || "");
      setBio(data.bio || "");
    } else {
      setMessage("Could not get profile");
    }
  }

  // ---------------- UPDATE PROFILE ----------------

  async function updateProfile(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        name: name,
        bio: bio
      })
    });

    const data = await response.json();

    if (response.ok) {
      setProfile(data.therapist);

      setMessage("Profile updated successfully!");
    } else {
      setMessage("Profile update failed");
    }
  }

  // ---------------- PUBLIC PROFILE PAGE ----------------

  if (slug) {
    return (
      <div>
        <h1>Therapist Profile</h1>

        {message && <p>{message}</p>}

        {publicProfile && (
          <div>
            <h2>{publicProfile.name}</h2>

            <p>
              <strong>Bio:</strong>{" "}
              {publicProfile.bio || "No bio yet"}
            </p>

            <p>
              <strong>Slug:</strong>{" "}
              {publicProfile.slug}
            </p>

            <h3>Specializations</h3>

            {publicProfile.specializations &&
            publicProfile.specializations.length > 0 ? (
              <ul>
                {publicProfile.specializations.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            ) : (
              <p>No specializations added</p>
            )}

            <h3>Languages</h3>

            {publicProfile.languages &&
            publicProfile.languages.length > 0 ? (
              <ul>
                {publicProfile.languages.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            ) : (
              <p>No languages added</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // ---------------- DASHBOARD PAGE ----------------

  return (
    <div>
      <h1>Unfazed Therapist System</h1>*/

     // {/* REGISTER */}

      /*{!profile && (
        <>
          <h2>Register</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(event) =>
                setRegisterName(event.target.value)
              }
            />

            <br />

            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(event) =>
                setRegisterEmail(event.target.value)
              }
            />

            <br />

            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(event) =>
                setRegisterPassword(event.target.value)
              }
            />

            <br />

            <button type="submit">
              Register
            </button>
          </form>

          <hr />*/

          //{/* LOGIN */}

          /*<h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <br />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

            <br />

            <button type="submit">
              Login
            </button>
          </form>
        </>
      )}*/

      //{/* MESSAGE */}

      //<p>{message}</p>

      //{/* PROFILE */}

      /*{profile && (
        <>
          <h2>Your Profile</h2>

          <p>
            Name: {profile.name}
          </p>

          <p>
            Email: {profile.email}
          </p>

          <p>
            Bio: {profile.bio || "No bio yet"}
          </p>

          <p>
            Your public profile:
            {" "}
            http://localhost:5173/{profile.slug}
          </p>

          <hr />*/

          //{/* EDIT PROFILE */}

         /* <h2>Edit Profile</h2>

          <form onSubmit={updateProfile}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <br />

            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(event) =>
                setBio(event.target.value)
              }
            />

            <br />

            <button type="submit">
              Update Profile
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;  */