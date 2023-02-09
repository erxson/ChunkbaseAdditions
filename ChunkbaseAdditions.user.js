// ==UserScript==
// @name         Chunkbase Additions
// @version      0.1
// @description  try to take over the world!
// @author       ericsson
// @match        https://www.chunkbase.com/apps/seed-map
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chunkbase.com
// @run-at       document-idle
// ==/UserScript==

let s = document.querySelector("div.fancy-row.slim")
s.insertAdjacentHTML('afterbegin', '<input type="text" class="mini" id="popa" name="popa" placeholder="F3 + C">');

document.getElementById("popa").addEventListener("input", function (e) {
    useRegex(this.value)
});
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
