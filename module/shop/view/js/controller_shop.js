function shopAllproducts() {
    const filters = localStorage.getItem('filter_shop');
    const shopUbication = localStorage.getItem('shop_ubication');
    const likesData = localStorage.getItem('pre_like') || null;

    if (likesData !== null) {
        // console.log("Cargando likes desde localStorage");
        // console.log(likesData);
        click_likes(likesData);
        localStorage.removeItem('pre_like'); // Eliminar después de usar
    }

    // Verificar si shop_ubication contiene un número válido
    const productId = Number(shopUbication);
    if (!isNaN(productId) && productId > 0) {
        // Cargar detalles del producto específico
        loadDetails(productId);
        localStorage.removeItem('shop_ubication'); // Opcional: eliminar después de usar
        return;
    }

    if (filters !== null) {
            const filtro_data = JSON.parse(filters);
            if ('category' in filtro_data) {
            }
        ajaxForSearch('?module=shop&op=product_filters', 0, 8, filtro_data);
        return;

    }

    ajaxForSearch('?module=shop&op=products', 0, 8, undefined);
}

function ajaxForSearch(durl, total_prod, items_page, filters) {
    const token = localStorage.getItem('token');

    // Recuperar valores existentes si no se pasan
    total_prods = total_prod !== undefined ? total_prod : parseInt(localStorage.getItem('total_prod')) || 0;
    items_page = items_page !== undefined ? items_page : 8;
    filters = filters !== undefined ? filters : (localStorage.getItem('filter_shop') ? JSON.parse(localStorage.getItem('filter_shop')) : null);

    const move = localStorage.getItem('move');

    if (move !== null) {
        total_prods = parseInt(move);  // Sobrescribir total_prod con el valor de 'move'
    }

    ajaxPromise(friendlyURL(durl), 'POST', 'JSON', {
        'total_prod': total_prods,
        'items_page': items_page,
        'filters': filters
    })
    .then(function(data) {
        if (data !== "shop_vacio" && data !== null && data !== "" && !(Array.isArray(data) && data.length === 0)) {
            $("#content_shop_nogames").hide();
            $('#content_shop_games').empty();

            data.forEach(product => {
                const heartClass = token && product.is_liked ? 'fa-solid' : 'fa-regular';

                const productHTML = `
                    <div class="product-card" id="${product.id_prod}">
                        <div class="product-header">
                            ${product.name_status ? `<span class="product-status">${product.name_status}</span>` : ''}
                            <button class="like-btn" title="Like" style="position:absolute;top:10px;right:10px;z-index:3;" data-id="${product.id_prod}">
                                <i class="fa-heart ${heartClass}"></i>
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

            mapBox_all(data);
            load_likes();
        } else {
            $("#content_shop_games").empty();
            $("#content_shop_nogames").html(`
                <div class="no-products-container" style="text-align: center; padding: 40px;">
                    <img src="assets/img/no-products.png" alt="Sin productos" style="max-width: 150px; opacity: 0.6;">
                    <h2 style="margin-top: 20px; font-size: 1.5rem; color: #555;">No se han encontrado productos</h2>
                    <p style="color: #888;">Intenta ajustar tus filtros o vuelve a intentarlo más tarde.</p>
                </div>
            `).show();
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

        // Determinar el estado inicial del like
        const token = localStorage.getItem('token');
        const heartClass = product.is_liked ? 'fa-solid' : 'fa-regular';
        const heartColor = product.is_liked ? 'style="color: red;"' : '';

        $prodInfo.html(
            "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                    "<div class='product-content_details'>" +
                        "<div class='product-title-container'>" +
                            "<h1><b>" + product.name_prod + "</b></h1>" +
                            "<button class='details__heart' id='heart_" + id + "'>" +
                                "<i class='fa-heart " + heartClass + "' " + heartColor + "></i>" +
                            "</button>" +
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
        more_games_related(product.id_prod, product.names_typs);
        load_likes_details(product.id_prod);        
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

    // Evento independiente para el botón de like en la lista
    $(document).on("click", ".like-btn", function (event) {
        event.stopPropagation();
        const $icon = $(this).find('i');
        const id_prod = $(this).data('id');
        const token = localStorage.getItem('token');
        localStorage.setItem('shop_ubication', 'shop');

        // Enviar petición al servidor
        click_likes(id_prod);

        $icon.toggleClass('fa-regular fa-solid');

    });

    $(document).on("click", ".details__heart", function() {
        var fullId = this.getAttribute('id'); 
        var id_prod = fullId.split('_')[1];   // extrae "1"
        const $icon = $(this).find('i');
        
        localStorage.setItem('shop_ubication', id_prod);
        
        // Cambio visual inmediato
        const isLiked = $icon.hasClass('fa-solid');
        if (isLiked) {
            $icon.removeClass('fa-solid').addClass('fa-regular').css('color', '');
        } else {
            $icon.removeClass('fa-regular').addClass('fa-solid').css('color', 'red');
        }
        
        click_likes(id_prod); // pasa el id limpio
    });


    $(document).on("click", ".related-product-card", function () {
        var id_prod = this.getAttribute('id');
        
        $("html, body").animate({ scrollTop: 0 }, "slow");
    
        $(".left-column-shop, .right-column-shop").hide();
        $(".left-column-details, .right-column-details").show();
        more_visiteds(id_prod);
        localStorage.setItem('shop_ubication', id_prod); // Guardar ubicación para detalles
        window.location.reload(); // Recargar para mostrar detalles
        
    });

    // Filtros  
    
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
    
    
    $(document).on("click", '.button_categories', function() {

        localStorage.removeItem('filter_shop');
        localStorage.removeItem('name_cat');

        var filter_maps = [];
        var name_catergoria = this.getAttribute('id');

        localStorage.setItem('name_cat', "["+JSON.stringify(name_catergoria)+"]");
        filter_maps.push(['name_cat', name_catergoria]);         
        
        var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || [];
        filter_shop = filter_shop.filter(filter => filter[0] !== 'name_cat');
        filter_shop.push(['name_cat', localStorage.getItem('name_cat')]);
        localStorage.setItem('filter_shop', JSON.stringify(filter_shop));

        setTimeout(function() {
            window.location.reload();
        }, 300);
    });
    
}

function more_visiteds(id){
    // console.log("hola_most_visited");
    // console.log(id);
    ajaxPromise(friendlyURL('?module=shop&op=more_visited'), 'POST', 'JSON', {id: id})
        .then(function(data) {
            console.log("most_visited", data);
        })
        .catch(function(error) {
            console.log("Error al cargar productos visitados:", error);
        });
}

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
        var total_prod = data[0].contador;
        localStorage.setItem('total_prod', total_prod);
        var total_pages = total_prod >= 8 ? Math.ceil(total_prod / 8) : 1;
        var currentPage = localStorage.getItem('move') ? parseInt(localStorage.getItem('move')) / 8 + 1 : 1;

        var paginationHtml = '<div class="pagination-container">';
        if(currentPage !== 1){
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

        if(currentPage < total_pages){
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
            var offset = 8 * (num - 1);
            localStorage.setItem('move', JSON.stringify(offset));
            window.location.reload();
            $('html, body').animate({ scrollTop: $(".wrap") });
        });

        $('#pagination').on('click', '.arrow', function(event) {
            event.preventDefault();
            var direction = $(this).find('.arrow-text').text();
            var currentOffset = localStorage.getItem('move') ? parseInt(localStorage.getItem('move')) : 0;

            if (direction === 'Next') {
                var nextOffset = currentOffset + 8;
                if (nextOffset < total_prod) {
                    localStorage.setItem('move', JSON.stringify(nextOffset));
                    window.location.reload();
                }
            } else if (direction === 'Previous') {
                var prevOffset = currentOffset - 8;
                if (prevOffset >= 0) {
                    localStorage.setItem('move', JSON.stringify(prevOffset));
                    window.location.reload();
                }
            }

            $('html, body').animate({ scrollTop: $(".wrap") });
        });
    });
}


function more_games_related(id_prod, type_games) {
    var type_game = type_games;
    var prods = 0;
    // console.log("INICIAMOS EL SCROLLLL SEÑORES");
    // console.log(type_game);
    // console.log(prods);
    // console.log(id_prod);

    ajaxPromise(friendlyURL('?module=shop&op=count_related'), 'POST', 'JSON', { 'type_game': type_game, 'id_prod': id_prod })
        .then(function(data) {
            // console.log("Pero esto funciona?");
            // console.log(data);
            var total_prod = data[0].num_prods;
            // console.log(total_prod);
            // console.log(type_game);
            games_related(0, type_game, total_prod, id_prod);
            $(document).on("click", '.more_game__button', function() {
                prods = prods + 5;
                $('.more_game__button').empty();
                games_related(prods, type_game, total_prod, id_prod);
            });
        }).catch(function() {
            console.log('error total_prod');
        });
}

function games_related(loadeds = 0, type_game, total_items, id_prod) {
    let items = 5; 
    let loaded = loadeds; 
    let type = type_game; 
    let total_prods = total_items; 

    // console.log("MIRA MIRA MIRA");
    // console.log(type); // Imprime el tipo de juego en la consola.

    ajaxPromise(friendlyURL('?module=shop&op=games_related'), 'POST', 'JSON', { 'type': type, 'loaded': loaded, 'items': items, 'id_prod':id_prod })
        .then(function(data) {
            // console.log(data);
            // Carga Por Defecto
            if (loaded == 0) {
                $('.related-products-grid').empty();
                $('<div></div>')
                .attr({ 'id': 'related-games-section','class': 'related-games-section' })  
                .appendTo('.results')
                .html(` 
                    <h2 class="related-title">Juegos Relacionados</h2>
                    <div class="related-products-grid"></div>
                    <div class="related-load-more-container"></div>
                `);

                var gridContainer = $('.related-products-grid');
                // Itera sobre los datos recibidos y genera elementos HTML para cada producto.
                for (row in data) {
                    if (data[row].id_prod != undefined) {
                        var productCard = `
                            <article class="related-product-card" id="${data[row].id_prod}">
                                <div class="related-carousel-wrapper">
                                    <div id="related-carousel-${data[row].id_prod}" class="related-carousel owl-carousel"></div>
                                </div>
                                <div class="related-product-info">
                                    <h3 class="related-product-title">${data[row].name_prod}</h3>
                                    <div class="related-price-container">
                                        <span class="related-price">${data[row].price}€</span>
                                    </div>
                                    
                                </div>
                            </article>
                        `;

                        // <div class="related-product-badges">
                        //<span class="related-badge related-badge-new">Nuevo</span>
                        //<span class="related-badge related-badge-discount">${data[row].discount}%</span>
                        //</div>
                        gridContainer.append(productCard);
                        // Carrusel de imágenes
                        const carousel = $(`#related-carousel-${data[row].id_prod}`);
                        data[row].images_prod.split(',').forEach((image, index) => {
                            carousel.append(`
                                <div class="related-carousel-item">
                                    <img src="${IMG_PROD}${image.trim()}" 
                                        alt="${data[row].name_brands}" 
                                        class="related-product-image"
                                        loading="${index > 0 ? 'lazy' : 'eager'}">
                                </div>
                            `);
                        });

                        // Inicializar Owl Carousel con opciones mejoradas
                        carousel.owlCarousel({
                            items: 1,
                            loop: false,
                            nav: true,
                            navText: [
                                '<i class="related-carousel-nav related-prev-nav"></i>',
                                '<i class="related-carousel-nav related-next-nav"></i>'
                            ],
                            dots: true,
                            autoplay: true,
                            autoplayTimeout: 5000,
                            autoplayHoverPause: true,
                            responsiveRefreshRate: 100
                        });
                    }
                }

                $('<div></div>').attr({ 'id': 'more_game__button', 'class': 'more_game__button' })
                .appendTo('.related-load-more-container')
                    
                .html('<button class="load_more_button" id="load_more_button">LOAD MORE</button>');
            }

            // Si ya se han cargado al menos 3 productos.
            if (loaded >= 5) {
                var gridContainer = $('.related-products-grid');
                
                for (row in data) {
                    if (data[row].id_prod != undefined) {
                        var productCard = `
                            <article class="related-product-card" id="${data[row].id_prod}">
                                <div class="related-carousel-wrapper">
                                    <div id="related-carousel-${data[row].id_prod}" class="related-carousel owl-carousel"></div>
                                </div>
                                <div class="related-product-info">
                                    <h3 class="related-product-title">${data[row].name_prod}</h3>
                                    <div class="related-price-container">
                                        <span class="related-price">${data[row].price}€</span>
                                        <span class="related-price-label">Precio final</span>
                                    </div>
                                </div>
                            </article>
                        `;

                        gridContainer.append(productCard);
                        // Carrusel de imágenes
                        const carousel = $(`#related-carousel-${data[row].id_prod}`);
                        data[row].images_prod.split(',').forEach((image, index) => {
                            carousel.append(`
                                <div class="related-carousel-item">
                                    <img src="${IMG_PROD}${image.trim()}" 
                                        alt="${data[row].name_brands}" 
                                        class="related-product-image"
                                        loading="${index > 0 ? 'lazy' : 'eager'}">
                                </div>
                            `);
                        });

                        carousel.owlCarousel({
                            items: 1,
                            loop: false,
                            nav: true,
                            navText: [
                                '<i class="related-carousel-nav related-prev-nav"></i>',
                                '<i class="related-carousel-nav related-next-nav"></i>'
                            ],
                            dots: true,
                            autoplay: true,
                            autoplayTimeout: 5000,
                            autoplayHoverPause: true,
                            responsiveRefreshRate: 100
                        });
                    }
                }

                var total_prods = total_prods - 3;
                
                // console.log(total_prods);
                // console.log(loaded);
                if (total_prods >= loaded) {
                    $('.more_game__button').empty();
                    $('<div></div>').attr({ 'id': 'more_game__button', 'class': 'more_game__button' }).appendTo('.title_content')
                        .html("</br><button class='btn-notexist' id='btn-notexist'></button>");
                } else {
                    $('.more_game__button').empty();
                    $('<div></div>').attr({ 'id': 'more_game__button', 'class': 'more_game__button' }).appendTo('.title_content')
                        .html('<button class="load_more_button" id="load_more_button">LOAD MORE</button>');
                }
            }


        }).catch(function() {
            console.log("error game_related");
        });
}

