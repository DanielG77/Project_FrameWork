function shopAllproducts() {
    var filters = localStorage.getItem('filter_shop') || false;
    // var id_prod = localStorage.getItem('id_prod') || false;
    // var categoria = localStorage.getItem('name_cat') || false;
    // var ubicacion = localStorage.getItem('ubication') || false;
    console.log("hola_show_products");
    console.log(filters);

    // if((categoria!=false) && (ubicacion=="shop")){ // Primer LLanze els filtros
    // if(categoria!=false){
    //     localStorage.removeItem('id_prod');
    //     categ_visited(categoria);
    // }
    if (filters != false) {
        // console.log("hola_show_products_filtres");

        var filtro_data = JSON.parse(filters);
        ajaxForSearch('?module=shop&op=product_filters', total_prod = 0, items_page = 8, filtro_data);      
    }
    // else if(id_prod != false){
        // localStorage.removeItem('id_prod');
        // more_visiteds(id_prod);
        // loadDetails(id_prod);
    // } 
    else {
        // console.log("hola_show_products_no_filtres");

        ajaxForSearch('?module=shop&op=products', total_prod = 0, items_page = 8, undefined)
            // ajaxForSearch('/programas/courses_home/module/shop/controller/ctrl_shop.php?op=all_games', total_prod = 0, items_page = 3, undefined);
    }
    
}

function ajaxForSearch(durl, total_prod, items_page, filters) {
    // console.log(durl);
    // console.log(total_prod);
    // console.log(items_page);

    ajaxPromise(friendlyURL(durl), 'POST',  'JSON', { 'total_prod': total_prod, 'items_page': items_page, 'filters': filters })
    .then(function(data) {
        // console.log("hola_data_shop");
        // console.log(data);
        if(data !== "shop_vacio" && data !== null && data !== "" && !(Array.isArray(data) && data.length === 0)) {
            $("#content_shop_nogames").hide();
            $('#content_shop_games').empty(); // Limpiar contenedor
            
            data.forEach(product => {
                const productHTML = `
                    <div class="product-card" id="${product.id_prod}">
                        <div class="product-header">
                            ${product.name_status ? `<span class="product-status">${product.name_status}</span>` : ''}
                            <button class="like-btn" title="Like" style="position:absolute;top:10px;right:10px;z-index:3;">
                                <i class="fa${product.is_liked ? 's' : 'r'} fa-heart"></i>
                            </button>
                            <div class="product-carousel-container">
                                <div id="carousel-${product.id_prod}" class="owl-carousel">
                                    ${product.images_prod.split(',').map(img => `
                                        <div class="item">
                                            <img src="${IMG_PROD}${img.trim()}" alt="${product.name_prod}" class="product-image">
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="product-body">
                            <div class="product-info">
                                <span class="product-price">${product.price}€</span>
                                <h3 class="product-title">${product.name_prod}</h3>
                                <div class="product-meta">
                                ${product.names_cat ? `
                                <div class="popup-categories">
                                    ${product.names_cat.split(',').map(cat => `
                                        <span class="popup-category">${cat.trim()}</span>
                                    `).join('')}
                                </div>
                                ` : ''}                                    
                                <span class="product-location">${product.name_cities}</span>
                                </div>
                            </div>
                            <div class="product-footer">
                                <div class="price-container">
                                    ${product.name_typ_sell ? `<span class="sell-type">${product.name_typ_sell}</span>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                $('#content_shop_games').append(productHTML);
                
                // Inicializar Owl Carousel
                $(`#carousel-${product.id_prod}`).owlCarousel({
                    items: 1,
                    loop: true,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    navText: ['‹', '›']
                });
            });

            //Carga de Funciones Extras
            mapBox_all(data);

        } else {
            $("#content_shop_games").hide();
            const noProductsHTML = `
                <div class="no-products-container">
                    <div class="no-products-content">
                        <div class="no-products-illustration">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </div>
                        <h3 class="no-products-title">¡Ups! No encontramos resultados</h3>
                        <p class="no-products-subtitle">Prueba ajustando tus filtros de búsqueda</p>
                        <button class="filter_remove" id="Remove_filter">Remove</button>
                    </div>
                </div>
            `;
            
            $('#content_shop_nogames').html(noProductsHTML);
        }
    });
}

