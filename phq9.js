/* =========================================================
   PART 2
   i18n + PHQ-9题库 + 全局状态管理
========================================================= */

/* ==========================
   Global State
========================== */

const state = {
    language: detectLanguage(),
    currentQuestion: 0,
    answers: [],
    startedAt: null,
    finishedAt: null,
    score: 0,
    level: "",
    levelClass: "",
    q9Risk: false
};

/* ==========================
   Language Detection
========================== */

function detectLanguage(){

    const saved = localStorage.getItem("phq9_language");

    if(saved){
        return saved;
    }

    const browser = navigator.language || "en";

    if(browser.startsWith("zh-CN")) return "zh-CN";
    if(browser.startsWith("zh")) return "zh-TW";
    if(browser.startsWith("ja")) return "ja";

    return "en";
}

/* ==========================
   Official PHQ-9
========================== */

const PHQ9_KEYS = [
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "q8",
    "q9"
];

/* ==========================
   Translation Data
========================== */

const i18n = {

"zh-CN": {

    siteTitle: "PHQ-9 抑郁筛查",

    homeTitle: "PHQ-9 抑郁筛查",

    homeDescription:
        "PHQ-9 是广泛使用的抑郁症状筛查量表。本测评基于官方 PHQ-9 标准问卷，可用于初步了解近期心理状态。",

    noticeTitle: "注意事项",

    noticeItems: [
        "本测评仅供心理健康筛查参考。",
        "测评结果不能替代医生诊断。",
        "请根据最近两周内的实际情况作答。",
        "请在安静环境中独立完成测评。"
    ],

    agreement:
        "我已阅读并理解本测评仅供心理健康筛查参考，不能替代专业医疗诊断。",

    start: "开始测评",

    resultTitle: "测评结果",

    summaryTitle: "结果说明",

    adviceTitle: "建议",

    export: "导出 PDF",

    restart: "重新作答",

    loading: "正在计算结果...",

    exportTitle: "导出选项",

    cancel: "取消",

    print: "打印",

    riskTitle: "风险提示",

    riskContent:
        "您在第9题中选择了非零选项，表示近期可能存在自伤、自杀相关想法。请认真关注自身状态。",

    answers: [
        {
            label:"完全没有",
            desc:"过去两周从未出现"
        },
        {
            label:"几天",
            desc:"过去两周偶尔出现"
        },
        {
            label:"一半以上天数",
            desc:"过去两周频繁出现"
        },
        {
            label:"几乎每天",
            desc:"过去两周持续出现"
        }
    ],

    questions: [

        "做事时提不起劲或没有兴趣",

        "感到心情低落、沮丧或绝望",

        "入睡困难、睡不安稳或睡眠过多",

        "感觉疲倦或没有活力",

        "食欲不振或吃太多",

        "觉得自己很糟，或觉得自己很失败，让自己或家人失望",

        "对事物专注有困难，例如阅读报纸或看电视时",

        "动作或说话速度缓慢到别人已经察觉，或者刚好相反——烦躁或坐立不安",

        "觉得自己不如死掉，或用某种方式伤害自己"
    ]
},

/* ==========================
   Traditional Chinese
========================== */

"zh-TW": {

    siteTitle:"PHQ-9 憂鬱篩查",

    homeTitle:"PHQ-9 憂鬱篩查",

    homeDescription:
        "PHQ-9 是常用的憂鬱症狀篩查量表，可用於初步了解近期心理狀態。",

    noticeTitle:"注意事項",

    noticeItems:[
        "本測評僅供心理健康篩查參考。",
        "結果不能取代醫師診斷。",
        "請依最近兩週狀況作答。",
        "請獨立完成測評。"
    ],

    agreement:
        "我已閱讀並理解本測評僅供篩查參考，不能取代專業診斷。",

    start:"開始測評",

    resultTitle:"測評結果",

    summaryTitle:"結果說明",

    adviceTitle:"建議",

    export:"匯出 PDF",

    restart:"重新作答",

    loading:"正在計算結果...",

    exportTitle:"匯出選項",

    cancel:"取消",

    print:"列印",

    riskTitle:"風險提示",

    riskContent:
        "您在第9題中選擇了非零選項，代表近期可能存在自傷相關想法。",

    answers:[
        {label:"完全沒有",desc:"過去兩週從未出現"},
        {label:"幾天",desc:"偶爾出現"},
        {label:"一半以上天數",desc:"頻繁出現"},
        {label:"幾乎每天",desc:"持續出現"}
    ],

    questions:[
        "做事時提不起勁或沒有興趣",
        "感到心情低落、沮喪或絕望",
        "入睡困難、睡眠不安穩或睡太多",
        "感到疲倦或缺乏活力",
        "食慾不振或吃太多",
        "覺得自己很糟或讓家人失望",
        "難以專注閱讀或看電視",
        "動作或說話變慢，或相反地煩躁不安",
        "覺得自己不如死掉或傷害自己"
    ]
},

/* ==========================
   Japanese
========================== */

"ja": {

    siteTitle:"PHQ-9 うつ病スクリーニング",

    homeTitle:"PHQ-9 うつ病スクリーニング",

    homeDescription:
        "PHQ-9は広く利用されている抑うつ症状評価尺度です。",

    noticeTitle:"注意事項",

    noticeItems:[
        "本結果は参考目的です。",
        "医師の診断を代替するものではありません。",
        "過去2週間について回答してください。",
        "静かな環境で回答してください。"
    ],

    agreement:
        "本検査が医療診断の代替ではないことを理解しました。",

    start:"開始",

    resultTitle:"結果",

    summaryTitle:"概要",

    adviceTitle:"アドバイス",

    export:"PDF出力",

    restart:"再受験",

    loading:"結果を計算中...",

    exportTitle:"出力オプション",

    cancel:"キャンセル",

    print:"印刷",

    riskTitle:"警告",

    riskContent:
        "第9問で0以外を選択しました。自傷に関する考えが存在する可能性があります。",

    answers:[
        {label:"まったくない",desc:"0点"},
        {label:"数日",desc:"1点"},
        {label:"半分以上の日",desc:"2点"},
        {label:"ほぼ毎日",desc:"3点"}
    ],

    questions:[
        "物事に興味や喜びを感じない",
        "気分が落ち込む、憂うつになる",
        "寝つきが悪い、または眠りすぎる",
        "疲れやすい",
        "食欲がない、または食べ過ぎる",
        "自分は失敗者だと思う",
        "集中することが難しい",
        "動作が遅い、または落ち着かない",
        "死んだ方がましだと思う"
    ]
},

/* ==========================
   English
========================== */

"en": {

    siteTitle:"PHQ-9 Depression Screening",

    homeTitle:"PHQ-9 Depression Screening",

    homeDescription:
        "PHQ-9 is a widely used depression screening questionnaire.",

    noticeTitle:"Important Notice",

    noticeItems:[
        "Screening purpose only.",
        "Not a medical diagnosis.",
        "Answer based on the last two weeks.",
        "Complete independently."
    ],

    agreement:
        "I understand this screening cannot replace professional diagnosis.",

    start:"Start Assessment",

    resultTitle:"Results",

    summaryTitle:"Summary",

    adviceTitle:"Advice",

    export:"Export PDF",

    restart:"Restart",

    loading:"Calculating...",

    exportTitle:"Export Options",

    cancel:"Cancel",

    print:"Print",

    riskTitle:"Risk Alert",

    riskContent:
        "You selected a non-zero response for question 9.",

    answers:[
        {label:"Not at all",desc:"0 points"},
        {label:"Several days",desc:"1 point"},
        {label:"More than half the days",desc:"2 points"},
        {label:"Nearly every day",desc:"3 points"}
    ],

    questions:[
        "Little interest or pleasure in doing things",
        "Feeling down, depressed, or hopeless",
        "Trouble sleeping or sleeping too much",
        "Feeling tired or having little energy",
        "Poor appetite or overeating",
        "Feeling bad about yourself",
        "Trouble concentrating",
        "Moving slowly or being restless",
        "Thoughts of self-harm or death"
    ]
}

};

