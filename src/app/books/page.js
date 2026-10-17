import { permanentRedirect } from "next/navigation";

export default function BooksRedirectPage() {
  permanentRedirect("/library/");
}
