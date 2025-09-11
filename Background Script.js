-----------Count catalog items not used in last 12 months------------
var unusedCount = 0;
var catItem = new GlideRecord('sc_cat_item');
catItem.query();
while (catItem.next()) {
    var req = new GlideRecord('sc_req_item');
    req.addQuery('cat_item', catItem.sys_id);
    req.addQuery('opened_at', '>=', gs.daysAgoStart(365));
    req.setLimit(1); 
    req.query();
    if (!req.hasNext()) {
        unusedCount++;
    }
}
gs.print("Catalog items not used in last 12 months: " + unusedCount);


-------------Count and display incident categories (groupBy) from incident table (use GlideAggregate)
var ga = new GlideAggregate('incident');
ga.addAggregate('COUNT');
ga.groupBy('category');
ga.query();

while (ga.next()) {
    var category = ga.getDisplayValue('category'); // More readable
    var count = ga.getAggregate('COUNT');
    gs.print(category + ' => ' + count);
}


------------Recent 10 incident numbers which are linked to Problem record & never got reassigned
var gr = new GlideRecord("incident");
gr.addNotNullQuery("problem_id");        
gr.addQuery("reassignment_count", 0);    
gr.orderByDesc("sys_created_on");        
gr.setLimit(10);
gr.query();
while (gr.next()) {
    gs.print(gr.number);
}


------------------Print the incident updated today(1), without if/while loop-----------
var gr = new GlideRecord(‘incident’);
gr.addQuery(sys_updated_on);
gr.query();
gr.next()&&gs.print(gr.number);


-----------------print the incident updated today state wise and print the state also--------
var gr = new GlideAggregate('incident');
var today = gs.beginningOfToday();
gr.addQuery('sys_updated_on', '>=', today);
gr.addAggregate('COUNT', 'state');
gr.groupBy('state');
gr.query();
while (gr.next()) {
    gs.print(gr.getDisplayValue('state') + ' count is ' + gr.getAggregate('COUNT', 'state'));
}

----------------Find duplicate users in sys_user by 'name' and delete extras------------------
var seenNames = {};
var grUser = new GlideRecord('sys_user');
grUser.orderBy('name'); // Ensures consistent ordering
grUser.query();
while (grUser.next()) {
    var userName = grUser.name.toString().trim();
    if (seenNames[userName]) {
        gs.print('Deleting duplicate user: ' + userName + ' | Sys ID: ' + grUser.sys_id);
        grUser.deleteRecord();
    } else {
        seenNames[userName] = true; // First occurrence is kept
    }
}
gs.print('Duplicate cleanup complete.');

---------------Check If a Record Has Attachments and Build a Link--------------
var attachment_link = ' ';
var rec = new GlideRecord('sc_req_item');
rec.addQuery('sys_id', current.request_item);
rec.query();
if (rec.next()) { 
    if (rec.hasAttachments()) {
        attachment_link = gs.getProperty('glide.servlet.uri') + rec.getLink();
    }
}


---------------Check which all incident having attachment-----------------
var grIncident = new GlideRecord('incident');
    grIncident.query();
    while (grIncident.next()) {
        var hasAttachment = false;
        // Check sys_attachment table for this incident
        var grAttach = new GlideReord('sys_attachment');
        grAttach.addQuery('table_name', 'incident');
        grAttach.addQuery('table_sys_id', grIncident.sys_id);
        grAttach.query();
        if (grAttach.hasNext()) {
            hasAttachment = true;
        }
        gs.print(
            grIncident.number + ' | Has Attachments: ' + (hasAttachment ? 'Yes' : 'No')
        );
}


-------------------Need latest 10 records from Incident table, Priority is Critical, State is Resolved, Category is Network.
var gr = new GlideRecord(‘incident’);
gr.addQuery(sys_updated_on);
gr.addQuery(‘priority’,1);
gr.addQuery(‘state’, 6);
gr.addQuery(‘category’,’Network’);
gr.setLimit(10);
gr.query();
while(gr.next())
{
   gs.print(‘incident number=’+gr.number+’, Short description=’+gr.short_description);
}


--------------------Print the incident number which assigned to you recently with if and else loop--------------------
var gr = new GlideRecord(‘incident’);
gr.addQuery(sys_updated_on);
gr,addQuery(‘assigned_to’,gs. getUserID);
gr.setLimit(1);



---------------------Close the incident which are resolved in last 7 days--------------------
var gr = new GlideRecord(‘incident’);
gr.addQuery(‘state’, 6);
gr.addQuery(sys_updated_on, ‘>=’, gs.daysgoStart(7);
gr.query();
while(gr.next())
{
gr.state= 7;
 	gr.update();
}







