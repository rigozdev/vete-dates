// Importación para argumentos por consola
import { argv } from 'node:process';

// Importación de funciones
import { registrarCita, existeCita, leerCita } from "./operaciones.js";

const argumentoConsola = argv.slice(2);

/* 
    * Se asignan las posiciones de los argumentos obtenidos por consola
*/
const opcion = argumentoConsola[0];
const nombreAnimalito = argumentoConsola[1];
const edadAnimalito = Number(argumentoConsola[2]);
const tipoAnimalito = argumentoConsola[3];
const colorAnimalito = argumentoConsola[4];
const enfermedadAnimalito = argumentoConsola[5];


/* 
    * Switch que decide qué identifica a travez de 
    * la variable opcion, qué acción se reaizará
*/
switch (opcion) {
    case "registrar":
        await registrarCita(nombreAnimalito, edadAnimalito, 
            tipoAnimalito, colorAnimalito, enfermedadAnimalito);
        break;

    case "leer":
        await leerCita();
        break;

    default:
        break;
}

