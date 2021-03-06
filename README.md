# 專案介紹

### 開啟專案
`yarn start`

### 資料夾簡介
+-- **src/views**：這裡放置了所有分頁：All（/scenicSpot）、City（/scenicSpot/:city）。</br>
+-- **src/components**：這裡放置了所有子組件，導覽列、篩選器等等。</br>
+-- **src/redux**：使用redux主要是為了全局掛載popup，在專案裡是拿來顯示catch到的error。</br>
+-- **src/api**：為了使用方便，特別把api集中管理，統一設置axios。</br>
+-- **src/dummies**：這裡的資料是在接api前使用的假資料。</br>
+-- **src/utils**：這裡放的是共用的方法。
