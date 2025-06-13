class apiresponse {
  constructor(statusCode, data, message = "sucess") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.sucess = statusCode < 400;
  }
}
