## 開啟專案
`yarn start`

## 專案架構
### 概覽圖
![project-structure](https://user-images.githubusercontent.com/40908020/115142187-f742d400-a072-11eb-8aa4-e9636978e66f.png)


### infinite scroll
1. 是每個頁面都要有的feature，所以將其封裝為 `useInfiniteScroll(getData, dependency)` hook並各別引入。
2. All和City呼叫api的url不同，因此將獲取資料的方法當作第一個參數 `getData` 傳入 `useInfiniteScroll`。
3. City需要依使用者選擇的城市來重設 `useInfiniteScroll` 的state，因此第二個參數`dependency`為useEffect執行的依據。

### error message modal
1. 專案雖然小，但想用用看redux，所以就拿來控制Popup的開關以及顯示的字。
2. 由於開發初期api有一天20次的限制，沒有開console就不知道是api的錯誤，所以拿Popup來顯示catch到的error(429)。
