console.log("navbar.js loaded!");

const username = 'cmdruid',
      reponame = 'cmdruid.github.io',
      endpoint = window.location.pathname.match(/[a-z0-9\-]*\/$/gi)[0],
      fullpath = `https://github.com/${username}/${reponame}/tree/master${endpoint}`,
      cssURL   = 'https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.css';

async function main() {
  const body    = document.querySelector('body'),
        navbar  = loadHTML(await fetchHTML('navbar.html')),
        homeBtn = navbar.querySelector('#home-link'),
        ghBtn   = navbar.querySelector('#github-link');
  if (!(body && navbar)) console.log("Elements failed to load!");
  body.prepend(navbar);
  homeBtn.setAttribute('onclick', `location.href='./';`);
  ghBtn.setAttribute('onclick', `location.href='${fullpath}';`);
}

async function fetchHTML(filename) {
  try { 
    let url = document.currentScript.src.match(/^.*\//)[0],
        res = await fetch(url + filename);
    if (!res.ok) throw Error(`Failed with status: ${res.status}`); 
    return await res.text();
  } catch(err) { console.error(err); return ''; }
}

function loadHTML(HTMLtxt) {
  let tmp = document.createElement('template');
  tmp.innerHTML = HTMLtxt.trim();
  return tmp.content.firstElementChild;
}

function loadStyle(url) {
  let head = document.querySelector('head');
  head.prepend(loadHTML(`<link rel="stylesheet" type="text/css" href="${url}">`));
}

loadStyle(cssURL);
main();