function mapBox_all(data) {
    const customIcon = L.icon({
        iconUrl: '/programas/Project_FrameWork/view/images/marcador-de-posicion.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });

    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = L.map('map').setView([data[0].latitud, data[0].longitud], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        data.forEach(product => {
            const marker = L.marker([product.latitud, product.longitud], { icon: customIcon }).addTo(map);
            
            const popupContent = `
                <div class="map-popup" id="${product.id_prod}">
                    <div class="popup-carousel owl-carousel">
                        ${product.images_prod.split(',').map(img => `
                            <div class="item">
                                <img src="${IMG_PROD}${img.trim()}" alt="${product.name_prod}" class="popup-image">
                            </div>
                        `).join('')}
                    </div>
                    <div class="popup-info">
                        <h4 class="popup-title">${product.name_prod}</h4>
                        <div class="popup-details">
                            <p class="popup-price">${product.price}€</p>
                            <p class="popup-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${product.name_cities}
                            </p>
                            ${product.names_cat ? `
                            <div class="popup-categories">
                                ${product.names_cat.split(',').map(cat => `
                                    <span class="popup-category">${cat.trim()}</span>
                                `).join('')}
                            </div>
                        ` : ''}                        
                        </div>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent);
            
            marker.on('popupopen', () => {
                $(`.popup-carousel`).owlCarousel({
                    items: 1,
                    loop: true,
                    nav: true,
                    dots: false,
                    autoplay: false,
                    navText: ['‹', '›']
                });
            });
        });
    } else {
        console.error("Map container not found");
    }
}

function print_filters() {
    ajaxPromise(friendlyURL('?module=shop&op=filters'), 'POST',  'JSON')
    .then(function(filters) {
        // console.log("hola filtres nuevo framework");
        // console.log(filters);
        $('#filters').empty();
        
        var filtersContainer = $('<div class="filters-main-container"></div>').css({
            'display': 'flex',
            'flex-wrap': 'wrap',
            'align-items': 'flex-start',
            'gap': '15px'
        });

        filters.forEach(function(filter) {
            var valores = filter.valores.split(',');
            var tipo = filter.typ_filtro.toLowerCase();

            if(tipo === 'select' || tipo === 'order_by') {
                var divFilter = $('<div class="div-filters"></div>').css({'display': 'flex','flex-direction': 'column'});
                var select = $('<select></select>')
                    .addClass(filter.name_filtro)
                    .attr('id', filter.name_filtro)
                    .css('min-width', '120px');

                select.append('<option selected="selected" value="" disabled>' + filter.name_filtro + '</option>');
                
                valores.forEach(function(val) {
                    select.append($('<option></option>').attr('value', val).text(val));
                });
                
                divFilter.append(select);
                filtersContainer.append(divFilter);
            } 
           else if(tipo === 'checkbox') {
                var checkboxContainer = $('<div class="checkbox-container"></div>').css({
                    'border': '1px solid #ddd',
                    'padding': '8px',
                    'border-radius': '4px',
                    'cursor': 'pointer',
                    'transition': 'all 0.3s ease'
                });

                // Cabecera plegable
                var header = $('<div class="filter-header"></div>').css({
                    'display': 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center'
                }).append(
                    $('<div class="filter-title">').text(filter.name_filtro),
                    $('<i class="fas fa-chevron-down toggle-icon"></i>').css({
                        'transition': 'transform 0.3s ease',
                        'font-size': '0.8rem'
                    })
                );

                // Contenedor de checkboxes (inicialmente oculto)
                var content = $('<div class="checkbox-content"></div>').css({
                    'display': 'none',
                    'flex-direction': 'column',
                    'gap': '5px',
                    'padding-top': '8px',
                    'border-top': '1px solid #eee',
                    'margin-top': '8px'
                });

                valores.forEach(function(val) {
                    var cleanVal = val.trim().replace(/\s+/g, '_');
                    var checkboxDiv = $('<div class="checkbox-item"></div>');
                    var checkbox = $('<input type="checkbox" />')
                        .addClass(filter.name_filtro)
                        .attr('id', `${filter.name_filtro}_${cleanVal}`)
                        .val(val.trim());
                    
                    checkboxDiv.append($('<label></label>').append(checkbox).append(' ' + val.trim()));
                    content.append(checkboxDiv);
                });

                // Evento de clic para toggle
                header.on('click', function() {
                    content.slideToggle(300);
                    $(this).find('.toggle-icon').toggleClass('rotated');
                });

                checkboxContainer.append(header, content);
                filtersContainer.append(checkboxContainer);
            }
            else if(tipo === 'radiobutton') {
                var divFilter = $('<div class="div-filters"></div>').css({'display': 'flex','flex-direction': 'column'});
                divFilter.append($('<div class="filter-title">').text(filter.name_filtro));
                
                valores.forEach(function(val) {
                    var cleanVal = val.trim().replace(/\s+/g, '_');
                    var radioDiv = $('<div class="radio-item"></div>');
                    var radio = $('<input type="radio" />')
                        .addClass(filter.name_filtro)
                        .attr('name', filter.name_filtro)
                        .attr('id', `${filter.name_filtro}_${cleanVal}`)
                        .val(val.trim());
                    
                    radioDiv.append($('<label></label>').append(radio).append(' ' + val.trim()));
                    divFilter.append(radioDiv);
                });

                filtersContainer.append(divFilter);
            }
        });

        var buttonsContainer = $('<div class="filter-buttons"></div>').css({
            'display': 'flex',
            'gap': '10px',
            'align-self': 'center'
        }).append(
            $('<button class="filter_button" id="Button_filter">Filter</button>'),
            $('<button class="filter_remove" id="Remove_filter">Remove</button>')
        );

        filtersContainer.append(buttonsContainer);
        $('#filters').append(filtersContainer);

        // Highlight después de cargar el DOM
        const storedFilters = localStorage.getItem('filter_shop');
        if (storedFilters) {
            JSON.parse(storedFilters).forEach(filter => {
                const [filterName, storedValue] = filter;
                
                // Selects
                const select = $(`#${filterName}`);
                if (select.length) {
                    select.val(storedValue);
                    return;
                }

                // Checkboxes
                const checkboxes = $(`.${filterName}[type="checkbox"]`);
                if (checkboxes.length) {
                    try {
                        const values = JSON.parse(storedValue);
                        checkboxes.each(function() {
                            $(this).prop('checked', values.includes($(this).val()));
                        });
                    } catch(e) {
                        console.error('Error parsing checkbox values:', e);
                    }
                    return;
                }

                // Radio buttons
                const radio = $(`.${filterName}[type="radio"][value="${storedValue}"]`);
                if (radio.length) {
                    radio.prop('checked', true);
                }
            });
        }
    })
}

