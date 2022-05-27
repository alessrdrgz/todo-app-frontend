import { Button, List } from "antd";
import "../styles/TodoList.css";
import TodoListItem from "./TodoListItem";
import { TodoItem } from "../interfaces/TodoItem";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TodoListProps {
  selectedId: number | null;
  todos: TodoItem[];
}

export default function TodoList({ selectedId, todos }: TodoListProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <List
        className="bordered-list"
        id="todo-list"
        bordered
        header={
          <Button type="primary" onClick={() => navigate("/add-task")}>
            {t("add-task", { ns: "add-task" })}
          </Button>
        }
        dataSource={todos}
        renderItem={(item) => (
          <TodoListItem
            item={item}
            key={item.idTodo}
            isSelected={item.idTodo === selectedId}
            index={todos.indexOf(item)}
            animate={selectedId ? false : true}
          />
        )}
      />
    </>
  );
}
