-->QUESTION: 1
Operation to Perform: Read Permission
First ACL created: incident.none (role required itil and itil_admin)
Second ACL created: incident.* (role required itil_admin)
Result: only user with itil_admin can have read access incident.* is only providing itil_admin role a read access. (This happens because both has itil_admin common)
but if:
First ACL created: incident.none (role required itil_admin)
Second ACL created: incident.* (role required itil)
Result: User with itil role only will not view any record because he only have read access at the field level and not on the record/row level.
