// parameter設定
var nextHref = 'index_start.html';

var url = 'https://401wo.cybozu.com/k/guest/1/v1/record.json';
var getAppId = 16;
var getApiToken = "RTuaWLIr0GknCrx5MBpbx3SO0Ej4Q1bNwf1tpDtk";

var imageKey = 'picture';
var adviceKey = 'advice';
var scenarioId = 1;

// 起動時読み込み(window.onload)
window.onload = function(){
    initialAccess();
} 

// 初回アクセス
function initialAccess(){
    // 検索用クエリ
    var query = {'キャラクタID':String(scenarioId)};
    getSearchRecord(url,getAppId,1,query,successGetRecordFunction,failGetRecordFunction,getApiToken);
    
}

// input ret:JSON
function successGetRecordFunction(ret){
    receiveArray = ret;

    var image = ret['record']['画像URL']['value'];
    document.getElementById(imageKey).src = image;

    var advice = ret['record']['アドバイス']['value'];
    tagChange(adviceKey,advice);

}

// input ret:JSON
function failGetRecordFunction(ret){
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}

// 「スタート！」ボタン選択時
function nextClick(){
    // 遷移先URL
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}
