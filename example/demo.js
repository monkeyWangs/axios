import * as api from './api';

api.demo.getUserInfo_get({
  path: {
    id: 1
  }
}).then((res) => {
  console.log(res.data);
});
