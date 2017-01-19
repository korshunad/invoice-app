import React from 'react'
import styles from './_BillTo.css'
import { Button, Modal, Form, Input, Tabs, Select, notification, Icon} from 'antd';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;

class BillToForm extends React.Component {

  constructor(props) {
    super(props);
    this.state={regionData:{country: '', region: ''}};
    this.selectCountry=this.selectCountry.bind(this);
    this.selectRegion=this.selectRegion.bind(this);
  }
  selectCountry (val) {
    var self = this;
    let copyRegion=this.state.regionData
    copyRegion["country"]=val
    this.setState({ regionData: copyRegion }, function(){
                   self.props.onValueChange(self.state.regionData); 
                });
  }
 
  selectRegion (val) {
    var self=this;
    let copyRegion=this.state.regionData
    copyRegion["region"]=val
    this.setState({ regionData: copyRegion }, function(){
      self.props.onValueChange(self.state.regionData);
    });
  } 
  render() { 
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        title="Add customer information"
        okText="Save"
        onCancel={onCancel}
        onOk={onCreate}
        width="500px"
      >
        <Form vertical>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Customer name & account" key="1">
              <FormItem  className={styles.formPart} label="Contact first name"> 
                {getFieldDecorator('firstName', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerContactFirstName : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem  className={styles.formPart} label="Contact last name">
                {getFieldDecorator('lastName', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerContactLastName : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem  className={styles.formPart} label="Account">
                {getFieldDecorator('Account', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerAccount : ''})(
                  <Input />
                )}
              </FormItem>


            < /TabPane>
            <TabPane tab="Address" key="2">
              <FormItem  className={styles.formPart} label="Address">
                {getFieldDecorator('address1', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerAddressL1 : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Address (additional line)">
                {getFieldDecorator('address2', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerAddressL2 : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="City">
                {getFieldDecorator('city', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerCity : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="ZIP">
                {getFieldDecorator('ZIP', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerZip : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Country">
                  <CountryDropdown className={styles.antd}
                    value={this.props.regionData["country"] || this.state.regionData["country"]}
                    onChange={(val) => this.selectCountry(val)} />
              </FormItem>
              <FormItem className={styles.formPart}  label="Province">
                <RegionDropdown className={styles.antd}
                  country={this.props.regionData["country"] ||this.state.regionData["country"]}
                  value={this.props.regionData["region"] || this.state.regionData["region"]}
                  onChange={(val) => this.selectRegion(val)} />
              </FormItem>

            < /TabPane>
            <TabPane tab="Contacts" key="3">
              <FormItem  className={styles.formPart} label="Website">
                {getFieldDecorator('Website', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerWebsite : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="E-mail">
                {getFieldDecorator('Email', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerEmail : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Phone">
                {getFieldDecorator('Phone', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerPhone : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Fax">
                {getFieldDecorator('Fax', { initialValue: this.props.invoiceToEdit!=undefined? this.props.invoiceToEdit.customerFax : ''})(
                  <Input />
                )}
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
};

BillToForm=Form.create({})(BillToForm)

class BillTo extends React.Component{
  constructor(props) {
    super(props);
    this.state={visible: false,regionData:{country: '', region: ''} };
    this.showModal=this.showModal.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
    this.saveFormRef=this.saveFormRef.bind(this);
    this._updateOnChange=this._updateOnChange.bind(this);
  }
  componentWillReceiveProps() {
  //  console.log(JSON.stringify(this.props.invoiceToEdit)+"another fucking try from billto wrap and comp receiving props")
    let updCountry=this.props.invoiceToEdit.customerCountry
    let updRegion=this.props.invoiceToEdit.customerProvince
    this.setState({regionData: {country: updCountry, region: updRegion}})
  }
  _updateOnChange(value) {
    this.setState({regionData: value})
  }
  showModal() {
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleCreate() {
    const self=this;
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (this.props.id != undefined) {
      self.props.updInvoiceHandler({
        
        updCustomerAddressL1: values.address1,
        updCustomerAddressL2: values.address2,
        updCustomerCity: values.city,
        updCustomerZip: values.ZIP,
        updCustomerCountry: self.state.regionData["country"],
        updCustomerProvince: self.state.regionData["region"],
        updCustomerPhone: values.Phone,
        updCustomerEmail: values.Email,
        updCustomerContactFirstName: values.firstName,
        updCustomerContactLastName: values.lastName,
        updCustomerWebsite: values.Website,
        updCustomerFax: values.Fax,
        updCustomerAccountNumber: values.Account,
        
      })
  notification.open({
    message: 'Customer information is updated!',
    description: <a href={'/pdfs/'+(self.props.id)} rel="noopener noreferrer" target="_blank">  You can get updated invoice #{self.props.id} here </a>,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    duration: 0
  });
      }
      self.props.addCustomerHandler({
        
        newCustomerAddressL1: values.address1,
        newCustomerAddressL2: values.address2,
        newCustomerCity: values.city,
        newCustomerZip: values.ZIP,
        newCustomerCountry: self.state.regionData["country"],
        newCustomerProvince: self.state.regionData["region"],
        newCustomerPhone: values.Phone,
        newCustomerEmail: values.Email,
        newCustomerContactFirstName: values.firstName,
        newCustomerContactLastName: values.lastName,
        newCustomerWebsite: values.Website,
        newCustomerFax: values.Fax,
        newCustomerAccountNumber: values.Account,
        
      })
//      console.log('Received values of form: ', values);
      this.setState({ visible: false });
    });
  }
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add customer information
        </Button>
        <BillToForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          addCustomerHandler={this.props.addCustomerHandler}
          invoiceToEdit={this.props.invoiceToEdit}
          onValueChange={this._updateOnChange}
          regionData={this.state.regionData}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
};

export default BillTo
