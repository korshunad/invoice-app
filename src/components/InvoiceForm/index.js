import React from 'react'
import styles from './_InvoiceForm.css'
import { Icon, Row,notification, Col, Form, Select, Input, Button, InputNumber, DatePicker, LocaleProvider } from 'antd';
import moment from 'moment';
import enUS from 'antd/lib/locale-provider/en_US'
import 'moment/locale/ru';
import BillFrom from 'components/BillFrom'
import BillTo from 'components/BillTo'
import {currencies} from './currencies'
import { addInvoice, submitInvoice } from 'redux/modules/api'




moment.locale('en')
const FormItem = Form.Item;
const Option = Select.Option;
let hide=false;
let id;
let lineTotal = 0;
class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hideCur:true,
      taxType:"%",
      quantity:0,
      items:{0:{name:'', description:'', price:0, quantity:0}},
      preCur:   '',
      postCur:  '',
      keys: [0]
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
  componentWillReceiveProps(){
var obj;
    if ((this.props.id != undefined) && (this.props.invoiceToEdit != undefined)) {
    if (this.props.invoiceToEdit.items != undefined) {
obj = this.props.invoiceToEdit.items.reduce(function(acc, cur, i) {
  acc[i] = cur;
  return acc;
}, {});
let newKeys=Object.keys(obj)
//console.log(Object.keys(obj)+"checking timing for keys obj alternative")
  this.setState({
      items: obj ,
      keys: newKeys 
  })
  this.setState({
    invoice: this.props.invoiceToEdit, 
      taxType: this.props.invoiceToEdit.taxType,
      preCur: this.props.currencySymbol,
      postCur: this.props.currencyCode
  })
}
}
  }
  setTaxType(value) {
    if (value==="%") {
      hide=true;
      this.setState({hideCur:true, taxType:"%"});
    }
    if (value==="flat" ) {
      hide=false;
      this.setState({hideCur:false, taxType:"flat"});
    }
  if (this.props.invoiceToEdit.taxType=='flat') {
    this.setState({taxtType: "flat", hideCur: false})
  }
 //   console.log(JSON.stringify(this.state)+"look at currency and tax"+value+"and at value")
  }
  handleCurrencyChoice(value) {
    console.log("chosen currency: "+value)
    if (value==currencies[value]["symbol"]) {
      this.setState({preCur:null, postCur:value} );
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
    const amount=lineTotal;
    // console.log("fromQuant amount "+amount)
    items[k]["quantity"]=quant;
    items[k]["amount"]=amount;
    this.setState({items: items})
    
   // console.log(JSON.stringify(this.state.items)+"this are state items from quant")
  }
  handlePrice(k,e) {
    const price=e.target.value;
    const amount=lineTotal;
  //  console.log("fromPrice amount "+amount)
    const items=this.state.items;
    items[k]["price"]=price;
    items[k]["amount"]=amount;
    this.setState({items: items})
  //  console.log(JSON.stringify(this.state.items)+"this are state items from price")
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
/*    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }*/
    if (this.state.keys.length === 1) {
      return;
    }
    let lessKeys=this.state.keys.filter(key => key !==k)
    this.setState({keys:lessKeys})
    /*form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });*/
    const newItems=this.state.items 
    delete newItems[k]
    this.setState({items: newItems})
  }

  add(){
    const { form } = this.props;
    // can use data-binding to get
   /* const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);*/
    let moreKeys = this.state.keys.concat(this.state.keys.length)
    this.setState({keys: moreKeys})
    const newItems=this.state.items
    newItems[this.state.keys.length]={name:'', description:'', price:0, quantity:0}
  //  console.log(JSON.stringify(newItems)+"newitems")
    this.setState({items: newItems})
 //   console.log(JSON.stringify(this.state.items)+" items from items")
    // can use data-binding to set
    // important! notify form to detect changes
  /*  form.setFieldsValue({
      keys: nextKeys,
    });*/
  }
  handleSubmit(e) {
//console.log(JSON.stringify(this.state)+"from handleSubmit")
    if (this.props.id != undefined) {
    let submittableItems=Object.keys(this.state.items).map(key => this.state.items[key]);
    e.preventDefault();
    const self=this;
    
    this.props.form.validateFields( function checker (err, values)  {
      if (!err) {
        console.log('Received values of form: ', values);
    self.props.updInvoiceHandler({
      updInvoiceTitle: values.invoiceName,
      updInvoiceSummary: values.invoiceSummary,
      updInvoiceNumber: values.invoiceNumber,
      updInvoiceDate: values.invoiceDate,

      updPaymentDue: values.paymentDue,

      updItemsName: values.items,
      updItemsDescriptionName: values.itemsDescription,
      updUnitPriceName: values.itemsPrice,
      updQuantityName: values.itemsQuantity,
      updTotalName: values.Amount,

      updCurrencySymbol: (self.state.preCur? self.state.preCur : self.state.postCur ? '' : self.props.invoiceToEdit.currencySymbol),
      updCurrencyCode: (self.state.postCur ? self.state.postCur : self.state.preCur ? '' : self.props.invoiceToEdit.currencyCode),

      updInvoiceTotal: values.total,
      updTaxName: values.taxName,
      updTaxType: self.state.taxType,
      updTax: values.tax,
      updDiscountName: values.discountName,
      updDiscount: values.discount,
      updAdditionalChargeName: values.addChargeName,
      updAdditionalCharge: values.addCharge,

      updItems: submittableItems,  

      updNotes: values.notes,
      updFooter: values.terms,
      updCompanyName: values.companyName,
      updCustomerName: values.customerName,
       });
  notification.open({
    message: 'Your invoice #'+self.props.id+' is updated!',
    description: <a href={'/pdfs/'+(self.props.id)} rel="noopener noreferrer" target="_blank" >  You can get it here </a>,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    duration: 0
  });
      }

    })
    } else {
    let submittableItems=Object.keys(this.state.items).map(key => this.state.items[key]);
    e.preventDefault();
    const self=this;
    const today=new Date();
    this.props.form.validateFields( function checker (err, values)  {
      if (!err) {
   //     console.log('Received values of form: ', values);
    self.props.addInvoiceHandler({
      newInvoiceTitle: values.invoiceName,
      newInvoiceSummary: values.invoiceSummary,
      newInvoiceNumber: values.invoiceNumber,
      newInvoiceDate: values.invoiceDate || today.toString(),

      newPaymentDue: values.paymentDue,

      newItemsName: values.items,
      newItemsDescriptionName: values.itemsDescription,
      newUnitPriceName: values.itemsPrice,
      newQuantityName: values.itemsQuantity,
      newTotalName: values.Amount,

      newCurrencySymbol: self.state.preCur,
      newCurrencyCode: self.state.postCur,

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
      newCompanyName: values.companyName,
      newCustomerName: values.customerName,
       });
notification.open({
    message: 'Your invoice #'+(self.props.justMadeId+1)+' is ready!',
    description: <a rel="noopener noreferrer" target="_blank" href={'/pdfs/'+(self.props.justMadeId+1)} >  You can get it here </a>,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    duration: 10,
  });
      }

    })
    }

  }
  render() {
  //  console.log(JSON.stringify(this.state.items)+"look at this.state (items)from invoiceform if it received props")
//console.log(JSON.stringify(this.props.invoiceToEdit)+"props invoice to edit")
//console.log(this.props.invoiceToEdit.currencyCode+this.props.invoiceToEdit.currencySymbol+ "currency from props")
    const dateFormat = 'DD.MM.YYYY';
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const keys = getFieldValue('keys');
    //console.log(keys+"keys")
  //  console.log(this.props.id+"from invoiceform comp")
//console.log(JSON.stringify(this.props.invoiceToEdit)+"invoicetoedit from invoiceform")
//console.log(this.props.justMadeId+"justmadeid")    
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
          dropdownMatchSelectWidth={false}
          placeholder="Select currency"
          optionFilterProp="children"
          >

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
tax = +getFieldValue('tax') || 0;
discount = +getFieldValue('discount') || 0;
addCharge = +getFieldValue('addCharge') || 0;
let total=0;
let newKeys=Object.keys(this.state.items);
//if (this.props.invoiceToEdit.items != undefined) {  
/*if ((this.props.invoiceToEdit.items != undefined) && (this.state.items != undefined)) {  
var obj=this.props.invoiceToEdit.items.reduce(function(acc, cur, i) {
  acc[i] = cur;
  return acc;
}, {})
newKeys=Object.keys(this.state.items)
}*/
//console.log("keys "+newKeys)
let itemTotal = 0;
    const formItems = ( this.state.keys).map((k, index) => {
    let totStyle={width:"24px"};
    let curStyle={width:"24px"};
  //  console.log(JSON.stringify(this.state.items[k])+"from inside of mapping func - 1 item "+k+' k')
 lineTotal=((+this.state.items[k]["quantity"]) *(+this.state.items[k]["price"])) || 0  ;
   itemTotal+=lineTotal;
console.log(itemTotal+"itemTotal for item "+k)  
  console.log(total+"total after itemTotal")
    let price=this.state.items[k]["price"]
    
    curStyle=adjustWidth(price);
    totStyle=adjustWidth(lineTotal);
    //   console.log(JSON.stringify(totStyle))
      return (
            <Row key={k+"row"} className={styles.denseHeight}> 
            <div key={k+"wrapdiv"}>

              <Col key={k+"itemCol"} span={4}>
                <Input key={k+"item"} onChange={this.handleItemName.bind(this, k)} placeholder={this.state.items[k]["name"] ||  "item or service"} className={styles.borderless} style={{ width: '95%' }}  />
              </Col>
              <Col key={k+"descrCol"} span={7}>
                <Input type="textarea" key={k+"descr"} onChange={this.handleItemDescription.bind(this, k)} placeholder={this.state.items[k]["description"] ||  "description"} className={styles.borderless} style={{ width: '98%' }}  />
              </Col>
              <Col key={k+"quantCol"} span={3}>
                <Input key={k+"quant"}  
                  onChange={this.handleQuant.bind(this, k)} 
                  className={styles.borderless} placeholder={this.state.items[k]["quantity"] ||  0} 
                  style={{ width: '90%', textAlign:"center"}} />
              </Col>
              <Col key={k+"priceCol"} span={4} >
                <div className={styles.horizontalCentering}>
                  {this.state.preCur ? this.state.preCur : this.state.postCur ? '' : this.props.invoiceToEdit.currencySymbol }
                  <Input key={k+"price"} placeholder={this.state.items[k]["price"] ||  0} 
                    onChange={this.handlePrice.bind(this, k)} 
                    className={styles.borderless} style={curStyle} />
                  {this.state.postCur ? this.state.postCur : this.state.preCur ? '' : this.props.invoiceToEdit.currencyCode }
                </div>
              </Col>
              <Col key={k+"totalCol"} span={5}>
                <div className={styles.horizontalCentering}>
                  {this.state.preCur ? this.state.preCur : this.state.postCur ? '' : this.props.invoiceToEdit.currencySymbol}
                  <Input style={curStyle} key={k+"item total"} value={itemTotal} 
                    className={styles.borderless} style={totStyle} 
                    placeholder={0} onChange={(itemTotal) => {return itemTotal}}/>
                  {this.state.postCur ? this.state.postCur : this.state.preCur ? '' : this.props.invoiceToEdit.currencyCode}
                </div>
              </Col>
            </div>

            <Col span={1}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={this.state.keys.length === 1}
            onClick={() => this.remove(k)}
          />
            </Col>

            </Row>
      );
    });
    total+=itemTotal;
    console.log(this.state.taxType+"state.tax type")
    this.state.taxType=="flat"? total+=tax : total=total+(total*tax/100);
console.log(total+'total after tax')
    discount==0? total=total : total=total-(total*discount/100);
console.log(total+'total after discount')
    addCharge==0? total=total : total += addCharge;
console.log(total+'total after added charge')
    total=Math.round(total * 100) / 100
   console.log(total+"total after charges")

  return (
    <LocaleProvider locale={enUS}>
      <Form onSubmit={this.handleSubmit.bind(this)} className={styles.form}>
        <FormItem
          wrapperCol={{ span: 6, offset: 16 }}
        >
          {getFieldDecorator('invoiceName', {
            rules: [{ required: true, message: 'Please name your document' }], initialValue:  this.props.invoiceToEdit.invoiceTitle || "Invoice"
            })(
              <Input className={styles.borderless+ ' ' +styles.header} />
          )}
        </FormItem>

        <Row>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="Bill from"
            >
              {getFieldDecorator('companyName',  {
            rules: [{ required: true, message: 'Please add your or your company name' }], initialValue:  this.props.invoiceToEdit.companyName || ''
              })(
                <Input  placeholder="Your Company Name here"/>
              )}
            </FormItem>
          </Col>
          <Col span={12} style={{marginBottom:"10px"}}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              label="Invoice summary"
            >
              {getFieldDecorator('invoiceSummary', {initialValue:  this.props.invoiceToEdit.invoiceSummary || ''
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
                  <BillFrom id={this.props.id} invoiceToEdit={this.props.invoiceToEdit} addCompanyHandler={this.props.addCompanyHandler} updInvoiceHandler={this.props.updInvoiceHandler} />
                </div>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              label="Invoice Number"
            >
              {getFieldDecorator('invoiceNumber', { initialValue:   this.props.invoiceToEdit.invoiceNumber || 1 })(
                <InputNumber min={1} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 15, offset: 1 }}
              label="Bill to"
            >
              {getFieldDecorator('customerName',  {
            rules: [{ required: true, message: 'Please add your customer or her company name' }], initialValue:  this.props.invoiceToEdit.customerName || '' 
              })(
                <Input  placeholder="Your Customer Name"/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              label="Invoice Date"
            >
              {getFieldDecorator('invoiceDate', {initialValue:  moment(this.props.invoiceToEdit.invoiceDate) || null})(
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
                  <BillTo id={this.props.id} invoiceToEdit={this.props.invoiceToEdit} addCustomerHandler={this.props.addCustomerHandler} updInvoiceHandler={this.props.updInvoiceHandler}/>
                </div>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              className={styles.formPart}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              label="Payment Due"
            >
              {getFieldDecorator('paymentDue', {rules: [{ required: true, message: 'Please specify when the invoice is due' }], initialValue:  moment(this.props.invoiceToEdit.paymentDue) || null})(
                 <DatePicker format={dateFormat} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className={styles.denseHeight} style={{marginTop:"40px"}}>
          <Col span={4} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 24 }}>
              {getFieldDecorator('items', {
                rules: [{ required: true, message: 'Please classify your items/services ' }], initialValue:  this.props.invoiceToEdit.itemsName || "Items"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={7} className={styles.denseHeight}>
            <FormItem wrapperCol={{ span: 24 }}>
              {getFieldDecorator('itemsDescription', {
                rules: [{ required: true, message: 'Please specify description way of your items/services ' }], initialValue:  this.props.invoiceToEdit.itemsDescriptionName || "Description"
              })(
                <Input className={styles.borderless} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={3} className={styles.denseHeight}>
            <FormItem> 
              {getFieldDecorator('itemsQuantity', {
                rules: [{ required: true, message: 'Please specify quantity name of your items/services ' }], initialValue: this.props.invoiceToEdit.quantityName || "Quantity"
              })(
                <Input className={styles.borderless} style={{textAlign:"center", width:"90%"}} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={4} className={styles.denseHeight}>
            <FormItem >
              {getFieldDecorator('itemsPrice', {
                rules: [{ required: true, message: 'Please specify description way of pricing items/services ' }], initialValue:   this.props.invoiceToEdit.unitPriceName || "Price"
              })(
                <Input className={styles.borderless} style={{textAlign:"center", width:"90%"}} />
              )}
            </FormItem>
                      
          </Col>
          <Col span={5} className={styles.denseHeight}>
            <FormItem >
              {getFieldDecorator('Amount', {
                rules: [{ required: true, message: 'Please specify description way of total charge for an item or service ' }], initialValue: this.props.invoiceToEdit.totalName || "Amount"
              })(
                <Input className={styles.borderless} style={{textAlign:"center", width:"90%"}} />
              )}
            </FormItem>
                      
          </Col>
        </Row>
        <Row >
          <Col span={24}>
           {this.state.items != undefined ? formItems : '' } 
          </Col>
        </Row>
        <Row> 
          <Col span={24} >
            <FormItem >
              <Button style={{width:"700px"}} type="dashed" onClick={this.add} >
                <Icon type="plus" /> Add another item
              </Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10} >
            <Col span={8} offset={1}>
            <p>Choose currency:</p>
            </Col>
          </Col>

        </Row>
        
        <Row className={styles.denseHeight}>
          <Col span={8}>
            <FormItem wrapperCol={{ span: 13}}
             >
              <div>
                  {currencyOptions}
              </div>              
            </FormItem>
          </Col>
          <Col span={5} offset={2} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('taxName', {
                initialValue:  this.props.invoiceToEdit.taxName ||  "Tax:"
              })(
                <Input style={{textAlign:"right", border:"none"}} />
              )}
            </FormItem>
          </Col>
          <Col span={9} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('tax', {initialValue: this.props.invoiceToEdit.tax 
              })(
                <Row>
                  <Col  span={2}>
                  <div className={this.state.hideCur ? styles.hidden :  "" } style={{textAlign:"center"}}>
                    {this.state.preCur ? this.state.preCur : this.state.postCur ? '' : this.props.invoiceToEdit.currencySymbol }
                  </div>
                  </Col>
                  <Col span={8} >
                    <Input placeholder={ this.props.invoiceToEdit.tax }/>
                  </Col>
                  <Col className={this.state.hideCur ? styles.hidden : this.state.preCur ? styles.hidden : this.props.invoiceToEdit.currencySymbol  ? styles.hidden : this.state.postCur ? "" : this.props.invoiceToEdit.currencyCode ? '' : styles.hidden} span={2} offset={1}>
                    {this.state.postCur ? this.state.postCur : this.state.preCur ? '' : this.props.invoiceToEdit.currencyCode}
                  </Col>
                  <Col className={this.state.taxType=="%" ? "" : styles.hidden} span={1} offset={1}>
                    <p>%</p>
                  </Col>
                  <Col className={this.state.taxType=="flat" ? "" : styles.hidden} span={2} offset={1}>
                    <p>(flat)</p>
                  </Col>
                  <Col span={3} offset={1}>
                    <Select onChange={this.setTaxType} dropdownMatchSelectWidth={false} value="">
                      <Option  style={{width:"130px"}} key="%" value="%" >%</Option>
                      <Option key="flat" value="flat">flat</Option>
                    </Select>
                  </Col>
                </Row>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className={styles.denseHeight} >
          <Col className={styles.denseHeight} span={5} offset={10}>
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('discountName', {
                initialValue:  this.props.invoiceToEdit.discountName || "Discount:"
              })(
                <Input style={{textAlign:"right", border:"none"}} />
              )}
            </FormItem>
          </Col>
          <Col span={9} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('discount', { initialValue: this.props.invoiceToEdit.discount
              })(
                <Row>
                  <Col span={8} offset={2}>
                    <Input placeholder={ this.props.invoiceToEdit.discount } />
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
                initialValue:  this.props.invoiceToEdit.additionalChargeName || "Another charge:"
              })(
                <Input style={{textAlign:"right", border:"none"}} />
              )}
            </FormItem>
          </Col>
          <Col span={9} >
            <FormItem wrapperCol={{ span: 24 }}
            >
              {getFieldDecorator('addCharge', { initialValue: this.props.invoiceToEdit.additionalCharge
              })(
                <Row>
                  <Col span={2}>
                  <div className={this.state.hideCur && !this.state.preCur ? styles.hidden :  ""} style={{textAlign:"center"}}>
                  {this.state.preCur ? this.state.preCur : this.state.postCur ? '' : this.props.invoiceToEdit.currencySymbol}
                  </div>
                  </Col>
                  <Col span={8} >
                    <Input placeholder={  this.props.invoiceToEdit.additionalCharge } />
                  </Col>
                  <Col className={this.state.postCur==null? styles.hidden : ""} span={2} offset={1}>
                    {this.state.postCur ? this.state.postCur : this.state.preCur ? '' : this.props.invoiceToEdit.currencyCode}
                  </Col>
                </Row>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={14} offset={10}>
            <FormItem wrapperCol={{ span: 15 }}
              value={total}
              label="Total:"
              labelCol={{ span:9 }}
            >
              {getFieldDecorator('total', {initialValue:  total})(
              <div>
              <div className={styles.totalElems}>
                {this.state.preCur ? this.state.preCur : this.state.postCur ? '' :  this.props.invoiceToEdit.currencySymbol}
              </div>
              <div className={styles.totalElems} style={{marginLeft:"5px", marginRight:"5px"}}>
               { total}
              </div>
              <div className={styles.totalElems}>
               {this.state.postCur ? this.state.postCur : this.state.preCur ? '' : this.props.invoiceToEdit.currencyCode}
              </div>
              </div>
              )}
            </FormItem>
          </Col>
        </Row>
        

        <Row>
          <Col span={24}>
            <FormItem labelCol={{ span: 2 }}
              wrapperCol={{ span: 24 }}
              label="Notes"
             >
              {getFieldDecorator('notes', {initialValue:  this.props.invoiceToEdit.notes || '' })(
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
              {getFieldDecorator('terms', {initialValue:   this.props.invoiceToEdit.footer || '' })(
              <Input type="textarea" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormItem wrapperCol={{ span: 20}}>
              <Button type="primary" 
                htmlType="submit" 
                style={{width:"700px"}}>
                {this.props.id ? 'Update the invoice' : 'Save new invoice'}
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
