/* Init | LocalStorage | Cookies */
$(document).ready(function() {
    //if (Cookies.get() == undefined) {
    //    Cookies.set('default', 'value')
    //}

    console.log('Welcome on VooDoo\'s Website!');

    $("#loading").fadeOut("slow")
    $("body").attr("style", "overflow: inherit!important")

    /* Check the stream status */
    checkStream();
    setInterval(checkStream, 300000);
});


/* Functions */
function checkStream(){
    $.get("https://decapi.me/twitch/uptime/dear_voodoo", function(data){
        if (data == "dear_voodoo is offline") {
            console.log("VooDoo is not streaming.")
            $("#twitch-status1").addClass("d-none")
            $("#twitch-status2").addClass("d-none")
            $("#twitch-status3").addClass("d-none")
        } else {
            console.log("VooDoo is streaming.")
            $("#twitch-status1").removeClass("d-none")
            $("#twitch-status2").removeClass("d-none")
            $("#twitch-status3").removeClass("d-none")
        }
    })
}

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};