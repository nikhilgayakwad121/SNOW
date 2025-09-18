```Role Required: web_service_admin
https://<instance.service-now.com>/api/<name_space>/<version>/<api_id>/<relative_path>
https://dev7109.servicenow.com/api/34257/applicationintegration/insert_update_incident 

Scenario-1: A client shares a requirement to capture alerts generated from a monitoring 
tool (Solarwinds, Prometheus, Datadog etc ) and create an incident for it on ServiceNow

Scenario-2: To make it a little complex, it is required to create an incident when the 
status is “DOWN” for any CI and resolve the incident when the status is “UP” for the same CI

Scenario-3: It is again required to assign that particular incident to a specific user and 
make sure that for the same CI, multiple incidents do not get generated even after multiple 
alerts from the monitoring tool

Propose Solution: Only Scenario-1 can be achieved by REST API explorer and here comes Scripted
 REST API in picture which can handle complexities defined in Scenario-2 & 3.```

SCRIPTED REST API SCRIPT:-
(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var responseBody = {};
    var event = request.body.data;
    if (event.ci_status == "up") {
        var resolve_incident = new getApplicationAlert().update_incident();
        return resolve_incident;
    } else {
        var ci = new GlideRecord('incident');
        ci.addEncodedQuery('stateIN1,4,2,3');
        ci.addQuery('cmdb_ci.name', event.cmdb_ci);
            ci.query();
            if (ci.next()) {
                responseBody.message = "Inc exists for CI ";
                response.setBody(responseBody);
                ci.setAbortAction('true');
            } else {
                var insert_incident_1 = new getApplicationAlert().insert_incident();
                return insert_incident_1;
            }
    }
})(request, response); 

SCRIPT INCLUDE:-
var getApplicationAlert  = Class.create();
getApplicationAlert .prototype = {
    initialize: function() {},
    get_ci_info: function() {
        var responseBody = {};
        var event = request.body.data;
        var ci = new GlideRecord('cmdb_ci');
        ci.addQuery('name', event.cmdb_ci);    
        ci.query();
            if (ci.next()) {
                return ci.name;
            }     
        },
    insert_incident: function() {
        var responseBody = {};
        var event = request.body.data;
        var caller = gs.getProperty('glide.incident.caller');
        var ci = this.get_ci_info();
        var gr = new GlideRecord('incident'); {
           gr.initialize();
           gr.caller_id = caller;
           gr.work_notes = event.work_notes;
           gr.short_description = event.short_description;
           gr.u_incident_type = '5';
           gr.category = "general";
           gr.subcategory = "incident";
           gr.description = event.description;
           gr.setDisplayValue('cmdb_ci', ci);
            if (ci != event.cmdb_ci) {
                responseBody.message = event.cmdb_ci+" - Configuration item does not exist";
                response.setBody(responseBody);
                gr.setAbortAction('true');
            } else {
                gr.insert();
                responseBody.message = "Incident created";
                responseBody.incidentnumber = gr.number;
                responseBody.incidentcaller = gr.caller_id;
                responseBody.incidentshortdescription = gr.short_description;
                responseBody.incidenttype = gr.u_incident_type;
                responseBody.ci = gr.cmdb_ci;
                response.setBody(responseBody);
            }
        }
    },
    update_incident: function() {
        var responseBody = {};
        var event = request.body.data;
        var ci = this.get_ci_info();
        var inc = new GlideRecord('incident');
        inc.addEncodedQuery('stateIN1,4,2,3');
        inc.addQuery('cmdb_ci.name', ci);
        inc.query();
        if (inc.next()) {
            inc.state = 6;
            inc.close_code = event.close_code;
            inc.close_notes = event.close_notes;
            inc.update();
        }
        responseBody.message = "Incident Updated.";
        responseBody.incidentnumber = inc.number;
        responseBody.incidentcaller = inc.caller_id;
        responseBody.incidentshortdescription = inc.short_description;
        responseBody.incidenttype = inc.u_incident_type;
        responseBody.ci = inc.cmdb_ci;
        response.setBody(responseBody);
    },
    type: 'getApplicationAlert '
};
