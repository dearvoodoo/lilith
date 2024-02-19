$(document).ready(function(){
    getYoutube().then(data => {
        var data = JSON.parse(data)
        $.each([0, 1, 2, 3, 4, 5], function(index, value){
            var article = `
                <div class="col">
                    <article class="card h-100 border-0 shadow-sm card-hover-primary" style="
                    min-height: 210px;
                    background: url(https://i1.ytimg.com/vi/${data.items[parseInt(value)].guid.split(":")[2]}/maxresdefault.jpg);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                ">
                        <div class="card-body pb-0">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <a href="#" class="badge fs-sm text-nav bg-primary text-decoration-none position-relative zindex-2">
                                    ${data.items[parseInt(value)].author}
                                </a>
                                <span class="fs-sm text-muted">
                                    ${moment(new Date(data.items[parseInt(value)].pubDate)).fromNow()}
                                </span>
                            </div>
                            <h3 class="h5 mb-0">
                                <a href="${data.items[parseInt(value)].link}" class="stretched-link" style="text-align: center;display: flex;align-items: center;justify-content: center;align-content: center;flex-wrap: nowrap;flex-direction: column;">
                                    ${data.items[parseInt(value)].title}
                                </a>
                            </h3>
                        </div>
                    </article>
                </div>
            `
            $("#yt_vids").append(article)
        })

        $("#lastvids_title").text(data.items[0].title)
        $("#lastvids_author").text(data.items[0].author)
        $("#lastvids_date").text(moment(new Date(data.items[0].pubDate)).fromNow())
        $("#lastvids_link").attr("href", data.items[0].link)
        //$(".jarallax-img").attr("style", `background-image: url(https://i1.ytimg.com/vi/${data.items[0].guid.split(":")[2]}/maxresdefault.jpg);`).attr("data-jarallax-original-styles", `background-image: url(https://i1.ytimg.com/vi/${data.items[0].guid.split(":")[2]}/maxresdefault.jpg);`)
    });

    getPost().then(data => {
        var data = JSON.parse(data)
        var post_categories = $("#post_categories")
        var post_items = $("#post_items")

        if (data[0].type == "no_post") {
            var article = `
            <article class="card border-0 shadow-sm overflow-hidden mb-4" style="border: 2px dashed #e5e5e50f !important;">
                <div class="row g-0">
                    <div class="col-sm-4 position-relative bg-repeat-0 bg-size-cover"
                        style="background-image: url(https://picsum.photos/id/96/1920/1080); min-height: 15rem;">
                        <a href="#" class="position-absolute top-0 start-0 w-100 h-100"
                            aria-label="Read more"></a>
                    </div>
                    <div class="col-sm-8">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <a href="#" class="badge fs-sm text-nav bg-secondary text-decoration-none">
                                    No post
                                </a>
                                <span class="fs-sm text-muted border-start ps-3 ms-3">
                                    ${moment(new Date(Date.now())).fromNow()}
                                </span>
                            </div>
                            <h3 class="h4">
                                <a href="#">
                                    No post for the moment
                                </a>
                            </h3>
                            <p>
                                No post on this site for the moment.
                                The dev is slow AF... just wait...
                            </p>
                            <hr class="my-4">
                            <div class="d-flex align-items-center justify-content-between">
                                <a href="#" class="d-flex align-items-center fw-bold text-dark text-decoration-none me-3">
                                    <img src="https://picsum.photos/id/117/256/256" class="rounded-circle me-3" width="48" alt="Avatar">
                                    Lilith
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            `
            post_items.append(article)
        } else {
            $.each(data, function(p, post){
                if($("#" + post.categorie.toLowerCase()).length == 0) {
                    post_categories.append(`
                        <li class="nav-item" id="${post.categorie.toLowerCase()}">
                            <a href="/${post.categorie}" class="nav-link">${post.categorie.substr(0,1).toUpperCase()+post.categorie.substr(1)}</a>
                        </li>
                `);
                }

                var article = `
                <article class="card border-0 shadow-sm overflow-hidden mb-4">
                    <div class="row g-0">
                        <div class="col-sm-4 position-relative bg-repeat-0 bg-size-cover"
                            style="background-image: url(${post.featured_media}); min-height: 15rem;">
                            <a href="${post.link}" class="position-absolute top-0 start-0 w-100 h-100"
                                aria-label="Read more"></a>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    <a href="/${post.categorie}" class="badge fs-sm text-nav bg-secondary text-decoration-none">
                                        ${post.categorie}
                                    </a>
                                    <span class="fs-sm text-muted border-start ps-3 ms-3">
                                        ${moment(new Date(0).setUTCSeconds(post.date)).fromNow()}
                                    </span>
                                </div>
                                <h3 class="h4">
                                    <a href="${post.link}">
                                        ${post.title}
                                    </a>
                                </h3>
                                <p>
                                    ${post.short_description}
                                </p>
                                <hr class="my-4">
                                <div class="d-flex align-items-center justify-content-between">
                                    <a href="#" class="d-flex align-items-center fw-bold text-dark text-decoration-none me-3">
                                        <img src="${post.author[0].cover}" class="rounded-circle me-3" width="48" alt="Avatar">
                                        ${post.author[0].name}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                `
                post_items.append(article)
            })
        }
    });
});


async function getYoutube(){
    var url = "https://api.rss2json.com/v1/api.json?rss_url=https://youtube.com/feeds/videos.xml?channel_id=UCC3qjEASWsSJPX0ww_h4gXg";
    var data = {
        headers: { "Content-Type" : "text/plain" },
        method: 'GET'
    }
    const response = await fetch(url, data);
    return response.text();
}

async function getPost(){
    var url = "./assets/json/blog_post.json";
    var data = {
        headers: { "Content-Type" : "text/plain" },
        method: 'GET'
    }
    const response = await fetch(url, data);
    return response.text();
}

