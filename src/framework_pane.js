import { debug } from './helpers/debug';
import { subscribeAppInfo } from './helpers/appInfo';

const tabId = chrome.devtools.inspectedWindow.tabId;

// wait for load event
window.onload = () => {
  const root = document.getElementById('root');

  subscribeAppInfo(tabId, response => {
    root.innerHTML = JSON.stringify(response);
  });
};
