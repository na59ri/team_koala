// parameter設定

document.addEventListener ("deviceready", onDeviceReady, false);

//This function is executed when Cordova loading completed.
function onDeviceReady () {
    window.alert ('Loading Cordova is completed、Camera is now ready to be used.');
}

function snapPicture () {
    navigator.camera.getPicture (onSuccess, onFail, 
        { quality: 50, destinationType: Camera.DestinationType.DATA_URL});


    //A callback function when snapping picture is success.
    function onSuccess (imageData) {
        var image = document.getElementById ('picture');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    //A callback function when snapping picture is fail.
    function onFail (message) {
        alert ('Error occured: ' + message);
    }
}
