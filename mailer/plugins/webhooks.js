var request = require("request");

exports.hook_rcpt = function(next, connection, params) {
    var plugin = this;
    var transaction = connection.transaction;
    transaction.parse_body = true;

    var cfg = plugin.config.get('webhooks.ini');
    connection.notes.config = cfg;
    request.post(cfg.main.auth_url)
	      .form({
	          "recipients": transaction.rcpt_to[0].user + "@" + transaction.rcpt_to[0].host,
	          "sender": transaction.mail_from.original
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
	          next(DENYSOFT, body);
	      });
}

function getBody(children) {
    var ret = null;
    for (var ii=0; ii < children.length; ii++) {
	      if (children[ii].state === 'body') {
	          ret = children[ii];
	      } else {
	          if (children[ii].children.length > 0) {
		            ret = getMultipartAlternative(children[ii].children);
	          }
	      }
    }
    return ret;
}

exports.hook_data_post = function(next, connection, params) {
    var plugin = this;
    var transaction = connection.transaction;

    connection.notes.discard = true;
    var cfg = connection.notes.config;
    var body;
    if (transaction.body.children.length > 0) {
	      body = getBody(transaction.body.children);
    } else {
	      body = transaction.body;
    }
    request.post(cfg.main.mail_url)
	      .form({
	          "recipients": transaction.rcpt_to[0].user + "@" + transaction.rcpt_to[0].host,
	          "sender": transaction.mail_from.original,
	          "subject": transaction.body.header.get("Subject"),
	          "body": body.bodytext || 'Blank Message',
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
