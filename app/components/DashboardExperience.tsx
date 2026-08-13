"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";

type Page = "dashboard" | "accounting" | "costs" | "forecast" | "support";
type Period = "today" | "week" | "month";

const sources = [
  { id: "shopify", label: "Shopify", detail: "Orders · Revenue · Fees", tone: "#95BF47", icon: "/brands/shopify.svg" },
  { id: "meta", label: "Meta Ads", detail: "Spend · Attributed sales", tone: "#5596ff", icon: "/brands/meta.svg" },
  { id: "google", label: "Google Ads", detail: "Spend · ROAS", tone: "#79baff", icon: "/brands/google-ads.svg" },
  { id: "cogs", label: "Supplier data", detail: "Country · SKU · COGS", tone: "#64d6aa", icon: null },
  { id: "support", label: "Zendesk", detail: "Cases · Language · Resolution", tone: "#78b6a9", icon: "/brands/zendesk.svg" },
  { id: "ops", label: "Stripe", detail: "Payments · Refunds · Disputes", tone: "#8e87ff", icon: "/brands/stripe.svg" },
];

const periods = {
  today: { revenue: "€8,751", pnl: "+€1,906", margin: "21.8%", roas: "2.08x", orders: "83", spend: "€2,104" },
  week: { revenue: "€48,751", pnl: "+€10,556", margin: "21.7%", roas: "2.01x", orders: "471", spend: "€24,201" },
  month: { revenue: "€198,420", pnl: "+€43,290", margin: "21.8%", roas: "2.14x", orders: "1,894", spend: "€92,654" },
};

const pages: { id: Page; label: string; group: string }[] = [
  { id: "dashboard", label: "Dashboard", group: "Analytics" },
  { id: "accounting", label: "Accounting", group: "Analytics" },
  { id: "costs", label: "Costs & cash flow", group: "Costs" },
  { id: "forecast", label: "Forecast vs real", group: "Goals" },
  { id: "support", label: "Support enquiries", group: "Support" },
];

function Sparkline({ orange = false }: { orange?: boolean }) {
  return <svg className="mini-line" viewBox="0 0 360 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70 C32 50 48 8 79 21 S116 57 148 50 S193 42 224 53 S275 22 306 35 S337 77 360 23" fill="none" stroke={orange ? "#ff772e" : "#5089ff"} strokeWidth="2"/><path d="M0 75H360M0 50H360M0 25H360" stroke="#e8ebf2" strokeWidth="1"/></svg>;
}

function Donut() {
  return <div className="demo-donut"><div><strong>€38,195</strong><span>Total costs</span></div></div>;
}

