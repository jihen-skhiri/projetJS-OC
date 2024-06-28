 
const token = localStorage.getItem("token");
const btnUpdate = document.querySelector(".update");
const reponse = await fetch('http://localhost:5678/api/works')
const projects = await reponse.json();
let modal = null;
let modalAdd = null;
if (localStorage.getItem("token")) {
    btnUpdate.setAttribute('style', 'display:null');
}


btnUpdate.addEventListener('click', openModal)

function openModal(e){
    e.preventDefault();
    const target = document.getElementById("modal1");
    modalProjet();
    target.setAttribute('style', 'display:null');
    modal = target;
    modal.addEventListener('click',closeModal);
    modal.querySelector(".closeBtn").addEventListener('click',closeModal)
    modal.querySelector(".stop-modal").addEventListener('click',stopPropagation)
    
    
}

function closeModal(e) {
    if(modal === null) return
    e.preventDefault();
    modal.setAttribute('style', 'display:none');
    modal.removeEventListener('click',closeModal)
    modal.querySelector(".closeBtn").removeEventListener('click',closeModal)
    modal.querySelector(".stop-modal").removeEventListener('click',stopPropagation)
    modal = null;
}
function stopPropagation (e){
e.stopPropagation()
}

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
        closeModalAdd(e);
        }
});
let dataAdmin;
const modaleSectionProjets = document.querySelector(".modal-photo"); 
function resetmodaleSectionProjets() {  
	modaleSectionProjets.innerHTML = "";
}
async function modalProjet(){
    const response = await fetch('http://localhost:5678/api/works'); 
    dataAdmin = await response.json();
    resetmodaleSectionProjets()
    for (let i = 0; i < dataAdmin.length; i++) {
        const div = document.createElement("div");
        div.classList.add("gallery-modal");
        modaleSectionProjets.appendChild(div);
        const img = document.createElement("img");
        img.src = dataAdmin[i].imageUrl;
        img.alt = dataAdmin[i].title;
        div.appendChild(img);
        const p = document.createElement("p");
        div.appendChild(p);
        p.classList.add(dataAdmin[i].id, "delete-work");
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can"); 
        p.appendChild(icon);   
    }
    deleteWork()
}

function deleteWork() {
    let btnDelete = document.querySelectorAll(".delete-work");
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", deleteProjets);
    }}
    async function deleteProjets() {
        await fetch(`http://localhost:5678/api/works/${this.classList[0]}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`},
        })
    
        .then (response => {
            if (response.status === 204) {
                refreshPage(this.classList[0])
            }
            else if (response.status === 401) {
                alert("Vous n'êtes pas autorisé à supprimer ce projet, merci de vous connecter avec un compte valide")
                window.location.href = "login.html";
            }
        })
        .catch (error => {
            console.log(error)
        })
    }
    
    // Rafraichit les projets sans recharger la page
    async function refreshPage(i){
        
        modalProjet(); // Re lance une génération des projets dans la modale admin
    
        // supprime le projet de la page d'accueil
        const projet = document.querySelector(`.id-projet-${i}`);
        projet.style.display = "none";
    }
    
/***********Modal Ajout Photo*************/

const btnAdd = document.querySelector(".addPhoto");
btnAdd.addEventListener('click', openModal2);

