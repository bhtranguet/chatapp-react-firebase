import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppProvider";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addDocument } from "../../../utils";
import { AuthContext } from "../contexts";

type FieldType = {
  name: string;
  description?: string;
};

function AddRoomModal() {
  const { isAddRoomModalOpen, setIsAddRoomModalOpen } = useContext(AppContext);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const handleOk = () => {
    const formData = form.getFieldsValue();
    addDocument("rooms", { ...formData, members: [user.uid] });
    setIsAddRoomModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsAddRoomModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Tạo phòng"
        open={isAddRoomModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!submittable}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item<FieldType>
            label="Tên phòng"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên phòng của bạn!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Mô tả" name="description">
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddRoomModal;
