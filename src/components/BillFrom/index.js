import React from 'react'
import { Button, Modal, Form, Input, Tabs} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Add your contacts"
        okText="Save"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <Tabs defaultActiveKey="1">
    <TabPane tab="Name and address" key="1">
          <FormItem label="Company name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input company name' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Address">
            {getFieldDecorator('address1')(
              <Input />
            )}
          </FormItem>
          <FormItem label="Address (additional line)">
            {getFieldDecorator('address2')(
              <Input />
            )}
          </FormItem>
          <FormItem label="City">
            {getFieldDecorator('city')(
              <Input />
            )}
          </FormItem>
          <FormItem label="ZIP">
            {getFieldDecorator('ZIP')(
              <Input />
            )}
          </FormItem>
          <FormItem label="Country">
            {getFieldDecorator('Country')(
              <Input />
            )}
          </FormItem>
          <FormItem label="Province">
            {getFieldDecorator('Province')(
              <Input />
            )}
          </FormItem>
   < /TabPane>
    <TabPane tab="Contact" key="2">
          <FormItem label="Website">
            {getFieldDecorator('Website')(
              <Input />
            )}
          </FormItem>
          <FormItem label="E-mail">
            {getFieldDecorator('E-mail')(
              <Input />
            )}
          </FormItem>
          <FormItem label="Phone">
            {getFieldDecorator('Phone')(
              <Input />
            )}
          </FormItem>
          <FormItem label="Fax">
            {getFieldDecorator('Fax')(
              <Input />
            )}
          </FormItem>
   < /TabPane>
    <TabPane tab="Billing" key="3">
          <FormItem label="Bank account">
            {getFieldDecorator('account')(
              <Input />
            )}
          </FormItem>
          <FormItem label="Bank name">
            {getFieldDecorator('Bank name')(
              <Input />
            )}
          </FormItem>
          <FormItem label="Bank address">
            {getFieldDecorator('bank address')(
              <Input />
            )}
          </FormItem>
          <FormItem label="SWIFT">
            {getFieldDecorator('SWIFT')(
              <Input />
            )}
          </FormItem>
   < /TabPane>
</Tabs>
        </Form>
      </Modal>
    );
  }
);

const BillFrom = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal() {
    this.setState({ visible: true });
  },
  handleCancel() {
    this.setState({ visible: false });
  },
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
  },
  saveFormRef(form) {
    this.form = form;
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Add your contacts</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  },
});

export default BillFrom
