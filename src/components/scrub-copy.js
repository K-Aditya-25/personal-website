export default function ScrubCopy({ children, className = "" }) {
  const words = children.trim().split(/\s+/);
  return (
    <p className={`scrub-reveal ${className}`.trim()}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, index) => <span className="scrub-word" key={`${word}-${index}`}>{word}</span>)}
      </span>
    </p>
  );
}
