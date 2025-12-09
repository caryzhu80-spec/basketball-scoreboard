
const STATR_TIMER = 600 * 1000

let gameTimer = STATR_TIMER;
let timeInterval;
let isRunning = false;
let homeScoreCount = 0;
let guestScoreCount = 0;
let periodCount = 1;
let homeFoulsCount = 0;
let guestFoulsCount = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopBtn = document.getElementById('start-stop-btn');
const homeScoreDisplay = document.getElementById('home-score');
const guestScoreDisplay = document.getElementById('guest-score');
const periodDisplay = document.getElementById('period');
const homeFoulsDisplay = document.getElementById('home-fouls');
const guestFoulsDisplay = document.getElementById('guest-fouls');

updateDisplay();
periodDisplay.textContent = periodCount;

function updateDisplay(){
    let totalSeconds = Math.ceil(gameTimer / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let minStr = String(minutes);

    if(gameTimer <= 0){
        clearInterval(timeInterval);
        timeInterval = null;
        isRunning = false;
        minutesDisplay.textContent = 0;
        secondsDisplay.textContent = String(seconds).padStart(2,"0");
    }else{
        minutesDisplay.textContent = minStr;
        secondsDisplay.textContent = String(seconds).padStart(2,"0");
    }
}

function startStopTimer(){
    if(isRunning){
        //stop the timer
        clearInterval(timeInterval);
        timeInterval = null;
        startStopBtn.textContent = "START"
        isRunning = false;
    }else{
        timeInterval = setInterval(()=>{
            if(gameTimer <= 0){
                clearInterval(timeInterval);
                timeInterval = null;
                startStopBtn.textContent = "FINAL"
                updateDisplay();
                return;
            }
            gameTimer -= 1000;
            updateDisplay();
        },1000)
        startStopBtn.textContent = "STOP"
        isRunning = true;
    }
}

function resetTimer(){
    clearInterval(timeInterval);
    timeInterval = null;
    isRunning = false;
    gameTimer = STATR_TIMER;
    startStopBtn.textContent = "START";
    updateDisplay();
}


function changeScore(team, amount){
    if(team === 'home'){
        homeScoreCount += amount;
        homeScoreDisplay.textContent = homeScoreCount;
    }else{
        guestScoreCount += amount;
        guestScoreDisplay.textContent = guestScoreCount;
    }

    highlightLeader();
}

function changePeriod(amount){

    let newPeriodCount;
    const maxPeriod = 9;

    if(amount === 0){
        newPeriodCount = 1;
    }else{
        newPeriodCount = periodCount + amount;
    }


    if(newPeriodCount > maxPeriod){
        window.alert(`GAME OVER (MAX ${maxPeriod} PERIOD) `)
        newPeriodCount = maxPeriod;
    }

    if(newPeriodCount < 1){
        newPeriodCount = 1;
    }
        periodCount = newPeriodCount;
        periodDisplay.textContent = periodCount;
    }


function changeFouls(team,amount){
    if(team === 'home'){
        let newFouls = homeFoulsCount + amount;
        if(newFouls < 0){
            newFouls = 0;
        }

        if(amount = 0){
            newFouls = 0;
        }
        homeFoulsCount = newFouls;
        homeFoulsDisplay.textContent = homeFoulsCount;
    } else{
        let newFouls = guestFoulsCount + amount;
            if(newFouls < 0){
            newFouls = 0;
        }
        if(amount = 0){
            newFouls = 0;
        }
        guestFoulsCount = newFouls;
        guestFoulsDisplay.textContent = guestFoulsCount;
    }   
}

function resetScore(id){
    switch(id){
        case 'home':
          homeScoreCount = 0;
          homeScoreDisplay.textContent = 0;
          highlightLeader();
          break;
        case 'period':
          periodCount = 1;
          periodDisplay.textContent = 1;
          break;
        case 'guest':
          guestScoreCount = 0;
          guestScoreDisplay.textContent = 0;
          highlightLeader();
          break;
        case 'home-fouls':
          homeFoulsCount = 0;
          homeFoulsDisplay.textContent = 0;
          break;
        case 'guest-fouls':
          guestFoulsCount = 0;
          guestFoulsDisplay.textContent = 0;
          break;
    }
}

function restart(){

    resetTimer();

    resetScore('home');
    resetScore('guest');
    resetScore('period');
    resetScore('home-fouls');
    resetScore('guest-fouls');

    highlightLeader();
}


function highlightLeader() {
    const homeScoreDisplay = document.getElementById('home-score');
    const guestScoreDisplay = document.getElementById('guest-score');
    
    homeScoreDisplay.classList.remove('is-leading');
    guestScoreDisplay.classList.remove('is-leading');

    if (homeScoreCount > guestScoreCount) {
        homeScoreDisplay.classList.add('is-leading');
    } else if (guestScoreCount > homeScoreCount) {
        guestScoreDisplay.classList.add('is-leading');
    }
}