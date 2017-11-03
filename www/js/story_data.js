// parameter設定
var url = 'https://401wo.cybozu.com/k/guest/1/v1/record.json';
var initialData = '?app=19&id=1';
var initialScenarioId = 1;
var sex = '男';
var getAppId = 19;
var getApiToken = 'p032PfITGt3TlGzttvRjfQxkeehxdeoGoY2mhE61';
var setAppId = 22;
var setApiToken = 'KdgX51XX2B5XJXdmxlIPgFGDmD31l6YymQahTKbU';

var interviewData = [{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/cosplay-851050_640.jpg",
    "questionid":'1',
    "question":"あなたは意中のAさんとLineを交換しました。最初にどのようなLineを送りますか？",
    "anslist":[
        {"ansid":'1',"ans":"礼儀正しく最初に自己紹介を述べる（初めまして〜です。出身は〜で）"},
        {"ansid":'2',"ans":"フランクな短文メッセージを送る（こんにちは、よろしく）"},
        {"ansid":'3',"ans":"メッセージを待つ"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/scissors-33117_640.png",
    "questionid":'2',
    "question":"AさんからLineで髪を切った時の自撮り写真が送られてきました。しかし前の髪型のほうが好みです。どのようにLineを返しますか？",
    "anslist":[
        {"ansid":'1',"ans":"嘘をついて今の髪型を褒める"},
        {"ansid":'2',"ans":"正直に前の髪型が好みだと伝える"},
        {"ansid":'3',"ans":"ARで合成する"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/moe-595960_640.png",
    "questionid":'3',
    "question":"Aさんに電話をかけますか？",
    "anslist":[
        {"ansid":'1',"ans":"Lineを続ける"},
        {"ansid":'2',"ans":"理由をつくって電話をかける"},
        {"ansid":'3',"ans":"電話をしたいと伝えて電話をかける"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/girl-1350245_640.jpg",
    "questionid":'4',
    "question":"電話先でAさんが悩み事で落ち込んでいます。どのように対応しますか？",
    "anslist":[
        {"ansid":'1',"ans":"話を聞いてあげて解決策を提案する"},
        {"ansid":'2',"ans":"とりあえず、うんうんと聞いてあげる"},
        {"ansid":'3',"ans":"テンションを上げて自分のニート歴を伝え、元気を出させる"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/casal-1818171_640.png",
    "questionid":'5',
    "question":"デートに行くことになりました。何時からどこへ誘いますか？",
    "anslist":[
        {"ansid":'1',"ans":"朝から一日中、遊園地や水族館などがっつりデート"},
        {"ansid":'2',"ans":"昼から近場でランチやお買い物デート"},
        {"ansid":'3',"ans":"お気に入りアニメの聖地巡礼に誘う"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/moe-573290_640.png",
    "questionid":'6',
    "question":"Aさんとランチに行きます。Aさんが待ち合わせ時間を過ぎても来ません。どうしますか？",
    "anslist":[
        {"ansid":'1',"ans":"とりあえず気長に待つ"},
        {"ansid":'2',"ans":"今どこにいるかLineか電話で聞く"},
        {"ansid":'3',"ans":"自宅サーバにログインして昨日見逃したアニメを見る"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/casal-1818171_640.png",
    "questionid":'7',
    "question":"Aさんとカフェに来ています。話が盛り上がっていません。なんの話題で盛り上げますか？",
    "anslist":[
        {"ansid":'1',"ans":"Aさんのことを聞き、それにリアクションする"},
        {"ansid":'2',"ans":"自分の趣味などの話をする"},
        {"ansid":'3',"ans":"コミケの話をする"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/lovers-2761553_640.png",
    "questionid":'8',
    "question":"Aさんと花火に来ています。Aさんが買った唐揚げを落としてしまいました。どのように対応しますか？",
    "anslist":[
        {"ansid":'1',"ans":"優しく新しいものを買ってあげる"},
        {"ansid":'2',"ans":"落としたことをいじって笑いに変える"},
        {"ansid":'3',"ans":"とりあえずコミケの話をする"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/moe-595956_640.png",
    "questionid":'9',
    "question":"ディナーを食べ終わったあと、Aさんが半額だそうとしています。どうしますか？",
    "anslist":[
        {"ansid":'1',"ans":"半額受け取る"},
        {"ansid":'2',"ans":"受け取らず全額おごる"},
        {"ansid":'3',"ans":"全額求める"}
    ]
},{
    "image":"https://s3-ap-northeast-1.amazonaws.com/dev-box-bitriver-s3/red2017/sydney-2148908_640.jpg",
    "questionid":'10',
    "question":"デートの終わりに二人きりで港で船を眺めていい雰囲気になっています。どうしますか",
    "anslist":[
        {"ansid":'1',"ans":"何もせず、次回に持ち越す"},
        {"ansid":'2',"ans":"好きであることを伝える。または匂わせる。"},
        {"ansid":'3',"ans":"とりあえず抱きしめる"}
    ]
},
];

var nextHref="eva.html";