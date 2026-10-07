import {
  PieChart,
  CalendarDays,
  Users,
  FilePenLine,
  Receipt,
  Package,
  MessagesSquare,
  Bell,
  ChartNoAxesCombined,
  Crown,
  Settings,
  LogOut
} from "lucide-react";

import "../css/dashboardSidebar.css";


function DashboardSidebar({ profile, onLogout,
  activePage,
  onPageChange }) {

  const menuItems = [
    {
      name: "Overview",
      icon: PieChart,
    },
    {
      name: "Calendar / Schedule",
      icon: CalendarDays,
      badge: "3 Today",
      badgeType: "today"
    },
    {
      name: "Clients",
      icon: Users,
      badge: "18",
      badgeType: "count"
    },
    {
      name: "Notes (SOAP/DAP)",
      icon: FilePenLine
    },
    {
      name: "Payments & Billing",
      icon: Receipt
    },
    {
      name: "Packages",
      icon: Package
    },
    {
      name: "Messages",
      icon: MessagesSquare,
      dot: true
    },
    {
      name: "Notifications",
      icon: Bell,
      badge: "3",
      badgeType: "notification"
    },
    {
      name: "Analytics",
      icon: ChartNoAxesCombined
    },
    {
      name: "Subscription / Upgrade",
      icon: Crown
    },
    {
      name: "Profile / Settings",
      icon: Settings
    }
  ];


  return (

    <aside className="dashboardSidebar">

      {/* =================================
          PROFILE HEADER
      ================================= */}

      <div className="sidebarProfile">

        <div className="profileAvatar">

          {profile?.name
            ? profile.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "SJ"
          }

        </div>


        <div className="profileInfo">

          <h2>
            {profile?.name || "Dr. Sarah Jenkins"}
          </h2>

          <p>
            NPI: #188201992
          </p>

          <div className="practiceTier">

            <span></span>

            Pro Practice Tier

          </div>

        </div>

      </div>


      {/* =================================
          DIVIDER
      ================================= */}

      <div className="sidebarDivider"></div>


      {/* =================================
          MENU
      ================================= */}

      <nav className="sidebarMenu">

        {menuItems.map((item, index) => {

          const Icon = item.icon;

          return (

            <button
              key={index}
  className={`sidebarMenuItem ${
    activePage === item.name
      ? "sidebarMenuItemActive"
      : ""
  }`}
  onClick={() => onPageChange(item.name)}
            >

              <Icon className="sidebarIcon" />

              <span className="sidebarMenuText">
                {item.name}
              </span>


              {/* TODAY BADGE */}

              {item.badgeType === "today" && (

                <span className="sidebarBadge todayBadge">
                  {item.badge}
                </span>

              )}


              {/* CLIENT COUNT */}

              {item.badgeType === "count" && (

                <span className="sidebarBadge countBadge">
                  {item.badge}
                </span>

              )}


              {/* NOTIFICATION */}

              {item.badgeType === "notification" && (

                <span className="sidebarBadge notificationBadge">
                  {item.badge}
                </span>

              )}


              {/* MESSAGE DOT */}

              {item.dot && (

                <span className="messageDot"></span>

              )}

            </button>

          );

        })}

      </nav>


      {/* =================================
          LOGOUT
      ================================= */}

      <button
        className="sidebarLogout"
        onClick={onLogout}
      >

        <LogOut className="logoutIcon" />

        <span>
          Logout
        </span>

      </button>

    </aside>

  );

}


export default DashboardSidebar;