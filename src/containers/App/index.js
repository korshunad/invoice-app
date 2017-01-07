import React from 'react'
import styles from './_App.css'
import { connect } from 'react-redux'
import {getInvoices, addInvoice, submitInvoice, addCompany} from 'redux/modules/api'
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
    this.props.dispatch(addInvoice({
      newInvoiceTitle: params.newInvoiceTitle
    }))
    console.log("helloInvoice Adder"+JSON.stringify(params))
    console.log(JSON.stringify(this.props.formData)+" formdata from helloinvoice")
    console.log(this.props.dispatch(submitInvoice()))
    this.props.dispatch(submitInvoice())
  }
  addCompanyHandler(params) {
    this.props.dispatch(addCompany({
      newCompanyName: params.newCompanyName
    }))
    console.log(JSON.stringify(params)+" this is adding company info")
  }

  render() {
    console.log(this.props.invoices[0])
    return (
      <div>
        <div className={styles.page}>
          <InvoiceForm  
            invoices={this.props.invoices}
            addInvoiceHandler={this.addInvoiceHandler.bind(this)}
            addCompanyHandler={this.addCompanyHandler.bind(this)}
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

