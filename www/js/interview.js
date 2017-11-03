// parameter設定
var image;
var questionId = 1;
var question;
var anslist;

var imageIdKey = 'background_image';
var questionIdKey = 'question';
var ansListIdKey = 'ans_list';

var receiveJson;

// 起動時読み込み(window.onload)
window.onload = function(){

    questionId = initialScenarioId;

    // 検索用クエリ
    var query = {'シナリオNo':String(questionId),'性別':sex};
    // kintone にて検索
    getSearchRecord(url,getAppId,1,query,successGetRecordFunction,failGetRecordFunction,getApiToken);

    // 事前入力情報の取得
    // getCloudData();
}

// 事前入力情報の取得
function getCloudData(){
    // ダミーデータ
    if(0<interviewData.length){

        var item = interviewData[0];
        image = item.image;
        questionid = Number(item.questionid);
        question = item.question;
        anslist = item.anslist;
        
        changeImage(imageIdKey,image);
        changeQuestion(questionIdKey,question);
        changeAnslist(ansListIdKey,anslist);
    }
}

// ボタン選択時
function nextClick(object){
    // 選択時の回答番号を取得
    var value = object.getAttribute('value');

    // 登録用レコード作成
    var record = {
        "app": postAppId,
        "record":{
            "ユーザーID": {
                "value": userId
            },
            "性別": {
                "value": sex
            },
            "回答番号": {
                "value": Number(value)
            },
            "シナリオID": {
                "value": scenarioId
            },
            "シナリオNo": {
                "value": questionId
            }
        }
    }

    // 回答の登録
    postRecord(url,record,successPostRecordFunction,failPostRecordFunction)
    // var params = '?app=' + postAppId + '&id=' + 1;
    // getRecord(url+params,successPostRecordFunction,failPostRecordFunction,postApiToken);

    // 検索用クエリ
    // var query = {'シナリオNo':String(++questionId),'性別':sex};
    // getSearchRecord(url,getAppId,1,query,successGetRecordFunction,failGetRecordFunction,getApiToken);

    // if(questionid < interviewData.length){
    //     // エフェクト
    //     pageEffect(questionid);
    // } else {
    //     // 遷移先URL
    //     location.href = nextHref;
    //     // 画面遷移エフェクト（app.js）
    //     pageEffect(nextHref);
    // }
}

function successPostRecordFunction(data){
    // 検索用クエリ
    var query = {'シナリオNo':String(++questionId),'性別':sex};
    getSearchRecord(url,getAppId,1,query,successGetRecordFunction,failGetRecordFunction,getApiToken);
}

function failPostRecordFunction(data){
    // 検索用クエリ
    var query = {'シナリオNo':String(++questionId),'性別':sex};
    getSearchRecord(url,getAppId,1,query,successGetRecordFunction,failGetRecordFunction,getApiToken);    
}

// 同一ファイル内エフェクト(未実装)
function pageEffect(id){
    var item = interviewData[id];
    image = item.image;
    questionid = Number(item.questionid);
    question = item.question;
    anslist = item.anslist;
    
    changeImage(imageIdKey,image);
    changeQuestion(questionIdKey,question);
    changeAnslist(ansListIdKey,anslist);
}

// 画像置き換え
function changeImage(id,imageURI){
    document.getElementById(id).src = imageURI;
}

// 回答リスト作成
function changeAnslist(id,anslist){
    var tag = '';
    for(var i=0;i<anslist.length;i++){
        var item = anslist[i];
        tag = tag + '<li class="list-item list-item--longdivider" onClick=nextClick(this) value="'+item.id+'"'+
        '><div class="list-item__center list-item--longdivider__center">'+item.ans+'</div></li>';
    }
    tagChange(id,tag);
}

// 回答リスト作成
function changeQuestion(id,question){
    tagChange(id,question);
}

// input ret:JSON
function successGetRecordFunction(ret){
    receiveArray = ret;
    getCloudData1(ret);
}

// input ret:JSON
function failGetRecordFunction(ret){
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}

// 事前入力情報の取得
function getCloudData1(data){

    // 取得した配列データを表示できる形式に変更
    parseArrayData(data);
        
    changeImage(imageIdKey,image);
    changeQuestion(questionIdKey,question);
    changeAnslist(ansListIdKey,anslist);
}

function parseArrayData(data){
    image = data['record']['画像URL']['value'];
    question = data['record']['シナリオ']['value'];
    anslist=[];
    for(var i=0;i<data['record']['回答']['value'].length;i++){
        anslist.push(
            {id:data['record']['回答']['value'][i]['value']['回答番号']['value'] , ans:data['record']['回答']['value'][i]['value']['回答内容']['value']});
    }
}

