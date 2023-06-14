import { parse } from "../resources/index.js"
import { stringify } from "../resources/index.js"

function readTextFile(file)
{
  var rawFile = new XMLHttpRequest();
  var text = "";
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
              text = rawFile.responseText;

          }
      }
  }
  rawFile.send(null);
  return text;
}

function writeTextFile(txt,file)
{
  var data = new FormData();
  data.append("data", txt); 
  var rawFile = new XMLHttpRequest();
  rawFile.open("POST", file, false);
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
            console.log(rawFile.responseText);
          }
      }
  }
  rawFile.send(data);
}

window.onload = function () {
    var url = document.location.href;
	var sid  = url.split('=')[1];
	
	var data = readTextFile("../resources/db.csv");
	var students = parse(data);
	var returned = [];
  
	for (const student of students)
	{
	  if (student[0] === sid)
	  {	returned = student; }
	}

	document.getElementById('stName').innerHTML = returned[1];
	document.getElementById('stID').innerHTML = returned[0];
	document.getElementById('stYr').innerHTML = returned[6];
}

export function assign() {
  var yrText = document.getElementById("stYr").innerHTML;
  var eduYear = yrText.substr(-1);
  if (eduYear < 3) {
	alert(
	  "Invalid assignment!\n Student must be year 3 or above to assign to department"
	);
	return false;
  }
  // Change the student department in the database

  var data = readTextFile("../resources/db.csv");
  var ddown = document.getElementById('Department');
  var students = parse(data);
  var returned = [];
  
  sid = document.getElementById('id').value;

  returned.push(students[0]);
  for (var student of students.slice(1))
  {
    if (student[0] == sid)
    {	
      student[7] = ddown.options[ddown.selectedIndex].value;

      returned.push(student);
      continue;
    }
    returned.push(student);
  }

  returned = stringify(returned);

  writeTextFile(returned, "../resources/save.php");

  alert("Student edited!");
}