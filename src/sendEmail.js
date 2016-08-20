import config from '../config';
var helper = require('sendgrid').mail;

var sendEmail = function(content, callback) {
    from_email = new helper.Email(config.FROM_EMAIL);
    to_email = new Helper.Email(config.TO_EMAIL);

    subject = config.EMAIL_SUBJECT;
    mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(config.SENDGRID_API_KEY);

    var request = sg.emptyRequest({
        method:'POST',
        path:'/v3/mail/send',
        body:mail.toJSON()
    })

    sg.API(request, function(error, response) {
        console.log(JSON.stringify(response));
        callback();
    })
}

export default sendEmail;
