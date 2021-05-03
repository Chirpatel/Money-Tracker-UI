import axios from 'axios';

const getDataApi = async (url) =>{
    var config = {
        method: 'get',
        url: url,
      };
      return ( await axios(config)).data;
}
export default getDataApi;