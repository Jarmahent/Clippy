import axios from 'axios';

export default class NetController {
  /* eslint-disable */
  sendData(content, dateData, accessToken) {
    const config = {
      headers: {
        Authorization: `Token ${accessToken}`,
        Accept: 'application/json'
      }
    };
    console.log(dateData);

    axios
      .post(
        'http://127.0.0.1:8000/copydata/',
        {
          content: `${content}`,
          date: dateData
        },
        config
      )
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }
}
