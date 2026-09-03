import React from "react";

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">📦</span>
      <p className="empty-state-text">{message}</p>
    </div>
  );
}

export default EmptyState