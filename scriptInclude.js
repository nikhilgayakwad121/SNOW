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
gs.getXMLAnswer(function(response){
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
















