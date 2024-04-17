class ApiError extends Error {
  constructor(statusCode, message="something went wrong" , errors=[], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = errors;
    this.stack = stack;
if(stack)
{
    this.stack = stack;
}else{
    Error.captureStackTrace(this , this.constructor)
}
  }
}