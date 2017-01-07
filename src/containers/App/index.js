import React from 'react'
import styles from './_App.css'
import { connect } from 'react-redux'
import {getInvoices, addInvoice} from 'redux/modules/api'
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
      newInvoiceTitle: params.newInvoiceTitle,
    }))
    console.log("helloInvoice Adder")
  }

  render() {
    console.log(this.props.invoices[0])
    return (
      <div>
        <div className={styles.page}>
          <InvoiceForm  
            invoices={this.props.invoices}
            addInvoiceHandler={this.addInvoiceHandler.bind(this)}
           />
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    invoices: state.api.invoices 
  };
};

export default connect(mapStateToProps)(App);

