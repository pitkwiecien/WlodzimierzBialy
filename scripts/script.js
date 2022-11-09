$(function(){
    $("body #left a").prop("href", function(){
        return $(this).prop("id")
    })
})

function getLink(id){
    return "/pages/" + toString(id) + ".html"
}
