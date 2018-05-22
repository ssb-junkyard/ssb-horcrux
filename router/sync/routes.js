const nest = require('depnest')

exports.gives = nest('router.sync.routes')

exports.needs = nest({
  'app.page': {
    'horcrux': 'first'
  }
})

exports.create = (api) => {
  return nest('router.sync.routes', (sofar = []) => {
    const pages = api.app.page

    // loc = location
    const routes = [
      [ loc => loc.page === 'horcrux', pages.horcrux ]
    ]

    // stack already loaded routes on top of these
    return [...sofar, ...routes]
  })
}