/* ==========================
   PHQ-9 Severity
========================== */

const SCORE_LEVELS = [
    {
        min:0,
        max:4,
        key:"none",
        className:"level-none"
    },
    {
        min:5,
        max:9,
        key:"light",
        className:"level-light"
    },
    {
        min:10,
        max:14,
        key:"moderate",
        className:"level-moderate"
    },
    {
        min:15,
        max:19,
        key:"moderately-severe",
        className:"level-moderately-severe"
    },
    {
        min:20,
        max:27,
        key:"severe",
        className:"level-severe"
    }
];

/* ==========================
   Advice Text
========================== */

const ADVICE = {

    "zh-CN":{
        none:"目前未发现明显抑郁症状。",
        light:"存在轻度抑郁倾向，建议关注作息。",
        moderate:"建议重视情绪变化并寻求帮助。",
        "moderately-severe":"症状较明显，建议尽快咨询专业人士。",
        severe:"症状严重，建议尽快寻求专业评估。"
    },

    "zh-TW":{
        none:"未發現明顯憂鬱症狀。",
        light:"存在輕度傾向。",
        moderate:"建議重視情緒變化。",
        "moderately-severe":"建議盡快諮詢專業人士。",
        severe:"建議立即尋求專業協助。"
    },

    "ja":{
        none:"顕著な抑うつ症状は認められません。",
        light:"軽度の傾向があります。",
        moderate:"状態に注意してください。",
        "moderately-severe":"専門家への相談を推奨します。",
        severe:"早急な専門的評価を推奨します。"
    },

    "en":{
        none:"No significant depressive symptoms detected.",
        light:"Mild depressive symptoms may exist.",
        moderate:"Consider paying attention to mood changes.",
        "moderately-severe":"Professional consultation is recommended.",
        severe:"Professional assessment is strongly recommended."
    }

};

