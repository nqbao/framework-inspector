const rules = {
  'Bootstrap': ['hero-unit', '.carousel-control', '[class^="icon-"]:last-child']
};

/**
 * Detect based on defined css classes
 */
export default function detectByCssClass(doc, _apps) {
  for (let t in rules) {
    if (t in _apps) continue;

    let found = true;
    for (let css in rules[t]) {
      let act = false;
      const name = rules[t][css];

      /* Iterate through all registered css classes and check for presence */
      for (let cssFile in document.styleSheets) {
        for (let cssRule in document.styleSheets[cssFile].cssRules) {
          const style = document.styleSheets[cssFile].cssRules[cssRule];

          if (style && style.selectorText && style.selectorText.indexOf(name) !== -1) {
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
    } else {
      break;
    }
  }

  return _apps;
}
