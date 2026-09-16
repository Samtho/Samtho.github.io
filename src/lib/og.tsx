import type { ReactElement } from "react";

type Props = {
  name: string;
  headline: string;
  location: string;
  site: string;
};

/**
 * Imagen de Open Graph. Repite el motivo de la pagina: la espina a la
 * izquierda con su nodo encendido en indigo.
 */
export function ogImage({ name, headline, location, site }: Props): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#09090b",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 8,
          backgroundColor: "#7d87ff",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            {location}
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, marginTop: 20 }}>
            {name}
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              marginTop: 24,
              color: "#d4d4d8",
              maxWidth: 900,
            }}
          >
            {headline}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#7d87ff" }}>{site}</div>
      </div>
    </div>
  );
}
