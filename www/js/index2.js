document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    document.getElementById('deviceready').classList.add('ready');

    //recuperation de l'url
    var urlLink = window.location.href;
    var url = new URL(urlLink);
    //recuperation du pseudo dans l'url 
    var pseudo = url.searchParams.get("pseudo");
    //clef pour faire fonctionner l'api
    var key = 'RGAPI-20e3e8e3-a05b-4c32-be4a-897dbd96a21a';
    //url de l'api
    var urlApi = 'https://euw1.api.riotgames.com';

    var apiLink = 'https://euw1.api.riotgames.com';

    

    //Instanciation de l'obj async
    let req = new XMLHttpRequest();
    userProfil(); 
    

    
    //Function qui recupere les informations du joueurs (Check si le pseudo est vide ou non)
    function userProfil(){
        if(pseudo != '')
        {
            apiLink += '/lol/summoner/v4/summoners/by-name/'+pseudo+'?api_key='+key;

            //ouverture de la connection
            req.open("GET", apiLink, false);
            req.send();

            //Ici on check le status de la requete 
            if(req.status == 200)
            {
                //Log pour savoir si la connexion est reussi
                console.log("Connexion reussi!");
                //Lien de l'api 
                console.log(apiLink);

                //on recup les infos de la réponse du profile du joueur JSON
                let dataInfo = JSON.parse(req.response);
                //object de l'endPoint
                console.log(dataInfo);

                //Variable modification page HTML (Pratique)
                pseudoGame = "<p>Joueur: "+dataInfo.name+"</p>";
                levelPlayer = "<p>Niveau: "+dataInfo.summonerLevel+"</p>";
                imgProfil = "<img src='http://ddragon.leagueoflegends.com/cdn/12.4.1/img/profileicon/"+dataInfo.profileIconId+".png'>"
                

                apiLink = urlApi;
                apiLink += '/lol/league/v4/entries/by-summoner/'+dataInfo.id+'?api_key='+key;

                //Ouverture de la connection de l'api 
                req.open("GET", apiLink, false);
                req.send();
                //Check du status 404, 200, 204...
                if(req.status == 200)
                {
                    let dataInfo2 = JSON.parse(req.response);

                    //log de l'obj
                    console.log(dataInfo2);

                    //Condition si le joueur est diamond en SoloQ alors...
                    if(dataInfo2[0].tier == "DIAMOND")
                    {
                        alert('··· − ·−−− ');
                        window.navigator.vibrate([50,50,50,200,50,200,200,200]) //Easter egg en morse qui dit STJ SnipeTonJoueur 
                    }

                    //tier et rank du joueur 
                    if(dataInfo2.length == 1 || dataInfo2.length == 2){
                    rankPlayer = "<p>Ranked SoloQ: "+dataInfo2[0].tier+" "+dataInfo2[0].rank+" "+dataInfo2[0].leaguePoints+"</p>";
                    imgRankPlayer = "<img src='../img/"+dataInfo2[0].tier+""+".png'"+"/>";
                    
                    //calcule barbare pour le winrate 
                    winratePlayer = "<p>Winrate: "+((dataInfo2[0].wins/(dataInfo2[0].wins+dataInfo2[0].losses))*100).toFixed(2)+"% W: "+dataInfo2[0].wins+"/L: "+dataInfo2[0].losses;
                    console.log(imgRankPlayer);
                    
                    //tier et rank du joueur en flex
                    if(dataInfo2.length == 2) {
                        rankFlexPlayer = "<p>Ranked Flex: "+dataInfo2[1].tier+" "+dataInfo2[1].rank+" "+dataInfo2[1].leaguePoints+"</p>";
                        imgRankFlexPlayer = "<img src='../img/"+dataInfo2[1].tier+""+".png'"+"/>";
                        winrateFlexPlayer = "<p>Winrate: "+((dataInfo2[1].wins/(dataInfo2[1].wins+dataInfo2[1].losses))*100).toFixed(2)+"% W: "+dataInfo2[1].wins+"/L: "+dataInfo2[1].losses;
                        }
                    }
                    
                    //Modification de la page 
                    document.getElementById('main').innerHTML = pseudoGame;
                    document.getElementById('main').innerHTML += imgProfil;
                    document.getElementById('main').innerHTML += levelPlayer;
                    if(dataInfo2.length == 1 || dataInfo2.length == 2){
                    document.getElementById('main').innerHTML += rankPlayer;
                    document.getElementById('main').innerHTML += imgRankPlayer;
                    document.getElementById('main').innerHTML += winratePlayer;
                    if(dataInfo2.length == 2) { 
                    document.getElementById('main').innerHTML += "<p>-----------------------------------------------------</p>"
                    document.getElementById('main').innerHTML += rankFlexPlayer;
                    document.getElementById('main').innerHTML += imgRankFlexPlayer;
                    document.getElementById('main').innerHTML += winrateFlexPlayer;
                    };
                    
                }else{
                    document.getElementById('main').innerHTML = 'PAS ENCORE RANKED';
                }

                }
                else
                {
                    document.getElementById('main').innerHTML = 'Erreur de la requete ou du pseudo !';
                    console.log(req.status);
                }                
            }
            else{
                document.getElementById('main').innerHTML = 'Erreur de la requete ou du pseudo !';
                console.log(req.status);
            }

        }
        else{
            document.getElementById('main').innerHTML = 'Erreur le champ est vide !';
        }
    }

}
