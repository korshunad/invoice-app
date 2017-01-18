import React from 'react'
import styles from './_App.css'
import { connect } from 'react-redux'
import {getInvoices, getInvoiceToEdit, changeInvoice, addInvoice, submitInvoice, addCompany, addCustomer} from 'redux/modules/api'
import InvoiceForm from 'components/InvoiceForm'
import { Button, notification, Icon } from 'antd';
import { Router, Route, Link } from 'react-router'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={isModalOpen: false }

  };
  componentDidMount() {
    var id = this.props.params.id;
    this.props.dispatch(getInvoices());
    if (id) {
      this.props.dispatch(getInvoiceToEdit({ editInvoiceId: id}))
    }
  }
  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }
  addInvoiceHandler(params) {
   // console.log("HI FROM ADDINVOICEHANDLER!")
    this.props.dispatch(addInvoice({
      newInvoiceTitle: params.newInvoiceTitle,
      newInvoiceSummary: params.newInvoiceSummary,
      newInvoiceNumber: params.newInvoiceNumber,
      newInvoiceDate: params.newInvoiceDate,

      newPaymentDue: params.newPaymentDue,

      newItemsName: params.newItemsName,
      newItemsDescriptionName: params.newItemsDescriptionName,
      newUnitPriceName: params.newUnitPriceName,
      newQuantityName: params.newQuantityName,
      newTotalName: params.newTotalName,

      newCurrencySymbol: params.newCurrencySymbol,
      newCurrencyCode: params.newCurrencyCode,

      newInvoiceTotal: params.newInvoiceTotal,
      newTaxType: params.newTaxType,
      newTaxName: params.newTaxName,
      newTax: params.newTax,
      newDiscountName: params.newDiscountName,
      newDiscount: params.newDiscount,
      newAdditionalChargeName: params.newAdditionalChargeName,
      newAdditionalCharge: params.newAdditionalCharge,

      newItems: params.newItems,  

      newNotes: params.newNotes,
      newFooter: params.newFooter,
      newCompanyName: params.newCompanyName,
      newCustomerName: params.newCustomerName,
    }))
 //   console.log("helloInvoice Adder"+JSON.stringify(params))
 //   console.log(JSON.stringify(this.props.formData)+" formdata from helloinvoice")
    this.props.dispatch(submitInvoice())
     // console.log(this.props.justMadeId+"from addinvhandler and after submit dispatched") 
  }
  addCompanyHandler(params) {
    this.props.dispatch(addCompany({
      newCompanyAddressL1: params.newCompanyAddressL1,
      newCompanyAddressL2: params.newCompanyAddressL2,
      newCompanyCity: params.newCompanyCity,
      newCompanyZip: params.newCompanyZip,
      newCompanyCountry: params.newCompanyCountry,
      newCompanyProvince: params.newCompanyProvince,
      newCompanyPhone: params.newCompanyPhone,
      newCompanyWebsite: params.newCompanyWebsite,
      newCompanyFax: params.newCompanyFax,
      newCompanyEmail: params.newCompanyEmail,
      newCompanyAccount: params.newCompanyAccount,
      newCompanyBankAccountHolder: params.newCompanyBankAccountHolder,
      newCompanyBankName: params.newCompanyBankName,
      newCompanyBankAddress: params.newCompanyBankAddress,
      newCompanySWIFT: params.newCompanySWIFT,  
      newCompanyBIC:  params.newCompanyBIC,  
      newCompanyIBAN:  params.newCompanyIBAN,  
      newCompanyPayPalinfo:  params.newCompanyPayPalinfo,  
      newCompanyOtherBilling:  params.newCompanyOtherBilling,  
    }))
   // console.log(JSON.stringify(params)+" this is adding company info")
  }

  addCustomerHandler(params) {
    this.props.dispatch(addCustomer({

      newCustomerAddressL1: params.newCustomerAddressL1,
      newCustomerAddressL2: params.newCustomerAddressL2,
      newCustomerCity: params.newCustomerCity,
      newCustomerZip: params.newCustomerZip,
      newCustomerCountry: params.newCustomerCountry,
      newCustomerProvince: params.newCustomerProvince,
      newCustomerPhone: params.newCustomerPhone,
      newCustomerEmail: params.newCustomerEmail,
      newCustomerContactFirstName: params.newCustomerContactFirstName,
      newCustomerContactLastName: params.newCustomerContactLastName,
      newCustomerWebsite: params.newCustomerWebsite,
      newCustomerFax: params.newCustomerFax,
      newCustomerAccountNumber: params.newCustomerAccountNumber,
      

    }))
  //  console.log(JSON.stringify(params)+" this is adding customer info")
  }
  updInvoiceHandler(params) {
    console.log("HI FROM UPDINVOICEHANDLER!")
    this.props.dispatch(changeInvoice({
      updInvoiceId: this.props.params.id, 
      updInvoiceTitle: params.updInvoiceTitle,
      updInvoiceSummary: params.updInvoiceSummary,
      updInvoiceNumber: params.updInvoiceNumber,
      updInvoiceDate: params.updInvoiceDate,

      updPaymentDue: params.updPaymentDue,

      updItemsName: params.updItemsName,
      updItemsDescriptionName: params.updItemsDescriptionName,
      updUnitPriceName: params.updUnitPriceName,
      updQuantityName: params.updQuantityName,
      updTotalName: params.updTotalName,

      updCurrencySymbol: params.updCurrencySymbol,
      updCurrencyCode: params.updCurrencyCode,

      updInvoiceTotal: params.updInvoiceTotal,
      updTaxType: params.updTaxType,
      updTaxName: params.updTaxName,
      updTax: params.updTax,
      updDiscountName: params.updDiscountName,
      updDiscount: params.updDiscount,
      updAdditionalChargeName: params.updAdditionalChargeName,
      updAdditionalCharge: params.updAdditionalCharge,

      updItems: params.updItems,  

      updNotes: params.updNotes,
      updFooter: params.updFooter,
      updCompanyName: params.updCompanyName,
      updCustomerName: params.updCustomerName,
    }))
    console.log("helloInvoice UPDer"+JSON.stringify(params))
    console.log(JSON.stringify(this.props.formData)+"upd formdata from helloinvoice")
  }
  render() {
    return (

      <div>
      <div>
      {this.props.params.id ? 'Edit the Invoice id '+this.props.params.id : ''}
          <div style={{textAlign:"center", margin:"10px"}}><Link to="/allinvoices">All invoices</Link></div>
        {this.props.children}
      </div>
        <div className={styles.page} style={{marginTop:"5px"}}>
          <InvoiceForm  
            justMadeId={this.props.justMadeId}
            id={this.props.params.id}
            invoices={this.props.invoices}
            invoiceToEdit={this.props.invoiceToEdit}
            addInvoiceHandler={this.addInvoiceHandler.bind(this)}
            addCompanyHandler={this.addCompanyHandler.bind(this)}
            addCustomerHandler={this.addCustomerHandler.bind(this)}
            updInvoiceHandler={this.updInvoiceHandler.bind(this)}
           />
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    invoices: state.api.invoices,
    formData: state.api.formData, 
    justMadeId: state.api.justMadeId,
    invoiceToEdit: state.api.invoiceToEdit
    
  };
};

export default connect(mapStateToProps)(App);

