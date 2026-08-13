import type { ReactNode } from "react";

export function DemoChrome({number,title,status,children}:{number:string;title:string;status:string;children:ReactNode}){
  const returnHref=number==="01"?"/#support":number==="02"?"/#dashboard":"/#content";
  return <main className="demo-page">
    <header className="demo-header"><a href={returnHref} aria-label="Return to the main website">← Ab Singh</a><div><span>{number}</span><strong>{title}</strong></div><i>{status}</i></header>
    {children}
  </main>;
}
