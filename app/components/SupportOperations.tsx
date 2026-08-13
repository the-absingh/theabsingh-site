"use client";

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";
import { AskWidget } from "./AskWidget";

type ChannelId = "whatsapp" | "email" | "instagram" | "messenger" | "chat";
type ChannelFilter = "all" | ChannelId;
type ExtraMessage = { kind: "customer" | "agent"; text: string };

const scenarios: Record<ChannelId, { customer:string; initials:string; channel:string; language:string; subject:string; preview:string; question:string; replies:string[]; followup:string }> = {
  whatsapp: { customer:"Marie Laurent",initials:"ML",channel:"WhatsApp",language:"French",subject:"Order #FR-4821 · Late delivery",preview:"Mon colis devait arriver hier…",question:"Bonjour, mon colis devait arriver hier, mais le suivi n’a pas été mis à jour. Pouvez-vous vérifier ?",replies:["Votre commande a été retardée ce matin au centre de tri de Lyon. La nouvelle livraison est prévue demain entre 9 h et 13 h.","J’ai activé les notifications du transporteur et ajouté un crédit de 10 € pour ce retard. Je peux vous aider ici si vous avez une autre question."],followup:"Je viens de vérifier votre commande et son historique. Je peux régler cela ici ou transférer la conversation à un conseiller si vous le préférez." },
  email: { customer:"Daniel Weber",initials:"DW",channel:"Email",language:"German",subject:"Subscription · Pause request",preview:"Können Sie nächsten Monat…",question:"Ich bin nächsten Monat unterwegs. Können Sie die nächste Lieferung pausieren, ohne mein Konto zu kündigen?",replies:["Ja. Ich habe Ihr Monatsabonnement gefunden und die Lieferung vom 18. September pausiert. Die Abrechnung beginnt automatisch wieder am 18. Oktober.","Eine Bestätigung wurde Ihnen per E-Mail gesendet. Alle anderen Abonnementeinstellungen bleiben unverändert."],followup:"Ich habe das noch einmal mit Ihrem Konto abgeglichen. Ich kann es hier lösen oder die Unterhaltung auf Wunsch an einen Mitarbeiter weiterleiten." },
  instagram: { customer:"Sofia Martin",initials:"SM",channel:"Instagram",language:"Spanish",subject:"Product · Compatibility",preview:"¿Funcionará con el modelo…",question:"¿El adaptador Series 4 funciona con el modelo anterior de 2022? No lo encuentro en la página.",replies:["El adaptador Series 4 no es compatible con el soporte de 2022. Necesitas el adaptador Classic, referencia ADP-CL-22, que está disponible.","Te he enviado el enlace correcto. Si quieres, envíame una foto del soporte y confirmaré la compatibilidad antes de que hagas el pedido."],followup:"He vuelto a comprobarlo con el historial de la cuenta y del pedido. Puedo resolverlo aquí o pasarte con un especialista si lo prefieres." },
  messenger: { customer:"Alex Morgan",initials:"AM",channel:"Messenger",language:"English",subject:"Returns · Size exchange",preview:"Can I exchange the size?",question:"The jacket arrived today but I need one size larger. Can I exchange it?",replies:["Yes. Order #UK-2194 is inside the exchange window and the next size is in stock.","I created the exchange and sent a prepaid return label. Your replacement is reserved for 7 days."],followup:"I’ve checked that against the order and account history. I can resolve it here, or transfer the conversation to a specialist if you prefer." },
  chat: { customer:"Rui Costa",initials:"RC",channel:"Live chat",language:"Portuguese",subject:"Checkout · Payment failure",preview:"O meu pagamento continua…",question:"O meu cartão funciona noutros sites, mas o pagamento falhou duas vezes. A encomenda foi criada?",replies:["Não foi criada nenhuma encomenda nem efetuada qualquer cobrança, por isso pode tentar novamente em segurança. O banco recusou a confirmação 3-D Secure.","Gerei um novo link de pagamento e mantive os artigos no carrinho. Também pode utilizar o Apple Pay nessa página."],followup:"Voltei a verificar os dados da encomenda e da conta. Posso resolver a questão aqui ou encaminhar a conversa para um especialista, se preferir." },
};

const channels: { id:ChannelId; label:string; color:string; count:number }[] = [
  {id:"whatsapp",label:"WhatsApp",color:"#25D366",count:38},
  {id:"email",label:"Email",color:"#6f8fff",count:24},
  {id:"instagram",label:"Instagram",color:"#e760aa",count:17},
  {id:"messenger",label:"Messenger",color:"#168AFF",count:11},
  {id:"chat",label:"Live chat",color:"#7c91e8",count:29},
];

