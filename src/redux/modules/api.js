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

const GET_INVOICE_TO_EDIT = 'GET_INVOICE_TO_EDIT'
const GET_INVOICE_TO_EDIT_SUCCESS = 'GET_INVOICE_TO_EDIT_SUCCESS'

const CHANGE_INVOICE = 'CHANGE_INVOICE'
const CHANGE_INVOICE_SUCCESS = 'CHANGE_INVOICE_SUCCESS'

const DELETE_INVOICE = 'DELETE_INVOICE'
const DELETE_INVOICE_SUCCESS = 'DELETE_INVOICE_SUCCESS'

const SERVER_ERROR = 'SERVER_ERROR'
const CLEAN_ERRORS = 'CLEAN_ERRORS'

const CLEAN_EDITED_INVOICE = 'CLEAN_EDITED_INVOICE'

const initialState = {
  invoices: [],
  formData: {},
  justMadeId: null,
  invoiceToEdit: {}, 
  errorMessage: null
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
    case GET_INVOICE_TO_EDIT:
      return state;

    case GET_INVOICE_TO_EDIT_SUCCESS:
      let toeditInvoice=action.invoiceToEdit
      return {
        ...state,
        invoiceToEdit: toeditInvoice
      };

    case CLEAN_EDITED_INVOICE:
      return  {
      ...state,
      invoiceToEdit: {}
      }  
    
    case SUBMIT_INVOICE_SUCCESS:
      let newInvoices = state.invoices.slice(0);
      newInvoices.push(action.invoice);
      let newId=action.justId;
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
      return Object.assign({}, state, {formData:companyData}) 

    case ADD_CUSTOMER:
      let customerData=Object.assign({}, state.formData, 
        action.formData)
      return Object.assign({}, state, {formData:customerData}) 

    case CHANGE_INVOICE_SUCCESS:
      let changedInvoices = state.invoices.slice(0)
      let updInvoices = changedInvoices.filter((invoice) => {
        if (invoice._id === action.invoice._id) {
          return false
        } else { return true }
      });
      updInvoices.push(action.invoice);
      return {
        ...state,
        invoices: updInvoices,
        invoiceToEdit: action.invoice
      };

    case DELETE_INVOICE_SUCCESS:
      let leftInvoices = state.invoices.slice(0)
      let left = leftInvoices.filter((invoice) => {
        if (invoice._id === action.invoiceId) {
          return false
        } else { return true }
      });
      return {
        ...state,
        invoices: left
      };
    case SERVER_ERROR:
      return {
        ...state,
        errorMessage: action.message
      }
    case CLEAN_ERRORS:
      return {
        ...state,
        errorMessage: null
      }


    default:
      return state;
  }
}

export function cleanandclearerrors() {
  return (dispatch, getState) => {
    dispatch({type:CLEAN_ERRORS})
  } 
}

export function cleanEditedInvoice() {
  return(dispatch, getState) => {
    dispatch({type:CLEAN_EDITED_INVOICE})
  }
}

export function submitInvoice() {
  return (dispatch, getState) => {
    dispatch({type:SUBMIT_INVOICE});
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
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
        dispatch({type: SERVER_ERROR, message: "Could not save invoice. Please try again"})
      };
      return response.json();
    })
    .then((invoiceResponse) => {
      dispatch({type: SUBMIT_INVOICE_SUCCESS, invoice: invoiceResponse.invoice, justId: invoiceResponse.invoice._id}) 
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
        return response.json();
      })
      .then((invoicesResponse) => {
        dispatch({type: GET_INVOICES_SUCCESS, invoices: invoicesResponse.invoices })
      })
      .catch(function(e) {
        dispatch({
          type: SERVER_ERROR, 
          message: "Could not get invoices. Please go to invoice creation page and try to load all invoices again. Sorry for inconvenience."
        })
      })
  }
}

export function getInvoiceToEdit(params) {
  return (dispatch, getState) => {
    dispatch({type: GET_INVOICE_TO_EDIT});
    fetch('/invoices/'+params.editInvoiceId, {method: 'get' })
      .then((response) =>  {
        if (response.status >= 400) {
        dispatch({type: SERVER_ERROR, message: "Could not load invoice to edit. Please try again."})
        };
        return response.json();
      })
      .then((invoicesResponse) => {
        dispatch({type: GET_INVOICE_TO_EDIT_SUCCESS, invoiceToEdit: invoicesResponse.invoice })
      });
  }
}

