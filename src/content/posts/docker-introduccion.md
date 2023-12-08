---
title: "Docker - Introducción, conceptos básicos."
pubDate: 2022-01-29
description: "Primeros pasos con docker, creación de nuestras primeras imágenes mediante el fichero dockerfile."
author: "irvb"
image:
    url: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80"
    alt: 'Docker.'
tags: [DevOps, docker]
---


# Introducción a Docker y containerización

<br>

## ¿Qué es containerización?

<br>

**"En mí PC si funciona"**, cuantas veces hemos dicho u oído esta frase, seguro que más de las que nos gustaría, esto es así porque venimos trabajando de una forma en la que no se tienen
en cuenta modelos de integración, empaquetado, distribución y ejecución consistentes sin importar dónde y cómo se hagan.

Con la containerización tratamos de solucionar este problema, **containerizar** una aplicación es, explicado de forma sencilla, ejecutar la aplicación de forma
aislada al resto de procesos, en la máquina que la hospeda. Eso permite compartir mucho mejor los recursos físicos de un servidor,
aumentando la densidad de aplicaciones, pero manteniendo el aislamiento entre ellas.

La containerización no es una técnica nueva, sino que viene usándose desde hace más de 10 años en sistemas Linux. Linux incluye funcionalidades para aislar procesos unos de otros,
aislar espacios de nombres y usuarios, o compartir recursos de computación.

## ¿Qué es Docker?

<br>

![Logo Docker](/img/docker/docker.png)

Docker nace para hacer de la containerización algo sencillo, al alcance de todos. Es decir, Docker toma todos los conceptos existentes de containerización,
y alguna de las librerías y herramientas existentes, para crear una plataforma nueva con un foco en la experiencia de desarrollo y operación.
Que fuera, sobre todo, sencilla de aprender y de usar. Y lo consiguió.

En pocos años Docker se ha convertido en el estándar de industria para la containerización de aplicaciones,
y ha abierto la puerta a muchos otros proyectos que lo complementan, extienden o tratan de competir con él.
Y el formato que impulsó Docker para definir las imágenes ejecutables y empaquetarlas para su distribución, se ha convertido en el estándar abierto que usan
prácticamente todas las tecnologías de containerización actuales.

## Conceptos básicos de Docker

<br>

Algunos de los conceptos básicos de Docker que debemos manejar son:
<br>

- **Docker Engine**. El motor de Docker es el 'ejecutable', la pieza que sabe coger una imagen en disco y convertirla en un contenedor, es decir,
  un proceso productivo en una máquina host, con el debido aislamiento, acceso a recursos de computación y comunicación con el mundo exterior.

- **Docker Image**. Una imagen Docker es un fichero en disco que contiene toda la información de los ficheros, permisos, puertos de red, volúmenes
  o comando ejecutable al inicio, entre otros datos. Las imágenes Docker están estratificadas en capas, de forma que imágenes más complejas
  se basan en imágenes más sencillas, y solo deben llevar traza de los cambios sobre la imagen en la que se basan (p.ej. los ficheros nuevos,
  los que se han cambiado, etc.). Las imágenes Docker se guardan en registros desde las que son distribuidas cuando son necesarias
  (p.ej. Docker Hub, Docker Trusted Registry, Red Hat Quay, etc.). El formato de imagen Docker es a día de hoy un estándar de la Open Container Initiative
  y usado por otros motores aparte del propio Docker.

- **Docker Machine**. Es un host - ya sea servidor físico, virtual o PC - que tiene configurado Docker Engine y permite por tanto gestionar el ciclo de vida de las imágenes y ejecutarlas.

- **Docker Volume**. Un volumen en general es un espacio en disco para uso de un programa. En el caso específico de Docker,
  los volúmenes se asocian a contenedores (no a imágenes). Pueden ser efímeros que se destruyen al finalizar el proceso del contenedor (p.ej. el típico volumen /tmp)
  o persistentes (p.ej. el volumen donde guardamos los ficheros de una base de datos o de un gestor de contenido).

- **Docker Network**. Una red en Docker es una virtualización sobre las redes existentes en el host,
  que permite tener entornos privados aislados unos de otros, y configurar reglas que permitan o no los accesos entre redes y con el mundo exterior.
  Como regla básica, dos contenedores en la misma red Docker tienen visibilidad entre sí, pero no si están en redes diferentes.
  Otro concepto importante es el de puerto expuesto y publicado. Un puerto expuesto es un puerto del contenedor que es accesible a otros contenedores de la red
  (p.ej. el puerto de una base de datos). Un puerto publicado es un puerto que es accesible desde la máquina host y por tanto accesible desde el mundo exterior
  (p.ej. el puerto de escucha de una aplicación web).

