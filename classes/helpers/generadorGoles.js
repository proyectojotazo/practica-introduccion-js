/*
Función que nos generará los goles aleatoriamente. Ponemos un rango por defecto de 6
para que nos dé entre 0 y 5
*/
export const generaGoles = (range = 6) => Math.floor(Math.random() * range);
