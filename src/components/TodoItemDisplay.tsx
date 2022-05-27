import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TodoItem } from "../interfaces/TodoItem";
import "../styles/TodoItemDisplay.css";
import TodoApiRequests from "../tools/TodoApiRequests";

interface TodoItemDisplayProps {
  id: number;
}

interface LocationState {
  prevPath?: string;
}

interface FormValues {
  name: string;
  description: string;
  tag: string;
  date: Date;
  completed: boolean;
}

export default function TodoItemDisplay({ id }: TodoItemDisplayProps) {
  const [todo, setTodo] = useState<TodoItem>();
  const [edit, setEdit] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const location = useLocation();
  const locState = location.state as LocationState;
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { t } = useTranslation();

  useEffect(() => {
    TodoApiRequests.getTodoById(id).then((r) => {
      if (!Object.keys(r).includes("message")) {
        setTodo(r);
        setChecked(r.completed);
        form.setFieldsValue({
          name: r?.name,
          description: r?.description,
          tag: r?.tag,
          date: r?.date,
        });
      }
    });
  }, [id, form]);

  const handleSave = () => {
    const values: FormValues = form.getFieldsValue();
    values.completed = checked;
    TodoApiRequests.update(id, values).then((r) => {
      navigate(locState?.prevPath ?? "/");
    });
  };

  const handleCancelEdit = () => {
    setEdit(false);
    form.setFieldsValue({
      name: todo?.name,
      description: todo?.description,
      tag: todo?.tag,
    });
    if (todo?.completed) setChecked(todo.completed);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
      >
        <Link to={locState.prevPath ? locState.prevPath : "/"} />
      </motion.div>

      <div className="todo-content-container open">
        <motion.div className="todo-content" layoutId={`todo-container-${id}`}>
          <Form
            form={form}
            name="edit-task"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 12 }}
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
              <Input disabled={!edit} />
            </Form.Item>

            <Form.Item
              name="description"
              label={t("description")}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Input.TextArea
                size="large"
                maxLength={200}
                showCount
                disabled={!edit}
              />
            </Form.Item>

            <Form.Item label={t("tag")} name="tag">
              <Input disabled={!edit} />
            </Form.Item>

            <Form.Item label={t("date")} name="date">
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label={t("completed")}
              name="completed"
              className="completed-check"
            >
              <Checkbox
                disabled={!edit}
                style={{ marginTop: "30px" }}
                checked={checked}
                onClick={() => setChecked(!checked)}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 12 }}>
              {edit ? (
                <>
                  <Button type="ghost" onClick={() => handleCancelEdit()}>
                    {t("cancel")}
                  </Button>
                  <Button type="primary" onClick={() => setEdit(false)}>
                    OK
                  </Button>
                </>
              ) : (
                <>
                  <Button type="ghost" onClick={() => setEdit(true)}>
                    {t("edit")}
                  </Button>
                  <Button type="primary" onClick={() => handleSave()}>
                    {t("save")}
                  </Button>
                </>
              )}
            </Form.Item>
          </Form>
          <CloseOutlined
            className="close-icon"
            onClick={() =>
              navigate(locState.prevPath ? locState.prevPath : "/")
            }
          />
        </motion.div>
      </div>
    </>
  );
}
