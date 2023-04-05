const tryCatch = require("../utils/tryCatch");
const cbAPI = require("../api/cbAPIQualbe")
const url = require('url');

const renderSubscriptionConfirmation = tryCatch(async (req, res) => {
    const query = url.parse(req.url, true).query;
    const hostedPageId = query.hostedPageId;

    let hostedPage = await cbAPI.retrieveHostedPage(hostedPageId);
    let content = hostedPage.hosted_page.content;
    let subscription = content.subscription;
    let planDescription = content.invoice.line_items[0].description;
    let members = fetchMembers(content.customer, subscription);

    res.render('ThankYou.ejs', {subscriptionId: subscription.id, amountPaid: content.invoice.total, billingPeriod: subscription.billing_period, billingPeriodUnit: subscription.billing_period_unit, planDescription, members});

});

const fetchMembers = (customer, subscription) => {
    var quantity = subscription.subscription_items[0].quantity;
    let members = [];
    members.push(customer.first_name + " " + customer.last_name);

    for(var i=2;i<=quantity;i++) {
        let key = `cf_dependent_${i-1}_name`;
        let cf_value = subscription[key];
        if(cf_value!=null) {
            members.push(cf_value);
        }
    }

    return members;
}

module.exports = {
    renderSubscriptionConfirmation
};