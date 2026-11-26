import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PageMeta } from './components/PageMeta';

const Home = lazy(() => import('./pages/Home'));
const Domains = lazy(() => import('./pages/Domains'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Events = lazy(() => import('./pages/Events'));
const Team = lazy(() => import('./pages/Team'));
const Collaborate = lazy(() => import('./pages/Collaborate'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <>
                  <PageMeta
                    title="ASE · NMIT Bengaluru — Advanced Software Engineering"
                    description="We imagine. We engineer. We build what's next. Official website for ASE, the largest student tech collective at NMIT Bengaluru."
                  />
                  <Home />
                </>
              }
            />
            <Route
              path="/domains"
              element={
                <>
                  <PageMeta
                    title="Domains — ASE · NMIT Bengaluru"
                    description="Explore ASE's engineering domains through the interactive Domain Map constellation and Singularity blueprint core."
                  />
                  <Domains />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <PageMeta
                    title="About — ASE · NMIT Bengaluru"
                    description="Learn about ASE at NMIT Bengaluru: our story, engineering pods, workshops, and core values."
                  />
                  <About />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <PageMeta
                    title="Projects — ASE · NMIT Bengaluru"
                    description="Browse student-engineered software systems, prototypes, and domain builds from ASE at NMIT Bengaluru."
                  />
                  <Projects />
                </>
              }
            />
            <Route
              path="/events"
              element={
                <>
                  <PageMeta
                    title="Events — ASE · NMIT Bengaluru"
                    description="Timeline of upcoming and past workshops, hackathons, and technical showcases hosted by ASE at NMIT Bengaluru."
                  />
                  <Events />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <PageMeta
                    title="Team — ASE · NMIT Bengaluru"
                    description="Meet the core student engineering leads steering ASE at NMIT Bengaluru."
                  />
                  <Team />
                </>
              }
            />
            <Route
              path="/collaborate"
              element={
                <>
                  <PageMeta
                    title="Collaborate — ASE · NMIT Bengaluru"
                    description="Partner with ASE at NMIT Bengaluru through sponsorships, problem statements, mentorship, and campus tech events."
                  />
                  <Collaborate />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <PageMeta
                    title="Contact — ASE · NMIT Bengaluru"
                    description="Get in touch with ASE (Advanced Software Engineering) at NMIT Bengaluru."
                  />
                  <Contact />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <PageMeta
                    title="404 — ASE · NMIT Bengaluru"
                    description="Page not found on ASE NMIT Bengaluru."
                  />
                  <NotFound />
                </>
              }
            />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
