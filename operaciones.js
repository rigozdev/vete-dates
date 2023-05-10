import { readFile, writeFile, access } from 'node:fs/promises';



/* 
    * Funcion que crea el archivo o documento 'citas.json'
    * en caso de no existir.
    * Consideré que era buena idea agregarlo a las operaciones
    * manuales pero no tenía mucho sentido llamar a la función
    * en el switch, por eso la quité de ahí y la dejé al iniciar
    * las otras 2 fuciones requeridas, para que no diera error
    * al ejecutar alguna de ellas
*/
export const existeCita = async () => {
    const iniciaCitas = [];

    // Suerte de if pero con access (para saber si existe el archivo o no)
    try {
        await access("citas.json");
    } catch (error) {
        await writeFile('citas.json', JSON.stringify(iniciaCitas));
        console.log('***** Se ha creado la lista de citas *****');
    }
}



/* 
    * Función que:
    * 1.- Lee si el doc existe (de lo contrario lo crea llamando a función existeCita())
    * 2.- Lee el contenido del documento 'citas.json'
    * 3.- Recibe los argumentos de consola para crear un nuevo objeto
    * 4.- Empuja el nuevo objeto al arreglo de citas previas
    * 5.- Sobrescribe el documento anterior con las citas previas + la nueva cita
*/
export const registrarCita = async (nombre, edad, tipo, color, enfermedad) => {

    // * Se llama a función creadora de 'citas.json'.
    await existeCita();

    // * Asigno el contenido de citas.json a citasVete y así poder
    // * manipular el arreglo de citas (si es que tiene citas previas)
    const citasVete = JSON.parse(await readFile("citas.json", 'utf-8'));

    // * Recibo en este objeto los parametros mandados por consola
    // * (que se agregarán a 'citas.json')
    const cita = {
        nombre,
        edad,
        tipo,
        color,
        enfermedad
    };

    // * Empujo el objeto al arreglo que cree previamente arriba
    citasVete.push(cita);

    try {

        // * Sobreescribo el archivo con sus elementos previos 
        // * (si es que los tiene) + el nuevo objeto o nueva cita
        await writeFile('citas.json', JSON.stringify(citasVete));
        console.log('****** Se agregó cita ******');
    } catch (error) {
        console.log(error);
    }

    //* Muestro el registro del objeto recientemente agregado
    console.log('****** Datos cita agregada ******');
    console.log('Nombre: ' + cita.nombre);
    console.log('Edad: ' + cita.edad);
    console.log('Tipo: ' + cita.tipo);
    console.log('Color: ' + cita.color);
    console.log('Enfermedad: ' + cita.enfermedad);
}



/* 
    * Función que lee y muestra todas las citas regisradas
    * con formato en la consola.
    * También verifica que se encuentre el doc 'citas.json'
    * Se le agrega un contador para diferenciar cada cita por número
*/
export const leerCita = async () => {
    await existeCita();
    try {

        // * Se leen y asignan las citas registradas a una variable (citasRegistradas)
        const citasRegistradas = JSON.parse(await readFile('citas.json', 'utf-8'));
        console.log('****** Citas ******'); // * Se comienza a dar formato
        let contador = 0; // * Se crea el contador fuera del bucle

        // * Se crea un bucle forEach para que recorra toda la lista de citas
        // * y muestre la información correspondiente por cada cita
        citasRegistradas.forEach((elem) => {

            contador++; //* Se aumenta el contador
            console.log('Animal número ' + contador)
            console.log('Nombre: ' + elem.nombre);
            console.log('Edad : ' + elem.edad);
            console.log('Tipo: ' + elem.tipo);
            console.log('Color: ' + elem.color);
            console.log('Enfermedad: ' + elem.enfermedad);
            console.log('');
            console.log('**********************');
            console.log('');
        });
    } catch (error) {
        console.error(error);
    }
}