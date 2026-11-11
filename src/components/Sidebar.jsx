const navigation = {
  citizen: [
    { id: "dashboard", icon: "⌂", label: "Dashboard" },
    { id: "services", icon: "▦", label: "Browse Services" },
    { id: "my-requests", icon: "▤", label: "My Requests" }
  ],

  agent: [
    { id: "agent", icon: "▣", label: "Agent Dashboard" }
  ],

  admin: [
    { id: "admin", icon: "⌂", label: "Overview" },
    { id: "requests", icon: "▤", label: "All Requests" },
    { id: "agents", icon: "♙", label: "Manage Agents" },
    { id: "admin-services", icon: "▦", label: "Manage Services" }
  ]
};

export default function Sidebar({
  user,
  activePage,
  onNavigate
}) {
  const items = navigation[user.role] || [];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">C</div>

        <div>
          <h2>CivicAssist</h2>
          <span>Service Portal</span>
        </div>
      </div>

      <div className="sidebar-heading">
        MAIN MENU
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={
              activePage === item.id
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">
              {item.icon}
            </span>

            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <strong>Need assistance?</strong>

          <p>
            Contact our support team for help with your service requests.
          </p>

          <span>Support: support@civicassist.demo</span>
        </div>

        <div className="independent-label">
          Independent service assistance platform
        </div>
      </div>
    </aside>
  );
}