import axios from 'axios';

export default class NetController {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  sendData(content, dateData) {
    const config = {
      headers: {
        Authorization: `Token ${this.accessToken}`,
        Accept: 'application/json'
      }
    };
    // Date is too long fix that
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
