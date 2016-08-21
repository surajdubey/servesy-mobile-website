import config from '../config';
var sendgrid_url = 'https://api.sendgrid.com/v3/mail/send';

var sendEmail = function(contentValue, callback) {

    /**
    This is sample request
    */
    /**
    curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "your.email@example.com"}]}],
            "from": {"email": "example@example.com"},
            "subject": "Hello, World!",
            "content": [{"type": "text/plain", "value": "Heya!"}]}'

    */

    var data = {};
    data.personalizations = [{"to": [{"email": config.TO_EMAIL}]}];
    data.from = {"email": config.FROM_EMAIL};
    data.content = [{"type": "text/plain", "value": contentValue}];

    fetch(sendgrid_url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.SENDGRID_API_KEY
        },
        mode: 'no-cors',
        body: JSON.stringify(data)
    })
    .then((response)=> response.json())
    .then((responseJson) => {
        return callback(responseJson, null)
    })
    .catch(function(error) {
        callback(null, error)
    })
}

module.exports = sendEmail;
