/* LOGIN */
function login() {
    const p = document.getElementById("password").value;

    if (p === "2020") {
        localStorage.setItem("admin", "true");
        location.href = "admin.html";
    } else {
        alert("Şifre yanlış!");
    }
}

function logout() {
    localStorage.removeItem("admin");
    location.href = "admin-login.html";
}

/* ADMİN DEĞİLSE PANELİ AÇTIRMA */
if (location.pathname.includes("admin.html")) {
    if (!localStorage.getItem("admin")) {
        location.href = "admin-login.html";
    }
}

/* SAYFA GEÇİŞİ */
function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(page).classList.add("active");

    document.querySelectorAll(".side-item").forEach(i => i.classList.remove("active"));
    document.querySelector(`.side-item[onclick="showPage('${page}')"]`).classList.add("active");
}

/* ÜRÜN LİSTESİ YÖNETİMİ */
let productArray = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(productArray));
}

/* ÜRÜNLERİ TABLOYA BAS */
function renderAdminProducts() {
    let html = "";

    productArray.forEach((p, i) => {
        html += `
        <tr>
            <td><img src="${p.img}" width="50"></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.category}</td>
            <td>${p.stock}</td>
            <td>
                <button onclick="editProduct(${i})">Düzenle</button>
                <button onclick="deleteProduct(${i})" style="background:red;color:white;">Sil</button>
            </td>
        </tr>`;
    });

    document.getElementById("productList").innerHTML = html;
}

/* MODAL AÇ/KAPAT */
let editIndex = -1;

function openProductModal() {
    editIndex = -1;
    document.getElementById("modal-title").innerText = "Yeni Ürün";

    document.getElementById("pName").value = "";
    document.getElementById("pPrice").value = "";
    document.getElementById("pCategory").value = "";
    document.getElementById("pStock").value = "";
    document.getElementById("pImg").value = "";

    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function editProduct(i) {
    editIndex = i;
    const p = productArray[i];

    document.getElementById("modal-title").innerText = "Ürünü Düzenle";

    document.getElementById("pName").value = p.name;
    document.getElementById("pPrice").value = p.price;
    document.getElementById("pCategory").value = p.category;
    document.getElementById("pStock").value = p.stock;
    document.getElementById("pImg").value = p.img;

    document.getElementById("modal").style.display = "flex";
}

/* KAYDET */
function saveProduct() {
    const p = {
        name: document.getElementById("pName").value,
        price: document.getElementById("pPrice").value,
        category: document.getElementById("pCategory").value,
        stock: document.getElementById("pStock").value,
        img: document.getElementById("pImg").value
    };

    if (editIndex === -1) {
        productArray.push(p);
    } else {
        productArray[editIndex] = p;
    }

    saveProducts();
    renderAdminProducts();
    closeModal();
}

/* SİL */
function deleteProduct(i) {
    if (confirm("Bu ürünü silmek istediğine emin misin?"))
        productArray.splice(i, 1);

    saveProducts();
    renderAdminProducts();
}

/* PANEL AÇILINCA ÜRÜNLERİ GÖSTER */
if (location.pathname.includes("admin.html")) {
    renderAdminProducts();
}
