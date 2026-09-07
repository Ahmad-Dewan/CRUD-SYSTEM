let productName = document.getElementById('productName')
console.log(productName)
let productPrice = document.getElementById('productPrice')
console.log(productPrice)
let productCat = document.getElementById('productCat')
console.log(productCat)
let productDesc = document.getElementById('productDesc')
console.log(productDesc)
let productContainer;
let currentIndex;
let button = document.querySelector('button')
if (localStorage.getItem('productData') != null) {
    productContainer = JSON.parse(localStorage.getItem('productData'));
    displayProduct()
}
else {
    productContainer = [];
}

function addProduct() {
    if (button.innerHTML == 'Update Product') {
        updateProduct()
    }

    else {
        add()
    }
}

function add() {

    let productInfo =
    {
        name: productName.value,
        price: productPrice.value,
        cat: productCat.value,
        desc: productDesc.value
    }
    console.log(productInfo)
    productContainer.push(productInfo)
    console.log(productContainer)
    localStorage.setItem('productData', JSON.stringify(productContainer))
    clearForm()
    displayProduct()
}

function clearForm() {
    productName.value = ''
    productPrice.value = ''
    productCat.value = ''
    productDesc.value = ''
}

function displayProduct() {
    let data = ''
    for (let i = 0; i < productContainer.length; i++) {
        data += `
            <tr>
               <td>${i}</td>
               <td>${productContainer[i].name}</td>
               <td>${productContainer[i].price}</td>
               <td>${productContainer[i].cat}</td>
               <td>${productContainer[i].desc}</td>
                <td><button class="btn btn-outline-warning" onclick="setData(${i})">Update</button></td>
                <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})" >Delete</button></td>
            </tr>  
        `
    }
    document.getElementById('rowData').innerHTML = data
}

function deleteProduct(index) {
    productContainer.splice(index, 1)
    localStorage.setItem('productData', JSON.stringify(productContainer))
    displayProduct()
}


function setData(index) {
    currentIndex = index;
    productName.value = productContainer[index].name
    productPrice.value = productContainer[index].price
    productCat.value = productContainer[index].cat
    productDesc.value = productContainer[index].desc
    button.innerHTML = 'Update Product'
}


function updateProduct() {
    productContainer[currentIndex].name = productName.value
    productContainer[currentIndex].price = productPrice.value
    productContainer[currentIndex].cat = productCat.value
    productContainer[currentIndex].desc = productDesc.value
    button.innerHTML = 'Add Product'
    localStorage.setItem('productData', JSON.stringify(productContainer))
    displayProduct()
    clearForm()
}


function searchProduct(trim) {
    let data = ''
    for (let i = 0; i < productContainer.length; i++)
   {
        if (productContainer[i].name.toLowerCase().includes(trim.toLowerCase()) ||  productContainer[i].price.includes(trim)) 
        {
            data += `
            <tr>
               <td>${i}</td>
               <td>${productContainer[i].name}</td>
               <td>${productContainer[i].price}</td>
               <td>${productContainer[i].cat}</td>
               <td>${productContainer[i].desc}</td>
                <td><button class="btn btn-outline-warning" onclick="setData(${i})">Update</button></td>
                <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})" >Delete</button></td>
            </tr>  
        `
        }

    }
    document.getElementById('rowData').innerHTML = data
}