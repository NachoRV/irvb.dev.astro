---
title: "Docker - Comandos básicos"
pubDate: "2022-07-01T15:22:00Z"
description: "Primeros pasos con docker, creación de nuestras primeras imágenes mediante el fichero dockerfile"
author: "irvb"
image:
    url: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80"
    alt: 'Docker.'
tags: [DevOps, docker]
---



# Principales comandos Docker

En esta entrada voy a dar un breve resumen de los comandos mas utilizados en docker o por lo menos aquellos que yo mas uso en mi día a día, si no sabes lo que es docker te recomiendo revises mis anteriores post donde te explico en detalle que es esta tecnología.

### Creación de imágenes

```sh
docker build -t nombre-image:4.3.0 .
```

Fijaros en el punto, seria el acceso a la ruta donde se encuentre el fichero dockerfile y el flag -t es para poner un tag a la imagen con el formato nombre:version

### Creación de contenedores

```sh
docker run -d -p 81:80 --name "nombre-imagen" nombre-image:4.3.0
```

Con este comando crearemos el contenedor y lo pondremos en marcha el flag -d es para ponerlo en background con -p le indicamos el mapeo de puertos y con --name le asignamos un nombre, por ultimo le decimos que imagen tiene que usar.

### Listar contenedores

```sh
docker ps -a
```

docker ps lista los contenedores que estrían corriendo en ese momento, añadiendo el flaf -a se mostrar también los contenedores parados.

### Listar imágenes

```sh
docker images -a
```

Mismo funcionamiento que para listar contenedores

### Parar contenedor

```sh
docker stop <contenedor>
```

Puedes usar tanto el id del contenedor como el tag.

### Borrar contenedor

```sh
docker rm <contenedor>
```

### Borrar imágenes

```sh
docker rmi <imagen>
```

### Exportar contenedores

```sh
docker save <contenedor> | gzip > <contenedor>.tar.gz
docker save -o <contenedor>.tar <contenedor>
```

Al realizar la exportación tenemos dos opciones la primera seria para exportarlo comprimido en gz tienes que estar en entorno linux o usar la consola de git en Windows con la segunda opción realizaríamos una exportación en tar sin comprimir.

Como he comentado estos son solo los comando docker que yo mas uso en mi día a día y que espero te sirvan como un pequeño resumen de su uso mas básico, recuerda que añadiendo el flag --help podrás ampliar información sobre las distintas opciones de cada comando, por ejemplo:

```sh
docker run --help
```

Espero que esta entrada haya sido de tú interest y si te ha gustado no olvides compartir.
