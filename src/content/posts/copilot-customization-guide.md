---
title: "Guía de Personalización de GitHub Copilot en VS Code"
pubDate: 2026-03-12
description: "Cómo personalizar GitHub Copilot en VS Code: instrucciones, prompts, agentes, skills y hooks."
author: "irvb"
image:
  url: "https://miro.medium.com/0*vjawgR1I-UuY-rf4.png"
  alt: 'GitHub Copilot y VS Code'
tags: [copilot, vscode, personalización, productividad, desarrollo]
---

# Guía de Personalización de GitHub Copilot en VS Code

En este artículo descubrirás cómo adaptar GitHub Copilot a tu flujo de trabajo en Visual Studio Code. Aprenderás a usar archivos de instrucciones, prompts reutilizables, agentes personalizados, skills especializadas y hooks automatizados para maximizar la productividad y el control sobre la IA. Esta guía está pensada para desarrolladores y equipos que buscan sacar el máximo partido a Copilot, tanto en proyectos personales como colaborativos.

---


## 1. Instrucciones de Workspace — `copilot-instructions.md` / `AGENTS.md`

Directrices que se aplican **automáticamente a todas las solicitudes** en todo el proyecto.

| Archivo                | Ubicación      | Propósito                                               |
|------------------------|---------------|---------------------------------------------------------|
| copilot-instructions.md| .github/      | Estándares generales del proyecto (recomendado, cross-editor) |
| AGENTS.md              | Raíz o subcarpetas | Estándar abierto, soporte de jerarquía para monorepos   |

> Usa **solo uno** de los dos, no ambos.

### Jerarquía en monorepos con `AGENTS.md`

```
/AGENTS.md              # Configuración raíz
/frontend/AGENTS.md     # Específico para frontend (sobrescribe raíz)
/backend/AGENTS.md      # Específico para backend (sobrescribe raíz)
```

### Ejemplo

```markdown
# Project Guidelines

## Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks

## Build and Test
- Run `pnpm test` before committing
- Use Vitest for unit tests

## Conventions
- API routes follow RESTful naming
- All components go in `src/components/`
```

### Cuándo usarlo

- Reglas de estilo de código que aplican a todo el proyecto
- Preferencias de equipo compartidas vía control de versiones
- Requisitos generales (testing, documentación, arquitectura)

### Fuentes

