const express = require('express');
const app = express();
const qoeRoute = express.Router();

// Qoe model
let Qoe = require('../models/Qoe');

// Add Qoe
qoeRoute.route('/create').post((req, res, next) => {
  const io = req.app.get('io');
  Qoe.find({sessionId: req.body.id, messageType: 'START'}, (error, data) => {
    if (data.length > 0) {
      console.log(data);
       res.status(500).send(`The session ${data.sessionId} already started`);
    } else {
      Qoe.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          if(data.messageType === 'START') {
            io.emit('newSession', data);
          }
          io.emit(data.sessionId, data);
          res.status(200).json({
            msg: data
          });
        }
      })
    }
  });
});

// Get All Qoe
qoeRoute.route('/').get((req, res) => {
  Qoe.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

qoeRoute.route('/latlon').get((req, res) => {
  Qoe.find({}, 'viewLon viewLat', (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Qoe sessions
qoeRoute.route('/session').get((req, res) => {
  Qoe.find({messageType: 'START'}, 'date sessionId url', (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all data of a single Qoe session
qoeRoute.route('/session/:id').get((req, res) => {
  Qoe.find({sessionId: req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.slice(Math.max(data.length - 50, 1)));
    }
  })
})

// Get all data of a single Qoe session
qoeRoute.route('/session/:id/:option').get((req, res) => {
  Qoe.find({sessionId: req.params.id}, req.params.option, (error, data) => {
    if (error) {
      return next(error)
    } else {
      let finalData = data.map(function(element){
        return element.averageThroughput;
      });
      res.json(finalData.slice(Math.max(finalData.length - 50, 1)));
    }
  })
})

// Get single Qoe
qoeRoute.route('/read/:id').get((req, res) => {
  Qoe.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Qoe
qoeRoute.route('/update/:id').put((req, res, next) => {
  Qoe.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully');
    }
  })
})

// Delete Qoe
qoeRoute.route('/delete/:id').delete((req, res, next) => {
  Qoe.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

// Delete all Qoe
qoeRoute.route('/delete').delete((req, res, next) => {
  Qoe.deleteMany({}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).send("QoE logs have been removed from the database");
    }
  })
});

module.exports = qoeRoute;



