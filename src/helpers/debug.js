// useful tip from this article http://krasimirtsonev.com/blog/article/Chrome-extension-debugging-dev-tools-tab-or-how-to-make-console-log

export function debug(object) {
  chrome.runtime.sendMessage({ msg: "debug", payload: object });
};
