
const reponse = await fetch('http://localhost:5678/api/works')
const projects = await reponse.json();
const reponseCategorie = await fetch('http://localhost:5678/api/categories')
const categories = await reponseCategorie.json();
/************Create Gallery************ */
function AfficheGallery(projects){ 
for(let i=0; i<projects.length; i++) {
    const sectionProjets = document.querySelector(".gallery")
    const figure = document.createElement("figure"); 
    const image = document.createElement("img");
    image.src = projects[i].imageUrl;
    image.alt =projects[i].title;
    figure.dataset.category = projects[i].category.name;
    figure.appendChild(image);
    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = projects[i].title;
    figure.appendChild(figcaption);
    figure.classList.add(`id-projet-${projects[i].id}`); 
    sectionProjets.appendChild(figure);
}
}
AfficheGallery(projects)


/*********Create Filter&Buttons******* */
const filter = document.querySelector(".filter");


 function ListCategory (){
 for(let i=0 ; i<categories.length; i++){  
    const buttonFilter = document.createElement("button")
    buttonFilter.innerText= categories[i].name
    buttonFilter.classList.add("Button-filter")
    buttonFilter.dataset.category = categories[i].name;
    filter.appendChild(buttonFilter);
 }  
}
InitialButton ()
ListCategory ()
 function InitialButton (){
    const buttonAll = document.createElement("button")
    buttonAll.innerText= "Tous"
    buttonAll.classList.add("Button-filter")
    buttonAll.dataset.category = "Tous";
    filter.appendChild(buttonAll);
}

function FilterProjects () {
    const filterButtons = document.querySelectorAll(".Button-filter");
    filterButtons.forEach((i) => {
      i.addEventListener("click", function () {
        FilterCategory(i.dataset.category);
      });
    });
  }
  
  function FilterCategory(datasetCategory) {
    const figures = document.querySelectorAll("figure");
    if ("Tous" === datasetCategory) {
      figures.forEach((figure) => {
        figure.style.display = "block";
      });
    } else {
      figures.forEach((figure) => {
        figure.dataset.category === datasetCategory ? (figure.style.display = "block") : (figure.style.display = "none");
      });
    }
  }
  
  
  FilterProjects ()
