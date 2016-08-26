var express = require('express');
var path = require('path');

module.exports = {
	app: function() {
		const app = express();
		const indexPath = path.join(_dirname, '../index.html');

		app.get('/', function(_, res) { res.sendFile(indexPath)})

		return app
	}
}