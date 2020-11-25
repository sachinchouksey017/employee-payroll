const axios = require('axios').default;
class AxiosService {
  postService(url = '', payload = null, tokenRequired = false, httpOptions = null) {
    /* handles post operations
      params : id  : id of question or comment to add/post,
      apiendpoint : endpoint i.e 'comments/' , 'answers/', 'editquestions/'
  */
    return axios.post(url, payload, tokenRequired && httpOptions);
  }
  putService(url, payload = null, tokenRequired = false, httpOptions = null) {
    /* handles edit/patch operations
  params : id  : id of question or comment to edit,
          apiendpoint : endpoint i.e 'comments' , 'answers'
  id attached as url param.
  */
    return axios.put(url, payload, tokenRequired && httpOptions);
  }
  deleteService(url = '', tokenRequired = false, httpOptions = null) {
    /* handles delete operations
  params : id  : id of question or comment to delete,
          apiendpoint : endpoint i.e 'comments' , 'answers'
  id attached as url param.
  */
    return axios.delete(url, tokenRequired && httpOptions);
  }
  getService(url = '', tokenRequired = false, httpOptions = null) {
    /* handles api calls for get request */
    return axios.get(url, tokenRequired && httpOptions);
  }
}
module.exports = new AxiosService()