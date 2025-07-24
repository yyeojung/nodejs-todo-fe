import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, onCompleteClick, onDeleteClick }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem
            key={item._id}
            text={item.task}
            isComplete={item.isComplete}
            onCompleteClick={() => onCompleteClick(item._id, item.isComplete)}
            onDeleteClick={() => onDeleteClick(item._id)}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
