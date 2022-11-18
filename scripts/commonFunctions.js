function onErrorFunc(elem){
    $(elem).attr("todelete", true)
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function roundDec(number, decimalPoints){
    return Math.round(number * (10**decimalPoints)) / 10**decimalPoints
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatPixelNumber(str){
    return parseInt(str.substring(0, str.length-2))
}

function getLink(id){
    return id + ".html"
}

function deactivate(selector){
    $(selector).addClass("deactivated")
}

function activate(selector){
    $(selector).removeClass("deactivated")
}