export function SupportOperations({immersive=false}:{immersive?:boolean}) {
  const [filter,setFilter]=useState<ChannelFilter>("all");
  const [activeId,setActiveId]=useState<ChannelId>("whatsapp");
  const [mode,setMode]=useState<"operations"|"ask">("operations");
  const [phase,setPhase]=useState(0);
  const [input,setInput]=useState("");
  const [extras,setExtras]=useState<ExtraMessage[]>([]);
  const [processing,setProcessing]=useState(false);
  const [replay,setReplay]=useState(0);
  const streamRef=useRef<HTMLDivElement>(null);
  const active=scenarios[activeId];
  const visibleChannels=filter==="all"?channels:channels.filter(channel=>channel.id===filter);

  useEffect(()=>{
    const timers=[setTimeout(()=>setPhase(1),320),setTimeout(()=>setPhase(2),720),setTimeout(()=>setPhase(3),1180)];
    return()=>timers.forEach(clearTimeout);
  },[activeId,replay]);

  useEffect(()=>{streamRef.current?.scrollTo({top:streamRef.current.scrollHeight,behavior:"smooth"})},[phase,extras,processing]);

  function resetConversation(id:ChannelId){
    setPhase(0);setExtras([]);setInput("");setProcessing(false);
    if(id===activeId)setReplay(current=>current+1); else setActiveId(id);
  }

  function selectFilter(next:ChannelFilter){
    setFilter(next);
    resetConversation(next==="all"?activeId:next);
  }

  async function continueConversation(event:FormEvent){
    event.preventDefault();const text=input.trim();if(!text||processing)return;
    setExtras(current=>[...current,{kind:"customer",text}]);setInput("");setProcessing(true);
    try{
      const response=await fetch("/api/support-demo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,channel:active.channel,scenario:`${active.subject}. ${active.question}`})});
      const data=await response.json() as {answer?:string};
      setExtras(current=>[...current,{kind:"agent",text:response.ok&&data.answer?data.answer:fallbackReply(text,active.followup)}]);
    }catch{setExtras(current=>[...current,{kind:"agent",text:fallbackReply(text,active.followup)}])}
    finally{setProcessing(false)}
  }

  return <section className={`support-chapter support-hero-chapter ${immersive?"immersive-system":""}`} id="support" aria-label="AI support operations system">
    {!immersive&&<div className="chapter-heading support-heading">
      <div><p className="section-kicker">01 · AI Support Agents</p><h1>One support operation.<br/><em>Every customer channel.</em></h1></div>
      <div className="support-positioning"><p>Email, WhatsApp, Instagram, Messenger and live chat enter one multilingual inbox. The agent retrieves live context, resolves the request and hands off only the exceptions.</p><span>Three systems only</span><strong>AI support · Custom dashboards · Content automation</strong></div>
    </div>}

    <div className="product-label"><span>{immersive?"Interactive support environment":"Live product walkthrough"}</span><span>Self-hosted · Multilingual · Multi-channel</span>{!immersive&&<a className="chapter-open" href="/demos/support">Open full demo ↗</a>}</div>
    <div className="support-shell">
      <div className="support-topbar"><div className="support-brand"><b>A</b><span>Support Operations</span><i>All systems operational</i></div>{mode==="operations"?<button type="button" className="build-mode" onClick={()=>setMode("ask")}>Ask how it works ↗</button>:<a className="build-mode" href={immersive?"/demos/support":"/#support"}>← Return to inbox</a>}</div>
      {mode==="ask"?<AskWidget/>:<div className="support-interface support-interface-simple">
        <aside className="channel-rail"><p>Inboxes</p><button className={filter==="all"?"active all-channel":"all-channel"} onClick={()=>selectFilter("all")} title="All conversations" style={{"--channel-color":"#8aa0f5"} as CSSProperties}><i><span/><span/><span/><span/></i><span>All conversations</span><b>{channels.reduce((total,channel)=>total+channel.count,0)}</b></button>{channels.map(channel=><button key={channel.id} className={filter===channel.id?"active":""} onClick={()=>selectFilter(channel.id)} title={channel.label} style={{"--channel-color":channel.color} as CSSProperties}><i><ChannelIcon id={channel.id}/></i><span>{channel.label}</span><b>{channel.count}</b></button>)}<div className="rail-health"><i/><span>5 channels<br/>connected</span></div></aside>
        <aside className="ticket-list"><div className="ticket-heading"><div><span>{filter==="all"?"Unified inbox":channels.find(channel=>channel.id===filter)?.label}</span><strong>{filter==="all"?"All customer conversations":"Channel conversations"}</strong></div><button aria-label="Filter conversations">⌁</button></div>{visibleChannels.map(channel=>{const scenario=scenarios[channel.id];return <button className={`ticket ${activeId===channel.id?"active":""}`} key={channel.id} onClick={()=>resetConversation(channel.id)}><span className="avatar">{scenario.initials}</span><span className="ticket-copy"><strong>{scenario.customer}</strong><i>{scenario.preview}</i></span><span className="ticket-meta"><b style={{color:channel.color}}>{channel.label}</b><i>{activeId===channel.id?"now":"8m"}</i></span></button>})}</aside>
        <section className="conversation">
          <header><div><span>{active.subject}</span><strong>{active.customer}</strong></div><div className="conversation-badges"><span className="language-badge">{active.language}</span><span className="ai-badge"><i/> AI handling</span></div></header>
          <div className="message-stream" ref={streamRef}>
            {phase===0&&<div className="customer-typing"><span>{active.initials}</span><p><i/><i/><i/> {active.customer} is typing</p></div>}
            {phase>=1&&<SupportMessage kind="customer" initials={active.initials} text={active.question}/>} 
            {phase===1&&<div className="agent-processing"><i/><span>Translating and checking live order context…</span></div>}
            {phase>=2&&<SupportMessage kind="agent" initials="AI" text={active.replies[0]}/>} 
            {phase>=3&&<SupportMessage kind="agent" initials="AI" text={active.replies[1]}/>} 
            {extras.map((message,index)=><SupportMessage key={index} kind={message.kind} initials={message.kind==="agent"?"AI":"YOU"} text={message.text}/>)}
            {processing&&<div className="agent-processing"><i/><span>Agent is checking live context…</span></div>}
          </div>
          <form className="visitor-reply" onSubmit={continueConversation}><label className="sr-only" htmlFor="customer-message">Continue as the customer</label><div><span>Continue as customer</span><input id="customer-message" value={input} onChange={event=>setInput(event.target.value)} placeholder={`Reply to the ${active.channel} conversation…`}/></div><button disabled={!input.trim()||processing}>Send ↗</button></form>
        </section>
      </div>}
    </div>
    {!immersive&&<div className="chapter-proof support-proof"><p>Support becomes one owned operation—not five disconnected inboxes.</p><div><span><strong>3,000+</strong> conversations / month</span><span><strong>~55%</strong> resolved without handoff</span><span><strong>5 channels</strong> in one queue</span><span><strong>7 languages</strong> detected and handled</span></div></div>}
  </section>;
}

function SupportMessage({kind,initials,text}:{kind:"customer"|"agent";initials:string;text:string}){return <div className={`support-message ${kind}`}><span>{initials}</span><p>{text}</p></div>}

function fallbackReply(text:string,scenarioReply:string){
  const value=text.toLowerCase();
  if(/[ãõçáéíóú]|\b(obrigad|encomenda|cartão|pode|voc[eê])\b/.test(value))return "Vou responder em português. Posso verificar esta questão no contexto da encomenda simulada ou encaminhá-la para um especialista.";
  if(/[¿¡ñ]|\b(gracias|pedido|puede|quiero|necesito)\b/.test(value))return "Responderé en español. Puedo revisar esta consulta con los datos del pedido simulado o derivarla a un especialista.";
  if(/[äöüß]|\b(danke|bestellung|können|bitte|ich)\b/.test(value))return "Ich antworte auf Deutsch. Ich kann die Anfrage anhand der simulierten Bestelldaten prüfen oder sie an einen Mitarbeiter weiterleiten.";
  if(/[àâçéèêëîïôùûüÿœ]|\b(bonjour|merci|commande|pouvez|je)\b/.test(value))return "Je vous réponds en français. Je peux vérifier cette demande avec les données de commande simulées ou la transmettre à un conseiller.";
  const isAscii=Array.from(text).every(character=>(character.codePointAt(0)??0)<128);
  return isAscii?"I’ll continue in English. I can check this against the fictional order context or transfer the conversation to a specialist.":scenarioReply;
}

function ChannelIcon({id}:{id:ChannelId}){
  if(id==="email")return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if(id==="instagram")return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  if(id==="messenger")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17.5V21l3.4-1.9A9.5 9.5 0 1 0 4 17.5Z"/><path d="m7.5 14 3-3 2.5 2 3.5-3"/></svg>;
  if(id==="chat")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z"/><path d="M9 8.2c.4 2.8 2 4.4 4.8 4.8l1.2-1.1 2 1c-.4 1.7-1.5 2.5-3 2.3-3.8-.5-6.7-3.4-7.2-7.2-.2-1.5.6-2.6 2.3-3l1 2-1.1 1.2Z"/></svg>;
}
