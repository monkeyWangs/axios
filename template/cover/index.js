import instance from './instance';
import rulesConf from './rules.conf'
import { convertRESTAPI } from '{{$$.relative("util")}}';

<% _.forEach(data.mocks, function(mock, i){ %>/** {{mock.description}} */
function {{$$.convertMethod(mock)}}(opts) {
  <%if (mock.parameters) {%>
  let checkResult = checkData(opts, rulesConf['{{mock.url}}']);
  if (!checkResult.result) {

    console.error('{{mock.description}}接口参数'+checkResult.errorTypes.join(';')+'错误，请检查')
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
    let result = true;
    let errorTypes = []
    rules.forEach((rule) => {
      if (data[rule.name] === undefined || (rule.type && (typeof data[rule.name]).toLocaleLowerCase() !== rule.type.toLocaleLowerCase()) {
        errorTypes.push(rule.name)
        result = false
      }
    })
    return {
        errorTypes,
        result
    }
}
