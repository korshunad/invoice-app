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






