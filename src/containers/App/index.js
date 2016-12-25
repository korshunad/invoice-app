import React from 'react'
import styles from './_App.css'
import { connect } from 'react-redux'
import {getInvoices, addInvoice} from 'redux/modules/api'
import { Form, Select, Input, Button, InputNumber, DatePicker, LocaleProvider } from 'antd';
import moment from 'moment';
import enUS from 'antd/lib/locale-provider/en_US'
import 'moment/locale/ru';
moment.locale('en')

const FormItem = Form.Item;
const Option = Select.Option;

class CustomizedForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSelectChange(value) {
    console.log(value);
    this.props.form.setFieldsValue({
    });
  }
  render() {
    console.log(moment.months())
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'DD/MM/YYYY';
    const formItemLayout = {

    };
    return (
      <LocaleProvider locale={enUS}>
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <FormItem
          wrapperCol={{ span: 8, offset: 16 }}
        >
          {getFieldDecorator('invoiceName', {
            rules: [{ required: true, message: 'Please name your document' }],            initialValue:"Invoice"
          })(
            <Input className={styles.borderless+ ' ' +styles.header} />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 16 }}
        >
          {getFieldDecorator('invoiceSummary', {
            onChange: this.handleSelectChange,
          })(
            <Input placeholder="Invoice summary"/>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 16 }}
        >
          {getFieldDecorator('input-number', { initialValue: 1 })(
            <InputNumber min={1} />
          )}
        </FormItem>
        <FormItem
      labelCol={{ span: 4, offset:8 }}
      wrapperCol={{ span: 8 }}
          label="Invoice Date"
        >
          {getFieldDecorator('invoice-date')(
           <DatePicker  />
          )}
        </FormItem>
        <FormItem
      labelCol={{ span: 4, offset:8 }}
      wrapperCol={{ span: 8 }}
          label="Invoice Date"
        >
          {getFieldDecorator('invoice-date')(
           <DatePicker  />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 8, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
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

