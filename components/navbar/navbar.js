console.time('navbar.js loaded');

async function main() {
  /* Main event loop. All declarations are wrapped within 
     this scope. */
  const [ _, repo, path = '' ] = getURL(window.location);
  const ghURL    = `https://github.com/cmdruid/${repo}/tree/master/${path}`,
        cssURL   = 'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.css',
        localdir = document.currentScript.src.match(/^.*\//)[0];
  console.log('Github URL set to: ', ghURL);
  loadLink('fomantic-ui', cssURL);
  loadNav(localdir + 'navbar.html');

  async function loadNav(path) {
    /* Handles loading of the navigation bar. */
    const navbar  = loadHTML(await fetchHTML(path)),
          homeBtn = navbar.querySelector('#home-link'),
          ghBtn   = navbar.querySelector('#github-link');
    if (!navbar) console.log("Elements failed to load!");
    document.body.style.paddingTop = '3rem';
    document.body.prepend(navbar);
    homeBtn.setAttribute('onclick', `location.href='${window.location.origin}';`);
    ghBtn.setAttribute('onclick', `location.href='${ghURL}';`);
  }

  function getURL(location) {
    /* Returns the correct URL for linking to Github. */
    const { hostname, pathname } = location;
    let devmode = hostname.includes('127.0.0.1');
        paths   = pathname.match(/^\/([\w\-]*)\/(.*)$/);
    switch (true) {
      case devmode : return [ null, 'web-dev', '' ];
      case !paths  : return [ null, hostname, '' ];
      default: return paths;
    }
  }

  async function fetchHTML(path) {
    /* Fetches the locally stored HTML template. */
    try {
      let res = await fetch(path);
      if (!res.ok) throw Error(`Failed with status: ${res.status}`); 
      return await res.text();
    } catch(err) { console.error(err); return ''; }
  }

  function loadHTML(HTMLtxt) {
    /* Loads the locally stored HTML template as DOM. */
    let tmp = document.createElement('template');
    tmp.innerHTML = HTMLtxt.trim();
    return tmp.content.firstElementChild;
  }

  function loadLink(name, url) {
    /* Checks that the required CSS styleshit is loaded. */
    let links   = document.head.querySelectorAll('link'),
        newlink = `<link rel="stylesheet" type="text/css" href="${url}">`
    for (let link of links) if (link.href.includes(name)) return;
    document.head.insertBefore(loadHTML(newlink), links[0]);
  }
}

main();
console.timeEnd('navbar.js loaded')