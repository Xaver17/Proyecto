let meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

let mesesPop = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
    'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

let week_days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth();
let year = currentDate.getFullYear();
//let popoverYear = currentDate.getFullYear();

// debugeo
// console.log(day + '---' + month + '---' + year);

let date = document.getElementById("date");
let popDate = document.getElementById("pop-date");
let popMonths = document.getElementById("popover-months");
let dates = document.getElementById("dates");
let popPrev = document.getElementById("popPrev");
let popNext = document.getElementById("popNext");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

var years = false;
var last = year % 10;
var yearStart = year - last;
var yearEnd = yearStart + 11;

// me muestra en su html correspondiente el mes y el año en que se encuentra
date.textContent = meses[month] + " de " + year.toString();
popDate.textContent = year.toString();

date.addEventListener('click', showPopCalendar);
popPrev.addEventListener('click', lastYear);
popNext.addEventListener('click', nextYear);
popDate.addEventListener('click', writeYearsPop);
prev.addEventListener('click', lastMonth);
next.addEventListener('click', nextMonth);

// debugeo supremo
window.addEventListener('click', function (e) {
    // console.log(e.target);
    console.log(month);
});

// llamar a la funcion que crea el mes
writeMes(month);
writeMesPop();

// crea el html correspondiente con los dias del mes de manera automatica
function writeMes(month) {
    // crea los dias de la semana
    for (let i = 0; i < 7; i++) {
        if (i == 0) {
            dates.innerHTML += '<div class="card-single"><div class="card-day first"><h1>' +
                week_days[i] + '</h1></div></div>';
        } else {
            dates.innerHTML += '<div class="card-single"><div class="card-day"><h1>' +
                week_days[i] + '</h1></div></div>';
        }
    }

    // dia de la semana en que empieza el mes
    for (let i = startDay(); i > 0; i--) {
        dates.innerHTML += '<div class="card-single"></div>';
    }

    // llena el calendario con todos los dias del mes corespondiente
    for (let i = 1; i <= totalDays(month); i++) {
        dates.innerHTML += '<div class="card-single"><div class="text"><h1>' + i +
            '</h1></div><div class="overlay" id=' + i + '></div></div>';
    }

    // lee todo el html creado anteriormente
    readOverlay();
}

function writeMesPop() {
    popMonths.textContent = "";
    for (let i = 0; i < mesesPop.length; i++) {
        popMonths.innerHTML += '<div class="card-popover" id="' + i +
            '"><div class="text-popover"><h3>' + mesesPop[i] +
            '</h3></div></div>';
    }

    readCardPop();
}

function writeYearsPop() {
    years = true;
    popMonths.textContent = '';
    popDate.textContent = yearStart + " - " + yearEnd;
    for (let i = yearStart; i <= yearEnd; i++) {
        popMonths.innerHTML += '<div class="card-popover" id="' + i +
            '"><div class="text-popover"><h3>' + i +
            '</h3></div></div>';
    }

    readCardPop();
}

function readCardPop() {
    let popMonth = document.getElementsByClassName('card-popover');

    for (var i = 0; i < popMonth.length; i++) {
        popMonth[i].addEventListener('click', writeDatePop);
    }
}

// funcion para detectar que tiene la clase overlay
function readOverlay() {
    // obtenemos todos los html con la clase overlay
    let modalWindow = document.getElementsByClassName('overlay');

    // recorremos todos los contenedores con la clase overlay
    for (var i = 0; i < modalWindow.length; i++) {
        // detectamos si se hizo click en angun contenedor con dicha clase
        modalWindow[i].addEventListener('click', () => openModal());
    }
}

function writeDatePop() {
    if (years) {
        year = this.id;
        writeMesPop();
        years = false;
        popDate.textContent = year.toString();
    } else {
        month = this.id;
        newDate();
        showPopCalendar()
    }
    // writeMes(this.id);
}

// total de dias que tiene cada mes
function totalDays(month) {
    //
    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } else {
        return isLeap() ? 29 : 28;
    }
}

// detectamos si un año es bisiesto
function isLeap() {
    return ((year % 100 !== 0 && year % 4 === 0) || (year % 400 === 0));
}

function startDay() {
    let start = new Date(year, month, 1);
    return (start.getDay());
}

function lastMonth() {
    if (month !== 0) {
        month--;
    } else {
        month = 11;
        year--;
    }
    if (month == -1) {
        month = 11;
        year--;
    }
    resetPopYear();
    newDate();
}

function nextMonth() {
    if (month !== 11) {
        month++;
    } else {
        month = 0;
        year++;
    }
    if (month == 12) {
        month = 0;
        year++;
    }
    resetPopYear();
    newDate();
}

function lastYear() {
    if (years) {
        yearStart = yearStart - 12;
        yearEnd = yearEnd - 12;
        writeYearsPop();
    } else {
        year--;
        newPopYear();
    }
}

function nextYear() {
    if (years) {
        yearStart = yearStart + 12;
        yearEnd = yearEnd + 12;
        writeYearsPop();
    } else {
        year++;
        newPopYear();
    }
}

function showPopCalendar() {
    var popover = document.getElementById("popover-calendar");
    popover.classList.toggle("showPop");
    resetPopYear();
    writeMesPop();
}


function newPopYear() {
    currentDate.setFullYear(year, month, day);
    popDate.textContent = year.toString();
    // writeMes(month);
}

function resetPopYear() {
    popDate.textContent = year;
}

function newDate() {
    currentDate.setFullYear(year, month, day);
    date.textContent = meses[month] + " de " + year.toString();
    dates.textContent = '';
    writeMes(month);
}

function openModal() {
    var modal = document.getElementById("modal");
    if (modal.style.display === "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}

// function modalActive(id) {
//     var modal = document.getElementById(id);
//     if (modal.style.display === "none") {
//         modal.style.display = "block";
//     } else {
//         modal.style.display = "none";
//     }
// }