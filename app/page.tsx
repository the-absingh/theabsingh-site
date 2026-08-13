import type { Metadata } from "next";
import { SupportOperations } from "./components/SupportOperations";
import { DashboardExperience } from "./components/DashboardExperience";
import { ContentStudio } from "./components/ContentStudio";

export const metadata: Metadata = {
  title: "AI support, custom dashboards and content automation",
  description: "Three focused systems for ecommerce operations.",
};

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="nav-cluster">
          <a className="wordmark" href="#top" aria-label="Ab Singh, home">
            <span className="wordmark-mark" aria-hidden="true">A</span>
            <span>Ab Singh</span>
            <i>Systems operation</i>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#support">AI support</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#content">Content automation</a>
          </nav>
        </div>
        <a className="nav-contact" href="mailto:hey@theabsingh.com">Start a project <span>↗</span></a>
      </header>

      <section className="product-hero" id="top">
        <SupportOperations />
      </section>

      <DashboardExperience />
      <ContentStudio />

      <section className="operation" id="operation">
        <p className="section-kicker">/ The operation</p>
        <div className="operation-grid">
          <div>
            <h2>Founder-led.<br /><em>Specialist-built.</em></h2>
            <p>Ab Singh leads strategy and system architecture. A focused delivery team supports automation, engineering, deployment and ongoing operation.</p>
          </div>
          <div className="principles">
            <article><span>01</span><div><h3>Built around the operation</h3><p>No forced workflow. The system follows the way your team actually works.</p></div></article>
            <article><span>02</span><div><h3>Owned infrastructure</h3><p>Clear access, portable components and no compounding per-seat dependency.</p></div></article>
            <article><span>03</span><div><h3>Automation with judgment</h3><p>Repeatable work runs automatically. Exceptions reach the right human.</p></div></article>
          </div>
        </div>
      </section>

      <footer>
        <p className="section-kicker">/ Start a conversation</p>
        <div className="footer-main">
          <h2>What is your team<br />still doing by hand?</h2>
          <a href="mailto:hey@theabsingh.com">hey@theabsingh.com <span>↗</span></a>
        </div>
        <div className="footer-bottom"><span>AB SINGH © {new Date().getFullYear()}</span><span>AI SUPPORT / CUSTOM DASHBOARDS / CONTENT AUTOMATION</span></div>
      </footer>
    </main>
  );
}
