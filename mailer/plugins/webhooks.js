var request = require("request");

exports.hook_rcpt = function(next, connection, params) {
    var plugin = this;
    var transaction = connection.transaction;
    transaction.parse_body = true;

    next(OK);
}

exports.hook_data_post = function(next, connection, params) {
    var plugin = this;
    var transaction = connection.transaction;

    var cfg = plugin.config.get('webhooks.ini');
    request.post(cfg.main.url)
	.form({
	    "recipients": transaction.rcpt_to[0].user + "@" + transaction.rcpt_to[0].host,
	    "sender": transaction.mail_from.original,
	    "subject": transaction.body.header.get("Subject"),
	    "body": transaction.body.bodytext,
	    "headers": transaction.body.header.toString()
	})
	.on('response', function(response) {
	    response.on('data', function(data) {
	    	if (response.statusCode >= 200 && response.statusCode < 300) {
	    	    next(OK, data);
	    	}
	    	if (response.statusCode >= 400 && response.statusCode < 500) {
	    	    next(DENY, data);
	    	}
	    	if (response.statusCode >= 500) {
	    	    next(DENYSOFT, data);
	    	}
	    });
	})
	.on('error', function(error, response, body) {
	    next(DENYSOFT, "sys_unspecified");
	});
}
