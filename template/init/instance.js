import { createAPI } from '{{$$.relative("util")}}';
import config from '{{$$.relative("config")}}';

const baseUrl = {
  mock: '{{$$.joinUrl(config.host, "mock", data.project._id, data.project.url)}}',
  dev: '',
  pre: '',
  prod: ''
}[process.env.NODE_ENV === 'development' ? config.env : process.env.NODE_ENV];

export default createAPI(baseUrl);
