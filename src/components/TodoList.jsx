/* eslint-disable react/prop-types */
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onEdit, onDelete, onChangeStatus }) => {
    return (
        <div className="border px-3 py-3 bg-yellow-300 rounded-lg w-full">
            <h1 className="text-3xl text-center my-3 font-semibold">List Todo</h1>
            <div className="space-y-4">
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onChangeStatus={onChangeStatus}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-600 my-40">
                        <h3>List Todo masih kosong</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
