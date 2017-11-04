// parameter設定
// 初回起動フラグ
var initialize = true;
// var twitterButton = '<a class="button" onclick="register()">twitterへ登録</a>';
var twitterButton = '<a class="button" onclick="register()">初回登録</a>';
// ONSENUI のボタンを利用
// https://ja.onsen.io/v2/api/css.html#button-category
var startButton = '<a class="button" onClick="nextclick()">スタート！</a>';
var changeId = 'start_button';

var nextHref = 'input.html';

// field
var apiToken = 'KdgX51XX2B5XJXdmxlIPgFGDmD31l6YymQahTKbU';

var data = '?app=22&id=44';
var url = 'https://401wo.cybozu.com/k/guest/1/v1/record.json'+data;

// 起動時読み込み(window.onload)
window.onload = function(){
    initialAccess();
    tagChange(changeId,twitterButton);
} 

// 初回アクセス
function initialAccess(){
    // getRecord(url,successFunction,failFunction,apiToken);
    // getDataSpider();
}

// twitterボタン選択
function register(){
    // 初回起動フラグをOFF
    initialize = false;
    // ぼたん変更
    // tagChange(changeId,startButton);
    nextclick();
}

// 「スタート！」ボタン選択時
function nextclick(){
    // 遷移先URL
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}

// input ret:JSON
function successFunction(ret){
    console.log(ret);
}

// input ret:JSON
function failFunction(ret){
    console.log(ret);
}