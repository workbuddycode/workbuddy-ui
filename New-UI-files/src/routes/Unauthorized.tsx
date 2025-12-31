export default function Unauthorized() {
  return (
    <div style={{ padding: 40 }}>
      <h2>❌ Unauthorized</h2>
      <p>You do not have permission to access this page.</p>
      <a href="/profile">Go Back</a>
    </div>
  );
}
