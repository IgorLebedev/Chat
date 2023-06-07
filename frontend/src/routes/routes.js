const apiPath = '/api/v1';

export const serverRoutes = {
  login: () => `${apiPath}/login`,
  signup: () => `${apiPath}/signup`,
  data: () => `${apiPath}/data`,
};

export const appRoutes = {
  mainPage: () => '/',
  loginPage: () => 'login',
  signupPage: () => 'signup',
  notFoundPage: () => '*',
};
