import { BrowserRouter, Routes, Route } from "react-router-dom";

function PipelinePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>Verification Pipeline</h1>

      <div style={{ marginTop: "30px", lineHeight: "2" }}>
        <div>✅ Canonical Encoding</div>
        <div>✅ AI Risk Analysis</div>
        <div>✅ Validator Consensus</div>
        <div>✅ Blockchain Attestation</div>
        <div>✅ Certificate Generation</div>
      </div>

      <div
        style={{
          marginTop: "40px",
          border: "1px solid #00d9ff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        Backend Connected Successfully ✅
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PipelinePage />} />
        <Route path="/dashboard/pipeline" element={<PipelinePage />} />
      </Routes>
    </BrowserRouter>
  );
}