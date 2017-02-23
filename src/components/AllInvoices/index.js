import React from 'react'
import styles from './_AllInvoices.css'
import { connect } from 'react-redux'
import { Table, Icon, Button , Tooltip } from 'antd';
import { Popconfirm, message, Popcancel } from 'antd';
import {deleteInvoice, changeInvoice, getInvoices} from 'redux/modules/api'
import { Router, Route, Link} from 'react-router'

class AllInvoices extends React.Component {

  constructor(props) {
    super(props);
    this.state={};
  }

  componentDidMount() {
    this.props.dispatch(getInvoices());
  }

  deleteInvoiceHandler(id) {
    this.props.dispatch(deleteInvoice({
      delInvoiceId: id 
    }))
    console.log(id)
  }

  updateInvoiceHandler(id) {
    this.props.dispatch(changeInvoice({
      delInvoiceId: id 
    }))
  }
  
    agree(id) {
       this.props.dispatch(deleteInvoice({
       delInvoiceId: id  
       }))
       message.success('Invoice deleted');
    }


    cancel() {
      message.error('Invoice remains in database');
    }

  render() {

    const columns = [{

      title: 'Id',
      dataIndex: '_id',
      key: 'id',
      render: (text) => (
        <Tooltip title="Click to look at pdf"> 
          <a target="_blank" href={"/pdfs/"+text}>
            {text}
          </a> 
        </Tooltip>
      ),
      }, {

      title: 'Company',
      dataIndex: 'companyName',
      key: 'company',
      render:  (text, invoices) => (
        <div>
          <div>{text}</div>
        </div>
      )
      }, {

      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customer',
      }, {

      title: 'Invoice Summary',
      dataIndex: 'invoiceSummary',
      key: 'invoiceSummary',
      }, {

      title: 'Total',
      dataIndex: 'invoiceTotal',
      key: 'invoiceTotal',
      }, {

      title: 'Action',
      key: 'action',
      render: (text, invoices) => (
        <span>
          <div>
            <div style={{display:"inline"}}>
              <div style={{width:"auto", display: "inline"}}>
                <Link to={'/'+invoices._id}>
                  <Button size="small">Edit</Button>
                </Link>
              </div>
              {this.props.params.id}
            </div>
            <Popconfirm title={"Do you want to delete invoice#"+invoices._id+"?"} 
              onConfirm={this.agree.bind(this, invoices._id)} 
              onCancel={this.cancel.bind(this, invoices._id)} 
              okText="Yes" cancelText="No">
              <Button size = "small" style={{display:"inline", marginLeft:"5px"}}>Delete</Button>
            </Popconfirm>
          </div>
        </span>
      ),
      }];

    return (
      <div>
        <div style={{margin: "15px auto", width: "90%", height: "90%"}}>
          <h3> Here are all invoices you saved so far </h3>
          <Link to='/'>Go create another one</Link>
          <Table  locale={{emptyText:"No invoices yet"}} deleteInvoiceHandler={this.deleteInvoiceHandler.bind(this)}columns={columns} dataSource={this.props.invoices}  />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    invoices: state.api.invoices,
  };
};

export default connect(mapStateToProps)(AllInvoices);