const STATIC_COPY = {
    "zh-CN": {
        status: "筛查工具", introKicker: "01 / 心理状态自检", introTitle: "给情绪一个<br><em>被看见的机会。</em>", introCopy: "用九个问题，温和地了解过去两周的状态。答案只用于本次测评，不会被记录或保存。", startLabel: "从这里开始", questionTag: "02 / 开始答题", questionNote: "一步一步来", resultTag: "03 / 你的结果", resultNote: "请留给自己", resultLabel: "结果已生成", previous: "上一题", pdfScore: "总分", pdfLevel: "风险等级", pdfChart: "环形图", pdfAdvice: "建议", pdfTime: "测评时间", footerNote: "照顾好自己的心情。"
    },
    "zh-TW": {
        status: "篩查工具", introKicker: "01 / 心理狀態自我檢視", introTitle: "給情緒一個<br><em>被看見的機會。</em>", introCopy: "用九個問題，溫和地了解過去兩週的狀態。答案只用於本次測評，不會被記錄或保存。", startLabel: "從這裡開始", questionTag: "02 / 開始答題", questionNote: "一步一步來", resultTag: "03 / 你的結果", resultNote: "請留給自己", resultLabel: "結果已生成", previous: "上一題", pdfScore: "總分", pdfLevel: "風險等級", pdfChart: "環形圖", pdfAdvice: "建議", pdfTime: "測評時間", footerNote: "好好照顧自己的心情。"
    },
    "ja": {
        status: "スクリーニングツール", introKicker: "01 / 心の状態を確認", introTitle: "気持ちに<br><em>気づく時間を。</em>", introCopy: "9つの質問で、過去2週間の状態を穏やかに確認します。回答は今回の評価にのみ使用され、保存されません。", startLabel: "ここから始める", questionTag: "02 / 質問", questionNote: "一歩ずつ進めます", resultTag: "03 / あなたの結果", resultNote: "自分のために", resultLabel: "結果が出ました", previous: "前の質問", pdfScore: "合計スコア", pdfLevel: "リスクレベル", pdfChart: "円グラフ", pdfAdvice: "アドバイス", pdfTime: "評価日時", footerNote: "心を大切に。"
    },
    "en": {
        status: "SCREENING TOOL", introKicker: "01 / MENTAL HEALTH CHECK-IN", introTitle: "Make room for<br><em>what you feel.</em>", introCopy: "Use nine questions to gently reflect on the past two weeks. Your answers are used only for this assessment and are not saved.", startLabel: "START HERE", questionTag: "02 / QUESTIONS", questionNote: "ONE STEP AT A TIME", resultTag: "03 / YOUR REFLECTION", resultNote: "KEEP THIS FOR YOURSELF", resultLabel: "THE RESULT IS IN", previous: "PREVIOUS", pdfScore: "Total score", pdfLevel: "Risk level", pdfChart: "Donut chart", pdfAdvice: "Advice", pdfTime: "Assessment time", footerNote: "Take care of your mind."
    }
};

