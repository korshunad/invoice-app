import React from 'react'
import styles from './_App.css'
import { connect } from 'react-redux'
import {getInvoices, addInvoice} from 'redux/modules/api'
import { Icon, Row, Col, Form, Select, Input, Button, InputNumber, DatePicker, LocaleProvider } from 'antd';
import moment from 'moment';
import enUS from 'antd/lib/locale-provider/en_US'
import 'moment/locale/ru';
import BillFrom from 'components/BillFrom'
import {currencies} from './currencies'

console.log(JSON.stringify(currencies["USD"]))
moment.locale('en')
const FormItem = Form.Item;
let total = 0;
const Option = Select.Option;

//let preCur;
//let postCur;
let uuid = 0;

class CustomizedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      quantity:0,
      items:{0:{price:0, quantity:0}},
      preCur:null,
      postCur:null,
    };
    this.remove=this.remove.bind(this);
    this.add=this.add.bind(this);
    this.handleQuant=this.handleQuant.bind(this);
    this.handlePrice=this.handlePrice.bind(this);
    this.handleCurrencyChoice=this.handleCurrencyChoice.bind(this);
    this.handleItemTotal=this.handleItemTotal.bind(this);
  }
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  }
  handleCurrencyChoice(value) {
    console.log("chosen currency: "+value)
    if (value==currencies[value]["symbol"]) {
      this.setState({preCur:null, postCur:value});
  //   preCur=null;
  //   postCur=value; 
    } else {
      this.setState({postCur:null, preCur:currencies[value]["symbol"]})
  //   postCur=null;
  //   preCur=currencies[value]["symbol"]
    }
  }
  handleQuant(k,e) {
    const quant=e.target.value;
    const items=this.state.items;
    items[k]["quantity"]=quant;
    this.setState({items: items})
    
    //console.log(JSON.stringify(this.state.items)+"this are state items from quant")
  }
  handlePrice(k,e) {
    const price=e.target.value;
    const items=this.state.items;
    items[k]["price"]=price;
    this.setState({items: items})
   // console.log(JSON.stringify(this.state.items)+"this are state items from price")
  }
  handleItemTotal(k,e) {
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
    this.setState({items: newItems})
  }

  add(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
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
    //console.log(keys+"keys")
    
function objectEntries(obj) {
    let index = 0;

    const propKeys = Reflect.ownKeys(obj);

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < propKeys.length) {
                const key = propKeys[index];
                index++;
                return { value: [key, obj[key]] };
            } else {
                return { done: true };
            }
        }
    };
}
let some=[];

for (const [key,value] of objectEntries(currencies)) {
   // console.log(key+value["symbol"]);
    some.push(<Option  key={key} value={key}>{value["name"]}</Option>)

}
//console.log("some:"+some)
    const currencyOptions=(
      <div key={"curOpts"}>
        <Select  
          onChange={this.handleCurrencyChoice}
          showSearch 
          placeholder="Select currency"
          optionFilterProp="children"
          style={{ width: 200 }} >

          {some}
        </Select>
      </div>

   )
    

    const formItems = keys.map((k, index) => {
    let totStyle={width:"24px"};
    let curStyle={width:"24px"};
    total=this.state.items[k]["quantity"]*this.state.items[k]["price"]
    //console.log(total+"total")
    
    let totwidth;
    let curwidth;
    let price=this.state.items[k]["price"]
    
    if ((""+total).length<8) {
      totwidth=((""+total).length+1)*7+10;
    } else if ((""+total).length>=8) {
      totwidth=73
    }
    
    if ((""+price).length<8) {
      curwidth=((""+price).length+1)*7+10;
    } else if ((""+price).length>=8) {
      curwidth=73
    }

    console.log("total.length"+totwidth)
    let dyncurStyle={};
    dyncurStyle["width"]=curwidth+"px";
    curStyle=dyncurStyle;
    let dyntotStyle={};
    dyntotStyle["width"]=totwidth+"px";
    totStyle=dyntotStyle
    console.log(JSON.stringify(totStyle))
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
                <Input key={k+"item"} placeholder="item or service" className={styles.borderless} style={{ width: '95%' }}  />
              </Col>
              <Col key={k+"descrCol"} span={7}>
                <Input key={k+"descr"} placeholder="description" className={styles.borderless} style={{ width: '98%' }}  />
              </Col>
              <Col key={k+"quantCol"} span={3}>
                <Input key={k+"quant"}  
                  onChange={this.handleQuant.bind(this, k)} 
                  className={styles.borderless} placeholder={0} 
                  style={{ width: '90%', textAlign:"center"}} />
              </Col>
              <Col key={k+"priceCol"} span={4} >
                <div className={styles.horizontalCentering}>
                  {this.state.preCur}
                  <Input key={k+"price"} placeholder={0} 
                    onChange={this.handlePrice.bind(this, k)} 
                    className={styles.borderless} style={curStyle} />
                  {this.state.postCur}
                </div>
              </Col>
              <Col key={k+"totalCol"} span={4}>
                <div className={styles.horizontalCentering}>
                  {this.state.preCur}
                  <Input style={curStyle} key={k+"total"} value={total} 
                    onChange={this.handleItemTotal.bind(this, k)} 
                    className={styles.borderless} style={totStyle} 
                    placeholder={0} />
                  {this.state.postCur}
                </div>
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
              {getFieldDecorator('companyContacts', {
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
              {getFieldDecorator('invoiceNumber', { initialValue: 1 })(
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
                <div>
                 Bill to: 
                </div>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Invoice Date"
            >
              {getFieldDecorator('invoiceDate')(
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
                <div>
                  <BillFrom />
                </div>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Payment Due"
            >
              {getFieldDecorator('paymentDue')(
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
          <Col span={7} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 24 }}>
              {getFieldDecorator('itemsDescription', {
                rules: [{ required: true, message: 'Please specify description way of your items/services ' }], initialValue:"Description"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={3} className={styles.denseHeight}>
            <FormItem> 
              {getFieldDecorator('itemsQuantity', {
                rules: [{ required: true, message: 'Please specify quantity name of your items/services ' }], initialValue:"Quantity"
              })(
                <Input className={styles.borderless} style={{textAlign:"center", width:"90%"}} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={4} className={styles.denseHeight}>
            <FormItem >
              {getFieldDecorator('itemsPrice', {
                rules: [{ required: true, message: 'Please specify description way of pricing items/services ' }], initialValue:"Price"
              })(
                <Input className={styles.borderless} style={{textAlign:"center", width:"90%"}} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={4} className={styles.denseHeight}>
            <FormItem >
              {getFieldDecorator('total', {
                rules: [{ required: true, message: 'Please specify description way of total charge for items/services ' }], initialValue:"Total"
              })(
                <Input className={styles.borderless} style={{textAlign:"center", width:"90%"}} />
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
            <FormItem wrapperCol={{ span: 8, offset: 10 }}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Choose currency"
             >
              <div>

                  {currencyOptions}
              </div>              
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