function openModal2(e){
    e.preventDefault();
    const target = document.getElementById("modal2");
    target.setAttribute('style', 'display:null');
    modalAdd = target;
    modalAdd.addEventListener('click',closeModalAdd);
    modalAdd.querySelector(".closeBtn").addEventListener('click',closeModalAdd)
    modalAdd.querySelector(".backBtn").addEventListener('click', backModal)
    modalAdd.querySelector(".stop-modal").addEventListener('click',stopPropagation)
      
}
function closeModalAdd(e) {
    if(modalAdd === null) return
    e.preventDefault();
    modalAdd.setAttribute('style', 'display:none');
    modalAdd.removeEventListener('click',closeModalAdd)
    modalAdd.querySelector(".closeBtn").removeEventListener('click',closeModalAdd)
    modalAdd.querySelector(".stop-modal").removeEventListener('click',stopPropagation)
    modalAdd.querySelector(".backBtn").removeEventListener('click', backModal)
    modalAdd = null;
    resetForm();
}
function backModal(e){
    e.preventDefault()
    modalAdd.setAttribute('style', 'display:none');
    modalAdd = null
    modalProjet(dataAdmin);
    resetForm()
}
/************ Add New Project ************/
const btnConfirmAdd = document.querySelector(".confirmAdd");
btnConfirmAdd.addEventListener('click',addProject);
ModalForm()
async function ModalForm(){
    const modalForm = document.querySelector(".modal-form")
    const form = document.createElement('form')
      form.id = 'FormAdd';
      form.enctype = 'multipart/form-data';
      const divImg = document.createElement("div")
      divImg.classList.add("js-image")
      const imageIcon = document.createElement("i")
      imageIcon.classList.add("fa-regular","fa-image")
      const imgPreview = document.createElement("img") 
      imgPreview.id= 'image-preview'
      imgPreview.setAttribute('style', 'display:none');
      divImg.appendChild(imgPreview)
      const label = document.createElement("label")
      label.textContent ="+ Ajouter une photo"
      label.classList.add("img-label")
      const inputImage = document.createElement("input")
      inputImage.type = 'file';
      inputImage.id = 'photoUpload';
      inputImage.name = 'photoUpload';
      inputImage.accept = 'image/*';
      inputImage.required = true;
      divImg.appendChild(imageIcon)
      divImg.appendChild(label)
      divImg.appendChild(inputImage)
      form.appendChild(divImg)
      const divTitle = document.createElement('div')
      divTitle.classList.add("titlePhoto")
      const titleLabel = document.createElement('label')
      titleLabel.textContent="Titre"
      titleLabel.setAttribute('for', 'titre');
      const title = document.createElement('input')
      title.type = 'text'
      title.id = 'titre'
      title.name ="titre"
      title.required = true
      const divCat = document.createElement('div')
      divCat.classList.add("catPhoto")
      const categoryLabel = document.createElement('label')
      categoryLabel.textContent="Catégorie"
      categoryLabel.setAttribute('for', 'categorie');
      const category = document.createElement('select')
      category.id = 'categorie'
      category.name ="categorie"
      const optionDefault = document.createElement('option')
      optionDefault.textContent =""
      optionDefault.value="0"
      category.appendChild(optionDefault)
      const option1 = document.createElement('option')
      option1.textContent ="Objets"
      option1.value="1"
      category.appendChild(option1)
      const option2 = document.createElement('option')
      option2.textContent ="Appartements"
      option2.value ="2"
      category.appendChild(option2)
      const option3 = document.createElement('option')
      option3.textContent = "Hôtels & restaurants"
      option3.value ="3"
      category.appendChild(option3)
      divTitle.appendChild(titleLabel)
      divTitle.appendChild(title)
      divCat.appendChild(categoryLabel)
      divCat.appendChild(category)
      form.appendChild(divTitle)
      form.appendChild(divCat)
      modalForm.appendChild(form)
    console.log(modalForm)
}

async function addProject(event){
    event.preventDefault();
    const image = document.getElementById('photoUpload').files[0];
    const title = document.getElementById("titre").value;
    const categoryId = document.getElementById("categorie").value;
    if (title === "" || categoryId === "" || image === undefined) {
        alert("Merci de remplir tous les champs");
        return;
    } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        alert("Merci de choisir une catégorie valide");
        return;
        } else {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("category", categoryId);
       

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 201) {
            alert("Projet ajouté avec succès :)");
            modalProjet(dataAdmin);
            backModal(event);
           
        } else if (response.status === 400) {
            alert("Merci de remplir tous les champs");
        } else if (response.status === 500) {
            alert("Erreur serveur");
        } else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à ajouter un projet");
            window.location.href = "login.html";
    }}

    catch (error) {
        console.log(error);
}}
}
document.getElementById('photoUpload').addEventListener('change', function(event) {
    const image = event.target.files[0];
    if (image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('image-preview').src = e.target.result;
            document.getElementById('image-preview').setAttribute('style', 'display:null');
            document.querySelector('.img-label').setAttribute('style', 'display:none');
            document.querySelector('.fa-image').setAttribute('style', 'display:none');
        }
        reader.readAsDataURL(image);
    }
});
document.querySelector('.img-label').addEventListener('click', function() {
    document.getElementById('photoUpload').click();
    
});

function resetForm() {
    document.getElementById('FormAdd').reset();
    document.getElementById('image-preview').src = '';
    document.getElementById('image-preview').setAttribute('style', 'display:none');
    document.querySelector('.img-label').setAttribute('style', 'display:null');
    document.querySelector('.fa-image').setAttribute('style', 'display:null');
}