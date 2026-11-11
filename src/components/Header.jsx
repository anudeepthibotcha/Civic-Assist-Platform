export default function Header({ user, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="mobile-brand">
          <span className="brand-icon">C</span>
          CivicAssist
        </div>

        <div className="topbar-message">
          Public service assistance portal
        </div>
      </div>

      <div className="topbar-right">
        <span className="role-label">
          {user.role}
        </span>

        <div className="profile">
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}