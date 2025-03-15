// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', initPageNavigator);
// DOMContentLoadedが発火しない場合のフォールバック
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initPageNavigator, 0);
}

/**
 * ページナビゲーターの初期化
 */
function initPageNavigator() {
  // 前のページと次のページのリンクを検出
  const prevLink = findPrevLink();
  const nextLink = findNextLink();

  // ナビゲーションボタンをページに追加
  if (prevLink || nextLink) {
    addNavigationButtons(prevLink, nextLink);
  }
}

/**
 * 「前のページ」リンクを検出する
 * @returns {string|null} 検出したリンクのURL、見つからない場合はnull
 */
function findPrevLink() {
  const prevPatterns = [
    // リンクテキストに基づく検索パターン
    { selector: 'a', text: ['前へ', '前のページ', '前の記事', '≪', '«', '←', '<', '戻る', 'back', 'prev', 'previous'] },
    // rel属性に基づく検索
    { selector: 'a[rel="prev"]' },
    // クラス名やID名に基づく検索
    { selector: '.prev, .previous, .back, .prevPage, #prev, #previous, #back' }
  ];

  return findLinkByPatterns(prevPatterns);
}

/**
 * 「次のページ」リンクを検出する
 * @returns {string|null} 検出したリンクのURL、見つからない場合はnull
 */
function findNextLink() {
  const nextPatterns = [
    // リンクテキストに基づく検索パターン
    { selector: 'a', text: ['次へ', '次のページ', '次の記事', '≫', '»', '→', '>', '進む', 'next', 'forward'] },
    // rel属性に基づく検索
    { selector: 'a[rel="next"]' },
    // クラス名やID名に基づく検索
    { selector: '.next, .forward, .nextPage, #next, #forward' }
  ];

  return findLinkByPatterns(nextPatterns);
}

/**
 * パターンに基づいてリンクを検索
 * @param {Array} patterns 検索パターンの配列
 * @returns {string|null} 検出したリンクのURL、見つからない場合はnull
 */
function findLinkByPatterns(patterns) {
  let link = null;

  // 各パターンで検索
  for (const pattern of patterns) {
    if (pattern.selector && pattern.text) {
      // テキストとセレクタの両方が指定されている場合
      const elements = document.querySelectorAll(pattern.selector);
      for (const el of elements) {
        const text = el.textContent.trim().toLowerCase();
        if (pattern.text.some(t => text.includes(t.toLowerCase()))) {
          link = el.href;
          break;
        }
      }
    } else if (pattern.selector) {
      // セレクタのみが指定されている場合
      const element = document.querySelector(pattern.selector);
      if (element && element.href) {
        link = element.href;
      }
    }

    if (link) break;
  }

  return link;
}

/**
 * ナビゲーションボタンをページに追加
 * @param {string|null} prevLink 前のページのURL
 * @param {string|null} nextLink 次のページのURL
 */
function addNavigationButtons(prevLink, nextLink) {
  // 前へボタンの追加
  if (prevLink) {
    const prevButton = createButton('前のページへ', prevLink, 'page-navigator-prev');
    document.body.appendChild(prevButton);
  }

  // 次へボタンの追加
  if (nextLink) {
    const nextButton = createButton('次のページへ', nextLink, 'page-navigator-next');
    document.body.appendChild(nextButton);
  }
}

/**
 * ナビゲーションボタンを作成
 * @param {string} text ボタンのテキスト
 * @param {string} url リンク先のURL
 * @param {string} className 追加のクラス名
 * @returns {HTMLElement} 作成したボタン要素
 */
function createButton(text, url, className) {
  const button = document.createElement('a');
  button.href = url;
  button.className = `page-navigator-button ${className}`;
  button.textContent = text;
  button.title = text;

  // SVGアイコンの追加（矢印など）
  const isNext = className.includes('next');
  button.innerHTML = `
    <svg class="page-navigator-icon" viewBox="0 0 24 24">
      <path d="${isNext 
        ? 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' 
        : 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'}"/>
    </svg>
  `;

  return button;
}

// ページの動的変更（SPAなど）を検出するためのMutationObserverの設定
const observer = new MutationObserver((mutations) => {
  // URLが変わったかどうかをチェック
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    
    // 既存のボタンを削除
    document.querySelectorAll('.page-navigator-button').forEach(btn => btn.remove());
    
    // 新しいページでボタンを再初期化
    setTimeout(initPageNavigator, 500);
  }
});

// URLの変更を監視するための変数
let lastUrl = window.location.href;

// ページ全体の変更を監視
observer.observe(document.body, {
  childList: true,
  subtree: true
});
