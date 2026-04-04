# Cloudflare Pages デプロイ手順（Dispatch用プロンプト）

以下の手順をブラウザで実行してください。

## 手順

1. Safariで https://dash.cloudflare.com を開いてログインする

2. 左側メニューから「Workers & Pages」をクリック

3. 右上の「Create」ボタンをクリック

4. 「Pages」タブを選択

5. 「Connect to Git」をクリック

6. GitHubアカウントが未連携なら「Connect GitHub」で連携する

7. リポジトリ一覧から「machaniconico/code-learn-app」を選択して「Begin setup」をクリック

8. ビルド設定を以下のように入力：
   - Project name: code-learn-app
   - Production branch: main
   - Framework preset: 「Next.js (Static HTML Export)」を選択
   - Build command: npx next build
   - Build output directory: out

9. 「Save and Deploy」をクリック

10. デプロイが完了するまで待つ（数分かかる）

11. 完了したらURLが表示される（例: code-learn-app.pages.dev）

## 確認

デプロイ完了後、表示されたURL（○○.pages.dev）にアクセスして、プログラミング学習アプリが正しく表示されることを確認してください。
