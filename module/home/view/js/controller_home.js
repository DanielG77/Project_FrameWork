function carrusel(){
    // thing = IMG_BRAND;
    // console.log(thing);
    ajaxPromise(friendlyURL("?module=home&op=carrusel"), 'GET', 'JSON')
    .then(function(data) {
        let carousel = $(".carouselType");
        carousel.empty();

        for (let row in data) {
            $('<div></div>')
                .addClass("item_carrousel")
                .appendTo(carousel)
                .attr('id', data[row].name_typ)
                .html(`
                    <div class="main-carousel-item">
                        <div class="image-container">
                            <img src="${IMG_TYPE}${data[row].img_typ}" alt="${data[row].name_typ}">
                        </div>
                        <div class="type-overlay">
                            <h2 class="type-title">${data[row].name_typ}</h2>
                            <div class="type-border"></div>
                        </div>
                    </div>
                `);
        }

        carousel.owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 7000,
            responsive: {
                0: { items: 1 },
                600: { items: 1 },
                1000: { items: 1 }
            },
            navText: [
                '<svg width="40" height="40" viewBox="0 0 24 24"><path fill="white" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>',
                '<svg width="40" height="40" viewBox="0 0 24 24"><path fill="white" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
            ]
        });
    })
    .catch(function(error) {
        console.error("Error cargando los datos:", error);    
    })
}

function categories() {
    ajaxPromise(friendlyURL("?module=home&op=category"), 'GET', 'JSON')
    .then(function(data) {
        // console.log(data);
        let carousel = $(".carouseCategories");
        carousel.empty();

        for (let row in data) {
            $('<div></div>')
                .addClass("item categories-card")
                .appendTo(carousel)
                .attr('id', data[row].name_cat)
                .html(`
                    <div class="category-card">
                        <div class="category-image-container">
                            <img src="${IMG_CATEGORY}${data[row].img_cat}" alt="${data[row].name_cat}">
                            <div class="category-overlay">
                                <h3 class="category-title">${data[row].name_cat}</h3>
                            </div>
                        </div>
                    </div>
                `);
        }

        carousel.owlCarousel({
            loop: false,
            margin: 20,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: { items: 2 },
                600: { items: 3 },
                1000: { items: 5 }
            },
            navText: [
                '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>',
                '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
            ]
        });
    })
    .catch(function(error) {
        console.error("Error cargando los datos:", error);
    });
}

function brand() {
    ajaxPromise('?module=home&op=brand','GET', 'JSON')
    .then(function(data) {
        // console.log(data);
        let carousel = $(".carouseBrands");
        carousel.empty();

        for (let row in data) {
            $('<div></div>')
                .addClass("item brand-card")
                .appendTo(carousel)
                .attr('id', data[row].name_brand)
                .html(`
                    <div class="brand-card-inner">
                        <div class="brand-img-container">
                            <img src="${IMG_BRAND}${data[row].img_bra}" alt="${data[row].name_brand}" class="brand-image">
                            <div class="brand-text-overlay">
                                <p class="brand-name">${data[row].name_brand}</p>
                            </div>
                        </div>
                    </div>
                `);
        }

        carousel.owlCarousel({
            loop: false,
            margin: 15,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            responsive: {
                0: { items: 2 },
                480: { items: 3 },
                768: { items: 4 },
                1024: { items: 5 }
            },
            navText: [
                '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>',
                '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
            ]
        });
    })
    .catch(function(error) {
        console.error("Error cargando los datos del carrusel de marcas:", error);
    });
}

function city() {
    ajaxPromise('?module=home&op=city', 'GET', 'JSON')
    .then(function(data) {
        let carousel = $(".carouselCities");
        carousel.empty();

        for (let row in data) {
            $('<div></div>')
                .addClass("item city-card")
                .attr('id', data[row].name_cities) // Asignar el ID al div
                .appendTo(carousel)
                .html(`
                    <div class="city-container">
                        <p>${data[row].name_cities}</p>
                        <img src="${IMG_CITIE}${data[row].img_cities}" alt="${data[row].name_cities}">
                    </div>
                `);
        }

        // Configuración para mostrar 5 imágenes en pantallas grandes
        carousel.owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: { items: 1 },    // Móviles: 1 por fila
                600: { items: 2 },  // Tablets: 2 por fila
                1000: { items: 5 }  // Escritorio: 5 por fila
            },
        });
    })
    .catch(function(error) {
        console.error("Error cargando los datos del carrusel de ciudades:", error);
    });
}