/* =========================================================
   PART 3
   页面渲染 + 语言切换 + 首页逻辑 + 答题流程
========================================================= */

/* ==========================
   DOM References
========================== */

const homePage = document.getElementById("homePage");
const questionPage = document.getElementById("questionPage");
const resultPage = document.getElementById("resultPage");
const loadingPage = document.getElementById("loadingPage");

const siteTitle = document.getElementById("siteTitle");
const homeTitle = document.getElementById("homeTitle");
const homeDescription = document.getElementById("homeDescription");
const noticeTitle = document.getElementById("noticeTitle");
const noticeList = document.getElementById("noticeList");

const agreementCheckbox =
    document.getElementById("agreementCheckbox");

const agreementText =
    document.getElementById("agreementText");

const startButton =
    document.getElementById("startButton");

const questionCounter =
    document.getElementById("questionCounter");

const progressPercent =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

const questionText =
    document.getElementById("questionText");

const answerList =
    document.getElementById("answerList");

const loadingText =
    document.getElementById("loadingText");

const previousButton =
    document.getElementById("previousButton");

const staticElements = {
    status: document.getElementById("statusText"),
    introKicker: document.querySelector(".page-intro .kicker"),
    introTitle: document.querySelector(".page-intro h1"),
    introCopy: document.querySelector(".intro-copy"),
    questionTag: document.querySelectorAll(".section-tag span")[0],
    questionNote: document.querySelectorAll(".section-tag span")[1],
    resultTag: document.querySelectorAll(".section-tag span")[2],
    resultNote: document.querySelectorAll(".section-tag span")[3],
    resultLabel: document.querySelector("#resultPage .mini-label"),
    startLabel: document.querySelector("#homePage > .mini-label"),
    previous: document.getElementById("previousButton"),
    footerNote: document.getElementById("footerNote"),
    pdfScore: document.getElementById("pdfScoreText"),
    pdfLevel: document.getElementById("pdfLevelText"),
    pdfChart: document.getElementById("pdfChartText"),
    pdfAdvice: document.getElementById("pdfAdviceText"),
    pdfTime: document.getElementById("pdfTimeText")
};

const exportTitleElement = document.getElementById("exportTitle");
const cancelExportElement = document.getElementById("cancelExport");
const confirmExportElement = document.getElementById("confirmExport");

/* ==========================
   Helpers
========================== */

function t() {
    return i18n[state.language];
}

function hideAllPages() {

    homePage.classList.add("hidden");
    questionPage.classList.add("hidden");
    resultPage.classList.add("hidden");
    loadingPage.classList.add("hidden");
}

function showPage(page) {

    hideAllPages();

    page.classList.remove("hidden");

    page.classList.add("fade-in");
}

function resetState() {

    state.currentQuestion = 0;
    state.answers = [];
    state.startedAt = null;
    state.finishedAt = null;
    state.score = 0;
    state.level = "";
    state.levelClass = "";
    state.q9Risk = false;
}

/* ==========================
   Apply Language
========================== */

function applyLanguage() {

    const lang = t();
    const copy = STATIC_COPY[state.language];

    document.documentElement.lang =
        state.language;

    siteTitle.textContent =
        lang.siteTitle;

    homeTitle.textContent =
        lang.homeTitle;

    homeDescription.textContent =
        lang.homeDescription;

    noticeTitle.textContent =
        lang.noticeTitle;

    agreementText.textContent =
        lang.agreement;

    startButton.textContent =
        lang.start;

    loadingText.textContent =
        lang.loading;

    Object.entries(staticElements).forEach(([key, element]) => {
        if (element && copy[key] && key !== "introTitle") {
            element.innerHTML = copy[key];
        }
    });

    const introTitleParts = copy.introTitle
        .replace(/<br\s*\/?>/i, "|")
        .replace(/<[^>]+>/g, "")
        .split("|");

    const introTitleLines = staticElements.introTitle.querySelectorAll(".typing-line");
    introTitleLines.forEach((line, index) => {
        line.dataset.text = introTitleParts[index] || "";
    });
    staticElements.introTitle.setAttribute("aria-label", introTitleParts.join(""));

    exportTitleElement.textContent = lang.exportTitle;
    cancelExportElement.textContent = lang.cancel;
    confirmExportElement.textContent = lang.print;

    renderNoticeItems();

    updateLanguageButtons();

    localStorage.setItem(
        "phq9_language",
        state.language
    );

    if(
        !questionPage.classList.contains("hidden")
    ){
        renderQuestion();
    }

    if(window.resetTypingTitles){
        window.resetTypingTitles();
    }
}

