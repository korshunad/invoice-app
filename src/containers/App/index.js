import React from 'react'
import styles from './_App.css'
import { connect } from 'react-redux'
import {getInvoices, addInvoice} from 'redux/modules/api'
import { Icon, Row, Col, Form, Select, Input, Button, InputNumber, DatePicker, LocaleProvider } from 'antd';
import moment from 'moment';
import enUS from 'antd/lib/locale-provider/en_US'
import 'moment/locale/ru';
import BillFrom from 'components/BillFrom'

moment.locale('en')

const FormItem = Form.Item;
let total = 0;
const Option = Select.Option;
let uuid = 0;
class CustomizedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      quantity:0,
      items:{0:{price:0, quantity:0}},
    };
    this.remove=this.remove.bind(this);
    this.add=this.add.bind(this);
    this.handleQuant=this.handleQuant.bind(this);
    this.handlePrice=this.handlePrice.bind(this);
  }
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  }
  handleQuant(k,e) {
    const quant=e.target.value;
    const items=this.state.items;
    items[k]["quantity"]=quant;
    this.setState({items: items})
    
    console.log(JSON.stringify(this.state.items)+"this are state items from quant")
  }
  handlePrice(k,e) {
    const price=e.target.value;
    const items=this.state.items;
    items[k]["price"]=price;
    this.setState({items: items})
    console.log(JSON.stringify(this.state.items)+"this are state items from price")
  }
  remove(k) {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one item
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
    const newItems=this.state.items 
    delete newItems[k]
    // const newItems=items.filter((item, index, arr) => {index!==k})
    this.setState({items: newItems})
  }

  add(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
   /* const newItems=nextKeys.map((k,index)=> {
      return (items[k]={price:0, quantity:0})
    })*/
    const newItems=this.state.items
    newItems[uuid]={price:0, quantity:0}
    console.log(JSON.stringify(newItems)+"newitems")
    this.setState({items: newItems})
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const dateFormat = 'DD/MM/YYYY';
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const keys = getFieldValue('keys');
    console.log(keys+"keys")
    const formItems = keys.map((k, index) => {

    total=this.state.items[k]["quantity"]*this.state.items[k]["price"]
    console.log(total+"total")

      return (
            <Row key={k+"row"} className={styles.denseHeight}> 
        <FormItem
          required={false}
          key={k}
           className={styles.denseHeight}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              whitespace: true,
              message: "Please input item information.",
            }],
          })(
            <div key={k+"wrapdiv"}>

            <Col key={k+"itemCol"} span={5}>
            <Input key={k+"item"} placeholder="item or service" style={{ width: '90%' }}  />
            </Col>
            <Col key={k+"descrCol"} span={9}>
            <Input key={k+"descr"} placeholder="description" style={{ width: '90%'}}  />
            </Col>
            <Col key={k+"quantCol"} span={3}>
            <Input key={k+"quant"}  onChange={this.handleQuant.bind(this, k)} placeholder={0} style={{ width: '90%' }} />
            </Col>
            <Col key={k+"priceCol"} span={3}>
            <Input key={k+"price"} placeholder={0} onChange={this.handlePrice.bind(this, k)} style={{ width: '90%' }} />
            </Col>
            <Col key={k+"totalCol"} span={3} >
            <Input style={{width:'90%'}} key={k+"total"} value={total} placeholder={0} />
            </Col>
            </div>
          )}

            <Col span={1}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
            </Col>

        </FormItem>
            </Row>
      );
    });


  return (
    <LocaleProvider locale={enUS}>
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <FormItem
          wrapperCol={{ span: 4, offset: 18 }}
        >
          {getFieldDecorator('invoiceName', {
            rules: [{ required: true, message: 'Please name your document' }], initialValue:"Invoice"
            })(
              <Input className={styles.borderless+ ' ' +styles.header} />
          )}
        </FormItem>

        <Row>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              wrapperCol={{ span: 8 }}
            >
              <div>Bill from</div>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Invoice summary"
            >
              {getFieldDecorator('invoiceSummary', {
              })(
                <Input placeholder="Invoice summary"/>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('invoiceSummary', {
              })(
                <div>
                  <BillFrom />
                </div>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Invoice Number"
            >
              {getFieldDecorator('input-number', { initialValue: 1 })(
                <InputNumber min={1} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('invoiceSummary', {
              })(
                <div>

                 Bill to: 
                </div>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Invoice Date"
            >
              {getFieldDecorator('invoice-date')(
                <DatePicker  />
              )}
            </FormItem>
          </Col>
        </Row>
        
        <Row>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator('invoiceSummary', {
              })(
                <div>
                  <BillFrom />
                </div>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Payment Due"
            >
              {getFieldDecorator('payment-due')(
                 <DatePicker  />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className={styles.denseHeight} style={{marginTop:"40px"}}>
          <Col span={5} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 24 }}>
              {getFieldDecorator('items', {
                rules: [{ required: true, message: 'Please classify your items/services ' }], initialValue:"Items"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={9} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 24 }}>
              {getFieldDecorator('itemsDescription', {
                rules: [{ required: true, message: 'Please specify description way of your items/services ' }], initialValue:"Description"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={3} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 24 }}>
              {getFieldDecorator('itemsQuantity', {
                rules: [{ required: true, message: 'Please specify quantity name of your items/services ' }], initialValue:"Quantity"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={3} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 24 }}>
              {getFieldDecorator('itemsPrice', {
                rules: [{ required: true, message: 'Please specify description way of pricing items/services ' }], initialValue:"Price"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={3} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 21, offset:3 }}>
              {getFieldDecorator('total', {
                rules: [{ required: true, message: 'Please specify description way of total charge for items/services ' }], initialValue:"Total"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
        </Row>
        <Row >
          <Col span={24}>
           {formItems} 
          </Col>
        </Row>
        <Row style={{marginTop:"20px"}}>
        <Col span={8} offset={8}>
        <FormItem >
          <Button type="dashed" onClick={this.add} >
            <Icon type="plus" /> Add another item
          </Button>
        </FormItem>
        </Col>
        </Row>
        
        <Row>
          <Col span={24}>
            <FormItem wrapperCol={{ span: 8, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Col>
        </Row>

      </Form>

   </LocaleProvider>
    );
  }
}
CustomizedForm = Form.create({})(CustomizedForm);


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={isModalOpen: false }
  };
  componentDidMount() {
    this.props.dispatch(getInvoices());
  }

render() {
    console.log(this.props.invoices[0])
    return (
    <div>
      <div className={styles.page}>
        <CustomizedForm />
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

