import fetch from 'isomorphic-fetch';
import assign from 'object-assign';

const ADD_INVOICE = 'ADD_INVOICE'
const ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS'

const SUBMIT_INVOICE = 'SUBMIT_INVOICE'
const SUBMIT_INVOICE_SUCCESS = 'SUBMIT_INVOICE_SUCCESS'

const ADD_COMPANY = 'ADD_COMPANY'
const ADD_COMPANY_SUCCESS = 'ADD_COMPANY_SUCCESS'

const ADD_CUSTOMER= 'ADD_CUSTOMER'
const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS'

const GET_INVOICES = 'GET_INVOICES'
const GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS'

const initialState = {
  invoices: [],
  formData: {},
  justMadeId: null,
}


export default function api (state = initialState, action = {}) {
  switch(action.type) {
    

    case GET_INVOICES:
      return state;

    case GET_INVOICES_SUCCESS: 
      let lastId=action.invoices[action.invoices.length-1]['_id']
      return {
        ...state,
        invoices: action.invoices,
        justMadeId: lastId
      };
    case SUBMIT_INVOICE_SUCCESS:
      let newInvoices = state.invoices.slice(0);
      newInvoices.push(action.invoice);
      let newId=action.justMadeId;
      console.log("SUBMIT_INVOICE "+newId);
      
      return {
        ...state,
        invoices: newInvoices,
        justMadeId: newId
      };
    case ADD_INVOICE:
    let overallInfo=Object.assign({}, state.formData, action.formData)

      return Object.assign({}, state,
       {formData: overallInfo}
      )
    case ADD_COMPANY:
    let companyData=Object.assign({}, state.formData, 
      action.formData)
    console.log("ADD_COMPANY "+JSON.stringify(companyData))
      return Object.assign({}, state, {formData:companyData}) 

    case ADD_CUSTOMER:
    let customerData=Object.assign({}, state.formData, 
      action.formData)
    console.log("ADD_CUSTOMER "+JSON.stringify(customerData))
      return Object.assign({}, state, {formData:customerData}) 

    default:
      return state;
  }
}

export function submitInvoice() {
  return (dispatch, getState) => {
    dispatch({type:SUBMIT_INVOICE});
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log(JSON.stringify(getState().api.formData)+"getState")
    fetch('/invoices', {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        invoice:  getState().api.formData 
       
      })
    })
    .then((response) => {
      if (response.status >=400) {
        console.log(JSON.stringify(response)+"response")
        throw new Error("Bad response from server");

      };
      return response.json();
    })
    .then((invoiceResponse) => {
      dispatch({type: SUBMIT_INVOICE_SUCCESS, justMadeId: invoiceResponse.invoice}) 
    });
    
  }
}
export function addInvoice(params) {
  return (dispatch, getState) => {
    dispatch({
      type:ADD_INVOICE, 
      formData: {
                
          invoiceTitle: params.newInvoiceTitle,
          invoiceSummary: params.newInvoiceSummary,
          invoiceNumber: params.newInvoiceNumber,
          invoiceDate: params.newInvoiceDate,

          paymentDue: params.newPaymentDue,

          itemsName: params.newItemsName,
          itemsDescriptionName: params.newItemsDescriptionName,
          unitPriceName: params.newUnitPriceName,
          quantityName: params.newQuantityName,
          totalName: params.newTotalName,

          currencySymbol: params.newCurrencySymbol,
          currencyCode: params.newCurrencyCode,

          invoiceTotal: params.newInvoiceTotal,
          taxName: params.newTaxName,
          tax: params.newTax,
          taxType: params.newTaxType,
          discountName: params.newDiscountName,
          discount: params.newDiscount,
          additionalChargeName: params.newAdditionalChargeName,
          additionalCharge: params.newAdditionalCharge,

          items: params.newItems,  

          notes: params.newNotes,
          footer: params.newFooter,
          companyName: params.newCompanyName,
          customerName: params.newCustomerName,
      } 
    });
  }
}
export function addCompany(params) {
  return (dispatch, getState) => {
    dispatch({
      type:ADD_COMPANY, 
      formData: {
                
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
      }
    })
  }
}
export function addCustomer(params) {
  return (dispatch, getState) => {
    dispatch({
      type:ADD_CUSTOMER,

      formData: {

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
  }
}
export function getInvoices() {
  return (dispatch, getState) => {
    dispatch({type: GET_INVOICES});
    fetch('/invoices', {method: 'get' })
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






       let someinvoice: {
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
