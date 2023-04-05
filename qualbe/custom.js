const fetchCustomerByPhone = async (phone) => {
    const response = await fetch(`/customers/${phone}`);
    let data = await response.json();
    return data;
}

const fetchItemPrice =  async (item_price_id)=>{
    const response = await fetch(`/itemPrice/${item_price_id}`);
    let data = await response.json();
    return data;
}

const fetchItem =  async (item_id)=>{
    const response = await fetch(`/item/${item_id}`);
    let data = await response.json();
    return data;
}

const fetchEstimateForNewSubscription = async (item_price_id, quantity ,email, line1, city, zip, country) => {

    const response = await fetch(`/fetchEstimate/`, {
        method: "POST",
        body: JSON.stringify({
            item_price_id,
            quantity,
            email,
            line1,
            city,
            zip,
            country
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }
    );
    let data = await response.json();

    let total = data.estimate.invoice_estimate.total;
    return total;
}


const createCheckoutForNewSubscription = async (item_price_id, quantity, first_name, last_name ,email, phone, line1, line2, city, zip, state, country, bline1, bline2, bcity, bzip, bstate, dependent_members, isr) => {
    const response = await fetch(`/hostedPage/createNewCheckout`, {
        method: "POST",
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone,
            line1,
            line2,
            city,
            zip,
            state,
            country,
            quantity,
            item_price_id,
            bline1,
            bline2,
            bcity,
            bzip,
            bstate,
            dependent_members,
            isr
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }
    );
    let data = await response.json();
    
    return data.hosted_page;
}

const createCheckoutPopup = (site, item_price_id, quantity, first_name, last_name ,email, phone, line1, line2, city, zip, state, country, bline1, bline2, bcity, bzip, bstate, dependent_members, isr) => {

    var cbInstance = window.Chargebee.init({
        site,
        iframeOnly: true
      });

    cbInstance.openCheckout({
        hostedPage: () => {
          // Hit your end point that returns hosted page object as response
          // This sample end point will call the below api
          // https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_new_subscription
          // If you want to use paypal, go cardless and plaid, pass embed parameter as false
          return createCheckoutForNewSubscription(item_price_id, quantity, first_name, last_name ,email, phone, line1, line2, city, zip, state, country, bline1, bline2, bcity, bzip, bstate, dependent_members, isr);
        },
        loaded: function() {
          console.log("checkout opened");
        },
        close: () => {
            console.log("checkout closed");
        },
        success: function(hostedPageId) {
        
            window.location.replace("ThankYou?hostedPageId=" + hostedPageId);
            console.log(e);
          // Hosted page id will be unique token for the checkout that happened
          // You can pass this hosted page id to your backend 
          // and then call our retrieve hosted page api to get subscription details
          // https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page
        },
        step: function(value) {
            // value -> which step in checkout
            console.log(value);
          
        },
        error: function(error) {
            console.log(error)
          this.errorMsg = error;
        }
    });
}

const fetchAllState =  async ()=>{
    const response = await fetch(`/fetchAllStates`);
    let data = await response.json();
    return data;
}
    