function popular() {
    ajaxPromise('?module=home&op=popular', 'GET', 'JSON')
    .then(function(data) {
        let carousel = $(".carouselPopuProds");
        carousel.empty();

        for (let row in data) {
            const images = data[row].images_prod.split(',');
            
            const productHTML = `
                <div class="product-card">
                    <div class="product-image-container">
                        <div class="nested-carousel">
                            ${images.map(img => `
                                <div class="nested-item">
                                    <img src="${IMG_PROD}${img}" alt="${data[row].name_prod}" class="product-image">
                                </div>
                            `).join('')}
                        </div>
                        <div class="product-badge">Más vendido</div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${data[row].name_prod}</h3>
                        <div class="price-container">
                            <span class="product-price">$${data[row].price}</span>
                        </div>
                    </div>
                </div>
            `;
            // <span class="original-price">$${parseFloat(data[row].price) * 1.2}</span> //descuentos introducir en la linia 186 cuando sea necesario

            $('<div></div>')
                .addClass("item more_related_card")
                .attr('id', data[row].id_prod)
                .appendTo(carousel)
                .html(productHTML);
        }

        // Inicializar carrusel principal
        carousel.owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 5 }
            },
            onInitialized: function() {
                $('.nested-carousel').each(function() {
                    $(this).owlCarousel({
                        items: 1,
                        loop: true,
                        nav: true,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 3000,
                        navText: ['‹', '›']
                    });
                });
            }
        });
    })
    .catch(function(error) {
        console.error("Error cargando los datos:", error);
    });
}

function rating() {
    ajaxPromise('?module=home&op=rating', 'GET', 'JSON')
    .then(function(data) {
        let carousel = $(".carouselRatingProds");
        carousel.empty();

        for (let row in data) {
            const images = data[row].images_prod.split(',');
            
            const productHTML = `
                <div class="product-card">
                    <div class="product-image-container">
                        <div class="nested-carousel">
                            ${images.map(img => `
                                <div class="nested-item">
                                    <img src="${IMG_PROD}${img}" alt="${data[row].name_prod}" class="product-image">
                                </div>
                            `).join('')}
                        </div>
                        <div class="product-badge">Mejor Valorados</div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${data[row].name_prod}</h3>
                        <div class="price-container">
                            <span class="product-price">$${data[row].price}</span>
                        </div>
                    </div>
                </div>
            `;
            // <span class="original-price">$${parseFloat(data[row].price) * 1.2}</span> //descuentos introducir en la linia 186 cuando sea necesario

            $('<div></div>')
                .addClass("item more_popu_card")
                .attr('id', data[row].id_prod)
                .appendTo(carousel)
                .html(productHTML);
        }

        // Inicializar carrusel principal
        carousel.owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 5 }
            },
            onInitialized: function() {
                $('.nested-carousel').each(function() {
                    $(this).owlCarousel({
                        items: 1,
                        loop: true,
                        nav: true,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 3000,
                        navText: ['‹', '›']
                    });
                });
            }
        });
    })
    .catch(function(error) {
        console.error("Error cargando los datos:", error);
    });
}

// function clicks() {
//   $(document).on("click",'.carrusel_elements', function (){
//     var filters = [];
//     filters.push({"brand_name":[this.getAttribute('id')]});
//     localStorage.removeItem('filters')
//     localStorage.setItem('filters', JSON.stringify(filters));
//     localStorage.setItem('currentPage', 'shop-list');
//       setTimeout(function(){ 
//         window.location.href = friendlyURL('index.php?module=shop&op=view');
//       }, 200);  
//   }); 

//   $(document).on("click",'.category_elements', function (){
//     var filters = [];
//     filters.push({"category_name":[this.getAttribute('id')]});
//     localStorage.removeItem('filters')
//     localStorage.setItem('filters', JSON.stringify(filters));
//     localStorage.setItem('currentPage', 'shop-list');
//       setTimeout(function(){ 
//         window.location.href = friendlyURL('index.php?module=shop&op=view');
//       }, 200);  
//   });

//   $(document).on("click",'.card', function (){
//     var filters = [];
//     filters.push({"type_name":[this.getAttribute('id')]});
//     localStorage.removeItem('filters')
//     localStorage.setItem('filters', JSON.stringify(filters)); 
//     localStorage.setItem('currentPage', 'shop-list');
//       setTimeout(function(){ 
//         window.location.href = friendlyURL('index.php?module=shop&op=view');
//       }, 200);  
//   });
// }

$(document).ready(function() {
  // types();
  carrusel();
  categories();
  brand();
  city();
  popular();
  rating();
  // get_suggestions();
  // clicks();
});