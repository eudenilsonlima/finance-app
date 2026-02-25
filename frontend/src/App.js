import React from "react";
import Dashboard from "./pages/Dashboard";
import "./App.css"; // Mantenha se você tiver um arquivo CSS global

function App() {
  return (
    <div className="App">
      {/* O Dashboard agora é independente e busca seus próprios dados! */}
      <Dashboard />
    </div>
  );
}

export default App;
