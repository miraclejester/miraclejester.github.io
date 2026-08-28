import { Outlet, ScrollRestoration } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HashScroll from "@/components/HashScroll";
import { TrackProvider } from "@/context/TrackContext";

export default function RootLayout() {
  return (
    // TrackProvider wraps header and outlet alike: the header toggle and
    // the page listings read the same Web/Games selection.
    <TrackProvider>
      <div className="flex min-h-screen flex-col">
        {/* Skip link — always the first focusable element */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to main content
        </a>

        <SiteHeader />

        {/* pt-16 clears the fixed 4rem header */}
        <div className="flex flex-1 flex-col pt-16">
          <Outlet />
        </div>

        <SiteFooter />

        <ScrollRestoration />
        <HashScroll />
      </div>
    </TrackProvider>
  );
}
