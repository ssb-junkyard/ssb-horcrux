const nest = require('depnest')
const { h, Value, computed, map } = require('mutant')
const secrets = require('secrets.js')

exports.gives = nest({
  'app.html.page': true,
})

exports.needs = nest({
  'keys.sync.load': 'first'
})

exports.create = function (api) {

  return nest({
    'router.html.page': horcruxPage
  })

  function horcruxPage (path) {

    if (path !== '/horcrux') return

    const key = api.keys.sync.load().private

    var total = Value(5)
    var min = Value(3)
    var horcruxs = computed([total, min], (total, min) => {
      return horcrux(key, Math.max(total, min), Math.min(total, min))
    })

    return h('Horcrux', [
      h('h1', 'Horcrux'),
      h('section.preferences', [
        h('div', [
          'Create',
          h('input', {
            type: 'number',
            value: total,
            'ev-input': e => total.set(getNumber(e))
          })
        ]),
        h('div', [
          'Min to revive',
          h('input', {
            type: 'number',
            value: min,
            'ev-input': e => min.set(getNumber(e))
          })
        ])
      ]),
      h('section.horcrux', [
        map(horcruxs, hx => {
          return h('div', [
            h('div.patronus', Array.from(hx).reverse().join('')),
            h('div', hx)
          ])
        })
      ])
    
    ])
  }
}

function getNumber (event) {
  const n = Number(event.target.value)

  if (isNaN(n) || n < 1) return null

  return n 
}

function horcrux (soul, totalHorcrux = 5, minHorcruxToRevive = 3) {
  const hexKey =  secrets.str2hex(soul)
  const shares = secrets.share( hexKey, totalHorcrux, minHorcruxToRevive )

  return shares
}

