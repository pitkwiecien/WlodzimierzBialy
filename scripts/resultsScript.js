$(function(){
    let clicks = sessionStorage.getItem("clicks")
    let time = sessionStorage.getItem("time")
    let cps = sessionStorage.getItem("cps")
    if(
        clicks != undefined &&
        time != undefined &&
        cps != undefined
    ){
        clearSession()
    } else {
        window.location.href = "../pages/game.html";
    }
})

function playAgain(){
    clearSession()
    window.location.href = "../pages/game.html";
}

function clearSession(){
    sessionStorage.removeItem("clicks")
    sessionStorage.removeItem("time")
    sessionStorage.removeItem("cps")
}