import { useState } from "react";

const initial = { name: "", email: "", age: "", gender: "", course: "MCA", bio: "", subscribe: false };

export default function Assignment5() {
  // Controlled form: React state is the single source of truth for every input
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const rows = [
    ["Name", form.name],
    ["Email", form.email],
    ["Age", form.age],
    ["Gender", form.gender],
    ["Course", form.course],
    ["About", form.bio],
    ["Newsletter", form.subscribe ? "Yes" : "No"],
  ];

  return (
    <section>
      <h1>Controlled Form</h1>
      <p className="sub">Type in any field and the data appears below instantly.</p>

      <form className="panel" onSubmit={(e) => e.preventDefault()}>
        <label>Name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
        </label>
        <label>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </label>
        <label>Age
          <input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} />
        </label>

        <fieldset>
          <legend>Gender</legend>
          {["Female", "Male", "Other"].map((g) => (
            <label key={g} className="inline">
              <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} /> {g}
            </label>
          ))}
        </fieldset>

        <label>Course
          <select name="course" value={form.course} onChange={handleChange}>
            <option>MCA</option>
            <option>MBA</option>
            <option>B.Tech</option>
            <option>BCA</option>
          </select>
        </label>
        <label>About you
          <textarea name="bio" rows="3" value={form.bio} onChange={handleChange} placeholder="A few words about yourself" />
        </label>
        <label className="inline">
          <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} /> Send me the newsletter
        </label>
        <button type="button" className="ghost" onClick={() => setForm(initial)}>Clear form</button>
      </form>

      <div className="panel live" aria-live="polite">
        <h2>Live data</h2>
        <dl>
          {rows.map(([k, v]) => (
            <div key={k} className="row">
              <dt>{k}</dt>
              <dd>{v === "" ? <span className="empty">not entered</span> : v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
