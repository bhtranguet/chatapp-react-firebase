const todoList = [
  { id: 1, title: "First todo" },
  { id: 2, title: "Second todo" },
  { id: 3, title: "Third todo" },
  { id: 4, title: "Fourth todo" },
  { id: 5, title: "Fifth todo" },
  { id: 6, title: "Sixth todo" },
  { id: 7, title: "Seventh todo" },
  { id: 8, title: "Eighth todo" },
  { id: 9, title: "Ninth todo" },
  { id: 10, title: "Tenth todo" },
  { id: 11, title: "Eleventh todo" },
  { id: 12, title: "Twelfth todo" },
  { id: 13, title: "Thirteenth todo" },
  { id: 14, title: "Fourteenth todo" },
  { id: 15, title: "Fifteenth todo" },
  { id: 16, title: "Sixteenth todo" },
  { id: 17, title: "Seventeenth todo" },
  { id: 18, title: "Eighteenth todo" },
  { id: 19, title: "Nineteenth todo" },
  { id: 20, title: "Twentieth todo" },
];

export const fetchAllTodoList = async () => {
  return todoList;
};

export const addTodo = async ({ title }: { title: string }) => {
  const newTodo = {
    id: todoList[todoList.length - 1].id + 1,
    title,
  };
  todoList.push(newTodo);
  return newTodo;
};
