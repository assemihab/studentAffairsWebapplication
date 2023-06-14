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
            alert("Student added successfully!")
          }
      }
  }
  rawFile.send(data);
}

const educationYearSelect = document.getElementById("education-year");
const departmentSection = document.getElementById("department-section");

educationYearSelect.addEventListener("change", () => {
if (educationYearSelect.value === "3") {
  departmentSection.style.display = "block";
} else {
  departmentSection.style.display = "none";
}
});

export function add()
{
  var data = readTextFile("../resources/db.csv");
  var students = parse(data);

  var frm_elements = document.getElementById("studForm").elements; 

  var temp = [];

  for (const elm of frm_elements)
  {
    if(elm.name == "gender" || elm.name == "activity" || elm.name == "button")
    {
      if(elm.checked)
      {
        temp.push(elm.value);
        continue;

      }else{continue;}
  }

    if(elm.offsetParent)
    {
      temp.push(elm.value);
      continue;
    }

    temp.push("");
  }

  students.push(temp);

  students = stringify(students);

  writeTextFile(students, "../resources/save.php");
}