function renderNoticeItems() {

    const lang = t();

    noticeList.innerHTML = "";

    lang.noticeItems.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        noticeList.appendChild(li);

    });
}

function updateLanguageButtons() {

    document
        .querySelectorAll(".lang-btn")
        .forEach(btn => {

            btn.classList.remove("active");

            if(
                btn.dataset.lang ===
                state.language
            ){
                btn.classList.add("active");
            }

        });
}

/* ==========================
   Language Events
========================== */

document
.querySelectorAll(".lang-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            state.language =
                button.dataset.lang;

            applyLanguage();

        }
    );

});

/* ==========================
   Agreement
========================== */

agreementCheckbox.addEventListener(
    "change",
    () => {

        startButton.disabled =
            !agreementCheckbox.checked;

    }
);

/* ==========================
   Start Test
========================== */

startButton.addEventListener(
    "click",
    startAssessment
);

function startAssessment() {

    resetState();

    state.startedAt =
        new Date();

    showPage(questionPage);

    renderQuestion();
}

/* ==========================
   Question Rendering
========================== */

function renderQuestion() {

    const lang = t();

    const index =
        state.currentQuestion;

    const total =
        PHQ9_KEYS.length;

    const percent =
        Math.round(
            ((index + 1) / total) * 100
        );

    questionCounter.textContent =
        `${index + 1} / ${total}`;

    progressPercent.textContent =
        `${percent}%`;

    progressFill.style.width =
        `${percent}%`;

    questionText.textContent =
        lang.questions[index];

    answerList.innerHTML = "";

    lang.answers.forEach(
        (answer, score) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";

            button.className =
                "answer-btn slide-in";

            if (state.answers[index] === score) {
                button.classList.add("selected");
            }

            button.setAttribute(
                "aria-label",
                answer.label
            );

            button.innerHTML = `
                <div class="answer-label">
                    ${answer.label}
                </div>

                <div class="answer-desc">
                    ${answer.desc}
                </div>
            `;

            button.addEventListener(
                "click",
                () => {

                    submitAnswer(score);

                }
            );

            answerList.appendChild(
                button
            );

        }
    );

    previousButton.disabled = index === 0;
}

/* ==========================
   Keyboard Navigation
========================== */

document.addEventListener(
    "keydown",
    event => {

        if(
            questionPage.classList.contains(
                "hidden"
            )
        ){
            return;
        }

        const key = event.key;

        if(
            key === "1"
        ){
            submitAnswer(0);
        }

        if(
            key === "2"
        ){
            submitAnswer(1);
        }

        if(
            key === "3"
        ){
            submitAnswer(2);
        }

        if(
            key === "4"
        ){
            submitAnswer(3);
        }

    }
);

/* ==========================
   Answer Submit
========================== */

function submitAnswer(score) {

    state.answers[state.currentQuestion] = score;

    if(
        state.currentQuestion === 8 &&
        score > 0
    ){
        state.q9Risk = true;
    }

    state.currentQuestion++;

    if(
        state.currentQuestion >=
        PHQ9_KEYS.length
    ){

        finishAssessment();

        return;
    }

    renderQuestion();
}

previousButton.addEventListener("click", () => {
    if (state.currentQuestion === 0) {
        return;
    }

    state.currentQuestion--;
    state.q9Risk = state.answers[8] > 0;
    renderQuestion();
});

/* ==========================
   Finish Assessment
========================== */

function finishAssessment() {

    state.finishedAt =
        new Date();

    showPage(loadingPage);

    setTimeout(() => {

        calculateResults();

    }, 800);

}

/* ==========================
   Restart
========================== */

const restartButton =
    document.getElementById(
        "restartButton"
    );

restartButton.addEventListener(
    "click",
    () => {

        agreementCheckbox.checked =
            false;

        startButton.disabled = true;

        resetState();

        showPage(homePage);

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }
);

/* ==========================
   Accessibility
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyLanguage();

        showPage(homePage);

    }
);

/* =========================================================
   PART 4
   结果计算 + PHQ-9分级 + 环形图 + 结果页渲染
========================================================= */

/* ==========================
   Result Elements
========================== */

