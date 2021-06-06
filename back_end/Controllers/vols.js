//import { exec } from 'child_process';
//const spawn = exec.spawn;
//import scrape from "../Python/scrape"
import {spawn} from 'child_process';
//const spawn = require("child_process").spawn;
/*const pythonProcess = spawn('python',["../Python/scrape.py"]);
pythonProcess.stdout.on('data',(data) =>{
    console.log(`Before String ${data}`);
    const mystr = data.toString();
    console.log(`Data to String ${mystr} Type of ${typeof mystr}`);
    const myjson = JSON.parse(mystr);
    console.log(`JSON is : ${myjson}`);
    console.log(myjson.Data);

});*/
import {PythonShell} from 'python-shell';
let pyshell = new PythonShell('../Python/scrapeFlights.py'); // 1
 
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message); // here there will be logged your pyoutput
}); // 2
 
// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
  console.log('finished');
}); // 3