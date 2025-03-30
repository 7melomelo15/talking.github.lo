# Talking MVP Template

## セットアップ方法（初心者向け・動作確認済み）

1. `.env.example` を `.env.local` にリネームします  
2. `.env.local` に Stripe のシークレットキー（例：`sk_test_...`）を設定します  
   - Stripeのテストキー取得先：https://dashboard.stripe.com/test/apikeys
3. ターミナルで以下を順番に実行：
   ```
   npm install
   npm run dev
   ```
   - 開発サーバーが http://localhost:3000 で起動します

## Vercel での公開手順

1. このテンプレートを GitHub にアップロード
2. Vercel にログインし「New Project」でこのリポジトリを選択
3. 環境変数 `STRIPE_SECRET_KEY` に Stripe のキーを設定
4. 「Deploy」ボタンをクリックで公開完了！

## 注意点

- `.env.local` は GitHub にアップロードしないように注意してください（秘密情報です）
- 表示されない場合は `index.tsx` に構文エラーがないか確認してください
