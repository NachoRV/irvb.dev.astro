---
title: "Posicionamiento en CSS"
pubDate: 2022-01-29
description: "Posicionamiento en CSS"
author: "irvb"
image:
    url: "https://cdn.pixabay.com/photo/2016/11/04/13/31/css-1797778_960_720.jpg"
    alt: 'css'
tags: [css, web]
---

## Position

<br>
La propiedad positions nos ayuda a posicionar un elemento en el documento html y admite los siguientes valores:

- **static**: es el valor por defecto
- **relative**: el elemento de desplaza respecto a su posición normal, el resto de elementos continuan es su posición ignorando al que se desplaza.
- **absolute**: el elemento de desplaza respecto al primer elemento contenedor posicionado, dejando su espacio para que sea ocupado por el resto de elementos del documento.
- **fixed**: permite fijar un elemento respecto al viewport, el elemento no se desplazara aunque se haga scroll en la ventana.

Para indicar la posición del elemento con la propiedad position se utilizan las propiedades:

- **top**: posicionamiento respecto a la parte superior.
- **bottom**: posicionamiento respecto a la parte inferior.
- **left**: posicionamiento respecto a la izquierda.
- **right**: posicionamiento respecto a la derecha.  
  <br>
  Si top y bottom están especificados a la vez top gana sobre bottom y si el conflicto es entre left y right left gana cuando el contenido es ltf (español, ingles...) y raight cuando el contenido es rtl (arabe, persa...)  
  <br>

Vista la teoría básica veamos unos ejemplos.

**Static**: como hemos dicho esta es la propiedad por defecto por lo tanto no hay que indicar nada en el css el resultado seria el siguiente.

<div class="img-entrada">
  <img class="img-entrada" src="/img/css/css-position-one.png ">
</div>

**Relative**: hemos añadido al cuadrado azul la clase position con los valores que ves a continuación y cómo ves en el resultado el cuadrado se desplaza desde su posición original sin liberar el espacio que ocupaba antes de ser modificado.

```css
.position {
  position: relative;
  top: 50px;
  left: 50px;
}
```

<div class="img-entrada">
  <img class="img-entrada" src="/img/css/css-position-two.png">
</div>

**Absolute**: realizamos la mismo que en el ejemplo anterior pero con la posición absolute, como puedes ver el movimiento del cuadrado azul ahora es respecto de la esquina izquierda superior del contenedor de los cuadrados y deja su espacio libre para que sea ocupado por el cuadrado verde.

```css
.position {
  position: absolute;
  top: 50px;
  left: 50px;
}
```

<div class="img-entrada">
  <img class="img-entrada" src="/img/css/css-position-tree.png">
</div>

**Fixed**: como hemos dicho esto sitúa el elemento respecto al viewport con el código css de mas abajo lo dejarías fijo en la esquina inferior derecha, como un botón flotante, te recomiendo que realices el ejemplo para ver el resultado.

```css
.position {
  position: fixed;
  bottom: 10px;
  left: 90%;
}
```

Con esto ya tines unas nociones básicas sobre la propiedad position y su funcionamiento ahora solo queda practicar.

un saludo.