## Orquestando contenedores

<br>

Aunque Docker es una gran ventaja para el problema de gestionar la distribución y ejecución de aplicaciones de una forma portable,
difícilmente una aplicación consista en un solo contenedor. Normalmente nos encontraremos múltiples contenedores trabajando juntos
(p.ej. app front, el backend, la base de datos), y en muchas ocasiones necesitaremos tener varias copias del mismo contenedor para absorber
más carga de los usuarios, o para distribuirlas en múltiples host para ser resistente a los fallos.

Para gestionar contenedores a escala, es preciso contar con una plataforma que gestione los recursos de computación de uno o varios host,
y que permita orquestar la ejecución de docenas, incluso cientos de contenedores, sin volvernos locos trabajando con ellos uno a uno.

Aunque no entraremos en profundidad en plataformas de orquestación de contenedores, sí que es
interesante comentar las principales para que os resulten familiares:

- **Docker Swarm**. La plataforma de orquestación de la propia Docker Inc. (la compañía detrás de Docker y Docker Enterprise, negocio recientemente adquirido por Mirantis).
  Muy sencilla de poner en marcha pero complicada de mantener en buena salud. Requiere realmente de una plataforma Docker Enterprise (comercial) para sacarle todo su partido.

- **Kubernetes**. El **rey** de las plataformas. Estándar de facto que se ha impuesto a todas las demás en cuota de adopción.
  Inicialmente fue una contribución de Google y luego muchas compañías han empezado a invertir estratégicamente en él, notablemente Red Hat.

- **Red Hat OpenShift**. Plataforma basada en Kubernetes, con un foco en la usabilidad y experiencia de desarrollo.

- **RancherOS**. Desde su versión 2.0, plataforma basada en Kubernetes, compartiendo el foco en la usabilidad y experiencia de otras opciones.

- **Mesosphere**. La plataforma de orquestación de Mesos.

- **Amazon Web Services ECS, Elastic Container Service**. Plataforma de orquestación propietaria de Amazon Web Services.

- **Amazon Web Services EKS, Elastic Kubernetes Service**. Plataforma basada en Kubernetes gestionada por Amazon Web Services.

- **Google Cloud GKE, Google Kubernetes Engine**. Plataforma basada en Kubernetes gestionada por Google Cloud.

- **Microsoft Azure AKS, Azure Kubernetes Service**. Plataforma basada en Kubernetes gestionada por Microsoft Azure.

- **Microsoft Azure ARO, Azure Red Hat OpenShift**. Plataforma basada en OpenShift gestionada por Microsoft Azure.

## Diferencias entre containerización y máquinas virtuales

<br>

En este punto, posiblemente muchos os preguntáis cuál es la diferencia entre Docker y una máquina virtual de "toda la vida", como VirtualBox, VMware o Hyper-V.

Ambos enfoques de virtualización son complementarios, con sus pros y contras. En el caso de las máquinas virtuales, la unidad de virtualización es el host virtual, lo que incluye, sobre el hipervisor, un stack completo con sistema operativo, librerías y dependencias, y finalmente la aplicación virtualizada. En el caso de los contenedores, la unidad de virtualización comienza más "arriba", sobre el sistema operativo.

Eso quiere decir que en un mismo host físico que proporciona la capacidad de virtualizar con contenedores, todos ellos comparten el kernel del sistema operativo, lo que puede ocasionar ciertas incompatibilidades llegado el caso (p.ej. imágenes que dependen de glibc).

Sin embargo, en un enfoque con máquinas virtuales, como la virtualización incluye al sistema operativo, el mismo host físico puede alojar diferentes sistemas, p.ej. máquinas Windows o Linux conviviendo en el mismo host.

Las máquinas virtuales son rápidas de iniciar, pero los contenedores lo son aun más, puesto que no deben iniciar el sistema operativo. Las máquinas virtuales ofrecen un mayor aislamiento entre aplicaciones, y darán menos problemas derivados de incompatibilidad en el kernel (incluso aunque sean distintas aplicaciones basadas en Linux).

Gráficamente, podemos verlo en el siguiente diagrama:

![Comparación entre máquinas virtuales y contenedores](/img/docker/comp-vm-cont.png)

Ambos enfoques además pueden convivir, y dentro de un mismo host físico que lo soporta, se pueden desplegar máquinas virtuales y contenedores simultáneamente, consiguiendo en una sola plataforma lo mejor de ambos mundos.

Espero que esta entrada haya sido de tú interest y si te ha gustado no olvides compartir.
