import React from 'react'
import styles from './_BillFrom.css'
import { Button, Modal, Form, Input, Tabs, Select} from 'antd';
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
              <FormItem className={styles.formPart} label="Company name">
                {getFieldDecorator('name', {
                  rules: 
                    [{ required: true, 
                    message: 'Please input company name' }] })(
                   <Input />
                )}
              </FormItem>
              <FormItem  className={styles.formPart} label="Website">
                {getFieldDecorator('Website')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="E-mail">
                {getFieldDecorator('Email')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Phone">
                {getFieldDecorator('Phone')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Fax">
                {getFieldDecorator('Fax')(
                  <Input />
                )}
              </FormItem>

            < /TabPane>
            <TabPane tab="Address" key="2">
              <FormItem  className={styles.formPart} label="Address">
                {getFieldDecorator('address1')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Address (additional line)">
                {getFieldDecorator('address2')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="City">
                {getFieldDecorator('city')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="ZIP">
                {getFieldDecorator('ZIP')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Country">
                  <CountryDropdown className={styles.antd}
                    value={this.state.regionData["country"]}
                    onChange={(val) => this.selectCountry(val)} />
              </FormItem>
              <FormItem className={styles.formPart}  label="Province">
                <RegionDropdown className={styles.antd}
                  country={this.state.regionData["country"]}
                  value={this.state.regionData["region"]}
                  onChange={(val) => this.selectRegion(val)} />
              </FormItem>

            < /TabPane>
            <TabPane tab="Billing" key="3">
              <FormItem className={styles.formPart}  label="Bank account holder name">
                {getFieldDecorator('holderName')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Bank account">
                {getFieldDecorator('account')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="IBAN">
                {getFieldDecorator('IBAN')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="BIC">
                {getFieldDecorator('BIC')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Bank name">
                {getFieldDecorator('bankName')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Bank address">
                {getFieldDecorator('bankAddress')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="SWIFT">
                {getFieldDecorator('SWIFT')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="PayPal e-mail or phone">
                {getFieldDecorator('PayPal')(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.formPart}  label="Other billing information">
                {getFieldDecorator('otherBill')(
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
      self.props.addCompanyHandler({
        newCompanyName: values.name,
        
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
      console.log('Received values of form: ', values);
      form.resetFields();
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
          Add your contacts
        </Button>
        <BillFromForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          addCompanyHandler={this.props.addCompanyHandler}
          onValueChange={this._updateOnChange}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
};

export default BillFrom
