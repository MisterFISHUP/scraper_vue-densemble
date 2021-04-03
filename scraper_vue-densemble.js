// For https://dashboard.covid19.data.gouv.fr/vue-d-ensemble

function scrapeOneDay() {
  try {
    // get date
    const [dd, mm, yyyy] = document.querySelector("h3.jsx-2989278273").textContent.slice(11).split("/");
    const date = `${yyyy}-${mm}-${dd}`;
    const dateObj = new Date(date);

    // get data
    let cases = document.querySelector('.jsx-2793952281.value')?.firstChild.textContent;
    let casesDiff = document.querySelector('.jsx-2793952281.difference')?.textContent;
    let deaths = (dateObj > new Date("2020-03-31")) ? document.querySelector('.jsx-2376875320.value')?.firstChild.textContent : null;
    let deathsDiff = (dateObj > new Date("2020-03-31")) ? document.querySelector('.jsx-2376875320.counter-container')?.querySelector('.difference')?.textContent : null;
    let hospi = document.querySelector('.jsx-792689997.value')?.firstChild.textContent;
    let hospiDiff = document.querySelector('.jsx-792689997.difference')?.textContent;
    let hospiNew = document.querySelectorAll('.jsx-792689997.value')[1]?.firstChild.textContent;
    let hospiNewDiff = document.querySelectorAll('.jsx-792689997.counter-container')[1]?.querySelector('.difference')?.textContent;
    let icu = document.querySelector('.jsx-659902412.value')?.firstChild.textContent;
    let icuDiff = document.querySelector('.jsx-659902412.difference')?.textContent;
    let icuNew = document.querySelectorAll('.jsx-659902412.value')[1]?.firstChild.textContent;
    let icuNewDiff = document.querySelectorAll('.jsx-659902412.counter-container')[1]?.querySelector('.difference')?.textContent;
    let returnHome = (dateObj > new Date("2020-12-26"))
      ? document.querySelectorAll('.jsx-850173864.value')[1]?.firstChild.textContent
      : document.querySelector('.jsx-850173864.value')?.firstChild.textContent;
    let returnHomeDiff = (dateObj > new Date("2020-12-26"))
      // in case the [0] doesn't have difference
      ? document.querySelectorAll('.jsx-850173864.counter-container')[1]?.querySelector('.difference')?.textContent
      : document.querySelector('.jsx-850173864.difference')?.textContent;
    let deathsHospi = (dateObj > new Date("2020-03-31"))
      ? document.querySelectorAll('.jsx-2376875320.value')[1]?.firstChild.textContent
      : document.querySelector('.jsx-2376875320.value')?.firstChild.textContent;
    let deathsHospiDiff = (dateObj > new Date("2020-03-31"))
      // in case the [0] doesn't have difference
      ? document.querySelectorAll('.jsx-2376875320.counter-container')[1]?.querySelector('.difference')?.textContent
      : document.querySelector('.jsx-2376875320.difference')?.textContent;
    let casesEhpadEms = document.querySelector('.jsx-3358528734.value')?.firstChild.textContent;
    let casesEhpadEmsDiff = document.querySelector('.jsx-3358528734.difference')?.textContent;
    let deathsEhpadEms = document.querySelector('.jsx-251970426.value')?.firstChild.textContent;
    let deathsEhpadEmsDiff = document.querySelector('.jsx-251970426.difference')?.textContent;

    // convert undefined values
    const fmt = x => (x == "-" || x == null) ? "無資料" : x.replace(/\s+/g, ',');
    const fmtDiff = x => (x == null) ? "" : " " + x.replace(/ \+ /, '+').replace(/ - /, '-').replace(/ \)/, ')').replace(/\s+/g, ',');

    const output = `以下是 ${yyyy} 年 ${mm} 月 ${dd} 日的資料：
${yyyy}.${mm}.${dd} #法國每日疫情匯報J${1 + (Date.parse(date) - Date.parse("2020-03-01")) / 864e5}
📌 法國官方數據 COVID-19 - France
總確診數: ${fmt(cases)}${fmtDiff(casesDiff)}
總死亡數: ${fmt(deaths)}${fmtDiff(deathsDiff)}
📌 住院與重症數據 Données hospitalières
總住院數: ${fmt(hospi)}${fmtDiff(hospiDiff)}
本日入院數: ${fmt(hospiNew)}${fmtDiff(hospiNewDiff)}
過去一週新增入院人數: 
總重症數: ${fmt(icu)}${fmtDiff(icuDiff)}
本日重症數: ${fmt(icuNew)}${fmtDiff(icuNewDiff)}
過去一週新增危重症病房人數: 
(復甦室人數: )
死亡數: ${fmt(deathsHospi)}${fmtDiff(deathsHospiDiff)}
出院數: ${fmt(returnHome)}${fmtDiff(returnHomeDiff)}
📌 養老院與老人照護機構數據 Données EHPAD & EMS
總確診數: ${fmt(casesEhpadEms)}${fmtDiff(casesEhpadEmsDiff)}
總死亡數: ${fmt(deathsEhpadEms)}${fmtDiff(deathsEhpadEmsDiff)}\n`;

    // copy `output` to clipboard
    const el = document.createElement('textarea');
    el.value = output;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log("[下述內容已複製到剪貼簿]\n")
    return output;
  } catch (err) {
    console.error(err);
  }
};

// go to date `YYYY-MM-DD`
function goTo(date) {
  try {
    // get curDate
    const [dd, mm, yyyy] = document.querySelector("h3.jsx-2989278273").textContent.slice(11).split("/");
    const curDate = `${yyyy}-${mm}-${dd}`;

    // the given `date` is `n` days before or after
    const n = (Date.parse(curDate) - Date.parse(date)) / 864e5;
    const nAbs = Math.abs(n);

    // get btn
    const btns = document.querySelectorAll('.jsx-2989278273.report-nav');
    const btn = n > 0 ? btns[0] : btns[1];

    console.log(`開始跳至 ${nAbs} 天${n > 0 ? "前" : "後"}...`);
    for (i = 1; i <= nAbs; i++) {
      btn.click();
      if (i % 30 == 0) console.log(`> 已經處理了 ${i} 天...`);
    }
    console.log(`完成！現在是 ${date}。`);
  } catch (err) {
    console.error(err);
  }
}
