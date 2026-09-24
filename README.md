# server-express-render

Servidor Express simple construido con sintaxis ES Modules (`import`) que expone una API con datos hardcodeados sobre libros.

## Requisitos

- Node.js (18 o superior)
- npm

## Instalación

```bash
npm install
```

## Uso

```bash
npm start
```

El servidor arranca en `http://localhost:3000` (o en el puerto definido por la variable de entorno `PORT`).

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Mensaje de bienvenida y listado de endpoints disponibles |
| GET | `/libros` | Listado completo de libros |
| GET | `/libros/:id` | Libro por id (404 si no existe) |
| GET | `/libros/buscar` | Búsqueda con query string |

### Búsqueda (`/libros/buscar`)

Parámetros de query string (todos opcionales):

| Parámetro | Descripción |
|-----------|-------------|
| `q` | Texto a buscar en título, autor o editorial |
| `autor` | Filtra por autor (búsqueda parcial, sin distinguir mayúsculas) |
| `editorial` | Filtra por editorial (búsqueda parcial, sin distinguir mayúsculas) |
| `año` | Filtra por año de publicación |
| `limit` | Limita el número de resultados |

### Ejemplos

```bash
# Todos los libros
curl http://localhost:3000/libros

# Libro con id 2
curl http://localhost:3000/libros/2

# Búsqueda por texto
curl "http://localhost:3000/libros/buscar?q=soledad"

# Búsqueda por autor
curl "http://localhost:3000/libros/buscar?autor=orwell"

# Búsqueda por año con límite de resultados
curl "http://localhost:3000/libros/buscar?año=1949&limit=1"
```

## Estructura de un libro

```json
{
  "id": 1,
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "editorial": "Sudamericana",
  "añoPublicacion": 1967
}
```

## Licencia

ISC