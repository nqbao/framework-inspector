import { retriveAppInfo } from './helpers/appInfo';

const bg = chrome.extension.getBackgroundPage();

chrome.tabs.getSelected(null, function(tab){
  retriveAppInfo(tab.id, function(response) {
    const display = document.getElementById('app_list');
    const apps = response && response.apps ? response.apps : {};
    const appinfo = bg.appinfo;
    let count = 0;
  
    for (let appid in apps) {
      const app = appinfo[appid] ? appinfo[appid] : {};
      let title = app.title || appid;
      
      // i'm lazy to fill all kind of the information :(
      if (!app.url) app.url = appinfo[''].url.replace('%s',appid); // it's google url
      if (!app.icon) app.icon = appinfo[''].icon;
      
      if( apps[appid] != "-1") {
        title = title + ' ' + apps[appid]
      }

      // use DOM to avoid error
      const link = document.createElement('a');

      link.target = "_blank";
      link.title = title;
      link.href = app.url;

      const icon = document.createElement('img');
      icon.alt = title;
      icon.width = 16;
      icon.height = 16;
      icon.src = "apps/" + app.icon;
      
      link.appendChild(icon);
      display.appendChild(link);
      
      count++;
    }

    // correct the width for better view
    if (count < 8) {
      display.style.width = (count*20) + "px";
    } else {
      display.style.width = "160px";
    }
  });
});
