import type { Metadata } from "next";
import { DemoChrome } from "../../components/DemoChrome";
import { SupportOperations } from "../../components/SupportOperations";

export const metadata:Metadata={title:"Interactive AI support agent demo",description:"Explore a multilingual, multi-channel ecommerce support agent."};

export default function SupportDemo(){return <DemoChrome number="01" title="AI Support Agent" status="Interactive demo"><SupportOperations immersive/></DemoChrome>}
