
import StatusBadge from "../components/StatusBadge";

const nextStatus = {
  Assigned: "In Progress",
  "In Progress": "Documents Required",
  "Documents Required": "Completed"
};

export default function AgentDashboard({
  user,
  agent,
  requests,
  onUpdate
}) {

  // Check agent verification status.
  if (!agent || agent.status !== "Verified") {
    const rejected = agent?.status === "Rejected";

    return (
      <div className="page-content">
        <div className="page-heading">
          <span className="eyebrow">AGENT ONBOARDING</span>
          <h1>Welcome, {user.name}</h1>
        </div>

        <div className="verification-card">
          <div className="verification-icon">
            {rejected ? "⚠️" : "⌛"}
          </div>

          <h2>
            {rejected
              ? "Registration Not Approved"
              : "Verification Pending"}
          </h2>

          <p>
            {rejected
              ? "Your agent registration was not approved. Please contact the platform administrator."
              : "Your agent registration has been submitted. An administrator must approve your profile before you can accept service requests."}
          </p>

          <StatusBadge
            status={rejected ? "Rejected" : "Pending"}
          />
        </div>
      </div>
    );
  }

  // Get requests assigned to this agent
  // and requests that are available for acceptance.

  const myTasks = requests.filter(
    (request) =>
      request.agent === user.name ||
      request.status === "Submitted"
  );

  // Calculate assigned requests.

  const accepted = requests.filter(
    (request) => request.agent === user.name
  );

  // Calculate completed requests.

  const completed = accepted.filter(
    (request) => request.status === "Completed"
  );

  // Calculate available requests.

  const available = myTasks.filter(
    (request) => request.status === "Submitted"
  );

  return (
    <div className="page-content">

      {/* Dashboard Heading */}

      <div className="page-heading">
        <span className="eyebrow">SERVICE AGENT PORTAL</span>

        <h1>Welcome, {user.name}</h1>

        <p>
          Manage your assigned service requests and update progress.
        </p>
      </div>

      {/* Agent Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">▤</div>

          <span>Total Assigned</span>

          <h2>{accepted.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◷</div>

          <span>Available Requests</span>

          <h2>{available.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>

          <span>Completed</span>

          <h2>{completed.length}</h2>
        </div>

      </div>

      {/* Request Management */}

      <div className="section-heading">
        <div>
          <h2>Manage Service Requests</h2>

          <p>
            Accept available jobs and manage your assigned jobs.
          </p>
        </div>
      </div>

      <div className="request-list">

        {myTasks.map((request) => (

          <div className="request-card" key={request.id}>

            <div className="request-card-top">

              <div>
                <span className="reference-number">
                  {request.id}
                </span>

                <h3>{request.serviceName}</h3>

                <small>
                  Citizen: {request.citizen}
                </small>
              </div>

              <StatusBadge status={request.status} />

            </div>

            {/* Request Details */}

            <div className="request-details">

              <div>
                <small>Service location</small>

                <strong>{request.location}</strong>
              </div>

              <div>
                <small>Submitted date</small>

                <strong>{request.createdAt}</strong>
              </div>

              <div>
                <small>Assistance charge</small>

                <strong>₹{request.assistanceFee}</strong>
              </div>

            </div>

            {/* Accept or Reject Request */}

            {request.status === "Submitted" ? (

              <div className="request-actions">

                <button
                  className="primary-button"
                  onClick={() =>
                    onUpdate(request.id, "Assigned")
                  }
                >
                  Accept Request
                </button>

                <button
                  className="danger-button"
                  onClick={() =>
                    onUpdate(request.id, "Rejected")
                  }
                >
                  Decline
                </button>

              </div>

            ) : (

              /* Update Request Progress */

              nextStatus[request.status] && (

                <div className="request-actions">

                  <button
                    className="primary-button"
                    onClick={() =>
                      onUpdate(
                        request.id,
                        nextStatus[request.status]
                      )
                    }
                  >
                    Update to {nextStatus[request.status]}
                  </button>

                </div>
              )

            )}

          </div>

        ))}

        {/* Empty State */}

        {myTasks.length === 0 && (

          <div className="empty-state">
            <span>📋</span>

            <h3>No active requests</h3>

            <p>New requests will appear here.</p>
          </div>

        )}

      </div>

      {/* Agent Responsibility */}

      <div className="information-banner">

        <strong>Agent responsibility</strong>

        <p>
          Follow applicable government procedures, communicate
          transparently with citizens and handle all personal
          documentation securely through authorized systems.
        </p>

      </div>

    </div>
  );
}
