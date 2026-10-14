import { useState } from "react";
import ProfileCard from "../components/ProfileCard.jsx";

// Small SVG avatar so the demo works without any image files
function avatar(initials, bg) {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
    "<rect width='200' height='200' fill='" + bg + "'/>" +
    "<text x='100' y='122' font-family='Arial' font-size='72' font-weight='700' fill='white' text-anchor='middle'>" +
    initials + "</text></svg>";
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const people = [
  { name: "Prerna Shirke", role: "MCA Student", imageUrl: avatar("PS", "#0f7c82"), description: "Learning the MERN stack at MIT-WPU. Enjoys building small, useful web apps." },
  { name: "Aarav Mehta", role: "Frontend Developer", imageUrl: avatar("AM", "#7a4fd1"), description: "Builds accessible interfaces with React and cares a lot about clean components." },
  { name: "Sneha Kulkarni", role: "Backend Developer", imageUrl: avatar("SK", "#c2571a"), description: "Designs REST APIs with Node and Express and models data in MongoDB." },
];

export default function Assignment4() {
  const [custom, setCustom] = useState({ name: "", imageUrl: "", description: "" });
  const [list, setList] = useState(people);

  const onChange = (e) => setCustom({ ...custom, [e.target.name]: e.target.value });

  const addCard = (e) => {
    e.preventDefault();
    if (!custom.name.trim()) return;
    const initials = custom.name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    setList([
      ...list,
      {
        name: custom.name.trim(),
        role: "New member",
        imageUrl: custom.imageUrl.trim() || avatar(initials, "#2f6fb0"),
        description: custom.description.trim() || "No description yet.",
      },
    ]);
    setCustom({ name: "", imageUrl: "", description: "" });
  };

  return (
    <section>
      <h1>Profile Card using Props</h1>
      <p className="sub">One ProfileCard component, rendered once per person. Name, image URL and description are passed in as props.</p>

      <div className="cards">
        {list.map((p) => (
          <ProfileCard key={p.name} name={p.name} role={p.role} imageUrl={p.imageUrl} description={p.description} />
        ))}
      </div>

      <form className="panel" onSubmit={addCard}>
        <h2>Add your own card</h2>
        <label>Name<input name="name" value={custom.name} onChange={onChange} placeholder="Full name" /></label>
        <label>Image URL (optional)<input name="imageUrl" value={custom.imageUrl} onChange={onChange} placeholder="https://..." /></label>
        <label>Short description<input name="description" value={custom.description} onChange={onChange} placeholder="One line about you" /></label>
        <button type="submit">Add card</button>
      </form>
    </section>
  );
}
