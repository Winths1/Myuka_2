//Prendre les éléments de l'HTML
//ID de l'input
let inpText = document.getElementById('codeProduit')
//Titre du produit 
let infoP = document.getElementById('infoP');
//Image du produit
let imging = document.getElementById('imgP');
//Liste ingrédients
let listIng = document.getElementById('listIng');
//Caractéristique du produit (végétalien, huile de palme, etc)
let anaProd = document.getElementById('ingred');
//Valeurs nutritionnelles du produit
let valeurN = document.getElementById('valeurN');
//Conditionnement produits
let condiP = document.getElementById('condiP');
//Création de la partie en flex de la section 4
let sec4N = document.getElementById('sec4N');
//Labels du produit
let labelP = document.getElementById('labelP');
//Contenu lorem1
let palme = document.getElementById('lorem1')
//ID Sec 2
let sec2 = document.getElementById('Sec2')

//Fonctions de base

//Création d'un élément HTML
function createNode(element) {
    return document.createElement(element);
};
//Position des éléments HTML
function append(parent, el) {
  return parent.appendChild(el);
};

//Récupération des valeurs de l'API
// let APIurl = "https://world.openfoodfacts.org/api/v0/product/7622210449283.json";

//Création de la fonctions pour afficher le format JSON
let showProduct = (url) => {
    fetch(url).then(response => response.json()).then(data => {
        let dataP = data.product;

        //Titre Produit
        let h1 = createNode('h1');
        if(dataP.product_name && dataP.brands){
            h1.textContent = `${dataP.product_name} - ${dataP.brands}`;
        } else {
            h1.textContent = `${dataP.product_name}`
        }        
        infoP.appendChild(h1);

        //Code barre produit
        let h2Info = createNode('h2');
        h2Info.textContent = `Code-barres:  ${data.code}`
        infoP.appendChild(h2Info);

        //Descriptif produit
        //SECTION 2
        ////////////////////
        let ul1 = createNode('ul');
        infoP.appendChild(ul1);

        let li0 = createNode('li');
        dataP.generic_name_fr ? 
        li0.innerHTML = `<b>Dénomination générique:</b> ${dataP.generic_name}`
        : "Dénomination n'est pas connue.";
        ul1.appendChild(li0);

        let li1 = createNode('li');
        dataP.quantity ?
        li1.innerHTML = `<b>Quantité:</b> ${dataP.quantity}`
        : li1.innerHTML = `<b>Quantité:</b>  Quantité inconnue.`;
        ul1.appendChild(li1);

        let li2 = createNode('li');
        dataP.brands ?
        li2.innerHTML = `<b>Marques:</b> ${dataP.brands}`
        : li2.innerHTML = `<b>Marques:</b>  Marque inconnue.`;
        ul1.appendChild(li2);

        let li3 = createNode('li');
        dataP.categories ?
        li3.innerHTML = `<b>Catégories:</b> ${dataP.categories_old}` 
        : li3.innerHTML = `<b>Catégories:</b>  Catégories inconnues.`;
        ul1.appendChild(li3);

        let linkP = createNode('a');
        linkP.href = dataP.link;

        // let li4 = createNode('li');
        // if(dataP.link) {
        //     li4.innerHTML = `<b>Lien vers la page du produit sur le site officiel du fabricant:</b> ${linkP}`
        // } else if (dataP.link == undefined) {
        //     li4.innerHTML = `<b>Lien vers la page du produit sur le site officiel du fabricant:</b> Inconnu.`;
        // } else {
        //     li4.innerHTML = `<b>Lien vers la page du produit sur le site officiel du fabricant:</b> Inconnu.`;
        // }
        // ul1.appendChild(li4);

        let li5 = createNode('li');
        dataP.stores ?
        li5.innerHTML = `<b>Magasins:</b> ${dataP.stores}`
        : li5.innerHTML = `<b>Magasins:</b>  Aucun magasin connu.`;
        ul1.appendChild(li5);

        //Image Produit et Ingrédients
        //SECTION 3
        //////////////////////////////

        //Image
        let frontImg = createNode('img');
        dataP.product_name_fr ?
        frontImg.alt = `Image ${dataP.product_name}`
        : `Image ${dataP.product_name}`;
        dataP.image_front_url ?
        frontImg.src = dataP.image_front_url
        : frontImg.src = "./img/erreur404.png";
        imgP.appendChild(frontImg);

        //Liste ingrédients
        let h2sec3 = createNode('h2');
        h2sec3.textContent = 'Ingrédients :';
        listIng.appendChild(h2sec3);

        let ingreds = createNode('p');
        if (dataP.ingredients_text_fr) {
            ingreds.innerHTML = `<b>Liste des ingrédients:</b><br> ${dataP.ingredients_text}`
        } else {
            if (dataP.ingredients_text){
                ingreds.innerHTML = `<b>Liste des ingrédients:</b><br> ${dataP.ingredients_text}`
            } else {
                ingreds.innerHTML = `<b>Liste des ingrédients:</b><br> Pas d'ingrédients référencés`
            }
        }

        dataP.ingredients_text_fr ? ingreds.innerHTML = `<b>Liste des ingrédients:</b><br> ${dataP.ingredients_text}` : "?";
        listIng.appendChild(ingreds);

        //Section valeurs nutritionnelles
        //SECTION 4
        /////////////////////////////////
        let h1sec4 = createNode('h1');
        h1sec4.textContent = 'Valeurs nutritionnelles :';
        valeurN.appendChild(h1sec4);

        let div1sec4 = createNode('div');
        div1sec4.className = "tabNutri";
        valeurN.appendChild(div1sec4);

        //Création du tableau des valeurs nutritionnelles
        let tableNutri = createNode('table');
        tableNutri.id = "tableauNutritionnel";
        tableNutri.className = "tableNut";
        div1sec4.appendChild(tableNutri);


        //Entete tableau
        let captionT = createNode('caption');
        captionT.textContent = "Informations nutritionnelles";
        tableNutri.appendChild(captionT);

        let thead = createNode('thead');
        tableNutri.appendChild(thead);

        let tr1 = createNode('tr');
        tableNutri.appendChild(tr1);

        let th0 = createNode('th');
        th0.scope = "col";
        th0.textContent = "Nutrition";
        tr1.appendChild(th0);

        let th1 = createNode('th');
        th1.scope = "col";
        th1.textContent = "Pour 100g";
        tr1.appendChild(th1);

        let th2 = createNode('th');
        th2.scope = "col";
        th2.textContent = `Par portion: ${dataP.serving_size}`;
        tr1.appendChild(th2);

        //DataNutriments
        let dataN = dataP.nutriments;

        //Deuxieme ligne tableau
        let tr2 = createNode('tr');
        tableNutri.appendChild(tr2);

        let td1 = createNode('td');
        td1.textContent = "Énergie (kJ)";
        tr2.appendChild(td1);

        let td2 = createNode('td');
        dataN['energy-kj_100g'] ? td2.textContent = dataN['energy-kj_100g'] + "kj" : "?";
        tr2.appendChild(td2);

        let td3 = createNode('td');
        dataN['energy-kj_serving'] ? td3.textContent = dataN['energy-kj_serving'] +"kj" : "?";
        tr2.appendChild(td3);

        //Troisieme ligne du tableau
        let tr3 = createNode('tr');
        tableNutri.appendChild(tr3);

        let td11 = createNode('td');
        td11.textContent = "Énergie (kCal)";
        tr3.appendChild(td11);

        let td12 = createNode('td');
        dataN['energy-kcal_100g'] ? td12.textContent = dataN['energy-kcal_100g'] + "kcal" : "?";
        tr3.appendChild(td12);

        let td13 = createNode('td');
        dataN['energy-kcal_serving'] ? td13.textContent = dataN['energy-kcal_serving'] +"kcal" : "?";
        tr3.appendChild(td13);

        //Quatrieme ligne du tableau
        let tr4 = createNode('tr');
        tableNutri.appendChild(tr4);

        let td21 = createNode('td');
        td21.textContent = "Énergie" ;
        tr4.appendChild(td21);

        let td22 = createNode('td');
        if (dataN['energy-kj_100g'] && dataN['energy-kcal_100g']){
            td22.textContent = dataN['energy-kj_100g'] + "kj" + "(" + dataN['energy-kcal_100g'] + "kcal" + ")";
        } else if (dataN['energy-kj_100g'] && dataN['energy-kcal_100g']=="") {
            td22.textContent = dataN['energy-kj_100g'] + "kj" ;
        } else if (dataN['energy-kj_100g']=="" && dataN['energy-kcal_100g']) {
            td22.textContent = dataN['energy-kcal_100g'] + "kcal";
        } else {
            td22.textContent = "?";
        };
        tr4.appendChild(td22);

        let td23 = createNode('td');
        td23.className = "text";
        if (dataN['energy-kj_serving'] && dataN['energy-kcal_serving']){
            td23.textContent = dataN['energy-kj_serving'] + "kj" + "(" + dataN['energy-kcal_serving'] + "kcal" + ")";
        } else if (dataN['energy-kj_serving'] && dataN['energy-kcal_serving']=="") {
            td23.textContent = dataN['energy-kj_serving'] + "kj" ;
        } else if (dataN['energy-kj_serving']=="" && dataN['energy-kcal_serving']) {
            td23.textContent = dataN['energy-kcal_serving'] + "kcal";
        } else {
            td23.textContent = "?";
        };
        tr4.appendChild(td23);

        //Cinquieme ligne du tableau
        let tr5 = createNode('tr');
        tableNutri.appendChild(tr5);

        //Sixieme ligne du tableau
        let tr6 = createNode('tr');
        tableNutri.appendChild(tr6);

        //Septieme ligne du tableau
        let tr7 = createNode('tr');
        tableNutri.appendChild(tr7);

        //Huitieme ligne du tableau
        let tr8 = createNode('tr');
        tableNutri.appendChild(tr8);

        //Neuvieme ligne du tableau
        let tr9 = createNode('tr');
        tableNutri.appendChild(tr9);

        //Dizieme ligne du tableau
        let tr10 = createNode('tr');
        tableNutri.appendChild(tr10);

        //Onzieme ligne du tableau
        let tr11 = createNode('tr');
        tableNutri.appendChild(tr11);

        //Douzieme ligne du tableau
        let tr12 = createNode('tr');
        tableNutri.appendChild(tr12);

        //Treizieme ligne du tableau
        let tr13 = createNode('tr');
        tableNutri.appendChild(tr13);

        //Partie conditionnement de la section4
        let h2Cond = createNode('h2');
        h2Cond.textContent = "Conditionnement";
        condiP.appendChild(h2Cond);

        let h3Cond = createNode('h3');
        h3Cond.innerHTML = `<b>Instruction de recyclage et/ou informations d'emballage :</b> ${dataP.packaging_text}`;
        condiP.appendChild(h3Cond);

        // let h3Cond2 = createNode('h3');
        // h3Cond2.textContent = "Parties de l'emballage :"
        // condiP.appendChild(h3Cond2);

        // let tabCond = createNode('table');
        // condiP.appendChild(tabCond);

        // let capCond = createNode('caption');
        // capCond.textContent = "Parties de l'emballage:";
        // tabCond.appendChild(capCond);


        //Création de la partie label
        //Création du premier label
        let divlab1 = createNode('div');

        divlab1.className = "lab1";
        labelP.appendChild(divlab1);

        let h2lab1 = createNode('h2');
        dataP.nutriscore_grade ?
        h2lab1.textContent = `Nutriscore : ${dataP.nutriscore_grade}`
        : h2lab1.textContent = `Nutriscore : Inconnu.`;
        divlab1.appendChild(h2lab1);

        let imglab1 = createNode('img');
        dataP.nutriscore_grade ?
        imglab1.src = `https://static.openfoodfacts.org/images/misc/nutriscore-${dataP.nutriscore_grade}.svg`
        : imglab1.src = './img/erreur404.png';
        divlab1.appendChild(imglab1);

    
        //Création du second label
        let divlab2 = createNode('div');
        divlab2.className = "lab2";
        labelP.appendChild(divlab2)

        let h2lab2 = createNode('h2');
        dataP.nova_group ?
        h2lab2.textContent = `Nova : ${dataP.nova_group}`
        : h2lab2.textContent = `Nova : Inconnu.`;
        divlab2.appendChild(h2lab2);

        let imglab2 = createNode('img');
        dataP.nova_group ?
        imglab2.src = `https://static.openfoodfacts.org/images/attributes/nova-group-${dataP.nova_group}.svg`
        : imglab2.src = './img/erreur404.png';
        divlab2.appendChild(imglab2);


        //Création du troisieme label
        let divlab3 = createNode('div');
        divlab3.className = "lab3";
        labelP.appendChild(divlab3);

        let h2lab3 = createNode('h2');
        if (dataP.ecoscore_grade.value == "unknown") {
            h2lab3.textContent = `Ecoscore : Inconnu.`
        } else if (dataP.ecoscore_grade.value) {
            h2lab3.textContent = `Ecoscore : ${dataP.ecoscore_grade}`
        } else {
            h2lab3.textContent = `Ecoscore : Inconnu.`
        };
        divlab3.appendChild(h2lab3);

        let imglab3 = createNode('img');
        if (dataP.ecoscore_grade == "unknown") {
            imglab3.src = './img/erreur404.png'
        } else if (dataP.ecoscore_grade) {
            imglab3.src = `https://static.openfoodfacts.org/images/attributes/ecoscore-${dataP.ecoscore_grade}.svg`
        } else {
            imglab3.src = './img/erreur404.png'
        }
        divlab3.appendChild(imglab3);

        //Création du logo huilde de palme
        let palmDiv = createNode('div');
        lorem1.appendChild(palmDiv);

        //Condition si huile de palme ou non
        let imgPalm = createNode('img');
        if(dataP.ingredients_from_or_that_may_be_from_palm_oil_n ==1) {
            imgPalm.src = "./img/ingredients-from-palm-oil.90x90.png";

            let pPalm = createNode('p');
            pPalm.textContent = "Avec huile de Palme";
            palmDiv.appendChild(pPalm);

        } else {

            imgPalm.src = "./img/huileDePalme.png";
        }

        lorem1.appendChild(imgPalm);

        // if (dataP.ingredients[1].from_palm_oil){
        //     if (dataP.ingredients[1].from_palm_oil=="yes") {

        //         imgPalm.src = "./img/ingredients-from-palm-oil.90x90.png" ;

        //         let pPalm = createNode('p');
        //         pPalm.textContent = "Avec huile de Palme";
        //         palmDiv.appendChild(pPalm);
        //     } else {
        //         imgPalm.src = "./img/huileDePalme.png"
        //     };

        // } else {
        //     imgPalm.src = "./img/huileDePalme.png"
        // }

        
    }) 
}
// showProduct(APIurl);


