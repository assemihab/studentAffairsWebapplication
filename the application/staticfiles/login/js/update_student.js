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
  
	returned.push(students[0]);
	for (const student of students.slice(1))
	{
	  if (student[0] === sid)
	  {	returned = student; }
	}

	document.getElementById('name').value = returned[1];
	document.getElementById('gpa').value = returned[2];
	document.getElementById('id').value = returned[0];
	document.getElementById('department').value = returned[7];
}

export function confirmDelete() {
	if (confirm("Are you sure you want to delete this student?")) {
		var data = readTextFile("../resources/db.csv");
		var students = parse(data);
		var returned = [];
		
		sid = document.getElementById('id').value;

		returned.push(students[0]);
		for (const student of students.slice(1))
		{
			if (student[0] != sid)
			{	returned.push(student); }
		}

		returned = stringify(returned);

		writeTextFile(returned, "../resources/save.php");

		if(!alert("Student deleted!"))
		{
			document.location.href = "search for student .html";
		}
	}
}


export function edit()
{
	if (confirm("Are you sure you want to edit this student?")) 
	{
		var data = readTextFile("../resources/db.csv");
		var students = parse(data);
		var returned = [];
		
		var sid = document.getElementById('id').value;

		returned.push(students[0]);
		for (var student of students.slice(1))
		{
			if (student[0] == sid)
			{	
				student[0] = document.getElementById('id').value;
				student[1] = document.getElementById('name').value;
				student[2] = document.getElementById('gpa').value;

				returned.push(student);
				continue;
			}
			returned.push(student);
		}

		returned = stringify(returned);

		writeTextFile(returned, "../resources/save.php");

		if(!alert("Student edited!"))
		{
			var url = 'updateStudent.html?id=' + encodeURIComponent(document.getElementById('id').value);

			document.location.href = url;
		}
	}
}