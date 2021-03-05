# 專案介紹

### 使用 `yarn start` 開啟專案

### 資料夾簡介

+-- src/views：這裡放置了所有分頁：All（/scenicSpot）、City（/scenicSpot/:city）。
+-- src/components：這裡放置了所有子組件，導覽列、篩選器等等。
+-- src/redux：使用redux主要是為了全局掛載popup，在專案裡是拿來顯示catch到的error。
+-- src/api：為了使用方便，特別把api集中管理，統一設置axios。
