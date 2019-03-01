import serveStatic from 'serve-static'

export default function karmaStatic (config) {
  var path = config.static.path
  if (!path) {
    return function (req, res, next) {
      next()
    }
  }
  return serveStatic(path)
}
