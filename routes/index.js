var express = require("express");
var router  = express.Router();

//root route
router.get("/", function(req, res){
		res.render("dsm-index");
});

module.exports = router;