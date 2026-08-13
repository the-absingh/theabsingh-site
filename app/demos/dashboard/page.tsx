import type { Metadata } from "next";
import { DemoChrome } from "../../components/DemoChrome";
import { DashboardExperience } from "../../components/DashboardExperience";

export const metadata:Metadata={title:"Interactive ecommerce operations dashboard",description:"Explore a custom single-store and multi-store ecommerce dashboard."};

export default function DashboardDemo(){return <DemoChrome number="02" title="Operations Dashboard" status="Interactive demo data"><DashboardExperience immersive/></DemoChrome>}
