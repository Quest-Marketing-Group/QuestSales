/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
//$('.product-quantity input').change( function() {
//updateQuantity(this);
//});

$(document).on('click', '.update-quantity-product', function(e){

    var vals =  $('input').val();
    // alert(vals);
    updateQuantity(vals, $('input'));
})

$('.remove-product-btn').click( function() {
    removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if(total == 0){
            $('.checkout').fadeOut(fadeTime);
        }else{
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(qty, quantityInput)
{
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function() {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}

function calc(n) {
    var price = document.getElementsByClassName("item_price")[n].innerHTML;
    var noTickets = document.getElementsByClassName("num")[n].value;
    var total = parseFloat(price) * noTickets;
    if (!isNaN(total))
        document.getElementsByClassName("product-total")[n].innerHTML = total;
}


/* Remove item from cart */
function removeItem(removeButton)
{
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}


// /* Set rates + misc */
// var taxRate = 0.05;
// var shippingRate = 15.00;
// var fadeTime = 300;


// /* Assign actions */
// $('.product-quantity input').change( function() {
// updateQuantity(this);
// });

// $(document).on('click', '.update-quantity-product', function(e) {

//     var vals =  $('input').val();
//     console.log(vals);
//     //alert(vals);
//     updateQuantity(vals, $('input'));
// })

// $('.remove-product-btn').click( function() {
//     removeItem(this);
// });


// /* Recalculate cart */
// function recalculateCart()
// {
//     var subtotal = 0;

//     /* Sum up row totals */
//     $('.product').each(function () {
//         subtotal += parseFloat($(this).children('.product-line-price').text());
//     });

//     /* Calculate totals */
//     var tax = subtotal * taxRate;
//     var shipping = (subtotal > 0 ? shippingRate : 0);
//     var total = subtotal + tax + shipping;

//     /* Update totals display */
//     $('.totals-value').fadeOut(fadeTime, function() {
//         $('#cart-subtotal').html(subtotal.toFixed(2));
//         $('#cart-tax').html(tax.toFixed(2));
//         $('#cart-shipping').html(shipping.toFixed(2));
//         $('#cart-total').html(total.toFixed(2));
//         if(total == 0){
//             $('.checkout').fadeOut(fadeTime);
//         }else{
//             $('.checkout').fadeIn(fadeTime);
//         }
//         $('.totals-value').fadeIn(fadeTime);
//     });
// }


// /* Update quantity */
// function updateQuantity(qty, quantityInput)
// {
//     /* Calculate line price */
//     var productRow = $(quantityInput).parent().parent();
//     var price = parseFloat(productRow.children('.product-price').text());
//     var quantity = $(quantityInput).val();
//     var linePrice = price * quantity;
//     console.log(linePrice);

//     /* Update line price display and recalc cart totals */
//     productRow.children('.product-line-price').each(function () {
//         $(this).fadeOut(fadeTime, function() {
//             $(this).text(linePrice.toFixed(2));
//             recalculateCart();
//             $(this).fadeIn(fadeTime);
//         });
//     });
// }


// /* Remove item from cart */
// function removeItem(removeButton)
// {
//     /* Remove row from DOM and recalc cart total */
//     var productRow = $(removeButton).parent().parent();
//     productRow.slideUp(fadeTime, function() {
//         productRow.remove();
//         recalculateCart();
//     });
// }