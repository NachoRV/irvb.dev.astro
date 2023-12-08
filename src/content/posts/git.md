---
title: "GIT: Resumen y principales comandos."
pubDate: 2022-01-29
description: "Principales comandos git"
author: "irvb"
image:
    url: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80"
    alt: 'git'
tags: [git, web]
---

## Iniciar repositorio

Iniciar un repositorio nuevo.

```bash
git init
```

## Clonar un repositorio remoto

Clonar un repositorio remoto, por ejemplo de github.

```bash
git clone <https://mi_repositorio_remoto>
```

## Añadir Ficheros para el commit

Antes de realizar un commit tenemos que añadir/ indicar los ficheros que queremos que sean agregados al indice para el siguiente commit podemos hacerlo de dos formas

```bash
git add  <nombre del fichero>
git add . // Añade todos los ficheros con modificaciones
```

## Eliminar ficheros

Se puede considerar que es lo contrario a git add, sirve para eliminar un archivo o conjunto de ellos.

```bash
git rm PROJECTS.md
```

## Git estado

El comando git status muestra el estado del directorio de trabajo y del área del entorno de ensayo. Permite ver los cambios que se han preparado, los que no y los archivos en los que Git no va a realizar el seguimiento

```bash
git status
git status -s // salida abreviada
```

## Git commit

Con git commit creamos una instantánea del proyecto en ese momento. Marcando un punto en el cronograma del proyecto

```bash
git commit -m "Initial Commit"
git commit -am "Comentario" // hace el git add mas el commit
```

## Tags

Las etiquetas son referencias que apuntan un punto concreto del historial de git.

```bash
git pull // actualizamos las etiquetas con las del repositorio
git tag -a v6.5.0 -m 'Version 6.5.0' // creamos una etiqueta anotada
git tag v1.4-lw // creamos etiqueta ligera
git push origin --tags // subimos las etiquetas
git tag // Listar las etiquetas
git tag --delete nombreDeltag // Borra una etiqueta
git push --delete origin nombreDeltag // actualiza las etiquetas en el repositorio
```

## Git .gitignore

Nos sirve para indicar a git que ficheros y directorios del area de trabajo no queremos que realice seguimiento. Git trata los archivos de tu copia de trabajo de una de las siguientes maneras:

➡ Seguimiento

➡ Sin seguimiento

➡ Ignorado

Datos a tener en cuenta de este fichero serian los siguientes:

➡ Ignora las líneas en blanco y aquellas que comiencen con #.

➡ Los patrones pueden terminar en barra (/) para especificar un directorio.

➡ Los patrones pueden negarse si se añade al principio el signo de exclamación (!).

➡Aceptar patrones glob estándar.

Los patrones glob son una especie de expresión regular simplificada usada por los terminales.
Un asterisco **(\*)** corresponde a cero o más caracteres; **[abc]** corresponde a cualquier carácter dentro de los corchetes (en este caso a, b o c);
el signo de interrogación **(?)** corresponde a un carácter cualquiera; y los corchetes sobre caracteres separados por un guión **([0-9])** corresponde a cualquier carácter entre ellos (en este caso del 0 al 9). También puedes usar **dos asteriscos para indicar directorios anidados**; a/\*\*/z coincide con a/z, a/b/z, a/b/c/z, etc.

Ejemplos:

➡ Ignora los archivos terminados en **.a \*.a**

➡ **!lib.a** Pero no lib.a, aun cuando había ignorado los archivos terminados en .a en la línea anterior !lib.a

➡ **/TODO** ignora unicamente el archivo TODO de la raíz, no subir/TODO

➡ **build/** ignora todos los archivos del directorio build/
build/

➡ **doc/\*.txt** ignora doc/notes.txt, pero no este: doc/server/arch.txt

➡ **doc/\*_/_.txt** ignora todos los archivos .txt del directorio doc/