const resultTitle =
    document.getElementById("resultTitle");

const scoreNumber =
    document.getElementById("scoreNumber");

const scoreLevel =
    document.getElementById("scoreLevel");

const summaryTitle =
    document.getElementById("summaryTitle");

const summaryContent =
    document.getElementById("summaryContent");

const adviceTitle =
    document.getElementById("adviceTitle");

const adviceContent =
    document.getElementById("adviceContent");

const testTime =
    document.getElementById("testTime");

const riskWarning =
    document.getElementById("riskWarning");

const riskWarningTitle =
    document.getElementById("riskWarningTitle");

const riskWarningContent =
    document.getElementById("riskWarningContent");

const canvas =
    document.getElementById("scoreChart");

const ctx =
    canvas.getContext("2d");

/* ==========================
   Localized Level Names
========================== */

const LEVEL_NAMES = {

    "zh-CN": {
        none: "无或极轻微",
        light: "轻度",
        moderate: "中度",
        "moderately-severe": "中重度",
        severe: "重度"
    },

    "zh-TW": {
        none: "無或極輕微",
        light: "輕度",
        moderate: "中度",
        "moderately-severe": "中重度",
        severe: "重度"
    },

    "ja": {
        none: "なし〜軽微",
        light: "軽度",
        moderate: "中等度",
        "moderately-severe": "中等度〜重度",
        severe: "重度"
    },

    "en": {
        none: "Minimal",
        light: "Mild",
        moderate: "Moderate",
        "moderately-severe": "Moderately Severe",
        severe: "Severe"
    }

};

/* ==========================
   Result Summary
========================== */

const SUMMARY_TEXT = {

    "zh-CN": {
        none: "当前结果未显示明显抑郁症状。",
        light: "当前结果提示存在轻度抑郁倾向。",
        moderate: "当前结果提示存在中度抑郁症状。",
        "moderately-severe": "当前结果提示存在较明显抑郁症状。",
        severe: "当前结果提示存在严重抑郁症状。"
    },

    "zh-TW": {
        none: "目前未發現明顯憂鬱症狀。",
        light: "存在輕度憂鬱傾向。",
        moderate: "存在中度憂鬱症狀。",
        "moderately-severe": "存在較明顯憂鬱症狀。",
        severe: "存在嚴重憂鬱症狀。"
    },

    "ja": {
        none: "顕著な抑うつ症状は認められません。",
        light: "軽度の抑うつ傾向があります。",
        moderate: "中等度の抑うつ症状があります。",
        "moderately-severe": "比較的強い抑うつ症状があります。",
        severe: "重度の抑うつ症状があります。"
    },

    "en": {
        none: "No significant depressive symptoms detected.",
        light: "Mild depressive symptoms detected.",
        moderate: "Moderate depressive symptoms detected.",
        "moderately-severe": "Marked depressive symptoms detected.",
        severe: "Severe depressive symptoms detected."
    }

};

/* ==========================
   Calculate Results
========================== */

function calculateResults() {

    const score =
        state.answers.reduce(
            (a, b) => a + b,
            0
        );

    state.score = score;

    const level =
        SCORE_LEVELS.find(item =>
            score >= item.min &&
            score <= item.max
        );

    state.level =
        level.key;

    state.levelClass =
        level.className;

    renderResults();
}

/* ==========================
   Render Results
========================== */

function renderResults() {

    const lang = t();

    showPage(resultPage);

    resultTitle.textContent =
        lang.resultTitle;

    summaryTitle.textContent =
        lang.summaryTitle;

    adviceTitle.textContent =
        lang.adviceTitle;

    scoreNumber.textContent =
        state.score;

    scoreLevel.textContent =
        LEVEL_NAMES[
            state.language
        ][state.level];

    scoreLevel.className =
        "score-level " +
        state.levelClass;

    summaryContent.textContent =
        SUMMARY_TEXT[
            state.language
        ][state.level];

    adviceContent.textContent =
        ADVICE[
            state.language
        ][state.level];

    renderTime();

    renderRisk();

    renderChart();
}

/* ==========================
   Time Rendering
========================== */

function renderTime() {

    if(
        !state.finishedAt
    ){
        return;
    }

    const localeMap = {
        "zh-CN":"zh-CN",
        "zh-TW":"zh-TW",
        "ja":"ja-JP",
        "en":"en-US"
    };

    const locale =
        localeMap[
            state.language
        ];

    const formatted =
        state.finishedAt
        .toLocaleString(locale);

    testTime.textContent =
        formatted;
}

