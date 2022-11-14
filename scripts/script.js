$(function(){
    $("body #left div.links").click(function(){
        const id = $(this).prop("id")
        window.location = getLink(id)
    })
    loadAllColours()
})

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

colours = {
    'index' : 'aquamarine',
    'life' : 'green',
    'works': 'gold',
    'awards' : 'orange',
    'gallery' : 'pink',
    'game' : 'brown'
}