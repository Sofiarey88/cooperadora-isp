import Link from "next/link";

export default function RootMenu() {
  return (
    <div className="layout-menu">
      <h1 className="menu-title">Cooperadora ISP 20</h1>
      <ul>
        <Link href="/">
          <li>Inicio</li>
        </Link>
        <Link href="/alumnos">
          <li>Alumnos</li>
        </Link>
        <Link href="/cobros">
          <li>Cobros</li>
        </Link>
        <li>Reportes</li>
      </ul>
    </div>
  );
}

//boton cerrar sesioon