export function DashboardExperience({immersive=false}:{immersive?:boolean}) {
  const [period, setPeriod] = useState<Period>("week");
  const [scope, setScope] = useState<"single" | "multi">("single");
  const [page, setPage] = useState<Page>("dashboard");
  const [activeSource, setActiveSource] = useState("shopify");
  const current = periods[period];

  function selectPage(next: Page) {
    setPage(next);
    document.querySelector(".dashboard-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className={`dashboard-chapter ${immersive?"immersive-system":""}`} id="dashboard">
      {!immersive&&<div className="chapter-heading">
        <div><p className="section-kicker">02 · Custom Operations Dashboard</p><h2>Every system.<br /><em>One operating view.</em></h2></div>
        <div className="chapter-description"><p>Commerce, advertising, supplier costs, payments and multilingual support become one dashboard—custom-built around the way the operator actually runs.</p><a className="chapter-open" href="/demos/dashboard">Open full demo ↗</a></div>
      </div>}

      <div className="data-architecture">
        <div className="source-grid">
          {sources.map((source, index) => (
            <button key={source.id} className={activeSource === source.id ? "active" : ""} onClick={() => setActiveSource(source.id)} style={{ "--source-tone": source.tone, "--source-delay": `${index * 110}ms` } as CSSProperties}>
              <i className={source.icon?"brand-source":"supplier-source"}>{source.icon?<Image src={source.icon} alt="" width={21} height={21}/>:<span aria-hidden="true"><b/><b/><b/></span>}</i><span><strong>{source.label}</strong><small>{source.detail}</small></span><b />
            </button>
          ))}
        </div>
        <div className="data-spine" aria-hidden="true"><i /><i /><i /><i /><i /><i /><span><b />Live data model</span></div>

        <div className="dashboard-shell dashboard-light">
          <div className="dash-topbar">
            <div className="store-control">
              <i className={scope === "single" ? "green" : "blue"} />
              <button onClick={() => setScope(scope === "single" ? "multi" : "single")} aria-label="Switch dashboard scope">
                <strong>{scope === "single" ? "Arden & Co." : "All stores"}</strong><span>{scope === "single" ? "Single-store owner view" : "Multi-store consolidated view"}⌄</span>
              </button>
            </div>
            <div className="dash-sync"><span>✓ fetched just now</span><button onClick={() => setScope(scope === "single" ? "multi" : "single")}>⇄ Switch view</button></div>
          </div>

          <div className="dash-body">
            <aside className="dash-sidebar">
              <div className="dash-logo"><b>A</b><span>Operations<br />Intelligence</span></div>
              {pages.map((item, index) => <div key={item.id}>{index === 0 || pages[index - 1].group !== item.group ? <span>{item.group}</span> : null}<button className={page === item.id ? "active" : ""} onClick={() => selectPage(item.id)}>{item.label}</button></div>)}
              <div className="source-health"><i /><div><strong>{sources.find(source => source.id === activeSource)?.label}</strong><span>Source connected</span></div></div>
            </aside>

            <section className="dashboard-scroll">
              <header className="dashboard-page-head">
                <div><h3>{page === "dashboard" ? (scope === "single" ? "Dashboard" : "Portfolio overview") : pages.find(item => item.id === page)?.label}</h3><p>{scope === "single" ? "Arden & Co. — live operational data" : "All connected stores — consolidated operating data"}</p></div>
                <div className="period-toggle">{(["today", "week", "month"] as Period[]).map(item => <button key={item} className={period === item ? "active" : ""} onClick={() => setPeriod(item)}>{item === "week" ? "This week" : item === "month" ? "This month" : "Today"}</button>)}</div>
              </header>

              {page === "dashboard" && scope === "single" && <SingleStoreDashboard current={current} />}
              {page === "dashboard" && scope === "multi" && <MultiStoreDashboard current={current} />}
              {page === "accounting" && <AccountingPage scope={scope} />}
              {page === "costs" && <CostsPage scope={scope} />}
              {page === "forecast" && <ForecastPage scope={scope} />}
              {page === "support" && <SupportPage scope={scope} />}
            </section>
          </div>
        </div>
      </div>
      {!immersive&&<div className="chapter-proof"><p>One operating model—not six disconnected exports.</p><div><span><strong>30m/day → 10m/week</strong> reporting administration</span><span><strong>Multi-store</strong> consolidated + individual</span><span><strong>Multilingual support</strong> cases and language distribution</span><span><strong>Exact fees</strong> country-level Shopify logic</span></div></div>}
    </section>
  );
}

function SingleStoreDashboard({ current }: { current: (typeof periods)[Period] }) {
  return <div className="dashboard-page dashboard-overview">
    <div className="live-notice"><b>live</b> Today’s figures include live ad spend, refunds, Shopify fees and market data. COGS follows the current product and country rules.</div>
    <div className="real-kpis"><article><span>Revenue <i>{current.orders} orders</i></span><strong>{current.revenue}</strong><small>vs previous period <b>+18.5%</b></small></article><article><span>Net P&amp;L <i>21.7% margin</i></span><strong className="positive">{current.pnl}</strong><small>vs previous period <b>+23.2%</b></small></article><article><span>ROAS (blended) <i>{current.spend} ad spend</i></span><strong className="positive">{current.roas}</strong><small>Target <b>≥ 2.0x</b></small></article><article><span>Net margin <i>estimated</i></span><strong className="positive">{current.margin}</strong><small>vs previous period <b>+0.8pp</b></small></article></div>
    <div className="platform-roas"><article><span>Google ROAS <i>Google Ads</i></span><strong>2.05x</strong><dl><div><dt>Spend</dt><dd>€5,975</dd></div><div><dt>Attributed revenue</dt><dd>€12,266</dd></div></dl></article><article><span>Facebook ROAS <i>Meta Ads</i></span><strong className="amber">1.45x</strong><dl><div><dt>Spend</dt><dd>€18,226</dd></div><div><dt>Attributed revenue</dt><dd>€26,482</dd></div></dl></article></div>
    <section className="refund-panel"><h4>Refunds, chargebacks &amp; cancellations</h4><div><article><span>Total</span><strong className="danger">€939</strong><small>of revenue lost</small></article><article><span>% of revenue</span><strong>1.9%</strong><small>healthy</small></article><article><span>Revenue net of refunds</span><strong>€47,811</strong><small>€48,751 gross</small></article></div></section>
    <section className="support-snapshot"><header><h4>Support enquiries snapshot</h4><span>View full breakdown →</span></header><div><article><span>AI responses</span><strong>370</strong><small>173 conversations</small></article><article><span>Handoff rate</span><strong className="amber">19.7%</strong><small>73 handoffs</small></article><article><span>Top case type</span><strong>Delivery</strong></article><article><span>Top language</span><strong>Portuguese</strong></article></div></section>
    <div className="chart-pair"><article><header><span>Average order value</span><b>€104 this period</b></header><Sparkline /></article><article><header><span>Chargeback rate</span><b>1.9% this period</b></header><Sparkline orange /></article></div>
    <div className="chart-pair"><article><header><span>Revenue by market</span></header><div className="market-bars">{[92,42,35,25,23,20,14,12].map((height,index)=><i key={index} style={{height:`${height}%`}} />)}</div></article><article><header><span>Cost breakdown</span></header><Donut /></article></div>
    <article className="monthly-chart"><header><span>Monthly P&amp;L vs forecast</span></header><div>{[12,24,42,66,38,29,18].map((height,index)=><i key={index} style={{height:`${height}%`}}><b /></i>)}<svg viewBox="0 0 500 100" preserveAspectRatio="none"><path d="M0 88 C80 75 120 45 190 63 S300 48 350 15 S430 9 500 2" fill="none" stroke="#f0a13a" strokeDasharray="5 4" strokeWidth="2"/></svg></div></article>
  </div>;
}

function MultiStoreDashboard({ current }: { current: (typeof periods)[Period] }) {
  return <div className="dashboard-page multi-page">
    <div className="portfolio-banner"><span>Portfolio consolidated</span><strong>4 stores · 3 markets · live</strong></div>
    <div className="real-kpis"><article><span>Total revenue</span><strong>€{(parseInt(current.revenue.replace(/\D/g,""),10)*3).toLocaleString()}</strong><small>all connected stores</small></article><article><span>Portfolio P&amp;L</span><strong className="positive">+€31,884</strong><small>after all operating costs</small></article><article><span>Weighted ROAS</span><strong>2.46x</strong><small>Meta + Google combined</small></article><article><span>Net margin</span><strong className="positive">22.4%</strong><small>portfolio weighted</small></article></div>
    <section className="multi-stores"><header><h4>Stores — P&amp;L detail</h4><span>Click a store to open</span></header>{[["Arden & Co.","Lifestyle accessories","€48,751","+€10,556","21.7%"],["Maison Vale","Home & living","€41,280","+€9,914","24.0%"],["Northline","Apparel","€32,614","+€6,221","19.1%"],["Field Supply","Outdoor goods","€19,746","+€5,193","26.3%"]].map((store,index)=><button key={store[0]}><i className={["blue","violet","green","orange"][index]} /><span><strong>{store[0]}</strong><small>{store[1]}</small></span><b>{store[2]}<small>revenue</small></b><b className="positive">{store[3]}<small>P&amp;L</small></b><b>{store[4]}<small>margin</small></b></button>)}</section>
    <div className="chart-pair"><article><header><span>Revenue by store</span></header><div className="portfolio-bars">{[92,78,63,39].map((height,index)=><i key={index} style={{height:`${height}%`}}><span>{["Arden","Vale","North","Field"][index]}</span></i>)}</div></article><article><header><span>Portfolio cost breakdown</span></header><Donut /></article></div>
  </div>;
}

function AccountingPage({ scope }: { scope: "single"|"multi" }) { return <div className="dashboard-page detail-page"><div className="page-summary"><article><span>Recorded revenue</span><strong>€48,751</strong></article><article><span>Total costs</span><strong>€38,195</strong></article><article><span>Net P&amp;L</span><strong className="positive">€10,556</strong></article></div><section className="demo-table"><header><h4>{scope === "single" ? "Daily accounting ledger" : "Consolidated store ledger"}</h4><button>Export CSV</button></header><div className="table-row head"><span>Date / store</span><span>Revenue</span><span>Orders</span><span>Ad spend</span><span>COGS</span><span>Fees</span><span>Net P&amp;L</span></div>{[1,2,3,4,5,6,7].map((row)=><div className="table-row" key={row}><span>{scope === "single" ? `2026-08-${14-row}` : ["Arden & Co.","Maison Vale","Northline","Field Supply"][row%4]}</span><span>€{(6940-row*317).toLocaleString()}</span><span>{75-row*3}</span><span>€{(2310-row*91).toLocaleString()}</span><span>€{(1490-row*47).toLocaleString()}</span><span>€{(143-row*4)}</span><span className="positive">+€{(1740-row*85).toLocaleString()}</span></div>)}</section></div> }
function CostsPage({ scope }: { scope:"single"|"multi" }) { return <div className="dashboard-page detail-page"><div className="page-summary"><article><span>Fixed costs</span><strong>€7,840</strong></article><article><span>Variable costs</span><strong>€30,355</strong></article><article><span>Exceptional</span><strong>€1,290</strong></article></div><div className="cost-layout"><section><h4>{scope === "single"?"Cost allocation":"Portfolio cost allocation"}</h4>{[["COGS",68],["Meta Ads",54],["Google Ads",31],["Shopify fees",18],["Software",12]].map(item=><div className="cost-row" key={item[0] as string}><span>{item[0]}</span><b><i style={{width:`${item[1]}%`}} /></b><strong>€{(Number(item[1])*371).toLocaleString()}</strong></div>)}</section><section><h4>Cash position</h4><strong className="cash-total">€86,420</strong><Sparkline /></section></div></div> }
function ForecastPage({ scope }: { scope:"single"|"multi" }) { return <div className="dashboard-page detail-page"><div className="page-summary"><article><span>2026 forecast</span><strong>€1.24M</strong></article><article><span>Actual YTD</span><strong>€684k</strong></article><article><span>Variance</span><strong className="positive">+8.2%</strong></article></div><article className="forecast-large"><header><h4>{scope === "single"?"Forecast vs actual 2026":"Portfolio forecast vs actual"}</h4><span>Revenue · P&amp;L · Forecast</span></header><div className="forecast-bars">{[18,24,36,48,55,62,68,76,83,91,96,100].map((height,index)=><i key={index} style={{height:`${height}%`}}><b style={{height:`${Math.max(8,height-18)}%`}} /></i>)}<svg viewBox="0 0 600 160" preserveAspectRatio="none"><path d="M0 148 C80 135 120 105 180 115 S290 89 350 70 S470 37 600 12" fill="none" stroke="#efa13b" strokeDasharray="6 4" strokeWidth="2"/></svg></div></article></div> }
function SupportPage({ scope }: { scope:"single"|"multi" }) { return <div className="dashboard-page detail-page support-detail-page">
  <div className="page-summary four"><article><span>AI responses</span><strong>370</strong><small>173 conversations</small></article><article><span>Handoff rate</span><strong className="amber">19.7%</strong><small>73 handoffs · 297 resolved</small></article><article><span>Top case type</span><strong>Order tracking</strong><small>89 responses</small></article><article><span>Top language</span><strong>Portuguese</strong><small>75 responses</small></article></div>
  <section className="responses-chart"><h4>{scope === "single"?"Responses over time":"Portfolio responses over time"}</h4><Sparkline /></section>
  <div className="support-analytics support-analytics-rich"><section><h4>Case type breakdown</h4>{[["Order tracking / delay",89],["Product question",84],["Technical issue",61],["Returns / refund",45],["Frustrated customer",28]].map((item,index)=><div className={`cost-row support-bar tone-${index}`} key={item[0] as string}><span>{item[0]}</span><b><i style={{width:`${item[1]}%`}} /></b><strong>{item[1]}</strong></div>)}</section><section><h4>Language distribution</h4><div className="language-breakdown"><div className="language-donut"/><ul>{[["Portuguese","75"],["English","61"],["Italian","48"],["French","43"],["Spanish","37"],["German","28"]].map(item=><li key={item[0]}><i/><span>{item[0]}</span><strong>{item[1]}</strong></li>)}</ul></div></section></div>
  </div> }
