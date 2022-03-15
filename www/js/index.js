document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('volumeupbutton', onvolumechange, false);
document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);

function onVolumeUpKeyDown()
{
    alert("Le grand golem serpent");
    imgEasterEgg = "<video controls width='320'><source src='../img/easter.mp4' type='video/webm'></video>";
    document.getElementById('volume').innerHTML = imgEasterEgg;
}

function onVolumeDownKeyDown() {
    alert("Tyler plant the bomb! ");
    imgEasterEgg2 = "<video controls width='400'><source src='../img/easter2.mp4' type='video/webm'></video>";
    document.getElementById('volume').innerHTML = imgEasterEgg2
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    document.getElementById('deviceready').classList.add('ready');
    console.log("navigator.geolocation works well");
    test();

    

    //Btn pour envoyer les données dans l'autre page
    var btn = document.getElementById('search');
    //init de la variable pseudo (Normalement pas besoin de mettre null mais a try)
    var pseudo = 'null';

    var onSuccess = function(position)
    {
        alert('Latitude: ' + position.coords.latitude);
    }
    function onError(error)
    {
        alert('Erreur');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);


    //fonction du btn 
    btn.onclick = function(){
        //check si le bouton passe bien
        console.log('Ok');
        //Recup la valeur du input pour la stocker dans pseudo
        pseudo = document.getElementById('pseudo').value;
        //check le pseudo dans les logs
        console.log(pseudo);
    }


    
}
