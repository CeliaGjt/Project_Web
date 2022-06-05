document.addEventListener('DOMContentLoaded',init);

 


let message_container;//chat 


let input;     //Reponse 


let envoie_message;     //Bouton d'envoie 
let listeBot;  //Liste déroulante avec les noms des bots
let refresh;   //Bouton pour rafraichir la liste des chatbots
let listeIDBot=[];//Liste contenant les id des bots. 

let menu;


let liste_lien;  //Liste des liens permettant de communiquer avec les bots
let choice;    //Index du bot sélectionné dans la liste déroulante
let chat;



function init(){

    
    message_container = document.getElementById("messages");
    input = document.getElementById("input");
    envoie_message = document.getElementById("envoie_Button");
    listeBot = document.getElementById("listeBot");
    refresh = document.getElementById("refreshBot");
    menu =document.getElementById("menu")
    chat = document.getElementById("chat");

    recupBots();

    refresh.addEventListener('click', recupBots);


    listeBot.addEventListener('change', changeBot);

    envoie_message.addEventListener('click', newUserMessage);
    input.addEventListener('keydown', ifEnter);

menu.addEventListener('click',supprBots)


}





/**
 * Envoie une requête GET  pour récupérer la liste des bots.
 */
function recupBots()
{ 
 
    supprBots();


    listeBot.innerHTML = "<option></option>";
    listeIDBot = [];
    liste_lien = [];


    // la requête:
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    let myURL = "http://localhost:3001/";



    fetch(myURL,myInit)
        .then((httpResponse)=>{
            for(let field of httpResponse.headers){
                console.log(`raw = ${field}`);
            }	
            return httpResponse.json()
        })
        .then((myArrayOfBots)=>{
            console.log("ici")
            for(let bot of myArrayOfBots){
                
                    listeBot.innerHTML += `<option>${bot.name}</option>`;
                    listeIDBot.push(bot.id);
                    liste_lien.push(-1);
                
            }
        })
        .catch((err)=>{
            console.log(`ERROR : ${err}`);
        })
    listeBot.selectedIndex = 0;
}


/**
 *  Envoie une requête Post pour modifier le bot auquel on parle 
 */
function changeBot()
{

    message_container.innerHTML = '';


    console.log("Changement de bot");

  
    choice = listeBot.selectedIndex;
    console.log("la")
    // for (let pas = 0; pas < listeIDBot.length+1 ; pas++) {
    //     console.log("la")
    //     if (pas!=choice)
    //         console.log("ici")
    //         supprBot(listeIDBot[pas])
    //   }

    if (choice > 0)
    {
        
        if (liste_lien[choice-1] == -1)
        {
            console.log("on crée un nouveau chatbot");
            let idBot = listeIDBot[choice-1];
            console.log(`id du nouveau bot sélectionné  :${idBot}`) ;

            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            let myInit = { 
                method: 'POST',
                headers: myHeaders,
                credentials: 'same-origin',
                mode: 'cors',
                cache: 'no-store', 
            };

            let myURL = `http://localhost:3001/${idBot}`;
            fetch(myURL,myInit)
                .then((httpResponse)=>{
                    return httpResponse.json()
                })
                .then((responseBody)=>{
                    console.log(listeIDBot)
                    console.log( liste_lien)
                    console.log(`response is ${responseBody}`);
                    liste_lien[choice-1]=responseBody.link;
                })
                .catch((err)=>{
                    console.log(`ERROR : ${err}`);
                })
        }
        else
        {
            console.log("On reprend la communication ");

        }
  
    }
}



/**
 * Affiche dans la fenêtre de chat le message de l'utilisateur.
 */
function ifEnter(event)
{
    var key = event.which;
    if(key==13)
    {
        newUserMessage();
    }
}


/**
 *  Envoie une requête Patch lorsqu'on parle avec un bot
 */
function newUserMessage()
{
    console.log("Event 'submit' détecté");
    
    
    if (choice>0)
    {
        message_container.innerHTML += `<div class="self">${input.value}</div>`;

        chat.scrollBy(0,1000);
        console.log(input.value)
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let payload = {
                message:input.value
        };
        console.log(`La tâche est assignée à :${payload.assignement}`);
        let myBody = JSON.stringify(payload);
        let myInit = { 
            method: 'PATCH',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body:myBody
        };
        let myURL = liste_lien[choice-1];
        console.log(`liste_lien[choice-1] = ${liste_lien[choice-1]}`);
        //launch the request
        fetch(myURL,myInit)
        .then((httpResponse)=>{
            return httpResponse.json();
        })
        .then((responseBody)=>{
            message_container.innerHTML += `<div class="bot">${responseBody}</div>`;
            chat.scrollBy(0,1000);
        })
        .catch((err)=>{
            console.log(`ERROR : ${err}`);
        })
    }
    else
    {
        alert("Veuillez sélectionner un bot.");
    }
    input.value='';
}



/**
 * Envoie une requête Delete pour Fermer la communication avec un bot
 */
function supprBot(idBot)
{

    index = listeIDBot.lastIndexOf(idBot);
    
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let myInit = { 
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
    };

    let myURL = liste_lien[index];

    fetch(myURL,myInit)
    .then((httpResponse)=>{
        return httpResponse.json();
    })
    .then((responseBody)=>{
        if (responseBody.ok)
        {
            listeBot.splice(index, 1);
            listeIDBot.splice(index, 1);
            liste_lien.splice(index, 1);
        }
    })
    .catch((err)=>{
        console.log(`ERROR : ${err}`);
    })
}

/**
 * Cette fonction ferme toutes les communications avec les chatbots
 */
function supprBots()
{
    console.log("Début suppression des communications actives")
    for (let i of listeIDBot)
    {
        supprBot(i);
    }
    console.log("fin de la suppression des communications actives");
}