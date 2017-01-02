import detectByHeader from './detector/header';

const appinfo = require('./apps.js');
const tabinfo = {};
const devtoolConnections = {};

// expose appinfo page so that popup page can access to it, we can simply remove this later
// when we send full app info to user
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

const gatherFullAppInfo = apps => {
  const fullAppInfo = {};
  for (let appId in apps) {
    fullAppInfo[appId] = Object.assign({
      version: apps[appId]
    }, appinfo[appId]);
  }

  return fullAppInfo;
};

// collect apps from header information:
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    const appsFound = detectByHeader(details.responseHeaders);
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
  if (request.msg === 'result') {
    // 'result' event issued by main.js once app identification is complete
    if (!tabinfo[sender.tab.id]) {
      tabinfo[sender.tab.id] = {};
    }

    const thisTab = tabinfo[sender.tab.id];
    thisTab['apps'] = request.apps;

    // merge with any apps we discovered via headers:
    for (let header in thisTab['headers']) {
      thisTab['apps'][header] = thisTab['headers'][header];
    }

    // broadcast to devtools
    if (devtoolConnections[sender.tab.id]) {
      devtoolConnections[sender.tab.id].postMessage({ apps: gatherFullAppInfo(thisTab.apps) });
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
  } else if (request.msg === 'get') {
    // Request for 'get' comes from the popup or devtools page, asking for the list of apps
    sendResponse(tabinfo[request.tab]);
  } else if (request.msg === 'debug') {
    console.debug(request.payload);
  } else if (request.msg === 'openTab') {
    chrome.tabs.create({
      url: request.url
    });
  }
});

// when tab is closed, also delete its info
chrome.tabs.onRemoved.addListener(function (tabId) {
  delete tabinfo[tabId];
});

chrome.runtime.onConnect.addListener(function(connection) {
  const tabId = connection.name.split('-')[2];
  devtoolConnections[tabId] = connection;
  
  console.debug(`Devtool ${tabId} connected.`);

  connection.onDisconnect.addListener(function() {
    console.debug(`Devtool ${tabId} disconnected.`);
    delete devtoolConnections[tabId];
  });

  // send the first appInfo
  connection.postMessage({
    apps: gatherFullAppInfo(tabinfo[tabId] && tabinfo[tabId].apps || {})
  });
});
