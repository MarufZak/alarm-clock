const selectMenu = document.querySelectorAll('select');
const time = document.querySelector('h1');
const setAlarmBtn = document.querySelector('button');
const content = document.querySelector('.content');
let alarmTime;
let ringTone = new Audio('./ringtone.mp3');
let isAlarmSet = false;

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let select = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",select)
}

for (let i = 60; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let select = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",select)
}

for (let i = 2; i > 0; i--) {
    let ampm = i === 1 ? "AM" : "PM"
    let select = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",select)
}

timeChange()

setInterval(() => {
    timeChange()
}, 1000);

function timeChange() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";
    if (hours >= 12) {
        hours = hours - 12;
        day_night = "PM"
    }
    hours = hours == 0 ? "12" : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    time.innerText = `${hours}:${minutes}:${seconds} ${day_night}`;

    console.log(alarmTime);
    console.log(`${hours}:${minutes} ${day_night}`);

    if (alarmTime == `${hours}:${minutes} ${day_night}`) {
        ringTone.play();
        ringTone.loop = true;
    }
};




function setAlarm () {
    if (isAlarmSet) {
        alarmTime = "";
        ringTone.pause();
        content.classList.remove('disable');
        setAlarmBtn.innerText = 'Set Alarm';
        selectMenu[0].value = 'Hour';
        selectMenu[1].value = 'Minute';
        selectMenu[2].value = 'AM/PM';
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert('Please, choose the valid Alarm!')
    }
    isAlarmSet = true;
    content.classList.add('disable')
    setAlarmBtn.innerText = 'Clear Alarm';
    alarmTime = time;
}
setAlarmBtn.addEventListener('click',setAlarm)