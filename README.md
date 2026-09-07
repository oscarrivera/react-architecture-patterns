# react-architecture-patterns

Catálogo ejecutable de patrones de arquitectura frontend. Vite, React 18, TypeScript.

No es un kit de UI. Cada carpeta en `src/patterns/` es un ejemplo mínimo con
página y test. Las etiquetas de la interfaz están en castellano; el código, en
inglés.

## Cómo ejecutarlo

```bash
npm install
npm test
npm run dev
```

Rutas:

| Ruta | Patrón |
|------|--------|
| `/` | índice |
| `/hexagonal` | feature folder / puerto-adaptador |
| `/compound-tabs` | compound components |
| `/async-machine` | máquina async `idle\|loading\|success\|error` |
| `/error-boundary` | boundary + `mapError` |
| `/form-validation` | `validate()` pura |

## Cuándo usar cada patrón

### Feature folder / hexagonal

**Usar** cuando el caso de uso (listar notas, pagar, firmar) va a tener más de
un origen de datos o hay que testear la UI sin HTTP.

**Contrato:** el hook de dominio recibe un puerto. `httpNotes` implementa el
puerto. La página ensambla.

**Coste:** más archivos por feature. Exceso si el módulo es un formulario
tonto de una sola pantalla. No sustituye un backend hexagonal: aquí el
hexágono vive en el cliente.

### Compound components

**Usar** cuando el consumidor debe componer ranuras (tabs, select, accordion)
sin una sopa de booleanos.

**Contrato:** un `Root` con contexto; hijos semánticos (`List`, `Tab`, `Panel`).

**Coste:** peor para árboles dinámicos muy profundos si el contexto se
re-renderiza entero. No es un sistema de diseño: no hay tokens ni temas.

### Máquina de estados async

**Usar** cuando el fetch tiene transiciones que un `useState('loading')` acaba
mezclando (doble submit, respuesta tardía tras reset).

**Contrato:** reducer puro. `SUCCESS`/`FAILURE` solo desde `loading`.

**Coste:** más ceremonia que React Query. Si el producto ya tiene un cliente
de servidor con cache, no reinventar la cola de peticiones aquí. XState no
hace falta hasta que el grafo deje de caber en un `switch`.

### Error boundary + mapeo

**Usar** para fallos de *render* y para traducir errores de dominio a copy
estable. El mapeo se testea sin montar React.

**Coste:** no captura errores en handlers asíncronos ni en el propio boundary.
No es un reporter de crash. `mapError` debe permanecer exhaustivo a propósito:
un código desconocido es `UNKNOWN`, no un mensaje del stack.

### Validación fuera de la UI

**Usar** cuando las reglas (correo, longitud, coincidencia) tienen que vivir
igual en cliente y en un test o en un worker.

**Contrato:** `validate(input) → errors`. La UI no decide la regla.

**Coste:** no cubre validación asíncrona (unicidad en servidor) ni schemas
complejos. Si el formulario es un wizard de diez pasos, un schema (Zod, etc.)
escala mejor que un `if` por campo; el principio es el mismo: la regla no vive
en el JSX.

## Scripts

- `npm test` — vitest + testing-library
- `npm run dev` / `npm start` — Vite
- `npm run build`
- `npm run lint`

Licencia MIT. Ver `CONTRIBUTING.md`.
