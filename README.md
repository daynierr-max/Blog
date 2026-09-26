# Reflexiones Atemporales · Blog con laboratorio de IA

Blog personal con narrativa interactiva, búsqueda y una sección **Laboratorio** donde Gemini genera reflexiones (filosófica, poética e histórica) sobre un concepto, además de imágenes de portada.

**Stack:** React 19 · TypeScript · Vite · React Router · Gemini API (salida JSON estructurada y generación de imágenes) · Cloudflare Pages Functions

## Uso de IA

| Endpoint | Qué hace |
|---|---|
| `/api/reflection` | Devuelve un JSON validado por esquema (`responseSchema`) con tres perspectivas sobre el concepto |
| `/api/image` | Genera una imagen abstracta 16:9 para las portadas |

## Arquitectura y seguridad

```
Navegador (React + Vite)  ──fetch /api/*──►  Cloudflare Pages Functions  ──►  API de Gemini
       sin clave                              GEMINI_API_KEY (variable de entorno)
```

- La clave de Gemini **nunca llega al navegador**. La primera versión, generada con Google AI Studio, la incrustaba en el JavaScript público mediante `define` en `vite.config.ts`. La he movido a funciones de servidor.
- Cada endpoint hace **una sola tarea**, con un prompt fijo y entradas validadas (tipo, longitud, rangos). No es un proxy abierto a Gemini.
- Límite de tamaño en las peticiones y errores genéricos hacia el cliente (el detalle queda en los logs del servidor).

## Ejecutar en local

```bash
npm install
echo "GEMINI_API_KEY=tu_clave" > .dev.vars      # no se sube al repo (.gitignore)
npm run build && npx wrangler pages dev dist     # app + funciones en :8788
```

## Despliegue

Cloudflare Pages: build `npm run build`, salida `dist`, y `GEMINI_API_KEY` como variable de entorno cifrada.
