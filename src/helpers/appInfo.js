export function retriveAppInfo(tabId, callback) {
  chrome.extension.sendMessage({ msg: "get", tab: tabId }, callback);
};

/**
 * Subscribe to app info
 */
export function subscribeAppInfo(tabId, callback) {
  const connection = chrome.runtime.connect({
    name: `devtools-pane-${tabId}`
  });

  // just relay message
  connection.onMessage.addListener(response => callback(response));

  return connection;
};
