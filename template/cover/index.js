import instance from './instance';
import { convertRESTAPI } from '{{$$.relative("util")}}';

<% _.forEach(data.mocks, function(mock){ %>/** {{mock.description}} */
function {{$$.convertMethod(mock)}}(opts) {
  <%if (mock.parameters) {%>
  if (!checkData(opts, {{JSON.stringify(mock.parameters)}})) {
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
      if (rule.in === 'body' && rule.required) {
        if (data[rule.name] === undefined) {
          throw new Error(`${data[rule.name]} is required!`)
          result = false
        }
      }
    })
    return result
}
