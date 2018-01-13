export default {<% _.forEach(data.mocks, function(mock, i){ %>
  "{{mock.url}}": {{JSON.stringify(mock.parameters)}}
  <% if(data.mocks.length - 1 !== i) { %>,<% } %>
<% }) %>
}
