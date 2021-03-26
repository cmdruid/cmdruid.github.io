console.log("navbar.js loaded!");

const username = 'cmdruid',
      reponame = 'cmdruid.github.io',
      endpoint = window.location.pathname.match(/[a-z0-9\-]*\/$/gi)[0],
      fullpath = `https://github.com/${username}/${reponame}/tree/master${endpoint}`;

async function loadNav() {
  const main    = document.querySelector('.main'),
        navbar  = await loadHTML('navbar.html'),
        homeBtn = navbar.querySelector('#home-link'),
        ghBtn   = navbar.querySelector('#github-link');
  if (!(main && navbar)) console.log("Elements failed to load!");
  main.prepend(navbar);
  main.style.marginTop = '5em';
  homeBtn.setAttribute('onclick', `location.href='./';`);
  ghBtn.setAttribute('onclick', `location.href='${fullpath}';`);
}

async function loadHTML(file) {
  try { 
    let url = document.currentScript.src.match(/^.*\//)[0],
        res = await fetch(url + file),
        txt = await res.text();
    if (!(res.ok && txt)) throw Error(`Failed with status: ${res.status}`);
    return new DOMParser().parseFromString(txt, 'text/html').firstChild;
  } catch(err) { console.error(err); }
}

loadNav();