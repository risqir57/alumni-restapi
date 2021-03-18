import HttpResponseException from '../exceptions/HttpResponseException'
import { logger } from './logger'

const responseNormalize = (body: HttpResponseException) => {
  const status = body.statusCode || 200
  const data = body.data
  const message = body.message || 'Success'

  logger.info('You pass me!')

  return {
    status,
    data,
    message,
  }
}

export default responseNormalize
