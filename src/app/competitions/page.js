import { FiArrowUpRight } from "react-icons/fi";
import { badminton, hackathons } from "../../../content/site-data.mjs";
import BadmintonRally from "../../components/badminton-rally";
import CompetitionCarousel from "../../components/competition-carousel";
import PageIntro from "../../components/page-intro";

export const metadata = {
  title: "Competitions",
  description: "Hackathons and badminton competitions Aditya Kharbanda has taken part in around Dublin.",
};

export default function CompetitionsPage() {
  return (
    <>
      <PageIntro title="A little friendly competition." description="Hackathons, badminton leagues and the teams I’ve been lucky to build and play with." />
      <section className="content-section page-width competition-page">
        <div className="competition-block">
          <div className="section-heading compact-heading">
            <div><p className="eyebrow">Build together</p><h2>Hackathons</h2></div>
            <p>Ideas take shape when a good team gets in a room.</p>
          </div>
          <div className="event-list">
            {hackathons.map((item) => (
              <article className="event-row hackathon-row" key={`${item.year}-${item.title}`}>
                <span className="event-year">{item.year}</span>
                <div className="event-main"><h3>{item.title}</h3><p>{item.detail || "Hackathon"}</p></div>
              </article>
            ))}
          </div>
        </div>

        <section className="badminton-section" aria-labelledby="badminton-title">
          <div className="section-heading compact-heading">
            <div><p className="eyebrow">On court, together</p><h2 id="badminton-title">Badminton</h2></div>
            <p>Men’s doubles in the Dublin District League. The best rallies reward anticipation and trust.</p>
          </div>
          <div className="badminton-feature">
            <BadmintonRally />
            <div className="badminton-copy">
              <p className="eyebrow">Sheriff Badminton Club</p>
              <h3>From Division 5 to Division 4.</h3>
              <p>Started with TCD in Division 5, and now competing in Division 4 with Sheriff Badminton Club.</p>
              <a className="text-link text-link-light" href="https://bi.tournamentsoftware.com/find" target="_blank" rel="noreferrer">
                Find a tournament <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="badminton-history">
            <div className="history-intro">
              <p className="eyebrow">A few seasons in play</p>
              <h3>The climb, one match at a time.</h3>
              <p>Division changes across the Dublin District League seasons.</p>
            </div>
            <CompetitionCarousel />
          </div>

          <div className="badminton-record" aria-label="Badminton league history">
            {badminton.map((entry) => (
              <article className="event-row" key={`${entry.year}-${entry.club}`}>
                <span className="event-year">{entry.year}</span>
                <div className="event-main"><h3>{entry.detail}</h3><p>{entry.club} · {entry.league}</p></div>
                <span className="event-mark" aria-hidden="true">Men’s doubles</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
