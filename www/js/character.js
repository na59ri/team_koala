// parameter設定
var url = 'https://401wo.cybozu.com/k/guest/1/v1/record.json';
var maxChara = 4;

var charaListIdKey = 'chara_list';
var initialId = 2;
var charaAppId;
var sex = '女';

var getAppId = 20;
var getApiToken = '1q1rYaRYJ5Ie8XuqNx2bGoua48M4VxBpjCr6Gu1d';

var charaList = [];

var receiveJson;
var nextHref = 'story.html';

// 起動時読み込み(window.onload)
window.onload = function(){

    charaAppId= initialId;

    // 検索用クエリ
    var query = {'性別':sex};
    // kintone にて検索
    getSearchRecord(url,getAppId,charaAppId,query,successGetRecordFunction,failGetRecordFunction,getApiToken);

}

// ボタン選択時
function nextClick(object){
    // 選択時の回答番号を取得
    var value = object.getAttribute('value');

    console.log('value:'+value);

    // 遷移先URL
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}


// input ret:JSON
function successGetRecordFunction(ret){
    receiveArray = ret;
    getCloudData(ret);

    // 検索用クエリ
    var query = {'性別':sex};
    getSearchRecord(url,getAppId,++charaAppId,query,successGetRecordFunction,failGetRecordFunction,getApiToken);
}

// input ret:JSON
function failGetRecordFunction(ret){
    changeCharalist(charaListIdKey,charaList);
}

// 事前入力情報の取得
function getCloudData(data){

    charaAppId = data['record']['$id']['value'];

    var id = data['record']['キャラクタID']['value'];
    var image = data['record']['画像URL']['value'];
    var character = data['record']['キャラクタ名']['value'];

    charaList.push({"id":id,"image":image,"chara":character});
}

// キャラリスト作成
function changeCharalist(id,charalist){
    var tag = '';
    for(var i=0;i<charalist.length;i++){
        if(maxChara <= i){
            break;
        }
        var item = charalist[i];
        tag = tag + '<li class="list-item" onClick=nextClick(this) value="'+item.id+'">'+
        '<div class="list-item__left"><img id="picture" height="80" width="80" src="'+item.image+'" /></div>'+
        '<div class="list-item__center">'+item.chara+'</div></li>';
    }
    tagChange(id,tag);
}
