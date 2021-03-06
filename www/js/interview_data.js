// parameter設定
var url = 'https://401wo.cybozu.com/k/guest/1/v1/record.json';
var initialScenarioId = 1;
var sex = '女';
var getAppId = 19;
var getApiToken = 'p032PfITGt3TlGzttvRjfQxkeehxdeoGoY2mhE61';
var postAppId = 22;
var postApiToken = 'KdgX51XX2B5XJXdmxlIPgFGDmD31l6YymQahTKbU';

var spiderUrl = 'https://dev01.dstn.club/dataspider/trigger/url';

// parameter設定
var interviewData = [{
    "image":"images/woman_test1.png",
    "questionid":'1',
    "question":"あなたは意中のB君とLineを交換しました。最初にどのようにLineをしますか?",
    "anslist":[
        {"ansid":'1',"ans":"B君スタートで礼儀正しく最初に自己紹介をし合う（初めまして〜です。出身は〜で）"},
        {"ansid":'2',"ans":"B君スタートでフランクな短文メッセージを送り合い、徐々にお互いのことを知っていく（こんにちは、よろしく）"},
        {"ansid":'3',"ans":"自分からメッセージを送る"}
    ]
},{
    "image":"images/woman_test3.png",
    "questionid":'2',
    "question":"あなたはLineで髪を切った時の自撮り写真を送りました。もしB君が前の髪型のほうが好みだとするとどのように返してほしいですか？",
    "anslist":[
        {"ansid":'1',"ans":"嘘をついて今の髪型を褒めてほしい"},
        {"ansid":'2',"ans":"正直に前の髪型が好みだと伝えてほしい"},
        {"ansid":'3',"ans":"ARで合成して、とりあえずふざけてほしい"}
    ]
},{
    "image":"images/story2.png",
    "questionid":'3',
    "question":"B君と電話をしますか？",
    "anslist":[
        {"ansid":'1',"ans":"Lineを続ける"},
        {"ansid":'2',"ans":"理由をつくって電話をかけてほしい"},
        {"ansid":'3',"ans":"電話をしたいと伝えて電話をかけてほしい"}
    ]
},{
    "image":"images/story3.png",
    "questionid":'4',
    "question":"B君と電話中です。あなたは悩み事で落ち込んでおり、その話をB君にしました。どのような対応が嬉しいですか？",
    "anslist":[
        {"ansid":'1',"ans":"話を聞いて、解決策を提案する"},
        {"ansid":'2',"ans":"とりあえず、うんうんと聞いてくれる"},
        {"ansid":'3',"ans":"テンションを上げて自虐ネタで元気を出させようとしてくれる"}
    ]
},{
    "image":"images/story4.png",
    "questionid":'5',
    "question":"デートに行くことになりました。どんなデートが良いですか？",
    "anslist":[
        {"ansid":'1',"ans":"朝から一日中、遊園地や水族館などがっつりデート"},
        {"ansid":'2',"ans":"昼から近場でランチやお買い物デート"},
        {"ansid":'3',"ans":"お気に入りアニメの聖地巡礼に連れて行かれる"}
    ]
},{
    "image":"images/story5.png",
    "questionid":'6',
    "question":"B君とランチに行きます。あなたは待ち合わせに遅刻しています。B君にどのように伝えますか？",
    "anslist":[
        {"ansid":'1',"ans":"伝えない。とりあえず待っていてほしい"},
        {"ansid":'2',"ans":"今どこにいるかLineか電話で聞かれたら答える"},
        {"ansid":'3',"ans":"自宅サーバにログインして昨日見逃したアニメを見といてほしい"}
    ]
},{
    "image":"images/story4.png",
    "questionid":'7',
    "question":"B君とカフェに来ています。話が盛り上がっていません。B君にしてほしい対応は？",
    "anslist":[
        {"ansid":'1',"ans":"いろいろ質問してほしい"},
        {"ansid":'2',"ans":"B君の趣味などの話を聞きたい"},
        {"ansid":'3',"ans":"コミケの話をしたい"}
    ]
},{
    "image":"images/story7.png",
    "questionid":'8',
    "question":"B君と花火に来ています。あなたは買った唐揚げを落としてしまいました。嬉しい対応は？",
    "anslist":[
        {"ansid":'1',"ans":"優しく新しいものを買ってくれる"},
        {"ansid":'2',"ans":"落としたことをいじって笑いに変えてくれる"},
        {"ansid":'3',"ans":"とりあえずコミケの話をしてくれる"}
    ]
},{
    "image":"images/story8.png",
    "questionid":'9',
    "question":"ディナーを食べ終わったあと、お会計での理想の形は？",
    "anslist":[
        {"ansid":'1',"ans":"割り勘"},
        {"ansid":'2',"ans":"全額おごってもらう"},
        {"ansid":'3',"ans":"全額おごらせてもらう"}
    ]
},{
    "image":"images/story9.png",
    "questionid":'10',
    "question":"デートの終わりに二人きりで港で船を眺めていい雰囲気になっています。どうしますか",
    "anslist":[
        {"ansid":'1',"ans":"何もせず、次回に持ち越す"},
        {"ansid":'2',"ans":"好きであることを伝える。または匂わせる"},
        {"ansid":'3',"ans":"とりあえず抱きしめられたい"}
    ]
},
];

var nextHref="index_start.html";