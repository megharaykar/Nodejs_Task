var bodyParser = require('body-parser');
const fs = require('fs');

module.exports = function(app,json_data){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true })); 
    
    //Get users json data
	app.get('/api/users/', function(req,res)
	{
        //First filter, then sort and finally paginate as it will save time.
        //apply filter, paginate and sort if requested respectively.
        //if none of the above are requested, return entire json

        //by default output is entire content from json file
        var output = json_data;

        //Find if filter is requested
        try{
            var filterinputs = req.body.filter;
        }
        catch(ex)
        {
            console.log("filter not requested");
        }
        if(filterinputs !== undefined)
        {
        //apply filter based on respective operator
        //output is replaced with filtered content
        for(var i=0; i<filterinputs.length; i++){
       
           if(filterinputs[i].operator == "STARTSWITH")
             output = output.filter(obj => obj[filterinputs[i].field].startsWith(filterinputs[i].value)== true);
           else if(filterinputs[i].operator == "CONTAINS")
             output = output.filter(obj => obj[filterinputs[i].field].indexOf(filterinputs[i].value) != -1);
           else if(filterinputs[i].operator == "GREATERTHAN")
           output = output.filter(obj => obj[filterinputs[i].field] > filterinputs[i].value);
           else if(filterinputs[i].operator == "EQUALS")
           output = output.filter(obj => obj[filterinputs[i].field] == filterinputs[i].value);
           else if(filterinputs[i].operator == "LESSTHAN")
           output = output.filter(obj => obj[filterinputs[i].field] < filterinputs[i].value);
            }
        }

        //Find if sort is requested
        try{
            var sortinputs = req.body.sort[0];
        }
        catch(ex)
        {
            console.log("sort not requested");
        }
        
        if(sortinputs !== undefined)
        {
        
        //sort by keys
        for(var key in sortinputs){
            //check if sort by desc is requested
           if(sortinputs[key] == "desc")
           {
               //if type of the key is number 
               if(typeof(output[0][key])== Number)
               {
                output = output.sort(function(a,b){
                    return b[key]-a[key]});
               }
               
               //if type of the key is String 
               else
               {
                output = output.sort(function(a,b){
                    if (a[key] > b[key])
                      return -1;
                    if (a[key] < b[key])
                      return 1;
                    return 0;
                  }); 
               }
           }
           //else do ascending by default
           else{
               
               //if type of the key is number 
                if(typeof(output[0][key])== Number)
                {
                     output = output.sort(function(a,b){return a[key]-b[key]});
                }
                
               //if type of the key is string 
                else
                {
                 output = output.sort(function(a,b){
                     if (a[key] < b[key])
                       return -1;
                     if (a[key] > b[key])
                       return 1;
                     return 0;
                   }); 
                }
           }
         }
        }

        //Find if pagination is requested
        try{
            var paginationinputs = req.body.pagination;
        }
        catch(ex)
        {
            console.log("sort not requested");
        }
        
        if(paginationinputs !== undefined)
        {
            var page_number = paginationinputs.page_number;
            var size = paginationinputs.size;
            //if both page number and size are available 
            if(page_number !== undefined && size!= undefined)
            {
                //find the start for pagination
                //get records which belong to only the requested page
                var start = page_number * size;
                var paginationoutput = [];
                var length = output.length;
                for(var i=start; i<start+size; i++){
                    //verifying if the record index is valid
                    if(length>=i)
                        paginationoutput.push(output[i]);
                }
            }
            //if valid - check if paginationoutput is not empty
            if(paginationoutput.length)
                output = paginationoutput;
        }

        //send output
        res.status(200).json(output);
     
    });

    //post new record
    //append to existing data and write to the file
    //writing to a new file as a sample
    app.post('/api/users/', function(req,res){
       json_data.push(req.body);
       console.log(req.body);
       let data = JSON.stringify(json_data);
       fs.writeFile('sample.json', data, (err) =>{
           if(err) throw err;
           console.log('Data written to file');
           res.status(200).json({"success":true});
     
       });
    });

}




