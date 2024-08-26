/* eslint-disable react/prop-types */
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const TodoItem = ({ todo, onChangeStatus, onEdit, onDelete }) => {
    return (
        <div className="border rounded-lg p-4 bg-yellow-200 shadow-md flex flex-col w-full">
            <div className="flex-grow">
                <h2 className="text-xl font-semibold break-words">{todo.title}</h2>
                <p className="break-words">{todo.body}</p>
                <p className="text-sm text-gray-500">Dibuat pada: {todo.createdAt}</p>
                {todo.isComplete && (
                    <p className="text-sm text-gray-500">Diselesaikan pada: {todo.completedAt}</p>
                )}
            </div>
            <div className="mt-4 flex justify-between items-center">
                {todo.isComplete ? (
                    <span className="text-green-600 font-bold">Selesai</span>
                ) : (
                    <button onClick={() => onChangeStatus(todo.id)} className="font-bold border rounded-lg bg-green-500 hover:bg-green-600 p-2 text-white flex items-center space-x-1">
                        <FaCheck />
                        <span>Selesaikan</span>
                    </button>
                )}
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(todo)} className="font-bold border rounded-lg bg-blue-500 hover:bg-blue-600 p-2 text-white flex items-center space-x-1">
                        <FaEdit />
                        <span>Edit</span>
                    </button>
                    <button onClick={() => onDelete(todo.id)} className="font-bold border rounded-lg bg-red-500 hover:bg-red-600 p-2 text-white flex items-center space-x-1">
                        <FaTrash />
                        <span>Hapus</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
