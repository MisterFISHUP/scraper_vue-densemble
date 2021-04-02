// For https://dashboard.covid19.data.gouv.fr/vue-d-ensemble

function scrapeOneDay() {
  try {
    // get date
    const [dd, mm, yyyy] = document.querySelector("h3.jsx-2989278273").textContent.slice(11).split("/");
    const date = `${yyyy}-${mm}-${dd}`;
    const dateObj = new Date(date);

    // get data
    let cases = document.querySelector('.jsx-2793952281.value')?.firstChild.textContent.replace(/\s+/g, ',');
    let deaths = (dateObj > new Date("2020-03-31")) ? document.querySelector('.jsx-2376875320.value')?.firstChild.textContent.replace(/\s+/g, ',') : null;
    let hospi = document.querySelector('.jsx-792689997.value')?.firstChild.textContent.replace(/\s+/g, ',');
    let hospiNew = document.querySelectorAll('.jsx-792689997.value')[1]?.firstChild.textContent.replace(/\s+/g, ',');
    let icu = document.querySelector('.jsx-659902412.value')?.firstChild.textContent.replace(/\s+/g, ',');
    let icuNew = document.querySelectorAll('.jsx-659902412.value')[1]?.firstChild.textContent.replace(/\s+/g, ',');
    let returnHome = (dateObj > new Date("2020-12-26"))
      ? document.querySelectorAll('.jsx-850173864.value')[1]?.firstChild.textContent.replace(/\s+/g, ',')
      : document.querySelector('.jsx-850173864.value')?.firstChild.textContent.replace(/\s+/g, ',');
    let deathsHospi = (dateObj > new Date("2020-03-31"))
      ? document.querySelectorAll('.jsx-2376875320.value')[1]?.firstChild.textContent.replace(/\s+/g, ',')
      : document.querySelector('.jsx-2376875320.value')?.firstChild.textContent.replace(/\s+/g, ',');
    let casesEhpadEms = document.querySelector('.jsx-3358528734.value')?.firstChild.textContent.replace(/\s+/g, ',');
    let deathsEhpadEms = document.querySelector('.jsx-251970426.value')?.firstChild.textContent.replace(/\s+/g, ',');

    // convert undefined values
    const convertUndefined = x => (x == "-" || x == null) ? "無資料" : x;
    cases = convertUndefined(cases);
    deaths = convertUndefined(deaths);
    hospi = convertUndefined(hospi);
    hospiNew = convertUndefined(hospiNew);
    icu = convertUndefined(icu);
    icuNew = convertUndefined(icuNew);
    returnHome = convertUndefined(returnHome);
    deathsHospi = convertUndefined(deathsHospi);
    casesEhpadEms = convertUndefined(casesEhpadEms);
    deathsEhpadEms = convertUndefined(deathsEhpadEms);

    const output = `以下是 ${yyyy} 年 ${mm} 月 ${dd} 日的資料：
${yyyy}.${mm}.${dd} #法國每日疫情匯報J${1 + (Date.parse(date) - Date.parse("2020-03-01")) / 864e5}
📌 法國官方數據 COVID-19 - France
總確診數：${cases}
總死亡數：${deaths}
📌 住院與重症數據 Données hospitalières
總住院數：${hospi}
本日入院數：${hospiNew}
過去一週新增入院人數: 
總重症數：${icu}
本日重症數：${icuNew}
過去一週新增危重症病房人數：
（復甦室人數：）
死亡數：${deathsHospi}
出院數：${returnHome}
📌 養老院與老人照護機構數據 Données EHPAD & EMS
總確診數：${casesEhpadEms}
總死亡數：${deathsEhpadEms}\n`;

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
