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

## CORS

CORS está habilitado para **todos los orígenes** mediante el paquete [`cors`](https://www.npmjs.com/package/cors), registrado globalmente antes de las rutas (`server.js`):

```js
import cors from 'cors';

app.use(cors());
```

Como el middleware se aplica antes de los handlers, las cabeceras de CORS también acompañan a las respuestas de error `404`.

Configuración por defecto aplicada:

| Aspecto | Valor | Nota |
|---------|-------|------|
| Origen | `*` | Cualquier dominio puede consumir la API |
| Credenciales | Deshabilitadas | La API es de solo lectura, no usa cookies ni `Authorization` |
| Métodos | `GET, HEAD, PUT, PATCH, POST, DELETE` | Incluidos en la respuesta al preflight |
| Caché de preflight | 600 segundos | `Access-Control-Max-Age` |

No se habilitan credenciales porque `Access-Control-Allow-Credentials: true` es incompatible con el origen comodín `*`: obligaría a reflejar el origen concreto de cada petición.

### Precedencias

Solo los navegadores aplican CORS. Un `curl` con `Origin: http://otro-dominio.com` recibe `200` con o sin CORS, porque la validación la hace el navegador, no el servidor.

Las peticiones que **sí** requieren que CORS esté bien configurado son las que nacen en el navegador: si una app en `http://localhost:5173` hace `fetch('http://localhost:3000/libros')`, el navegador envía primero un `OPTIONS` de preflight. Si la respuesta a ese preflight no incluye `Access-Control-Allow-Origin`, el navegador bloquea la llamada y la consola muestra un error de CORS.

Para comprobar el preflight desde la terminal:

```bash
curl -i -X OPTIONS http://localhost:3000/libros \
  -H "Origin: http://otro-dominio.com" \
  -H "Access-Control-Request-Method: GET"
```

Respuesta esperada:

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
```

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