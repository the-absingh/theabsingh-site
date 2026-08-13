import type { Metadata } from "next";
import { DemoChrome } from "../../components/DemoChrome";
import { ContentStudio } from "../../components/ContentStudio";

export const metadata:Metadata={title:"Interactive content automation demo",description:"Explore a governed multi-channel content automation workspace."};

export default function ContentDemo(){return <DemoChrome number="03" title="Content Automation" status="Product preview"><ContentStudio immersive/></DemoChrome>}
