export default function HeaderMessage({ text }) {
  return (
    <div className="header-message text-center mb-4 d-flex align-items-center justify-content-center bg-body-secondary">
      <h1 className="display-4" style={{ color: "#ff6543" }}>
        {text}
      </h1>
    </div>
  );
}
