//@ts-check
/// <reference path="./config/p5.global-mode.d.ts" />
/* 
    Det her er bare indstillinger til VSCode.
    Første linje gør så gør så den bruger
    TypeScript check. Det betyder bare at der kommer flere og
    bedre fejlmeddelelser så det er nemmere at vide hvorfor programmet
    ikke virker. Den anden linje gør så den kender alle kommandoer
    fra P5 og kan autocomplete dem. 
*/


/*
    Differentialligningen vi skal bruge er denne:
            dy/dx = r*y-s
    r = reproduktionsraten, y = antal skildpadder og x = tid i dage, s = antal skildpadder der dør hver dag.
*/

/*  #Udregning
    Hver skildpadde lægger 2 - 6 reder af æg hver sæson (avg. 4 reder).
    Hver rede har 65 - 180 æg (avg. 122,5)
    4 * 122,5 = 490 æg hver sæson
    1 - 9 år mellem hver sæson (avg. 5)
    490 / 5 = 98 æg om året
    1 / 1000 æg overlever til voksen
    98 / 1000 = 0,098 skildpadder hvert år pr. skildpadde.

    der er 6500000 skildpadder. 87% af skildpadder er kvinder, 5655000 kvinder
    5655000 * 0,098 = +554190 skildpadder pr. år
    6500000 + 554190 = 7054190 på 1 år

    Nu kan vi løse for r
    7054190  = 6500000 * e^(r * 365)
    omskrivning (just trust me on this one)
    r = 0.0002241632592

    Hvor mange skildpadder dør hver dag?    ignore this
    Der dør 1000 skildpadder af plastik hvert år (https://www.chartjs.org/docs/latest/charts/scatter.html) thats not the right source
    1000 / 365 = ca. 2.73972603, altså s = 2.73972603.
    
    chews   Today at 9:07 AM
        så vi fandt ud af at der dør 1000 af plastik, 4600 af bycatch og 55000 af en sidste ting
        prøver lige at finde kilderne
        https://seaworld.org/animals/all-about/sea-turtles/longevity/

    166.027397260274 dør / 6,500,000 skildpadder i starten = 0.00255384615384615384615384615385 % der dør om dagen, det er 0.0000255384615384615384615384615385 som normalt tal-
*/

/*
    Differentalligningen
        dy/dx = 0.003187 * y - (0.0000255426765 * y)   // se variabel dekleration for s
    sættes ind i Eulers metode
        y_n = (0.003187 * y_n-1 - (0.0000255426765 * y)) * h + y_n-1
        x_n = x_n-1 + h
    Eulers metode blive så beregnet i setup()
*/

const r = 0.00025613793;  // Se #Udregning
let y = 6500000;    // https://oliveridleyproject.org/ufaqs/how-many-sea-turtles-are-left
let x = 0;  // start tid
const s = 0.0000255426765; //0.0000251211801896733403582718651212   // Se #Udregning. Man skal huske på at det ikke er alle årsager, der er talt med
const h = 0.01;    // h værdi fra eulers metode
const limit = 10000 // maksimale dage
const data = [];    // hvert element vil være hvor mange skildpadder der er tilbage. så data[0] = 6500000
let iteration = 1;
const pointsToRemove = 100; // vil fjerne n-1/n punkter, i dette tilfælde 99/100.

function setup() {
    for (let x_n = 0; x_n < limit; x_n += h) {  // her bliver x værdien udregnet. For hver iteration bliver x til x + h, altså matcher den Eulers metode. Løkken stopper når x er nået limit
        if (iteration%pointsToRemove == 0) {   // Dette bliver brugt til at fjerne punkter fra grafen, så det er nemmere for computeren at vise, da en million punkter vil være meget krævende.
            data.push({ x: x_n, y: y });    // Dataen bliver skubbet som et objekt til "data". Den kommer til at se sådan ud:
                                            /* 
                                            data = [{
                                                x: x_værdi,
                                                y: y_værdi
                                            }, {
                                                x: x_værdi,
                                                y: y_værdi
                                            }] 
                                            På den måde bliver alle punkter gemt. */
        }
        y = (r * y - (y * s)) * h + y;    // Her bliver Eulers metode udført som beskrevet højere oppe
        
        iteration++;    // index er et tal der bliver brugt til at udregne hvilke punkter der ikke skal med i datasættet
    }

    const ctx = document.getElementById("myChart"); // elementet med ID "myChart" bliver fundet fra HTML dokumentet index.html
    ctx.width = window.innerWidth;  // Bredden og højden af grafen bliver sat til at matche skærmen.
    ctx.height = window.innerHeight;
    const myChart = new Chart(ctx, {    // Her bliver librariet "Chart.js" brugt til at vise en graf. Koden her er taget fra deres hjemmeside (https://www.chartjs.org/docs/latest/charts/scatter.html)
        type: 'scatter',
        data: {
            datasets: [{
                label: "Skildpadder pr. dag",
                data: data, // dataen fra Eulers metode bliver nu vist som en graf.
            }]
        },
    });
}