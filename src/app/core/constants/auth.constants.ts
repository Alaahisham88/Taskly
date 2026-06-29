export const AUTH_CONSTANTS = {
  STORAGE_KEYS: {
    SESSION: 'session',
  },
  ROUTES: {
    LOGIN: '/login',
    PROJECTS: '/projects',
    SIGN_UP: '/sign-up',
  },
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'Email or password is incorrect.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
  },
} as const;
