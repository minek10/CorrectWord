
//Declaration de variables
var nbMot = 0;
var rnd = 0;
var rndDico = 0;
var mot = "";
var motCorrect = "";
var fichierTxt = "";
var score = 0;
var bestScore = 0;
var firstConnexionState = true;
var playerName = "";
var waiting ="";
var newGame = false;
var progressBarNumber = 15;
var setinterval;
var state;
var timer = 15;


//Declaration des elements
label = document.getElementById("ConnexionLabel")
divLabel = document.getElementById("startLabel")
title = document.getElementById("gameTitle")
connexionDiv = document.getElementById("connexionDiv");

scoreLabel = document.getElementById("score")
bestScoreLabel = document.getElementById("bestScore")
playerNameLabel = document.getElementById("playerName")
navbar = document.getElementById("navBar")

divWordDisplay=document.getElementById("wordDisplay")
word = document.getElementById('word');

divBtn= document.getElementById("btn")

startButton = document.getElementById("btnStart");

loading = document.getElementById('loading')

var progressbar = document.getElementById("progressbar")
var timerLabel = document.getElementById('Timer');

var btnY = document.getElementById("btnY");
var btnN = document.getElementById("btnN");

var btns = document.getElementById("btn");


init ()

function init (){

    //Cacher les blocs 
    divBtn.style.display="none"; 
    divWordDisplay.style.display="none";
    navbar.style.display="hidden";
    connexionDiv.style.display="none";

    //Remise du score à 0
    scoreLabel.innerText = "0"
}

function startGame(){
  
  //Appel de la methode pour générer un rnd pour le choix du dico
  document.getElementById('btnStart').style.display="none";

  title.style.display="none"; 

  score = 0;
  scoreLabel.innerText = "0";

  // divBtn.style.display="block"; 
  // divWordDisplay.style.display="block";
  navbar.style.display="block";
  connexionDiv.style.display="block";

  dicoChoice()

  //Appel au dico choisi
  dicoRndGeneration()
  
}

function RestartGame(){
  score = 0;
  scoreLabel.innerText = "0";
  timerLabel.innerText = "Temps restant : " + 15;
  dicoChoice()
  dicoRndGeneration()
}

//Si rndDico = 0 bon Dico, Si 1 mauvais Dico
function dicoChoice(){

  rndDico =  Math.floor(Math.random() * 2) 
  console.log(rndDico)
  if (rndDico == 0){
    fichierTxt = "./Mots_corrects.txt"
  }else{
    fichierTxt = "./Mots_incorrects.txt"
  }
  console.log(fichierTxt)
}

//Fetch sur le dictionnaire choisi,
//Calcul dunombre de mot et génération d'un nombre rdn par apport au nombre 
//de mots du fichier texte dictionnaire
function dicoRndGeneration (){

  fetch(fichierTxt)
  .then(response => response.text())
  .then(data => {
                 
                  //console.log(data)
                  nbMot = data.split('\n').length
                  rnd = Math.floor(Math.random() * nbMot) 
                  console.log("rnd = " + rnd)
                  console.log("Mot rnd = " + data.split('\n')[rnd])
                  //mot = data.split('\n')[rnd];
                  //console.log("total mot = " + nbMot)
  });

  //vérification de l'état de la connexion, si 1ere setTimeout de 3secondes avant d'afficher le 1er mot
                                        //, sinon attente de 1/2 sec avant le mot suivant 

  //console.log("Etat connexion : " + firstConnexionState)

  if (firstConnexionState == true){

     setTimeout(function(){ 

       connexionState();
       firstConnexionState = false
     }, 2000);
  }else{
    setTimeout(function(){ generateAndShowWord() }, 500);
  }

 btns.style.display = "block";
  //btnN.style.display="block";
  console.log(btns)

}

