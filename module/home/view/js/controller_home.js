function carousel_Types() {
    ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=Carousel_Type', 'GET', 'JSON')
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
                            <img src="${data[row].img_typ}" alt="${data[row].name_typ}">
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
    });
}

function carousel_City() {
    ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=Carousel_Cities', 'GET', 'JSON')
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
                        <img src="${data[row].img_cities}" alt="${data[row].name_cities}">
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

function carousel_categories() {
    ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=homePageCategory','GET', 'JSON')
    .then(function(data) {
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
                            <img src="${data[row].img_cat}" alt="${data[row].name_cat}">
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

function carousel_categories_favs() {
    ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=homePageCategoryPOPU','GET', 'JSON')
    .then(function(data) {
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
                            <img src="${data[row].img_cat}" alt="${data[row].name_cat}">
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

function carousel_brands() {
    ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=homePageBrands','GET', 'JSON')
    .then(function(data) {
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
                            <img src="${data[row].img_bra}" alt="${data[row].name_brand}" class="brand-image">
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

function carousel_MostVisited() {
    ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=popular_prods', 'GET', 'JSON')
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
                                    <img src="${img}" alt="${data[row].name_prod}" class="product-image">
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

function carousel_MostRating() {
    ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=rating_prods', 'GET', 'JSON')
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
                                    <img src="${img}" alt="${data[row].name_prod}" class="product-image">
                                </div>
                            `).join('')}
                        </div>
                        <div class="product-badge">Más Popular</div>
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

function clicks(){
    $(document).on("click",'div.item_carrousel', function (){

        localStorage.removeItem('filter_shop');
        localStorage.removeItem('name_typ');

        var filters_typ = [];
        filters_typ.push(['name_typ', this.getAttribute('id')]);

        var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || [];
        filter_shop = filter_shop.filter(filter => filter[0] !== 'name_typ');
        filter_shop.push(['name_typ', this.getAttribute('id')]);
        localStorage.setItem('filter_shop', JSON.stringify(filter_shop));

        setTimeout(function(){ 
            window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 1000);  
    }); 

    $(document).on("click", 'div.city-card', function() {

        localStorage.removeItem('filter_shop');
        localStorage.removeItem('name_cities');

        var filter_maps = [];
        filter_maps.push(['name_cities', this.getAttribute('id')]); 
        
        var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || [];
        filter_shop = filter_shop.filter(filter => filter[0] !== 'name_cities');
        filter_shop.push(['name_cities', this.getAttribute('id')]);
        localStorage.setItem('filter_shop', JSON.stringify(filter_shop));

        setTimeout(function() {
            window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 300);
    });

    $(document).on("click", 'div.categories-card', function() {

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
            window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 300);
    });

    $(document).on("click", 'div.brand-card', function() {

        localStorage.removeItem('filter_shop');
        localStorage.removeItem('name_brand');

        var filter_maps = [];
        filter_maps.push(['name_brand', this.getAttribute('id')]); 
        
        var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || [];
        filter_shop = filter_shop.filter(filter => filter[0] !== 'name_brand');
        filter_shop.push(['name_brand', this.getAttribute('id')]);
        localStorage.setItem('filter_shop', JSON.stringify(filter_shop));

        setTimeout(function() {
            window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 300);
    });

    $(document).on("click", 'div.more_related_card', function() {
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('id_prod');
    
        var idProd = this.getAttribute('id');
        localStorage.setItem('id_prod', idProd);
    
        setTimeout(function() {
            window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 300);
    });

    $(document).on("click", 'div.more_popu_card', function() {
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('id_prod');
    
        var idProd = this.getAttribute('id');
        localStorage.setItem('id_prod', idProd);
    
        setTimeout(function() {
            window.location.href = 'index.php?page=ctrl_shop&op=list';
        }, 300);
    });
}

$(document).ready(function() {
    carousel_Types();
    // carousel_categories();
    carousel_brands();
    carousel_City();
    carousel_MostVisited();
    carousel_MostRating();
    carousel_categories_favs();
    clicks();
});



//Datacards Simples

// function loadBrands() {
//     // console.log("hola")
//     // return false;
//     ajaxPromise('/programas/courses_home/module/home/controller/ctrl_home.php?op=homePageBrands','GET', 'JSON')
//     .then(function(data) {
//         for (row in data) {
//             $('<div></div>').attr('class', "div_cate").attr({ 'id': data[row].id_brands }).appendTo('#containerBrands')
//                 .html(
//                     "<li class='portfolio-item'>" +
//                     "<div class='item-main'>" +
//                     "<div class='portfolio-image'>" +
//                     "<img src = " + data[row].img_bra + " alt='foto' </img> " +
//                     "</div>" +
//                     "<h5>" + data[row].name_brand + "</h5>" +
//                     "</div>" +
//                     "</li>"
//                 )
//         }
//     })
// }