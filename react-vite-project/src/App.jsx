import { useState } from "react";
import Assignment4 from "./pages/Assignment4.jsx";
import Assignment5 from "./pages/Assignment5.jsx";
import Assignment6 from "./pages/Assignment6.jsx";

const tabs = [
  { id: 4, label: "4 · Profile Card", Page: Assignment4 },
  { id: 5, label: "5 · Controlled Form", Page: Assignment5 },
  { id: 6, label: "6 · Counter", Page: Assignment6 },
];

export default function App() {
  const [active, setActive] = useState(4);
  const { Page } = tabs.find((t) => t.id === active);
  return (
    <div className="app">
      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={t.id === active ? "tab active" : "tab"} onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
      <Page />
    </div>
  );
}
