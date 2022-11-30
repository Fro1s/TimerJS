let contagem;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(segundos) {
    
    clearInterval(contagem);

    const now = Date.now();
    const then = now + segundos * 1000;
    displayTimeLeft(segundos);
    displayEndTime(then);

    contagem = setInterval(() => {
        const SegundosRestantes = Math.round((then - Date.now()) / 1000);
        
        if (SegundosRestantes < 0) {
            clearInterval(contagem);
            return;
        }
        // display it
        displayTimeLeft(SegundosRestantes);
    }, 1000);
}

function displayTimeLeft(segundos) {
    const minutes = Math.floor(segundos / 60);
    const remaindersegundos = segundos % 60;
    const display = `${minutes}:${remaindersegundos < 10 ? '0' : ''}${remaindersegundos}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const segundos = parseInt(this.dataset.time);
    timer(segundos);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});