// https://syncer.jp/Web/API/Twitter/REST_API/ 参照
// http://atasatamatara.hatenablog.jp/entry/20120330/1333119406 参照
// https://code.google.com/archive/p/oauth/source/default/source から Download内のsha1.js/oauth.jsを取得

// https://qiita.com/mfujita/items/4d808c5648005e74b831 参照
// https://personality-insights-livedemo.mybluemix.net/?cm_mc_uid=35335436541115061314197&cm_mc_sid_50200000=1509891620&cm_mc_sid_52640000=1509892131
// https://github.com/watson-developer-cloud/personality-insights-twitter-python
//　https://www.ibm.com/watson/developercloud/personality-insights/api/v3/?curl#profile


function startTwitterAccess(accessor, message, successFunction, failFunction){

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);

    var req= createCORSRequest(message.method, target);
    if (!req) {
        throw new Error('CORS not supported');
    }
    
    req.onload = function() {
        if (req.status === 200) {
            console.log("success:" + req.responseText);
            successFunction(req.responseText);
        } else {
            // error
            console.log("error:" + req.responseText);
            failFunction(req.responseText);
        }
    };
    req.setRequestHeader('Authorization','OAuth '+ target.slice(message.action.length+1));
    req.send();

}

// get request token
function requestTokenTwitter(){
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

    function successFunction(input){
        var data = getUrlVars(input);
        setLocalStorage(data);
        // 遷移先URL
        var url = 'https://api.twitter.com/oauth/authorize?oauth_token=' + data['oauth_token'];
        location.href = url;
        // 画面遷移エフェクト（app.js）
        pageEffect(url);
    }

    function failFunction(input){}

    startTwitterAccess(accessor, message, successFunction, failFunction);
}

function accessTokenTwitter(token){
    
    var accessor = {
        consumerSecret: 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns',
        tokenSecret: token['oauth_token_secret']
    };
    
    var message = {
        method: "GET",
        action: "https://api.twitter.com/oauth/access_token",
        parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: 'dVTYF3gpuAoKcuKemij2h7pne',
            oauth_token: token['oauth_token'],
            oauth_verifier: token["oauth_verifier"]
        }
    };

    function successFunction(input){
        var data = getUrlVars(input);
        setLocalStorage(data);
    }

    function failFunction(input){}

    startTwitterAccess(accessor, message, successFunction, failFunction);    
}

function settingTwitter(token){

    var accessor = {
        consumerSecret: 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns',
        tokenSecret: token['access_token_secret']
    };
    
    var message = {
        method: "GET",
        action: "https://api.twitter.com/1.1/account/settings.json",
        parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: 'dVTYF3gpuAoKcuKemij2h7pne',
            oauth_token: token['access_token']
        }
    };

    function successFunction(input){
        var data = JSON.parse(input);
        setLocalStorage( {'screen_name': input['screen_name']} );
    }

    function failFunction(input){}
    
    startTwitterAccess(accessor, message, successFunction, failFunction);
}

function timelineTwitter(token,countNum,successFunction,failFunction){
    
    var accessor = {
        consumerSecret: 'HklMSi6axsK4cf6xMDJgJVBbIKueZ4eCbdvZYibZCNXFxlSfns',
        tokenSecret: token['access_token_secret']
    };
    
    var message = {
        method: "GET",
        action: "https://api.twitter.com/1.1/statuses/user_timeline.json",
        parameters: {
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: 'dVTYF3gpuAoKcuKemij2h7pne',
            oauth_token: token['access_token'],
            screen_name: token['screen_name'],
            count: countNum
        }
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);

    var param = '?screen_name=' + token['screen_name'] + '&count=' + countNum;
    req= createCORSRequest(message.method, message.action + param);
    if (!req) {
      throw new Error('CORS not supported');
    }

    var stringData = target.slice(message.action.length+1);
    req.onload = function() {
      if (req.status === 200) {
        successFunction(req.responseText);        
      } else {
        // error
        failFunction(req.responseText);
      }
    };
    req.setRequestHeader('Authorization','OAuth ' + target.slice(message.action.length+1));
    req.send();
}

function getUrlVars(urlData) {
    var vars = [], max = 0, hash = "", array = "";

    //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    hash  = urlData.split('&');    
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');    //keyと値に分割。
        vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
    }

    return vars;
}
