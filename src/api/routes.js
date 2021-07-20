// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  signinPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
};
