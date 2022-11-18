let time = 0.0
let completed = false

const GAME_TIME_PRECISION = 1
const GAME_CPS_PRECISION = 2
const GAME_MAX_CLICKS = 20

$(function(){
    $("#prev").remove()
    $("#next").remove()
    setGameImageSize()
    $("#game-object").css("visibility", "visible")

    $(".preGame").click(function(){
        setUpGame()
    })
})

function setGameImageSize(){
    $("#game-object").width($("#game-main").width() * 0.05)
}

function nextPos(){
    const objSelector = "#game-object"
    const viewWidth = $("#game-main").width()
    const viewHeight = $("#game-main").height()
    const viewPadding = formatPixelNumber($("#game-main").css("padding-top"))

    const titleHeightWithPadding = $("#title").height() + 10

    const objWidth = $(objSelector).width()
    const objHeight = $(objSelector).height()

    const minX = objWidth/2 + viewPadding
    const minY = objHeight/2 + viewPadding

    const maxX = viewWidth - (objWidth / 2)- viewPadding
    const maxY = viewHeight - (objHeight / 2) - titleHeightWithPadding  - viewPadding

    // console.log(`maX: ${maxX}, maY: ${maxY}`)
    // console.log(`miX: ${minX}, miY: ${minY}`)
    // console.log(`titleWP: ${titleHeightWithPadding}`)
    // console.log(`vW: ${viewWidth}, vH: ${viewHeight}, vP: ${viewPadding}`)
    // console.log(`oW: ${objWidth}, oH: ${objHeight}`)
    const x = randInt(minX, maxX)
    const y = randInt(minY, maxY)

    return [x, y]
}

function incrementClicks(){
    $("#clicks").text(parseInt($("#clicks").text()) + 1)
}

function changeCPS(){
    if(time != 0){
        $("#cps").text(
            (
                parseInt(
                    $("#clicks").text()
                ) / time
            ).toFixed(GAME_CPS_PRECISION)
        )
    } else {
        $("#cps").text(
            parseInt(
                $("#clicks").text()
            ) / (
                10**(-GAME_TIME_PRECISION)
            ).toFixed(GAME_CPS_PRECISION)
        )
    }
}

function changePos(){
    const pos = nextPos()

    const x = pos[0]
    const y = pos[1]

    $("#game-object").css({
        "left" : `${x}px`,  
        "bottom" : `${y}px`
    })
}

async function startCountingTime(){
    if(completed){
        return
    }
    sleep(1000/10**GAME_TIME_PRECISION).then(() => {
        time = roundDec(time + (10**(-GAME_TIME_PRECISION)), GAME_TIME_PRECISION)
        $("#time").text(time.toFixed(GAME_TIME_PRECISION))
        startCountingTime()
    })
}

function endGame(){
    sessionStorage.setItem("clicks", $("#clicks").text())
    sessionStorage.setItem("time", $("#time").text())
    sessionStorage.setItem("cps", $("#cps").text())
    window.location.href = "../pages/results.html";
}

function setUpGame(){
    const objSelector = "#game-object"
    completed = false
    startCountingTime()
    setGameImageSize()
    changePos()

    $(objSelector).css("visibility", "visible")
    $(objSelector).removeClass("preGame")
    $(objSelector).off("click")
    $(objSelector).removeClass("centered")

    $(objSelector).click(function() {
        changePos()
        incrementClicks()
        changeCPS()
        if(
            parseInt(
                $("#clicks").text()
            ) >= GAME_MAX_CLICKS
        ) {
            endGame()
        }
    })

    $("#title").css("display", "flex")

    $("#title").html(
        "<span class='gameSpan'>" +
            "Clicks: " + 
            "<span id='clicks'>" +
                "1" +
            "</span>" +
        "</span>" +
        "<span class='gameSpan'>" + 
            "<span id='time'>" +
                "0.0" +
            "</span>" +
            "s" +
        "</span>" +
        "<span class='gameSpan'>" + 
            "CPS: " +
            "<span id='cps'>" +
                "0" +
            "</span>" +
        "</span>"
    )
}