import instance from './instance';
import { convertRESTAPI } from '../util';

/** 判断用户报名情况 */
function bkcobrandedcardgateway_api_v1_operating_freeinterest_2_joininfo_get(opts) {
  return instance({
    method: 'get',
    url:  '/bk-cobrandedcard-gateway/api/v1/operating/freeinterest/2/joininfo',
    opts: opts
  });
}

/** 提交用户信息 */
function bkcobrandedcardgateway_api_v1_operating_freeinterest_2_submit_post(opts) {
  return instance({
    method: 'post',
    url:  '/bk-cobrandedcard-gateway/api/v1/operating/freeinterest/2/submit',
    opts: opts
  });
}

/** 获取用户信息 */
function getUserInfo_get(opts) {
  return instance({
    method: 'get',
    url:  '/getUserInfo',
    opts: opts
  });
}

export {
  bkcobrandedcardgateway_api_v1_operating_freeinterest_2_joininfo_get,
  bkcobrandedcardgateway_api_v1_operating_freeinterest_2_submit_post,
  getUserInfo_get
};
