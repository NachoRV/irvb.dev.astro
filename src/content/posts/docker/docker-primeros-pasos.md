---
title: "Docker - Primeros pasos, creando nuestras primeras imágenes con dockerfile"
pubDate: "2022-11-03T15:22:00Z"
description: "Primeros pasos con docker, creación de nuestras primeras imágenes mediante el fichero dockerfile."
author: "irvb"
image:
    url: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80"
    alt: 'Docker.'
tags: [DevOps, docker]
---


# Introducción

<br>

Si este es tu primer contacto con docker te recomiendo que leas mi anterior articulo: _[Docker - Introducción](/blog/docker-introduccion)_,
en el hacemos un repaso a los principales conceptos de docker.

Para trabajar con Docker lo primero que necesitamos es una imagen Docker, la cual podemos descargar desde el un repositorio com [docker hub](https://hub.docker.com/) o bien podemos construir
la nuestra a medida mediante un fichero **dockerfile**.

En este articulo veremos como construir nuestras propias imágenes y al final te contare como descargarte una del repositorio oficial.

## ¿Qué es un DockerFile?

<br>

Un Dockerfile es un archivo de texto plano que contiene una serie de instrucciones necesarias para crear una imagen que,
posteriormente, se convertirá en una sola aplicación utilizada para un determinado propósito.

Ejemplo de Dockerfile:

```sh
# Descarga la imagen de Ubuntu 18.04
FROM ubuntu:18.04
# Actualiza la imagen base de Ubuntu 18.04
RUN apt-get update
# Instalar Git
RUN apt-get -qqy install git
```

## Imágenes a medida con Dockerfile

![Dokerfile imagen](/img/docker/Dockerfile.png)

Docker puede construir imágenes automáticamente, leyendo las instrucciones indicadas en un fichero Dockerfile.
Los pasos principales para crear una imagen a partir de un fichero Dockerfile son:

1. Crear un nuevo directorio que contenga el fichero y otros ficheros que fuesen necesarios para crear la imagen.
2. Crear el contenido.
3. Construir la imagen mediante el comando docker build.

## Instrucciones Dockerfile

Comenzaremos con un repaso a las instrucciones mas importantes que tenemos en nustro dockerfile, puedes encontrar más detalle sobre las distintas instrucciones y mejores prácticas para escribir Dockerfiles
[aquí](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).

FROM: Indica la imagen base sobre la que se construirá la aplicación dentro del contenedor. Todos los Dockerfiles comienzan con un FROM.

```sh
FROM  <imagen>
FROM  <imagen>:<tag>
```

RUN: Nos permite ejecutar comandos en el contenedor.

```sh
RUN  <comando>
```

CMD: Se encarga de pasar valores por defecto a un contenedor. Entre estos valores se pueden pasar ejecutables.

```sh
CMD [“ejecutable”, “parametro1”, “parametro2”, …]

CMD [“parametro1”, “parametro2”, ….]
```

La segunda opción se utiliza para pasar parámetros al comando EntryPoint.

A diferencia del comando RUN, que se utiliza para crear la imagen de un contenedor, CMD se ejecuta una vez que el contenedor se ha inicializado.

ENTRYPOINT: Se utiliza cuando se quiere ejecutar un ejecutable en el contenedor en su arranque.

```sh
ENTRYPOINT "comando" "parametro1" "parametro2"
```

ENV: Establece variables de entorno dentro del contenedor.

```sh
ENV  <clave> <valor>
```

ADD: Esta instrucción se encarga de copiar los ficheros y directorios desde una ubicación especificada y los agrega al sistema de ficheros del contenedor.

```sh
ADD <fuente> <destino>
```

MAINTAINER: Nos permite configurar datos del autor del Dockerfile, principalmente su nombre y su dirección de correo electrónico.

```sh
MAINTANER <nombre> <"correo">
```

LABEL: Nos permite añadir metadatos a nuestra imagen.

```sh
LABEL <clave> <valor>
```

COPY: La instrucción copia ficheros y directorios de un path origen y los añade a un path destino dentro del contenedor.

```sh
COPY <origen> <destino>
```

EXPOSE: Indica los puertos en los que va a escuchar el contenedor. Con ello, los puertos no serán accesibles desde el host, para esto será necesario utilizar la exposición de puertos mediante la opción -p de docker run.

```sh
EXPOSE <puerto>
```

VOLUME: Esta instrucción crea un volumen como punto de montaje dentro del contenedor y es visible desde el host anfitrión.

```sh
VOLUME <path>
```

WORKDIR: Establece el directorio por defecto para la ejecución de las instrucciones RUN, CMD, ENTRYPOINT, COPY y ADD siguientes en el Dockerfile.

```sh
WORKDIR <path>
```

USER: Por defecto, todas las acciones son realizadas por el usuario root. Aquí podemos indicar un usuario diferente.

```sh
USER <usuario>
```

## Creando la imagen

Ya tenemos nuestro dockerfile configurado lo siquiente que tenemos que hacer es crear la imagen, para ello debemos ejecutar el comando **docker build**

La sintaxis del comando es:

```sh
docker build [opciones] RUTA | URL | -
```

Las opciones más comunes son:

- -t, nombre [:etiqueta]. Crea una imagen con el nombre y la etiqueta especificada a partir de las instrucciones indicadas en el fichero.
  Es recomendable asignar siempre un nombre a las imágenes que creamos.
- –no-cache. Establecida por defecto, Docker guarda en memoria caché las acciones realizadas recientemente.
  Si se diese el caso de que ejecutamos un docker build varias veces, Docker comprobará si el fichero contiene las mismas instrucciones y,
  en caso afirmativo, no generará una nueva imagen. Para generar una nueva imagen omitiendo la memoria caché utilizaremos siempre esta opción.
- –pull. También por defecto. Docker solo descargará la imagen especificada en la expresión FROM si no existe en el repositorio local.
  Para forzar que descargue la nueva versión de la imagen utilizaremos esta opción.
- –quiet. Por defecto, se muestra todo el proceso de creación, los comandos ejecutados y su salida.
  Utilizando esta opción solo mostrará el identificador de la imagen creada

## Corriendo la imagen

Bien ya tenemos la imagen creada y solo nos queda lanzar nuestra aplicación, esto lo haremos mediante el comando **docker run**

La sintaxis del comando es:

```sh
docker run [OPCIONES] IMAGEN [COMANDO] [ARGUMENTOS...]
```

Las opciones más comunes son:

1. **run**: permite lanzar una imagen de docker. En este caso, maven:3.3-jdk-8 https://hub.docker.com/_/maven, que nos permite ejecutar maven para contruir y levantar nuestro microservicio.
2. **-d**: permite lanzar el contenedor en background.
3. **-p**: el formato es host_port:container_port. En este caso, el puerto 8080 de la máquina lo redirijimos al puerto 8080 del contenedor (por el que está escuchando el microservicio).
4. **--name**: permite dar un nombre identificativo al contenedor.
5. **-e**: nos permite pasar variables de entorno. En este caso, para que el microservicio se ejecute con el perfil _local_. El perfil _db_ es que nos permite usar la base de datos que se verá en el [lab-04](../../lab-04/README.md).
6. **-p**: el formato es host_port:container_port. En este caso, el puerto 8080 de la máquina lo redirijimos al puerto 8080 del contenedor (por el que está escuchando el microservicio).
7. **-t**: para indicar qué imagen queremos ejecutar

Y como lo prometido es deuda te dejo a continuación los comandos para bajar una imagen del repositorio oficial de docker:

```sh
docker pull nginx
```

También podríamos hacer directamente un **docker run**, y docker tras comprobar que no tenemos descargada la imagen procederia a descargar la misma desde el repositorio.

```sh
docker run --name mynginx1 -p 80:80 -d nginx
```

Espero que esta entrada haya sido de tú interest y si te ha gustado no olvides compartir.
