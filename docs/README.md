# Documentación de Desarrollo Curricular

Bienvenido a la documentación de la caja de herramientas para el departamento de desarrollo curricular.

## Introducción

Este proyecto proporciona una serie de herramientas útiles para el departamento de desarrollo curricular. Incluye una calculadora y un conversor.

## Instalación

No se requiere instalación especial para utilizar estas herramientas. Simplemente abre los archivos HTML en un navegador web compatible.

## Uso

### Interfaz de la Calculadora

La calculadora presenta dos secciones principales:

1. **Calculadora de Créditos Automática**: Esta sección genera automáticamente combinaciones de horas de teoría, horas de práctica y créditos para un número determinado de créditos ingresados.


2. **Cálculo Manual de Créditos**: Aquí puedes ingresar manualmente el número de horas de teoría, horas de práctica y otras horas, y la calculadora calculará los créditos correspondientes.

### Instrucciones

1. **Calculadora de Créditos Automática**:
   - Ingresa el número de créditos en el campo provisto o utiliza los botones "+" y "-" para ajustar el valor.
   - La tabla mostrará las diferentes combinaciones de horas y créditos para el número de créditos ingresados.

2. **Cálculo Manual de Créditos**:
   - Ingresa el número de horas de teoría, horas de práctica y otras horas en los campos correspondientes.
   - Los créditos se calcularán automáticamente y se mostrarán en la tabla.

Para ambas funcionalidades se tienen los siguientes lineamientos y reglas

Para la equivalencia de creditos a horas se establece que: 

    - 1 hora de teroria equivale a 2 creditos
    - 1 hora de practica equivale a 1 credito
    - 30 horas otras equivalen a 1 credito, no se pueden sobrepasar un limite de 180 horas

Segun la combinacion del tipo de horas en una EE se define como:

    - Curso: unicamente horas de teoria
    - Taller: unicamente horas de practica
    - Curso - Taller: horas de practica y teoria

#### Funcionalidad
1. **Calculadora de Créditos Automática**: 

El proceso de calculo esta dado por:

    -   La función generateCombination toma un parámetro credits, que representa el número de créditos para el cual se generarán las combinaciones.
    -   practiceHours se calcula como el residuo de dividir credits por 2. Si credits es un número par, practiceHours será 0; de lo contrario, será 1.
    -   theoryHours se calcula como (credits - practiceHours) / 2, lo que garantiza que la suma de theoryHours y practiceHours sea igual a credits.
    -   combination se inicializa en 1 y se utilizará para etiquetar las combinaciones generadas.
    -   mods es un array que contiene los diferentes tipos de módulos posibles para las combinaciones.
    -   tableHTML representa la variable que almacenará todas las combinaciones generadas en el proceso.
    -   Se inicia un bucle while que se ejecuta mientras theoryHours sea mayor o igual a 0. Este bucle se utiliza para generar todas las combinaciones posibles. Se utiliza a theoryHours como variable de iteracion ya que el disminuir el valor de esta en paralelo se aumenta el valor de practiceHours, garantizando la congruencia de la suma de los creditos.
    -   Dentro del bucle while, otherHours se inicializa en 0 en cada iteración. Luego se llama a la función determinateMod para determinar el tipo de módulo de la combinación actual.
    -   Se concatena una fila a tableHTML que muestra la combinación actual, junto con las horas de teoría, práctica, otras y el tipo de módulo.
    -   Se incrementa combination para etiquetar la siguiente combinación.
    -   Se inicia un bucle for que se ejecuta mientras i sea menor o igual que practiceHours y (otherHours * 30) sea menor o igual a 150. Este bucle se utiliza para generar combinaciones adicionales teniendo en cuenta las horas de otras actividades. Este bucle esta condicionado a practiceHours sea mayor a 0; al igual que el bucle principal se pretende disminuir practiceHours para aumentar otherHours, pero sin afectar al ciclo principal 
    -   Se actualiza otherHours a i, y se recalcula practiceHoursLeft como practiceHours - otherHours. En caso de llegar al limite de 180 otherHours se detiene el ciclo.
    -   Se llama a determinateMod nuevamente para determinar el tipo de módulo de esta combinación adicional.
    -   Se concatena otra fila a tableHTML para esta combinación adicional.
    -   Se incrementa combination para etiquetar la siguiente combinación.
    -   Se actualizan practiceHours y theoryHours para la siguiente iteración del bucle while.
    -   Finalmente, la función determinateMod se define dentro de generateCombination. Esta función toma las horas de teoría, práctica y otras, y devuelve el tipo de módulo según las combionaciones mencionadas en la sección de instrucciones.

2. **Cálculo Manual de Créditos**:

El calculo de creditos esta dado por

    -   updateCredits() se llama inicialmente para calcular y mostrar los créditos totales según las horas de teoría, práctica y otras actividades.
    -   Se seleccionan todos los botones con la clase .btnIncrease y se añade un event listener a cada uno. Este event listener incrementa en 1 el valor del elemento asociado cuando se hace clic en el botón y luego llama a updateCredits() para recalcular los créditos totales.
    -   Se seleccionan todos los botones con la clase .btnDecrease y se añade un event listener a cada uno. Este event listener decrementa en 1 el valor del elemento asociado cuando se hace clic en el botón, pero solo si el nuevo valor es mayor o igual a cero. Luego llama a updateCredits().
    -   Se seleccionan todos los botones con la clase .btnIncreaseOther y se añade un event listener a cada uno. Este event listener incrementa el valor del elemento asociado en 30 cuando se hace clic en el botón, pero solo si el valor actual es menor que 180 (se establece un límite de 180 créditos). Después de incrementar el valor, se llama a updateCredits().
    -   Se seleccionan todos los botones con la clase .btnDecreaseOther y se añade un event listener a cada uno. Este event listener decrementa en 30 el valor del elemento asociado cuando se hace clic en el botón, pero solo si el nuevo valor es mayor o igual a cero. Luego llama a updateCredits().
    -   Se seleccionan todos los elementos con los IDs #hours_theory, #hours_practice y #hours_other, y se añade un event listener a cada uno que escucha el evento input. Cuando se detecta un cambio en estos campos de entrada, se llama a updateCredits() para recalcular los créditos totales.
    -   La función updateCredits() obtiene los valores de las horas de teoría, práctica y otras actividades desde los elementos correspondientes en el documento HTML.
    -   Calcula los créditos correspondientes multiplicando las horas de teoría por 2, y las horas de práctica se dejan como están.
    -   Para las horas de otras actividades, se divide entre 30 para obtener los créditos correspondientes y se redondea hacia abajo. Cualquer numero que no sea multiplo de 30 no es contabilizado para el conteo de creditos.
    -   Actualiza los elementos en el documento HTML con los créditos calculados y el total de horas.

### Conversor

El conversor te permite convertir entre diferentes unidades. Próximamente estará disponible.

## Créditos

Este proyecto fue desarrollado por Mario Alberto Jiménez Jiménez.


