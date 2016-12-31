const rules = {
  'Google Analytics': /google-analytics.com\/(ga|urchin).js/i,
  'Quantcast': /quantserve\.com\/quant\.js/i,
  'Prototype': /prototype\.js/i,
  'Joomla': /\/components\/com_/,
  'Ubercart': /uc_cart/i,
  'Closure': /\/goog\/base\.js/i,
  'MODx': /\/min\/b=.*f=.*/,
  'MooTools': /mootools/i,
  'Dojo': /dojo(\.xd)?\.js/i,
  'script.aculo.us': /scriptaculous\.js/i,
  'Disqus': /disqus.com/i,
  'GetSatisfaction': /getsatisfaction\.com\/feedback/i,
  'Wibiya': /wibiya\.com\/Loaders\//i,
  'reCaptcha': /(google\.com\/recaptcha|api\.recaptcha\.net\/)/i,
  'Mollom': /mollom\/mollom\.js/i, // only work on Drupal now
  'ZenPhoto': /zp-core\/js/i,
  'Gallery2': /main\.php\?.*g2_.*/i,
  'AdSense': /pagead\/show_ads\.js/,
  'XenForo': /js\/xenforo\//i,
  'Cappuccino': /Frameworks\/Objective-J\/Objective-J\.js/,
  'Avactis': /\/avactis-themes\//i,
  'Volusion': /a\/j\/javascripts\.js/,
  'AddThis': /addthis\.com\/js/,
  'BuySellAds': /buysellads.com\/.*bsa\.js/,
  'Weebly': /weebly\.com\/weebly\//,
  'Bootstrap': /bootstrap-.*\.js/,
  'Jigsy': /javascripts\/asterion\.js/, // may change later
  'Yola': /analytics\.yola\.net/, // may change later
  'Alfresco': /(alfresco)+(-min)?(\/scripts\/menu)?\.js/, // both Alfresco Share and Explorer apps
  'Mura CMS': /mura\/js/,
  'Tiki Wiki CMS Groupware': /tiki-js/,
  'OpenTag': /opentag.*\.js/,
  'KISSmetrics': /i.kissmetrics.com\/i.js/
};

/**
 * Detect by script tags
 */
export default function detectByScriptTag(doc, _apps) {
  const scripts = doc.getElementsByTagName("script");

  for (let idx in scripts) {
    const s = scripts[idx].src;
    if (!s) continue;

    for (var t in rules) {
      if (t in _apps) continue;
      if (rules[t].test(s)) {
        _apps[t] = -1;
      }
    }
  }

  return _apps;
}
