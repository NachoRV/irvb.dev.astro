---
title: "GIT: Trabajando con ramas."
pubDate: "2022-01-29T15:22:00Z"
description: "Git branch, trabajando con ramas.
author: "irvb"
image:
    url: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80"
    alt: 'git'
tags: [git]
---



Si este es tu primer contacto con git te recomiendo le des un vistazo a este **[post]**

[post]: /posts/git-comandos-basicos

# Trabajo con ramas

Pensemos en git como en un árbol, en este sentido tenderemos una rama principal o tronco que normalmente recibe el nombre de **main** y el resto de ramas que como en la naturaleza pueden partir de esta u otra rama. Las ramas mas comunes en todo proyecto suelen se **main**, **develop**, **feature**, **release**, **hotfix**

## Creando ramas

```bash
git branch <mi-primera-rama> // crea la rama
git switch <nombre-rama> // me cambio a la rama
git switch -c <mi-primera-rama> // crea y me cambia a la rama
git checkout -b <mi-primera-rama> //  en desuso, crea y me cambia a la rama
```

## Listando ramas

```bash
git branch // muestra el listado de ramas
git branch --show-current // muestra la rama en la que estas
```

## Fusion de ramas

```bash
git merge <rama-new-feature> // fusiona la rama con la rama en la que nos encontremos
```

## Borrar rama

```bash
git branch --delete <mi-primera-rama> // Borra la rama
git branch --D mi-primera-rama // Fuerza el borrado de la rama si no la has fusionado antes
git remote prune origin --dry-run // muestra las ramas locales que ya no están en el remoto
git remote prune origin // elimina las ramas locales que ya han sido borradas del remoto.
```

# Trabajando con repositorio remoto

Uno de los puntos fuertes de git es que nos permite trabajar de forma colaborativa con el resto de compañeros del proyecto de una manera simple o mas o menos simple. Para ello es importante que aprendamos a trabajar con los repositorios remotos

## Clonar un repositorio remoto existente

```bash
git clone http://url.es // clona un repositorio
```

## Añadir repositorio remoto

Si ya tenemos un repositorio git en local y lo que queremos es asociarle uno remoto.

```bash
➡ git remote add origin http://url.es
```

## Subiendo cambios al repositorio remoto

Subimos los distintos commit al repositorio remoto

```bash
git push origin main
```

## Actualizando el repo

```bash
git fetch // baja las referencias del rep
git pull // actualiza el repositorio (git fetch implícito)
```

# GitFlow

En el trabajo con repositorios remotos uno de los flujos o modelos que mas suena o de moda esta es gitFlow se centra en el uso de ramas de función y varias principales, a continuación te dejo en resumen de las mismas

➡ **main** (o master) -> Su propósito es contener el código que esta en producción
➡ **develop** -> Código de pre producción, aun hay que hacer las pruebas
➡ **feature** -> Para trabajar en una nueva característica
➡ **Release** -> Parar prepara el lanzamiento de una nueva version
➡ **Hotfix** -> para arreglar bug en producción

# Commit semánticos

Los commits semánticos son una especificación para dar significado a los mensajes de los commits haciéndolos legibles para máquinas y humanos. De esta manera establecemos un estándar para nuestros commits.

## prefijos para commit semánticos

➡ feat: para una nueva caracteristristica del usuario
➡ fix: para un bug que afecta al usuario
➡ pref: para cambios que mejoran el rendimiento
➡ build: para cambios en el sistema de build
➡ ci: cambios en el sistema de integración continua
➡ docs: para cambios en la documentación
➡ refactor: refactorization del código
➡ style: cambios de formato, tabulaciones, espacios, punto y coma
➡ test: creación de test y refactor de los mismos

# Creación de alias

Los alias se usan para crear comandos más cortos que se asignan a comandos más largos.

```bash
git config --global alias.[nombre del alias] "comando"
```

Ejemplos

➡ git config --global alias.br branch
➡ git config --global alias.ch checkout
➡ git config --global alias.cm commit
➡ git config --global alias.st status