//Fonction sur le bouton
let submit = document.getElementById('submit');

//Query Selector section invisible
let invisibleSec = document.querySelectorAll('.invisible');

//eventlistener
submit.addEventListener('click', (e) => {
    e.preventDefault();

    invisibleSec.forEach((a) => {
        a.classList.remove('visible')
        a.classList.add('invisible')
    });

    infoP.innerHTML = "";
    imgP.innerHTML = "";
    listIng.innerHTML = "";
    valeurN.innerHTML = "";
    anaProd.innerHTML = "";
    condiP.innerHTML = "";
    labelP.innerHTML = "";
    lorem1.innerHTML = "";

    let inputValue = inpText.value;
    if(inputValue !== ""){

        //rend les sections visibles
        invisibleSec.forEach((a) => {
            a.classList.remove('invisible')
            a.classList.add('visible')
        });

        let APIurl = `https://world.openfoodfacts.org/api/v0/product/${inputValue}.json`;
        showProduct(APIurl);
    } else {

        //Rend la première section visible
        sec2.classList.remove('invisible');
        sec2.classList.add('visible');

        let h1err = createNode('h1');
        h1err.innerHTML = "Ce code-barre n'est pas valide."
        h1err.style.color = 'red';
        infoP.appendChild(h1err);
    }
    //Lancement de la fonction  
} );


