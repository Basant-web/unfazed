import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Save,
  Camera,
  ShieldCheck,
  Bell,
  Video
} from "lucide-react";

import "../css/clientProfile.css";

function ClientProfile({ profile }) {
  const [name, setName] = useState(profile?.name || "Basant");
  const [email, setEmail] = useState(profile?.email || "client@example.com");
  const [phone, setPhone] = useState(profile?.phone || "");

  const [notifications, setNotifications] = useState(true);
  const [sessionReminder, setSessionReminder] = useState(true);
  const [messageNotification, setMessageNotification] = useState(true);

  async function handleSave(event) {
  event.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        name,
        email,
        phone
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update profile");
      return;
    }

    alert("Profile changes saved successfully!");

  } catch (error) {
    console.error("Profile update error:", error);
    alert("Server error. Please try again.");
  }
}

  return (
    <section className="clientProfileSection">

      {/* Header */}
      <div className="clientProfileHeader">
        <div>
          <p className="clientProfileEyebrow">
            ACCOUNT
          </p>

          <h1>Profile / Settings</h1>

          <p>
            Manage your personal information and account preferences.
          </p>
        </div>
      </div>

      <div className="clientProfileLayout">

        {/* Left Profile Card */}
        <div className="clientProfileSideCard">

          <div className="clientProfileAvatarLarge">
            {name
              ? name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "CL"}
          </div>

          <button className="clientChangePhotoButton">
            <Camera size={15} />
            Change Photo
          </button>

          <h2>{name || "Client"}</h2>

          <p className="clientProfileRole">
            Client
          </p>

          <div className="clientProfileVerified">
            <ShieldCheck size={16} />
            Verified Account
          </div>

          <div className="clientProfileSideInfo">
            <div>
              <span>Member since</span>
              <strong>August 2026</strong>
            </div>

            <div>
              <span>Sessions completed</span>
              <strong>12 sessions</strong>
            </div>
          </div>

        </div>

        {/* Right Content */}
        <div className="clientProfileMain">

          {/* Personal Information */}
          <div className="clientProfileCard">

            <div className="clientProfileCardHeader">
              <div>
                <h2>Personal Information</h2>
                <p>
                  Update your basic account information.
                </p>
              </div>

              <UserRound size={21} />
            </div>

            <form onSubmit={handleSave}>

              <div className="clientProfileFormGrid">

                <div className="clientProfileInputGroup">
                  <label>Full Name</label>

                  <div className="clientProfileInputWrapper">
                    <UserRound size={17} />

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="clientProfileInputGroup">
                  <label>Email Address</label>

                  <div className="clientProfileInputWrapper">
                    <Mail size={17} />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="clientProfileInputGroup">
                  <label>Phone Number</label>

                  <div className="clientProfileInputWrapper">
                    <Phone size={17} />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="clientProfileInputGroup">
                  <label>Account Type</label>

                  <div className="clientProfileInputWrapper clientProfileDisabled">
                    <UserRound size={17} />

                    <input
                      type="text"
                      value="Client"
                      disabled
                      readOnly
                    />
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="clientSaveProfileButton"
              >
                <Save size={17} />
                Save Changes
              </button>

            </form>
          </div>

          {/* Password */}
          <div className="clientProfileCard">

            <div className="clientProfileCardHeader">
              <div>
                <h2>Password & Security</h2>
                <p>
                  Keep your account secure with a strong password.
                </p>
              </div>

              <Lock size={21} />
            </div>

            <button className="clientChangePasswordButton">
              <Lock size={17} />
              Change Password
            </button>

          </div>

          {/* Notification Preferences */}
          <div className="clientProfileCard">

            <div className="clientProfileCardHeader">
              <div>
                <h2>Notification Preferences</h2>
                <p>
                  Choose which notifications you want to receive.
                </p>
              </div>

              <Bell size={21} />
            </div>

            <div className="clientSettingsList">

              <div className="clientSettingRow">

                <div className="clientSettingIcon">
                  <Bell size={18} />
                </div>

                <div className="clientSettingText">
                  <strong>Push Notifications</strong>
                  <span>
                    Receive important account updates.
                  </span>
                </div>

                <button type="button"
                  className={`clientToggle ${
                    notifications
                      ? "clientToggleActive"
                      : ""
                  }`}
                  onClick={() =>
                    setNotifications(!notifications)
                  }
                >
                  <span></span>
                </button>

              </div>

              <div className="clientSettingRow">

                <div className="clientSettingIcon">
                  <Video size={18} />
                </div>

                <div className="clientSettingText">
                  <strong>Session Reminders</strong>
                  <span>
                    Get reminders before your therapy sessions.
                  </span>
                </div>

                <button type="button"
                  className={`clientToggle ${
                    sessionReminder
                      ? "clientToggleActive"
                      : ""
                  }`}
                  onClick={() =>
                    setSessionReminder(!sessionReminder)
                  }
                >
                  <span></span>
                </button>

              </div>

              <div className="clientSettingRow">

                <div className="clientSettingIcon">
                  <Mail size={18} />
                </div>

                <div className="clientSettingText">
                  <strong>Message Notifications</strong>
                  <span>
                    Get notified when your therapist messages you.
                  </span>
                </div>

                <button type="button"
                  className={`clientToggle ${
                    messageNotification
                      ? "clientToggleActive"
                      : ""
                  }`}
                  onClick={() =>
                    setMessageNotification(
                      !messageNotification
                    )
                  }
                >
                  <span></span>
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

export default ClientProfile;