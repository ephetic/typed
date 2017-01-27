const tape = require('tape')
const typed = require('../src')


tape('Void => any', t => {
  const fn = typed([], typed.Any, n => n)
  t.doesNotThrow(() => fn(), null, 'fn() okay')
  t.throws(() => fn(1), typed.TypeCheckError, 'fn(1) throws')  //https://github.com/ephetic/functional/issues/12
  t.end()
})

tape('Any => Number', t => {
  const fn = typed([typed.Any], Number, n => n)
  t.doesNotThrow(() => fn(1), null, 'fn(Number) okay')
  t.throws(() => fn('hi'), typed.TypeCheckError, 'fn(String) throws')
  t.end()  
})

tape('Any => Any', t => {
  const fn = typed([typed.Any], typed.Any, n => n)
  t.doesNotThrow(() => fn(1), null, 'fn(Number) okay')
  t.doesNotThrow(() => fn('hi'), null, 'fn(String) okay')
  t.end()  
})

// tape('two Number arguments', t => {
//   const fn = typed([], [], () => void 0)

// })

// tape('one contract argument', t => {
//   const fn = typed([], [], () => void 0)

// })

// tape('void arguments', t => {
//   const fn = typed([], [], () => void 0)

// })

// doesn't wrap function in production