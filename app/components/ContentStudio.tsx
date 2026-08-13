"use client";

import { useState } from "react";

const outputs = {
  meta: { label: "Meta ad", eyebrow: "Built for the everyday carry.", body: "A lighter profile, reinforced finish and the details that survive daily use.", cta: "Shop the new collection" },
  email: { label: "Email campaign", eyebrow: "Meet the everyday collection", body: "The pieces your rotation was missing—built to work harder, wear longer and go everywhere.", cta: "Explore the collection" },
  product: { label: "Product page", eyebrow: "Field Carry 02", body: "A compact daily carry with reinforced seams, weather-resistant canvas and modular internal storage.", cta: "View product details" },
};

export function ContentStudio({immersive=false}:{immersive?:boolean}) {
  const [channel, setChannel] = useState<keyof typeof outputs>("meta");
  const [approved, setApproved] = useState(false);
  const output = outputs[channel];

  return (
    <section className={`content-chapter ${immersive?"immersive-system":""}`} id="content">
      {!immersive&&<div className="chapter-heading content-heading">
        <div><p className="section-kicker">03 · Content Automation <span>Actively building</span></p><h2>One source.<br /><em>Every channel.</em></h2></div>
        <div className="chapter-description"><p>Product data, campaign context and brand rules become reviewed, channel-ready output—without rebuilding the same brief five times.</p><a className="chapter-open dark" href="/demos/content">Open full demo ↗</a></div>
      </div>}

      <div className="content-studio">
        <div className="studio-sources">
          <p>Campaign inputs</p>
          <article><i>01</i><div><strong>Product catalog</strong><span>Images · features · inventory</span></div><b>Connected</b></article>
          <article><i>02</i><div><strong>Campaign brief</strong><span>Launch · conversion · EU</span></div><b>Ready</b></article>
          <article><i>03</i><div><strong>Brand system</strong><span>Voice · claims · exclusions</span></div><b>Applied</b></article>
          <div className="studio-flow"><i /><i /><i /><span>Context assembled</span></div>
        </div>

        <div className="studio-workspace">
          <div className="studio-topbar"><span>Content workspace</span><i><b /> Generation ready</i></div>
          <div className="studio-body">
            <aside><p>Output channel</p>{Object.entries(outputs).map(([id, item]) => <button key={id} className={channel === id ? "active" : ""} onClick={() => { setChannel(id as keyof typeof outputs); setApproved(false); }}><i>{id.slice(0, 2)}</i><span>{item.label}</span></button>)}<p>Controls</p><dl><div><dt>Voice</dt><dd>Direct</dd></div><div><dt>Market</dt><dd>Europe</dd></div><div><dt>Claims</dt><dd>Verified only</dd></div></dl></aside>
            <section className="generated-output" key={channel}>
              <header><div><span>{output.label}</span><strong>Variant 01 · Generated from approved context</strong></div><i>Draft</i></header>
              <div className="product-visual"><div className="product-shape"><i /><b /></div><span>FIELD / 02</span></div>
              <div className="output-copy"><span>{output.eyebrow}</span><h3>{output.body}</h3><button>{output.cta} ↗</button></div>
              <footer><span><i /> Brand rules passed</span><span><i /> Claims verified</span><button className={approved ? "approved" : ""} onClick={() => setApproved(!approved)}>{approved ? "Approved ✓" : "Approve output"}</button></footer>
            </section>
          </div>
        </div>
      </div>

      {!immersive&&<div className="content-note"><span>Under active development</span><p>The operating workflow is being built now. The interface shows the intended input, governance and approval model; production publishing will be connected next.</p></div>}
    </section>
  );
}
