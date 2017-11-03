// parameter設定
// 初回起動フラグ
var ageId = "login_age";
var startAge= 18;
var endAge= 70;

var nextHref = 'interview.html';

// 起動時読み込み(window.onload)
window.onload = function(){

    // 事前入力情報の取得
    getInitialInput();
}


// 事前入力情報の取得
function getInitialInput(){
        // 年齢の option追加
        var selectAge = '';
        for(var i=startAge;i<=endAge;i++){
            selectAge=selectAge+'<option value="'+i+'">'+i+'</option>';
        }
        tagChange(ageId,selectAge);


}

// ボタン選択時
function nextclick(){
    // 遷移先URL
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}
