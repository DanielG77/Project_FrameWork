// function launch_search() {
//     load_type_game();
//     load_brand();
//     $('#type_game').on('change', function() {
//         let data = $(this).val(); 
//         if (data === 0) {
//             load_brand();
//         } else {
//             load_brand({ data });
//         }
//     });
// }

// function load_type_game() {
//     ajaxPromise('module/seach/controller/ctrl_search.php?op=type_game', 'POST', 'JSON')
//         .then(function(data) {
//             $('#type_game').append('<option selected="selected" value = "0" disabled>Type Game</option>');
//             for (row in data) {
//                 $('#type_game').append('<option value = "' + data[row].name_typ + '">' + data[row].name_typ + '</option>');
//             }
//         }).catch(function() {
//             console.log("Fail load type_game");
//         });
// }

// function load_brand(data) {
//     // console.log("Esto son search brand");
//     if (data == undefined) {
//         ajaxPromise('module/seach/controller/ctrl_search.php?op=brand_game', 'POST', 'JSON')
//             .then(function(data) {
//                 $('#brand_game').empty();
//                 $('#brand_game').append('<option selected="selected" value = "0" disabled>Brands</option>');
//                 for (row in data) {
//                     $('#brand_game').append('<option value = "' + data[row].name_brand + '">' + data[row].name_brand + '</option>');
//                 }
//             })
//     } else {
//         ajaxPromise('module/seach/controller/ctrl_search.php?op=brand_category', 'POST', 'JSON', data)
//             .then(function(data) {
//                 // console.log(data);
//                 $('#brand_game').empty();
//                 $('#brand_game').append('<option value = "0">Brands</option>');
//                 for (row in data) {
//                     $('#brand_game').append('<option value = "' + data[row].name_brand + '">' + data[row].name_brand + '</option>');
//                 }
//             })
//     }
// }

// function autocomplete() {
//     $("#autocom").on("keyup", function() {
//         let sdata = { complete: $(this).val() };
//         if ($('#type_game').val() != 0) {
//             sdata.type_game = $('#type_game').val();
//             if ($('#brand_game').val() != 0) {
//                 sdata.brand_game = $('#brand_game').val();
//             }
//         } else if ($('#brand_game').val() != 0) {
//             sdata.brand_game = $('#brand_game').val();
//         }
//         ajaxPromise('module/seach/controller/ctrl_search.php?op=autocomplete', 'POST', 'JSON', sdata)
//             .then(function(data) {
//                 $('#search_game').empty();
//                 $('#search_game').stop(true, true).fadeIn();
//                 for (let row in data) {
//                     $('<div></div>').appendTo('#search_game').html(data[row].name_cities).attr({ 'class': 'searchElement', 'id': data[row].name_cities });
//                 }
//                 $(document).on('click', '.searchElement', function() {
//                     $('#autocom').val(this.getAttribute('id'));
//                     $('#search_game').stop(true, true).fadeOut();
//                 });
//                 $(document).on('click scroll', function(event) {
//                     if (event.target.id !== 'autocom') {
//                         $('#search_game').stop(true, true).fadeOut();
//                     }
//                 });
//             }).catch(function(error) {
//                 console.error("Fail autocomplete:", error);
//                 $('#search_game').stop(true, true).fadeOut();
//             });
//     });
// }

function btn_search() {
    $('#search-btn').on('click', function() {
        console.log("hola");
    //     var filters_shop = [];

    //     if ($('#autocom').val() != "") {
    //         filters_shop.push(['name_typ', $('#type_game').val()]);
    //         filters_shop.push(['name_brand', $('#brand_game').val()]);
    //         filters_shop.push(['name_cities', $('#autocom').val()]);
    //     }else{
    //         filters_shop.push(['name_typ', $('#type_game').val()]);
    //         filters_shop.push(['name_brand', $('#brand_game').val()]);
    //     }

    //     localStorage.removeItem('filter_shop');
    //     localStorage.removeItem('name_cities');
    //     localStorage.removeItem('name_typ');
    //     localStorage.removeItem('name_brand');
    //     // localStorage.removeItem('order');

    //     localStorage.setItem('filter_shop', JSON.stringify(filters_shop));
    //     setTimeout(function(){ 
    //         window.location.href = 'index.php?page=ctrl_shop&op=list';
    //     }, 1000);      
    });
}

$(document).ready(function() {
    // launch_search();
    // autocomplete();
    btn_search();
});