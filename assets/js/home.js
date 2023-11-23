$(document).ready(function() {
    $.get("./assets/json/home.json", function(data) {
        $.each(data, function(i, item){
            console.log(item)
            $("#home_page").append(`
                    <div class="col">
                        <div class="card me-3" id="card-menu">
                            <div class="card-body">
                                <h5 class="card-title">${data[i]['title']}</h5>
                                <p class="card-text">${data[i]['description']}</p>
                                <a href="${data[i]['button']['link']}" class="btn btn-${data[i]['button']['type']}"><i class="${data[i]['button']['icon']} me-2"></i>${data[i]['button']['text']}</a>
                            </div>
                        </div>
                    </div>
                `
            )
        })
    })
})