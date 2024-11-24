let time = 0;
let isRunning = false;
let timer;

function startstop() {
    if (!isRunning) {
        document.querySelector("#start_button").innerHTML = "STOP";
        isRunning = true;
        timer = setInterval(() => {
            time++;
            document.querySelector("#mins").textContent = String(Math.floor(time/60));
            document.querySelector("#secs").innerHTML = String(time - Math.floor(time/60)*60)
        }, 1000);
    }
    else {
        document.querySelector("#start_button").innerHTML = "START";
        isRunning = false;
        clearInterval(timer);
    }
}

function reset() {
    isRunning = false;
    document.querySelector("#start_button").innerHTML = "START";
    clearInterval(timer)
    time = 0;
    document.querySelector("#mins").innerHTML = String(0);
    document.querySelector("#secs").innerHTML = String(0);

}