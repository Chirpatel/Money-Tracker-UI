import axios from 'axios';

const getDataApi = async () =>{
    var config = {
        method: 'get',
        url: 'https://moneytracker.vercel.chir.in/data/crypto/',
        headers: { }
      };
      return ( await axios(config)).data;
}
export default getDataApi;