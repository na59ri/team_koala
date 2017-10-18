// 共通部分

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

var loginName = '';
var loginPass = '';
var authorization = '';
var requestHeader ={
    url: "https://401wo.cybozu.com/k/guest/1/v1/record.json",
    method: "GET",
    headers: {
      "X-Cybozu-Authorization": authorization,
      "Content-Type": "application/json"
    },
    params: {
      "app": 22
    }
};
var request = new XMLHttpRequest();
var data = '?app=22&id=26';
// var url = 'https://401wo.cybozu.com/k/v1/record.json'+data;
var url = 'https://401wo.cybozu.com/k/guest/1/v1/record.json'+data;
// function login_request(){
    
//     authorization = base64encode(loginName+':'+loginPass);
    
//     request.open('GET', url);
//     request.onreadystatechange = function(){
//         if(request.readyState == 4){
//             if(request.status == 200){
//                 alert("Successfully logged in");                
//             }else{
//                 // alert("Login name or password is incorrect.");                
//                 alert('response:'+request.status);
//             }
//         }
//     }
//     request.setRequestHeader('Host','401wo.cybozu.com:443');
//     request.setRequestHeader('X-Cybozu-Authorization',authorization);
//     request.setRequestHeader('Authorization','Basic '+authorization);
//     request.setRequestHeader('Content-Type','application/json');
//     request.send(data);
// }
function login_request(){
    authorization = base64encode(loginName+':'+loginPass);
    request.open('GET', url);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.onreadystatechange = function() {
        if(request.readyState == 4){
            alert('response:'+request.status);
            if (request.status == 200) {
                // success
                alert(JSON.parse(request.responseText));
            } else {
                // error
                alert(JSON.parse(request.responseText));
            }
        }
    };
    // request.setRequestHeader('Host','401wo.cybozu.com:443');
    // request.setRequestHeader('X-Cybozu-Authorization',authorization);
    // request.setRequestHeader('Authorization','Basic '+authorization);
    // request.setRequestHeader('Content-Type','application/json');
    request.send();
}