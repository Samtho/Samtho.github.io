import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata("en");
}

export default function EnglishHome() {
  return <AppShell locale="en" />;
}
