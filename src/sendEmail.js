import config from '../config';

var sendEmail = function(data, callback) {

    fetch(config.BASE_URL + 'requestService', {
        method: 'post',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response)=> response.json())
    .then((responseData) => callback(responseData))
    .catch((error) => {callback(null)})
}

module.exports = sendEmail;
