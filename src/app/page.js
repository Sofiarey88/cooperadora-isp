"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [stats, setStats] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [cobros, setCobros] = useState([]);

  useEffect(() => {
    // Obtener estadísticas
    fetch("/api/stats")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      });

    // Obtener todos los alumnos y tomar solo los últimos 2
    fetch("/api/alumnos")
      .then((response) => response.json())
      .then((data) => {
        const ultimosAlumnos = data.slice(-2);
        setAlumnos(ultimosAlumnos);
      });

    // Obtener todos los cobros y tomar solo los últimos 2
    fetch("/api/pagos")
      .then((response) => response.json())
      .then((data) => {
        const ultimosPagos = data.slice(-2);
        setPagos(ultimosPagos);
      });
  }, []);

  return (
    <>
      <h1 className="layout-title">Inicio</h1>
      <div className="page-wrapper">
        <div className="stats-wrapper">
          {stats.map((stat) => (
            <Link href={stat.url} key={stat.url}>
              <div className="stat-item">
                <span>{stat.contador}</span>
                <h2>{stat.titulo}</h2>
              </div>
            </Link>
          ))}
        </div>

        <h2>Últimos Alumnos Creados</h2>
        <table className="alumnos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Fecha de Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno._id}>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.dni}</td>
                <td>
                  {new Date(alumno.fecha_nacimiento).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Últimos Pagos</h2>
        <table className="alumnos-table">
          <thead>
            <tr>
              <th>ID Pago</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {cobros.map((pago) => (
              <tr key={pago._id}>
                <td>{new fechaCreacion.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
