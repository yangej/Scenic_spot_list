## 開啟專案
`yarn start`

## 專案架構
### 概覽圖
![structure@216x](https://user-images.githubusercontent.com/40908020/110468725-a48d0880-8113-11eb-953f-7f65d55f7acc.png)

### infinite scroll
1. 是每個頁面都要有的feature，所以將其封裝為`useInfiniteScroll(getData, dependency)` hook並個別引入。
2. All和City呼叫api的url不同，因此將呼叫方法當作第一個參數`getData`傳入`useInfiniteScroll`。
3. City需要依使用者選擇的城市來重設`useInfiniteScroll`的state，因此第二個參數`dependency`為hook呼叫的依據。
