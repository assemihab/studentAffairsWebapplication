import { parse } from "../resources/index.js";
import { stringify } from "../resources/index.js";

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  var text = "";
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        text = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return text;
}

function writeTextFile(txt, file) {
  var data = new FormData();
  data.append("data", txt);
  var rawFile = new XMLHttpRequest();
  rawFile.open("POST", file, false);
  rawFile.setRequestHeader("Sec-Fetch-Site", "cross-site");
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        console.log(rawFile.responseText);
      }
    }
  };
  rawFile.send(data);
}

window.onload = function () {
  var url = window.location.href;
  var data = readTextFile("../resources/db.csv");
  var students = parse(data);

  if (url.split("/")[3] == "act-in.html") {
    var table = document.getElementById("actTable");
    for (const student of students.slice(1)) {
      if (student[9] == "active") {
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML =
          '<input name = "activeR" type="radio" id="' + student[0] + '"/>';
        cell2.innerHTML = "<td>" + student[1] + "</a></td>";
        cell3.innerHTML = "<td>" + student[0] + "</a></td>";
        cell4.innerHTML = "<td>" + student[6] + "</a></td>";
        cell5.innerHTML = "<td>" + student[9] + "</a></td>";
      }
    }

    table = document.getElementById("inactTable");
    for (const student of students.slice(1)) {
      if (student[9] == "inactive") {
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML =
          '<input name = "inactiveR" type="radio" id="' + student[0] + '"/>';
        cell2.innerHTML = "<td>" + student[1] + "</a></td>";
        cell3.innerHTML = "<td>" + student[0] + "</a></td>";
        cell4.innerHTML = "<td>" + student[6] + "</a></td>";
        cell5.innerHTML = "<td>" + student[9] + "</a></td>";
      }
    }
  }
};

// you need to change this function to be compatiable with ajax
// export function SearchFor() {
//   //after db connection
//   var data = readTextFile("../resources/db.csv");
//   var students = parse(data);

//   var name = document.getElementById("StudentName").value;

//   var table = document.getElementById("stdTable");

//   var returned = [];

//   for (const student of students.slice(1)) {
//     if (student[1] === name && student[9] == "active") {
//       var row = table.insertRow(1);
//       var cell1 = row.insertCell(0);
//       var cell2 = row.insertCell(1);
//       var cell3 = row.insertCell(2);
//       var cell4 = row.insertCell(3);
//       var cell5 = row.insertCell(4);

//       cell1.innerHTML = "<td>" + student[1] + "</a></td>";
//       cell2.innerHTML = "<td>" + student[0] + "</a></td>";
//       cell3.innerHTML = "<td>" + student[6] + "</a></td>";
//       cell4.innerHTML =
//         '<button id="update" name="' +
//         student[0] +
//         '" onclick="sendData(this.id, this.name)">Update Profile</button></a>';
//       cell5.innerHTML =
//         '<button id="updateDept" name="' +
//         student[0] +
//         '"  onclick="sendData(this.id, this.name)">Assign Department</button></a>';
//     }
//   }
// }

export function SearchFor() {
  var xhttp = new XMLHttpRequest();
  studentName = "matbal";
  xhttp.onload = function () {
    console.log(this.responseText);
  };

  xhttp.open("POST", "/searchstud/");
  xhttp.send("student_name=" + encodeURIComponent(studentName));
}

export function change(btnName) {
  if (btnName == "active") {
    var data = readTextFile("../resources/db.csv");
    var students = parse(data);
    if (confirm("Are you sure you want to activate this student?")) {
      var radio = Array.from(document.getElementsByName("inactiveR"));
      radio = radio.filter((child) => child.checked)[0];

      var returned = [];

      var sid = radio.id;

      returned.push(students[0]);
      for (var student of students.slice(1)) {
        if (student[0] == sid) {
          student[9] = "active";

          returned.push(student);
          continue;
        }
        returned.push(student);
      }

      returned = stringify(returned);

      writeTextFile(returned, "../save.php");

      if (!alert("Student activated!")) {
        location.reload();
      }
    }
  }

  if (btnName == "inactive") {
    var data = readTextFile("../resources/db.csv");
    var students = parse(data);
    if (confirm("Are you sure you want to deactivate this student?")) {
      var radio = Array.from(document.getElementsByName("activeR"));
      radio = radio.filter((child) => child.checked)[0];

      var returned = [];

      var sid = radio.id;

      returned.push(students[0]);
      for (var student of students.slice(1)) {
        if (student[0] == sid) {
          student[9] = "inactive";

          returned.push(student);
          continue;
        }
        returned.push(student);
      }

      returned = stringify(returned);

      writeTextFile(returned, "../save.php");

      if (!alert("Student deactivated!")) {
        location.reload();
      }
    }
  }
}

export function sendData(bid, id) {
  if (bid == "update") {
    var url = "updateStudent.html?id=" + encodeURIComponent(id);

    document.location.href = url;
  }

  if (bid == "updateDept") {
    var url = "department-form.html?id=" + encodeURIComponent(id);

    document.location.href = url;
  }
}
