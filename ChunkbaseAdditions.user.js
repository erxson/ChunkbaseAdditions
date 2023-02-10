// ==UserScript==
// @name         Better Chunkbase
// @version      0.1
// @description  try to take over the world!
// @author       ericsson
// @match        https://www.chunkbase.com/apps/seed-map
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chunkbase.com
// @run-at       document-idle
// ==/UserScript==

console.log("======================== Start ========================")



// Copy buttons

const elementToObserve = document.querySelector("div#seed-controls");

const observer = new MutationObserver(function(mutationsList, observer) {
    let d = document.querySelector("div.tippy-content")

    if (typeof(d) != 'undefined' && d != null) {
        if(!d.textContent.includes('<br><button id="kaka" class="gh-button"> TP </button>')) {
            d.insertAdjacentHTML('beforeend', '<br><button id="kaka" class="gh-button"> TP </button>');
            document.getElementById("kaka").addEventListener(
                "click", copy, false
            );
            d.insertAdjacentHTML('beforeend', ' <button id="kakashrt" class="gh-button"> Coords </button>');
            document.getElementById("kakashrt").addEventListener(
                "click", copyshrt, false
            );
        }
    }
});

observer.observe(elementToObserve, {characterData: false, childList: true, attributes: false});

function useRegex2(shrt) {
    let d = document.querySelector("div.tippy-content")
    var matches = [];
    let regex = /X: ([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))? Z: ([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?/i;
    var re = new RegExp(regex, "g");
    if (!shrt) {
        while(matches = re.exec(d.innerHTML)) {
            return "/execute in minecraft:overworld run tp @s " + matches[1] + " ~ " + matches[3];
        }
    } else {
        while(matches = re.exec(d.innerHTML)) {
            return matches[1] + " " + matches[3];
        }
    }
}

function copy() {
    console.log(navigator.clipboard.writeText(useRegex2(false)));
}
function copyshrt() {
    console.log(navigator.clipboard.writeText(useRegex2(true)));
}



// F3 + C

function useRegex(input) {
    var matches = [];
    let regex = /\/execute in minecraft:[0-9A-Za-z]+ run tp @s ([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))? ([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))? ([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))? -([0-9]*\.[0-9]+( [0-9]*\.[0-9]+)+)/i;
    var re = new RegExp(regex, "g");
    while(matches = re.exec(input)) {
        console.log(Math.round(matches[1]))
        document.getElementById("map-goto-x").value = Math.round(matches[1])
        console.log(Math.round(matches[5]))
        document.getElementById("map-goto-z").value = Math.round(matches[5])
        document.getElementById("map-goto-go").click();
    }
}

let s = document.querySelector("div.fancy-row.slim")
s.insertAdjacentHTML('afterbegin', '<input type="text" class="mini" id="popa" name="popa" placeholder="F3 + C">');

document.getElementById("popa").addEventListener("input", function (e) {
    useRegex(this.value)
});
