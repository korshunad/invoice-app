import fetch from 'isomorphic-fetch'

const ADD_INVOICE = 'ADD_INVOICE'
const ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS'

const initialState = {
}

export default function api (state = initialState, action = {}) {
  switch(action.type) {
    

    case ADD_GOOD_SUCCESS:
      let newGoods = state.goods.slice(0);
      newGoods.push(action.good);
      return {
        ...state,
        goods: newGoods
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
        good: {name: params.newGoodName, purchasingPrice: params.newPurchased, retailPrice: params.newRetail, categoryId: params.newCatId}
      })
    })
    .then((response) => {
      if (response.status >=400) {
        throw new Error("Bad response from server");
      };
      return response.json();
    })
    .then((goodResponse) => {
      dispatch({type: ADD_GOOD_SUCCESS, good: goodResponse.good}) 
    });
    
  }
}







