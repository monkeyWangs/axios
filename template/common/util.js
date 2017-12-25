import axios from 'axios';
import {PG} from '@u51/pg/full';
import cache from './cache'

const instance = axios.create();
let getUserInfoPromise = PG.exec('u51GetUserInfo');

PG.on('U51PageResumeEvent', () => {
  getUserInfoPromise = PG.exec('u51GetUserInfo');
});

function createAPI(baseURL) {
  return function (conf) {
    conf = conf || {};
    return Promise.all([getUserInfoPromise, PG.exec('u51GetLogEvent')]).then(values => {
      const [user, log] = values;
      let userHeader = {};
      if (user.uid && user.token) {
        userHeader = {
          userId: user.uid,
          Authorization: `encrypt ${user.token}`,
        };
      }
      conf.headers = {
        ...userHeader,
        'X-Tracking-ID': log.tid
      };
      return cache(conf, instance)
      // return instance(Object.assign({}, {
      //   url: conf.url,
      //   baseURL: baseURL,
      //   method: conf.method,
      //   headers: conf.headers
      // }, conf.opts));
    });
  };
}


export {
  createAPI
};
