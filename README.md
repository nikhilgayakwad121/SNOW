Methods: 
1, length: x.length();
2, slice : x.slice(start, end); -ve parameter work
3, substring: x.substring(12); -ve parameter may not work
4, replace: x.replace(‘I am’, ‘we are’); /g  to check the match
5, toUpperCase(): x.toLowerCase();
6, toLowerCase(): x.toUpperCase();
7, trim: s.trim(); remove spaces
8, split: str.split(‘ ’); //Any word that have it will get replace with comma
9, indexOf: x.indexOf(‘help’) find the first occurrence 
10, lastIndexOf: x.lastIndexOf(‘help’);
11, push: 
12, pop:
13, sort:
14, search: x.search(‘string’); //will search for string for string
15, match: x.match(‘ string’); //this method return an array cotaining that match
16, includes: x.includes(‘help’); returns true/false
17, toString(): x.toString(); //convert no into string
18,       

Operators:
!=
= Field must be equal to value supplied.
> Field must be greater than value supplied
< Field must be less than value supplied
>= Field must be equal or greater than value supplied
<= Field must be equal or less than value supplied.
STARTSWITH addQuery('short_description', 'STARTSWITH', 'Error');
CONTAINS addQuery('short_description', 'CONTAINS', 'Error');
IN addQuery('short_description', 'IN', 'Error,Success,Failure'
ENDSWITH addQuery('short_description', 'ENDSWITH', 'Error');
DOES NOT CONTAIN addQuery('short_description', 'DOES NOT CONTAIN', 'Error');
NOT IN addQuery('short_description', 'NOT IN', 'Error,Success,Failure');
INSTANCEOF addQuery('sys_class_name', 'INSTANCEOF', 'cmdb_ci_computer');
________________________________________
Accesing object:
current – The current record being processed (read/write).
previous – The values of the record before it was updated (read-only).
________________________________________
GlideRecord:
toString() Converts the value to a string.
getUniqueValue() – return sys-id of current record
addQuery(String fieldName, Object operator, Object value)– Adds a filter condition for querying records
addEncodedQuery("query") – Adds encoded query string.
orderBy("field") / orderByAsc("field") /orderByDesc("field") – Sort results.
query() – Executes the search.
next()/ hasNext()  – Moves to the next result from the query.
setLimit(num) – Limit number of results.
setWorkflow(false) – Prevents Business Rules, Workflows/Flow Designer flows being triggered during update.
autoSysFields(false) – Skip auto fields like updated_by.
setAbortAction(boolean b) when you want to completely stop the save/update/insert/delete action.
setForceUpdate(boolean e) Updates the record even if fields have not been changed
initialize() – Prepares a new, empty record for insertion.
addActiveQuery() – Filters for active records.
addInactiveQuery() – Filters for inactive records.
addNullQuery(field) – Finds records where the field is empty.
addNotNullQuery(field) – Finds records where the field is not empty.
insert() / Inserts a new record using the field values that have been set for the current record
newRecord() – Creates a new record with default values and a unique sys_id.
getUniqueValue() – return sys-id of current record
insertWithReferences() – Inserts a new record and also inserts or updates any related records with the information provided
update() Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
setValue(field, value) – Sets a field using internal value (e.g., sys_id).
setDisplayValue(field, displayValue) – Sets a reference field using a human-readable name.
get(query) – Retrieves one record by sys_id or unique field.
getValue(String fieldName)– Retrieves the string value of an underlying element in a field.
getRowCount() Retrieves the number of rows in the GlideRecord.


addDomainQuery(obj) – Changes the domain used for the query from the user's domain to the domain of the provided GlideRecord.
deleteRecord() – Deletes the current record from the database.
find(columnName, value)- Returns true if any record has a matching value in the specified column.
addJoinQuery("table", "primaryField", "joinField") – Join with another table.
addOrCondition() – Add OR condition to the query.
query(Object field, Object value) / _query(Object field, Object value)– Execute the query.
queryNoDomain(Object field, Object value)– Run query ignoring domain separation.
getTableName() – Get table name.
getFields() – Get array of field names.
canRead() / canWrite() / canCreate() / canDelete() – Check permissions.
newdeleteRecord() / deleteMultiple() – Delete record(s).
setLocation(int Number) Sets the current row location
saveLocation() Save the current row number so that we can get back to this location using restorelocation
restoreLocation() – Sets the current record to be the record that was saved with saveLocation().
isNewRecord()–if the current record is new (not inserted into the database).
changes() – Check if any field changed.
isValid() - Determines whether the table exists or not
isValidField(String columnName)- Determines if the given field is defined in the current table.
hasAttachments() Determines if the current record has any attachments.
isValidRecord() - Determine if there is another record in the GlideRecord.
operation()  -Retrieves the current operation being performed, such as insert, update, delete, etc.
getEscapedDisplayValue() Retrieves the field value of the current record and escapes it for use in Jelly scripts.
getFields() Retrieves an array of fields in the current record.
getLabel() Retrieves the appropriate label for a field.
getLink(boolean noStack) Retrieves the link for the current record.
getLocation() Retrieves the current row number.
getPlural() Retrieves the plural label of the GlideRecord table.
getRecordClassName() Retrieves the class name for the current record
getRelatedLists() Retrieves a list of names and display values of tables that refer to the current record.
getRowNumber() Retrieves the row number set by saveLocation() or setLocation().
setNewGuid() Generates a new GUID and sets it as the unique id for the current record.
setNewGuidValue(String guid) Generates a new GUID and sets it as the unique id for the current record, when inserting a new record
setQueryReferences(boolean queryReferences) Enables or disables using the reference field's display name when querying a reference field.
setUseEngines(boolean e) Disable or enable the running of any engines (approval rules / assignment rules)
applyTemplate(templateName) – Applies a template (sys_template) to the current record. No effect if not found.
updateWithReferences(Object reason) – Updates a record and also inserts or updates any related records with the information provided.
getElement(String columnName) Retrieves the GlideElement for a specified field
changesFrom(Object) Determines the previous value of the current field matched a certain object.
changesTo(Object) Determines if the new value of a field after a change matches a certain object.
debug(Object) Debugs the object and adds debug messages using setError(String).
getAttribute(String) returns the value of a field's attribute as a string. For boolean attributes, use getBooleanAttribute(String) instead.
getBaseTableName() Gets the base table of the field.
getChoices(String) Generates a choice list for a field. Returns the choice values from the base table only, not from the extended table.
getChoiceValue() Gets the choice label for the current choice value.
getDebugCount() Gets the number of debug messages logged by debug()
getDependent() Gets the field that this field is dependent on.
getDependentTable() Gets the table that the current table depends on.
getDisplayValue(Int) Gets the formatted display value of the field.
getDisplayValueExt(Int, String) Gets the formatted display value of a field, or a specified substitute value if the display value is null or empty.
getED() Gets an element descriptor.
getElementValue(String) Gets the value for a given element.
getError() Gets error debug messages.
getEscapedValue() Gets the escaped value for the current element.
getFieldStyle() Gets the CSS style for the field.
getGlideObject() Gets a glide object.
getGlideRecord() Gets the GlideRecord object that contains the element. To get a GlideRecord for a reference element, use getRefRecord().
getRefRecord() Gets a GlideRecord object for a given reference element.
getHTMLValue(Int) Gets the HTML value of a field.
getHTMLValueExt(Int, String) Gets the HTML value of a field, or a specified substitute value if the HTML value is null or empty.
getJournalEntry(int) Gets either the most recent journal entry or all journal entries.
getName() Gets the name of the field.
getStyle() Get a CSS style for the value.
getTextAreaDisplayValue() Gets the value and escapes the HTML.
getXHTMLValue() Gets the XHTML value of a field as a string.
getXMLValue() Gets the XML value of a field as a string.
hasAttribute(String) Determines whether a field has a particular attribute.
hasRightsTo(String) Determines if the user has the right to perform a particular operation.
hasValue() Determines if the field has a value.
nil() Determines whether the field is null.
setError(String) Adds an error message. Can be retrieved using getError().
setInitialValue(String) Sets the initial value of a field.
setJournalEntry(Object, String) Sets a journal entry.

________________________________________
GlideSystem
getUser() Returns a reference to the User object for the current user. More information is available here.
userID() Returns the sys_id of the user associated with this session.A shortcut for the more proper getUserID().
getUserID() Returns the sys_id of the current user.
isMemberOf('Capacity Mgmt'))
getSession() Returns a GlideSession object. See the GlideSession APIs wiki page for methods to use with the GlideSession object.
getSessionID() Accesses the GlideSession Session ID.
isInteractive() Checks if the current session is interactive. An example of an interactive session is when a user logs in using the log-in screen. An example of a non-interactive session is using a SOAP request to retrieve data

