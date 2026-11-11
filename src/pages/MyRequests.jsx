import StatusBadge from "../components/StatusBadge";

const statusSteps = [
  "Submitted",
  "Assigned",
  "In Progress",
  "Documents Required",
  "Completed"
];

export default function MyRequests({ requests }) {
  if (requests.length === 0) {
    return (
      <div className="page-content">
        <div className="page-heading">
          <h1>My Service Requests</h1>
          <p>Track your certificate assistance applications.</p>
        </div>

        <div className="empty-state">
          <span>📁</span>
          <h3>No requests available</h3>
          <p>Browse services to create your first request.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <span className="eyebrow">REQUEST HISTORY</span>
        <h1>My Service Requests</h1>
        <p>View and monitor the progress of your applications.</p>
      </div>

      <div className="request-list">
        {requests.map((request) => {
          const currentIndex = statusSteps.indexOf(request.status);

          return (
            <div className="request-card" key={request.id}>
              <div className="request-card-top">
                <div>
                  <span className="reference-number">
                    {request.id}
                  </span>

                  <h3>{request.serviceName}</h3>

                  <small>
                    Submitted on {request.createdAt}
                  </small>
                </div>

                <StatusBadge status={request.status} />
              </div>

              <div className="request-details">
                <div>
                  <small>Service location</small>
                  <strong>{request.location}</strong>
                </div>

                <div>
                  <small>Assigned agent</small>
                  <strong>{request.agent || "Not assigned"}</strong>
                </div>

                <div>
                  <small>Assistance charge</small>
                  <strong>₹{request.assistanceFee}</strong>
                </div>
              </div>

              {request.status === "Rejected" ? (
                <p className="form-error">
                  This request was declined in the demo workflow.
                  Please contact the platform administrator.
                </p>
              ) : (
                <div className="timeline">
                  {statusSteps.map((step, index) => (
                    <div
                      key={step}
                      className={
                        currentIndex >= index
                          ? "timeline-step done"
                          : "timeline-step"
                      }
                    >
                      <div className="timeline-dot">
                        {currentIndex > index ? "✓" : index + 1}
                      </div>

                      <small>{step}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}