- [Custom Instructions - VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [AGENTS.md Specification](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)

---

## 2. Instrucciones por Archivo/Tarea — `*.instructions.md`

Directrices que se cargan **bajo demanda** cuando son relevantes para la tarea actual, o **explícitamente** cuando los archivos en contexto coinciden con un patrón.


| Ubicación                                         | Alcance           |
|---------------------------------------------------|-------------------|
| .github/instructions/*.instructions.md             | Workspace (equipo) |
| ~/Library/Application Support/Code/User/instructions/*.instructions.md | Usuario (personal) |

### Frontmatter

```yaml
---
description: "Use when writing database migrations, schema changes, or data transformations"
name: "Migration Guidelines"       # Opcional
applyTo: "**/*.ts"                  # Opcional, auto-adjuntar para archivos que coincidan
---
```

### Modos de descubrimiento


| Modo                | Activación                  | Caso de uso                           |
|---------------------|----------------------------|---------------------------------------|
| On-demand (description) | El agente detecta relevancia | Tareas: migraciones, refactoring, API |
| Explícito (applyTo) | Archivos que coincidan con el glob | Archivos: estándares por lenguaje/framework |
| Manual              | Add Context → Instructions  | Adjuntar manualmente                  |
| **On-demand** (`description`) | El agente detecta relevancia | Tareas: migraciones, refactoring, API |
| **Explícito** (`applyTo`) | Archivos que coincidan con el glob | Archivos: estándares por lenguaje/framework |
| **Manual** | `Add Context` → `Instructions` | Adjuntar manualmente |

### Patrones de `applyTo`

```yaml
applyTo: "**"                    # SIEMPRE incluido (usar con precaución)
applyTo: "**/*.py"               # Todos los archivos Python
applyTo: ["src/**", "lib/**"]    # Múltiples patrones (OR)
applyTo: "src/api/**/*.ts"       # Carpeta + extensión específica
```

### Ejemplo

```markdown
---
description: "Use when writing React components. Covers component patterns, hooks, and testing."
applyTo: "src/components/**/*.tsx"
---

# React Component Guidelines

- Use functional components with TypeScript
- Extract custom hooks for shared logic
- Co-locate tests: `Component.test.tsx` junto al componente
```

### Cuándo usarlo

- Reglas específicas para ciertos tipos de archivo (`.py`, `.tsx`, `.sql`)
- Guías para tareas concretas (migraciones, refactoring, APIs)
- Estándares de frameworks específicos

### Fuentes

- [Custom Instructions - VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

---

## 3. Prompts Reutilizables — `*.prompt.md`

Plantillas de tareas reutilizables que se invocan bajo demanda en el chat. Para **tareas puntuales y enfocadas** con entradas parametrizadas.

| Ubicación | Alcance |
|-----------|---------|
| `.github/prompts/*.prompt.md` | Workspace (equipo) |
| `~/Library/Application Support/Code/User/prompts/*.prompt.md` | Usuario (personal) |

### Frontmatter

```yaml
---
description: "Generate test cases for selected code"
name: "Generate Tests"              # Opcional
argument-hint: "Describe the test scenario..."  # Opcional
agent: "agent"                      # Opcional: ask, agent, plan, o agente custom
model: "Claude Sonnet 4"            # Opcional, soporta fallback con array
tools: [search, web]                # Opcional: built-in, MCP (<server>/*), extensión
---
```

### Fallback de modelo

```yaml
model: ['GPT-5 (copilot)', 'Claude Sonnet 4.5 (copilot)']
```

### Ejemplo

```markdown
---
description: "Generate comprehensive test cases for selected code"
agent: "agent"
---

Generate comprehensive test cases for the provided code:
- Include edge cases and error scenarios
- Follow existing test patterns in the codebase
- Use descriptive test names

Context: [test config](./vitest.config.ts)
```

### Invocación

- **Chat**: Escribe `/` → selecciona del listado de prompts y skills
- **Comando**: `Chat: Run Prompt...`
- **Editor**: Abre el archivo `.prompt.md` → botón de play

### Cuándo usarlo

- Tareas repetitivas (generar tests, crear componentes, documentar)
- Cuando quieres estandarizar cómo se realizan ciertas tareas en el equipo
- Operaciones puntuales que no requieren múltiples pasos

### Fuentes

- [Prompt Files - VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

---

## 4. Agentes Personalizados — `*.agent.md`

Personas especializadas con herramientas, instrucciones y comportamientos específicos. Para **workflows orquestados con restricciones de herramientas por rol**.


| Ubicación                                 | Alcance           |
|-------------------------------------------|-------------------|
| .github/agents/*.agent.md                 | Workspace (equipo) |
| ~/Library/Application Support/Code/User/agents/*.agent.md | Usuario (personal) |

### Frontmatter

```yaml
---
description: "Frontend specialist for React and CSS"
name: "Frontend Agent"
tools: [search, edit, execute, web]     # Aliases, MCP, extensiones
model: "Claude Sonnet 4"               # Soporta array para fallback
agents: [helper-agent]                  # Subagentes permitidos (omitir = todos)
user-invocable: true                    # Visible en el picker (default: true)
disable-model-invocation: false         # Prevenir invocación como subagente
handoffs: [...]                         # Transiciones a otros agentes
---
```

### Aliases de herramientas

| Alias | Propósito |
|-------|-----------|
| `execute` | Ejecutar comandos shell |
| `read` | Leer contenido de archivos |
| `edit` | Editar archivos |
| `search` | Buscar archivos o texto |
| `agent` | Invocar agentes como subagentes |
| `web` | Fetch de URLs y búsqueda web |
| `todo` | Gestionar listas de tareas |

### Control de invocación

| Atributo | Default | Efecto |
|----------|---------|--------|
| `user-invocable: false` | `true` | Oculto del picker, solo accesible como subagente |
| `disable-model-invocation: true` | `false` | Otros agentes no pueden invocarlo |

### Ejemplo

```markdown
---
description: "Database specialist. Use for schema design, query optimization, and migrations."
tools: [search, read, execute]
model: "Claude Sonnet 4"
---

# Database Agent

You are a database specialist. Focus on:
- Schema design and normalization
- Query performance optimization
- Safe migration strategies
- Always suggest rollback plans
```

### Cuándo usarlo

- Especialistas con acceso restringido a herramientas
- Workflows multi-etapa con diferentes roles
- Subagentes que procesan y devuelven resultados aislados

### Fuentes

- [Custom Agents - VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

---

## 5. Skills (Habilidades) — `SKILL.md`

Carpetas con instrucciones, scripts y recursos que los agentes cargan bajo demanda para **tareas especializadas multi-paso**.


| Ubicación                                 | Alcance           |
|-------------------------------------------|-------------------|
| .github/skills/<nombre>/SKILL.md          | Proyecto          |
| .agents/skills/<nombre>/SKILL.md          | Proyecto          |
| .claude/skills/<nombre>/SKILL.md          | Proyecto          |
| ~/.copilot/skills/<nombre>/SKILL.md       | Personal          |
| ~/.agents/skills/<nombre>/SKILL.md        | Personal          |

### Estructura de carpeta

```
.github/skills/mi-skill/
├── SKILL.md           # Obligatorio (nombre debe coincidir con carpeta)
├── scripts/           # Scripts ejecutables
├── references/        # Documentación auxiliar
└── assets/            # Templates, boilerplate
```

### Frontmatter

```yaml
---
name: mi-skill                   # Obligatorio: 1-64 chars, minúsculas, alfanumérico + guiones
description: 'Descripción de qué hace y cuándo usarlo. Max 1024 chars.'
argument-hint: 'Hint opcional para invocación con /'
user-invocable: true             # Opcional: mostrar como slash command
disable-model-invocation: false  # Opcional: deshabilitar carga automática
---
```

### Ejemplo

```markdown
---
name: webapp-testing
description: 'Test web applications using Playwright. Use for verifying frontend, debugging UI, capturing screenshots.'
---

# Web Application Testing

## When to Use
- Verify frontend functionality
- Debug UI behavior

## Procedure
1. Start the web server
2. Navigate to the target page
3. Run automated checks using [test script](./scripts/run-tests.js)
4. Capture screenshots for visual regression
```

### Cuándo usarlo

- Workflows complejos de múltiples pasos
- Cuando necesitas empaquetar scripts, templates y docs juntos
- Procesos repetibles que el agente debe seguir paso a paso

### Fuentes

- [Agent Skills - VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

---

## 6. Hooks (Automatización) — `*.json`

Comandos shell deterministas que se ejecutan en **eventos del ciclo de vida** del agente. Para enforcement de políticas y automatización.

| Ubicación | Alcance |
|-----------|---------|
| `.github/hooks/*.json` | Workspace (equipo) |

### Eventos disponibles


| Evento           | Se dispara cuando...                |
|------------------|-------------------------------------|
| SessionStart     | Primer prompt de una nueva sesión   |
| UserPromptSubmit | El usuario envía un prompt          |
| PreToolUse       | Antes de invocar una herramienta    |
| PostToolUse      | Después de usar una herramienta exitosamente |
| PreCompact       | Antes de compactar contexto         |
| SubagentStart    | Un subagente inicia                 |
| SubagentStop     | Un subagente termina                |
| Stop             | La sesión del agente finaliza       |

### Ejemplo

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write",
        "timeout": 10
      }
    ]
  }
}
```

### Cuándo usarlo

- Bloquear operaciones peligrosas antes de que se ejecuten
- Correr linters/formatters automáticamente después de ediciones
- Inyectar contexto dinámico al inicio de sesión
- Validación determinista (no depende del criterio del agente)

### Fuentes

- [Hooks - VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/hooks)

---

## Resumen Comparativo

| Primitiva | Archivo | Comportamiento | Invocación |
|-----------|---------|----------------|------------|
| Instrucciones globales | `copilot-instructions.md` / `AGENTS.md` | Siempre activo | Automática |
| Instrucciones por archivo | `*.instructions.md` | Por patrón de archivo o tarea | Automática / Manual |
| Prompts | `*.prompt.md` | Tarea puntual parametrizada | `/` en chat |
| Agentes | `*.agent.md` | Persona con tools restringidas | Picker de agentes |
| Skills | `SKILL.md` + carpeta | Workflow multi-paso con assets | `/` en chat |
| Hooks | `*.json` | Comandos shell en eventos | Automática |

## ¿Cuál elegir?

```
¿Aplica a TODO el proyecto?
  └─ Sí → copilot-instructions.md o AGENTS.md
  └─ No → ¿Aplica a ciertos archivos o tareas?
              └─ Sí → *.instructions.md
              └─ No → ¿Es una tarea puntual?
                          └─ Sí, simple → *.prompt.md
                          └─ Sí, multi-paso con assets → SKILL.md
                          └─ Necesita tools restringidas → *.agent.md
                          └─ Debe ser determinista → hooks/*.json
```

## Recursos Generales

- [Customizing Copilot - Documentación principal](https://code.visualstudio.com/docs/copilot/customization)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Chat](https://code.visualstudio.com/docs/copilot/copilot-chat)
- [GitHub Copilot Blog](https://github.blog/tag/github-copilot/)
