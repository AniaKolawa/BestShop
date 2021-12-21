const formInput = document.querySelectorAll(".form__input");
const listItem = document.querySelectorAll(".list__item");
const productsInput = document.querySelector("#products");
const productsSummary = document.querySelector("[data-id=products]");
const ordersInput = document.querySelector("#orders");
const ordersSummary = document.querySelector("[data-id=orders]");
const total = document.querySelector("#total-price");
let totalPrice = 0;

function updateTotalPrice() {
    let itemPrices = document.querySelectorAll(".item__price");
    let totalPrice = 0;
    itemPrices.forEach(function(itemPrice){
        itemPrice = itemPrice.innerText;
        itemPrice = Number(itemPrice.replace("$", ""));
        totalPrice = Number(totalPrice) + itemPrice;
        totalPrice = totalPrice.toFixed(2);
    });
    console.log(totalPrice);
    document.querySelector(".total__price").innerText = "$" + totalPrice;

    if (totalPrice > 0) {
        total.style.display = "flex";
    }
    else total.style.display = "none";
}

function updateInputPrice(input, summary, multiplier) {
    ['change','keydown','keyup'].forEach( function(evt) {
        input.addEventListener(evt, function (event){
            summary.style.display = "flex";
            summary.children[1].innerText = input.value + " * $" + multiplier;
            let result = input.value * multiplier;
            result = result.toFixed(2);
            if (result < 0) result = 0;
            summary.children[2].innerText = "$" + result;
            updateTotalPrice();
        });
    });
}

updateInputPrice(productsInput, productsSummary, 0.5);
updateInputPrice(ordersInput, ordersSummary, 0.7);


//------------------------------------------------------------------

const package = document.querySelector("#package");
const packageSummary = document.querySelector("[data-id=package]");
const calcSelect = document.querySelector(".calc__select");
const selectDropdown = document.querySelectorAll(".select__dropdown li");
const selectInput = document.querySelector(".select__input");

package.addEventListener("click", function (event){
    calcSelect.classList.toggle("open");
});

selectDropdown.forEach(function (el, index){
    el.addEventListener("click", function (event){

        selectInput.innerText = selectDropdown[index].innerText;
        packageSummary.style.display = "flex";
        packageSummary.children[1].innerText = selectDropdown[index].innerText;
        packageSummary.children[2].innerText = "$" + selectDropdown[index].getAttribute("data-price")

        updateTotalPrice();
    })
})

//----------------------------------------------------------------------
const accountingCheckbox = document.querySelector("#accounting");
const accountingSummary = document.querySelector("[data-id=accounting]");
const terminalCheckbox = document.querySelector("#terminal");
const terminalSummary = document.querySelector("[data-id=terminal]");

function updateCheckboxPrice(input, summary) {
    input.addEventListener("click", function (event){
        if (input.checked === true){
            summary.style.display = "flex";
            summary.querySelector(".item__price").innerText = "$" + input.getAttribute("data-price");
        } else {
            summary.style.display = "none";
            summary.querySelector(".item__price").innerText = "$0";
        }
        updateTotalPrice();
    })
}

updateCheckboxPrice(accountingCheckbox, accountingSummary);
updateCheckboxPrice(terminalCheckbox, terminalSummary);


//-------------------------------------------------------------------------



