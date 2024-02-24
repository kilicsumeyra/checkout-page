//?1- Başlangıç Ayarları

//*1.1 Değişkenler

const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

//1.2 Sayfa Yüklendiğinde Başlatma
//sayfa ilk açıldığında çalışacak fonksiyon
window.addEventListener("load", () => {
  //sepetin toplam fiyatını hesapla
  calculateCartPrice();
  // sabit değer~leri local storage gönder
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);
});

//? 2- Ürünler Etkileşim

//*2.1 Ürünler div ini seç

const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (event) => {
  //ürünler divine tıklama olduğunda çalışacak
  const productName =
    event.target.parentElement.parentElement.querySelector("h2").innerText;
  const quantityElement = event.target.parentElement.querySelector(".quantity");
  //2.2 artı ve eksi butonuna tıklama işlevi
  console.log(event);
  if (event.target.className === "fa-solid fa-minus") {
    if (quantityElement.innerText > 1) {
      quantityElement.innerText--;
      calculateCartPrice();
      calculateProductPrice(event.target);
    } else {
      //ürün miktarı 1 ise ve kullanıcı silmeyi onaylarsa ürünü sil
      if (
        confirm(`Are you sure you want to remove ${productName} form the cart?`)
      ) {
        event.target.closest(".product").remove(); //Ürünü DOM dan kaldır
        calculateCartPrice();
      }
    }
  } else if (event.target.className === "fa-solid fa-plus") {
    quantityElement.innerText++;
    calculateProductPrice(event.target);
    calculateCartPrice();
  } else if (event.target.className == "remove-product") {
    //*2.3Ürünü kaldırma
    if (
      confirm(`Are you sure you want to remove ${productName} form the cart?`)
    ) {
      event.target.closest(".product").remove();
      calculateCartPrice();
    }
  }
});
//? 3-Hesaplama Fonksiyonlar

//* 3*1 Ürün fiyatını hesaplama

const calculateProductPrice = (btn) => {
  const productInfoDiv = btn.parentElement.parentElement;
  const price = parseFloat(
    productInfoDiv.querySelector(".product-price strong").innerText
  );
  const quantity = parseInt(
    productInfoDiv.querySelector(".quantity").innerText
  );
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);
};
//3*2 sepet toplamını hesapla

const calculateCartPrice = () => {
  const productsTotalPriceDivs = document.querySelectorAll(
    ".product-line-price"
  );
  const subTotal = [...productsTotalPriceDivs].reduce(
    (acc, price) => acc + Number(price.innerText),
    0
  );
  const taxPrice = subTotal * parseFloat(localStorage.getItem("taxRate"));
  const shippingCost =
    subTotal > 0 &&
    subTotal < parseFloat(localStorage.getItem("shippingFreePrice"))
      ? parseFloat(localStorage.getItem("shippingPrice"))
      : 0;
  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subTotal.toFixed(2);
  document.querySelector("#cart-tax").lastElementChild.innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping").lastElementChild.innerText =
    shippingCost.toFixed(2);

    document.querySelector("#cart-total").lastElementChild.innerText  =(subTotal + taxPrice + shippingCost).toFixed(2)
};
