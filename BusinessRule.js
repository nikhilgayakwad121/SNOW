------Display Bussiness Rule----------
//Manager email of the user who created the incident on the form.
(function executeRule(current, previous){
  if(current.caller_id.manager.email)
    g_scratchpad.manager_email = current.caller_id.manager.email;
  else{
    g_scratchpad.manager_email = 'No manager email';
  }
})(current, previous);



-----Before bussiness Rule------------
//Prevent Assignment to inactive Users
(function executeRule(current, previous){
if(current.assigned_to){
  var gr = new GlideRecord('sys_user');
  if(gr.get(current.assigned_to) && !gr.active){
    gs.addErrorMessage("Cannot assign task to an inactive user: "+ user.name);
    current.setAbortAction(true);
  }
})(current, previous);


-----------After business Rule-----------------------
//Automatically update work notes of child incident when parent incident record update
(function executeRule(current, previous){
var newWorkNote = current.work_notes.getJournalEntry(1);
if(!newWorkNote){
  return;
}
var childIncident = new GlideRecord('incident');
childIncident.addQuery('parent_incident', current.sys_id)
childIncident.query();
while(childIncident.next()){
  childIncident.work_notes= newWorkNote;
  childIncident.update();
}
})(current, previous);



------------Async Business Rule------------
//When parent incident is closed, Automatically close all the related child incident
(function executeRule(current, previous){
var childIncident = new GlideRecord('incident');
childIncident.addQuery('parent_incident', current.sys_id);
childIncident.query();
while(childIncident.next())
{
  childIncident.state= 7;
  childIncident.close_notes= 'closed Automatically by parent incident';
  childIncident.update();
}
})(current, previous);



-------------Query Business Rule----------
//Non admin user should only see  active incident records,
(function executeRule(current, previous){
if(!gs.hasRole('admin'))
{
   current.addQuery('active', true);
}
})(current, previous);


-------Automatically update the Incident record’s Work Notes whenever its related Problem record is updated
//Table: incident, After Update
(function executeRule(current, previous){
var childInc = new GlideRecord('incident');
childInc.addQuery(problem_id, current.sys_id);
childInc.query();
while(childInc.next())
{
  childInc.work_notes='problem record with number'+ current.number +'is updated'; 
  childInc.update();
}
})(current, previous);


--------I want to copy attachment from incident to problem table. 
//incident table, before BR insert, update
(function executeRule(current, previous){
var prb = new GlideRecord('problem');
prb.addQuery('parrent', current.getUniqueValue());
prb.query();
while(prb.next())
{
  GlideSysAttachment.copy('incident', current.getUniqueValue(), 'problem', prb.getUniqueValue());
}
})(current, previous);



------How to change the state of an incident to resolved, when a related change is set to close
//change_request, After Update
(function executeRule(current, previous){
if(current.state.changesTo('7')){
  var inc = new GlideRecord('incident');
  inc.addQuery('change_request', current.sys_id);
  inc.query();
  while(gr.query()){
  inc.state= 6;
  inc.update();
  }
}
})(currrent, previous);

------>Current logged in used can only see the incident which is assiged to him and assignment group to which he is part of
(function executeRule(current, previous){
if(gs.getUser().isMemberOf(current.assigned_group.toString())&&gs.getSession().isInteractive()){
  current.addQuery('assigned_group', 'current.assigned_group.toString()')
  current.addQuery('assigned_to', gs,getUserID)
}
})(current, previous);



------->When child incident is closed than only when we can close the parent incident
(function executeRule(current, previous){
var childIncident = new GlideRecord('incident');
childInc.addQuery('parent_incident', current.sys_id);
childInc.addQuery('state',!=,7) //Checks if any are not closed
childInc.query();
while(childIncident.hasNext())
{
  childInc.addErrorMessage= 'You cannot close the parent incident untill all the child incident are closed';
  childInc.setAbortAction(true);
}
})(current, previous);


------> check whether the caller is VIP or not
(function executeRule(current, previous){
if(current.caller_id.vip==true){
  g_scratchpad.VIP= true;
}
else{
  g_scratchpad.VIP= false;
}
)}(current, previous)



---------->counts the incident created by the user in last 24 hours and bock insert if the limit is reached to 5
//incident before insert
(function executeRule(current, previous /*null when async*/) {
    if (!current.caller_id) {
        return;
    }
    var gr = new GlideRecord('incident');
    gr.addQuery('caller_id', current.caller_id);
    gr.addQuery('sys_created_on', '>=', gs.minutesAgoStart(1440)); // last 24 hrs
    gr.setLimit(5); // stop after 5 results
    gr.query();
    var count = 0;
    while (gr.next()) {
        count++;
    }
    if (count >= 5) {
        gs.addErrorMessage('You have already created 5 incidents in the last 24 hours. Please wait before creating more.');
        current.setAbortAction(true); 
    }
})(current, previous);



-------->When the catagory is software , the assignment group will be software
//before
if(current.category=='software'){
  current.assignment_group.setDisplayValue('Software');
}


----->How to create a problem record for 5th incident in incident list
//After
(function executeRule(current, previous){






})
