/* ==========================
   Risk Warning
========================== */

function renderRisk() {

    if(!state.q9Risk){

        riskWarning.classList.add(
            "hidden"
        );

        return;
    }

    riskWarning.classList.remove(
        "hidden"
    );

    riskWarningTitle.textContent =
        t().riskTitle;

    riskWarningContent.textContent =
        t().riskContent;
}

/* ==========================
   Canvas Helpers
========================== */

function clearCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

function polarToCartesian(
    cx,
    cy,
    r,
    angle
){

    return {
        x:
            cx +
            r *
            Math.cos(angle),

        y:
            cy +
            r *
            Math.sin(angle)
    };
}

/* ==========================
   Animated Donut Chart
========================== */

function renderChart() {

    clearCanvas();

    const maxScore = 27;

    const ratio =
        state.score / maxScore;

    let progress = 0;

    const centerX = 150;
    const centerY = 150;

    const radius = 100;

    const lineWidth = 20;

    function animate() {

        clearCanvas();

        ctx.beginPath();
        ctx.arc(
            centerX,
            centerY,
            radius,
            0,
            Math.PI * 2
        );

        const styles = getComputedStyle(document.documentElement);
        ctx.strokeStyle = styles.getPropertyValue("--chart-track").trim() || "rgba(241,239,233,.18)";

        ctx.lineWidth =
            lineWidth;

        ctx.stroke();

        const start =
            -Math.PI / 2;

        const end =
            start +
            (
                Math.PI * 2 *
                progress
            );

        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius,
            start,
            end
        );

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                300,
                300
            );

        gradient.addColorStop(0, styles.getPropertyValue("--phq-pink").trim() || "#f08eaa");

        gradient.addColorStop(1, styles.getPropertyValue("--phq-yellow").trim() || "#f4ca62");

        ctx.strokeStyle =
            gradient;

        ctx.lineWidth =
            lineWidth;

        ctx.lineCap =
            "round";

        ctx.stroke();

        ctx.fillStyle = styles.getPropertyValue("--phq-paper").trim() || "#f1efe9";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.font =
            "bold 48px DM Sans";

        ctx.fillText(
            state.score,
            centerX,
            centerY - 12
        );

        ctx.font =
            "16px DM Sans";

        ctx.fillStyle = styles.getPropertyValue("--chart-muted").trim() || "rgba(241,239,233,.6)";

        ctx.fillText(
            "/ 27",
            centerX,
            centerY + 28
        );

        progress += 0.02;

        if(
            progress <= ratio
        ){
            requestAnimationFrame(
                animate
            );
        }
    }

    animate();
}

document.addEventListener("themechange", function () {
    if (!resultPage.classList.contains("hidden")) {
        renderChart();
    }
});

/* ==========================
   Re-render Language
========================== */

const oldApplyLanguage =
    applyLanguage;

applyLanguage = function(){

    oldApplyLanguage();

    if(
        !resultPage.classList.contains(
            "hidden"
        )
    ){
        renderResults();
    }
};

/* =========================================================
   PART 5
   PDF导出 + 打印模板 + 模态框 + 初始化收尾
========================================================= */

/* ==========================
   Export Elements
========================== */

const exportButton =
    document.getElementById(
        "exportButton"
    );

const exportModal =
    document.getElementById(
        "exportModal"
    );

const cancelExport =
    document.getElementById(
        "cancelExport"
    );

const confirmExport =
    document.getElementById(
        "confirmExport"
    );

const printContainer =
    document.getElementById(
        "printContainer"
    );

const pdfScore =
    document.getElementById(
        "pdfScore"
    );

const pdfLevel =
    document.getElementById(
        "pdfLevel"
    );

const pdfChart =
    document.getElementById(
        "pdfChart"
    );

const pdfAdvice =
    document.getElementById(
        "pdfAdvice"
    );

const pdfTime =
    document.getElementById(
        "pdfTime"
    );

/* ==========================
   Export Modal
========================== */

exportButton.addEventListener(
    "click",
    openExportModal
);

cancelExport.addEventListener(
    "click",
    closeExportModal
);

exportModal.addEventListener(
    "click",
    e => {

        if(
            e.target === exportModal
        ){
            closeExportModal();
        }

    }
);

