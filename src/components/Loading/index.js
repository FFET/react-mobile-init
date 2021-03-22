/**
 * loading component
 */
export default function Loading({ text }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "#999",
        fontSize: "0.5rem",
      }}
    >
      {text || "Loading"}
    </div>
  );
}
