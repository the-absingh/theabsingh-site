import type { ReactNode } from "react";
import Link from "next/link";

export function DemoChrome({number,title,status,children}:{number:string;title:string;status:string;children:ReactNode}){
  return <main className="demo-page">
    <header className="demo-header"><Link href="/">← Ab Singh</Link><div><span>{number}</span><strong>{title}</strong></div><i>{status}</i></header>
    {children}
  </main>;
}
