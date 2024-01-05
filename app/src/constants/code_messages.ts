const prefix = (code: string) => `PREFIX${code}`;

export const CODE_MESSAGES = {
  INTERNAL_SERVER_ERROR: {
    code: prefix('0000'),
    message: 'Internal Server Error!'
  },
  CANNOT_ACCESS_DATABASE: {
    code: prefix('0001'),
    message: 'Cannot access database!'
  },
  VALIDATION_ERROR: {
    code: prefix('0002'),
    message: 'Validation Error!'
  }
} as const;
