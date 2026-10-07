import {
  Bell,
  CalendarDays,
  MessageCircle,
  CreditCard,
  CheckCircle,
  Clock,
  X,
  CheckCheck
} from "lucide-react";

import "../css/clientNotifications.css";

function ClientNotifications() {
  const notifications = [
    {
      id: 1,
      type: "session",
      title: "Upcoming therapy session",
      text: "Your session with Dr. Sarah Sharma is scheduled for September 4 at 10:00 AM.",
      time: "10 minutes ago",
      unread: true
    },
    {
      id: 2,
      type: "message",
      title: "New message from Dr. Sarah Sharma",
      text: "Please remember to complete the reflection exercise before our next session.",
      time: "1 hour ago",
      unread: true
    },
    {
      id: 3,
      type: "payment",
      title: "Payment received",
      text: "Your payment of ₹1,500 for the therapy session was successfully processed.",
      time: "Yesterday",
      unread: false
    },
    {
      id: 4,
      type: "reminder",
      title: "Session reminder",
      text: "Your therapy session starts tomorrow at 10:00 AM.",
      time: "Yesterday",
      unread: false
    },
    {
      id: 5,
      type: "success",
      title: "Package activated",
      text: "Your Personal Growth package has been successfully activated.",
      time: "2 days ago",
      unread: false
    }
  ];

  function getIcon(type) {
    if (type === "session") {
      return <CalendarDays size={19} />;
    }

    if (type === "message") {
      return <MessageCircle size={19} />;
    }

    if (type === "payment") {
      return <CreditCard size={19} />;
    }

    if (type === "reminder") {
      return <Clock size={19} />;
    }

    return <CheckCircle size={19} />;
  }

  return (
    <section className="clientNotificationsSection">

      {/* Header */}
      <div className="clientNotificationsHeader">
        <div>
          <p className="clientNotificationsEyebrow">
            UPDATES
          </p>

          <h1>Notifications</h1>

          <p>
            Stay updated with your sessions, messages and account activity.
          </p>
        </div>

        <button className="clientMarkAllButton">
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      {/* Summary */}
      <div className="clientNotificationSummary">

        <div className="clientNotificationSummaryIcon">
          <Bell size={22} />
        </div>

        <div>
          <strong>You have 2 unread notifications</strong>
          <span>
            Review your latest updates below.
          </span>
        </div>

      </div>

      {/* Notification List */}
      <div className="clientNotificationsCard">

        <div className="clientNotificationsCardHeader">
          <div>
            <h2>Recent Notifications</h2>
            <p>Your latest activity and updates.</p>
          </div>

          <span className="clientNotificationCount">
            5
          </span>
        </div>

        <div className="clientNotificationList">

          {notifications.map((notification) => (
            <div
              className={`clientNotificationItem ${
                notification.unread
                  ? "clientNotificationUnread"
                  : ""
              }`}
              key={notification.id}
            >

              {/* Icon */}
              <div
                className={`clientNotificationIcon clientNotificationIcon-${notification.type}`}
              >
                {getIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="clientNotificationContent">

                <div className="clientNotificationTitleRow">

                  <h3>{notification.title}</h3>

                  {notification.unread && (
                    <span className="clientUnreadDot"></span>
                  )}

                </div>

                <p>{notification.text}</p>

                <span className="clientNotificationTime">
                  {notification.time}
                </span>

              </div>

              {/* Close */}
              <button className="clientNotificationRemove">
                <X size={17} />
              </button>

            </div>
          ))}

        </div>

      </div>

      {/* Empty State / Bottom */}
      <div className="clientNotificationsFooter">

        <CheckCircle size={19} />

        <span>
          You're all caught up with your recent notifications.
        </span>

      </div>

    </section>
  );
}

export default ClientNotifications;