/**
 * Framework Inspector
 *
 * Detect apps run on current page and send back to background page.
 * Some part of this script was refered from Wappalyzer Firefox Addon.
 *
 * @author Bao Nguyen <b@nqbao.com>
 * @license GPLv3
 **/
import { EVENT_READY, META_TAG_ID } from './constants';
import detectByMetaTag from './detector/metaTag';
import detectByScriptTag from './detector/scriptTag';
import detectByHtmlContent from './detector/htmlContent';
import detectByJavascript from './detector/javascript';
import detectByCssClass from './detector/cssClass';

let _apps = {};
const doc = document.documentElement;

// run all the steps!
[
  detectByMetaTag,
  detectByScriptTag,
  detectByHtmlContent,
  detectByJavascript,
  detectByCssClass
].forEach(fn => {
  _apps = fn(doc, _apps);
});

// send back to background page
var meta = document.getElementById(META_TAG_ID);
meta.content = JSON.stringify(_apps);

// notify Background Page
var done = document.createEvent('Event');
done.initEvent(EVENT_READY, true, true);
meta.dispatchEvent(done);
