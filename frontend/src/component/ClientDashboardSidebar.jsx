import {
  LayoutDashboard,
  CalendarDays,
  Search,
  MessagesSquare,
  CreditCard,
  Package,
  Bell,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

import "../css/clientDashboardSidebar.css";


function ClientDashboardSidebar({
  profile,
  onLogout,
  activePage,
  onPageChange
}) {

  const menuItems = [
    {
      name: "Overview",
      icon: LayoutDashboard
    },
    {
      name: "My Sessions",
      icon: CalendarDays
    },
    {
      name: "Find Therapist",
      icon: Search
    },
    {
      name: "Messages",
      icon: MessagesSquare,
      dot: true
    },
    {
      name: "Payments",
      icon: CreditCard
    },
    {
      name: "My Packages",
      icon: Package
    },
    {
  name: "Intake Form",
  icon: FileText
    },
    {
      name: "Notifications",
      icon: Bell,
      badge: "2"
    },
    {
      name: "Profile / Settings",
      icon: Settings
    }
  ];


  // Get initials
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "CL";


  return (

    <aside className="clientDashboardSidebar">


      {/* =================================
          LOGO
      ================================= */}

      <div className="clientSidebarLogo">

        <div className="clientLogoIcon">
          MB
        </div>

        <div>
          <strong>
            MindBridge
          </strong>

          <span>
            Client Portal
          </span>
        </div>

      </div>


      {/* =================================
          PROFILE
      ================================= */}

      <div className="clientSidebarProfile">

        <div className="clientProfileAvatar">
          {initials}
        </div>

        <div className="clientProfileInfo">

          <strong>
            {profile?.name || "Client"}
          </strong>

          <span>
            Client
          </span>

        </div>

      </div>


      {/* =================================
          NAVIGATION
      ================================= */}

      <nav className="clientSidebarNavigation">

        <p className="clientSidebarTitle">
          MENU
        </p>


        {menuItems.map((item) => {

          const Icon = item.icon;


          return (

            <button
              key={item.name}
              className={`clientSidebarMenuItem ${
                activePage === item.name
                  ? "clientSidebarMenuItemActive"
                  : ""
              }`}
              onClick={() =>
                onPageChange(item.name)
              }
            >

              <Icon size={19} />

              <span>
                {item.name}
              </span>


              {item.badge && (
                <span className="clientSidebarBadge">
                  {item.badge}
                </span>
              )}


              {item.dot && (
                <span className="clientSidebarDot"></span>
              )}

            </button>

          );

        })}

      </nav>


      {/* =================================
          LOGOUT
      ================================= */}

      <div className="clientSidebarBottom">

        <button
          className="clientSidebarLogout"
          onClick={onLogout}
        >

          <LogOut size={19} />

          <span>
            Logout
          </span>

        </button>

      </div>


    </aside>

  );

}


export default ClientDashboardSidebar;