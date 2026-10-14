// Assignment 4: a reusable component. All data arrives through props.
export default function ProfileCard({ name, imageUrl, description, role }) {
  return (
    <article className="profile-card">
      <img className="avatar" src={imageUrl} alt={"Photo of " + name} />
      <h3>{name}</h3>
      {role && <p className="role">{role}</p>}
      <p className="desc">{description}</p>
    </article>
  );
}
