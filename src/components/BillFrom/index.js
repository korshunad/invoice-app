import React from 'react'
import styles from './_BillFrom.css'
import { Button, Modal, Form, Input, Tabs, Select, notification, Icon} from 'antd';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class BillFromForm extends React.Component {

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
//    console.log(JSON.stringify(this.props.regionData)+"invoice region data from company form")
//    const { country, region } = this.state;
    return (
      <Modal
        visible={visible}
        title="Add your contacts"
        okText="Save"
        onCancel={onCancel}
        onOk={onCreate}
        width="500px"
      >
        <Form vertical>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Name and contacts" key="1">
              <FormItem  className={styles.formPart} label="Your website">
                {getFieldDecorator('Website', { initialValue: this.props.invoiceToEdit.companyWebsite!=undefined? this.props.invoiceToEdit.companyWebsite : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="E-mail">
                {getFieldDecorator('Email', { initialValue: this.props.invoiceToEdit.companyEmail != undefined? this.props.invoiceToEdit.companyEmail : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Phone">
                {getFieldDecorator('Phone', { initialValue: this.props.invoiceToEdit.companyPhone !=undefined? this.props.invoiceToEdit.companyPhone : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Fax">
                {getFieldDecorator('Fax', { initialValue: this.props.invoiceToEdit.companyFax !=undefined? this.props.invoiceToEdit.companyFax : ''})(
                  <Input />
                )}
              </FormItem>

            < /TabPane>
            <TabPane tab="Address" key="2">
              <FormItem  className={styles.formPart} label="Your Address">
                {getFieldDecorator('address1', { initialValue: this.props.invoiceToEdit.companyAddressL1 !=undefined? this.props.invoiceToEdit.companyAddressL1 : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Address (additional line)">
                {getFieldDecorator('address2', { initialValue: this.props.invoiceToEdit.companyAddressL2 !=undefined? this.props.invoiceToEdit.companyAddressL2 : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="City">
                {getFieldDecorator('city', { initialValue: this.props.invoiceToEdit.companyCity !=undefined? this.props.invoiceToEdit.companyCity : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="ZIP">
                {getFieldDecorator('ZIP', { initialValue: this.props.invoiceToEdit.companyZip !=undefined? this.props.invoiceToEdit.companyZip : null})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Country">
                  <CountryDropdown className={styles.antd}
                    value={this.props.regionData != null ? this.props.regionData["country"] : this.state.regionData["country"] }
                    onChange={(val) => this.selectCountry(val)} />
              </FormItem>
              <FormItem className={styles.formPart}  label="Province">
                <RegionDropdown className={styles.antd}
                  country={this.props.regionData["country"] || this.state.regionData["country"]}
                  value={this.props.regionData["region"] || this.state.regionData["region"]}
                  onChange={(val) => this.selectRegion(val)} />
              </FormItem>

            < /TabPane>
            <TabPane tab="Billing" key="3">
              <FormItem className={styles.formPart}  label="Bank account holder name">
                {getFieldDecorator('holderName', { initialValue: this.props.invoiceToEdit.companyBankAccountHolder !=undefined ? this.props.invoiceToEdit.companyBankAccounHolder : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Bank account">
                {getFieldDecorator('account', { initialValue: this.props.invoiceToEdit.companyAccount !=undefined? this.props.invoiceToEdit.companyAccount : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="IBAN">
                {getFieldDecorator('IBAN', { initialValue: this.props.invoiceToEdit.companyIBAN !=undefined? this.props.invoiceToEdit.companyIBAN : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="BIC">
                {getFieldDecorator('BIC', { initialValue: this.props.invoiceToEdit.companyBIC !=undefined ? this.props.invoiceToEdit.companyBIC : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Bank name">
                {getFieldDecorator('bankName', { initialValue: this.props.invoiceToEdit.companyBankName !=undefined? this.props.invoiceToEdit.companyBankName : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Bank address">
                {getFieldDecorator('bankAddress', { initialValue: this.props.invoiceToEdit.companyBankAddress !=undefined? this.props.invoiceToEdit.companyBankAddress : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="SWIFT">
                {getFieldDecorator('SWIFT', { initialValue: this.props.invoiceToEdit.companySWIFT !=undefined? this.props.invoiceToEdit.companySWIFT : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="PayPal e-mail or phone">
                {getFieldDecorator('PayPal', { initialValue: this.props.invoiceToEdit.companyPayPalinfo !=undefined? this.props.invoiceToEdit.companyPayPalinfo : ''})(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Other billing information">
                {getFieldDecorator('otherBill', { initialValue: this.props.invoiceToEdit.companyOtherBilling !=undefined? this.props.invoiceToEdit.companyOtherBilling : ''})(
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

BillFromForm=Form.create({})(BillFromForm)

class BillFrom extends React.Component{
  constructor(props) {
    super(props);
    this.state={visible: false, regionData:{country: '', region: ''}};
    this.showModal=this.showModal.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
    this.saveFormRef=this.saveFormRef.bind(this);
    this._updateOnChange=this._updateOnChange.bind(this);
  }
  componentWillReceiveProps() {
//    console.log(JSON.stringify(this.props.invoiceToEdit)+"another fucking try from billfrom wrap and comp receiving props")
    let updCountry=this.props.invoiceToEdit.companyCountry
    let updRegion=this.props.invoiceToEdit.companyProvince
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
      console.log(this.props.id+"from bill from submit")
      if (this.props.id != undefined) {
      self.props.updInvoiceHandler({
        
        updCompanyAddressL1: values.address1,
        updCompanyAddressL2: values.address2,
        updCompanyCity: values.city,
        updCompanyZip: values.ZIP,
        updCompanyCountry: self.state.regionData["country"],
        updCompanyProvince: self.state.regionData["region"],
        updCompanyPhone: values.Phone,
        updCompanyWebsite: values.Website,
        updCompanyFax: values.Fax,
        updCompanyEmail: values.Email,
        updCompanyAccount: values.account,
        updCompanyBankAccountHolder: values.holderName,
        updCompanyBankName: values.bankName,
        updCompanyBankAddress: values.bankAddress,
        updCompanySWIFT: values.SWIFT,  
        updCompanyBIC:  values.BIC,  
        updCompanyIBAN:  values.IBAN,  
        updCompanyPayPalinfo:  values.PayPal,  
        updCompanyOtherBilling:  values.otherBill,  
      })
  notification.open({
    message: 'Company information is updated!',
    description: <a href={'/pdfs/'+(self.props.id)}>  You can get it here </a>,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    duration: 0
  });
      } else {
      self.props.addCompanyHandler({
        
        newCompanyAddressL1: values.address1,
        newCompanyAddressL2: values.address2,
        newCompanyCity: values.city,
        newCompanyZip: values.ZIP,
        newCompanyCountry: self.state.regionData["country"],
        newCompanyProvince: self.state.regionData["region"],
        newCompanyPhone: values.Phone,
        newCompanyWebsite: values.Website,
        newCompanyFax: values.Fax,
        newCompanyEmail: values.Email,
        newCompanyAccount: values.account,
        newCompanyBankAccountHolder: values.holderName,
        newCompanyBankName: values.bankName,
        newCompanyBankAddress: values.bankAddress,
        newCompanySWIFT: values.SWIFT,  
        newCompanyBIC:  values.BIC,  
        newCompanyIBAN:  values.IBAN,  
        newCompanyPayPalinfo:  values.PayPal,  
        newCompanyOtherBilling:  values.otherBill,  
      })
      }
  //    console.log('Received values of form: ', values);
      this.setState({ visible: false });
    });
  }
  saveFormRef(form) {
    this.form = form;
  }
  render() {
//    console.log(this.props.id+"from billfrom again")
//    console.log(JSON.stringify(this.state.regionData)+"regiondata from billfrom wrap state") 
//    console.log(JSON.stringify(this.props.invoiceToEdit)+"invoice from billfrom wrapper")
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add your contacts
        </Button>
        <BillFromForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          invoiceToEdit={this.props.invoiceToEdit}
          addCompanyHandler={this.props.addCompanyHandler}
          regionData={this.state.regionData}
          onValueChange={this._updateOnChange}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
};

export default BillFrom
