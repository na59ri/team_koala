// parameter設定
var nextHref = 'index_start.html';

// 起動時読み込み(window.onload)
window.onload = function(){
    initialAccess();
} 

// 初回アクセス
function initialAccess(){
    
}

// 「スタート！」ボタン選択時
function nextClick(){
    // 遷移先URL
    location.href = nextHref;
    // 画面遷移エフェクト（app.js）
    pageEffect(nextHref);
}
