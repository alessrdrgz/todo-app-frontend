import { Button, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/AddTask.css";
import TodoApiRequests from "../tools/TodoApiRequests";

interface FormValues {
  name: string;
  description: string;
  tag: string;
}

export default function AddTask() {
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const onFinish = (values: FormValues) => {
    TodoApiRequests.createTodo({ ...values }).then((r) => {
      if (!Object.keys(r).includes("message")) {
        setConfirmModal(true);
      }
    });
  };

  const handleOkModal = () => {
    setConfirmModal(false);
    form.resetFields();
  };
  const handleCancelModal = () => navigate("/");

  return (
    <>
      <section className="add-task-container">
        <Typography.Title>{t("add-task", { ns: "add-task" })}</Typography.Title>
        <section className="add-task-form">
          <Form
            form={form}
            name="add-task"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            autoComplete=""
          >
            <Form.Item
              label={t("name")}
              name="name"
              rules={[
                {
                  required: true,
                  message: t("form-name-required", { ns: "add-task" }),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label={t("description")}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input.TextArea size="large" maxLength={200} showCount />
            </Form.Item>

            <Form.Item label={t("tag")} name="tag">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 12 }}>
              <Button type="ghost" onClick={() => navigate("/")}>
                {t("cancel")}
              </Button>
              <Button type="primary" htmlType="submit">
                {t("submit")}
              </Button>
            </Form.Item>
          </Form>
        </section>
      </section>
      <Modal
        title={t("added-task-msg", { ns: "add-task" })}
        visible={confirmModal}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
        cancelText={t("cancel")}
      >
        <Typography.Text>
          {t("add-another-task", { ns: "add-task" })}
        </Typography.Text>
      </Modal>
    </>
  );
}
