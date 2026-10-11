import { FiArrowUpRight } from "react-icons/fi";
import { certificates } from "../../../content/site-data.mjs";
import PageIntro from "../../components/page-intro";

export const metadata = {
  title: "Courses",
  description: "Courses and Coursera certificates completed by Aditya Kharbanda.",
};

export default function CoursesPage() {
  return (
    <>
      <PageIntro title="A practice of learning." description="A record of courses and specializations in machine learning, deep learning and generative AI." />
      <section className="content-section page-width course-page">
        <div className="course-intro">
          <p className="eyebrow">Coursera certificates</p>
          <h2>Foundations, then further in.</h2>
          <p>Five courses and specializations, completed between 2024 and 2025.</p>
        </div>
        <ol className="certificate-list">
          {certificates.map(({ href, label, completed }, index) => (
            <li className="certificate-row" key={href}>
              <span className="certificate-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="certificate-copy"><h3>{label}</h3><p>Completed {completed}</p></div>
              <a className="certificate-link" href={href} target="_blank" rel="noreferrer" aria-label={`Open certificate: ${label}`}><FiArrowUpRight aria-hidden="true" /></a>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
