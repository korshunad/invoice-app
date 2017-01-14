import React from 'react'
import styles from './_BillTo.css'
import { Button, Modal, Form, Input, Tabs, Select} from 'antd';
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
                {getFieldDecorator('firstName')(
                  <Input />
                )}
              </FormItem>
              <FormItem  className={styles.formPart} label="Contact last name">
                {getFieldDecorator('lastName')(
                  <Input />
                )}
              </FormItem>
              <FormItem  className={styles.formPart} label="Account">
                {getFieldDecorator('Account')(
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
            <TabPane tab="Contacts" key="3">
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
    this.state={visible: false};
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
          Add customer information
        </Button>
        <BillToForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          addCustomerHandler={this.props.addCustomerHandler}
          onValueChange={this._updateOnChange}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
};

export default BillTo
