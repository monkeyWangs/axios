import { createAPI } from '../util';
import config from '../config';

const baseUrl = {
  mock: 'https://www.easy-mock.com/mock/5a275f1f8ef919728f8ccd48/',
  dev: '',
  pre: '',
  prod: ''
}[process.env.NODE_ENV === 'development' ? config.env : process.env.NODE_ENV];

export default createAPI(baseUrl);
