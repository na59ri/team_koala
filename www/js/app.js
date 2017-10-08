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
