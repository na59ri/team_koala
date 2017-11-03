// 共通部分
var userId = 'zzz_user1';
var scenarioId = 1;
var characterId = 1;
var answerScore = 0;

var authorization = 'YW5kb3U6YW5kb3U=';
var loginName = 'andou';
var loginPass = 'andou';

// tag置き換え
function tagChange(id,tag){
    document.getElementById(id).innerHTML = tag;
} 

//////// エフェクト対応(jquery)
$(window).on('load', function(){
    $('body').removeClass('fadeout');
});

$(function() {
// ハッシュリンク(#)と別ウィンドウでページを開く場合はスルー
  $('a:not([href^="#"]):not([target])').on('click', function(e){
    e.preventDefault(); // ナビゲートをキャンセル
    url = $(this).attr('href'); // 遷移先のURLを取得
    if (url !== '') {
      $('body').addClass('fadeout');  // bodyに class="fadeout"を挿入
      setTimeout(function(){
          window.location = url;  // 0.8秒後に取得したURLに遷移
      }, 800);
    }
    return false;
  });
});

function pageEffect(nextHref){
  if(nextHref !== ''){
      document.getElementsByTagName('body').className = 'fadeout';
      setTimeout(function(){
          window.location = url;  // 0.8秒後に取得したURLに遷移
      }, 800);
  }
}

// encode/decode base64
var base64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function base64encode(s)
{
  var t = '', p = -6, a = 0, i = 0, v = 0, c;

  while ( (i < s.length) || (p > -6) ) {
    if ( p < 0 ) {
      if ( i < s.length ) {
        c = s.charCodeAt(i++);
        v += 8;
      } else {
        c = 0;
      }
      a = ((a&255)<<8)|(c&255);
      p += 8;
    }
    t += base64list.charAt( ( v > 0 )? (a>>p)&63 : 64 )
    p -= 6;
    v -= 6;
  }
  return t;
}

function base64decode(s)
{
  var t = '', p = -8, a = 0, c, d;

  for( var i = 0; i < s.length; i++ ) {
    if ( ( c = base64list.indexOf(s.charAt(i)) ) < 0 )
      continue;
    a = (a<<6)|(c&63);
    if ( ( p += 6 ) >= 0 ) {
      d = (a>>p)&255;
      if ( c != 64 )
        t += String.fromCharCode(d);
      a &= 63;
      p -= 8;
    }
  }
  return t;
}

// Get XMLHttpRequest instance
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

// search kintone recode
function getSearchRecord(url,appId,id,searchJson,successFunction,failFunction,apiToken){
  function successSearchFunction(data){
    if(compareSearchData(searchJson,data)){
      successFunction(data);
    }else{
      getSearchRecord(url,appId,++id,searchJson,successFunction,failFunction,apiToken);
    }
  }
  function failSearchFunction(data){
    failFunction(data);
  }

  var params = '?app=' + appId + '&id=' + id;
  getRecord(url+params,successSearchFunction,failSearchFunction,apiToken);
}

function compareSearchData(searchJson,data){
  var flag = true;
  var searchArray = Object.keys(searchJson);
  for(var i=0;i<searchArray.length;i++){
    console.log('searchArray:'+searchArray[i]+', searchJson:'+searchJson[searchArray[i]]+', data:'+data['record'][searchArray[i]]['value']);
    if(searchJson[searchArray[i]] !== data['record'][searchArray[i]]['value']){
      console.log('compareSearchData false');
      flag = false;
      break;
    }
  }
  return flag;
}

// Get kintone recode
function getRecord(url,successFunction,failFunction,apiToken){
    console.log(url+' : '+apiToken);
    req= createCORSRequest('GET', url);
    if (!req) {
      throw new Error('CORS not supported');
    }

    req.onload = function() {
      if (req.status === 200) {
        // success
        console.log(JSON.parse(req.responseText));
        successFunction(JSON.parse(req.responseText));
      } else {
        // error
        console.log(JSON.parse(req.responseText));
        failFunction(JSON.parse(req.responseText));
      }
    };
    
  req.setRequestHeader('X-Cybozu-API-Token',apiToken);
  req.send();
}

// Get dataspider recode
function getStudy() {
  var hostUrl= 'https://dev01.dstn.club/dataspider/trigger/study';
  var param1 = "user";
  var param2 = "1";
  var param3 = "1";
  var data3 = {"userid" : param1, "questionid" : param2, "ansid":param3 };

  req= createCORSRequest('POST', hostUrl);
  if (!req) {
    throw new Error('CORS not supported');
  }

  req.onload = function() {
    if (req.status === 200) {
      // success
      console.log(JSON.parse(req.responseText));
    } else {
      // error
      console.log('error');
      console.log(JSON.parse(req.responseText));
    }
  };
  
  req.setRequestHeader('Content-Type','application/json');
  req.setRequestHeader('X-HTTP-Method-Override','POST');
  req.setRequestHeader('dataType','json');
  req.send(JSON.stringify(data3));
}

// Register kintone recode
function postRecord(url,jsonData,successFunction,failFunction){
  console.log(url+' : '+authorization);
  req= createCORSRequest('POST', url);
  if (!req) {
    throw new Error('CORS not supported');
  }

  req.onload = function() {
    if (req.status === 200) {
      // success
      console.log(JSON.parse(req.responseText));
      successFunction(JSON.parse(req.responseText));
    } else {
      // error
      console.log(JSON.parse(req.responseText));
      failFunction(JSON.parse(req.responseText));
    }
  };
  
  // req.setRequestHeader('X-Cybozu-API-Token',apiToken);
  req.setRequestHeader('X-Cybozu-Authorization',authorization);
  req.setRequestHeader('Content-Type','application/json');
  req.send(JSON.stringify(jsonData));
}

// ファイル書き込み処理：未確認
// https://www.neontribe.co.uk/cordova-file-plugin-examples/
function getStorageData(jsonFileName){
  function readFromFile(fileName, cb) {
    var pathToFile = cordova.file.dataDirectory + fileName;
    window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                cb(JSON.parse(this.result));
            };

            reader.readAsText(file);
        }, errorHandler.bind(null, fileName));
    }, errorHandler.bind(null, fileName));
  }

  var fileData;
  readFromFile(jsonFileName, function (data) {
      fileData = data;
  });

  // return 
  return fileData;
}

function setStorageData(fileName, data){
  data = JSON.stringify(data, null, '\t');
  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
      directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
          fileEntry.createWriter(function (fileWriter) {
              fileWriter.onwriteend = function (e) {
                  // for real-world usage, you might consider passing a success callback
                  console.log('Write of file "' + fileName + '"" completed.');
              };

              fileWriter.onerror = function (e) {
                  // you could hook this up with our global error handler, or pass in an error callback
                  console.log('Write failed: ' + e.toString());
              };

              var blob = new Blob([data], { type: 'text/plain' });
              fileWriter.write(blob);
          }, errorHandler.bind(null, fileName));
      }, errorHandler.bind(null, fileName));
  }, errorHandler.bind(null, fileName));
}

var errorHandler = function (fileName, e) {  
  var msg = '';

  switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
          msg = 'Storage quota exceeded';
          break;
      case FileError.NOT_FOUND_ERR:
          msg = 'File not found';
          break;
      case FileError.SECURITY_ERR:
          msg = 'Security error';
          break;
      case FileError.INVALID_MODIFICATION_ERR:
          msg = 'Invalid modification';
          break;
      case FileError.INVALID_STATE_ERR:
          msg = 'Invalid state';
          break;
      default:
          msg = 'Unknown error';
          break;
  };

  console.log('Error (' + fileName + '): ' + msg);
}