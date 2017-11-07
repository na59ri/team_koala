// https://syncer.jp/Web/API/Twitter/REST_API/ 参照
// https://qiita.com/yasuno0327/items/06fcc15da6b074f54c60 参照
// https://github.com/jakubzapletal/crypto-js/tree/master/src 参照
// https://code.google.com/archive/p/crypto-js/

// https://qiita.com/mfujita/items/4d808c5648005e74b831 参照
// https://personality-insights-livedemo.mybluemix.net/?cm_mc_uid=35335436541115061314197&cm_mc_sid_50200000=1509891620&cm_mc_sid_52640000=1509892131
// https://github.com/watson-developer-cloud/personality-insights-twitter-python
//　https://www.ibm.com/watson/developercloud/personality-insights/api/v3/?curl#profile

// あらかじめアプリ登録して取得
var CONSUMER = {
    "key" : 'dVTYF3gpuAoKcuKemij2h7pne',
    "secret" : 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns' 
};

// ユーザの自前アカウントで取ってきてもらってもいいし、アプリ固有のを埋め込んでもいい
var ACCESS = {
    "screen_name" : '',
    "key" : '',
    "secret" : ''
};

var signature_key = encodeURIComponent(CONSUMER['secret']) + "&" + encodeURIComponent(ACCESS['secret']);

var date = new Date();
// リクエストメソッド
var request_method = "GET";
// エンドポイントURL
var request_url = "https://api.twitter.com/oauth/request_token";
var params = {
    "oauth_callback": "https://rawgit.com/na59ri/team_koala/master/www/input.html",
    // "oauth_callback": "file:///Users/na59ri/development/redhack/team_koala/www/index.html",
    "oauth_consumer_key": CONSUMER['key'],
    "oauth_signature_method": "HMAC-SHA1",
    "oauth_version": "1.0",
    "oauth_timestamp": Math.round(Date.now() / 1000),
	"oauth_nonce": Math.floor( date.getTime() / 1000 )
   }

var params_to_query = (params) => {
    return Object.keys(params).sort().map(key => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
          }).join(",");
  }
const signature_data = encodeURIComponent(request_method + "&" + encodeURIComponent(request_url) + "&" + params_to_query(params));

// const hash = CryptoJS.HmacSHA1(signature_data, signature_key);
// var shaObj = new jsSHA(signature_data,"TEXT");
// var signature = shaObj.getHMAC(signature_key,"TEXT","SHA-1","B64");
// var signature = CryptoJS.enc.Base64.stringify(hash);

function oauth2() {
    var accessor = {
        consumerSecret: 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns',
        tokenSecret: ''
    };
    
    var message = {
        method: "GET",
        action: "http://twitter.com/oauth/request_token",
        parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: 'dVTYF3gpuAoKcuKemij2h7pne'
        }
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);
    var options = {
        type: message.method,
        url: target,
        success: function(d, dt) {
             /* 返り値からRequest Token/Request Token Secretを取り出して、PINを取得するためのURLを作成 */
            console.log('d:'+d);
            console.log('dt:'+dt);
        },
    };
    $.ajax(options); // 送信
}

function oauthTwitter(){
    var accessor = {
        consumerSecret: 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns',
        tokenSecret: ''
    };
    
    var message = {
        method: "GET",
        action: "https://twitter.com/oauth/request_token",
        parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: 'dVTYF3gpuAoKcuKemij2h7pne'
        }
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);

    req= createCORSRequest(request_method, target);
    if (!req) {
      throw new Error('CORS not supported');
    }

    // var stringData = params_to_query(params);
    var stringData = target.slice(message.action.length+1);
    // var vars = getUrlVars(stringData);
    // params.oauth_signature = vars['oauth_signature'];
    
    console.log(stringData);
    req.onload = function() {
      if (req.status === 200) {
        // success
        // console.log(JSON.parse(req.responseText));
        console.log(req.responseText);
        var data = getUrlVars(req.responseText);
        localStorage.setItem(fileName, addJson(data,localStorage.getItem(fileName)));
        // 遷移先URL
        var aaa = 'https://api.twitter.com/oauth/authorize?oauth_token=' + data['oauth_token'];
        location.href = aaa;
        // 画面遷移エフェクト（app.js）
        pageEffect(aaa);
        
      } else {
        // error
        console.log('error');
        console.log(JSON.parse(req.responseText));
      }
    };
    req.setRequestHeader('Authorization','OAuth '+stringData);
    req.send();
}

