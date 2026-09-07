# Contribuir

## Alcance

Un patrón nuevo es una carpeta en `src/patterns/<nombre>/` con:

1. El código del patrón (sin dependencias de otras features).
2. Una página de demostración enlazada desde `App.tsx`.
3. Al menos un test que fije el contrato, no el CSS.

Documenta en el README **cuándo usarlo** y **qué se paga**. Si el patrón no
tiene un trade-off honesto, no entra.

## Estilo

- Código en inglés. Copy de UI en castellano.
- TypeScript estricto. Sin `any`.
- Tests con vitest y testing-library. Preferir el contrato (estado, roles,
  funciones puras) frente a snapshots.
- No añadir state managers ni librerías de máquinas salvo que el patrón sea
  precisamente esa integración.

## Proceso

```bash
npm test
npm run lint
```

PRs pequeñas. Un patrón por PR, salvo correcciones de tipado o CI.
