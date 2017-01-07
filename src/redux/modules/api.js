import fetch from 'isomorphic-fetch'

const ADD_INVOICE = 'ADD_INVOICE'
const ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS'

const GET_INVOICES = 'GET_INVOICES'
const GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS'

const initialState = {
  invoices: []
}


export default function api (state = initialState, action = {}) {
  switch(action.type) {
    

    case GET_INVOICES:
      return state;

    case GET_INVOICES_SUCCESS: 
      return {
        ...state,
        invoices: action.invoices
      };
    case ADD_INVOICE_SUCCESS:
      let newInvoices = state.invoices.slice(0);
      newInvoices.push(action.invoice);
      return {
        ...state,
        invoices: newInvoices
      };

    default:
      return state;
  }
}

export function addInvoice(params) {
  return (dispatch, getState) => {
    dispatch({type:ADD_INVOICE});
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('/api/goods', {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        invoice: {
          invoiceTitle: params.newInvoiceTitle,
          invoiceSummary: params.newInvoiceSummary,
          invoiceNumber: params.newInvoiceNumber,
          invoiceDate: params.newInvoiceDate,

          paymentdue: params.newPaymentDue,

          itemsName: params.newItemsName,
          unitPriceName: params.newUnitPriceName,
          quantityName: params.newQuantityName,
          totalName: params.newTotalName,

          currency: params.newCurrency,

          invoiceTotal: params.newInvoiceTotal,
          taxName: params.newTaxName,
          tax: params.newTax,
          discountName: params.newDiscountName,
          discount: params.newDiscount,
          additionalChargeName: params.newAdditionalChargeName,
          additionalCharge: params.newAdditionalCharge,

          items: params.newItems,  

          notes: params.newItems,
          footer: params.newFooter,

          companyName: params.newCompanyName,
          companyAddressL1: params.newCompanyAddressL1,
          companyAddressL2: params.newCompanyAddressL2,
          companyCity: params.newCompanyCity,
          companyZip: params.newCompanyZip,
          companyCountry: params.newCompanyCountry,
          companyProvince: params.newCompanyProvince,
          companyPhone: params.newCompanyPhone,
          companyWebsite: params.newCompanyWebsite,
          companyFax: params.newCompanyFax,
          companyEmail: params.newCompanyEmail,
          companyAccount: params.newCompanyAccount,
          companyBankAccountHolder: params.newCompanyBankAccountHolder,
          companyBankName: params.newCompanyBankName,
          companyBankAddress: params.newCompanyBankAddress,
          companySWIFT: params.newCompanySWIFT,  
          companyBIC:  params.newCompanyBIC,  
          companyIBAN:  params.newCompanyIBAN,  
          companyPayPalinfo:  params.newCompanyPayPalinfo,  
          companyOtherBilling:  params.newCompanyOtherBilling,  

          customerName: params.newCustomerName,
          customerAddressL1: params.newCustomerAddressL1,
          customerAddressL2: params.newCustomerAddressL2,
          customerCity: params.newCustomerCity,
          customerZip: params.newCustomerZip,
          customerCountry: params.newCustomerCountry,
          customerProvince: params.newCustomerProvince,
          customerPhone: params.newCustomerPhone,
          customerEmail: params.newCustomerEmail,
          customerContactFirstName: params.newCustomerContactFirstName,
          customerContactLastName: params.newCustomerContactLastName,
          customerWebsite: params.newCustomerWebsite,
          customerFax: params.newCustomerFax,
          customerAccountNumber: params.newCustomerAccountNumber,
        }
      })
    })
    .then((response) => {
      if (response.status >=400) {
        throw new Error("Bad response from server");
      };
      return response.json();
    })
    .then((invoiceResponse) => {
      dispatch({type: ADD_INVOICE_SUCCESS, invoice: invoiceResponse.invoice}) 
    });
    
  }
}


export function getInvoices() {
  return (dispatch, getState) => {
    dispatch({type: GET_INVOICES});
    fetch('/invoices/invoices', {method: 'get' })
      .then((response) =>  {
        if (response.status >= 400) {
        throw new Error("Bad response from server");
        };
        return response.json();
      })
      .then((invoicesResponse) => {
        dispatch({type: GET_INVOICES_SUCCESS, invoices: invoicesResponse.invoices })
      });
  }
}






