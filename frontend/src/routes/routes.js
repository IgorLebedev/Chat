const apiPath = '/api/v1';

export default {
  login: () => `${apiPath}/login`,
  signup: () => `${apiPath}/signup`,
  data: () => `${apiPath}/data`,
};
