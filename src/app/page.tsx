import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata("es");
}

export default function Home() {
  return <AppShell locale="es" />;
}
