import { useState } from "react";

export default function RequestModal({
  service,
  onClose,
  onSubmit
}) {
  const [location, setLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  function handleFiles(event) {
    const selected = Array.from(event.target.files || []);

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png"
    ];

    const valid = selected.filter((file) => {
      return (
        allowedTypes.includes(file.type) &&
        file.size <= 5 * 1024 * 1024
      );
    });

    if (valid.length !== selected.length) {
      setError(
        "Only PDF, JPG and PNG files up to 5 MB are allowed."
      );
      event.target.value = "";
      return;
    }

    setError("");
    setFiles(valid);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!location.trim()) {
      setError("Please enter your service location.");
      return;
    }

    onSubmit({
      location,
      preferredDate,
      notes,
      documents: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    });
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="eyebrow">
              NEW SERVICE REQUEST
            </span>

            <h2>{service.name}</h2>
          </div>

          <button
            className="close-button"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-service-info">
          <span>Estimated time: {service.eta}</span>
          <strong>₹{service.fee} assistance charge</strong>
        </div>

        <div className="document-list">
          <strong>Documents commonly required:</strong>

          <ul>
            {service.documents.map((document, index) => (
              <li key={index}>{document}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Service location *
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city or area"
              required
            />
          </label>

          <label>
            Preferred assistance date
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              min={new Date().toLocaleDateString("en-CA")}
            />
          </label>

          <label>
            Additional information
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the assistance you need..."
              rows="3"
            />
          </label>

          <label>
            Select sample document attachments
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={handleFiles}
            />
          </label>

          {files.length > 0 && (
            <div className="selected-files">
              {files.map((file, index) => (
                <p key={index}>📎 {file.name}</p>
              ))}
            </div>
          )}

          <p className="upload-warning">
            Demo only: file contents are not uploaded or retained.
            Do not select real identity documents.
          </p>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}