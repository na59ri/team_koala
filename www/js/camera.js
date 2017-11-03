var imageUrl;
var imageId = "picture";

//画像撮影
function snapPicture() {
    window.alert("check");
    takingPicture = true;
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        sourceType: Camera.PictureSourceType.CAMERA,
        correctOrientation: true,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

//A callback function when snapping picture is success.
function onSuccess(imageData) {
    setLoading(true);

    imageUrl = imageData;

    // var image = $("#picture");
    // image.show();
    // image.attr("src", "data:image/jpeg;base64," + imageData);
    document.getElementById(imageId).src = imageUrl;
}

//A callback function when snapping picture is fail.
function onFail(message) {
    // $("#picture").hide();
    takingPicture = false;
    setLoading(false);
    alertMessage("写真を撮影してください。");
}

//画像保存処理
function savePictureData() {
    console.log("savePictureData");
    if (imageUrl) {
        var d = new Date();
        //登録情報生成
        var body = dataURItoBlob(imageUrl, "image/jpeg");
        var basename =
            d.getFullYear() + "-" +
            ('0' + (d.getMonth() + 1)).slice(-2) + "-" +
            ('0' + d.getDate()).slice(-2) + "_" +
            ('0' + d.getHours()).slice(-2) + "-" +
            ('0' + d.getMinutes()).slice(-2) + "-" +
            ('0' + d.getSeconds()).slice(-2);
        //保存実行
        saveToLocal(body, basename, function() {
            infoMessage("画像の登録が完了しました。");
            refleshFileList();
        }, function() {
            alertMessage("画像の登録に失敗しました。");
        });
    } else {
        // $("#picture").hide();
        alertMessage("画像を撮影してください。");
    }
}

function dataURItoBlob(url, type) {
    var binary = atob(url);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: type });
};

function saveToLocal(body, basename, onSuccess, onError) {
    console.log(body);
    getFileSystem(
        function(fileEntry) {
            fileEntry.getFile(
                basename + ".jpg", { create: true }, onFileEntry, onError
            );

            function onFileEntry(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = onSuccess;
                    fileWriter.onerror = onError;
                    fileWriter.write(body);
                }, onError);
            };
        }
    );
}
