// 每个交易日只需替换此文件中的报价、宏观因子与新闻，并保留原始链接/截图作为证据。
const brief = {
  date: "2026-10-30 · 亚洲早盘（演示）",
  status: "演示数据 · 需以实时行情核验",
  alert: "事件风险：央行决议与通胀数据会扩大短时波动；公布前后避免把演示摘要当作报价或交易依据。",
  quotes: [
    { pair: "USD/CAD", close: "1.3970", open: "1.3978", change: "-0.18%", dir: "down" },
    { pair: "EUR/USD", close: "1.1642", open: "1.1638", change: "-0.03%", dir: "down" },
    { pair: "USD/JPY", close: "152.64", open: "152.81", change: "+0.11%", dir: "up" },
    { pair: "GBP/USD", close: "1.3347", open: "1.3339", change: "-0.06%", dir: "down" }
  ],
  macro: [
    { name: "美加利率预期", value: 72, view: "USD 支撑减弱", negative: false },
    { name: "美国增长预期", value: 64, view: "USD 偏强", negative: false },
    { name: "油价 / 贸易条件", value: 58, view: "CAD 获得支撑", negative: true },
    { name: "风险情绪", value: 48, view: "中性，关注避险", negative: false },
    { name: "通胀差（长期）", value: 54, view: "长期偏 CAD", negative: true }
  ],
  usdcad: {
    score: "-1",
    summary: "短线<strong>轻度偏空 USD/CAD</strong>：市场更关注美加利差的边际收窄与油价上行；美国增长优势仍是反向风险。",
    levels: [{ label: "阻力", value: "1.4045" }, { label: "枢轴", value: "1.4000" }, { label: "支撑", value: "1.3980" }]
  },
  news: [
    { time: "08:30", category: "央行", title: "美加利差：关注“预期是否变化”，不要只看利率水平", text: "示例解读：若加拿大央行路径更鹰、或美联储前瞻指引偏软，USD/CAD 的压力可能来自预期重估。", impact: "USD/CAD 偏空", risk: false },
    { time: "09:00", category: "增长", title: "美国增长数据仍是美元的反向风险", text: "示例解读：数据本身偏强并不必然推升美元，重点记录实际值相对市场预期的意外程度。", impact: "关注预期差", risk: false },
    { time: "09:30", category: "商品", title: "油价上行会通过贸易条件支撑加元", text: "示例解读：加拿大是能源出口国；但地缘风险若同时推升避险美元，传导可能出现冲突。", impact: "CAD 偏多", risk: false },
    { time: "10:00", category: "风险", title: "风险事件会改变商品货币与避险货币的相对表现", text: "示例解读：先判断风险偏好、利率与原油是否同向，再决定宏观打分能否用于短线方向。", impact: "波动可能放大", risk: true }
  ]
};

const $ = (selector) => document.querySelector(selector);
const quoteGrid = $("#quoteGrid");
const macroList = $("#macroList");
const newsList = $("#newsList");

function renderQuotes() {
  quoteGrid.innerHTML = brief.quotes.map((q) => `
    <article class="quote"><span class="pair">${q.pair}</span><strong class="price">${q.open}</strong>
    <div class="quote-meta"><span>今晨开盘</span><span class="${q.dir}">${q.change}</span></div>
    <div class="quote-meta"><span>昨晚收盘</span><span>${q.close}</span></div></article>`).join("");
}
function renderMacro() {
  macroList.innerHTML = brief.macro.map((m) => `<div class="macro-row"><span class="macro-name">${m.name}</span><div class="track"><div class="bar ${m.negative ? "negative" : ""}" style="width:${m.value}%"></div></div><span class="macro-view">${m.view}</span></div>`).join("");
}
function renderView() {
  $("#scoreBadge").textContent = brief.usdcad.score;
  $("#scoreSummary").innerHTML = brief.usdcad.summary;
  $("#levels").innerHTML = brief.usdcad.levels.map((l) => `<div class="level"><span>${l.label}</span><b>${l.value}</b></div>`).join("");
}
function renderNews(filter = "all") {
  const items = filter === "all" ? brief.news : brief.news.filter((n) => n.category === filter);
  newsList.innerHTML = items.map((n) => `<article class="news-item"><time class="news-time">${n.time}<br>${n.category}</time><div><h3>${n.title}</h3><p>${n.text}</p></div><span class="impact ${n.risk ? "risk" : ""}">${n.impact}</span></article>`).join("") || "<p>该类别暂无晨报条目。</p>";
}

$("#briefDate").textContent = brief.date;
$("#dataStatus").textContent = brief.status;
$("#footerStatus").textContent = brief.status.replace(" · 需以实时行情核验", "");
$("#riskAlert").textContent = brief.alert;
$("#riskAlert").classList.add("show");
renderQuotes(); renderMacro(); renderView(); renderNews();

document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
  document.querySelector(".filter.active").classList.remove("active");
  button.classList.add("active"); renderNews(button.dataset.filter);
}));
$("#themeToggle").addEventListener("click", () => document.documentElement.classList.toggle("dark"));
