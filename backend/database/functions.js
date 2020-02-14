
// Qoe model
let Qoe = require('../models/Qoe');

exports = module.exports;


exports.getSessions = function(output){
    return new Promise(function(fulfill, reject){
		Qoe.distinct('sessionId', (error, sessionIds) => {
		    if (error) {
		      reject(error)
		    } else {
		    	Qoe.find({'sessionId':{$in: sessionIds}}, (error, data) => {
		    		Qoe.aggregate([{ 
		    			$match: { 
		    				messageType: {$in: ["START", "STOP"]} 
		    			} 
		    		}] ,(error, data) =>{
		    			if(error){
			    			reject(error)
			    		} else {

			    			let stop = data.filter(obj => {
							  return obj.messageType === 'STOP'
							});

							let start = data.filter(obj => {
							  return obj.messageType === 'START'
							}); 

							let finalData = start.map(start_e => {
								let found = stop.find(stop_e => stop_e.sessionId === start_e.sessionId);
								if(found) {
									start_e.lastTime = found.date;
									start_e.duration = start_e.lastTime - start_e.date;
									start_e.status = 'Ended';
								} else {
									start_e.status = 'Live';
								}
								return start_e;
							});
			    			fulfill(finalData);
			    		}
			    	})
		    	});
		    }
		})
    });
}