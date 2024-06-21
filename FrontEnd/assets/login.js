const msgError = document.getElementById("msgError"); 
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");



loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(localStorage.getItem("token")){
        logoutUser();
    }
    else {
    let user = {
        email: email.value,
        password: password.value
    };
    
    loginUser(user);
} 
})

function loginUser (userId){

    msgError.innerHTML="";

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId)
    }).then((response) => {
            if (response.status !== 200) {
                msgError.innerHTML="Erreur dans l’identifiant ou le mot de passe";
              } else {
                response.json().then((data) => {
                    
                  localStorage.setItem("token", data.token);
                 //STORE TOKEN
              
                  window.location.href= "index.html";
                  //window.location.replace("index.html");
                  
                });
              }
            });
           

    
}

function logoutUser() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        msgError.innerHTML = "<br><br><br>Vous avez été déconnecté, veuillez vous reconnecter";  
        return;
    }
}