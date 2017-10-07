// parameter設定
// 初回起動フラグ
var initialize = true;
var twitterButton = '<a class="button" onclick="register()">twitterへ登録</a>';
var startButton = '<a href="index.1.html" class="button" onClick="nextclick()">スタート！</a>';
var changeId = "start_button";

// 起動時読み込み(window.onload)
window.onload = function(){
    initialAccess();
    tagChange(changeId,twitterButton);
} 

// 初回アクセス
function initialAccess(){
    
}

// twitterボタン選択
function register(){
    initialize = false;
    tagChange(changeId,startButton);
}

// ボタン選択時
function nextclick(){
    location.href = "index.1.html";
}
