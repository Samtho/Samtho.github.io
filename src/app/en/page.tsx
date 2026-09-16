import type { Metadata } from "next";
import { Landing } from "@/components/Landing";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata("en");
}

export default function EnglishHome() {
  return <Landing locale="en" />;
}
