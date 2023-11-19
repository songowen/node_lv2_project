module.exports = {
  StatusCodes: {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
  SuccessMessages: {
    SIGNUP_SUCCESS: 'User registered successfully',
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
  },
  ErrorMessages: {
    ALREADY_REGISTERED: 'User already registered',
    PRODUCT_NOT_FOUND: 'Product not found',
    UNAUTHORIZED_ACCESS: 'Unauthorized access',
    SERVER_ERROR: 'Internal server error',
  },
  Status: {
    SELLING: 'FOR_SALE',
    SOLD_OUT: 'SOLD_OUT',
  }
};