function filter_button() {
    //type
    $(document).on('change', '.name_typ', function () {
        if ($(this).attr('type') === 'checkbox') {
            let selectedValues = $('.name_typ:checked').map(function () {
                return this.value;
            }).get(); 
            localStorage.setItem('name_typ', JSON.stringify(selectedValues));
        } else {
                localStorage.setItem('name_typ', this.value);
        }
    }).val(localStorage.getItem('name_typ'));
   
    //category
    $(document).on('change', '.name_cat', function () {
        if ($(this).attr('type') === 'checkbox') {
            let selectedValues = $('.name_cat:checked').map(function () {
                return this.value;
            }).get(); 
            localStorage.setItem('name_cat', JSON.stringify(selectedValues));
        } else {
            localStorage.setItem('name_cat', this.value);
        }
    }).val(localStorage.getItem('name_cat'));

    //brand
    $(document).on('change', '.name_brand', function () {
        if ($(this).attr('type') === 'checkbox') {
            let selectedValues = $('.name_brand:checked').map(function () {
                return this.value;
            }).get(); 
            localStorage.setItem('name_brand', JSON.stringify(selectedValues));
        } else {
            localStorage.setItem('name_brand', this.value);
        }
    }).val(localStorage.getItem('name_brand'));

    //brand
    $(document).on('change', '.name_cities', function () {
        if ($(this).attr('type') === 'checkbox') {
            let selectedValues = $('..name_cities:checked').map(function () {
                return this.value;
            }).get(); 
            localStorage.setItem('name_cities', JSON.stringify(selectedValues));
        } else {
            localStorage.setItem('name_cities', this.value);
        }
    }).val(localStorage.getItem('name_cities'));

    //cities
    $(document).on('change', '.name_typ_sell', function () {
        if ($(this).attr('type') === 'checkbox') {
            let selectedValues = $('.name_typ_sell:checked').map(function () {
                return this.value;
            }).get(); 
            localStorage.setItem('name_typ_sell', JSON.stringify(selectedValues));
        } else {
            localStorage.setItem('name_typ_sell', this.value);
        }
    }).val(localStorage.getItem('name_typ_sell'));

    $(document).on('change', '.order_by', function () {
        if ($(this).attr('type') === 'checkbox') {
            let selectedValues = $('.order_by:checked').map(function () {
                return this.value;
            }).get(); 
            localStorage.setItem('order_by', JSON.stringify(selectedValues));
        } else {
            localStorage.setItem('order_by', this.value);
        }
    }).val(localStorage.getItem('order_by'));

    $(document).on('click', '.filter_button', function () {
        localStorage.removeItem('move');
        var filter_shop = [];

        if (localStorage.getItem('name_typ')) {
            filter_shop.push(['name_typ', localStorage.getItem('name_typ')]);
        }

        if (localStorage.getItem('name_cat')) {
            filter_shop.push(['name_cat', localStorage.getItem('name_cat')]);
            // categ_visited(localStorage.getItem('name_cat'))
        }

        if (localStorage.getItem('name_brand')) {
            filter_shop.push(['name_brand', localStorage.getItem('name_brand')]);
        }

        if (localStorage.getItem('name_cities')) {
            filter_shop.push(['name_cities', localStorage.getItem('name_cities')]);
        }

        if (localStorage.getItem('name_typ_sell')) {
            filter_shop.push(['name_typ_sell', localStorage.getItem('name_typ_sell')]);
        }

        if (localStorage.getItem('order_by')) {
            filter_shop.push(['order_by', localStorage.getItem('order_by')]);
        }

        if (filter_shop.length > 0) {
            localStorage.setItem('filter_shop', JSON.stringify(filter_shop));
            window.location.reload();
        } else {
            alert('Por favor, seleccione al menos un filtro.');
        }
    });
}

