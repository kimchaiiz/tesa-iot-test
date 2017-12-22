	//create a new express routes
	const express = require('express'),
		router = express.Router();
		mainController = require('./controllers/main.controller');
		recordsController = require('./controllers/records.controller');

		//export router
		module.exports = router;

		//define routes
		router.get('/', mainController.showHome);

		//event routs
		router.get('/records',recordsController.showRecords);
		
		
		// seed events
		router.get('/records/seed', recordsController.seedRecords);
		//create events
		//edit events
		//delete events
		
		// show a single event
/*
		router.get('/events/:slug', eventsController.showSingle);
		*/