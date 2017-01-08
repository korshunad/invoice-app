import React from 'react'
import styles from './_App.css'
import { connect } from 'react-redux'
import {getInvoices, addInvoice, submitInvoice, addCompany, addCustomer} from 'redux/modules/api'
import InvoiceForm from 'components/InvoiceForm'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={isModalOpen: false }
  };
  componentDidMount() {
    this.props.dispatch(getInvoices());
  }
  addInvoiceHandler(params) {
    console.log("HI FROM ADDINVOICEHANDLER!")
    this.props.dispatch(addInvoice({
      newInvoiceTitle: params.newInvoiceTitle,
      newInvoiceSummary: params.newInvoiceSummary,
      newInvoiceNumber: params.newInvoiceNumber,
      newInvoiceDate: params.newInvoiceDate,

      newPaymentdue: params.newPaymentDue,

      newItemsName: params.newItemsName,
      newItemsDescriptionName: params.newItemsDescriptionName,
      newUnitPriceName: params.newUnitPriceName,
      newQuantityName: params.newQuantityName,
      newTotalName: params.newTotalName,

      newCurrency: params.newCurrency,

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
    }))
    console.log("helloInvoice Adder"+JSON.stringify(params))
    console.log(JSON.stringify(this.props.formData)+" formdata from helloinvoice")
    this.props.dispatch(submitInvoice())
  }
  addCompanyHandler(params) {
    this.props.dispatch(addCompany({
      newCompanyName: params.newCompanyName,
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
    console.log(JSON.stringify(params)+" this is adding company info")
  }

  addCustomerHandler(params) {
    this.props.dispatch(addCustomer({

      newCustomerName: params.newCustomerName,
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
    console.log(JSON.stringify(params)+" this is adding customer info")
  }
  render() {
//    console.log(this.props.invoices[0])
    return (
      <div>
        <div className={styles.page}>
          <InvoiceForm  
            invoices={this.props.invoices}
            addInvoiceHandler={this.addInvoiceHandler.bind(this)}
            addCompanyHandler={this.addCompanyHandler.bind(this)}
            addCustomerHandler={this.addCustomerHandler.bind(this)}
           />
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    invoices: state.api.invoices,
    formData: state.api.formData 
  };
};

export default connect(mapStateToProps)(App);

