# Page Navigator

このChrome拡張機能は、ウェブページ内に「前のページ」と「次のページ」へのリンクが存在する場合、画面の左右に固定された便利なナビゲーションボタンを追加します。

## 機能

- ページ内の「前へ」「次へ」リンクを自動検出
- 画面の左側に「前のページへ」ボタン、右側に「次のページへ」ボタンを固定表示
- スクロールしても常に表示されるフローティングボタン
- シンプルで使いやすいデザイン

## インストール方法

1. このリポジトリをクローンまたはダウンロードします
2. Chromeで `chrome://extensions` を開きます
3. 右上の「デベロッパーモード」をオンにします
4. 「パッケージ化されていない拡張機能を読み込む」をクリックします
5. ダウンロードしたリポジトリのフォルダを選択します

## 使用方法

拡張機能をインストールすると、ページ内に「前へ」「次へ」リンクが検出された場合、自動的に左右にナビゲーションボタンが表示されます。

- 左側のボタン: 前のページへ移動
- 右側のボタン: 次のページへ移動

## 技術仕様

- JavaScript: リンク検出とボタン生成のロジック
- CSS: 固定ポジションのフローティングボタンスタイル
- HTML: ボタン要素の構造

## ライセンス

MIT
