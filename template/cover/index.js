import instance from './instance';
import rulesConf from './rules.conf'
import { convertRESTAPI } from '{{$$.relative("util")}}';

<% _.forEach(data.mocks, function(mock, i){ %>/** {{mock.description}} */
function {{$$.convertMethod(mock)}}(opts) {
  <%if (mock.parameters) {%>
  if (!checkData(opts, rulesConf['{{mock.url}}'])) {

    throw new Error('{{mock.description}} 参数错误，请检查')
    return
  }
  <% } %>
  return instance({
    method: '{{mock.method}}',
    url: <% if($$.isREST(mock.url)) {%>convertRESTAPI('{{mock.url}}', opts)<%} else {%> '{{mock.url}}'<% } %>,
    opts: opts
  });
}

<% }) %>export {<% _.forEach(data.mocks, function(mock, i){ %>
  {{$$.convertMethod(mock)}}<% if(data.mocks.length - 1 !== i) { %>,<% } %><% }) %>
};

function checkData (data, rules) {
    let result = true
    rules.forEach((rule) => {
      if (data[rule.name] === undefined || (typeof data[rule.name]).toLocaleLowerCase() !== rule.type.toLocaleLowerCase()) {
        result = false
      }
    })
    return result
}
