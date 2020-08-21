/**
 * @fileoverview Engagement Lab Website v2.x content service
 * @copyright Engagement Lab at Emerson College, 2020
 *
 * @author Johnny Richardson
 * @description Route to send form data as email and slack post
 *
 * ==========
 */

const _ = require('underscore');

exports.send = function (req, res) {
    const subjectLine = 'Partner With Us Request';
    let body = '';
    _.each(_.keys(req.body), key => {
        body += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${req.body[key]}\n`;
    });

    const mailgun = require('mailgun-js')({
        apiKey: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    });
    const validEmail = (req.body.email !== undefined && req.body.email.length > 0);
    const data = {
        from: `<${validEmail ? req.body.email : 'noreply@elab.emerson.edu'}>`,
        to: process.env.MAILGUN_CONTACT,
        subject: subjectLine,
        text: body,
    };

    mailgun.messages().send(data, (error, body) => {
        if (error) {
            console.error(`Mailgun error: ${error}`);
            res.status(500).json({
                err: error,
            });
            return;
        }

        res.status(200).json({
            msg: 'Message sent.',
        });
    });
};
