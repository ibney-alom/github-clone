const target = 'master';
const app = {
  master: {
    baseURL:'https://api.github.com/',
  }
};

export const environment = {
  production: true,
  app: app[target]
};

