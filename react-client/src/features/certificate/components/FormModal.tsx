import { Button, Divider, Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import {
  areaFormatter,
  nameValidator,
} from "../../../common/utils/fieldValidators";
import { Certificate } from "../certificate.interface";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

interface modalProps {
  visible: boolean;
  handleOk: (formData: Certificate) => any;
  onCancel: () => any;
  initData: Certificate | undefined;
  isLoading: boolean;
}

const initValues = {};

const FormModal = ({
  visible,
  handleOk,
  onCancel,
  initData,
  isLoading,
}: modalProps) => {
  const [form] = useForm();

  useEffect(() => {
    if (initData) {
      form.setFieldsValue({ ...initData });
    } else form.resetFields();
  }, [visible]);

  const onFinish = (formData: Certificate) => handleOk(formData);

  return (
    <Modal
      title={initData ? "Edit" : "Create"}
      visible={visible}
      centered
      footer={false}
      onCancel={onCancel}
    >
      <Form
        name="certificate-modal"
        form={form}
        initialValues={initValues}
        onFinish={onFinish}
        {...layout}
      >
        <Form.Item label="Owner Name" name="ownerName" rules={nameValidator}>
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={nameValidator}>
          <Input />
        </Form.Item>
        <Form.Item
          name="landParcel"
          rules={[{ max: 10000, min: 0, type: "integer", required: true }]}
          label="Land Parcel"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="mapSheet"
          rules={[{ max: 100, min: 0, type: "integer", required: true }]}
          label="Map Sheet"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="acreage"
          rules={[{ type: "number", min: 0, required: true }]}
          label="Acreage (m2)"
        >
          <InputNumber formatter={areaFormatter} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
          <Divider type="vertical" />
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
