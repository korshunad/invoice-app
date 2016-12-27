import React from 'react'
import { Form, Input, Icon, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
    this.remove=this.remove.bind(this);
    this.add=this.add.bind(this);
  }
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  }

  remove(k) {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
            <Row>
        <FormItem
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input item information or delete this field.",
            }],
          })(
            <div>

            <Col span={5}>
            <Input style={{ width: '90%' }} />
            </Col>
            <Col span={9}>
            <Input style={{ width: '90%'}} />
            </Col>
            <Col span={3}>
            <Input style={{ width: '90%' }} />
            </Col>
            <Col span={3}>
            <Input style={{ width: '90%' }} />
            </Col>
            <Col span={3}>
            <Input style={{ width: '90%' }} />
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
      <Form horizontal>
        {formItems}
        <Row>
        <Col span={8} offset={8}>
        <FormItem >
          <Button type="dashed" onClick={this.add} >
            <Icon type="plus" /> Add another item
          </Button>
        </FormItem>
        </Col>
        </Row>
      </Form>
    );
  }
}

const Items = Form.create()(DynamicFieldSet);
export default Items
