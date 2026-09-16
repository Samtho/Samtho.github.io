// Pagina minima del Milestone 0: solo sirve para verificar que el despliegue funciona.
// El contenido real se construye a partir del Milestone 2.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <p className="text-sm font-medium tracking-wide text-brand uppercase">
        Portfolio en construcción
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Samuel Ortega
      </h1>
      <p className="text-lg text-muted-foreground">Product Manager. Madrid.</p>
    </main>
  );
}
