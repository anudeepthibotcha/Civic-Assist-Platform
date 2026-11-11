export default function StatusBadge({ status }) {
  const classNames = {
    Submitted: "status-submitted",
    Pending: "status-submitted",
    Assigned: "status-assigned",
    "In Progress": "status-progress",
    "Documents Required": "status-documents",
    Completed: "status-completed",
    Verified: "status-completed",
    Rejected: "status-rejected"
  };

  return (
    <span
      className={`status-badge ${
        classNames[status] || ""
      }`}
    >
      {status}
    </span>
  );
}