function loadDetails(id) {
    ajaxPromise(friendlyURL('?module=shop&op=details'), 'POST',  'JSON', {"id":id})
    .then(function(product) {
        console.log(product)
        // Ocultar paginación y listado, mostrar detalles
        $("#pagination").hide();
        $('.left-column-shop, .right-column-shop').hide();
        $('.main-container.shop-page').hide();

        // Limpiar contenedores detalles
        $('#container-date-img').empty();
        $('#container-date-prod').empty();
        $('#mapDetails').show();
        $('.main-container.details-page').show();

        // Limpiar accesorios relacionados
        $('.results_acesories').empty();
        $('.results').empty();

        // Galería de imágenes
        let images = product.images_prod.split(',');
        let $carousel = $("<div></div>")
            .attr({ id: "product-carousel", class: "owl-carousel owl-theme" })
            .appendTo('#container-date-img');
        images.forEach(img => {
            let image = img.trim();
            $('<div></div>')
                .addClass('item')
                .html(
                    `<div class='content-img-details'>
                        <img src="${IMG_PROD}${image}" alt="${product.name_prod}" class="product-image">
                    </div>`
                ).appendTo($carousel);
        });
        $('#product-carousel').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: true,
            autoplay: false,
            autoplayTimeout: 0,
            autoplayHoverPause: false
        });

        // Información del producto
        let name_brands = product.name_brands.split(',').join(', ');
        let name_extras = product.name_extras.split(',').join(', ');
        let names_typs = product.names_typs.split(',').join(', ');
        let names_typ_sell = product.names_typ_sell.split(',').join(', ');

        let $prodInfo = $("<div></div>")
            .attr("id", product.id_prod)
            .addClass("date_prod_dentro")
            .appendTo("#container-date-prod");

        $prodInfo.html(
            "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                    "<div class='product-content_details'>" +
                        "<div class='product-title-container'>" +
                            "<h1><b>" + product.name_prod + "</b></h1>" +
                            "<button class='details__heart' id='" + id + "'>" +
                                "<i class='" + (product.is_liked ? "fas" : "far") + " fa-heart'></i>" +
                            "</button>" +
                        "</div>" +

                        "<div class='container-new'>" +
                            "<div class='container__items' id='" + product.id_prod + "'>" +
                                "<input type='radio' name='stars' id='st5'><label for='st5'><div class='star-stroke'><div class='star-fill'></div></div><div class='label-description' data-content='5'></div></label>" +
                                "<input type='radio' name='stars' id='st4'><label for='st4'><div class='star-stroke'><div class='star-fill'></div></div><div class='label-description' data-content='4'></div></label>" +
                                "<input type='radio' name='stars' id='st3'><label for='st3'><div class='star-stroke'><div class='star-fill'></div></div><div class='label-description' data-content='3'></div></label>" +
                                "<input type='radio' name='stars' id='st2'><label for='st2'><div class='star-stroke'><div class='star-fill'></div></div><div class='label-description' data-content='2'></div></label>" +
                                "<input type='radio' name='stars' id='st1'><label for='st1'><div class='star-stroke'><div class='star-fill'></div></div><div class='label-description' data-content='1'></div></label>" +
                            "</div>" +
                        "</div>" +

                        "<h1><b>" + product.price + "€" + "</b></h1>" +
                        "<p><b>Estado:</b> " + (product.name_status || "N/A") + "</p>" +
                        "<a class='button_carrito' href='#'>Add to Cart</a>" +
                        "<a class='button_buy' href='#'>Buy</a>" +
                        "<hr class='hr-shop'>" +
                        "<table id='table-shop'>" +
                            "<tr><td><i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp;" + (name_brands || "N/A") + "</td></tr>" +
                            "<tr><td><i class='fa-solid fa-cogs fa-2xl'></i> &nbsp;" + (names_typs || "N/A") + "</td></tr>" +
                            "<tr><td><i class='fa-solid fa-shopping-cart fa-2xl'></i> &nbsp;" + (names_typ_sell || "N/A") + "</td></tr>" +
                            "<tr><td><i class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;" + (product.name_cities || "N/A") + "</td></tr>" +
                        "</table>" +
                        "<div class='buttoncategories' id='buttoncategories'></div>" +
                        "<hr class='hr-shop'>" +
                        "<h3><b>More Information:</b></h3>" +
                        "<p>" + (product.description_prod || "No description available.") + "</p>" +
                        "<hr class='hr-shop'>" + 
                        "<h3><b>Extras:</b></h3>" +
                        "<p>" + (name_extras || "No extras available.") + "</p>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );

        // Botones de categorías
        let names_cat = product.names_cat.split(',');
        for (let i = 0; i < names_cat.length; i++) {
            let name_cats = names_cat[i].trim();
            $('<div></div>')
                .addClass('item')
                .html(
                    "<a class='button_categories' id='" + name_cats + "'>"+ name_cats+"</a>" 
                ).appendTo('.buttoncategories');
        }

        // Mapa en detalles (si tienes función)
        mapBox_Details(product);

        // Relacionados (si tienes funciones)
        // more_accesori_related(names_typs);
        // more_games_related(names_typs, product.id_prod);
        
    }).catch(function(error) {
        console.error("Error al cargar detalles:", error);
    });
}

