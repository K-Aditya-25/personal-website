export default function PageIntro({ title, description, note }) {
  return (
    <header className="page-intro page-width">
      <div className="page-intro-copy">
        <p className="eyebrow">Aditya Kharbanda · Dublin</p>
        <h1 data-route-title>{title}</h1>
        <p className="page-intro-description" data-route-subtitle>{description}</p>
      </div>
      {note ? <p className="page-intro-note">{note}</p> : null}
    </header>
  );
}
