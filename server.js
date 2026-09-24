import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', editorial: 'Sudamericana', añoPublicacion: 1967 },
  { id: 2, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', editorial: 'Reynal & Hitchcock', añoPublicacion: 1943 },
  { id: 3, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', editorial: 'Francisco de Robles', añoPublicacion: 1605 },
  { id: 4, titulo: '1984', autor: 'George Orwell', editorial: 'Secker & Warburg', añoPublicacion: 1949 },
  { id: 5, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', editorial: 'Ballantine Books', añoPublicacion: 1953 }
];

app.get('/', (req, res) => {
  res.json({
    message: 'hola mundo',
    endpoints: [
      { method: 'GET', path: '/' },
      { method: 'GET', path: '/libros' },
      { method: 'GET', path: '/libros/:id' },
      { method: 'GET', path: '/libros/buscar?q=&autor=&editorial=&año=&limit=' }
    ]
  });
});

app.get('/libros', (req, res) => {
  res.json(libros);
});

app.get('/libros/buscar', (req, res) => {
  const { q, autor, editorial, año, limit } = req.query;
  let result = [...libros];
  if (q) {
    const queryLower = q.toLowerCase();
    result = result.filter((l) =>
      l.titulo.toLowerCase().includes(queryLower) ||
      l.autor.toLowerCase().includes(queryLower) ||
      l.editorial.toLowerCase().includes(queryLower)
    );
  }
  if (autor) {
    const autorLower = autor.toLowerCase();
    result = result.filter((l) => l.autor.toLowerCase().includes(autorLower));
  }
  if (editorial) {
    const editorialLower = editorial.toLowerCase();
    result = result.filter((l) => l.editorial.toLowerCase().includes(editorialLower));
  }
  if (año) {
    const añoNum = parseInt(año);
    if (!isNaN(añoNum)) {
      result = result.filter((l) => l.añoPublicacion === añoNum);
    }
  }
  if (limit) {
    const lim = parseInt(limit);
    if (!isNaN(lim)) {
      result = result.slice(0, lim);
    }
  }
  res.json(result);
});

app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find((l) => l.id === id);
  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
  res.json(libro);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
