import StatusBadge from "../components/StatusBadge";

export default function CitizenDashboard({
  user,
  requests,
  services,
  onBrowse,
  onTrack
}) {
  const myRequests = requests.filter(
    (request) => request.email === user.email
  );

  const completed = myRequests.filter(
    (request) => request.status === "Completed"
  ).length;

  const pending = myRequests.filter(
    (request) =>
      !["Completed", "Rejected"].includes(request.status)
  ).length;

  return (
    <div className="page-content">
      <div className="welcome-banner">
        <div>
          <span className="eyebrow light-eyebrow">
            CITIZEN DASHBOARD
          </span>

          <h1>Welcome back, {user.name}!</h1>

          <p>
            What government service assistance do you need today?
          </p>

          <button
            className="welcome-button"
            onClick={onBrowse}
          >
            Explore Services →
          </button>
        </div>

        <div className="welcome-decoration">
          🏛️
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">▤</div>
          <span>Total Requests</span>
          <h2>{myRequests.length}</h2>
          <small>All submitted requests</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◷</div>
          <span>Active Requests</span>
          <h2>{pending}</h2>
          <small>Requests being processed</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <span>Completed</span>
          <h2>{completed}</h2>
          <small>Successfully completed requests</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">▦</div>
          <span>Available Services</span>
          <h2>{services.length}</h2>
          <small>Service categories</small>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>Popular Services</h2>
          <p>Find assistance for your government documentation.</p>
        </div>

        <button className="text-button" onClick={onBrowse}>
          View all services →
        </button>
      </div>

      <div className="mini-service-grid">
        {services.slice(0, 3).map((service) => (
          <div className="mini-service" key={service.id}>
            <span>{service.icon}</span>
            <strong>{service.name}</strong>
            <small>From ₹{service.fee}</small>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <h2>Recent Requests</h2>
          <p>Keep track of your latest applications.</p>
        </div>

        <button
          className="text-button"
          onClick={onTrack}
        >
          View all →
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Reference ID</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {myRequests.slice(0, 5).map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.serviceName}</td>
                <td>{request.createdAt}</td>
                <td>
                  <StatusBadge status={request.status} />
                </td>
              </tr>
            ))}

            {myRequests.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-cell">
                  No requests submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}