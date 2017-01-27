const { matcher: m, partial: p } = require('functional')

const typed = (argTypes, retType, fn) => {
  if (process.env.NODE_ENV == 'production') return fn;
  const _fn = m(
    [argTypes, fn], 
    [m, (...args) => { throw new TypeCheckError(`args (${argTypes.map(pp)}) does not match (${args.map(pp)})`) }]
  )
  const _ret = m(
    [retType == typed.Any ? m : retType, ret => ret],
    [m, ret => { throw new TypeCheckError(`returned (${ret}) does not match (${pp(retType)})`)}]
  )
  return (...args) => _ret(_fn(...args))
}

function TypeCheckError(msg) {
  this.name = 'TypeCheckError'
  this.message = msg || ''
}
TypeCheckError.prototype = Error.prototype

function pp(it) { 
  if (!it) return it
  if (typeof it == 'function') return it.name || it.constructor.name
  return it
}

typed.TypeCheckError = TypeCheckError
typed.Any = m
typed.None = {}

module.exports = typed