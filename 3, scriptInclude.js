-------->CheckCheck if the Caller is a VIP user using a Script Include (GlideAjax) and call it from an onLoad Client Script
va checkVIPUser = class.create();
CheckVIPUser.prototype = Object.extendsObject(AbstractAjaxProcessor,{
  isVIP: Function(){
  var callerSysId = this.getParameter('sysparam_caller_id');
  var user = new GlideRecord('sys_user');
  if(user.get(callerSysId)){
    return(user.vip==true)? return 'true': 'false';
  }
  return 'false';
  }
});
function onLoad(){
var callerID = g_form.getValue('caller_id')
if(!callerID){
  return;
}
var ga = new GlideAjax('checkVIPUser');
ga.addParam('sysparam_name', 'isVIP');
ga.addParam('sysparam_caller_id', callerID);
ga.getXMLAnswer(function(response){
if(response)=='true'){
  alert('caller is VIP');
}
else{
  alert('Caller is not VIP');
}
});
}



------>Calling Script include from a client Script
var myScriptInclude = class.create();
myscriptInclude.prototype = Object.extendsObject(AbstarctAjaxProcessor,{
emailDetailScriptInclude : function(){
var test = this.getParameter('sysparam_value')
var x = new GlideRecord('sys_user');
x.addQuery('sys_id',test );
x.query();
if(x.test()){
  return x.email;
}
}
function onChange(control, oldValue, newValue, isLoading, isTemplate){
if(isLoading || newValue === ' '){
  return;
}
var callerDetails = g_form.getValue(caller_id);
var ga = new GlideAjax('myScriptInclude');
ga.addParam('sysparam_name',emailDetailScriptInclude );
ga.addParam('sysparam_value', callerDetails);
ga.getXML(getResult);
function getResult(response){
    var answer = response.responseXML.documentElement.getAttribute('answer');
    g_form.setValue('u_application_id,answer');
}
};



-------->a Script Include in ServiceNow that looks up a user by email, gets the username, and then returns that username to a Client Script via GlideAjax.
var GetUserInfo = Class.create();
GetUserInfo.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getUsernameByEmail: function() {
        var email = this.getParameter('sysparm_email'); // parameter from client
        var gr = new GlideRecord('sys_user');
        gr.addQuery('email', email);   // field is usually 'email', not 'email_id'
        gr.query();
        if (gr.next()) {
            return gr.user_name.toString();  // return username
        }
        return ''; // if no user found
    }

});
function onLoad() {
    var ga = new GlideAjax('GetUserInfo');
    ga.addParam('sysparm_name', 'getUsernameByEmail');
    ga.addParam('sysparm_email', 'nikhil@gmail.com'); // pass email
    ga.getXMLAnswer(function(response) {
        var username = response;
        if (username) {
            alert("Username: " + username);
            // You could also set it to a field:
            // g_form.setValue('u_username_field', username);
        } else {
            alert("No user found for this email.");
        }
    });
}



--------->Auto-Populate user's email and user id when the user changes.
Script include
var GetUserDetails = Class.create();
GetUserDetails.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getDetails: function() {
        var userId = this.getParameter('sysparm_user_id');
        var user = new GlideRecord('sys_user');
        if (user.get(userId)) {
            return JSON.stringify({
                email: user.email.toString(),
                user_id: user.user_name.toString()
            });
        }
        return JSON.stringify({});
    }
});
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === ' ') {
        return;
    }
    var ga = new GlideAjax('GetUserDetails');
    ga.addParam('sysparm_name', 'getDetails');
    ga.addParam('sysparm_user_id', newValue);
    ga.getXMLAnswer(function(response) {
        var result = JSON.parse(response);
        if (result) {
            g_form.setValue('email', result.email);
            g_form.setValue('user_id', result.user_id); // Make sure this field exists on the form
        }
    });



---------->Calling Script Include from a Business Rule / UI Action / Another Script Include
var MyScriptInclude = Class.create();
MyScriptInclude.prototype = {
    initialize: function() {},
    myFunction: function() {
        return "Hello from Script Include";
    },
    type: 'MyScriptInclude'
};
Call it like this:
var obj = new MyScriptInclude();
var result = obj.myFunction();
gs.info(result); // Output: Hello from Script Include



----------->Calling Script Include from a Scoped App
If you're in a scoped app, use the scoped name:
var obj = new sn_yourscope.MyScriptInclude(); // scoped
Or use GlideAjax in client scripts:
var ga = new GlideAjax('sn_yourscope.MyScriptInclude');

Calling Script Include from Flow Designer (via Script Action)
var result = new MyScriptInclude().myFunction();



----------->Call Script include from the dynamic refrence Qualifier.
var ScriptIncludeName = Class.create();
ScriptIncludeName.prototype  = {
 	initialize: function() {
 	},
 	ScriptIncludeFunctionName: function(){
 	 	var x = new GlideRecord(‘sys_user’);
 		x.addQuery(‘sys_id, gs.getUserID’)
x.query();
while(x.next()){
    return "department"+ "=" +x.department.toString();
 		}
 	}
   type: ‘ScriptIncludeName
}
For dynamic refrence-> new ScriptIncludeName().ScriptIncludeFunctionName() inside dynamic filter options
For Advanced refrence-> javascript: new ScriptIncludeName().ScriptIncludeFunctionName()

---------->Call Bussines rule from the dynamic refrence Qualifier.
Before query BR
function DepartName(){
 	 	var x = new GlideRecord(‘sys_user’);
 		x.addQuery(‘sys_id, gs.getUserID’)
x.query();
while(x.next()){
    return "department"+ "=" +x.department.toString();
 		}
}
Script: DepartName() inside dynamic filter options

---------->When assigned to is filled, populate assignment groups in which assigned to is a member.
var BackfillAssignmentGroups = Class.create();
BackfillAssignmentGroups.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  BackfillAssignmentGroup: function(getag) {
    var gp = '';
    if (!getag) return;
    var grp = new GlideRecord('sys_user_grmember');
    grp.addQuery('user', getag);
    grp.query();
    while (grp.next()) {
      gp = grp.group + ',' + gp;
    }
    return 'sys_idIN' + gp;
  },
  type: 'BackfillAssignmentGroups'
});

Dictionary Override for the Assignment Group field on the target table:
Add Qualifier:
javascript: new BackfillAssignmentGroups().BackfillAssignmentGroup(current.assigned_to)