export function changeInvoice(params) {
  return (dispatch, getState) => {
    dispatch({type:CHANGE_INVOICE});
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('/invoices/'+params.updInvoiceId, {
      method: 'put',
      headers: myHeaders,
      mode: 'cors',
      cashe: 'default',
      body: JSON.stringify({
        invoice: {

          invoiceTitle: params.updInvoiceTitle,
          invoiceSummary: params.updInvoiceSummary,
          invoiceNumber: params.updInvoiceNumber,
          invoiceDate: params.updInvoiceDate,

          paymentdue: params.updPaymentDue,

          itemsName: params.updItemsName,
          unitPriceName: params.updUnitPriceName,
          quantityName: params.updQuantityName,
          totalName: params.updTotalName,
          currencySymbol: params.updCurrencySymbol,
          currencyCode: params.updCurrencyCode,

          invoiceTotal: params.updInvoiceTotal,
          taxName: params.updTaxName,
          tax: params.updTax,
          taxType: params.updTaxType,
          discountName: params.updDiscountName,
          discount: params.updDiscount,
          additionalChargeName: params.updAdditionalChargeName,
          additionalCharge: params.updAdditionalCharge,

          items: params.updItems,  

          notes: params.updNotes,
          footer: params.updFooter,

          companyName: params.updCompanyName,
          companyAddressL1: params.updCompanyAddressL1,
          companyAddressL2: params.updCompanyAddressL2,
          companyCity: params.updCompanyCity,
          companyZip: params.updCompanyZip,
          companyCountry: params.updCompanyCountry,
          companyProvince: params.updCompanyProvince,
          companyPhone: params.updCompanyPhone,
          companyWebsite: params.updCompanyWebsite,
          companyFax: params.updCompanyFax,
          companyEmail: params.updCompanyEmail,
          companyAccount: params.updCompanyAccount,
          companyBankAccountHolder: params.updCompanyBankAccountHolder,
          companyBankName: params.updCompanyBankName,
          companyBankAddress: params.updCompanyBankAddress,
          companySWIFT: params.updCompanySWIFT,  
          companyBIC:  params.updCompanyBIC,  
          companyIBAN:  params.updCompanyIBAN,  
          companyPayPalinfo:  params.updCompanyPayPalinfo,  
          companyOtherBilling:  params.updCompanyOtherBilling,  

          customerName: params.updCustomerName,
          customerAddressL1: params.updCustomerAddressL1,
          customerAddressL2: params.updCustomerAddressL2,
          customerCity: params.updCustomerCity,
          customerZip: params.updCustomerZip,
          customerCountry: params.updCustomerCountry,
          customerProvince: params.updCustomerProvince,
          customerPhone: params.updCustomerPhone,
          customerEmail: params.updCustomerEmail,
          customerContactFirstName: params.updCustomerContactFirstName,
          customerContactLastName: params.updCustomerContactLastName,
          customerWebsite: params.updCustomerWebsite,
          customerFax: params.updCustomerFax,
          customerAccountNumber: params.updCustomerAccountNumber }
      })
    })
    .then((response) => {
      if (response.status >=400) {
        dispatch({type: SERVER_ERROR, message: "Could not update invoice. Please try again."})
      };
      return response.json();
    })
    .then((updatedInvoiceResponse) => {
      dispatch({type:CHANGE_INVOICE_SUCCESS, invoice: updatedInvoiceResponse.invoice})
    });
  }
}

export function deleteInvoice(params) {
  return (dispatch, getState) => {
    dispatch({type:DELETE_INVOICE});
    fetch('/invoices/'+params.delInvoiceId, {
      method: 'delete'
    }).then((response) => {
      if (response.status >=400) {
        dispatch({type: SERVER_ERROR, message: "Could not delete invoice. Please try again."})
      };
      return true;
    })
    .then(() => {
      dispatch({type:DELETE_INVOICE_SUCCESS, invoiceId: params.delInvoiceId})
    });
  }
}
