const rules = {
  'generator': {
    'Joomla': /joomla!?\s*([\d\.]+)?/i,
    'vBulletin': /vBulletin\s*(.*)/i,
    'WordPress': /WordPress\s*(.*)/i,
    'XOOPS': /xoops/i,
    'Plone': /plone/i,
    'MediaWiki': /MediaWiki/i,
    'CMSMadeSimple': /CMS Made Simple/i,
    'SilverStripe': /SilverStripe/i,
    'Movable Type': /Movable Type/i,
    'Amiro.CMS': /Amiro/i,
    'Koobi': /koobi/i,
    'bbPress': /bbPress/i,
    'DokuWiki': /dokuWiki/i,
    'TYPO3': /TYPO3/i,
    'PHP-Nuke': /PHP-Nuke/i,
    'DotNetNuke': /DotNetNuke/i,
    'Sitefinity': /Sitefinity\s+(.*)/i,
    'WebGUI': /WebGUI/i,
    'ez Publish': /eZ\s*Publish/i,
    'BIGACE': /BIGACE/i,
    'TypePad': /typepad\.com/i,
    'Blogger': /blogger/i,
    'PrestaShop': /PrestaShop/i,
    'SharePoint': /SharePoint/,
    'JaliosJCMS': /Jalios JCMS/i,
    'ZenCart': /zen-cart/i,
    'WPML': /WPML/i,
    'PivotX': /PivotX/i,
    'OpenACS': /OpenACS/i,
    'AlphaCMS': /alphacms\s+(.*)/i,
    'concrete5': /concrete5 -\s*(.*)$/,
    'Webnode': /Webnode/,
    'GetSimple': /GetSimple/,
    'DataLifeEngine': /DataLife Engine/,
    'ClanSphere': /ClanSphere/,
    'Mura CMS': /Mura CMS\s*(.*)/i,
    'Tiki Wiki CMS Groupware': /Tiki/i
  },
  'copyright': {
    'phpBB': /phpBB/i
  },
  'elggrelease': {
    'Elgg': /.+/
  },
  'powered-by': {
    'Serendipity': /Serendipity/i
  },
  'author': {
    'Avactis': /Avactis Team/i
  }
};

/**
 * Detect by meta tags, the first matching group will be version
 */
export default function detectByMetaTag(apps) {
  const doc = document.documentElement;
  const metas = doc.getElementsByTagName("meta");

  for (let idx in metas) {
    const m = metas[idx];
    name = m.name ? m.name.toLowerCase() : "";

    if (!rules[name]) continue;

    for (var t in rules[name]) {
      if (t in apps) continue;

      const r = rules[name][t].exec(m.content);
      if (r) {
        apps[t] = r[1] ? r[1] : -1;
      }
    }
  }

  return apps;
}