function clicks() {
    $(document).on("click", ".product-card", function () {
        var id = this.getAttribute('id');
        // localStorage.removeItem('id_prod');

        $(".left-column-shop, .right-column-shop").hide();
        $(".left-column-details, .right-column-details").show();
        more_visiteds(id);
        loadDetails(id);
    });

    $(document).on("click", ".map-popup", function () {
        var id_prod = this.getAttribute('id');
        
        $(".left-column-shop, .right-column-shop").hide();
        $(".left-column-details, .right-column-details").show();
        more_visiteds(id_prod);
        loadDetails(id_prod);
    });

    // $(document).on("click", ".related-product-card", function () {
    //     var id_prod = this.getAttribute('id');
        
    //     $("html, body").animate({ scrollTop: 0 }, "slow");
    
    //     $(".left-column-shop, .right-column-shop").hide();
    //     $(".left-column-details, .right-column-details").show();
    //     more_visiteds(id_prod);
    //     loadDetails(id_prod);
        
    // });

//     // Filtros  
    
    $(document).on('click', '.filter_remove', function () {
        localStorage.removeItem('name_typ');
        localStorage.removeItem('name_cat');
        localStorage.removeItem('name_brand');
        localStorage.removeItem('name_cities');
        localStorage.removeItem('name_typ_sell');
        localStorage.removeItem('order_by');
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('move');

        window.location.reload();
    });
    
    // $(document).on("click", '.button_categories', function() {

    //     localStorage.removeItem('filter_shop');
    //     localStorage.removeItem('name_cat');

    //     var filter_maps = [];
    //     var name_catergoria = this.getAttribute('id');

    //     localStorage.setItem('name_cat', "["+JSON.stringify(name_catergoria)+"]");
    //     filter_maps.push(['name_cat', name_catergoria]);         
        
    //     var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || [];
    //     filter_shop = filter_shop.filter(filter => filter[0] !== 'name_cat');
    //     filter_shop.push(['name_cat', localStorage.getItem('name_cat')]);
    //     localStorage.setItem('filter_shop', JSON.stringify(filter_shop));

    //     setTimeout(function() {
    //         window.location.href = 'index.php?page=ctrl_shop&op=list';
    //     }, 300);
    // });

//     // Valoracion
//     $(document).on("click", ".container__items label", function() {
//         var ratingValue = $(this).find('.label-description').data('content');
        
//         var productId = $(this).closest('.container__items').attr('id');
        
//         if (productId && ratingValue) {
//             console.log("ID Producto:", productId, "Rating:", ratingValue);
            
//             rating(productId, ratingValue);
            
//             $(this).siblings().removeClass('selected');
//             $(this).addClass('selected');
//         } else {
//             console.error("No se pudo obtener el ID del producto o el valor de la valoración");
//         }
//     });

    // // Botones Like
    // $(document).on("click", ".list__heart", function() {
    //     var id_prod = this.getAttribute('id');
    //     click_like(id_prod, "list_all");
    // });

//     $(document).on("click", ".details__heart", function() {
//         console.log("Corazonzito");
//         var id_prod = this.getAttribute('id');
//         console.log(id_prod);
//         click_likes(id_prod, "details");
//     });

}

function more_visiteds(id_prod){
    console.log("hola_most_visited");
    console.log(id_prod);
    ajaxPromise(friendlyURL('?module=shop&op=more_visited'), 'POST', 'JSON', { 'id_prod': id_prod })
}


// function rating(id_prod, value){
//     // console.log("RATING");
//     // console.log(id_prod);
//     // console.log(id_prod);
//     ajaxPromise('/programas/courses_home/module/shop/controller/ctrl_shop.php?op=rating', 'POST', 'JSON', { 'id_prod': id_prod, 'value': value })
// }

// function categ_visited(name_cat){
//     ajaxPromise('/programas/courses_home/module/shop/controller/ctrl_shop.php?op=categorievisted', 'POST', 'JSON', { 'name_cat': name_cat })
//     .then(function(data) {
//         console.log(data);
//     });
// }



