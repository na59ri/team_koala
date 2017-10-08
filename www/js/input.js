// parameter設定
// 初回起動フラグ
var ageId = "login_age";
var startAge= 18;
var endAge= 70;

// 起動時読み込み(window.onload)
window.onload = function(){

    // 年齢の option追加
    var selectAge = '';
    for(var i=startAge;i<=endAge;i++){
        selectAge=selectAge+'<option value="'+i+'">'+i+'</option>';
    }
    tagChange(ageId,selectAge);

    // 事前入力情報の取得
    getInitialInput();
}


// 事前入力情報の取得
function getInitialInput(){
    
}



// twitterボタン選択
function register(){
}

// ボタン選択時
function nextclick(){
}
