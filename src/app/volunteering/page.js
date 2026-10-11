import Image from "next/image";
import { volunteering } from "../../../content/site-data.mjs";
import PageIntro from "../../components/page-intro";

export const metadata = {
  title: "Volunteering",
  description: "Event work, creative support and time spent helping people connect in Dublin.",
};

export default function VolunteeringPage() {
  return (
    <>
      <PageIntro title="Make room for people." description="Event work, creative support and time spent helping people connect in Dublin." />
      <section className="content-section page-width volunteer-page">
        {volunteering.map((item, index) => (
          <article className={`volunteer-entry${index % 2 ? " volunteer-entry-reverse" : ""}`} key={item.title}>
            <div className="volunteer-copy">
              <p className="eyebrow">{index === 0 ? "Events and storytelling" : "Campus and community"}</p>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
            <div className="volunteer-photo-wrap">
              <Image className="volunteer-photo motion-image" src={item.image} alt={item.imageAlt} fill sizes="(max-width: 760px) 100vw, 60vw" unoptimized />
              <span className="photo-caption">{item.imageNote}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
