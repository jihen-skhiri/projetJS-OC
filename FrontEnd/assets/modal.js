const btnUpdate = document.querySelector(".update");
let modal = null;
if (localStorage.getItem("token")) {
    btnUpdate.setAttribute('style', 'display:null');
}

btnUpdate.addEventListener('click', openModal)

function openModal(e){
    e.preventDefault();
    const target = document.getElementById("modal1");
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