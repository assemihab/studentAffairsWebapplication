import { parse } from "../resources/index.js"

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

export function auth()
{
	var data = readTextFile("../resources/credentials.csv")

	var users = parse(data);

	for (const user of users.slice(1))
	{
		console.log(document.getElementById("username").value);
		if (document.getElementById("username").value == user[0] && document.getElementById("password").value == user[1])
		{
			window.location.href = "userprofile.html";
			return;
		}
	}
	
	if(!alert("Wrong username/password!"))
	{
		window.location.reload();
	}
}