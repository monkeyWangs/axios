import axios from 'axios';
import {PG} from '@u51/pg/full';
import cache from './cache'
import toast from './toast'

const instance = axios.create();

let getUserInfoPromise = PG.exec('u51GetUserInfo');

PG.on('U51PageResumeEvent', () => {
  getUserInfoPromise = PG.exec('u51GetUserInfo');
});

instance.interceptors.request.use(config => {
  toast.loading(config.toastText)
  return config
}, error => {
  toast.close('lastMsg')
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(response => {
  toast.close(response.config.toastText)
  return response.data
}, error => {
  toast.close(error.config ? error.config.toastText : 'lastMsg')
  if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length) {
    toast.info(error.response.data.errors[0].message)
  } else if (error.message.indexOf('timeout') === 0) {
    toast.error('网络异常')
  } else {
    toast.error('出了点问题，暂时加载不出来，请稍后再来吧')
  }
  return Promise.reject(error)
})


function createAPI(baseURL) {
  return function (config) {
    config = config || {};

    config.toastText = config.opts.toastText || '';
    delete config.opts.toastText;

    config.cacheData = config.opts.cacheData;
    delete config.opts.cacheData;

    return Promise.all([getUserInfoPromise, PG.exec('u51GetLogEvent')]).then(values => {
      const [user, log] = values;
      let userHeader = {};
      if (user.uid && user.token) {
        userHeader = {
          userId: user.uid,
          Authorization: `encrypt ${user.token}`,
        };
      }
      config.headers = {
        ...userHeader,
        'X-Tracking-ID': log.tid
      };
      return cache(Object.assign({}, {
        url: config.url,
        baseURL: baseURL,
        method: config.method,
        headers: config.headers
      }, config.opts), instance)
    });
  };
}


export {
  createAPI
};
