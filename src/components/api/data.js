import axios from 'axios';

const getApi = async (url) =>{
    var config = {
        method: 'get',
        url: url,
      };
      return ( await axios(config)).data;
}
export default getApi;