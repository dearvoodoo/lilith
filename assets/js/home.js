$(document).ready(function() {
    $.get("./assets/json/home.json", function(data) {
        $.each(data, function(i, item){
            console.log(item)
            $("#home_page").append(`
                <col>
                    <div class="card me-3" id="card-menu">
                        <div class="card-body">
                            <h5 class="card-title">${item['title']}</h5>
                            <p class="card-text">${item['description']}</p>
                            <a href="${item['button']['link']}" class="btn btn-${item['button']['type']}"><i class="${item['button']['icon']} me-2"></i>${item['button']['text']}</a>
                        </div>
                    </div>
                </col>
            `)
        })
    })
})