daysAgoStart(int) Gets a date and time for beginning of the day a certain number of days ago
getUserByID('abel.tuter') --fetched a different user, using the user_name field /sys_id on the target user record.
getFirstName() -- returns first name of current user 
getLastName() -- returns the last name of the current user 
getFullName() -- returns the current user's full name 
getDisplayName() -- returns the current user's display name, the same as full name 
getEmail() -- returns the email address of the current user 
getMobileNumber() –  returns the mobile number of the current user 
getDepartmentID() -- returns the sys_id of the current user's department 
getCompanyID() -- returns the sys_id of the current user's company 
getCompanyRecord() -- returns the current user's company GlideRecord 
getLanguage() -- returns the current user's language 
getLocation() -- returns the current user's location 
getCountry() -- returns the current user’s country 
getManagerName() -- returns the user_name of the current user’s manager 
getManagerID() -- returns the sys_id of the current user's manager
getDomainID() -- returns the domain ID of the current user 
getDomainDisplayValue() -- returns the domain display value for the current user 
getUserRoles() -- returns the roles explicitly granted to the current user myUserObject.getRoles() -- returns all of the roles of the current user
getMyGroups()-- returns a list of all groups to which the current user belongs (no argument).

getUser() Returns a reference to the User object for the current user. More information is available here.
getUserDisplayName() Returns the name field of the current user (e.g. John Smith, as opposed to smith).
getUserName() Returns the username of the current user (e.g., jsmith).
getUserNameByUserID(String) Gets the username based on a user ID.
getTZ() -- returns the timezone of the current user 
nowNoTZ() Gets the current date and time in UTC format.
nowDateTime() Gets the current date and time in the user-defined format
now() Gets the current date using GMT.
dateGenerate(String, String) Generates a date and time for the specified date in GMT
print(String) Writes a message to the system log. This method does not write the message to the syslog table unless debug has been activated.
getProperty(String, Object) Gets the value of a Glide property. If the property is not found, return an alternate value. Use getEscapedProperty(String, Object) to escape the property.
hasRole(String) Determines if the current user has the specified role. This method returns true for users with the administrator role.
hasRoleInGroup(Object, Object) Determines if the current user has the specified role within a specified group
eventQueue(String, Object, String, String, String): Queues an event for the event manager.
getCurrentScopeName()- Gets the name of the current scope.
getDisplayColumn(String) Gets the display column for the table
getDisplayValueFor(String, String, String) Gets the display value for a specified field on a record.
getEscapedProperty(String, Object) Gets the property and escapes it for XML parsing.
getMessage(String, Object) Retrieves translated messages to display in the UI.
getMessageS(String, Object) Retrieves translated messages to display in the UI and escapes all ticks (').
getScriptError(String) Returns the script error found in the specified script, if there is one. The script is not executed by this function, only checked for syntax errors.
getStyle(String, String, String) Returns the style defined for the table, field and value.
log(String message, String source) Logs a message to the system log and saves it to the syslog table.
logError(String message, String source) Logs an error to the system log and saves it to the syslog table.
logWarning(String message, String source) Logs a warning to the system log and saves it to the syslog table
nil(Object) Queries an object and returns true if the object is null or contains an empty string.
tableExists(String) Determines if a database table exists.
workflowFlush(Object) Deletes all existing workflow operations for the specified GlideRecord
addInfoMessage(Object) Adds an info message for the current session. Use getInfoMessages(Object) to retrieve the list of info messages being shown. Note: This method is not supported for asynchronous business rules and cannot be used within transform scripts.
addMessage(String, Object) Adds a message for the current session. Can be called using getMessages(String).
flushMessages() Clears session messages saved using addErrorMessage(Object) or addInfoMessage(Object). Session messages are shown at the top of the form. In client side scripts use g_form.clearMessages() to remove session messages.
getErrorMessages() Gets the list of error messages for the session that were added by addErrorMessage(Object)
getImpersonatingUserDisplayName() Returns the display name of the impersonating user.
beginningOfLastMonth() Gets the date and time for the beginning of last month in GMT.
beginningOfLastWeek() Gets the date and time for the beginning of last week in GMT.
beginningOfNextWeek() Gets the date and time for the beginning of next week in GMT
beginningOfNextMonth() Gets the date and time for the beginning of next month in GMT.
beginningOfNextYear() Gets the date and time for the beginning of next year in GMT.
beginningOfThisMonth() Gets the date and time for the beginning of this month in GMT
beginningOfThisQuarter() Gets the date and time for the beginning of this quarter in GMT.
beginningOfThisWeek() Gets the date and time for the beginning of this week in GMT.
beginningOfThisYear() Gets the date and time for the beginning of this week in GMT.
beginningOfToday() Gets the date and time for the beginning of today in GMT.
beginningOfYesterday() Gets the date and time for the beginning of yesterday in GMT.
calDateDiff(String, String, boolean) Calculate the difference between two dates using the default calendar. Note: Calendars are now legacy. If Schedules are being used, see Calculate Duration Given a Schedule.
dateDiff(String, String, boolean) Calculates the difference between two dates. This method expects the earlier date as the first parameter and the later date as the second parameter; otherwise, the method returns the difference as a negative value. Note: Use getDisplayValue() to convert the strings to the expected format.
daysAgo(int) Gets a date and time for a certain number of days ago.
daysAgoEnd(int) Gets a date and time for end of the day a certain number of days ago
endOfLastWeek() Gets the date and time for the end of last week in GMT, in the format yyyy-mm-dd hh:mm:ss.
endOfLastYear() Gets the date and time for the end of last year in GMT
endOfNextMonth() Gets the date and time for the end of next month in GMT.
endOfNextWeek() Gets the date and time for the end of next week in GMT.
endOfNextYear() Gets the date and time for the end of next year in GMT
endOfThisMonth() Gets the date and time for the end of this month in GMT.
endOfThisQuarter() Gets the date and time for the end of this quarter in GMT.
endOfThisWeek() Gets the date and time for the beginning of this week in GMT
endOfThisYear() Gets the date and time for the end of this year in GMT
endOfToday() Gets the date and time for the end of today in GMT.
endOfYesterday() Gets the date and time for the end of yesterday in GMT
hoursAgo(int) Gets a date and time for a certain number of hours ago.
hoursAgoEnd(int) Gets a date and time for the end of the hour a certain number of hours ago.
hoursAgoStart(int) Gets a date and time for the start of the hour a certain number of hours ago.
lastWeek() Date and time one week ago in GMT.
minutesAgo(int) Gets a date and time for a certain number of minutes ago
minutesAgoEnd(int) Gets a date and time for the end of the minute a certain number of minutes ago.
minutesAgoStart(int) Gets a date and time for the start of the minute a certain number of minutes ago.
monthsAgo(int) Gets a date and time for a certain number of months ago.
monthsAgoEnd(int) Gets a date and time for the last day of the month a certain number of months ago.
monthsAgoStart(int) Gets a date and time for the start of the minute a certain number of minutes ago
quartersAgo(int) Gets a date and time for a certain number of quarters ago.
quartersAgoEnd(int) Gets a date and time for the last day of the quarter a certain number of quarters ago.
quartersAgoStart(int) Gets a date and time for the first day of the quarter a certain number of quarters ago.
yearsAgo(int) Gets a date and time for a certain number of years ago.
yesterday() Gets yesterday's time.
isFirstDayOfMonth(Object) Checks whether the date is the first day of the month.
isFirstDayOfYear(Object) Checks whether the date is the first day of the year.
isFirstDayOfWeek(Object) Checks whether the date is the first day of the week. This uses the ISO standard of Monday being the first day of the week.
isLastDayOfMonth(Object) Checks whether the date is the last day of the month.
isLastDayOfWeek(Object) Checks whether the date is the last day of the week
isLastDayOfYear(Object) Checks whether the date is the last day of the year.
getNodeValue(object, Integer) Gets the node value for specified index.
getNodeName(Object, Integer) Returns the node name for specified index.
getPreference(String, Object) Gets a user preference.
getTrivialMessages() Gets the list of error messages for the session that were added with the trivial flag.
getXMLText (String, String) Gets the xml text for the first node in the xml string that matches the xpath query.
getXMLNodeList(String) Constructs an Array of all the nodes and values in an XML document.
isLoggedIn() Determines if the current user is currently logged in.
setRedirect(Object) Sets the redirect URI for this transaction. This determines the next page the user will see.
setReturn(Object) Sets the return URI for this transaction. This determines what page the user will be directed to when they return from the next form.
________________________________________
GlideAggregate
query()- Issues the query and retrieves results.
getQuery() -Gets the query necessary to return the current aggregate.
addEncodedQuery(String query)- Adds an encoded query to the other queries that may have been set for this aggregate.
groupBy(String name)- Provides the name of a field to use in grouping the aggregates. May be called multiple times to set multiple group fields.
orderBy(String name)- Provides the name of a field that should be used to order the aggregates. The field will also be added to the group-by list.
addHaving(String name, String operator, String value)- Adds a "having" element to the aggregate, e.g., SELECT category, COUNT(*) FROM incident GROUP BY category HAVING COUNT(*) > 5.
addAggregate(String agg, String name)- Adds an aggregate.
orderByAggregate(String agg, String name)- Provides the name of an aggregate that should be used to order the result set.
getValue(String name)- Gets the value of a field.
addTrend(String fieldName, String timeInterval)- Adds a trend for a field.
getAggregate(String agg, String name)- Gets the value of an aggregate from the current record.
getTotal(String agg, String name) - Gets the total number of records by summing an aggregate.
setGroup(Boolean b)- Sets whether grouping is true or false.
________________________________________
GlideForm
setMandatory('field', true/false) – Make field mandatory or optional
isMandatory('field') – Check if field is mandatory
addInfoMessage('message') – Show info message
addErrorMessage('message') – Show error message
info(‘message’)
error(‘message’)
setValue('field', 'value') – Set field value
getValue('field') – Get field value
alert()-
flash(‘incident.short_description’.#f343,-4)
clearValue('field') – Clear field value
setVisible('field', true/false) – Show/hide field
isVisible('field') – Check if field is visible
setDisplay('field', true/false) – Show/hide and collapse field space
setReadOnly('field', true/false) – Make field read-only or editable
isReadOnly('field') – Check if field is read-only
setDisabled('field', true/false) – Enable/disable field
clearMessages() – Clear all messages
save() – Save form without submit
submit() – Submit the form
disableAttachments() – Disable attachments
enableAttachments() – Enable attachments
getReference('field', callback) – Get reference field details
getUniqueValue() – Get record sys_id
getTableName() – Get form's table name
addOption('field_name', 'value', 'label'); → Adds an option to a choice field.
removeOption('field_name', 'value'); → Removes an option from a choice field.
clearOptions('field_name'); → Clears all options from a choice field.
setSectionDisplay('section_name', true/false); → Shows or hides a form section.
isModified(); → Checks if any field on the form has been modified.
getActionName(); → Retrieves the action name of the form.
getElement('field_name'); → Retrieves the element of a field.
getControl('field_name'); → Retrieves the field control.
getFormElement(); → Retrieves the form element.
showErrorBox('field_name', 'message'); → Displays an error box for a field.
g_form.hideFieldMsg('field_name'); → Hides any message displayed below a field.
hideRelatedLists(); → Hides related lists on the form.
.showRelatedList('list_name'); → Shows a specific related list.
.showRelatedLists(); → Shows all related lists.
isNewRecord(); → Checks if the current record is new.
isDebugging() – Checks if debugging is enabled

________________________________________


Other API’s:
GlideSysAttachment() Copy Attcahment from one table to another,  return string copy(sourceTable, sourceid, targetTable, targetid)
________________________________________
Other Content:
Client side (NOTE: only for use with client scripting) 
alert("Hello World"); Will pop up a window with "Hello World" and an 'OK' button. 
confirm("Hello World"); Will pop up a window with "Hello World?" and a 'Ok' and 'Cancel' buttons. g_form.showErrorBox("field_name", "Hello World"); Will put "Hello World" in an error message below the specified field. 
g_form.hideErrorBox("field_name"); Will hide an error box that is visible under the specified field
showFieldMsg() and hideFieldMsg() can be used to display a message just below the field itself. can be used with the g_form object
🐞 JavaScript Debug Window (ServiceNow)
Appears at the bottom of the UI when debugging is enabled (admin-only).
•	JavaScript Debugger: Debug client scripts (since Dublin).
•	JavaScript Log: Shows jslog() messages from browser scripts.
•	Field Watcher: Tracks changes to specific form fields (since Dublin).
Enable via: Application Navigator → Debugging

