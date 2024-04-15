import routes from './routes.js'

function setCurrentRoute({ path, controller }) {

  routes.currentPath.path = path;
  routes.currentPath.controller = controller;

}

async function launchController(controllerName) {
  console.log("this is controller " + controllerName);

  const module = await import(`./controler/${controllerName}.js`);
  console.log(module);
  module.default.init();
}

function navigate(path) {

  if (path === routes.currentPath.path) {
    return;
  }



  console.log("this is path: " + path);

  const routeKey = Object.keys(routes).find(key => routes[key].path === path);
  const route = routes[routeKey] || routes.home;

  console.log(route);
  setCurrentRoute(route);
  launchController(route.controller)

}

function getPath(urlStr) {
  return new URL(urlStr).hash.slice(1);
}

function navigateOnHashChange() {
  addEventListener('hashchange', (e) => {
    
    const container = document.querySelector('#container');
    

    if (container.childElementCount == 1) {
        container.removeChild(container.lastChild);
    }

    const elem = document.createElement('div');
    elem.className = `text-center`;

    elem.innerHTML = `
    <div class="spinner-border text-primary" role="status">
        
    </div>
    <span class="sr-only">Loading...</span>
`;
    container.appendChild(elem);

    const path = getPath(e.newURL);
    navigate(path);
  })
}

function init() {

  window.location.hash = window.location.hash || routes.home.path;

  navigate(getPath(window.location.href));
  navigateOnHashChange();
}

export default { init };
