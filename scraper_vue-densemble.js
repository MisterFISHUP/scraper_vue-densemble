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
    const fmt = x => (x == "-" || x == null) ? "?????????" : x.replace(/\s+/g, ',');
    const fmtDiff = x => (x == null) ? "" : " " + x.replace(/ \+ /, '+').replace(/ - /, '-').replace(/ \)/, ')').replace(/\s+/g, ',');

    const output = `????????? ${yyyy} ??? ${mm} ??? ${dd} ???????????????
${yyyy}.${mm}.${dd} #????????????????????????J${1 + (Date.parse(date) - Date.parse("2020-03-01")) / 864e5}
???? ?????????????????? COVID-19 - France
????????????: ${fmt(cases)}${fmtDiff(casesDiff)}
????????????: ${fmt(deaths)}${fmtDiff(deathsDiff)}
???? ????????????????????? Donn??es hospitali??res
????????????: ${fmt(hospi)}${fmtDiff(hospiDiff)}
???????????????: ${fmt(hospiNew)}${fmtDiff(hospiNewDiff)}
??????????????????????????????: 
????????????: ${fmt(icu)}${fmtDiff(icuDiff)}
???????????????: ${fmt(icuNew)}${fmtDiff(icuNewDiff)}
???????????????????????????????????????: 
(???????????????: )
?????????: ${fmt(deathsHospi)}${fmtDiff(deathsHospiDiff)}
?????????: ${fmt(returnHome)}${fmtDiff(returnHomeDiff)}
???? ???????????????????????????????????? Donn??es EHPAD & EMS
????????????: ${fmt(casesEhpadEms)}${fmtDiff(casesEhpadEmsDiff)}
????????????: ${fmt(deathsEhpadEms)}${fmtDiff(deathsEhpadEmsDiff)}\n`;

    // copy `output` to clipboard
    const el = document.createElement('textarea');
    el.value = output;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log("[?????????????????????????????????]\n")
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

    console.log(`???????????? ${nAbs} ???${n > 0 ? "???" : "???"}...`);
    for (i = 1; i <= nAbs; i++) {
      btn.click();
      if (i % 30 == 0) console.log(`> ??????????????? ${i} ???...`);
    }
    console.log(`?????????????????? ${date}???`);
  } catch (err) {
    console.error(err);
  }
}
