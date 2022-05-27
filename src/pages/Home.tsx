import { Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import TodoItemDisplay from "../components/TodoItemDisplay";
import TodoList from "../components/TodoList";
import { TodoItem } from "../interfaces/TodoItem";
import "../styles/Home.css";
import TodoApiRequests from "../tools/TodoApiRequests";
interface HomeProps {
  completed?: boolean;
}

export default function Home({ completed }: HomeProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    TodoApiRequests.search({ completed: completed ? true : false }).then(
      (r) => {
        if (Array.isArray(r)) {
          setTodos(r);
        }
      }
    );
  }, [completed]);

  return (
    <section className="home-container">
      <Typography.Title>{t("title", { ns: "home" })}</Typography.Title>
      <TodoList selectedId={id ? +id : null} todos={todos} />
      {id && (
        <AnimatePresence>
          <TodoItemDisplay id={+id} key="item" />
        </AnimatePresence>
      )}
    </section>
  );
}
