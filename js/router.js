export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, '', event.target.href)

    this.handle()
  }

  handle() {
    const body = document.querySelector('body')

    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })

    if (route === '/pages/home.html') {
      body.classList.add('homer')
      body.classList.remove('universe')
      body.classList.remove('exploration')
    }

    if (route === '/pages/universe.html') {
      body.classList.remove('homer')
      body.classList.add('universe')
      body.classList.remove('exploration')
    }

    if (route === '/pages/exploration.html') {
      body.classList.remove('homer')
      body.classList.remove('universe')
      body.classList.add('exploration')
    }

    if (route === '/pages/404.html') {
      body.classList.add('homer')
      body.classList.remove('universe')
      body.classList.remove('exploration')
    }
  }
}
