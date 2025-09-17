>>>> Using event as trigger, crate an incident. event can be triggered from BR,UI actions or any flow
Create an Event Script (Business Rule → Respond to Event)
(function runEventScript(event, current, previous) {
    // Create new Incident
    var inc = new GlideRecord('incident');
    inc.initialize();

    // You can set dynamic values here based on event params
    inc.short_description = "Incident created from event: " + event.name;
    inc.description = "Triggered by event [" + event.name + "].\n" +
                      "Parm1: " + event.parm1 + "\n" +
                      "Parm2: " + event.parm2;
    inc.caller_id = gs.getUserID(); // current logged in user
    inc.impact = 3; // default values
    inc.urgency = 3;
    inc.insert();

})(event, current, previous);
From a Business Rule
gs.eventQueue("custom.incident.create", current, "Parm1 value", "Parm2 value");


>>>> Background Script using Catalog API
(function() {
    var catAPI = new sn_sc.CatalogAPI();

    // Create a request for a catalog item
    var request = catAPI.createOrderNow(
        'e0d08b13c3330100c8b837659bba8fb4', // Catalog item sys_id
        {
            'requested_for': gs.getUserID(),
            'justification': 'Created from Catalog API'
        }
    );
    if (request) {
        gs.print('Service Request created: ' + request.request_number);
    } else {
        gs.print('Failed to create request');
    }
})();
