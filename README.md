# ChillParents 輕鬆爸媽

香港家長社群網站，全文繁體中文。社群約定是：開口之前先問「你想我聽，定係想我一齊諗？」

## 頁面

- 首頁：本週一問、故事、活動、十八區
- 家長故事：可搜尋、篩選、收藏（只存在這部瀏覽器）
- 活動與活動詳情
- 地區小組
- 資源：小一入學筆記、社區支援、主持人手冊、求助熱線、低消費週末
- 關於、社群守則
- 加入：產生一張茶聚自我介紹卡，並把家長資料存入 Turso 資料庫 `chillparents` 的 `parents` 表。網站不會公開這些資料。

## 普通話學習消息

每個星期一香港時間上午八時，GitHub Actions 會執行 `npm run news`。程序會查看香港政府新聞公報、香港電台新聞，以及香港政府搜尋，找出和學習普通話有關的新資料，然後在 `content/news/putonghua.json` 寫一篇繁體中文帖子。帖子只保留標題和連結，不轉載原文。沒有新資料時不會改動網站，有新帖時會開一個 pull request。

也可以在本機先看會不會寫出文章：

```bash
npm run news
```

## 家長資料庫

加入頁使用環境變數 `TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN` 連到名為 `chillparents` 的 Turso 資料庫。兩個變數都要設在 Vercel，不要加 `NEXT_PUBLIC_` 前綴。

第一次有人提交加入表，或執行下面的指令，會建立 `parents` 表：

```bash
npm run db:parents
```

## 本地運行

```bash
npm install
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000)。

```bash
npm run build
npm start
```