function mapBox_Details(product) {
    const customIcon = L.icon({
        iconUrl: '/programas/Project_FrameWork/view/images/marcador-de-posicion.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });

    const mapContainer = document.getElementById('mapDetails');
    if (mapContainer) {
        // Destruir el mapa existente si ya existe
        if (mapContainer._leaflet_id) {
            mapContainer._leaflet_id = null;
            mapContainer.innerHTML = '';
        }
        const map = L.map('mapDetails').setView([product.latitud, product.longitud], 9);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([product.latitud, product.longitud], { icon: customIcon }).addTo(map);
        const popupContent = `
            <div class="map-popup">
                <div class="popup-carousel owl-carousel">
                    ${product.images_prod.split(',').map(img => `
                        <div class="item">
                            <img src="${IMG_PROD}${img.trim()}" alt="${product.name_prod}" class="popup-image">
                        </div>
                    `).join('')}
                </div>
                <div class="popup-info">
                    <h4 class="popup-title">${product.name_prod}</h4>
                    <div class="popup-details">
                        <p class="popup-price">${product.price}€</p>
                        <p class="popup-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${product.name_cities}
                        </p>
                        ${product.names_cat ? `
                        <div class="popup-categories">
                            ${product.names_cat.split(',').map(cat => `
                                <span class="popup-category">${cat.trim()}</span>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        marker.bindPopup(popupContent);
        marker.on('popupopen', () => {
            $(`#mapDetails .popup-carousel`).owlCarousel({
                items: 1,
                loop: true,
                nav: true,
                dots: false,
                autoplay: false,
                navText: ['‹', '›']
            });
        });
    } else {
        console.error("Map container for details not found");
    }
}

function paginacion() {
    
    console.log("hola paginacion");
    var filters = localStorage.getItem('filter_shop') || false;
    if (filters === undefined || filters === false || filters === false) {
            var url = "?module=shop&op=count_paginacion";
    } else {
            var filter_data = JSON.parse(filters);
            var url = "?module=shop&op=count_paginacion_filters";
    }
   

    ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'filters': filter_data })
    .then(function(data) {
        // console.log(data);
        var total_prod = data[0].contador;
        // console.log(total_prod);
        localStorage.setItem('total_prod', total_prod);
        var total_pages = total_prod >= 8 ? Math.ceil(total_prod / 8) : 1;
        // console.log(total_pages);
        var currentPage = localStorage.getItem('move') ? parseInt(JSON.parse(localStorage.getItem('move'))) : 0;
        // console.log(currentPage);

        var paginationHtml = '<div class="pagination-container">';
        if(currentPage!=0){
            paginationHtml += `
                <div class="arrow">
                <svg width="18" height="18"><use xlink:href="#left" /></svg>
                <span class="arrow-text">Previous</span>
                </div>`;
        }

        for (let i = 1; i <= total_pages; i++) {
            paginationHtml += `
                <div class="pagination-number ${i === currentPage ? 'pagination-active' : ''}">
                  ${i}
                </div>
            `;
        }

        if((localStorage.getItem('move') ? parseInt(JSON.parse(localStorage.getItem('move'))) : 0) < (total_prod-8)){

            paginationHtml += `
                <div class="arrow">
                <svg width="18" height="18"><use xlink:href="#right" /></svg>
                <span class="arrow-text">Next</span>
                </div>`;
        }

        paginationHtml += '</div>';
        $('#pagination').html(paginationHtml);

        $('#pagination').on('click', '.pagination-number', function(event) {
            event.preventDefault();
            var num = parseInt($(this).text());
            total_prod = 8 * (num - 1);

            //con la variable move soy capaz de saber en que pagina estoy
            localStorage.setItem('move', JSON.stringify(total_prod));

            window.location.reload();
            $('html, body').animate({ scrollTop: $(".wrap") });

        });

        $(document).ready(function() {
            $('#pagination').on('click', '.arrow', function(event) {
                event.preventDefault();
                
                var direction = $(this).find('.arrow-text').text();
        
                var actualyposition = localStorage.getItem('move') ? parseInt(JSON.parse(localStorage.getItem('move'))) : 0;
        
                var total_prod = parseInt(localStorage.getItem('total_prod')) || 0;
        
                // localStorage.setItem('Actual position', actualyposition);
                
                if (direction === 'Next') {
                    var next_page = actualyposition + 8;
                    localStorage.setItem("Next page:", next_page);
                    localStorage.setItem("actualyposition:", actualyposition);

                    if (next_page <= total_prod) {
                        localStorage.setItem('move', JSON.stringify(next_page));
                        window.location.reload();
                    }
                } else if (direction === 'Previous') {
                    var prev_page = actualyposition - 8; 
                    localStorage.setItem("Next page:", next_page);
                    localStorage.setItem("actualyposition:", actualyposition);
                    if (prev_page >= 0) {
                        localStorage.setItem('move', JSON.stringify(prev_page));
                        window.location.reload();
                    }
                }
        
                $('html, body').animate({ scrollTop: $(".wrap") });
            });
        });
    });
}