//affichage de l'etat de connexion + si reussite, demande du nom du joueur, quand un nom est encodé
// il est stocké dans une variable
function connexionState(){

  if (rnd > 0){
    //console.log("Il y a " + nbMot + " mots setTimeOut")
    //loading.style.display="none";
    //label.innerHTML = `Connecté` + ' ' +  `<i class="far fa-check-circle text-black" id="success"></i>`

    //Si le nom du joueur est != de "Joueur 1" Alors on ne demande plus le nom
    setTimeout(function(){ 
       //rentrer le nom du joueur avecc un input text popup
        playerName =  Swal.fire({
        title: 'Nom du joueur',
        input: 'text',
        confirmButtonText: 'Commencer',
        //showLoaderOnConfirm: true,

    })
    .then(function(value) {
     playerName = value;
     console.log('console player apres popup' + playerName.value)
     if (playerName.value == ""){
       playerName.value = "Joueur 1"
     }
     generateAndShowWord();
    });
     }, 500);
  }else{
    label.innerText="La connexion avec les dictionnaires à échoué"
   }
}

  
function generateAndShowWord(){

 // console.log(playerName.value)

 //Affichage du nom du joueur sur la page
  playerNameLabel.innerText = playerName.value;

  //Fetch du mot dico via le rnd généré plus haut
  fetch(fichierTxt)
  .then(response => response.text())
  .then(data => {
                 
                  //console.log(" setTimeut 2 Mot rnd = " + data.split('\n')[rnd])
                  mot = data.split('\n')[rnd];
                  //console.log("total mot = " + nbMot)
                  //console.log(mot + " " + rnd)
                  word.innerText=mot.toUpperCase();
  });

   //Générer le mot bien orthographié si mots_incorrect est selectionné
   console.log(fichierTxt)
   if (fichierTxt =="./Mots_incorrects.txt"){
    fetch("./Mots_corrects.txt")
    .then(response => response.text())
    .then(data => {
                   
                    //console.log(" setTimeut 2 Mot rnd = " + data.split('\n')[rnd])
                    motCorrect = data.split('\n')[rnd].toUpperCase();
                    //console.log("total mot = " + nbMot)
                    console.log("Mot correct si mal orthographié : " + motCorrect.toUpperCase() + " rnd: " + rnd)
                   

    });

   }
   //console.log("Mot correct si mal orthographié : " + motCorrect + " rnd: " + rnd)

  //Cacher / afficher des div
  connexionDiv.style.display="none"; 
  divBtn.style.display="block"; 
  divWordDisplay.style.display = "block";
  titleLabel.style.display="block";

  progressBarFct();

}


// button et conditions pour determiner si le mot est bon ou pas 
function btnOui() {
  btns.style.display = "none";
  StopInterval();
  
  console.log(fichierTxt)
  if (fichierTxt === "./Mots_corrects.txt"){
    clearTimeout(setinterval);
    score += 1;
    scoreLabel.innerText = score;

    Swal.fire({
      icon: 'success',
      title: '+1 pour ' +playerName.value,
      text: 'Le mot était bien orthographié, bien ouej !',
      confirmButtonText: 'Okay'
    }).then((result) => {
      if (result.isConfirmed) {
        compareScore()
        dicoChoice();
        dicoRndGeneration();
      }
    })
  }else{
    console.log("Perdu");
    Swal.fire({
      icon: 'error',
      title: 'Oups... Perdu ' + playerName.value,
      html: 'Le mot était bien orthographié ! <br>' + "Relis le Larousse et revient me voir =D <br> L'orthographe correcte était <b>" +motCorrect + "</b>",
      confirmButtonText: 'Looser'
    }).then((result) => {
      if (result.isConfirmed) {
        RestartGame();
      }
    })
  }

}

