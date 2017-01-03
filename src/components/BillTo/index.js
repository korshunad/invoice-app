import React from 'react'
import styles from './_BillTo.css'
import { Button, Modal, Form, Input, Tabs, Select} from 'antd';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class BillToForm extends React.Component {

  constructor(props) {
    super(props);
    this.state={country: '', region: ''};
    this.selectCountry=this.selectCountry.bind(this);
    this.selectRegion=this.selectRegion.bind(this);
  }
  selectCountry (val) {
    this.setState({ country: val });
  }
 
  selectRegion (val) {
    this.setState({ region: val });
  } 
  render() { 
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { country, region } = this.state;
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
            <TabPane tab="Customer name" key="1">
              <FormItem className={styles.formPart} label="Customer company name">
                {getFieldDecorator('name', {
                  rules: 
                    [{ required: true, 
                    message: 'Please input customer company name' }] })(
                   <Input />
                )}
              </FormItem>
              <FormItem  className={styles.formPart} label="Contact first name"> 
                {getFieldDecorator('first name')(
                  <Input />
                )}
              </FormItem>
              <FormItem  className={styles.formPart} label="Contact last name">
                {getFieldDecorator('last name')(
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
                    value={country}
                    onChange={(val) => this.selectCountry(val)} />
              </FormItem>
              <FormItem className={styles.formPart}  label="Province">
                <RegionDropdown className={styles.antd}
                  country={country}
                  value={region}
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
                {getFieldDecorator('E-mail')(
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
  }
  showModal() {
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

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
          Add customer
        </Button>
        <BillToForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
};

export default BillTo
