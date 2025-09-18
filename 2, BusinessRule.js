//Display Bussiness Rule----------
```Manager email of the user who created the incident on the form```
(function executeRule(current, previous){
  if(current.caller_id.manager.email)
    g_scratchpad.manager_email = current.caller_id.manager.email;
  else{
    g_scratchpad.manager_email = 'No manager email';
  }
})(current, previous);



//Before bussiness Rule------------
```Prevent Assignment to inactive Users```
(function executeRule(current, previous){
if(current.assigned_to){
  var gr = new GlideRecord('sys_user');
  if(gr.get(current.assigned_to) && !gr.active){
    gs.addErrorMessage("Cannot assign task to an inactive user: "+ user.name);
    current.setAbortAction(true);
  }
})(current, previous);


//After business Rule-----------------------
```Automatically update work notes of child incident when parent incident record update```
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



//Async Business Rule------------
```When parent incident is closed, Automatically close all the related child incident```
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



//Query Business Rule-----------
```Non admin user should only see  active incident records```
(function executeRule(current, previous){
if(!gs.hasRole('admin'))
{
   current.addQuery('active', true);
}
})(current, previous);


```Write a Business Rule (or Script Include) that automatically updates the Short Description of an Incident record to prepend the word "URGENT:" if the Priority is set```
(function executeRule(current, previous /*null when async*/) {

    // Check if Priority is not empty
    if (!gs.nil(current.priority)) {
        
        // Only prepend "URGENT:" if it's not already at the beginning
        if (current.short_description.indexOf("URGENT:") !== 0) {
            current.short_description = "URGENT: " + current.short_description;
        }
    }

})(current, previous);

```Automatically update the Incident record’s Work Notes whenever its related Problem record is updated```
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
var count = new GlideRecord('incident');
count.addAggregate('COUNT');
count.query();
if(count.next()){
  var Inccount = parseInt(count.getAggregate('COUNT'), 10);
  if(Inccount%5==0){
    var problemRecord = new GlideRecord('problem');
    problemRecord.initiaize();
    problemRecord.short_description = 'Problem created for the 5th Incident: ' + current.number;
    problemRecord.description = 'Automatically created after every 5 incidents. Triggered by incident: ' + current.number;
    var problemSysId= problemRecord.insert();
    if(problemSysId){
      current.problem_id = problemSysId;
      current.update();
    }
    gs.info(Problem record created for incident'+ current.number);
  }
}
})(current, previous);



------->I have custom table where one field called manager field, THis field need to populate based on the incident
assigement group manager, if we change the assignment group manager on the same incident, the manager will also
change on the custom table
(function executeRule(current, previous /*null when async*/) {
var x=current.assignment_group.manager.name;
var y=new GlideRecord('custom_table');
y.u_manager_name=x;
y.insert();
})(current, previous);


---------->Problem should get created when a 'is problem required?' checkbox is checked and when incident gets 
resolved and problem id will be stored in problem field. The incident should not get resolved until all 
incident tasks associated with it gets closed.
(function executeRule(current, previous){
if(current.state==6 && previous.state!=6 &&current.is_problem_required==true){
  var task = new GlideRecord('incident');
  task.addQuery('incident', current.sys_id);
  task.query();
  if(task.hasNext()){
    gs.addErrorMessage("you cannot resolve the incident while associated task are still open");
    current.setAbortAction(true); // stop the update
    return;
  }
  var gr = new GlideRecord("problem");
        gr.initialize();
        gr.short_description = current.short_description;
        gr.description = "Problem created from Incident " + current.number;
        var prob_id = gr.insert();
        if (prob_id) {
            current.problem_id = prob_id; 
        }
    }
})(current, previous);



------->An Incident cannot be moved to "Work in Progress" or "Resolved" unless it has at least one associated Incident Task. 
(function executeRule(current, previous /*null when async*/) {
  var incTask = new GlideRecord('incident');
  incTask.addQuery('parent', current.sys_id);
  incTask.query();
  if (!incTask.next()) {
    gs.addErrorMessage('Not allowed');
    current.setAbortAction(true);
  }
})(current, previous);




------->Write a script to create a Known error KB article?
(function executeRule(current, previous /*null when async*/) {
    if (current.problem_state == 3 && previous.problem_state != 3) {
        var kb = new GlideRecord('kb_knowledge');
        kb.initialize();
        kb.short_description = current.short_description;
        kb.text = current.description;
        kb.knowledge_base = '<knowledge_base_sys_id>';
        kb.workflow_state = 'published';
        kb.u_problem = current.sys_id;
        kb.insert();
    }
})(current, previous);



------->Delete the first 5 incident created today.
(function executeRule() { 
    var gr = new GlideRecord('incident'); 
    var today = gs.beginningOfToday(); 
    var tomorrow = gs.endOfToday(); 

    gr.addQuery('sys_created_on', '>=', today); 
    gr.addQuery('sys_created_on', '<=', tomorrow); 
    gr.orderBy('sys_created_on'); 
    gr.query(); 

    var count = 0; 
    while (gr.next() && count < 5) { 
        gs.print('Deleting Incident: ' + gr.number + ' (sys_id: ' + gr.sys_id + ')'); 
        gr.deleteRecord(); 
        count++; 
    } 

    if (count > 0) { 
        gs.print(count + ' incidents created today have been deleted.'); 
    } else { 
        gs.print('No incidents found for today to delete.'); 
    } 
})(current, previos);



---------->Whenever a user is created with the itil role, automatically add them to the Manager group
(function executeRule(current, previous /*null when async*/) {
    // Check if the assigned role is ITIL
    var roleGr = new GlideRecord('sys_user_role');
    if (roleGr.get(current.role) && roleGr.name == 'itil') {
        // Check if the user is already in the Manager group
        var groupGr = new GlideRecord('sys_user_grmember');
        groupGr.addQuery('user', current.user);
        groupGr.addQuery('group.name', 'Manager');
        groupGr.query();
        if (!groupGr.hasNext()) {
            // Find the Manager group sys_id
            var mgrGroup = new GlideRecord('sys_user_group');
            if (mgrGroup.get('name', 'Manager')) {
                var newGroupMember = new GlideRecord('sys_user_grmember');
                newGroupMember.initialize();
                newGroupMember.user = current.user;
                newGroupMember.group = mgrGroup.sys_id;
                newGroupMember.insert();

                gs.info('User ' + current.user + ' added to Manager group.');
            } else {
                gs.error('Manager group not found.');
            }
        }
    }

})(current, previous);

-------->You have a list collector field (group_list) that stores sys_ids of groups.
You want to convert those sys_ids into group display names and save them into another field (description_name).
(function executeRule(current, previous) {
    // Get the value of the list collector field (sys_ids as comma-separated string)
    var list = current.group_list;
    // Split the string into an array of individual sys_ids
    var listSplit = list.split(',');
    // Initialize an rray to store display names
    var result = [];
    // Variable to store final joined display names
    var setDataValue;
    // Loop through each sys_id in the array
    for (int i = 0; i < listSplit.length; i++) {
        // Create a GlideRecord on sys_user_group table
        var gData = new GlideRecord('sys_user_group');
        // Query for the group record with the current sys_id
        gData.addQuery('sys_id', listSplit[i]);
        gData.query();
        // Loop through matching group records (should be one)
        while (gData.next()) {
            // Push the display name of the group into result array
            result.push(gData.name.toString()); 
        }
    }
    // Join all display names with comma separator
    setDataValue = result.join(' , ');
    // Set the resulting string into description_name field
    current.description_name = setDataValue;
})(current, previous);
















