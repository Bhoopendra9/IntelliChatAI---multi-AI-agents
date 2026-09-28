//A standard structure for API responses in a Node.js application. This class provides a consistent format for success and error responses, making it easier to handle API responses across the application.

class ApiResponse {
  constructor({
    statusCode = 200,
    message = "Success",
    data = null,
    pagination = null,
    errors = [],
  }) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
    this.errors = errors;
  }

  static success(
    statusCode = 200,
    message = "Success",
    data,
    pagination = null,
  ) {
    return new ApiResponse({
      statusCode,
      message,
      data,
      pagination,
    });
  }

  static error(statusCode = 500, message = "Error", errors = []) {
    return new ApiResponse({
      statusCode,
      message,
      errors,
    });
  }
}

export default ApiResponse;
