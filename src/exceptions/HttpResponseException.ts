import { HttpMessage, HttpStatusCode } from '../enums/HttpResponse'

interface HttpResponse {
  statusCode: number
  data: any
  message?: HttpMessage
}

class HttpResponseException {
  public statusCode: HttpStatusCode
  public data: ReadonlyArray<any>
  public message: string

  constructor({ statusCode, data, message }: HttpResponse) {
    this.statusCode = statusCode
    this.data = data
    this.message = message
  }
}

export default HttpResponseException
