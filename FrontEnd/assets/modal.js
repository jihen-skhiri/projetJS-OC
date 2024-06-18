 
const token = localStorage.getItem("token");
const btnUpdate = document.querySelector(".update");
const reponse = await fetch('http://localhost:5678/api/works')
const projects = await reponse.json();
let modal = null;
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
    //if(modal === null) return
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
        closeModal(e)
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
        console.log(this.classList[0])
        console.log(token)
    
        await fetch(`http://localhost:5678/api/works/${this.classList[0]}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`},
        })
    
        .then (response => {
            // Token good
            if (response.status !== 204) {
                refreshPage(this.classList[0])
            }
            // Token inorrect
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
    
