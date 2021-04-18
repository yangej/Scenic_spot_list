## 開啟專案
`yarn start`

## 專案架構
### 概覽圖
![project-structure](https://user-images.githubusercontent.com/40908020/115142187-f742d400-a072-11eb-8aa4-e9636978e66f.png)

### 專案簡述
整個畫面有四個component：Navbar、Panel、ItemRow以及Loader

#### Navbar
在Navbar上有兩個link：「查詢全部」以及「按照城市查詢」
* 「查詢全部」會導向/scenicSpot頁面
* 「按照城市查詢」會預設導向/scenicSpot/Taipei頁面

#### Panel
Panel是用在篩選想要查詢的城市，所以只有當router能取得參數city時才會出現

#### ItemRow
ItemRow是用來顯示每筆景點資料的元件

#### Loader
在執行非同步存取資料時，Loader會顯示來提示資料載入中


### 其他
* 專案雖然小，但想用用看redux，所以就拿來控制Popup的開關以及顯示的字。
* 由於開發初期api有一天20次的限制，沒有開console就不知道是api的錯誤，所以拿Popup來顯示catch到的error(429)。
