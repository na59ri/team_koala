// parameter設定

var image;
var questionid;
var question;
var anslist;

var imageId = 'background_image';
var questionId = 'question';
var ansListId = 'ans_list';

// 起動時読み込み(window.onload)
window.onload = function(){
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