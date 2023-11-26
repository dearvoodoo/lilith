$(document).ready(function(){
    $.when(
        $.get("./assets/json/home.json", function(data) {
            $.each(data, function(i, item){
                var linked = `
                    <div class="item">
                        <div class="card me-3" id="card-menu">
                            <div class="card-body">
                                <h5 class="card-title">${data[i]['title']}</h5>
                                <p class="card-text">${data[i]['description']}</p>
                                <a href="${data[i]['button']['link']}" class="btn btn-${data[i]['button']['type']}"><i class="${data[i]['button']['icon']} me-2"></i>${data[i]['button']['text']}</a>
                            </div>
                        </div>
                    </div>`

                var linked_no_icon = `
                    <div class="item">
                        <div class="card me-3" id="card-menu">
                            <div class="card-body">
                                <h5 class="card-title">${data[i]['title']}</h5>
                                <p class="card-text">${data[i]['description']}</p>
                                <a href="${data[i]['button']['link']}" class="btn btn-${data[i]['button']['type']}">${data[i]['button']['text']}</a>
                            </div>
                        </div>
                    </div>`

                var scripted = `
                    <div class="item">
                        <div class="card me-3" id="card-menu">
                            <div class="card-body">
                                <h5 class="card-title">${data[i]['title']}</h5>
                                <p class="card-text">${data[i]['description']}</p>
                                <a onclick="${data[i]['button']['script']}" class="btn btn-${data[i]['button']['type']}"><i class="${data[i]['button']['icon']} me-2"></i>${data[i]['button']['text']}</a>
                            </div>
                        </div>
                    </div>`

                var scripted_no_icon = `
                    <div class="item">
                        <div class="card me-3" id="card-menu">
                            <div class="card-body">
                                <h5 class="card-title">${data[i]['title']}</h5>
                                <p class="card-text">${data[i]['description']}</p>
                                <a onclick="${data[i]['button']['script']}" class="btn btn-${data[i]['button']['type']}">${data[i]['button']['text']}</a>
                            </div>
                        </div>
                    </div>`

                if(data[i]["button"]["link"]) {
                    if(data[i]["button"]["icon"]) {
                        $(".owl-carousel").append(linked)
                    } else {
                        $(".owl-carousel").append(linked_no_icon)
                    }
                }

                if(data[i]["button"]["script"]) {
                    if(data[i]["button"]["icon"]) {
                        $(".owl-carousel").append(scripted)
                    } else {
                        $(".owl-carousel").append(scripted_no_icon)
                    }
                }
            })
        })
    ).then(function(){
        var owl = $('.owl-carousel')
        owl.owlCarousel({
            loop:true,
            center: true,
            items:3,
            margin:10,
            nav: true,
            autoWidth: true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:3,
                    nav:true
                },
                1000:{
                    items:5,
                    nav:true,
                    loop:true
                }
            },
            dots: true,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            lazyLoad:true
        });

        owl.on('mousewheel', '.owl-stage', function (e) {
            if (e.originalEvent.wheelDelta >= 0) {
                owl.trigger('next.owl');
            } else {
                owl.trigger('prev.owl');
            }
            e.preventDefault();
        });
    });
});
