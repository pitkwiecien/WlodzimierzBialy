let phase = 0

$(function(){
    $("body #left div.links").click(function(){
        const id = $(this).prop("id")
        window.location = getLink(id)
    })
    loadAllColours()


    $("#left img").one("load", function() {
        if(!$(this).attr("todelete")){
            $(this).css("width", "100%")
            $("#left").css("padding-top", "0px")
            $(this).css("margin-bottom", "10px")
        }
    }).each(function() {
        if(this.complete) {
            $(this).trigger('load');
        }
        if($(this).attr("todelete")){
            $(this).remove()
        }
    });
    if($(".main").prop("id") != "game-main"){
        changeFirst("#main-content", true)
        const splitter = textSplitter("#main-content", 500)
        loadPhase("#main-content", splitter, 0)
        deactivate("#prev")
        console.log(splitter)
        if(splitter.length <= 1){
            deactivate("#next")
            $(".navigators").css("visibility", "hidden")
        }
        $(".navigators").click(function(){
            if($(this).hasClass("deactivated")){
                return
            }
            if($(this).prop("id") == "prev"){
                phase -= 1
                activate("#next")
            } else {
                phase += 1
                activate("#prev")
            }
            loadPhase("#main-content", splitter, phase)
            if(phase == 0){
                deactivate("#prev")
            }
            if(phase + 1 == splitter.length){
                deactivate("#next")
            }
        })
    } else {
        $("#prev").remove()
        $("#next").remove()
        setGameImageSize()
        $("#game-object").css("visibility", "visible")
    }

    $(".preGame").click(function(){
        setUpGame()
    })
})

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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

    console.log(`maX: ${maxX}, maY: ${maxY}`)
    console.log(`miX: ${minX}, miY: ${minY}`)
    console.log(`titleWP: ${titleHeightWithPadding}`)
    console.log(`vW: ${viewWidth}, vH: ${viewHeight}, vP: ${viewPadding}`)
    console.log(`oW: ${objWidth}, oH: ${objHeight}`)
    const x = randInt(minX, maxX)
    const y = randInt(minY, maxY)

    return [x, y]
}

function incrementClicks(){
    $("#clicks").text(parseInt($("#clicks").text()) + 1)
}

function changeCPS(){

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

function setUpGame(){
    setGameImageSize()

    const objSelector = "#game-object"
    changePos()

    $(objSelector).css("visibility", "visible")
    $(objSelector).removeClass("preGame")
    $(objSelector).off("click")
    $(objSelector).removeClass("centered")

    $(objSelector).click(function() {
        changePos()
        incrementClicks()
        changeCPS()
    })

    $("#title").html(
        "<span class='gameSpan'>" +
            "Clicks: " + 
            "<span id='clicks'>" +
                "0" +
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

function deactivate(selector){
    $(selector).addClass("deactivated")
}

function activate(selector){
    $(selector).removeClass("deactivated")
}

function loadPhase(selector, splitter, phase){
    console.log(splitter[phase])
    splitter[phase].replaceAll("\n", "<br/>")
    $(selector).html(splitter[phase])
}

function getFirstCharIndex(selector){
    const content = $(selector)
    const txt = [...content.html()]
    for(var i = 0; i < txt.length; i++){
        if(!whiteSpaceMarks.includes(txt[i])){
            return i
        }
    };
}

function formatPixelNumber(str){
    return parseInt(str.substring(0, str.length-2))
}

function textSplitter(selector, characters, indexParam=null){
    const content = $(selector)
    const txtArr = [...content.html()]
    const txt = txtArr.join("")
    const firstIndex = indexParam==null ? getFirstCharIndex(selector) : indexParam

    const sub = txt.substr(firstIndex, characters)
    const lastIndex = firstIndex + getLastUsefulLetterIndex(sub)

    const newSub = txt.substring(firstIndex, lastIndex + 1)
    const nextSub = txt.substr(lastIndex + 1)
    
    let newIndex = null
    for(var i = 0; i < nextSub.length; i++){
        if(!whiteSpaceMarks.includes(nextSub[i])){
            newIndex = i
            newIndex += lastIndex + 1
            break
        }
    };
    return newIndex == null ? [newSub] : [newSub].concat(textSplitter(selector, characters, newIndex))
}

function changeFirst(selector, capitalize){
    const content = $(selector)
    const txt = [...content.html()]
    const firstIndex = getFirstCharIndex(selector)
    if(txt[firstIndex] == undefined){
        return
    }
    if(!capitalize){
        txt[firstIndex] = txt[firstIndex].toLowerCase()
    } else {
        txt[firstIndex] = txt[firstIndex].toUpperCase()
    }
    content.html(txt.join(""))
}

function getLastUsefulLetterIndex(arr){
    var spaceOccured = false
    for(var i = arr.length-1; i >= 0; i--){
        if(spaceOccured){
            if(!whiteSpaceMarks.includes(arr[i])){
                return i
            }
        } else if(arr[i] == " "){
            spaceOccured = true
        }
    }
}

function onErrorFunc(elem){
    console.log("changing")
    $(elem).attr("todelete", true)
}

function getLink(id){
    return id + ".html"
}

function loadColour(page){
    let mainSelector = "body #" + page + "-main"
    let linkSelector = "body #left #" + page
    let colour = colours[page]
    $(mainSelector).css("background-color", colour)
    $(linkSelector).css("background-color", colour)
}

function loadAllColours(){
    for (const [key, value] of Object.entries(colours)) {
        loadColour(key)
    }
}

whiteSpaceMarks = [
    "\n", 
    "\t", 
    " "
]

colours = {
    'index' : 'aquamarine',
    'life' : 'green',
    'works': 'gold',
    'awards' : 'orange',
    'game' : 'brown'
}