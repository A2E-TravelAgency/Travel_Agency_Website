//import { exec } from 'child_process';
//const spawn = exec.spawn;
//import scrape from "../Python/scrape"
//import {spawn} from 'child_process';
//const spawn = require("child_process").spawn;
/*const pythonProcess = spawn('python',["../Python/scrapeFlights.py"]);
pythonProcess.stdout.on('data',(data) =>{
    console.log(`Before String ${data}`);
    const mystr = data.toString();
    console.log(`Data to String ${mystr} Type of ${typeof mystr}`);
    const myjson = JSON.parse(mystr);
    console.log(`JSON is : ${myjson}`);
    console.log(myjson.Data);

});*/

import {PythonShell} from 'python-shell';

export function search(req, res, next)  {
  var mystr;
  const {inputValue1} = req.body;
  let options = {
  mode: 'text',
  //pythonPath: 'C:/Python39/python.exe',
 // pythonPath: 'C:/Users/S/Desktop/travel_agency/Python/venv/Scripts/python.exe', 
  pythonOptions: ['-u'],
  // make sure you use an absolute path for scriptPath
  scriptPath: '../back_end/Python/',
  args:[inputValue1]
};
let pyshell = new PythonShell('../Python/scrapeFlights.py',options); // 1

      try {

        /*PythonShell.run('scrape.py', options, function (err, results) {
          if (err) throw err;
          // results is an array consisting of messages collected during execution
          console.log('results: %j', results);
        });*/
        pyshell.on('message',function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(message); // here there will be logged your pyoutput
           
           mystr = message;
           
        }); // 2
         
        // end the input stream and allow the process to exit
        pyshell.end(function (err,code,signal) {
          if (err) throw err;
          console.log('The exit code was: ' + code);
          console.log('The exit signal was: ' + signal);
          console.log('finished');
          console.log('finished');
          res.send(mystr);
        }); // 3
      } catch (error) {
          res.status(500).json({success: false, error: error.message,});//500 internela server error
      }

     
  }


