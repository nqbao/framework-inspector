import detectByHeader from './detector/header';

const appinfo = require('./apps.js');
const tabinfo = {};

// expose appinfo page so that popup page can access to it
window.appinfo = appinfo;

const pickMainApp = apps => {
  let mainApp = null;

  for (let app in apps) {
    if (mainApp === null) {
      mainApp = app;
      continue;
    }

    if (appinfo[app].priority) {
      if (!appinfo[mainApp].priority) {
        mainApp = app;
      } else if (appinfo[mainApp].priority > appinfo[app].priority) {
        mainApp = app;
      }
    }
  }

  return mainApp;
};

// collect apps from header information:
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    var appsFound = detectByHeader(details.responseHeaders);
    tabinfo[details.tabId] = tabinfo[details.tabId] || {};
    tabinfo[details.tabId]['headers'] = appsFound;
  },
  {
    urls: ['<all_urls>'],
    types: ['main_frame']
  },
  ['responseHeaders']
);

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  // 'result' event issued by main.js once app identification is complete
  if (request.msg == 'result') {
    if (!tabinfo[sender.tab.id]) {
      tabinfo[sender.tab.id] = {};
    }

    var thisTab = tabinfo[sender.tab.id];

    thisTab['apps'] = request.apps;

    // merge with any apps we discovered via headers:
    for (var header in thisTab['headers']) {
      thisTab['apps'][header] = thisTab['headers'][header];
    }

    // change the tab icon
    const mainApp = pickMainApp(request.apps);
    const mainAppInfo = appinfo[mainApp];
    if (mainAppInfo) { // lazy bug
      let appTitle = mainAppInfo.title ? mainAppInfo.title : mainApp;

      if (request.apps[mainApp] != "-1") {
        appTitle = mainApp + ' ' + request.apps[mainApp];
      }

      chrome.pageAction.setIcon({tabId: sender.tab.id, path: 'apps/' + mainAppInfo.icon});
      chrome.pageAction.setTitle({tabId: sender.tab.id, title: appTitle});
    }

    chrome.pageAction.show(sender.tab.id);
    sendResponse({});
  } else if (request.msg == 'get') {
    // Request for 'get' comes from the popup page, asking for the list of apps
    var apps = tabinfo[request.tab];
    sendResponse(apps);
  }
});

// when tab is closed, also delete its info
chrome.tabs.onRemoved.addListener(function (tabId) {
  delete tabinfo[tabId];
});
