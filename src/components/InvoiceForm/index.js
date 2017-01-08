import React from 'react'
import styles from './_InvoiceForm.css'
import { Icon, Row, Col, Form, Select, Input, Button, InputNumber, DatePicker, LocaleProvider } from 'antd';
import moment from 'moment';
import enUS from 'antd/lib/locale-provider/en_US'
import 'moment/locale/ru';
import BillFrom from 'components/BillFrom'
import BillTo from 'components/BillTo'
import {currencies} from './currencies'
import { addInvoice, submitInvoice } from 'redux/modules/api'

//console.log(JSON.stringify(currencies["USD"]))
moment.locale('en')
const FormItem = Form.Item;
let itemTotal = 0;
const Option = Select.Option;
let hide=false;
//let preCur;
//let postCur;
let uuid = 0;

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hideCur:true,
      taxType:"",
      quantity:0,
      items:{0:{name:'', description:'', price:0, quantity:0}},
      preCur:null,
      postCur:null,
    };
    this.remove=this.remove.bind(this);
    this.add=this.add.bind(this);
    this.handleQuant=this.handleQuant.bind(this);
    this.handlePrice=this.handlePrice.bind(this);
    this.handleCurrencyChoice=this.handleCurrencyChoice.bind(this);
    this.setTaxType=this.setTaxType.bind(this);
    this.handleItemName=this.handleItemName.bind(this);
    this.handleItemDescription=this.handleItemDescription.bind(this);
  }
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  }
  setTaxType(value) {
    if (value=="%") {
      hide=true;
      this.setState({hideCur:true, taxType:"%"});
    }
    if (value=="flat" ) {
      hide=false;
      this.setState({hideCur:false, taxType:"flat"});
    }
    console.log(value)
    console.log(hide)
  }
  handleCurrencyChoice(value) {
    console.log("chosen currency: "+value)
    if (value==currencies[value]["symbol"]) {
      this.setState({preCur:null, postCur:value, currency: currencies[value]["code"]});
  //   preCur=null;
  //   postCur=value; 
    } else {
      this.setState({postCur:null, preCur:currencies[value]["symbol"], currency: currencies[value]["code"]})
  //   postCur=null;
  //   preCur=currencies[value]["symbol"]
    }
  }
  handleQuant(k,e) {
    const quant=e.target.value;
    const items=this.state.items;
    const amount=itemTotal;
    console.log("fromQuant amount "+amount)
    items[k]["quantity"]=quant;
    items[k]["amount"]=amount;
    this.setState({items: items})
    
    console.log(JSON.stringify(this.state.items)+"this are state items from quant")
  }
  handlePrice(k,e) {
    const price=e.target.value;
    const amount=itemTotal;
    console.log("fromPrice amount "+amount)
    const items=this.state.items;
    items[k]["price"]=price;
    items[k]["amount"]=amount;
    this.setState({items: items})
    console.log(JSON.stringify(this.state.items)+"this are state items from price")
  }
  handleItemName(k,e) {
    const name=e.target.value;
    const items=this.state.items;
    items[k]["name"]=name;
    this.setState({items: items});
  }
  handleItemDescription(k,e) {
    const description=e.target.value;
    const items=this.state.items;
    items[k]["description"]=description;
    this.setState({items: items});
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
    newItems[uuid]={name:'', description:'', price:0, quantity:0}
    console.log(JSON.stringify(newItems)+"newitems")
    this.setState({items: newItems})
    console.log(JSON.stringify(this.state.items)+" items from items")
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  handleSubmit(e) {
    
    let submittableItems=Object.keys(this.state.items).map(key => this.state.items[key]);
    e.preventDefault();
    const self=this;
    this.props.form.validateFields( function checker (err, values)  {
      if (!err) {
        console.log('Received values of form: ', values);
      }

    self.props.addInvoiceHandler({
      newInvoiceTitle: values.invoiceName,
      newInvoiceSummary: values.invoiceSummary,
      newInvoiceNumber: values.invoiceNumber,
      newInvoiceDate: values.invoiceDate,

      newPaymentdue: values.paymentDue,

      newItemsName: values.items,
      newItemsDescriptionName: values.itemsDescription,
      newUnitPriceName: values.itemsPrice,
      newQuantityName: values.itemsQuantity,
      newTotalName: values.amount,

      newCurrency: self.state.currency,

      newInvoiceTotal: values.total,
      newTaxName: values.taxName,
      newTaxType: self.state.taxType,
      newTax: values.tax,
      newDiscountName: values.discountName,
      newDiscount: values.discount,
      newAdditionalChargeName: values.addChargeName,
      newAdditionalCharge: values.addCharge,

      newItems: submittableItems,  

      newNotes: values.notes,
      newFooter: values.terms,
       });
    })

  }
  render() {
    const dateFormat = 'DD.MM.YYYY';
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
    
function adjustWidth(numInput) {
    let width;
    let styleObject={};
    if ((""+numInput).length<8) {
      width=((""+numInput).length+1)*7+10;
    } else if ((""+numInput).length>=8) {
      width=80
    }  
    styleObject["width"]=width+"px"
    return styleObject;
}    
let tax = 0, discount = 0, addCharge = 0;
tax = +getFieldValue('tax');
discount = +getFieldValue('discount');
addCharge = +getFieldValue('addCharge')
let total=0;
    const formItems = keys.map((k, index) => {
    let totStyle={width:"24px"};
    let curStyle={width:"24px"};
    itemTotal=this.state.items[k]["quantity"]*this.state.items[k]["price"]
    total+=itemTotal;
    this.state.taxType=="flat"? total+=tax : total=total+(total*tax/100);
    discount==0? total=total : total=total-(total*discount/100);
    addCharge==0? total=total : total += addCharge;
    console.log(total+"total")
    let price=this.state.items[k]["price"]
    
    curStyle=adjustWidth(price);
    totStyle=adjustWidth(itemTotal);
//   console.log(JSON.stringify(totStyle))
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

              <Col key={k+"itemCol"} span={4}>
                <Input key={k+"item"} onChange={this.handleItemName.bind(this, k)} placeholder="item or service" className={styles.borderless} style={{ width: '95%' }}  />
              </Col>
              <Col key={k+"descrCol"} span={7}>
                <Input key={k+"descr"} onChange={this.handleItemDescription.bind(this, k)} placeholder="description" className={styles.borderless} style={{ width: '98%' }}  />
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
              <Col key={k+"totalCol"} span={5}>
                <div className={styles.horizontalCentering}>
                  {this.state.preCur}
                  <Input style={curStyle} key={k+"item total"} value={itemTotal} 
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
      <Form onSubmit={this.handleSubmit.bind(this)} className={styles.form}>
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
          <Col span={12} style={{marginBottom:"10px"}}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Invoice summary"
            >
              {getFieldDecorator('invoiceSummary', {
              })(
                <Input type="textarea"rows={1} placeholder="Invoice summary"/>
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
                  <BillFrom addCompanyHandler={this.props.addCompanyHandler}/>
                </div>
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
                <DatePicker format={dateFormat} />
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
                  <BillTo addCustomerHandler={this.props.addCustomerHandler}/>
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
                 <DatePicker format={dateFormat} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className={styles.denseHeight} style={{marginTop:"40px"}}>
          <Col span={4} className={styles.denseHeight}>
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
          <Col span={5} className={styles.denseHeight}>
            <FormItem >
              {getFieldDecorator('Amount', {
                rules: [{ required: true, message: 'Please specify description way of total charge for an item or service ' }], initialValue:"Amount"
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
        <Row> 
          <Col span={22} >
            <FormItem >
              <Button style={{width:"600px"}} type="dashed" onClick={this.add} >
                <Icon type="plus" /> Add another item
              </Button>
            </FormItem>
          </Col>
        </Row>
        
        <Row className={styles.denseHeight} >
          <Col span={3} offset={12} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('taxName', {
                initialValue:"Tax:"
              })(
                <Input style={{textAlign:"right", border:"none"}} />
              )}
            </FormItem>
          </Col>
          <Col span={9} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('tax', {
                initialValue:0
              })(
                <Row>
                  <Col className={this.state.hideCur ? styles.hidden : this.state.preCur==null? styles.hidden : ""} span={2}>
                    {this.state.preCur}
                  </Col>
                  <Col span={8} offset={1}>
                    <Input />
                  </Col>
                  <Col className={this.state.hideCur ? styles.hidden : this.state.postCur==null? styles.hidden : ""} span={2} offset={1}>
                    {this.state.postCur}
                  </Col>
                  <Col className={this.state.taxType=="%" ? "" : styles.hidden} span={1} offset={1}>
                    <p>%</p>
                  </Col>
                  <Col className={this.state.taxType=="flat" ? "" : styles.hidden} span={2} offset={1}>
                    <p>(flat)</p>
                  </Col>
                  <Col span={3} offset={1}>
                    <Select onChange={this.setTaxType} dropdownMatchSelectWidth={false} value="">
                      <Option  styles={{width:"130px"}} key="%" value="%" >%</Option>
                      <Option key="flat" value="flat">flat</Option>
                    </Select>
                  </Col>
                </Row>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className={styles.denseHeight} >
          <Col className={styles.denseHeight} span={3} offset={12}>
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('discountName', {
                initialValue:"Discount:"
              })(
                <Input style={{textAlign:"right", border:"none"}} />
              )}
            </FormItem>
          </Col>
          <Col span={9} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('discount', {
                initialValue:0
              })(
                <Row>
                  <Col span={8} offset={1}>
                    <Input />
                  </Col>
                  <Col span={1} offset={1}>
                    <p>%</p>
                  </Col>
                </Row>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={5} offset={10}>
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('addChargeName', {
                initialValue:"Another charge:"
              })(
                <Input style={{textAlign:"right", border:"none"}} />
              )}
            </FormItem>
          </Col>
          <Col span={9} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('addCharge', {
                initialValue:0
              })(
                <Row>
                  <Col className={this.state.preCur==null? styles.hidden : ""} span={2}>
                    {this.state.preCur}
                  </Col>
                  <Col span={8} offset={1}>
                    <Input />
                  </Col>
                  <Col className={this.state.postCur==null? styles.hidden : ""} span={2} offset={1}>
                    {this.state.postCur}
                  </Col>
                </Row>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={14} offset={10}>
            <FormItem wrapperCol={{ span: 16 }}
              value={total}
              label="Total:"
              labelCol={{ span:8 }}
            >
              {getFieldDecorator('total', {initialValue:total})(
              <div>
              <div className={styles.totalElems}>
                {this.state.preCur}
              </div>
              <div className={styles.totalElems} style={{marginLeft:"5px", marginRight:"5px"}}>
               {total}
              </div>
              <div className={styles.totalElems}>
               {this.state.postCur}
              </div>
              </div>
              )}
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
            <FormItem labelCol={{ span: 2 }}
              wrapperCol={{ span: 24 }}
              label="Notes"
             >
              {getFieldDecorator('notes', {})(
              <Input type="textarea" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem labelCol={{ span: 2 }}
              wrapperCol={{ span: 24 }}
              label="Terms"
             >
              {getFieldDecorator('terms', {})(
              <Input type="textarea" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormItem wrapperCol={{ span: 20}}>
              <Button type="primary" htmlType="submit" style={{width:"600px"}}>
                Save the invoice
              </Button>
            </FormItem>
          </Col>
        </Row>

      </Form>

   </LocaleProvider>
    );
  }
}
InvoiceForm = Form.create({})(InvoiceForm);
export default InvoiceForm
