// Route table for the portfolio app.
//
// All routes are nested inside RootLayout (shared header + footer).
// EntryPage is the single detail component for BOTH projects and experience.
// Kind is derived from the URL prefix inside the component — no prop needed.
//
// GitHub Pages serves a 404.html fallback for deep links; trailing slash
// variants are covered by the catch-all "*" route mapping to NotFoundPage.
//
// Route map:
//   /                   -> HomePage
//   /projects           -> ProjectsPage
//   /projects/:id       -> EntryPage  (kind="project")
//   /experience         -> ExperiencePage
//   /experience/:id     -> EntryPage  (kind="experience")
//   *                   -> NotFoundPage

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ExperiencePage from "@/pages/ExperiencePage";
import EntryPage from "@/pages/EntryPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:id",
        element: <EntryPage />,
      },
      {
        // trailing slash: /projects/vizard/ also resolves
        path: "projects/:id/",
        element: <EntryPage />,
      },
      {
        path: "experience",
        element: <ExperiencePage />,
      },
      {
        path: "experience/:id",
        element: <EntryPage />,
      },
      {
        // trailing slash: /experience/prodigy/ also resolves
        path: "experience/:id/",
        element: <EntryPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
