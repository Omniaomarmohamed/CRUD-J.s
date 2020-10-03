
var productNameInput = document.getElementById("productNameInput");//Input klo
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");
var cont = document.getElementById("cont");
var butn = document.getElementById("butn");

cont.addEventListener ("click" ,  changeColor );

function changeColor()
{
    var r = Math.round (Math.random()*255 );
    var g = Math.round (Math.random()*255 );
    var b = Math.round (Math.random()*255 );

    cont.style.backgroundColor = `rgb( ${r} , ${g} , ${b} )`;

}

var productList;

 if(localStorage.getItem("ourProducts") == null)//client gdid//maloo4 7aga
 {
    productList = [];
 }
else//leh data mawgoda abl kdaaa
{
    productList = JSON.parse( localStorage.getItem("ourProducts"));
    displayProducts(productList);
}

//2M
butn.addEventListener ("click" , addProduct);

function addProduct() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    productList.push(product);//1
    localStorage.setItem("ourProducts" , JSON.stringify( productList) );
    displayProducts(productList);
    clearForm();
}

function clearForm( ) 
{
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescInput.value = "";
    productCategoryInput.value = "";

}
function displayProducts(anyArray) 
{
    var omnia = "";
    for (var i = 0; i < anyArray.length; i++)//2
    {
        omnia += `<tr>
                                <td>${i}</td>
                                <td>${anyArray[i].name}</td>
                                <td>${anyArray[i].price}</td>
                                <td>${anyArray[i].category}</td>
                                <td>${anyArray[i].desc}</td>
                                <td><button class="btn btn-warning">update</button></td>
                                <td><button onclick="deleteProduct(${i})"  class="btn btn-danger">delete</button></td>
                    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = omnia;
}



function deleteProduct(index) {

    productList.splice( index, 1);
    localStorage.setItem("ourProducts" , JSON.stringify( productList) );
    displayProducts(productList);
  }


var searchInput = document.getElementById("searchInput");

 function searchProducts() 
 {
    var searchTerm = searchInput.value;
    var wantedProducts = [];
    for(var i=0 ; i < productList.length ; i++)
    {
        if(productList[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            wantedProducts.push(productList[i]);
        }
    }
    displayProducts(wantedProducts);
 }

function validatProductNme (productName)
{
    var regex = /^[A-Z][a-z]{2,8}$/; 

    if (regex.test(productName) == true)
    {
        productNameAlert.classList.replace("d-block" , "d-none");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
    }
    else 
    {
        productNameAlert.classList.replace("d-none" , "d-block");
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
    }

}
productNameInput.addEventListener("keyup" , function(){
    validatProductNme(productNameInput.value);
})

function validatProductPrice (productPrice)
{
 var regex = /(^[1-9][0-9][0-9]|[1-9][0-9]{3}|10000)$/ ;
 if (regex.test(productPrice) == true) 
  {
      productPriceAlert.classList.replace("d-block" , "d-none");
      productPriceInput.classList.add("is-valid");
      productPriceInput.classList.remove("is-invalid");
  }
  else{
    productPriceAlert .classList.replace("d-none" ,"d-block" );
      productPriceInput.classList.add("is-invalid");
      productPriceInput.classList.remove("is-valid");
      
  }
}
productPriceInput.addEventListener("keyup" , function(){
    validatProductPrice(productPriceInput.value);
})




