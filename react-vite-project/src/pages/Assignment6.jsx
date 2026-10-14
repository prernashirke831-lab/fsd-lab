import { useState } from "react";

export default function Assignment6() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <section>
      <h1>Counter App using useState</h1>
      <p className="sub">The count lives in state. Each click calls the setter and React re-renders the number.</p>

      <div className="panel counter">
        <div className={"count " + (count > 0 ? "pos" : count < 0 ? "neg" : "")} aria-live="polite">{count}</div>
        <div className="btn-row">
          <button onClick={() => setCount(count - step)}>Decrement</button>
          <button className="ghost" onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + step)}>Increment</button>
        </div>
        <label className="step">Step size
          <select value={step} onChange={(e) => setStep(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
    </section>
  );
}
