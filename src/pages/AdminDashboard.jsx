import StatusBadge from "../components/StatusBadge";

export default function AdminDashboard({
  activePage,
  requests,
  agents,
  services,
  citizens,
  onApproveAgent,
  onUpdateService,
  onUpdateRequest
}) {
  const verifiedAgents = agents.filter(
    (agent) => agent.status === "Verified"
  );

  const pendingAgents = agents.filter(
    (agent) => agent.status === "Pending"
  );

  const completed = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  const completionRate = requests.length
    ? Math.round((completed / requests.length) * 100)
    : 0;

  if (activePage === "agents") {
    return (
      <div className="page-content">
        <div className="page-heading">
          <span className="eyebrow">AGENT MANAGEMENT</span>
          <h1>Manage Service Agents</h1>
          <p>Review applications and manage agent verification.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Verified Agents</span>
            <h2>{verifiedAgents.length}</h2>
          </div>

          <div className="stat-card">
            <span>Pending Approvals</span>
            <h2>{pendingAgents.length}</h2>
          </div>
        </div>

        <div className="request-list">
          {agents.map((agent) => (
            <div className="request-card" key={agent.id}>
              <div className="request-card-top">
                <div>
                  <h3>{agent.name}</h3>
                  <small>{agent.email}</small>
                </div>

                <StatusBadge status={ agent.status }/>
              </div>

              <div className="request-details">
                <div>
                  <small>Phone</small>
                  <strong>{agent.phone}</strong>
                </div>

                <div>
                  <small>Service area</small>
                  <strong>{agent.area}</strong>
                </div>
              </div>

              {agent.status === "Pending" && (
                <div className="request-actions">
                  <button
                    className="primary-button"
                    onClick={() =>
                      onApproveAgent(agent.id, "Verified")
                    }
                  >
                    Approve Agent
                  </button>

                  <button
                    className="danger-button"
                    onClick={() =>
                      onApproveAgent(agent.id, "Rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activePage === "admin-services") {
    return (
      <div className="page-content">
        <div className="page-heading">
          <span className="eyebrow">SERVICE CONFIGURATION</span>
          <h1>Manage Services</h1>
          <p>Review the service catalogue and update illustrative charges.</p>
        </div>

        <div className="service-admin-list">
          {services.map((service) => (
            <div className="admin-service-row" key={service.id}>
              <div className="admin-service-name">
                <span>{service.icon}</span>

                <div>
                  <strong>{service.name}</strong>
                  <small>{service.category}</small>
                </div>
              </div>

              <div className="price-edit">
                <label htmlFor={`price-${service.id}`}>
                  Assistance charge (₹)
                </label>

                <input
                  id={`price-${service.id}`}
                  type="number"
                  min="0"
                  defaultValue={service.fee}
                  onChange={(e) => {
                    e.target.dataset.newFee = e.target.value;
                  }}
                />

                <button
                  className="primary-button"
                  onClick={(e) => {
                    const input = e.currentTarget.parentElement.querySelector(
                      "input"
                    );

                    const value = Number(input.value);

                    if (
                      Number.isFinite(value) &&
                      value >= 0
                    ) {
                      onUpdateService(service.id, value);
                      input.dataset.newFee = "";
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="information-banner">
          <strong>Pricing guidelines</strong>
          <p>
            These are illustrative platform assistance charges.
            Government fees must be displayed separately and
            verified against official sources.
          </p>
        </div>
      </div>
    );
  }

  if (activePage === "requests") {
    return (
      <div className="page-content">
        <div className="page-heading">
          <span className="eyebrow">REQUEST MONITORING</span>
          <h1>All Service Requests</h1>
          <p>Monitor requests submitted by registered citizens.</p>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Citizen</th>
                <th>Service</th>
                <th>Agent</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.citizen}</td>
                  <td>{request.serviceName}</td>
                  <td>{request.agent || "Unassigned"}</td>
                  <td>
                    <StatusBadge status={request.status} />
                  </td>
                  <td>{request.location}</td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-cell">
                    No service requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <span className="eyebrow">PLATFORM ADMINISTRATION</span>
        <h1>Admin Dashboard</h1>
        <p>Monitor service delivery and platform activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">♙</div>
          <span>Registered Citizens</span>
          <h2>{citizens.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <span>Verified Agents</span>
          <h2>{verifiedAgents.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">▤</div>
          <span>Total Requests</span>
          <h2>{requests.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">◷</div>
          <span>Completion Rate</span>
          <h2>{completionRate}%</h2>
        </div>
      </div>

      <div className="admin-overview-grid">
        <div className="content-panel">
          <div className="section-heading">
            <div>
              <h2>Recent Requests</h2>
              <p>Latest platform activity</p>
            </div>
          </div>

          {requests.slice(0, 5).map((request) => (
            <div className="activity-item" key={request.id}>
              <div className="activity-dot"></div>

              <div>
                <strong>{request.serviceName}</strong>

                <small>
                  {request.citizen} · {request.id}
                </small>
              </div>

              <StatusBadge status={request.status} />
            </div>
          ))}
        </div>

        <div className="content-panel">
          <h2>Agent Verification</h2>
          <p className="muted-text">
            Agents waiting for approval
          </p>

          <div className="admin-number">
            {pendingAgents.length}
          </div>

          <p>Pending agent applications</p>

          <div className="admin-number">
            {verifiedAgents.length}
          </div>

          <p>Verified agents</p>
        </div>
      </div>

      <div className="information-banner">
        <strong>Analytics note</strong>
        <p>
          Dashboard statistics are calculated using the demonstration
          data stored in this browser.
        </p>
      </div>
    </div>
  );
}