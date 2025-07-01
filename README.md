
HTML

<html lang="es"> <!-- El idioma principal del documento es español -->
<head>
  <meta charset="UTF-8" /> <!-- Codificación de caracteres (evita errores con tildes y eñes) -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <!-- Configura el diseño para que sea responsive -->
  <title>Calculadora Integral de Triángulos</title> <!-- Título que aparece en la pestaña del navegador -->

  <link rel="stylesheet" href="style.css"> <!-- Archivo principal de estilos (CSS general del proyecto) -->
  <link href="./CSS/dw.css" rel="stylesheet" /> <!-- Archivo CSS -->
</head>

<body> <!-- Cuerpo del documento HTML -->

  <h1>Calculadora Integral de Triángulos</h1> <!-- Título principal visible -->
  <h2>Análisis completo de un triángulo a partir de sus tres lados</h2> <!-- Subtítulo descriptivo -->

  <div class="input-container"> <!-- Contenedor del formulario de entrada -->
    <label><strong>Lado A:</strong> <input type="number" id="ladoA"></label> <!-- Campo para ingresar el lado A -->
    <label><strong>Lado B:</strong> <input type="number" id="ladoB"></label> <!-- Campo para ingresar el lado B -->
    <label><strong>Lado C:</strong> <input type="number" id="ladoC"></label> <!-- Campo para ingresar el lado C -->
    <button onclick="calcular()">Calcular</button> <!-- Botón que ejecuta la función 'calcular()' al hacer clic -->
  </div>

  <canvas id="canvas" width="300" height="200"></canvas> <!-- Área donde se dibujará el triángulo -->

  <div class="output-container"> <!-- Contenedor de resultados -->
    <div class="grid"> <!-- Contenedor en forma de grilla -->
      <div class="box" id="angulos"></div> <!-- Aquí se mostrarán los ángulos -->
      <div class="box" id="medianas"></div> <!-- Aquí se mostrarán las medianas -->
      <div class="box" id="bisectrices"></div> <!-- Aquí se mostrarán las bisectrices -->
      <div class="box" id="alturas"></div> <!-- Aquí se mostrarán las alturas -->
      <div class="box" id="perimetroArea"></div> <!-- Aquí se mostrará el perímetro y el área -->
    </div>
  </div>

  <script src="./js/dw.js"></script> <!-- Archivo JavaScript donde está la lógica -->

</body> <!-- Cierre de Cuerpo del documento HTML -->
</html> <!-- Cierre del documento HTML -->



CSS

body {
  font-family: Arial, sans-serif;         /* Usa la fuente Arial y si no está, una sans-serif genérica */
  background: #8F1D1D;                    /* Fondo de color rojo oscuro */
  margin: 0;                              /* Elimina el margen exterior del body */
  padding: 0;                             /* Elimina el relleno interior del body */
  display: flex;                          /* Usa Flexbox para organizar los elementos hijos */
  flex-direction: column;                /* Coloca los hijos en una columna vertical */
  align-items: center;                   /* Centra los hijos horizontalmente */
}

h1 {
  margin-top: 30px;                      /* Deja 30px de espacio arriba del h1 */
  color: white;                          /* Color blanco para el texto del título */
}

h2 {
  color: white;                          /* Color blanco para el subtítulo */
  font-weight: normal;                   /* Usa grosor de fuente normal (no en negrita) */
  text-align: center;                    /* Centra el texto horizontalmente */
  margin: 10px;                          /* Margen externo de 10px en todos los lados */
}

.input-container, .output-container {
  background: #D37272;                   /* Fondo rosado para las secciones de entrada y salida */
  padding: 20px;                         /* Relleno interno de 20px */
  margin-top: 20px;                      /* Margen superior de 20px respecto al elemento anterior */
  border-radius: 10px;                   /* Bordes redondeados de 10px */
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);/* Sombra sutil alrededor del contenedor */
  color: white;                          /* Color de texto blanco */
  width: 90%;                            /* Ocupa el 90% del ancho del contenedor padre */
  max-width: 600px;                      /* No excede los 600px de ancho */
}

.input-container input {
  margin: 0 10px 10px 0;                 /* Margen: arriba 0, derecha 10px, abajo 10px, izquierda 0 */
  padding: 8px;                          /* Relleno interior de 8px */
  width: 100px;                          /* Ancho fijo de 100px para los inputs */
}

.input-container button {
  padding: 8px 16px;                     /* Relleno vertical de 8px, horizontal de 16px */
  background: #42090F;                  /* Color de fondo rojo oscuro */
  color: white;                          /* Texto blanco */
  border: none;                          /* Sin bordes alrededor del botón */
  border-radius: 5px;                    /* Bordes redondeados de 5px */
  cursor: pointer;                       /* Muestra mano al pasar el cursor */
}

.grid {
  display: flex;                         /* Usa Flexbox para el contenedor de resultados */
  flex-direction: column;               /* Apila los elementos uno debajo del otro */
  align-items: center;                  /* Centra los elementos horizontalmente */
}

.box {
  width: 100%;                           /* Cada box ocupa el 100% del ancho en pantallas pequeñas */
  background: #86212B;                  /* Fondo rojo oscuro para las cajas */
  margin: 10px 0;                        /* Margen vertical de 10px arriba y abajo */
  padding: 15px;                         /* Espaciado interno de 15px */
  border-radius: 10px;                  /* Bordes redondeados de 10px */
}

canvas {
  margin: 20px auto;                     /* Margen superior e inferior de 20px y centrado horizontal */
  display: block;                        /* Muestra como bloque para que se aplique margin auto */
  width: 100%;                           /* Ocupa todo el ancho del contenedor */
  max-width: 300px;                      /* No supera los 300px de ancho */
  height: auto;                          /* Altura automática proporcional al ancho */
}