function openExportModal(){

    exportModal.classList.add(
        "show"
    );

    exportModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeExportModal(){

    exportModal.classList.remove(
        "show"
    );

    exportModal.setAttribute(
        "aria-hidden",
        "true"
    );
}

/* ==========================
   PDF Text
========================== */

const PDF_TEXT = {

    "zh-CN":{
        report:"PHQ-9 抑郁筛查报告",
        score:"总分",
        level:"等级",
        advice:"建议",
        time:"测评时间"
    },

    "zh-TW":{
        report:"PHQ-9 憂鬱篩查報告",
        score:"總分",
        level:"等級",
        advice:"建議",
        time:"測評時間"
    },

    "ja":{
        report:"PHQ-9 レポート",
        score:"スコア",
        level:"レベル",
        advice:"アドバイス",
        time:"受験日時"
    },

    "en":{
        report:"PHQ-9 Report",
        score:"Score",
        level:"Level",
        advice:"Advice",
        time:"Assessment Time"
    }

};

/* ==========================
   Print Template
========================== */

function buildPrintHTML(){

    const txt =
        PDF_TEXT[
            state.language
        ];

    const levelText =
        LEVEL_NAMES[
            state.language
        ][state.level];

    let html = `
    <div style="
        font-family:Arial,sans-serif;
        padding:30px;
        color:#000;
    ">
    `;

    html += `
        <h1>
            ${txt.report}
        </h1>
    `;

    if(pdfScore.checked){

        html += `
        <h2>
            ${txt.score}: ${state.score}/27
        </h2>
        `;
    }

    if(pdfLevel.checked){

        html += `
        <p>
            <strong>
            ${txt.level}:
            </strong>
            ${levelText}
        </p>
        `;
    }

    if(pdfTime.checked){

        html += `
        <p>
            <strong>
            ${txt.time}:
            </strong>
            ${testTime.textContent}
        </p>
        `;
    }

    if(pdfAdvice.checked){

        html += `
        <h3>
            ${txt.advice}
        </h3>

        <p>
            ${
                ADVICE[
                    state.language
                ][state.level]
            }
        </p>
        `;
    }

    if(
        pdfChart.checked
    ){

        try{

            const image =
                canvas.toDataURL(
                    "image/png"
                );

            html += `
            <div style="
                margin-top:20px;
            ">
                <img
                    src="${image}"
                    style="
                    width:280px;
                    ">
            </div>
            `;

        }catch(error){

            console.error(error);

        }
    }

    if(state.q9Risk){

        html += `
        <div style="
            margin-top:20px;
            padding:15px;
            border:1px solid red;
        ">

        <strong>
        ${
            t().riskTitle
        }
        </strong>

        <p>
        ${
            t().riskContent
        }
        </p>

        </div>
        `;
    }

    html += `
    </div>
    `;

    return html;
}

/* ==========================
   Print
========================== */

confirmExport.addEventListener(
    "click",
    () => {

        printContainer.innerHTML =
            buildPrintHTML();

        closeExportModal();

        setTimeout(
            () => {

                window.print();

            },
            150
        );

    }
);

/* ==========================
   ESC Support
========================== */

document.addEventListener(
    "keydown",
    e => {

        if(
            e.key === "Escape" &&
            exportModal.classList.contains(
                "show"
            )
        ){

            closeExportModal();

        }

    }
);

/* ==========================
   Responsive Repaint
========================== */

window.addEventListener(
    "resize",
    () => {

        if(
            !resultPage.classList.contains(
                "hidden"
            )
        ){

            renderChart();

        }

    }
);

/* ==========================
   Accessibility Labels
========================== */

function applyAccessibility(){

    startButton.setAttribute(
        "aria-label",
        "Start Assessment"
    );

    exportButton.setAttribute(
        "aria-label",
        "Export PDF"
    );

    restartButton.setAttribute(
        "aria-label",
        "Restart"
    );

    canvas.setAttribute(
        "role",
        "img"
    );
}

applyAccessibility();

/* ==========================
   Final Init
========================== */

(function init(){

    applyLanguage();

    hideAllPages();

    homePage.classList.remove(
        "hidden"
    );

    startButton.disabled = true;

    agreementCheckbox.checked =
        false;

})();

/* =========================================================
   END OF FILE
========================================================= */
