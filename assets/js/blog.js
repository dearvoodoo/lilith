$(document).ready(function(){
    getPost().then(data => {
        var data = JSON.parse(data)
        var post_categories = $("#post_content")
        var post_id = getUrlVars()["id"];

        $.each(data, function(p, post){
            if(post.id == post_id) {
                createNav(post);
                createPost(post);
            }
        });
    });
});

function createNav(post) {
    $("#nav_post_title").text(post.title)

    var info = `
        <section class="container mt-4 pt-lg-2 pb-3">
            <h1 class="pb-3" style="max-width: 970px;">${post.title}</h1>
            <div class="d-flex flex-md-row flex-column align-items-md-center justify-content-md-between mb-3">
                <div class="d-flex align-items-center flex-wrap text-muted mb-md-0 mb-4">
                    <div class="fs-xs border-end pe-3 me-3 mb-2">
                        <span class="badge bg-faded-primary text-primary fs-base">${post.categorie}</span>
                    </div>
                    <div class="fs-sm pe-3 me-3 mb-2">${moment(new Date(0).setUTCSeconds(post.date)).fromNow()}</div>
                </div>
                <div class="d-flex align-items-center position-relative ps-md-3 pe-lg-5 mb-2">
                    <img src="${post.author[0].cover}" class="rounded-circle" width="60" alt="Avatar">
                    <div class="ps-3">
                        <h6 class="mb-1">Author</h6>
                        <a href="#" class="fw-semibold stretched-link">${post.author[0].name}</a>
                    </div>
                </div>
            </div>
        </section>
    `
    $("#nav_post_info").append(info)

    var paralax = `
        <div id="jarallax-container-0" class="jarallax-container" style=" position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden; z-index: -100; clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%);">
            <div class="jarallax-img" style="
                background-image: url('${post.featured_media}');
                object-fit: cover;
                object-position: 50% 50%;
                max-width: none;
                position: fixed;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                overflow: hidden; pointer-events: none;
                transform-style: preserve-3d;
                backface-visibility: hidden;
                margin-top: 64.1512px;
                transform: translate3d(0px, -61.9145px, 0px);"
                data-jarallax-original-styles="background-image: url('${post.featured_media}');">
            </div>
        </div>
    `
    $("#nav_paralax").append(paralax)
};

function createPost(post) {
    const wordsPerMinute = 200; // Average case.
    let result;
    let textLength = post.content.split(" ").length; // Split by words
    if(textLength > 0){
        let value = Math.ceil(textLength / wordsPerMinute);
        result = `~${value} min read`;
    }
    var the_post = `
        <!-- Content -->
        <div class="col-lg-9">
            ${post.content}
        </div>

        <!-- Sharing -->
        <div class="col-lg-3 position-relative">
            <div class="sticky-top ms-xl-5 ms-lg-4 ps-xxl-4" style="top: 105px !important;">
                <span class="d-block mb-3">${result}</span>
                <h6>Share this post:</h6>
                <div class="mb-4 pb-lg-3">
                    <a href="#" class="btn btn-icon btn-secondary btn-linkedin me-2 mb-2" aria-label="LinkedIn">
                        <i class="bx bxl-linkedin"></i>
                    </a>
                    <a href="#" class="btn btn-icon btn-secondary btn-facebook me-2 mb-2" aria-label="Facebook">
                        <i class="bx bxl-facebook"></i>
                    </a>
                    <a href="#" class="btn btn-icon btn-secondary btn-twitter me-2 mb-2" aria-label="Twitter">
                        <i class="bx bxl-twitter"></i>
                    </a>
                    <a href="#" class="btn btn-icon btn-secondary btn-instagram me-2 mb-2"
                        aria-label="Instagram">
                        <i class="bx bxl-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    `

    $("#post_content").append(the_post)
};

async function getPost(){
    var url = "./assets/json/blog_post.json";
    var data = {
        headers: { "Content-Type" : "text/plain" },
        method: 'GET'
    }
    const response = await fetch(url, data);
    return response.text();
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}