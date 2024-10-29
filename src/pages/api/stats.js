export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("http://localhost:4000/stats");
      const stats = await response.json();

      // Supongamos que 'stats' es un array de objetos que tienen el campo 'fecha_creacion'
      const statsOrdenados = stats.sort(
        (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
      );

      res.status(200).send(statsOrdenados);
    } catch (error) {
      res
        .status(500)
        .send({
          status: "Error",
          message: "Error al obtener las estadísticas",
        });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
