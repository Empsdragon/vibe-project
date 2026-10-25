// Vibe Project — 页面的一点点行为，全部可选。
(function () {
  'use strict';

  var root = document.documentElement;

  // 1. 主题：跟随系统，可手动切换，选择记在 localStorage。
  var STORAGE_KEY = 'vibe-theme';
  var toggle = document.getElementById('theme-toggle');

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* 私密模式 */ }
    }
    if (toggle) {
      var dark = theme === 'dark';
      toggle.textContent = dark ? '☀️' : '🌙';
      toggle.setAttribute('aria-pressed', String(dark));
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* 忽略 */ }
  applyTheme(saved === 'dark' || saved === 'light' ? saved : currentTheme(), false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  // 2. 页脚年份，永远不用手改。
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  // 3. 仓库链接：部署在 <user>.github.io/<repo>/ 时自动指向本仓库。
  var repoLink = document.getElementById('repo-link');
  if (repoLink) {
    var host = location.hostname;
    var first = location.pathname.split('/')[1];
    if (host === 'github.io' || host.endsWith('.github.io')) {
      var owner = host.split('.')[0];
      repoLink.href = 'https://github.com/' + owner + (first ? '/' + first : '');
      repoLink.textContent = 'github.com/' + owner + (first ? '/' + first : '');
    } else {
      repoLink.removeAttribute('href');
      repoLink.textContent = '本地预览模式';
    }
  }
})();
