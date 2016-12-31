/**
 * Framework Inspector
 *
 * Detect apps run on current page and send back to background page.
 * Some part of this script was refered from Wappalyzer Firefox Addon.
 *
 * @author Bao Nguyen <b@nqbao.com>
 * @license GPLv3
 **/

import { EVENT_READY, META_TAG_NAME, META_TAG_ID } from './constants';

const head = document.getElementsByTagName('head')[0];

if (head) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = chrome.extension.getURL('./detector.js');

  const meta = document.createElement('meta');
  meta.name = META_TAG_NAME;
  meta.id = META_TAG_ID;
  head.appendChild(meta);
  head.appendChild(script);

  // wait for ready event
  meta.addEventListener(EVENT_READY, function () {
    const apps = JSON.parse(meta.content);

    if (Object.keys(apps).length > 0) {
      chrome.extension.sendMessage({msg: "result", apps: apps});
    }
  });
}
