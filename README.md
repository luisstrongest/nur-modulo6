# nur-modulo6 — Linting, EditorConfig y Git Hooks

Proyecto **React + TypeScript + Vite** para el módulo de CI/CD del diplomado.

## Requerimientos cubiertos

| Requerimiento | Implementación |
|---|---|
| SonarLint y un linter en el editor | VS Code con **SonarQube for IDE** (antes SonarLint) y **ESLint**, recomendadas en `.vscode/extensions.json` |
| Archivo `.editorconfig` / configuración de linting | `.editorconfig` en la raíz y `eslint.config.js` (flat config de ESLint) |
| Regla para forzar tabs y no espacios | `indent_style = tab` en `.editorconfig` y `@stylistic/indent: ['error', 'tab']` en ESLint |
| pre-commit / pre-push | **Husky** + **lint-staged** en `.husky/pre-commit` y `.husky/pre-push` |

## Requisitos

- Node.js 20.19+ o 22.12+
- VS Code con las extensiones recomendadas:
  - `sonarsource.sonarlint-vscode` (SonarQube for IDE)
  - `dbaeumer.vscode-eslint` (ESLint)
  - `editorconfig.editorconfig` (EditorConfig for VS Code)

Al abrir la carpeta, VS Code sugiere instalarlas automáticamente.

## Instalación

```bash
npm install
```

El script `prepare` ejecuta `husky` y registra los hooks de git (`core.hooksPath = .husky/_`).

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila TypeScript y genera el build de producción |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |
| `npm run lint:fix` | Corrige automáticamente lo que se pueda (por ejemplo, espacios a tabs) |

## Configuración

### `.editorconfig`

Define el estilo base para cualquier editor:

```ini
[*]
indent_style = tab
indent_size = 4
end_of_line = lf
charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = true
```

Los archivos YAML usan espacios porque la especificación de YAML no permite tabs.

### `eslint.config.js`

Además de las reglas recomendadas de JavaScript, TypeScript y React Hooks, fuerza tabs:

```js
'@stylistic/indent': ['error', 'tab'],
'@stylistic/jsx-indent-props': ['error', 'tab'],
'@stylistic/no-mixed-spaces-and-tabs': 'error',
```

> En ESLint 9+ la regla `indent` del core está deprecada y se movió al plugin `@stylistic/eslint-plugin`.

### `.vscode/settings.json`

Hace que el editor inserte tabs, desactiva la detección automática de indentación, muestra los espacios en blanco y aplica `eslint --fix` al guardar.

## Git hooks

| Hook | Qué ejecuta | Efecto |
|---|---|---|
| `pre-commit` | `npx lint-staged` → `eslint --max-warnings=0` sobre los archivos en stage | Bloquea el commit si algún archivo tiene errores, por ejemplo indentación con espacios |
| `pre-push` | `npm run lint` y `npm run build` | Bloquea el push si el proyecto no pasa el lint o no compila |

### Prueba

```bash
# Archivo indentado con espacios
printf 'export function suma(a: number, b: number) {\n  return a + b\n}\n' > src/prueba.ts
git add src/prueba.ts
git commit -m "prueba"
# ✖ Expected indentation of 1 tab but found 2 spaces  @stylistic/indent
# husky - pre-commit script failed (code 1)

npx eslint src/prueba.ts --fix   # convierte los espacios en tabs
git add src/prueba.ts
git commit -m "prueba"           # ahora el commit pasa
```
