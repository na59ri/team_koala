// parameter設定
// 初回起動フラグ
var initialize = true;
var twitterButton = '<a class="button" onclick="register()">twitterへ登録</a>';
// ONSENUI のボタンを利用
// https://ja.onsen.io/v2/api/css.html#button-category
var startButton = '<a class="button" onClick="nextclick()">スタート！</a>';
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
    // 初回起動フラグをOFF
    initialize = false;
    // ぼたん変更
    tagChange(changeId,startButton);
}

// 「スタート！」ボタン選択時
function nextclick(){
    // 遷移先URL
    location.href = "input.html";
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}
