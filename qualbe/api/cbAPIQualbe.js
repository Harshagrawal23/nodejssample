var chargebee = require("chargebee");
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.CB_API_KEY;
const siteName = process.env.CB_SITE;

chargebee.configure({
    site: siteName,
    api_key: apiKey
})


const fetchCustomerByPhone =  async (phone)=>{
    console.log(process.env.CB_SITE);
    console.log("Fetching customer by phone");

    let result = await chargebee.customer.list({
           "phone[is]": phone
       }).request();
    return result
};

const fetchItemPrice =  async (item_price_id)=>{
    let result = await chargebee.item_price.retrieve(item_price_id).request();
    return result
}

const fetchItem =  async (item_id)=>{
    let result = await chargebee.item.retrieve(item_id).request();
    return result
}

const fetchEstimateForNewSubscription = async (item_price_id, quantity, email, line1, city, zip, country) => {
    let result = await chargebee.estimate.create_sub_item_estimate({
        billing_address : {
          line1  ,
          city ,
          zip ,
          country,
          email
          },
        subscription_items : [
          {
            item_price_id,
            quantity
          }]
      }).request();

    return result
    }

const createCheckoutForNewSubscription = async (item_price_id, quantity, first_name, last_name ,email, phone, line1, line2, city, zip, state, country, bline1, bline2, bcity, bzip, bstate, dependent_members, isr) => {
    console.log(isr);
    let result = await chargebee.hosted_page.checkout_new_for_items({

        "layout": "in_app",

        subscription_items : [
          {
            item_price_id,
            quantity
          }
        ],

        customer : {
            first_name,
            last_name,
            email,
            phone
        },

        billing_address : {
            first_name,
            last_name,
            email,
            phone,
            "line1" : bline1,
            "line2" : bline2,
            "city" : bcity,
            "zip" : bzip,
            "state_code": bstate,
            country
         
        },

        shipping_address : {
            first_name,
            last_name,
            email,
            phone,
            line1,
            line2,
            city,
            zip,
            "state_code": state,
            country
        },

        ...subscriptionCustomFieldObjects(dependent_members),

        "subscription[cf_isr]" : isr
 
      }).request();

    return result;
    }

const subscriptionCustomFieldObjects = (dependent_members) => {
    let cf_dependent_object = {};

    if(dependent_members!=null) {
        for(let i=0;i<dependent_members.length;i++) {
            let key1 = `subscription[cf_dependent_${i+1}_name]`;
            cf_dependent_object = {
                ...cf_dependent_object,   
                [key1] : dependent_members[i]
            }
        }
    }

    return cf_dependent_object;
}

const retrieveHostedPage = async (id) => {
    let result = chargebee.hosted_page.retrieve(id).request();
    return result;
}


module.exports = {
    fetchCustomerByPhone,
    fetchEstimateForNewSubscription,
    createCheckoutForNewSubscription,
    fetchItemPrice,
    fetchItem,
    retrieveHostedPage
};