$(function () {
    $('#YTThumb').keypress(function (e) {
        if (e.which == 13) {
            $('#link-desc').html('<i class=\'fal fa-spinner fa-spin\'></i>')
            var id = YouTubeGetID($('#YTThumb').val())
            getThumbnails(id)
        }
    })
})

function btnClick() {
    $('#button-url').html('<i class=\'fal fa-spinner fa-spin\'></i>')
    var id = YouTubeGetID($('#YTThumb').val())
    getThumbnails(id)
};

var default_html = `
    <h5 class="text-center">{0} ({1})</h5><br>
    <a data-lightbox="img-yt" data-title="{2}" href="{3}">
        <img style="border-radius: 5px;" src="{4}" width="512px" alt="{5}">
    </a>
`

function getThumbnails(id) {
    console.log(`Thumbnail Grabber: \nGet video thumbnails with id: ${id}`)
    getMeta(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        function (width, height) {
            var title = "Max Res";
            var link = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_THUMB_1").empty().css("display", "block").append(img);
        }
    );

    getMeta(`https://i.ytimg.com/vi/${id}/sddefault.jpg`,
        function (width, height) {
            var title = "SD";
            var link = `https://i.ytimg.com/vi/${id}/sddefault.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_THUMB_2").empty().css("display", "block").append(img);
        }
    );

    getMeta(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        function (width, height) {
            var title = "HQ";
            var link = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_THUMB_3").empty().css("display", "block").append(img);
        }
    );

    getMeta(`https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
        function (width, height) {
            var title = "MQ";
            var link = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_THUMB_4").empty().css("display", "block").append(img);
        }
    );

    getMeta(`https://i.ytimg.com/vi/${id}/0.jpg`,
        function (width, height) {
            var title = "Default";
            var link = `https://i.ytimg.com/vi/${id}/0.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_THUMB_5").empty().css("display", "block").append(img);
        }
    );

    $("#thumb-list").removeClass("d-none")

    getMeta(`https://i.ytimg.com/vi/${id}/1.jpg`,
        function (width, height) {
            var title = "Frame Start";
            var link = `https://i.ytimg.com/vi/${id}/1.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_FRAME_1").empty().css("display", "block").append(img);
        }
    );

    getMeta(`https://i.ytimg.com/vi/${id}/2.jpg`,
        function (width, height) {
            var title = "Frame Middle";
            var link = `https://i.ytimg.com/vi/${id}/2.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_FRAME_2").empty().css("display", "block").append(img);
        }
    );

    getMeta(`https://i.ytimg.com/vi/${id}/3.jpg`,
        function (width, height) {
            var title = "Frame End";
            var link = `https://i.ytimg.com/vi/${id}/3.jpg`
            var img = default_html.f(title, width + "x" + height, title, link, link, title)
            $("#YT_FRAME_3").empty().css("display", "block").append(img);
        }
    );

    $("#thumb-frame-list").removeClass("d-none")
}


function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    console.log(`Thumbnail Grabber: Generating id...`)
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

function getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        callback(this.width, this.height);
    }
}

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};