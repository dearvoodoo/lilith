function openPage(page) {
    console.log(`Opening page ${page}`)
    setPage(page)
}

function setPage(page){
    $("#page-content").html("")
    var json_path = `./assets/json/pages/${page}.json`
    $.get(json_path, function(p) {
        var title, content, scripts;
        if (p['title']) {
            title = `
                    <h5 class="page-title fs-5" id="${page}-title">${p['title']}</h5>
            `
        } else {
            title = ""
        }

        if (p['content']) {
            content = `
                <div class="content">
                    ${atob(p['content'])}
                </div>
            `
        } else {
            content = ""
        }

        if (p['scripts']) {
            var scripts = p['scripts'];
            for (var i = 0; i < scripts.length; i++) {
                $("body").append(`<script id="script_${page}" src="./assets/js/${scripts[i]}.js"></script>`)
            }
        }

        var the_page = `
            <button class="btn btn-primary d-flex mx-auto" onclick="resetPage(\'${page}\')"><i class="fal fa-home me-2"></i>Back to home page</button>
            ${title}
            ${content}
        `

        $("#page-content").show().append(the_page)
        $(".owl-carousel").hide()
    })
}

function resetPage(page) {
    $("#page-content").hide("")
    $(`#script_${page}`).remove()
    $(".owl-carousel").show()
}
