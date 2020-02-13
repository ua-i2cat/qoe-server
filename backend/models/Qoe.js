const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Mongodb data schema for Dash content collection.
*/
const QoeSchema = new Schema({
	messageType: {type:String},
	contentId: {type:String},
	date: {type:Number},
	eventType: {type: String},
	selectedItemURL: {type: String},
	deviceId: {type:String},
	deviceType: {type:String},
	sessionId: {type:String},
	averageThroughput:{type: Number},
	currentBufferLevel: {type:Number},
	mediaTime: {type:Number},
	quality: {type:Number},
	startupDelay:{type:Number},
	url: {type:String},
	viewLat: {type:String},
	viewLon: {type:String},
	viewX: {type:String},
	viewY: {type:String},
	viewZ: {type:String}
});

module.exports = mongoose.model('Qoe', QoeSchema);