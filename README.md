1. 使用 Chrome 打開 [Tableau de bord COVID-19 Suivi de l’épidémie de COVID-19 en France](https://dashboard.covid19.data.gouv.fr/vue-d-ensemble)
2. 打開 console，並確保網頁還是在電腦版佈局沒有切換到手機版佈局
3. 複製[這個網頁](https://raw.githubusercontent.com/MisterFISHUP/scraper_vue-densemble/main/scraper_vue-densemble.js)的所有內容後，到 console 貼上按 Enter（看到 `undefined` 是正常現象）
4. 接著你可以：
   - 在 console 輸入 `scrapeOneDay()` 後按 Enter：會爬取頁面當下日期的數據然後在 console 中顯示出來，同樣內容也會直接複製到剪貼簿中（所以可以直接在任意空白處貼上該內容）
   - 在 console 輸入 `goTo('2021-03-19')` 後按 Enter：會自動讓日期切換到 2021 年 3 月 19 號。年月日可以自行更換，月日格式都要是兩位數（數據最早只到 2020/3/2 所以如果去更早之前的日期，頁面會停在 2020/3/2）
   - 當然也可以搭配以上兩點：在 console 輸入 `goTo('2020-12-27')` 後按 Enter 會讓日期切換到 2020/12/27，接著再輸入 `scrapeOneDay()` 並按 Enter，就會爬取 2020/12/27 的數據
 5. 如果覺得 console 內容太多，可以按 `ctrl` + `l` 清空 console
   
注意：
- 過去一週新增入院人數、過去一週新增危重症病房人數、復甦室人數是 SpF 的數據，必須自行填寫
- 若有需要請再自行調整內容（例如沒有某項數據時，該數據會顯示「無資料」，你可能會想換成其他說明或刪掉該數據項目）
