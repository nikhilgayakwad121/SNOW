Count catalog items not used in last 12 months
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

