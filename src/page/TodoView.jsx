import TitleHead from "../components/TitleHead";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const TodoView = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState('');
    const [bodyError, setBodyError] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [editTodo, setEditTodo] = useState(null); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        setLoading(true);
        try {
            const data = JSON.parse(localStorage.getItem('todos')) || [];
            setTodoList(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
       
        setTitleError('');
        setBodyError('');
        
        let isValid = true;
        
        if (title.length < 5) {
            setTitleError('Judul terlalu pendek');
            isValid = false;
        }
        
        if (body.length < 10) {
            setBodyError('Isi terlalu pendek');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        setLoading(true);
        try {
            if (editTodo) {
                const updatedTodo = { ...editTodo, title, body };
                const updatedList = todoList.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
                setTodoList(updatedList);
                saveTodos(updatedList);
                setEditTodo(null);
            } else {
                const newTodo = { id: Date.now(), title, body, isComplete: false };
                const updatedList = [...todoList, newTodo];
                setTodoList(updatedList);
                saveTodos(updatedList);
            }
            setTitle("");
            setBody("");
        } catch (error) {
            console.error("Error adding/updating todo:", error);
        } finally {
            setLoading(false);
        }
    };

    const inputTitle = (event) => {
        setTitle(event.target.value);
    };

    const inputBody = (event) => {
        setBody(event.target.value);
    };

    const changeStatus = (id) => {
        setLoading(true);
        try {
            const updatedList = todoList.map(todo => 
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            );
            setTodoList(updatedList);
            saveTodos(updatedList);
        } catch (error) {
            console.error("Error updating todo status:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = (id) => {
        setLoading(true);
        try {
            const updatedList = todoList.filter(todo => todo.id !== id);
            setTodoList(updatedList);
            saveTodos(updatedList);
        } catch (error) {
            console.error("Error deleting todo:", error);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (todo) => {
        setEditTodo(todo);
        setTitle(todo.title);
        setBody(todo.body);
    };

    const cancelEdit = () => {
        setEditTodo(null);
        setTitle("");
        setBody("");
    };

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <TitleHead title="My Todo App" />
            <div className="grid gap-6 mb-6 mt-8 w-full">
                {/* Tambah/Update Todo */}
                <div className="border p-10 bg-blue-100 rounded-lg border-blue-300">
                    <h1 className="text-3xl text-center font-semibold my-3">{editTodo ? 'Edit Todo' : 'Tambah Todo'}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 font-medium">Judul</label>
                            {titleError && (
                                <p className="text-red-600 text-sm mb-2">{titleError}</p>
                            )}
                            <input
                                placeholder="Judul todo"
                                onChange={inputTitle}
                                value={title}
                                type="text"
                                className={`bg-gray-50 border rounded-lg w-full p-2 ${titleError ? 'border-red-600' : 'border-gray-300'}`}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 font-medium">Isi Todo</label>
                            {bodyError && (
                                <p className="text-red-600 text-sm mb-2">{bodyError}</p>
                            )}
                            <input
                                onChange={inputBody}
                                value={body}
                                placeholder="Isi todo"
                                type="text"
                                className={`bg-gray-50 border rounded-lg w-full p-2 ${bodyError ? 'border-red-600' : 'border-gray-300'}`}
                            />
                        </div>
                        <div className="mb-6">
                            <input type="submit" className="w-1/2 inline-block py-2 px-6 rounded-lg bg-[#7747FF] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200" />
                            {editTodo && (
                                <button type="button" onClick={cancelEdit} className=" w-2/5 ml-4 inline-block py-2 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold leading-loose transition duration-200">
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Todo */}
                <div className="border px-3 py-3 bg-yellow-300 rounded-lg w-full">
                    <h1 className="text-3xl text-center my-3 font-semibold">List Todo</h1>
                    <div className="space-y-4">
                        {todoList.length > 0 ? (
                            todoList.map((todo) => (
                                <div key={todo.id} className="border rounded-lg p-4 bg-yellow-200 shadow-md flex flex-col w-full">
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold break-words">{todo.title}</h2>
                                        <p className="break-words">{todo.body}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        {todo.isComplete ? (
                                            <span className="text-green-600 font-bold">Selesai</span>
                                        ) : (
                                            <button onClick={() => changeStatus(todo.id)} className="font-bold border rounded-lg bg-green-500 hover:bg-green-600 p-2 text-white">
                                                Selesaikan
                                            </button>
                                        )}
                                        <div className="flex space-x-2">
                                            <button onClick={() => startEdit(todo)} className="font-bold border rounded-lg bg-blue-500 hover:bg-blue-600 p-2 text-white">Edit</button>
                                            <button onClick={() => deleteTodo(todo.id)} className="font-bold border rounded-lg bg-red-500 hover:bg-red-600 p-2 text-white">Hapus</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-600 my-40">
                                <h3>List Todo masih kosong</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoView;
