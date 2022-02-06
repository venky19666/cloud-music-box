$(document).ready(function(){
    $('.nav-toggle-btn').on('click',function(e){
        $('.toggle-container .side-box').toggle(300);
        $('.toggle-container .context-box').toggleClass('no-margin',300);
    });
    $('.drop-toggle').on('click',function(e){
        console.log(e.target)
        $(e.target).parent().find('.hidden-content').toggle(300);
    })
});