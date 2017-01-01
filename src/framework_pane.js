import { debug, openTab } from './helpers/devtools';
import { h, render } from 'preact';
import App from './components/app';
import { subscribeAppInfo } from './helpers/appInfo';

// assign global h so preact can work easily
window.h = h;

// wait for load event
window.onload = () => {
  const rootDom = document.getElementById('root');
  let root = render(<App />, rootDom, root);

  const tabId = chrome.devtools.inspectedWindow.tabId;
  subscribeAppInfo(tabId, response => {
   root = render(<App apps={response.apps} openTab={openTab} />, rootDom, root);
  });
};
