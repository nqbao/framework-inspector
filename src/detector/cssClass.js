/**
 * Detect based on defined css classes
 */
export default function detectByCssClass(doc, _apps) {
  var cssClasses = {
    'Bootstrap': ['hero-unit', '.carousel-control', '[class^="icon-"]:last-child']
  };

  for (var t in cssClasses) {
    if (t in _apps) continue;

    var found = true;
    for (var css in cssClasses[t]) {
      var act = false;
      name = cssClasses[t][css];

      /* Iterate through all registered css classes and check for presence */
      for (var cssFile in document.styleSheets) {
        for (var cssRule in document.styleSheets[cssFile].cssRules) {
          var style = document.styleSheets[cssFile].cssRules[cssRule];

          if (typeof style === "undefined") continue;
          if (typeof style.selectorText === "undefined") continue;

          if (style.selectorText.indexOf(name) !== -1) {
            act = true;
            break;
          }
        }
        if (act === true) break;
      }

      found = found & act;
    }

    if (found === true) {
      _apps[t] = -1;
    }
    else {
      break;
    }
  }

  return _apps;
}
