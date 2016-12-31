const knownHeaders = {
  'x-powered-by': {
    // 'Ruby on Rails': /Phusion Passenger/,
    'Express.js': /Express/,
    'PHP': /PHP\/?(.*)/,
    'Dinkly': /DINKLY\/?(.*)/,
    'ASP.NET': /ASP\.NET/,
    'Nette': /Nette Framework/
  },
  'server': {
    'Apache': /Apache\/?(.*)/,
    'nginx': /nginx\/?(.*)/,
    'IIS': /Microsoft-IIS\/?(.*)/
  },
  'via': {
    'Varnish': /(.*) varnish/
  }
};

// Scans through the headers finding matches, and returning the val from appinfo (apps.js)
export default function detectByHeader(headers) {
  const appsFound = [];

  // loop through all the headers received
  for (var i = headers.length - 1; i >= 0; i--) {
    var apps = knownHeaders[headers[i].name.toLowerCase()];
    if (!apps) {
      continue;
    }

    for (var app in apps) {
      const matches = headers[i].value.match(apps[app]);
      if (matches) {
        const version = matches[1] || -1;
        appsFound[app] = version;
      }
    }
  }

  return appsFound;
};
