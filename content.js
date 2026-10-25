(() => {
  const TAG = "[YTCO]";
  const log = (...a) => console.log(TAG, ...a);

  const SEL = {
    panel: "ytco-panel",
    body: "ytco-body",
    header: "ytco-header"
  };

  const DEFAULT_API_KEY = "AIzaSyAb6QDZBleKNqkwfEujxiWk0Gk3U2m81xY";

  const CSS = `
    #${SEL.panel}{position:fixed;top:88px;width:360px;min-width:360px;max-width:360px;z-index:2147483647;background:var(--ytco-bg);color:var(--ytco-fg);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.45);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;border:1px solid var(--ytco-border);overflow:hidden;display:flex;flex-direction:column;max-height:80vh}
    #${SEL.panel}.ytco-min{width:48px;height:44px;overflow:hidden;cursor:pointer}
    #${SEL.panel}[data-theme="light"]{--ytco-bg:rgba(255,255,255,var(--ytco-bg-alpha,0.96));--ytco-fg:#111;--ytco-border:rgba(0,0,0,.08);--ytco-sub:rgba(0,0,0,.06);--ytco-link:#1a73e8}
    #${SEL.panel}[data-theme="dark"]{--ytco-bg:rgba(15,15,15,var(--ytco-bg-alpha,0.92));--ytco-fg:#fff;--ytco-border:rgba(255,255,255,.08);--ytco-sub:rgba(255,255,255,.08);--ytco-link:#8ab4ff}
    #${SEL.panel} .${SEL.header}{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-bottom:1px solid var(--ytco-sub);cursor:move;flex-shrink:0}
    #${SEL.panel} .${SEL.header} .ytco-title{font-weight:600;font-size:14px;opacity:.9}
    #${SEL.panel} .${SEL.header} .ytco-actions{display:flex;gap:6px}
    #${SEL.panel} .ytco-btn{border:0;padding:6px 8px;border-radius:8px;background:var(--ytco-sub);color:var(--ytco-fg);cursor:pointer;font-size:12px}
    #${SEL.panel} .ytco-btn:hover{filter:brightness(1.06)}
    #${SEL.panel} .${SEL.body}{max-height:210px;overflow:hidden;padding:10px;display:flex;flex-direction:column;gap:10px;justify-content:flex-start;flex-shrink:0}
    #${SEL.panel} .ytco-comment{font-size:14px;line-height:1.35;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;max-height:calc(1.35em*6);overflow-wrap:break-word}
    #${SEL.panel} .ytco-meta{margin-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;opacity:.8;font-size:12px}
    #${SEL.panel} .ytco-author{font-weight:600}
    #${SEL.panel} a{color:var(--ytco-link)}
    #${SEL.panel} .ytco-jump{border:0;background:none;color:var(--ytco-link);cursor:pointer;font-size:11px;padding:0;text-decoration:underline;opacity:.85}
    #${SEL.panel} .ytco-jump:hover{opacity:1}
    #${SEL.panel} .ytco-toggle{display:flex;align-items:center;gap:6px}
    #${SEL.panel} input[type="checkbox"]{transform:scale(1.1)}
    /* Compact / pill mode */
    #${SEL.panel}.ytco-compact{width:260px}
    #${SEL.panel}.ytco-compact .${SEL.body}{display:none}
    #${SEL.panel}.ytco-compact:hover .${SEL.body}{display:block}
    /* Spoiler guard */
    #${SEL.panel} .ytco-blur{filter:blur(4px)}
    #${SEL.panel} .ytco-reveal{margin-top:8px;border:0;padding:6px 10px;border-radius:8px;background:var(--ytco-sub);color:var(--ytco-fg);cursor:pointer}
    #${SEL.panel} .ytco-settings{position:absolute;inset:0;display:none;flex-direction:column;gap:12px;padding:14px;background:var(--ytco-bg);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);overflow-y:auto}
    #${SEL.panel}.ytco-settings-open .ytco-settings{display:flex}
    #${SEL.panel} .ytco-settings-header{display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:14px}
    #${SEL.panel} .ytco-close{border:0;padding:4px 8px;border-radius:8px;background:var(--ytco-sub);color:var(--ytco-fg);cursor:pointer}
    #${SEL.panel} .ytco-setting{display:flex;flex-direction:column;gap:6px;font-size:12px}
    #${SEL.panel} .ytco-setting small{opacity:.7}
    #${SEL.panel} .ytco-setting-row{display:flex;gap:8px;align-items:center}
    #${SEL.panel} .ytco-setting input[type="text"],#${SEL.panel} .ytco-setting input[type="password"]{flex:1;padding:6px 8px;border:1px solid var(--ytco-border);border-radius:8px;background:rgba(0,0,0,0.04);color:var(--ytco-fg)}
    #${SEL.panel}[data-theme="dark"] .ytco-setting input[type="text"],#${SEL.panel}[data-theme="dark"] .ytco-setting input[type="password"]{background:rgba(255,255,255,0.06)}
    #${SEL.panel} .ytco-setting input[type="range"]{width:100%}
    #${SEL.panel} .ytco-switch{display:flex;align-items:center;justify-content:space-between}
    #${SEL.panel} .ytco-select{padding:6px 8px;border-radius:8px;border:1px solid var(--ytco-border);background:rgba(0,0,0,0.04);color:var(--ytco-fg)}
    #${SEL.panel}[data-theme="dark"] .ytco-select{background:rgba(255,255,255,0.06)}
    #${SEL.panel} .ytco-settings .ytco-btn{align-self:flex-start}
    #${SEL.panel} .ytco-settings{overflow-y:auto}
    #${SEL.panel}.ytco-settings-open{max-height:none;height:auto}
    #${SEL.panel}.ytco-settings-open .${SEL.body}{display:none}
    #${SEL.panel}.ytco-settings-open .ytco-settings{position:relative;inset:auto;overflow:visible;max-height:none}
    /* Jump highlight */
    .ytco-highlight-comment{outline:3px solid #ff0!important;transition:outline .5s}
  `;

  const UI = { panel: null, settings: null, controls: {} };
  let themeObserver = null;
  let themeObserverTarget = null;
  let lastDetectedTheme = null;

  class NoCommentsError extends Error {
    constructor(message = "This video has no comments yet.") {
      super(message);
      this.name = 'NoCommentsError';
    }
  }

  function addStyles() {
    if (document.getElementById("ytco-style")) return;
    const style = document.createElement("style");
    style.id = "ytco-style";
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function clamp(v, min, max){ return Math.min(Math.max(v, min), max); }

  function runWhenReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function getVideoId() {
    try {
      if (location.hostname === "youtu.be") {
        const id = location.pathname.slice(1).split("/")[0];
        return id || null;
      }
      if (location.pathname.startsWith('/shorts/')) {
        const id = location.pathname.slice('/shorts/'.length).split('/')[0];
        return id || null;
      }
      const url = new URL(location.href);
      return url.searchParams.get("v");
    } catch {
      return null;
    }
  }

  function isLivestream() {
    // Check for live chat frame (present on active livestreams)
    if (document.querySelector('ytd-live-chat-frame')) return true;
    // Check video duration (Infinity = live)
    const video = document.querySelector('video');
    if (video && video.duration === Infinity) return true;
    // Check ytd-watch-flexy attribute
    const watchFlexy = document.querySelector('ytd-watch-flexy');
    if (watchFlexy && watchFlexy.hasAttribute('is-live')) return true;
    return false;
  }

  // ---- Draggable ----
  function makeDraggable(panel){
    const handle = panel.querySelector(`.${SEL.header}`);
    if (!handle) return;
    let dragging = false, startX=0, startY=0, startLeft=0, startTop=0;

    const onMove = (x,y) => {
      const dx = x - startX, dy = y - startY;
      const maxL = Math.max(0, window.innerWidth - panel.offsetWidth);
      const maxT = Math.max(0, window.innerHeight - panel.offsetHeight);
      const left = clamp(startLeft + dx, 0, maxL);
      const top  = clamp(startTop  + dy, 0, maxT);
      panel.style.left = left + 'px';
      panel.style.top  = top  + 'px';
      panel.style.right = 'auto';
      panel.style.transform = 'none';
    };

    const mouseMove = (e) => { if(!dragging) return; e.preventDefault(); onMove(e.clientX, e.clientY); };
    const mouseUp = async () => {
      if(!dragging) return; dragging=false;
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
      await chrome.storage.sync.set({ ytcoPanelPos: { left: parseInt(panel.style.left||0), top: parseInt(panel.style.top||0) } });
      document.body.style.userSelect = '';
    };

    handle.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      // Don't start drag on buttons
      if (e.target.closest('.ytco-actions')) return;
      dragging = true; const rect = panel.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY; startLeft = rect.left; startTop = rect.top;
      panel.style.left = rect.left + 'px'; panel.style.top = rect.top + 'px'; panel.style.right = 'auto'; panel.style.transform = 'none';
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    // Touch support
    const touchMove = (e) => { if(!dragging) return; const t = e.touches[0]; if(!t) return; e.preventDefault(); onMove(t.clientX, t.clientY); };
    const touchEnd = async () => { if(!dragging) return; dragging=false; window.removeEventListener('touchmove', touchMove); window.removeEventListener('touchend', touchEnd); await chrome.storage.sync.set({ ytcoPanelPos: { left: parseInt(panel.style.left||0), top: parseInt(panel.style.top||0) } }); document.body.style.userSelect=''; };
    handle.addEventListener('touchstart', (e) => {
      if (e.target.closest('.ytco-actions')) return;
      const t = e.touches[0]; if(!t) return; dragging=true; const rect = panel.getBoundingClientRect();
      startX = t.clientX; startY = t.clientY; startLeft = rect.left; startTop = rect.top;
      panel.style.left = rect.left + 'px'; panel.style.top = rect.top + 'px'; panel.style.right = 'auto'; panel.style.transform = 'none';
      window.addEventListener('touchmove', touchMove, { passive: false });
      window.addEventListener('touchend', touchEnd);
    }, { passive: true });
  }

  function ensurePanelInViewport(panel, { persist = true, centerIfOverflow = false } = {}) {
    if (!panel) return;
    const adjust = () => {
      const rect = panel.getBoundingClientRect();
      if (!rect || !Number.isFinite(rect.width) || rect.width === 0) return;
      const margin = 12;
      const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
      const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
      let left = rect.left;
      let top = rect.top;
      let changed = false;

      const overflow = left < margin || left > maxLeft || top < margin || top > maxTop;

      if (centerIfOverflow && overflow) {
        centerPanel(panel, { persist });
        return;
      }

      if (left < margin || left > maxLeft) {
        left = clamp(left, margin, maxLeft);
        changed = true;
      }
      if (top < margin || top > maxTop) {
        top = clamp(top, margin, maxTop);
        changed = true;
      }

      if (changed) {
        const roundedLeft = Math.round(left);
        const roundedTop = Math.round(top);
        panel.style.left = `${roundedLeft}px`;
        panel.style.top = `${roundedTop}px`;
        panel.style.right = 'auto';
        panel.style.transform = 'none';
        if (persist && chrome?.storage?.sync?.set) {
          chrome.storage.sync.set({ ytcoPanelPos: { left: roundedLeft, top: roundedTop } }).catch(() => {});
        }
      }
    };

    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(adjust); else setTimeout(adjust, 0);
  }

  function centerPanel(panel, { persist = true } = {}) {
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    if (!rect || !Number.isFinite(rect.width) || rect.width === 0) return;
    const margin = 12;
    const width = rect.width;
    const height = rect.height;
    const targetLeft = clamp(Math.round((window.innerWidth - width) / 2), margin, Math.max(margin, window.innerWidth - width - margin));
    const currentTop = parseInt(panel.style.top, 10);
    const rectTop = Number.isFinite(currentTop) ? currentTop : Math.round(rect.top);
    const targetTop = clamp(rectTop, margin, Math.max(margin, window.innerHeight - height - margin));
    panel.style.left = `${targetLeft}px`;
    panel.style.top = `${targetTop}px`;
    panel.style.right = 'auto';
    panel.style.transform = 'none';
    if (persist && chrome?.storage?.sync?.set) {
      chrome.storage.sync.set({ ytcoPanelPos: { left: targetLeft, top: targetTop } }).catch(() => {});
    }
  }

  // ---- Theme ----
  let colorSchemeMQ = null;
  let colorSchemeListener = null;
  function detectYouTubeTheme() {
    const root = document.documentElement;
    const body = document.body;
    const app = document.querySelector('ytd-app');
    const isDark = (el) => !!el && (
      (typeof el.hasAttribute === 'function' && el.hasAttribute('dark')) ||
      (typeof el.getAttribute === 'function' && (el.getAttribute('dark') === '' || el.getAttribute('dark') === 'true')) ||
      (el.classList && Array.from(el.classList).some(cls => /dark/i.test(cls)))
    );
    if ([root, body, app].some(isDark)) return 'dark';
    try {
      const computed = window.getComputedStyle(root);
      const scheme = computed.getPropertyValue('color-scheme');
      if (scheme && scheme.toLowerCase().includes('dark')) return 'dark';
      const bg = computed.getPropertyValue('--yt-spec-base-background') || computed.getPropertyValue('--yt-swatch-primary');
      if (bg && /^rgba?\(/.test(bg)) {
        const nums = bg.match(/\d+(?:\.\d+)?/g) || [];
        if (nums.length >= 3) {
          const [r, g, b] = nums.map(Number);
          const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (luma < 128) return 'dark';
        }
      }
    } catch {}
    return 'light';
  }

  function resolveTheme(mode) {
    const normalized = (mode || 'youtube').toLowerCase();
    if (normalized === 'light' || normalized === 'dark') return normalized;
    if (normalized === 'youtube') {
      const detected = detectYouTubeTheme();
      lastDetectedTheme = detected;
      return detected;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(panel, mode){
    const theme = resolveTheme(mode);
    panel.setAttribute('data-theme', theme);
    lastDetectedTheme = theme;
  }

  function setupThemeListeners(panel, mode) {
    if (colorSchemeMQ && colorSchemeListener) {
      try { colorSchemeMQ.removeEventListener('change', colorSchemeListener); } catch { colorSchemeMQ.removeListener(colorSchemeListener); }
    }
    colorSchemeMQ = null;
    colorSchemeListener = null;
    const normalized = (mode || 'youtube').toLowerCase();
    if (normalized === 'auto' && window.matchMedia) {
      colorSchemeMQ = window.matchMedia('(prefers-color-scheme: dark)');
      colorSchemeListener = () => applyTheme(panel, 'auto');
      try { colorSchemeMQ.addEventListener('change', colorSchemeListener); } catch { colorSchemeMQ.addListener(colorSchemeListener); }
    }
    if (normalized === 'youtube') ensureYouTubeThemeWatcher(true);
    else if (themeObserver) {
      themeObserver.disconnect();
      themeObserver = null;
      themeObserverTarget = null;
    }
  }

  // ---- Smart ranking ----
  function compareByLikes(a, b) {
    const likeDelta = (b.likes || 0) - (a.likes || 0);
    if (likeDelta !== 0) return likeDelta;
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : NaN;
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : NaN;
    if (Number.isFinite(bTime) && Number.isFinite(aTime)) return bTime - aTime;
    if (Number.isFinite(bTime)) return -1;
    if (Number.isFinite(aTime)) return 1;
    return 0;
  }

  function sortComments(list, mode){
    if (!Array.isArray(list)) return [];
    if (mode === 'likes') return list.sort(compareByLikes);
    return list.sort(compareByLikes);
  }

  function addStylesOnce(){ addStyles(); }

  function createPanel() {
    const existing = document.getElementById(SEL.panel);
    if (existing) {
      ensurePanelInViewport(existing, { centerIfOverflow: true });
      return existing;
    }
    const panel = document.createElement("div");
    panel.id = SEL.panel;
    panel.innerHTML = `
      <div class="${SEL.header}">
        <div class="ytco-title">Top Comments</div>
        <div class="ytco-actions">
          <button class="ytco-btn" id="ytco-prev" title="Previous">◀</button>
          <button class="ytco-btn" id="ytco-next" title="Next">▶</button>
          <button class="ytco-btn" id="ytco-play" title="Pause/Play">⏯</button>
          <button class="ytco-btn" id="ytco-min" title="Minimize">—</button>
          <button class="ytco-btn" id="ytco-gear" title="Settings">⚙︎</button>
          <button class="ytco-btn" id="ytco-dismiss" title="Close (reopens on next video)">✕</button>
        </div>
      </div>
      <div class="${SEL.body}"><div class="ytco-comment">Loading…</div></div>
      <div class="ytco-settings" id="ytco-settings">
        <div class="ytco-settings-header">
          <span>Settings</span>
          <button class="ytco-close" id="ytco-settings-close" title="Close">✕</button>
        </div>
        <div class="ytco-setting">
          <label for="ytco-interval">Refresh interval <span id="ytco-interval-label">10s</span></label>
          <input type="range" id="ytco-interval" min="5" max="60" step="1">
        </div>
        <div class="ytco-setting">
          <label for="ytco-opacity">Panel opacity <span id="ytco-opacity-label">95%</span></label>
          <input type="range" id="ytco-opacity" min="20" max="100" step="5">
        </div>
        <div class="ytco-setting ytco-switch">
          <span>Only while playing</span>
          <input type="checkbox" id="ytco-playing-toggle">
        </div>
        <div class="ytco-setting ytco-switch">
          <span>Spoiler guard</span>
          <input type="checkbox" id="ytco-spoiler-toggle">
        </div>
        <div class="ytco-setting">
          <label for="ytco-theme-mode">Theme</label>
          <select id="ytco-theme-mode" class="ytco-select">
            <option value="youtube">Match YouTube</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Match system</option>
          </select>
        </div>
        <div class="ytco-setting ytco-switch">
          <span>Compact mode</span>
          <input type="checkbox" id="ytco-compact-toggle">
        </div>
        <div class="ytco-setting">
          <label for="ytco-rank-mode">Ranking</label>
          <select id="ytco-rank-mode" class="ytco-select">
            <option value="smart">Smart blend</option>
            <option value="likes">Top liked</option>
          </select>
        </div>
      </div>
    `;

    // Default position
    panel.style.top = '88px';

    document.body.appendChild(panel);
    makeDraggable(panel);
    centerPanel(panel, { persist: false });

    UI.panel = panel;
    UI.settings = panel.querySelector('#ytco-settings');
    UI.controls = {
      interval: panel.querySelector('#ytco-interval'),
      intervalLabel: panel.querySelector('#ytco-interval-label'),
      opacity: panel.querySelector('#ytco-opacity'),
      opacityLabel: panel.querySelector('#ytco-opacity-label'),
      playingToggle: panel.querySelector('#ytco-playing-toggle'),
      spoilerToggle: panel.querySelector('#ytco-spoiler-toggle'),
      themeMode: panel.querySelector('#ytco-theme-mode'),
      compactToggle: panel.querySelector('#ytco-compact-toggle'),
      rankMode: panel.querySelector('#ytco-rank-mode'),
      closeSettings: panel.querySelector('#ytco-settings-close')
    };

    if (UI.controls.closeSettings) UI.controls.closeSettings.addEventListener('click', () => openSettings(false));
    if (UI.controls.interval) {
      UI.controls.interval.addEventListener('input', (e) => {
        const sec = Number(e.target.value) || 10;
        if (UI.controls.intervalLabel) UI.controls.intervalLabel.textContent = `${sec}s`;
      });
      UI.controls.interval.addEventListener('change', (e) => {
        const sec = clamp(Number(e.target.value) || 10, 5, 60);
        applyIntervalSeconds(sec);
      });
    }
    if (UI.controls.opacity) {
      UI.controls.opacity.addEventListener('input', (e) => {
        const pct = Number(e.target.value) || 95;
        if (UI.controls.opacityLabel) UI.controls.opacityLabel.textContent = `${pct}%`;
        applyOpacity(pct / 100, { persist: false });
      });
      UI.controls.opacity.addEventListener('change', (e) => {
        const pct = clamp(Number(e.target.value) || 95, 20, 100);
        applyOpacity(pct / 100);
      });
    }
    if (UI.controls.playingToggle) UI.controls.playingToggle.addEventListener('change', (e) => {
      applyPlayingOnly(e.target.checked);
    });
    if (UI.controls.spoilerToggle) UI.controls.spoilerToggle.addEventListener('change', (e) => {
      applySpoilerGuard(e.target.checked);
    });
    if (UI.controls.themeMode) UI.controls.themeMode.addEventListener('change', (e) => {
      const mode = String(e.target.value || 'youtube');
      applyThemeMode(mode);
    });
    if (UI.controls.compactToggle) UI.controls.compactToggle.addEventListener('change', (e) => {
      applyCompactMode(e.target.checked);
    });
    if (UI.controls.rankMode) UI.controls.rankMode.addEventListener('change', (e) => {
      const mode = /^likes$/i.test(e.target.value) ? 'likes' : 'smart';
      applyRankMode(mode);
    });

    if (!window.__ytcoResizeHook) {
      let resizeTimer = null;
      const onViewportChange = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          const node = document.getElementById(SEL.panel);
          if (node) centerPanel(node);
        }, 120);
      };
      window.addEventListener('resize', onViewportChange);
      window.addEventListener('orientationchange', onViewportChange);
      window.__ytcoResizeHook = true;
    }

    const $ = (s) => panel.querySelector(s);
    $("#ytco-prev").onclick = () => showByOffset(-1);
    $("#ytco-next").onclick = () => showByOffset(1);
    $("#ytco-play").onclick = () => togglePlay();
    $("#ytco-min").onclick = () => panel.classList.toggle("ytco-min");
    $("#ytco-gear").onclick = () => openSettings();
    $("#ytco-dismiss").onclick = () => {
      STATE.closed = true;
      panel.style.display = 'none';
    };

    // Restore saved position and settings
    chrome.storage.sync.get({ ytcoPanelPos: null, compactMode: false, themeMode: 'youtube', panelOpacity: 0.95 }).then(({ ytcoPanelPos, compactMode, themeMode, panelOpacity }) => {
      if (ytcoPanelPos && Number.isFinite(ytcoPanelPos.left) && Number.isFinite(ytcoPanelPos.top)) {
        panel.style.left = ytcoPanelPos.left + 'px';
        panel.style.top = ytcoPanelPos.top + 'px';
        panel.style.right = 'auto';
        panel.style.transform = 'none';
      } else {
        centerPanel(panel, { persist: false });
      }
      STATE.compactMode = !!compactMode;
      STATE.themeMode = themeMode || 'youtube';
      STATE.panelOpacity = typeof panelOpacity === 'number' ? panelOpacity : 0.95;
      panel.classList.toggle('ytco-compact', STATE.compactMode);
      applyTheme(panel, STATE.themeMode);
      setupThemeListeners(panel, STATE.themeMode);
      applyOpacity(STATE.panelOpacity, { persist: false });
      ensurePanelInViewport(panel, { centerIfOverflow: true });
    });

    return panel;
  }

  function openSettings(forceState) {
    const panel = UI.panel || document.getElementById(SEL.panel);
    if (!panel) return;
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !panel.classList.contains('ytco-settings-open');
    panel.classList.toggle('ytco-settings-open', shouldOpen);
    if (shouldOpen) {
      syncSettingsUI();
    }
  }

  function syncSettingsUI() {
    if (!UI.controls) return;
    const seconds = Math.max(5, Math.round((STATE.intervalMs || 10000) / 1000));
    if (UI.controls.interval) UI.controls.interval.value = seconds;
    if (UI.controls.intervalLabel) UI.controls.intervalLabel.textContent = `${seconds}s`;
    const opacityPct = Math.round((STATE.panelOpacity || 0.95) * 100);
    if (UI.controls.opacity) UI.controls.opacity.value = opacityPct;
    if (UI.controls.opacityLabel) UI.controls.opacityLabel.textContent = `${opacityPct}%`;
    if (UI.controls.playingToggle) UI.controls.playingToggle.checked = !!STATE.playingOnly;
    if (UI.controls.spoilerToggle) UI.controls.spoilerToggle.checked = !!STATE.spoilerGuard;
    if (UI.controls.themeMode) UI.controls.themeMode.value = STATE.themeMode || 'youtube';
    if (UI.controls.compactToggle) UI.controls.compactToggle.checked = !!STATE.compactMode;
    if (UI.controls.rankMode) UI.controls.rankMode.value = STATE.rankMode || 'smart';
  }

  function applyOpacity(value, { persist = true } = {}) {
    const opacity = clamp(Math.round((value || 0.95) * 100) / 100, 0.2, 1.0);
    STATE.panelOpacity = opacity;
    const panel = UI.panel || document.getElementById(SEL.panel);
    if (panel) panel.style.setProperty('--ytco-bg-alpha', String(opacity));
    if (persist) chrome.storage.sync.set({ panelOpacity: opacity }).catch(() => {});
  }

  function applyPlayingOnly(on, { persist = true, restart = true } = {}) {
    const next = !!on;
    const changed = STATE.playingOnly !== next;
    STATE.playingOnly = next;
    if (UI.controls.playingToggle) UI.controls.playingToggle.checked = STATE.playingOnly;
    if (persist && changed) chrome.storage.sync.set({ playingOnly: STATE.playingOnly }).catch(() => {});
    if (restart && changed) restartLoop();
  }

  function applySpoilerGuard(on, { persist = true, reRender = true } = {}) {
    const next = !!on;
    const changed = STATE.spoilerGuard !== next;
    STATE.spoilerGuard = next;
    if (UI.controls.spoilerToggle) UI.controls.spoilerToggle.checked = STATE.spoilerGuard;
    if (persist && changed) chrome.storage.sync.set({ spoilerGuard: STATE.spoilerGuard }).catch(() => {});
    if (reRender && changed) renderCurrentComment();
  }

  function applyIntervalSeconds(sec, { persist = true, restart = true } = {}) {
    const seconds = clamp(Math.round(sec || 10), 5, 60);
    const previousSeconds = Math.round((STATE.intervalMs || 0) / 1000);
    const changed = seconds !== previousSeconds;
    STATE.intervalMs = seconds * 1000;
    if (UI.controls.interval) UI.controls.interval.value = seconds;
    if (UI.controls.intervalLabel) UI.controls.intervalLabel.textContent = `${seconds}s`;
    if (persist && changed) chrome.storage.sync.set({ intervalMs: STATE.intervalMs }).catch(() => {});
    showCounts();
    if (!changed) {
      if (restart && STATE.timer) restartLoop();
      return;
    }
    if (restart) {
      initForCurrentVideo(true);
    }
  }

  function applyCompactMode(on, { persist = true } = {}) {
    const next = !!on;
    const changed = STATE.compactMode !== next;
    STATE.compactMode = next;
    const panel = UI.panel || document.getElementById(SEL.panel);
    if (panel) panel.classList.toggle('ytco-compact', STATE.compactMode);
    if (UI.controls.compactToggle) UI.controls.compactToggle.checked = STATE.compactMode;
    if (persist && changed) chrome.storage.sync.set({ compactMode: STATE.compactMode }).catch(() => {});
    if (panel && changed) ensurePanelInViewport(panel, { centerIfOverflow: true });
  }

  function applyThemeMode(mode, { persist = true } = {}) {
    const panel = UI.panel || document.getElementById(SEL.panel);
    const next = (mode || 'youtube').toLowerCase();
    const changed = STATE.themeMode !== next;
    STATE.themeMode = next;
    if (UI.controls.themeMode) UI.controls.themeMode.value = STATE.themeMode;
    if (persist && changed) chrome.storage.sync.set({ themeMode: STATE.themeMode }).catch(() => {});
    if (panel) {
      applyTheme(panel, STATE.themeMode);
      setupThemeListeners(panel, STATE.themeMode);
    }
  }

  function applyRankMode(mode, { persist = true } = {}) {
    const next = mode === 'likes' ? 'likes' : 'smart';
    const changed = STATE.rankMode !== next;
    STATE.rankMode = next;
    if (UI.controls.rankMode) UI.controls.rankMode.value = STATE.rankMode;
    const write = persist && changed ? chrome.storage.sync.set({ rankMode: STATE.rankMode }).catch(() => {}) : Promise.resolve();
    showCounts();
    if (persist && changed) write.then(() => initForCurrentVideo(true));
    return write;
  }

  function applyApiKey(key, { persist = true, reload = true } = {}) {
    const trimmed = (key || '').trim();
    const previous = STATE.apiKeyStored;
    STATE.apiKeyStored = trimmed;
    STATE.apiKey = trimmed ? trimmed : DEFAULT_API_KEY;
    const write = persist && trimmed !== previous ? chrome.storage.sync.set({ apiKey: trimmed }).catch(() => {}) : Promise.resolve();
    if (reload && trimmed !== previous) write.then(() => initForCurrentVideo(true));
    return write;
  }

  function renderCurrentComment() {
    if (!STATE.comments.length) return;
    const idx = STATE.shownIdx >= 0 ? STATE.shownIdx : 0;
    const current = STATE.comments[idx] || STATE.comments[0];
    if (current) renderComment(current);
  }

  function ensureYouTubeThemeWatcher(reset = false) {
    const target = document.querySelector('ytd-app') || document.documentElement;
    if (!target) {
      if (reset) setTimeout(() => ensureYouTubeThemeWatcher(true), 500);
      return;
    }
    if (themeObserver && (reset || target !== themeObserverTarget)) {
      themeObserver.disconnect();
      themeObserver = null;
      themeObserverTarget = null;
    }
    if (themeObserver) return;
    themeObserverTarget = target;
    themeObserver = new MutationObserver(() => {
      if (STATE.themeMode === 'youtube') {
        const panel = UI.panel || document.getElementById(SEL.panel);
        if (panel) applyTheme(panel, 'youtube');
      }
    });
    themeObserver.observe(target, { attributes: true, attributeFilter: ['dark', 'class'] });
  }

  function setStatus(text) {
    const body = document.querySelector(`#${SEL.panel} .${SEL.body}`);
    if (body) body.innerHTML = `<div class="ytco-comment">${escapeHtml(text || "")}</div>`;
  }

  function escapeHtml(s = "") { const d = document.createElement("div"); d.innerText = s; return d.innerHTML; }

  function sanitizeAndRenderHTML(html) {
    const c = document.createElement("div");
    c.innerHTML = html || "";
    c.querySelectorAll("a").forEach(a => { a.target = "_blank"; a.rel = "noopener noreferrer nofollow"; a.style.color = "inherit"; });
    return c.innerHTML;
  }

  // ---- Jump to comment ----
  function jumpToComment(item) {
    if (!item) return;

    // Scroll comments section into view first
    const commentsSection = document.querySelector('#comments, ytd-comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Trigger lazy load by scrolling down
      window.scrollTo({ top: document.body.scrollHeight * 0.6, behavior: 'smooth' });
    }

    // After comments load, try to find and highlight the specific comment
    const tryFind = (attemptsLeft) => {
      if (attemptsLeft <= 0) return;

      const threads = document.querySelectorAll('ytd-comment-thread-renderer');
      for (const thread of threads) {
        // Match by comment id stored on the element, or by text content
        const contentEl = thread.querySelector('#content-text, yt-formatted-string#content-text');
        if (!contentEl) continue;
        const domText = (contentEl.textContent || '').trim().slice(0, 80);
        const itemText = (item.text || '').trim().slice(0, 80);
        if (domText && itemText && domText === itemText) {
          thread.scrollIntoView({ behavior: 'smooth', block: 'center' });
          thread.classList.add('ytco-highlight-comment');
          setTimeout(() => thread.classList.remove('ytco-highlight-comment'), 3000);
          return;
        }
      }
      // Not found yet, retry
      setTimeout(() => tryFind(attemptsLeft - 1), 600);
    };

    setTimeout(() => tryFind(8), 400);
  }

  const STATE = {
    videoId: null, loadingVideoId: null, comments: [], idx: 0, shownIdx: -1,
    timer: null, intervalMs: 10000, playingOnly: true,
    apiKey: DEFAULT_API_KEY, apiKeyStored: DEFAULT_API_KEY,
    rankMode: 'smart', spoilerGuard: false, themeMode: 'youtube',
    compactMode: false, panelOpacity: 0.95, closed: false
  };

  function showCounts() {
    const c = document.getElementById("ytco-count"); if (c) c.textContent = (STATE.comments.length||0).toLocaleString();
    const i = document.getElementById("ytco-int"); if (i) i.textContent = Math.round(STATE.intervalMs/1000) + "s";
    const o = document.getElementById("ytco-order"); if (o) o.textContent = STATE.rankMode;
  }

  function renderComment(item) {
    const panel = document.getElementById(SEL.panel);
    const body = document.querySelector(`#${SEL.panel} .${SEL.body}`);
    if (!panel || !body || !item) return;
    const safe = sanitizeAndRenderHTML(item.html || escapeHtml(item.text || ""));

    // Spoiler guard
    let spoiler = false;
    const video = document.querySelector('video');
    const now = video ? (video.currentTime || 0) : 0;
    if (STATE.spoilerGuard && item.times && item.times.some(t => t > now + 2)) spoiler = true;

    body.innerHTML = `
      <div class="ytco-comment ${spoiler ? 'ytco-blur' : ''}">${safe}</div>
      ${spoiler ? '<button class="ytco-reveal" id="ytco-reveal">👁 Show</button>' : ''}
      <div class="ytco-meta">
        <span class="ytco-author">${escapeHtml(item.author || 'Anonymous')}</span> • ❤ ${(item.likes||0).toLocaleString()}${item.replies?` • 💬 ${item.replies}`:''}${item.times?.length ? ` • ⏱ ${item.times.map(secToTime).join(", ")}` : ""}
        <button class="ytco-jump" id="ytco-jump-btn" title="Scroll to this comment in the page">↓ find</button>
      </div>
    `;

    if (spoiler) {
      const btn = document.getElementById('ytco-reveal');
      if (btn) btn.onclick = () => { const c = body.querySelector('.ytco-comment'); if (c) c.classList.remove('ytco-blur'); btn.remove(); };
    }

    const jumpBtn = document.getElementById('ytco-jump-btn');
    if (jumpBtn) jumpBtn.onclick = () => jumpToComment(item);
  }

  function secToTime(sec) { const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60; return h ? `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}` : `${m}:${String(s).padStart(2,"0")}`; }

  function extractTimecodes(text="") {
    const re = /(?<!\d)(?:(\d{1,2}):)?([0-5]?\d):([0-5]\d)(?!\d)/g;
    const times = []; let m;
    while ((m = re.exec(text)) !== null) {
      const h = m[1] ? parseInt(m[1],10) : 0, mm = parseInt(m[2],10)||0, ss = parseInt(m[3],10)||0;
      times.push(h*3600 + mm*60 + ss);
    }
    return times;
  }

  function enhanceWithTimecodes(list) { for (const c of list) c.times = extractTimecodes(c.text || ""); return list; }

  function isNoCommentsResponse(reason = "", message = "", status = 0) {
    const text = `${reason} ${message}`.toLowerCase();
    if (!text.trim()) return false;
    if (text.includes('comments disabled') || text.includes('comments are disabled')) return true;
    if (text.includes('disabled comments')) return true;
    if (text.includes('live streaming comments') || text.includes('livechatdisabled')) return true;
    if (text.includes('not enabled for comments')) return true;
    if (text.includes('does not have comments')) return true;
    if (status === 403 && text.includes('forbidden') && text.includes('comment')) return true;
    return false;
  }

  function selectComment() {
    if (!STATE.comments.length) return null;
    const video = document.querySelector("video");
    const isPlaying = video && !video.paused && !video.ended && video.readyState > 2;
    if (STATE.playingOnly && !isPlaying) return null;

    const idx = STATE.idx % STATE.comments.length;
    const currentTime = video ? Math.floor(video.currentTime || 0) : 0;
    const timedComment = STATE.comments.find(c => Array.isArray(c.times) && c.times.some(sec => Math.abs(sec - currentTime) <= 10));
    if (timedComment) {
      STATE.shownIdx = STATE.comments.indexOf(timedComment);
      return timedComment;
    }

    const comment = STATE.comments[idx];
    STATE.shownIdx = idx;
    STATE.idx = (idx + 1) % STATE.comments.length;
    return comment;
  }

  // Navigate prev/next relative to what's currently shown, then resume from there
  function showByOffset(delta) {
    if (!STATE.comments.length) return;
    const n = STATE.comments.length;
    const base = STATE.shownIdx >= 0 ? STATE.shownIdx : Math.max(0, STATE.idx - 1);
    const targetIdx = (base + delta + n) % n;
    STATE.shownIdx = targetIdx;
    STATE.idx = (targetIdx + 1) % n;
    renderComment(STATE.comments[targetIdx]);
  }

  function startLoop() { stopLoop(); STATE.timer = setInterval(() => { const c = selectComment(); if (c) renderComment(c); }, STATE.intervalMs); }
  function stopLoop() { if (STATE.timer) clearInterval(STATE.timer); STATE.timer = null; }
  function restartLoop() { stopLoop(); startLoop(); }
  function togglePlay() { if (STATE.timer) stopLoop(); else startLoop(); }

  function isUsableDuration(val) { return Number.isFinite(val) && val > 0 && val !== Infinity; }

  async function resolveVideoDuration(timeoutMs = 1500) {
    const video = document.querySelector('video');
    if (!video) return null;
    if (isUsableDuration(video.duration)) return video.duration;
    return new Promise((resolve) => {
      let done = false;
      let timer = null;
      const finish = () => {
        if (done) return;
        done = true;
        if (timer) clearTimeout(timer);
        video.removeEventListener('loadedmetadata', finish);
        video.removeEventListener('durationchange', finish);
        const value = Number(video.duration);
        resolve(isUsableDuration(value) ? value : null);
      };
      timer = setTimeout(finish, timeoutMs);
      video.addEventListener('loadedmetadata', finish, { once: true });
      video.addEventListener('durationchange', finish, { once: true });
    });
  }

  async function computeDesiredCommentCount() {
    const fallback = 300;
    const intervalSeconds = Math.max(1, Math.round((STATE.intervalMs || 10000) / 1000));
    if (!intervalSeconds) return fallback;
    const duration = await resolveVideoDuration();
    if (!isUsableDuration(duration)) return fallback;
    const count = Math.ceil(duration / intervalSeconds);
    return count > 0 ? count : fallback;
  }

  async function fetchComments(videoId) {
    if (!STATE.apiKey) throw new Error("No API key set. Click ⚙︎ to add your YouTube Data API key.");
    const desiredCount = await computeDesiredCommentCount();
    const targetCount = Math.max(1, Number.isFinite(desiredCount) ? Math.ceil(desiredCount) : 300);
    const estimatedPages = Math.max(1, Math.ceil(targetCount / 100));
    const maxPages = Math.max(estimatedPages + 2, 3);
    let all = [], nextPageToken = null, pages = 0;
    do {
      const u = new URL("https://www.googleapis.com/youtube/v3/commentThreads");
      u.searchParams.set("part","snippet");
      u.searchParams.set("videoId",videoId);
      u.searchParams.set("maxResults","100");
      u.searchParams.set("order","relevance");
      u.searchParams.set("key",STATE.apiKey);
      if (nextPageToken) u.searchParams.set("pageToken", nextPageToken);
      const r = await fetch(u.toString());
      let data = null;
      const raw = await r.text();
      try { data = raw ? JSON.parse(raw) : null; } catch { data = null; }
      const dataObj = data && typeof data === 'object' ? data : {};
      if (!r.ok) {
        const err = dataObj?.error || {};
        const primary = Array.isArray(err.errors) && err.errors.length ? err.errors[0] : {};
        const reason = primary?.reason || primary?.message || '';
        const message = err?.message || primary?.message || raw || '';
        if (isNoCommentsResponse(reason, message, r.status)) throw new NoCommentsError();
        throw new Error(message || `YouTube API error ${r.status}`);
      }
      if (dataObj?.error) {
        const err = dataObj.error;
        const primary = Array.isArray(err.errors) && err.errors.length ? err.errors[0] : {};
        const reason = primary?.reason || primary?.message || '';
        const message = err?.message || primary?.message || '';
        if (isNoCommentsResponse(reason, message)) throw new NoCommentsError();
        throw new Error(message || "API error");
      }
      const items = (dataObj.items || []).map(it => {
        const s = it.snippet?.topLevelComment?.snippet || {}; const th = it.snippet || {};
        return {
          id: it.snippet?.topLevelComment?.id || it.id || null,
          html: s.textDisplay || "",
          text: s.textOriginal || "",
          author: s.authorDisplayName || "Anonymous",
          likes: s.likeCount || 0,
          publishedAt: s.publishedAt || null,
          replies: th.totalReplyCount || 0
        };
      });
      all.push(...items);
      nextPageToken = dataObj.nextPageToken || null;
      pages++;
      if (!nextPageToken) break;
      if (all.length >= targetCount) break;
    } while (pages < maxPages);

    return sortComments(all, STATE.rankMode);
  }

  async function initForCurrentVideo(force = false) {
    addStylesOnce();
    const panel = createPanel();

    const vid = getVideoId();

    if (!vid) {
      stopLoop();
      STATE.videoId = null;
      STATE.loadingVideoId = null;
      STATE.comments = [];
      setStatus("Open a video to load comments.");
      return;
    }

    // Check if this is a new video — if so, un-close the panel
    if (vid !== STATE.videoId) {
      STATE.closed = false;
    }

    // Hide/show panel based on closed state and livestream detection
    if (STATE.closed) {
      panel.style.display = 'none';
      return;
    }

    // Defer livestream check slightly to allow DOM to settle
    const checkLive = () => isLivestream();
    if (checkLive()) {
      panel.style.display = 'none';
      return;
    }

    panel.style.display = '';
    ensurePanelInViewport(panel, { persist: false, centerIfOverflow: true });

    if (!force && (vid === STATE.loadingVideoId || (vid === STATE.videoId && STATE.comments.length))) {
      return;
    }

    const prefs = await chrome.storage.sync.get({
      apiKey: DEFAULT_API_KEY,
      intervalMs: 10000,
      playingOnly: true,
      themeMode: 'youtube',
      compactMode: false,
      rankMode: 'smart',
      spoilerGuard: false,
      panelOpacity: 0.95
    });
    applyApiKey(typeof prefs.apiKey === 'string' ? prefs.apiKey : DEFAULT_API_KEY, { persist: false, reload: false });
    applyIntervalSeconds((prefs.intervalMs || 10000) / 1000, { persist: false, restart: false });
    applyPlayingOnly(prefs.playingOnly, { persist: false, restart: false });
    applyRankMode(prefs.rankMode, { persist: false });
    applySpoilerGuard(prefs.spoilerGuard, { persist: false, reRender: false });
    applyCompactMode(prefs.compactMode, { persist: false });
    applyThemeMode(prefs.themeMode, { persist: false });
    applyOpacity(typeof prefs.panelOpacity === 'number' ? prefs.panelOpacity : 0.95, { persist: false });
    syncSettingsUI();
    ensurePanelInViewport(panel, { centerIfOverflow: true });
    showCounts();

    STATE.videoId = vid;
    STATE.loadingVideoId = vid;
    STATE.idx = 0;
    STATE.shownIdx = -1;
    STATE.comments = [];
    stopLoop();

    setStatus(STATE.apiKey ? "Loading top comments…" : "No API key set. Click ⚙︎ in the panel to add your key.");
    if (!STATE.apiKey) {
      STATE.loadingVideoId = null;
      return;
    }

    try {
      const list = enhanceWithTimecodes(await fetchComments(vid));
      STATE.comments = list; showCounts();
      if (!list.length) {
        setStatus("This video has no comments yet.");
        return;
      }
      STATE.shownIdx = 0;
      STATE.idx = 1;
      renderComment(list[0]);
      startLoop();
    } catch (err) {
      if (err instanceof NoCommentsError) {
        log('info', 'no-comments', err.message);
        STATE.comments = [];
        stopLoop();
        setStatus(err.message);
      } else {
        log("error", err);
        STATE.videoId = null;
        setStatus("Error: " + (err?.message || String(err)) + "<br>Tip: check API key + quota");
      }
    } finally {
      STATE.loadingVideoId = null;
    }
  }

  const scheduleInit = (() => {
    let timer = null;
    return (reason = 'spa', force = false, delay = 250) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        log('init', reason, force ? '(force)' : '');
        initForCurrentVideo(force);
      }, delay);
    };
  })();

  function setupSpaHooks() {
    const trigger = (reason) => scheduleInit(reason);

    window.addEventListener('yt-navigate-finish', () => trigger('yt-navigate-finish'));
    window.addEventListener('yt-page-data-updated', () => trigger('yt-page-data-updated'));
    window.addEventListener('popstate', () => trigger('popstate'));

    const hookHistory = (method) => {
      const original = history[method];
      if (typeof original !== 'function') return;
      history[method] = function(...args) {
        const result = original.apply(this, args);
        trigger(method);
        return result;
      };
    };
    hookHistory('pushState');
    hookHistory('replaceState');

    if (document.body) {
      const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (Array.from(m.addedNodes).some(node => node.nodeName === 'YTD-WATCH-FLEXY' || node.nodeName === 'YTD-SHORTS')) {
            trigger('watch-flexy');
            break;
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }

  // Boot + SPA hooks
  runWhenReady(() => {
    addStylesOnce();
    createPanel();
    initForCurrentVideo(true);
    setupSpaHooks();
  });
})();