function btnNon() {
  btns.style.display = "none";
  StopInterval();

  console.log(fichierTxt)
  if (fichierTxt === "./Mots_incorrects.txt"){
    score += 1;
    scoreLabel.innerText = score;
    Swal.fire({
      icon: 'success',
      title: '+1 pour ' + playerName.value, 
      html: 'Le mot était en effet mal orthographié ! <br>' + "L'orthographe correcte était <b>" + motCorrect + "</b>",
      confirmButtonText: 'Okay'
    }).then((result) => {
      if (result.isConfirmed) {
        compareScore();
        dicoChoice();
        dicoRndGeneration();
      }
    })
  }else{
    console.log("Perdu");
    Swal.fire({
      icon: 'error',
      title: 'Oups... Perdu ' + playerName.value,
      html: 'Le mot était bien orthographié',
      confirmButtonText: 'Looser'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Perdu");
        RestartGame();
      }
    })
  }
}

function progressBarFct(){
  var fulltime = 15;
  var percent = 100;
  var calc = 100/15;
  progressbar.style.width = "100%";
  progressbar.style.backgroundColor = "rgb(0, 255, 0, 1)";

  console.log("progress start");
  setinterval = setInterval(() => {
      fulltime--;
      timerLabel.innerText = "Temps restant : " + fulltime;
      percent = percent - calc;
      progressbar.style.width = percent +"%";


      console.log("TIME : " + fulltime);

      //Variation couleur
      ColorBar(fulltime);
      
      if(fulltime == 0){
        progressbar.value = 0;
        progressbar.style.width = "0%";
        console.log("REMISE a 0");
        clearTimeout(setinterval);
        compareScore();
        Timeout();
      }
    }, 1000);
}

function ColorBar(fulltime){
    switch(fulltime){
        case 15: progressbar.style.backgroundColor = "rgb(0, 255, 0, 1)"
        break;
        case 14: progressbar.style.backgroundColor = "rgb(50, 255, 0, 1)"
        break;
        case 13: progressbar.style.backgroundColor = "rgb(100, 255, 0, 1)"
        break;
        case 12: progressbar.style.backgroundColor = "rgb(150, 255, 0, 1)"
        break;
        case 11: progressbar.style.backgroundColor = "rgb(200, 255, 0, 1)"
        break;
        case 10: progressbar.style.backgroundColor = "rgb(255, 255, 0, 1)"
        break;
        case 9: progressbar.style.backgroundColor = "rgb(255, 230, 0, 1)"
        break;
        case 8: progressbar.style.backgroundColor = "rgb(255, 205, 0, 1)"
        break;
        case 7: progressbar.style.backgroundColor = "rgb(255, 180, 0, 1)"
        break;
        case 6: progressbar.style.backgroundColor = "rgb(255, 155, 0, 1)"
        break;
        case 5: progressbar.style.backgroundColor = "rgb(255, 130, 0, 1)"
        break;
        case 4: progressbar.style.backgroundColor = "rgb(255, 105, 0, 1)"
        break;
        case 3: progressbar.style.backgroundColor = "rgb(255, 80, 0, 1)"
        break;
        case 2: progressbar.style.backgroundColor = "rgb(255, 55, 0, 1)"
        break;
        case 1: progressbar.style.backgroundColor = "rgb(255, 30, 0, 1)"
        break;
        case 0: progressbar.style.backgroundColor = "rgb(255, 0, 0, 1)"
        break;
    }
}

function StopInterval() {
  progressbar.value = 0;
  console.log("setinterval" + setinterval);
  console.log("CLOSE interval")
  clearInterval(setinterval);
}

function compareScore(){

    if (bestScore <= score ){
      bestScore = score
      bestScoreLabel.innerText = bestScore
  }
    console.log("score " + score)
    console.log("bestScore " + bestScore)
}

function Timeout(){

   console.log("Perdu TIMEOUT");

   if (fichierTxt === "./Mots_incorrects.txt"){
    Swal.fire({
      icon: 'error',
      title: 'Oups... Temps expiré ... Perdu ' + playerName.value,
      html: 'Le mot était mal orthographié ! <br>' + "L'orthographe correcte était <b>" +motCorrect + "</b>",
      confirmButtonText: 'Okay'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        RestartGame();
      }
    })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oups... Temps expiré ... Perdu ' + playerName.value,
        html: 'Le mot était bien orthographié',
        confirmButtonText: 'Looser'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          RestartGame();
        }
      })
}
}