var oauth_request = {
    'oauth_token':'fLzKyAAAAAAA3DglAAABX5bZvLU',
    'oauth_token_secret':'WKHCJyxOZccbNlr6E9fmc882uvZ6h9gc',
}
function settingTwitter(tokenData){

    var data = addJson(tokenData,localStorage.getItem(fileName));

    console.log(data);

    var accessor = {
        consumerSecret: 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns',
        tokenSecret: data['oauth_token_secret']
    };
    
    var message = {
        method: "GET",
        action: "https://api.twitter.com/oauth/access_token",
        parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: 'dVTYF3gpuAoKcuKemij2h7pne',
            oauth_token: data['oauth_token'],
            oauth_verifier: data["oauth_verifier"]
        }
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);

    req= createCORSRequest(request_method, target);
    if (!req) {
      throw new Error('CORS not supported');
    }

    // params.oauth_signature = signature;
    // var stringData = params_to_query(params);
    var stringData = target.slice(message.action.length+1);
    console.log(stringData);
    req.onload = function() {
      if (req.status === 200) {
        // success
        // console.log(JSON.parse(req.responseText));
        console.log(req.responseText);
        data = getUrlVars(req.responseText);
        // data = {
        //     'oauth_token':'bSiwzwAAAAAA3DglAAABX4yBynY',
        //     'oauth_token_secret':'GKaERjU6UAlQVhsubVQLGNPfI4R2LAhD',
        //     'oauth_callback_confirmed':'true'
        // };
        // 遷移先URL
        var aaa = 'https://api.twitter.com/oauth/authorize?oauth_token=' + data['oauth_token'];
        // location.href = aaa;
        // 画面遷移エフェクト（app.js）
        // pageEffect(aaa);
        
      } else {
        // error
        console.log('error');
        console.log(req.responseText);
      }
    };
    req.setRequestHeader('Authorization','OAuth '+stringData);
    req.send();
}

function profileTwitter(tokenData){
    var accessor = {
        consumerSecret: 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns',
        tokenSecret: tokenData['oauth_verifier']
    };
    
    var message = {
        method: "GET",
        action: "https://twitter.com/oauth/request_token",
        parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: 'dVTYF3gpuAoKcuKemij2h7pne',
            oauth_token: tokenData['oauth_token']
        }
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);

    req= createCORSRequest(request_method, target);
    if (!req) {
      throw new Error('CORS not supported');
    }

    // params.oauth_signature = signature;
    // var stringData = params_to_query(params);
    var stringData = target.slice(message.action.length+1);
    console.log(stringData);
    req.onload = function() {
      if (req.status === 200) {
        // success
        // console.log(JSON.parse(req.responseText));
        console.log(req.responseText);
        data = getUrlVars(req.responseText);
        // data = {
        //     'oauth_token':'bSiwzwAAAAAA3DglAAABX4yBynY',
        //     'oauth_token_secret':'GKaERjU6UAlQVhsubVQLGNPfI4R2LAhD',
        //     'oauth_callback_confirmed':'true'
        // };
        // 遷移先URL
        var aaa = 'https://api.twitter.com/oauth/authorize?oauth_token=' + data['oauth_token'];
        // location.href = aaa;
        // 画面遷移エフェクト（app.js）
        // pageEffect(aaa);
        
      } else {
        // error
        console.log('error');
        console.log(JSON.parse(req.responseText));
      }
    };
    req.setRequestHeader('Authorization','OAuth '+stringData);
    req.send();
}

// url : APIのURL。GETクエリを含むもの
// callBackFunc : コールバック関数　第一引数にAPIアクセスの結果が連想配列のObjectで渡る
// onerror : Functionをセットすると、scriptタグ埋め込みに失敗した時の挙動を定義可
function getTwitterAPI(url, callBackFunc, onerror){
    var parameters = {
        oauth_signature_method: "HMAC-SHA1",
        oauth_consumer_key: CONSUMER['key'],
        oauth_token: ACCESS['key'],
        callback: callBackFunc
    };
    var api_url = url;
    var message = {
        method: "GET",
        action: api_url,
        parameters: parameters
    };
    var secretKeys = {
        "consumerSecret" : CONSUMER['secret'],
        "tokenSecret" : ACCESS['secret']
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, secretKeys);
    var signed_url = OAuth.addToURL(api_url, parameters);

    var ele = document.createElement("script");

    if(is('Function', onerror)){
        ele.onerror = onerror;
    }

    var head = document.getElementsByTagName('head').item(0);
    ele.type = "text/javascript";
    ele.src = signed_url;
    head.appendChild(ele);
}

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

function getUrlVars(urlData) {
    var vars = {}, max = 0, hash = "", array = "";

    //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    hash  = urlData.split('&');    
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');    //keyと値に分割。
        vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
    }

    return JSON.stringify(vars);
}
