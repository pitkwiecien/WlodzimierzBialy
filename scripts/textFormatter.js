let phase = 0

$(function(){
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
})

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