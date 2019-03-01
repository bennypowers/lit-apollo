module.exports = class HttpError extends Error {
  constructor (message, statusCode, headers, request) {
    super(message)

    // Maintains proper stack trace (only available on V8)
    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }

    this.name = 'HttpError'
    this.status = statusCode
    Object.defineProperty(this, 'code', {
      get () {
        console.warn('`error.code` is deprecated, use `error.status`.')
        return statusCode
      }
    })
    this.headers = headers

    // redact request credentials without mutating original request options
    const requestCopy = Object.assign({}, request)
    if (request.headers.authorization) {
      requestCopy.headers = Object.assign({}, request.headers, {
        authorization: request.headers.authorization.replace(/ .*$/, ' [REDACTED]')
      })
    }

    // client_id & client_secret can be passed as URL query parameters to increase rate limit
    // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
    requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, 'client_secret=[REDACTED]')

    this.request = requestCopy
  }
}
