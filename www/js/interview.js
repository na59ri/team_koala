// parameter設定

var image;
var questionid;
var question;
var anslist;

var imageId = 'background_image';
var questionId = 'question';
var ansListId = 'ans_list';

var receiveJson;

// 起動時読み込み(window.onload)
window.onload = function(){

    getRecord(url+initialData,successFunction,failFunction,apiToken);
    // 事前入力情報の取得
    getCloudData();
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
        
        changeImage(imageId,image);
        changeQuestion(questionId,question);
        changeAnslist(ansListId,anslist);
    }
}

// ボタン選択時
function nextClick(object){
    // 選択時の回答番号を取得
    var value = object.getAttribute('value');

    if(questionid < interviewData.length){
        // エフェクト
        pageEffect(questionid);
    } else {
        // 遷移先URL
        location.href = nextHref;
        // 画面遷移エフェクト（app.js）
        pageEffect(nextHref);
    }
}

// 同一ファイル内エフェクト(未実装)
function pageEffect(id){
    var item = interviewData[id];
    image = item.image;
    questionid = Number(item.questionid);
    question = item.question;
    anslist = item.anslist;
    
    changeImage(imageId,image);
    changeQuestion(questionId,question);
    changeAnslist(ansListId,anslist);
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
        tag = tag + '<li class="list-item list-item--longdivider" onClick=nextClick(this) value="'+item.ansid+'"'+
        '><div class="list-item__center list-item--longdivider__center">'+item.ans+'</div></li>';
    }
    tagChange(id,tag);
}

// 回答リスト作成
function changeQuestion(id,question){
    tagChange(id,question);
}

// input ret:JSON
function successFunction(ret){
    receiveArray = ret;
    getCloudData1(ret);
}

// input ret:JSON
function failFunction(ret){
    console.log(ret);
}

// 事前入力情報の取得
function getCloudData1(data){

    // 取得した配列データを表示できる形式に変更
    parseData(data);
        
    changeImage(imageId,image);
    changeQuestion(questionId,question);
    changeAnslist(ansListId,anslist);
}

function parseData(data){
    image = data['record']['画像URL']['value'];
    questionid = Number(data['record']['シナリオNo']['value']);
    question = data['record']['シナリオ']['value'];
    anslist=[];
    for(var i=0;i<data['record']['回答']['value'].length;i++){
        anslist.push(
            {id:data['record']['回答']['value'][i]['value']['回答番号']['value'] , ans:data['record']['回答']['value'][i]['value']['回答内容']['value']});
    }
}

