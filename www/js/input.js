// parameter設定
// 初回起動フラグ
var ageId = "login_age";
var startAge= 18;
var endAge= 70;

var postAppId = 1;
var url = 'https://401wo.cybozu.com/k/guest/1/v1/record.json';

var nextHref = 'interview.html';
var inputUrl = "";
var vars = [];

// 起動時読み込み(window.onload)
window.onload = function(){
    
    inputUrl = window.location.search;
    var data = [];

    console.log(inputUrl);
    if(inputUrl !== ""){
        data = getUrlVars(inputUrl.slice(1));
        if(data["oauth_verifier"] !== '' ){
            settingTwitter(data);
        }
    } else {
        // Get request token
        oauthTwitter();
    }
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
    
    var userId = document.getElementById("login_nickname").value;

    if(userId === ""){
        window.alert("Input nickname");
        return;
    }

    var sex = "";
    var elements = document.getElementsByName("sex");
    // 選択状態の値を取得
    for ( i=elements.length; i--; ) {
        if ( elements[i].checked ) {
            var sex = elements[i].value ;
            break ;
        }
    }

    var age = document.getElementById("login_age").value;

    // 登録用レコード作成
    var record = {
        "app": postAppId,
        "record":{
            "Twitter": {
                "value": userId
            },
            "Gender": {
                "value": sex
            },
            "Age": {
                "value": age
            }
        }
    }

    // 回答の登録
    postRecord(url,record,successPostRecordFunction,failPostRecordFunction);

}

function successPostRecordFunction(data){
    // 遷移先URL
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}

function failPostRecordFunction(data){
    // 遷移先URL
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}
