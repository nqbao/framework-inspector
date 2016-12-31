/**
 * Detect by inline javascript
 */
export default function detectByJavascript(doc, _apps) {
  var js_tests = {
    'Drupal': function () {
      return window.Drupal;
    },
    'TomatoCMS': function () {
      return window.Tomato;
    },
    'MojoMotor': function () {
      return window.Mojo;
    },
    'ErainCart': function () {
      return window.fn_register_hooks;
    },
    'SugarCRM': function () {
      return window.SUGAR;
    },
    'YUI': function () {
      return window.YAHOO | window.YUI;
    },
    'jQuery': function () {
      return window.jQuery;
    },
    'jQuery UI': function () {
      return window.jQuery && window.jQuery.ui;
    },
    'jQuery Mobile': function () {
      return window.jQuery && window.jQuery.mobile;
    },
    'Typekit': function () {
      return window.Typekit;
    },
    'Facebook': function () {
      return window.FB && window.FB.api;
    },
    'ExtJS': function () {
      return window.Ext;
    },
    'Modernizr': function () {
      return window.Modernizr;
    },
    'Raphael': function () {
      return window.Raphael;
    },
    'Cufon': function () {
      return window.Cufon;
    },
    'sIFR': function () {
      return window.sIFR;
    },
    'Xiti': function () {
      return window.xtsite && window.xtpage;
    },
    'Piwik': function () {
      return window.Piwik;
    },
    'IPB': function () {
      return ( window.IPBoard || window.ipsSettings );
    },
    'MyBB': function () {
      return window.MyBB;
    },
    'Clicky': function () {
      return window.clicky;
    },
    'Woopra': function () {
      return window.woopraTracker;
    },
    'RightJS': function () {
      return window.RightJS;
    },
    'OpenWebAnalytics': function () {
      return window.owa_baseUrl;
    },
    'Prettify': function () {
      return window.prettyPrint;
    },
    'SiteCatalyst': function () {
      return window.s_account;
    },
    'Twitter': function () {
      return window.twttr;
    },
    'Coremetrics': function () {
      return window.cmCreatePageviewTag;
    },
    'Buzz': function () {
      return window.google_buzz__base_url;
    },
    'Plus1': function () {
      return window.gapi && window.gapi.plusone;
    },
    'Google Loader': function () {
      return window.google && window.google.load;
    },
    'GoogleMapApi': function () {
      return window.google && window.google.maps;
    },
    'Head JS': function () {
      return window.head && window.head.js;
    },
    'SWFObject': function () {
      return window.swfobject;
    },
    'Chitika': function () {
      return window.ch_client && window.ch_write_iframe;
    },
    'Jimdo': function () {
      return window.jimdoData;
    },
    'Webs': function () {
      return window.webs;
    },
    'Backbone.js': function () {
      return window.Backbone && typeof(window.Backbone.sync) === 'function';
    },
    'Underscore.js': function () {
      return window._ && typeof(window._.identity) === 'function' &&
        window._.identity('abc') === 'abc' && !window._.snakeCase;
    },
    'Lodash.js': function () {
      // Lodash has an extra snakeCase function, while underscore does not have
      return window._ && typeof(window._.identity) === 'function' &&
        window._.identity('abc') === 'abc' && window._.snakeCase;
    },
    'Spine': function () {
      return window.Spine;
    },
    'Angular': function () {
      return window.angular;
    },
    'Ning': function () {
      return window.ning;
    },
    'ektron': function () {
      return window.Ektron;
    },
    'etracker': function () {
      return window.et_params;
    },
    'SPDY': function () {
      return window.chrome.loadTimes().wasFetchedViaSpdy;
    },
    'LiveStreet': function () {
      return window.LIVESTREET_SECURITY_KEY;
    },
   'OpenLayers': function () {
      return window.OpenLayers;
    },
    'Zepto': function () {
      return window.Zepto;
    }
  };

  for (let t in js_tests) {
    if (t in _apps) continue;

    if (js_tests[t]()) {
      _apps[t] = -1;
    }
  }

  // TODO: merge with above
  var js_versions = {
    'Prototype': function () {
      if ('Prototype' in window && Prototype.Version !== undefined)
        return window.Prototype.Version;
    },
    'script.aculo.us': function () {
      if ('Scriptaculous' in window && Scriptaculous.Version !== undefined)
        return window.Scriptaculous.Version;
    },
    'jQuery': function () {
      if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined)
        return jQuery.prototype.jquery;
    },
    'jQuery UI': function () {
      if (typeof jQuery === 'function' && jQuery.ui && jQuery.ui.version !== undefined)
        return jQuery.ui.version;
    },
    'jQuery Mobile': function () {
      if (typeof jQuery === 'function' && jQuery.ui && jQuery.mobile.version !== undefined)
        return jQuery.mobile.version;
    },
    'Dojo': function () {
      if (typeof dojo === 'object' && dojo.version.toString() !== undefined)
        return dojo.version.toString();
    },
    'YUI': function () {
      if (typeof YAHOO === 'object' && YAHOO.VERSION !== undefined)
        return YAHOO.VERSION;
      if ('YUI' in window && typeof YUI === 'function' && YUI().version !== undefined)
        return YUI().version;
    },
    'MooTools': function () {
      if (typeof MooTools === 'object' && MooTools.version !== undefined)
        return MooTools.version;
    },
    'ExtJS': function () {
      if (typeof Ext === 'object' && Ext.version !== undefined)
        return Ext.version;
    },
    'RightJS': function () {
      if ('RightJS' in window && RightJS.version !== undefined)
        return RightJS.version;
    },
    'Modernizr': function () {
      if (window.Modernizr && Modernizr._version !== undefined)
        return Modernizr._version;
    },
    'Raphael': function () {
      if (window.Raphael && Raphael.version !== undefined)
        return Raphael.version;
    },
    'Backbone.js': function () {
      if (window.Backbone && window.Backbone.VERSION)
        return window.Backbone.VERSION;
    },
    'Underscore.js': function () {
      if (window._ && window._.VERSION)
        return window._.VERSION;
    },
    'Lodash.js': function () {
      if (window._ && window._.VERSION)
        return window._.VERSION;
    },
    'Spine': function () {
      if (window.Spine && window.Spine.version)
        return window.Spine.version;
    },
    'Angular': function () {
      if (window.angular && window.angular.version && 'full' in window.angular.version)
        return window.angular.version.full;
    },
    'OpenLayers': function () {
      if (window.OpenLayers && window.OpenLayers.VERSION_NUMBER)
        return window.OpenLayers.VERSION_NUMBER;
    }
  };

  for (var a in _apps) {
    if (_apps[a] === -1 && js_versions[a]) {
      const r = js_versions[a]();
      _apps[a] = r ? r : -1;
    }
  }

  return _apps;
}