// function games_related(loadeds = 0, type_game, total_items, id_prod) {
//     let items = 5; 
//     let loaded = loadeds; 
//     let type = type_game; 
//     let total_prods = total_items; 

//     // console.log("MIRA MIRA MIRA");
//     // console.log(type); // Imprime el tipo de juego en la consola.

//     ajaxPromise('/programas/courses_home/module/shop/controller/ctrl_shop.php?op=games_related', 'POST', 'JSON', { 'type': type, 'loaded': loaded, 'items': items, 'id_prod':id_prod })
//         .then(function(data) {
//             // console.log(data);
//             //Carga Por Defecto
//             if (loaded == 0) {
//                 $('.related-products-grid').empty();
//                 $('<div></div>')
//                 .attr({ 'id': 'related-games-section','class': 'related-games-section' })  
//                 .appendTo('.results')
//                 .html(` 
//                     <h2 class="related-title">Juegos Relacionados</h2>
//                     <div class="related-products-grid"></div>
//                     <div class="related-load-more-container"></div>
//                 `);

//                 var gridContainer = $('.related-products-grid');
//                 // Itera sobre los datos recibidos y genera elementos HTML para cada producto.
//                 for (row in data) {
//                     if (data[row].id_prod != undefined) {
//                         var productCard = `
//                             <article class="related-product-card" id="${data[row].id_prod}">
//                                 <div class="related-carousel-wrapper">
//                                     <div id="related-carousel-${data[row].id_prod}" class="related-carousel owl-carousel"></div>
//                                 </div>
//                                 <div class="related-product-info">
//                                     <h3 class="related-product-title">${data[row].name_prod}</h3>
//                                     <div class="related-price-container">
//                                         <span class="related-price">${data[row].price}€</span>
//                                     </div>
                                    
//                                 </div>
//                             </article>
//                         `;

//                         // <div class="related-product-badges">
//                         //<span class="related-badge related-badge-new">Nuevo</span>
//                         //<span class="related-badge related-badge-discount">${data[row].discount}%</span>
//                         //</div>
//                         gridContainer.append(productCard);
//                         // Carrusel de imágenes
//                         const carousel = $(`#related-carousel-${data[row].id_prod}`);
//                         data[row].images_prod.split(',').forEach((image, index) => {
//                             carousel.append(`
//                                 <div class="related-carousel-item">
//                                     <img src="${image.trim()}" 
//                                          alt="${data[row].name_brands}" 
//                                          class="related-product-image"
//                                          loading="${index > 0 ? 'lazy' : 'eager'}">
//                                 </div>
//                             `);
//                         });

//                         // Inicializar Owl Carousel con opciones mejoradas
//                         carousel.owlCarousel({
//                             items: 1,
//                             loop: false,
//                             nav: true,
//                             navText: [
//                                 '<i class="related-carousel-nav related-prev-nav"></i>',
//                                 '<i class="related-carousel-nav related-next-nav"></i>'
//                             ],
//                             dots: true,
//                             autoplay: true,
//                             autoplayTimeout: 5000,
//                             autoplayHoverPause: true,
//                             responsiveRefreshRate: 100
//                         });
//                     }
//                 }

//                 $('<div></div>').attr({ 'id': 'more_game__button', 'class': 'more_game__button' })
//                 .appendTo('.related-load-more-container')
                    
//                 .html('<button class="load_more_button" id="load_more_button">LOAD MORE</button>');
//             }

//             // Si ya se han cargado al menos 3 productos.
//             if (loaded >= 5) {
//                 var gridContainer = $('.related-products-grid');
                
//                 for (row in data) {
//                     if (data[row].id_prod != undefined) {
//                         var productCard = `
//                             <article class="related-product-card" id="${data[row].id_prod}">
//                                 <div class="related-carousel-wrapper">
//                                     <div id="related-carousel-${data[row].id_prod}" class="related-carousel owl-carousel"></div>
//                                 </div>
//                                 <div class="related-product-info">
//                                     <h3 class="related-product-title">${data[row].name_prod}</h3>
//                                     <div class="related-price-container">
//                                         <span class="related-price">${data[row].price}€</span>
//                                         <span class="related-price-label">Precio final</span>
//                                     </div>
//                                 </div>
//                             </article>
//                         `;

