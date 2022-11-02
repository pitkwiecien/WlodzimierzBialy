$(function(){
    document.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          document.execCommand('insertLineBreak')
          event.preventDefault()
        }
    })
    $("body #left a").prop("href", $(this).prop("id"))
})

function getLink(id){
    return "/pages/" + toString(id) + ".html"
}
