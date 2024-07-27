// !Comment why using ResponseLaravel as class Name ..?

export class ResponseLaravel {
  success(data) {
    return {
      statusCode: 200,
      message: 'Request was successful',
      data: data,
    };
  }

  error(data) {
    return {
      statusCode: 404,
      message: 'Request Not successful',
      data: data,
    };
  }
}
