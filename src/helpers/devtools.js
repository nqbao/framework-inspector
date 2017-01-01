// useful tip from this article http://krasimirtsonev.com/blog/article/Chrome-extension-debugging-dev-tools-tab-or-how-to-make-console-log

export function debug(payload) {
  chrome.runtime.sendMessage({ msg: "debug", payload });
}

export function openTab(url) {
  chrome.runtime.sendMessage({ msg: "openTab", url });
}
