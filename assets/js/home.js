$(document).ready(function() {
    $.get("./assets/json/home.json", function(data) {
        $.each(data, function(i, item){
            var html_no_cover = `
                <div class="grid-item">
                    <div class="card me-3" id="card-menu">
                        <div class="card-body">
                            <h5 class="card-title">${data[i]['title']}</h5>
                            <p class="card-text">${data[i]['description']}</p>
                            <a href="${data[i]['button']['link']}" class="btn btn-${data[i]['button']['type']}"><i class="${data[i]['button']['icon']} me-2"></i>${data[i]['button']['text']}</a>
                        </div>
                    </div>
                </div>
            `
            var html_cover = `
                <div class="grid-item">
                    <div class="card me-3" id="card-menu">
                        <img src="https://picsum.photos/1920/1080?random=${i}" class="card-img" height="250px">
                        <div class="card-img-overlay">
                            <div class="card-body">
                                <h5 class="card-title">${data[i]['title']}</h5>
                                <p class="card-text">${data[i]['description']}</p>
                                <a href="${data[i]['button']['link']}" class="btn btn-${data[i]['button']['type']}"><i class="${data[i]['button']['icon']} me-2"></i>${data[i]['button']['text']}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            var html_no_cover_no_icon = `
                <div class="grid-item">
                    <div class="card me-3" id="card-menu">
                        <div class="card-body">
                            <h5 class="card-title">${data[i]['title']}</h5>
                            <p class="card-text">${data[i]['description']}</p>
                            <a href="${data[i]['button']['link']}" class="btn btn-${data[i]['button']['type']}">${data[i]['button']['text']}</a>
                        </div>
                    </div>
                </div>
            `
            var html_cover_no_icon = `
                <div class="grid-item">
                    <div class="card me-3" id="card-menu">
                        <img src="https://picsum.photos/1920/1080?random=${i}" class="card-img" height="250px">
                        <div class="card-img-overlay">
                            <div class="card-body">
                                <h5 class="card-title">${data[i]['title']}</h5>
                                <p class="card-text">${data[i]['description']}</p>
                                <a href="${data[i]['button']['link']}" class="btn btn-${data[i]['button']['type']}">${data[i]['button']['text']}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `

            if (data[i]['cover']) {
                if (data[i]['button']['icon']) {
                    $("#home_page").append(html_cover)
                } else {
                    $("#home_page").append(html_cover_no_icon)
                }
            } else {
                if (data[i]['button']['icon']) {
                    $("#home_page").append(html_no_cover)
                } else {
                    $("#home_page").append(html_no_cover_no_icon)
                }
            }
        })
    })
})

$('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 200,
    gutter: 20
});