label {
  color: white;                          /* Color blanco para etiquetas de texto */
}

@media (min-width: 768px) {              /* Reglas que se aplican desde 768px de ancho en adelante */
  .grid {
    flex-direction: row;                 /* Cambia a disposición horizontal (en fila) */
    flex-wrap: wrap;                     /* Permite que los elementos se acomoden en varias filas si es necesario */
    justify-content: space-between;     /* Espacia las cajas para llenar el ancho disponible */
  }
  .box {
    width: 48%;                          /* Cada caja ocupa el 48% del ancho para que quepan dos por fila */
  }
}


 JS

function calcular() {
  // Obtener los valores ingresados por el usuario y convertirlos a número decimal
  const a = parseFloat(document.getElementById("ladoA").value); // Lado A
  const b = parseFloat(document.getElementById("ladoB").value); // Lado B
  const c = parseFloat(document.getElementById("ladoC").value); // Lado C

  // Validación: verificar que los lados formen un triángulo válido
  if (!a || !b || !c || a + b <= c || a + c <= b || b + c <= a) {
    alert("Ingrese lados válidos que formen un triángulo"); // Mostrar alerta si no es válido
    return; // Salir de la función
  }

  // Calcular los ángulos internos usando la Ley del Coseno
  const alpha = Math.acos((b*b + c*c - a*a) / (2*b*c)) * (180/Math.PI); // Ángulo opuesto al lado A
  const beta  = Math.acos((a*a + c*c - b*b) / (2*a*c)) * (180/Math.PI); // Ángulo opuesto al lado B
  const gamma = 180 - alpha - beta; // Ángulo opuesto al lado C, usando que la suma es 180°

  // Calcular las alturas (usando una fórmula alternativa basada en Herón)
  const ha = 2 * (Math.sqrt((a + b + c)*(b + c - a)*(a + c - b)*(a + b - c))) / (2*a); // Altura desde vértice A
  const hb = 2 * (Math.sqrt((a + b + c)*(b + c - a)*(a + c - b)*(a + b - c))) / (2*b); // Altura desde vértice B
  const hc = 2 * (Math.sqrt((a + b + c)*(b + c - a)*(a + c - b)*(a + b - c))) / (2*c); // Altura desde vértice C

  // Calcular semiperímetro para usar en el cálculo del área
  const s = (a + b + c) / 2; // Semiperímetro
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Área usando la fórmula de Herón

  // Calcular las medianas (segmentos desde vértices al punto medio del lado opuesto)
  const ma = 0.5 * Math.sqrt(2*b*b + 2*c*c - a*a); // Mediana desde vértice A
  const mb = 0.5 * Math.sqrt(2*a*a + 2*c*c - b*b); // Mediana desde vértice B
  const mc = 0.5 * Math.sqrt(2*a*a + 2*b*b - c*c); // Mediana desde vértice C

  // Calcular las bisectrices internas (aproximación)
  const ta = Math.sqrt(b*c * (1 - (a*a)/Math.pow(b + c, 2))); // Bisectriz desde vértice A
  const tb = Math.sqrt(a*c * (1 - (b*b)/Math.pow(a + c, 2))); // Bisectriz desde vértice B
  const tc = Math.sqrt(a*b * (1 - (c*c)/Math.pow(a + b, 2))); // Bisectriz desde vértice C

  // Mostrar los resultados en el HTML (ángulos)
  document.getElementById("angulos").innerHTML =
    `<b>Ángulos</b><br> Ángulo α (a): ${alpha.toFixed(2)}°<br> Ángulo β (b): ${beta.toFixed(2)}°<br> Ángulo γ (c): ${gamma.toFixed(2)}°`;

  // Mostrar las medianas
  document.getElementById("medianas").innerHTML =
    `<b>Medianas</b><br> Mediana ma: ${ma.toFixed(2)}<br> Mediana mb: ${mb.toFixed(2)}<br> Mediana mc: ${mc.toFixed(2)}`;

  // Mostrar las bisectrices
  document.getElementById("bisectrices").innerHTML =
    `<b>Bisectrices</b><br> Bisectriz ta: ${ta.toFixed(2)}<br> Bisectriz tb: ${tb.toFixed(2)}<br> Bisectriz tc: ${tc.toFixed(2)}`;

  // Mostrar las alturas
  document.getElementById("alturas").innerHTML =
    `<b>Alturas</b><br> Altura ha: ${ha.toFixed(2)}<br> Altura hb: ${hb.toFixed(2)}<br> Altura hc: ${hc.toFixed(2)}`;

  // Mostrar perímetro y área
  document.getElementById("perimetroArea").innerHTML =
    `<b>Perímetro y Área</b><br> Perímetro: ${(a + b + c).toFixed(2)}<br> Área: ${area.toFixed(2)}`;

  // Dibujo del triángulo en el canvas
  const ctx = document.getElementById("canvas").getContext("2d"); // Obtener contexto 2D del canvas
  ctx.clearRect(0, 0, 300, 200); // Limpiar el contenido previo del canvas

  ctx.beginPath(); // Comenzar nuevo trazo
  ctx.moveTo(50, 150); // Punto A (abajo a la izquierda)
  ctx.lineTo(250, 150); // Línea de A a B (base del triángulo)
  ctx.lineTo(150, 150 - hb * 20); // Línea de B a C (altura visual desde hb)
  ctx.closePath(); // Cierra el triángulo (línea de C a A)
  ctx.stroke(); // Dibuja el borde del triángulo
  ctx.fillStyle = "#ecf0f1"; // Color de relleno del triángulo
  ctx.fill(); // Rellena el triángulo con el color indicado
}