//


/////////////likes///////////////////////////////////////////////////////

function click_likes(id_prod) {
        var token = localStorage.getItem('token') // no
        var id = id_prod; //si
        localStorage.setItem('id', id); // Guarda directo, sin JSON.stringify
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
            localStorage.setItem('pre_like', id); // Guarda directo, sin JSON.stringify

            Swal.fire({
                title: 'Necesitas loguearte',
                text: 'Para dar like debes estar autenticado.',
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                didClose: () => {
                    window.location.href = friendlyURL("?module=auth&op=view");
                }
            });

        }
    };

//Likes

function load_likes() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise(friendlyURL('?module=shop&op=load_likes'), 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            data.forEach(likedProduct => {
                const $likeBtn = $(`#${likedProduct.id_prod} .like-btn i`);
                if ($likeBtn.length) {
                    $likeBtn.removeClass('fa-regular').addClass('fa-solid');
                }
            });
        });
    }
}

function load_likes_details(id) {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise(friendlyURL('?module=shop&op=load_likes_details'), 'POST', 'JSON', { 'token': token, 'id': id })
        .then(function(data) {
            const $heartIcon = $(`#heart_${id} i`);
            if (data && data.length > 0 && data.some(item => item.id_prod == id)) {
                // Producto likeado - corazón rojo
                $heartIcon.removeClass('fa-regular').addClass('fa-solid').css('color', 'red');
            } else {
                // Producto no likeado - corazón blanco
                $heartIcon.removeClass('fa-solid').addClass('fa-regular').css('color', '');
            }
        })
        .catch(function(error) {
            console.error("Error al cargar likes:", error);
        });
    } else {
        // Sin token - mostrar corazón blanco
        $(`#heart_${id} i`)
            .removeClass('fa-solid')
            .addClass('fa-regular')
            .css('color', '');
    }
}

$(document).ready(function() {
    print_filters();
    shopAllproducts();
    paginacion();
    filter_button();
    clicks();
    
});

