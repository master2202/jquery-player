var express     = require("express"),
		indexRoutes = require("./routes/index")
	
	 
// var fs = require('fs');
// var pugBeautify = require('pug-beautify');
// var code = fs.readFileSync('./views/dsm-index.pug','utf8');
// var option = {
//     fill_tab: true,
//     omit_div: false,
//     tab_size: 2,
//     separator_space: true,
//     omit_empty_lines : false
// };
// try {
//     var output = pugBeautify(code,option);
// }catch(error){
//     // Error occurred 
// }


var app = express();

//console.log(output);

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	 console.log("DSM Player Has Started!");
});