//                         gridContainer.append(productCard);
//                         // Carrusel de imágenes
//                         const carousel = $(`#related-carousel-${data[row].id_prod}`);
//                         data[row].images_prod.split(',').forEach((image, index) => {
//                             carousel.append(`
//                                 <div class="related-carousel-item">
//                                     <img src="${image.trim()}" 
//                                          alt="${data[row].name_brands}" 
//                                          class="related-product-image"
//                                          loading="${index > 0 ? 'lazy' : 'eager'}">
//                                     <div class="related-image-overlay">
//                                         <button class="related-quick-view">Vista rápida</button>
//                                     </div>
//                                 </div>
//                             `);
//                         });

//                         carousel.owlCarousel({
//                             items: 1,
//                             loop: false,
//                             nav: true,
//                             navText: [
//                                 '<i class="related-carousel-nav related-prev-nav"></i>',
//                                 '<i class="related-carousel-nav related-next-nav"></i>'
//                             ],
//                             dots: true,
//                             autoplay: true,
//                             autoplayTimeout: 5000,
//                             autoplayHoverPause: true,
//                             responsiveRefreshRate: 100
//                         });
//                     }
//                 }

//                 var total_prods = total_prods - 3;
                
//                 // console.log(total_prods);
//                 // console.log(loaded);
//                 if (total_prods >= loaded) {
//                     $('.more_game__button').empty();
//                     $('<div></div>').attr({ 'id': 'more_game__button', 'class': 'more_game__button' }).appendTo('.title_content')
//                         .html("</br><button class='btn-notexist' id='btn-notexist'></button>");
//                 } else {
//                     $('.more_game__button').empty();
//                     $('<div></div>').attr({ 'id': 'more_game__button', 'class': 'more_game__button' }).appendTo('.title_content')
//                         .html('<button class="load_more_button" id="load_more_button">LOAD MORE</button>');
//                 }
//             }


//         }).catch(function() {
//             console.log("error game_related");
//         });
// }

// function more_games_related(type_games, id_prod) {
//     var type_game = type_games;
//     var prods = 0;
//     // console.log("INICIAMOS EL SCROLLLL SEÑORES");
//     // console.log(type_game);
//     // console.log(prods);
//     // console.log(id_prod);

//     ajaxPromise('/programas/courses_home/module/shop/controller/ctrl_shop.php?op=count_related', 'POST', 'JSON', { 'type_game': type_game, 'id_prod': id_prod })
//         .then(function(data) {
//             // console.log("Pero esto funciona?");
//             // console.log(data);
//             var total_prod = data[0].num_prods;
//             // console.log(total_prod);
//             // console.log(type_game);
//             games_related(0, type_game, total_prod, id_prod);
//             $(document).on("click", '.more_game__button', function() {
//                 prods = prods + 5;
//                 $('.more_game__button').empty();
//                 games_related(prods, type_game, total_prod, id_prod);
//             });
//         }).catch(function() {
//             console.log('error total_prod');
//         });
// }

//
//Likes
//
function load_likes() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise(friendlyURL('?module=shop&op=load_likes'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                for (row in data) {
                    if ($("#" + data[row].car_id).children("i").hasClass("like_white")) {
                        $("#" + data[row].car_id).children("i").removeClass("like_white").addClass("like_red");
                    }
                }
            })
    }
}

function load_likes_details(id) {
    var token = localStorage.getItem('token');
    var id = id.id;
    if (token) {
        ajaxPromise(friendlyURL('?module=shop&op=load_likes_details'), 'POST', 'JSON', { 'token': token, 'id': id })
            .then(function(data) {
                if (id == data.car_id) {
                    $("#" + data.car_id).children("i").removeClass("like_white").addClass("like_red");
                    $(".like").empty();
                    $('<i id="like" class="like_red fa-heart fa-2x"></i>').appendTo('.like')
                }
            })
    }
}

function click_likes(id_prod, location) {
        let redirect = [location]; // mirar
        var token = localStorage.getItem('token') // no
        var id = id_prod; //si
        redirect.push(id);
        localStorage.setItem('id', JSON.stringify(redirect));
        // console.log(token);
        // console.log(id);
        // console.log(redirect);
        if (token) {
            ajaxPromise(friendlyURL('?module=shop&op=control_likes'), 'POST', 'JSON', { 'token': token, 'id': id })
            if ($(this).children("i").hasClass("like_white")) {
                $(this).children("i").removeClass("like_white").addClass("like_red");
            } else {
                $(this).children("i").removeClass("like_red").addClass("like_white");
            }
        } else {
            if (localStorage.getItem('details')) {
                toastr['warning']("Necesitas loguearte para dar like");
                setTimeout(' window.location.href = "index.php?page=ctrl_auth&op=list"; ', 2000);
                                                    
            } else {
                toastr['warning']("Necesitas loguearte para dar like");
                setTimeout(' window.location.href = "index.php?page=ctrl_auth&op=list"; ', 2000);
            }
        }
    };


$(document).ready(function() {
    print_filters();
    shopAllproducts();
    paginacion();
    filter_button();
    clicks();
    
});

