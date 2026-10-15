import "@fontsource-variable/outfit";
import "../styles.css";
import PageMotion from "../components/page-motion";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata = {
  metadataBase: new URL("https://adityakharbanda.dev"),
  title: {
    default: "Aditya Kharbanda — Curiosity in motion",
    template: "%s | Aditya Kharbanda",
  },
  description:
    "The personal site of Aditya Kharbanda: technology, writing, badminton, books and community in Dublin.",
  openGraph: {
    type: "website",
    title: "Aditya Kharbanda — Curiosity in motion",
    description:
      "Technology, writing, badminton, books and community in Dublin.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="site-main overflow-x-hidden w-full max-w-full">
          <PageMotion>{children}</PageMotion>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
