$(document).ready(function(){
    $.getJSON("./assets/json/navbar.json", function(data){
        $.each(data, function(m, menu){
            if (menu.type == "link") {
                $("#menu-desktop").append(`
                    <li class="nav-item">
                        <a href="${menu.link}" class="nav-link">${menu.name}</a>
                    </li>
                `)
            }

            if (menu.type == "dropdown_image") {
                $("#menu-desktop").append(`
                <li class="nav-item dropdown">
                    <a href="${menu.link}" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="${menu.name.toLowerCase()}">${menu.name}</a>
                    <div class="dropdown-menu p-0">
                        <div class="d-lg-flex"  id="${menu.name.toLowerCase()}-menu">
                        </div>
                    </div>
                </li>
                `)

                $.each(menu.dropdown, function(d, dropdown){
                    // set image
                    if (dropdown.type == "image") {
                        $(`#${menu.name.toLowerCase()}-menu`).append(`
                            <div class="mega-dropdown-column d-flex justify-content-center align-items-center rounded-3 rounded-end-0 px-0" style="margin: -1px; background-color: #f3f6ff;">
                                <img src="${dropdown.value}" style=" object-fit: cover; height: 100%; border-radius: 7px 0 0 7px;">
                            </div>
                        `)
                    }
    
                    // set dropdown
                    if (dropdown.type == "with_title") {
                        if ($(`#column-${dropdown.col}-${menu.name}`).length){
                            $(`#column-${dropdown.col}-${menu.name}`).append(`
                                <h6 class="px-3 mb-2">${dropdown.title}</h6>
                                <ul class="list-unstyled mb-3" id="${dropdown.title.toLowerCase()}"></ul>
                            `)
                        } else {
                            $(`#${menu.name.toLowerCase()}-menu`).append(`
                                <div class="mega-dropdown-column pt-lg-3 pb-lg-4" id="column-${dropdown.col}-${menu.name}">
                                    <h6 class="px-3 mb-2">${dropdown.title}</h6>
                                    <ul class="list-unstyled mb-3" id="${dropdown.title.toLowerCase()}"></ul>
                                </div>
                            `)
                        }
                    }
    
                    // add links
                    $.each(dropdown.links, function(l, links){
                        $(`#${dropdown.title.toLowerCase()}`).append(`
                            <li>
                                <a href="${links.link}" class="dropdown-item py-1">${links.name}</a>
                            </li>
                        `)
                    })
                })
            }

            if (menu.type == "dropdown") {
                $("#menu-desktop").append(`
                <li class="nav-item dropdown">
                    <a href="${menu.link}" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="${menu.name.toLowerCase()}">${menu.name}</a>
                    <div class="dropdown-menu p-0">
                        <div class="d-lg-flex"  id="${menu.name.toLowerCase()}-menu">
                        </div>
                    </div>
                </li>
                `)

                $.each(menu.dropdown, function(d, dropdown){
                    // set dropdown
                    if (dropdown.type == "with_title") {
                        if ($(`#column-${dropdown.col}-${menu.name}`).length){
                            $(`#column-${dropdown.col}-${menu.name}`).append(`
                                <h6 class="px-3 mb-2">${dropdown.title}</h6>
                                <ul class="list-unstyled mb-3" id="${dropdown.title.toLowerCase()}"></ul>
                            `)
                        } else {
                            $(`#${menu.name.toLowerCase()}-menu`).append(`
                                <div class="mega-dropdown-column pt-lg-3 pb-lg-4" id="column-${dropdown.col}-${menu.name}">
                                    <h6 class="px-3 mb-2">${dropdown.title}</h6>
                                    <ul class="list-unstyled mb-3" id="${dropdown.title.toLowerCase()}"></ul>
                                </div>
                            `)
                        }
                    }

                    // add links
                    $.each(dropdown.links, function(l, links){
                        $(`#${dropdown.title.toLowerCase()}`).append(`
                            <li>
                                <a href="${links.link}" class="dropdown-item py-1">${links.name}</a>
                            </li>
                        `)
                    })
                })
            }
        })
    })
});