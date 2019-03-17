const express = require('express');
const router  = express.Router();
const Pusher  = require('pusher');



const pusher = new Pusher({

  appId: '',
  key: '',
  secret: '',
  cluster: '',
  encrypted:  true
});

// On editing canvas
router.post('/edit', (req,res,next) =>{

  pusher.trigger("events-channel", "canvas-edit", {

    lastX : `${req.body.lastX}`,
    lastY : `${req.body.lastY}`,
    currentX : `${req.body.currentX}`,
    currentY : `${req.body.currentY}`,

  });


});


module.exports = router;
