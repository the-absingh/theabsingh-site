import type { Metadata } from "next";
import { AskWidget } from "./components/AskWidget";

export const metadata: Metadata = {
  title: "Ab Singh — AI automation and systems for ecom brands",
  description:
    "Backend automation, reporting, support, and catalog systems for ecommerce operators.",
};

const stats = [
  { value: "3,000+", label: "monthly inquiries handled" },
  { value: "~55%", label: "resolved without a handoff" },
  { value: "2,000+", label: "SKUs auto-priced" },
  { value: "100%", label: "Shopify fee accuracy" },
];

const caseStudies = [
  {
    number: "01",
    title: "Automated Accounting & Reporting Pipeline",
    client: "Atlas · multi-store ecommerce operator",
    problem:
      "Manual entry across Shopify, Meta, and Google took 30+ minutes a day, got skipped on busy days, and used estimated Shopify fees instead of the actual per-country rate.",
    fix:
      "A Make.com pipeline now pulls daily Shopify analytics and Meta and Google ad spend into one sheet. It uses exact country-level fees, separates attributed platform sales, and backfills missed weekend COGS every Monday.",
    result: "Zero manual daily entry. Accurate fees. 30 min/day → roughly 10 min/week.",
    tags: ["Make.com", "Shopify", "Meta", "Google"],
  },
  {
    number: "02",
    title: "Multi-Store Analytics Dashboard",
    client: "Atlas · multi-store ecommerce operator",
    problem:
      "Financial data arrived next day in Paris time, with no view of today, no consolidated cross-store picture, and no useful date filtering.",
    fix:
      "A dashboard combines historical records with live data fetched from Shopify, Meta, and Google. It has a consolidated owner view and individual store views, with new brands able to plug into the same architecture.",
    result: "Next-day reporting became real-time. Today is included. Multi-store by design.",
    tags: ["Shopify", "Meta", "Google", "Live data"],
  },
  {
    number: "03",
    title: "Self-Hosted AI Customer Support Agent",
    client: "Atlas · multi-store ecommerce operator",
    problem:
      "More than 3,000 monthly inquiries were handled manually across Shopify, email, Messenger, Instagram, and WhatsApp. SaaS support tools cost $200–300 per month and scaled poorly across stores.",
    fix:
      "A self-hosted Chatwoot system runs on a Hetzner VPS. Meta webhooks connect the channels, while Make.com supplies conversation history to OpenAI for contextual, multilingual replies and selective human handoff.",
    result: "3,000+ inquiries/month handled. ~55% resolved without handoff. No recurring SaaS fee.",
    tags: ["Chatwoot", "OpenAI API", "Make.com", "Meta"],
  },
  {
    number: "04",
    title: "AI-Powered Catalog Pricing",
    client: "Nebula · collectible brand store owner",
    problem:
      "A 2,000+ SKU diecast catalog was maintained by hand, causing pricing errors and inventory drift. Flat spreadsheet uploads could not account for condition or rare variants.",
    fix:
      "A Make.com automation sends raw product photos to the OpenAI Vision API to extract the product name, tags, and condition grade. Rule-based logic calculates retail price before the listing is pushed to Shopify.",
    result: "2,000+ SKUs synced automatically. No manual entry. Consistent rule-based pricing.",
    tags: ["OpenAI Vision", "Make.com", "Shopify", "Rules engine"],
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ab Singh, home">
          <span className="wordmark-mark" aria-hidden="true">A/</span>
          <span>AB SINGH</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">Approach</a>
          <a className="nav-contact" href="mailto:hey@theabsingh.com">Contact ↗</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Available for select projects</p>
          <h1>AI automation<br />and systems for<br /><em>ecom brands.</em></h1>
          <p className="hero-subhead">
            I build the backend infrastructure ecom operators own outright, instead of renting forever.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#ask">Ask about the work <span>↓</span></a>
            <a className="button button-secondary" href="mailto:hey@theabsingh.com">Get in touch ↗</a>
          </div>
        </div>

        <div id="ask" className="widget-column">
          <div className="system-label" aria-hidden="true">
            <span>LIVE SYSTEM</span><span>OPENAI / GROUNDED</span>
          </div>
          <AskWidget />
        </div>
      </section>

      <section className="stats" aria-label="Selected results">
        {stats.map((stat, index) => (
          <div className="stat" key={stat.label}>
            <span className="stat-index">0{index + 1}</span>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="section-kicker">/ Selected systems</p>
          <h2>Built to remove<br />recurring work.</h2>
          <p>Real operators, real scale. Client names changed for confidentiality.</p>
        </div>

        <div className="case-list">
          {caseStudies.map((study) => (
            <article className="case-card" key={study.number}>
              <div className="case-topline">
                <span>{study.number}</span>
                <span>CASE STUDY</span>
              </div>
              <div className="case-title">
                <h3>{study.title}</h3>
                <p>{study.client}</p>
              </div>
              <div className="case-detail-grid">
                <div>
                  <span className="detail-label">Problem</span>
                  <p>{study.problem}</p>
                </div>
                <div>
                  <span className="detail-label">System</span>
                  <p>{study.fix}</p>
                </div>
                <div className="result-block">
                  <span className="detail-label">Result</span>
                  <p>{study.result}</p>
                </div>
              </div>
              <div className="tag-list" aria-label="Tools used">
                {study.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" id="about">
        <p className="section-kicker">/ Working principles</p>
        <div className="approach-grid">
          <h2>Own the system.<br />Keep the leverage.</h2>
          <div className="principles">
            <div><span>01</span><h3>Useful before impressive</h3><p>Start with the operational bottleneck. Build only what removes it.</p></div>
            <div><span>02</span><h3>Infrastructure you own</h3><p>Prefer systems that remain under the operator’s control and do not compound per-seat fees.</p></div>
            <div><span>03</span><h3>Human when needed</h3><p>Automate the repeatable work. Keep a clear handoff for judgment calls.</p></div>
          </div>
        </div>
      </section>

      <section className="stack-row" aria-label="Tools and platforms">
        <span>USUAL COMPONENTS</span>
        <p>Make.com <i>·</i> OpenAI API <i>·</i> Shopify <i>·</i> Chatwoot <i>·</i> n8n</p>
      </section>

      <footer>
        <p className="section-kicker">/ Start a conversation</p>
        <div className="footer-main">
          <h2>Have a recurring task<br />that should be a system?</h2>
          <a href="mailto:hey@theabsingh.com">hey@theabsingh.com <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <span>AB SINGH © {new Date().getFullYear()}</span>
          <span>AI AUTOMATION / ECOM SYSTEMS</span>
        </div>
      </footer>
    </main>
  );
}
