// Content-script fetches to googleapis.com can be blocked as cross-origin from the
// youtube.com frame, so the request is proxied through the extension service worker.
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (!msg || msg.type !== "ytco-fetch") return;
  let url;
  try { url = new URL(msg.url); } catch { sendResponse({ ok: false, status: 0, text: "Invalid URL" }); return; }
  if (url.origin !== "https://www.googleapis.com") { sendResponse({ ok: false, status: 0, text: "Blocked URL" }); return; }
  fetch(url.toString())
    .then(async r => sendResponse({ ok: r.ok, status: r.status, text: await r.text() }))
    .catch(e => sendResponse({ ok: false, status: 0, text: String(e?.message || e) }));
  return true;
});
