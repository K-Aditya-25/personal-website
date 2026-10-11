import Link from "next/link";
import { FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiHashnode, SiX } from "react-icons/si";
import { profile } from "../../content/site-data.mjs";

const socialIcons = {
  LinkedIn: FaLinkedinIn,
  Hashnode: SiHashnode,
  X: SiX,
  GitHub: SiGithub,
};

const siteLinks = [
  ["Writing", "/writing/"],
  ["Books", "/books/"],
  ["Competitions", "/competitions/"],
  ["Volunteering", "/volunteering/"],
  ["Courses", "/courses/"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta page-width">
        <div>
          <p className="eyebrow eyebrow-light">Keep in touch</p>
          <h2>Good things start with a conversation.</h2>
        </div>
        <a className="button button-lime" href={`mailto:${profile.email}`}>
          Say hello <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom page-width">
        <div className="footer-signoff">
          <Link className="footer-name" href="/">{profile.name}<span className="wordmark-period">.</span></Link>
          <p>Based in Dublin, Ireland.</p>
          <span className="footer-copyright">© {new Date().getFullYear()} {profile.name}</span>
        </div>
        <nav className="footer-site-links" aria-label="Explore the site">
          {siteLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <div className="footer-socials" aria-label="Find Aditya online">
          <span className="footer-social-heading">Elsewhere</span>
          <div className="social-icon-row">
            {profile.links.map(({ label, href }) => {
              const Icon = socialIcons[label];
              return (
                <a className="social-icon-link" href={href} key={label} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" focusable="false" />
                </a>
              );
            })}
            <a className="social-icon-link" href={`mailto:${profile.email}`} aria-label="Email">
              <FiMail aria-hidden="true" focusable="false" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
