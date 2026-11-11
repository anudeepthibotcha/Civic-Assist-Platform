export default function ServiceCard({
  service,
  onRequest
}) {
  return (
    <div className="service-card">
      <div className="service-icon">
        {service.icon}
      </div>

      <span className="category-label">
        {service.category}
      </span>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <div className="service-information">
        <div>
          <small>Estimated time</small>
          <strong>{service.eta}</strong>
        </div>

        <div>
          <small>Assistance charge</small>
          <strong>₹{service.fee}</strong>
        </div>
      </div>

      <button
        className="primary-button full-button"
        onClick={() => onRequest(service)}
      >
        Request Assistance
        <span>→</span>
      </button>

      <small className="fee-note">
        Illustrative assistance charge only.
      </small>
    </div>
  );
}