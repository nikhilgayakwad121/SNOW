(function() {
    try {
        // Create REST MessageV2 object
        var r = new sn_ws.RESTMessageV2();
        r.setHttpMethod("GET");
        r.setEndpoint("https://reqres.in/api/users?page=2");

        // Execute request
        var response = r.execute();
        var responseBody = response.getBody();
        var httpStatus = response.getStatusCode();

        gs.info("HTTP Status: " + httpStatus);

        if (httpStatus == 200) {
            var parsed = JSON.parse(responseBody);

            // Assuming your custom table is u_users
            // Fields: u_id, u_email, u_first_name, u_last_name, u_avatar

            parsed.data.forEach(function(user) {
                var gr = new GlideRecord("u_users");
                gr.addQuery("u_id", user.id); // prevent duplicates
                gr.query();

                if (gr.next()) {
                    // Update existing record
                    gr.u_email = user.email;
                    gr.u_first_name = user.first_name;
                    gr.u_last_name = user.last_name;
                    gr.u_avatar = user.avatar;
                    gr.update();
                    gs.info("Updated user: " + user.id);
                } else {
                    // Insert new record
                    gr.initialize();
                    gr.u_id = user.id;
                    gr.u_email = user.email;
                    gr.u_first_name = user.first_name;
                    gr.u_last_name = user.last_name;
                    gr.u_avatar = user.avatar;
                    gr.insert();
                    gs.info("Inserted new user: " + user.id);
                }
            });
        } else {
            gs.error("Failed to fetch API data. Status: " + httpStatus);
        }
    } catch (ex) {
        gs.error("Error: " + ex.message);
    }
})();



// INEGRATION: Send Attachment from one instance and another.
Rest API Explorer to get API endpoint from target instance
In Rest message: API Endpoint, Authentication, Http Query parameter, {resquest body : “sys_id: ${sys_id}”}
Bussiness Rule:
(function executeRule(current, previous){
var targetInstanceURL-“  ”;
var targetUserPassword= “ ”;
//update incident
var r = new sn_ws.RESTMesssageV2(‘Rest Message Name’, ‘Method Name);
r.setStringParameterNoEscape(‘sys_id ’, current.sys_id);
var response = r.execute();
var responseBody = response.getBody();
var httpStatus = response.getStatusCode();
gs.addInfoMessage(“Update – new response status: ”+ httpStatus);

if(httpStatus.toString()==’200’);{
 	text= “incident created successfully”;

               // check for existing attachment
                 var checkIncident = new sn_ws.RESTMessageV2(‘rest Message Name’, ‘Method Name’);
                  checkIncident.setStringParameterNoEscape(‘sys_id’, current.sys_id);
                  var checkResponse = checkIncident.execute;
                  var checkResponseBody = checkResponse.getBody();
                  var existingAttachment = JSON.parse(checkResponseBody).result;
                  var existingAttachmentNames = [ ];

                 for(int i=i< existingAttachment.length;i++)
                 {
                     if(existingAttachement[i].table_sys_id) == current.sys_id.toString();{
                            existingAttachementNames,push(existingAttachment[i].file_name)
                      }
                  }

                 gs.addInfoMessage(existingAttachmentNAmes.length + “ matching  attachment (s) found:
                  table_sys_id matches current.sys_id”);

               //send new Attachments

 	var parser = new JSONParser();
 	var parsed = parser.parse(responseBody);
 	var targetRec = parsed.result;
 	var attachementCount = sendAttachments(current.getTableName(), current.sys_id, targetRec.sys_id);

 	if(attachementCount != “none”){
 	attachementMsg = “Attachement successfully sent ::: ” + attachemntCount[0].toString()+ “attachment Failed to be                           
                                                sent”+ attachementCount [1].toString();
 	}else{
 	attachemntMsg= “Record has no attachment”
  	}
}else{
 	text = “incident can’t create”;
}

text = text+ attachemntMsg;
gs.addInfoMessage(text);
function sendAttachements(sourceTable, sourceID, targetID){
               var answer =[0,0];
  	var x = new GlideRecord(‘sys_attachment’);
 	x.addQuery(‘table_sys_id’, sourceID);
 	x.addQuery(‘table_name’, sourceTable);
 	x.query();
 	if(x.hasNext()){
 	 	while(x.next()){
 			var amsg = new sn_ws.RESTMessageV2();
 			amsg.setHttpMethod(“post”);
 			amsg.setBasicAuth(targetUserID, targetUserPassword);
 			amsg.setEndPoint(targetInstanceURL + “api/now/attachment/file”);
 			amsg.setQueryParameter(“table_name”, x.table_name);
 			amsg.setQueryParameter(“table_sys_id”, targetID);
 			amsg.setQueryParameter(“file_name”, x.file_name);
 			amsg.setQueryParameter(“content_type”, x.content_type);
 			amsg.setQueryParameter(“Accept”, “application/json”);
                                           //form request body
                                           amsg.setRequestBodyFromAttachment(attachmentRec.sys_id);
 			var response = amsg.execute();
 			var responseBosy = response.getBody();
                                           var httpStatus= response.getStatusCode();

                                            if(httpStatus.toString(==’201’)){
                                             answer[0]+=1;
                                             }else{
                                              answer[1]+=1;
                                              }
 		}
 	}else{
                       answer=”none’’
               }
 return answer;
}
})(current, previous);


>>> Have nested JSON, ask them to retrieve any one value if they have good experience in Integrations.
var data = {
  "employee": {
    "id": "E123",
    "name": "John Doe",
    "contact": {
      "email": "john.doe@example.com",
      "phone": "555-1234"
    },
    "skills": [
      {"name": "JavaScript", "level": "Advanced"},
      {"name": "Integration", "level": "Expert"},
      {"name": "Python", "level": "Intermediate"}
    ]
  }
};
// Access nested value
var phoneNumber = data.employee.contact.phone;
console.log(phoneNumber); // Output: 555-1234


>>>>How to parse a JSON?
var rBody = ‘{‘’id”: “2”, “firstName”:”Nikhil”,”lastname”:”Gayakwad”,”photo”:”https://sample_link.com”}’;
var parseJson = JSON.parse(rBody);
var parsedData = parseJson.photo;
gs.print(parsedData);

var rBody=’{\”status\”: \”Work order created Successfully.”,\”,href\”:\”/workforceManagemet/api/v1/workOrders/13432\”}’;
var pJson = pbody.split(‘/’).pop();
gs.print(pJson);
gs.print(lValue);

var rBody= ‘{“a”:”b”:[{“x”:[{“z”:”bc”},{“g”:”yc”}]}’;
//get the value of g
var pbody= JSON.parse(rBody);
var test = pBody.b[0].x[1].g;
gs.print(test);
