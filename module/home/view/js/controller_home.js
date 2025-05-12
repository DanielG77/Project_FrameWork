function carrusel(){
    thing = IMG_BRAND;
    console.log(thing);
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

// function category() {
//   ajaxPromise(friendlyURL("?module=home&op=category"), 'GET', 'JSON')
//   .then(function( data ) {
//       for (row in data) {
//         content = data[row].category_name.replace(/_/g, " ");
//         $('<div></div>').attr('class', "category_elements").attr('id', data[row].category_name).appendTo("#cat").html(
//           "<div class='col-4 col-12-medium'>"+
//             "<section class='box feature'>"+
//               "<img src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/" + data[row].category_img + "' id='"+ data[row].cod_category +"'/>"+
//               "<div class='inner'>"+        
//                 "<h2 class='category_title'>"+ content +"</h2>"+
//               "</div>"+
//             "</section>"+
//           "</div>"
//         )
//       }
//   })
//   .catch(function() {
//     console.log('Error: Categories error');
//   });    
// }

// function types() {
//     ajaxPromise(friendlyURL("?module=home&op=type"), 'GET', 'JSON')
//     .then(function( data ) {
//       for (row in data) {
//           $('<div></div>').attr('class', "card").attr('id', data[row].type_name).appendTo(".container_cards").html(
//             "<div class='face face1'>"+
//               "<div class='content'>"+
//                 "<img src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/" + data[row].type_img +"'>"+
//               "</div>"+
//             "</div>"+
//             "<div class='face face2'>"+
//               "<div class='content'>"+
//                 "<h2>"+ data[row].type_name +"</h2>"+
//               "</div>"+ 
//             "</div>" 
//           )
//       }
//     })
//     .catch(function() {
//       console.log('Error: Types error');
//     });
// }

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

// function load_suggestions() {
//   var limit = 3;

//   $(document).on("click", '#load_more_button', function () {
//     $('#news_container').empty();
//     limit = limit + 3;

//     $.ajax({
//       type: 'GET',
//       dataType: "json",
//       url: "https://www.googleapis.com/books/v1/volumes?q=electric%20car",
//     }).done(function (data) {
//       var DatosJson = JSON.parse(JSON.stringify(data));
//       for (i = 0; i < limit; i++) {
//         var ElementDiv = document.createElement('div');
//         ElementDiv.innerHTML =
//             "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories'] + "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><hr><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div></hr>";
//         document.getElementById("news_container").appendChild(ElementDiv);
//       }
//       if (limit === 9) {
//         $('.load_more_button').remove();
//       }
//     });
//   })
// }

// function get_suggestions() {
//   limit = 3;

//   $.ajax({
//     type: 'GET',
//     dataType: "json",
//     url: "https://www.googleapis.com/books/v1/volumes?q=electric%20car",
//   }).done(function (data) {
//     var DatosJson = JSON.parse(JSON.stringify(data));
//     DatosJson.items.length = limit;
//     for (i = 0; i < DatosJson.items.length; i++) {
//         var ElementDiv = document.createElement('div');
//         ElementDiv.innerHTML =
//             "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories'] + "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><hr><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div></hr>";
//         document.getElementById("news_container").appendChild(ElementDiv);
//     }
//   });
//   load_suggestions();
// }


$(document).ready(function() {
  // types();
  // category();
  carrusel();
  // get_suggestions();
  // clicks();
});