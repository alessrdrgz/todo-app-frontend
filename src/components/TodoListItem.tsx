import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Modal, Tooltip, Typography } from "antd";
import { motion } from "framer-motion";
import { MouseEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { TodoItem } from "../interfaces/TodoItem";
import "../styles/TodoListItem.css";
import TodoApiRequests from "../tools/TodoApiRequests";

interface TodoListItemProps {
  item: TodoItem;
  index: number;
  isSelected: boolean;
  animate: boolean;
}

export default function TodoListItem({
  item,
  index,
  isSelected,
  animate,
}: TodoListItemProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAnimate, setDeleteAnimate] = useState(false);
  const location = useLocation();

  const { t } = useTranslation();

  const handleDelete: MouseEventHandler = (e) => setDeleteModal(true);
  const handleOkDelete = () => {
    TodoApiRequests.deleteTodo(item.idTodo).then((r) => {
      if (!Object.keys(r).includes("message")) {
        setDeleteModal(false);
        setDeleteAnimate(true);
      }
    });
  };
  const handleCancelDelete = () => setDeleteModal(false);

  const MotionListItem = motion(List.Item);

  const handleCheck = (item: TodoItem) => {
    TodoApiRequests.update(item.idTodo, { completed: !item.completed }).then(
      (r) => {
        if (!Object.keys(r).includes("message")) {
          setDeleteAnimate(true);
        }
      }
    );
  };

  const MotionVariants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }: { delay: number }) => ({
      opacity: 1,
      transition: {
        delay,
        duration: 1,
      },
    }),
    deleted: {
      display: "none",
    },
  };
  return (
    <>
      <MotionListItem
        custom={{ delay: (index + 1) * 0.1 }}
        initial={deleteModal ? "visible" : animate ? "hidden" : false}
        animate={isSelected ? "hidden" : deleteAnimate ? "deleted" : "visible"}
        variants={MotionVariants}
      >
        <motion.div
          className="todo-content"
          layoutId={`todo-container-${item.idTodo}`}
        >
          {item.completed ? (
            <Tooltip title={t("not-done", { ns: "tooltips" })}>
              <CheckCircleOutlined
                className="uncheck-icon"
                style={{ color: "white" }}
                onClick={() => handleCheck(item)}
              />
            </Tooltip>
          ) : (
            <Tooltip title={t("done", { ns: "tooltips" })}>
              <CheckCircleOutlined
                className="check-icon"
                style={{ color: "white" }}
                onClick={() => handleCheck(item)}
              />
            </Tooltip>
          )}
          <div className="anchor-container">
            {item.completed ? (
              <Typography.Text style={{ textDecoration: "line-through" }}>
                {item.name}
              </Typography.Text>
            ) : (
              <Typography.Text>{item.name}</Typography.Text>
            )}
            <Tooltip title={t("details", { ns: "tooltips" })}>
              <Link
                to={`/id/${item.idTodo}`}
                state={{ prevPath: location.pathname }}
                className="todo-open-link"
              />
            </Tooltip>
          </div>
          <Typography.Text className="date" style={{ color: "gray" }}>
            {new Date(item.date).toLocaleDateString("es")}
          </Typography.Text>
          <Tooltip title={t("delete-task", { ns: "tooltips" })}>
            <DeleteOutlined className="delete-icon" onClick={handleDelete} />
          </Tooltip>
        </motion.div>
      </MotionListItem>
      <Modal
        title={`${t("delete-confirmation", { ns: "tooltips" })} - ${item.name}`}
        visible={deleteModal}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        cancelText={t("cancel")}
      >
        <Typography.Text>
          {t("delete-confirmation-text", { ns: "tooltips" })}
        </Typography.Text>
      </Modal>
    </>
  );
}
