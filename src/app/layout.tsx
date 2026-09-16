import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { defaultLocale } from "@/i18n/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display. Grotesca con caracter propia, usada solo en titulares y cifras.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Se ejecuta antes de pintar, para que no haya un destello con el tema
 * equivocado. Respeta prefers-color-scheme salvo que la persona haya elegido
 * a mano, que es lo que guarda localStorage.
 *
 * Tambien corrige el lang del documento: las dos rutas de idioma comparten
 * este layout, asi que el HTML servido siempre dice "es". Para los rastreadores
 * lo resuelve el hreflang de alternates.languages.
 */
const bootstrapScript = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored === "dark" || (stored !== "light" && prefersDark);
    document.documentElement.classList.toggle("dark", dark);
  } catch (error) {}
  try {
    if (location.pathname.indexOf("/en") === 0) {
      document.documentElement.lang = "en";
    }
  } catch (error) {}
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={defaultLocale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
        {children}
      </body>
    </html>
  );
}
