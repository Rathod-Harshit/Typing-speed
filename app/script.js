const CLASS_SENT = document.querySelector(".test-sent p").innerHTML;
const CLASS_BOX = document.querySelector(".input-box");
const CLASS_INPUT = document.querySelector("#text-box");
const CLASS_COUNT = document.querySelector(".count");
const CLASS_RESET = document.querySelector(".btn-reset");

// console.log(CLASS_SENT);
// console.log(CLASS_BOX, CLASS_INPUT, CLASS_COUNT, CLASS_RESET);

var counter = [00, 00, 00, 0];
var interval;
var isRunning = false;

function add_lead(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

function runTimer() {
    let currTime = add_lead(counter[0]) + ":" + add_lead(counter[1]) + ":" + add_lead(counter[2]);
    CLASS_COUNT.innerHTML = currTime;
    counter[3]++;
    counter[0] = Math.floor(counter[3] / 100 / 60);
    counter[1] = Math.floor((counter[3] / 100) - (counter[0] * 60));
    counter[2] = Math.floor((counter[3]) - (counter[1] * 100) - (counter[0] * 6000));

}

function start() {
    let len_text = CLASS_INPUT.value.length;
    if (len_text === 0 && !isRunning) {
        isRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

function spellCheck() {
    let text = CLASS_INPUT.value;
    let orig_text = CLASS_SENT.substring(0, text.length);

    if (text == CLASS_SENT) {
        clearInterval(interval);
        CLASS_BOX.style.borderColor = "#429890";
    } else {
        if (text == orig_text) {
            CLASS_BOX.style.borderColor = "#65ccf3";
        } else {
            CLASS_BOX.style.borderColor = "#F95d0f";
        }
    }
}

function reset() {
    console.log("reset");
    clearInterval(interval);
    interval = null;
    counter = [00, 00, 00, 0];
    isRunning = false;
    CLASS_COUNT.innerHTML = "00:00:00";
    CLASS_INPUT.value = "";
    CLASS_BOX.style.borderColor = "grey";
}

CLASS_INPUT.addEventListener("keypress", start, false);
CLASS_INPUT.addEventListener("keyup", spellCheck, false);
CLASS_RESET.addEventListener("click", reset, false);
