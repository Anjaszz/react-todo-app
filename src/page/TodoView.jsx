import TitleHead from "../components/TitleHead";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const TodoView = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState('');
    const [bodyError, setBodyError] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [editTodo, setEditTodo] = useState(null); // State untuk edit todo
    const [loading, setLoading] = useState(false); // State for loading

    const apiUrl = import.meta.env.VITE_API_TODO; // Access API URL from environment variables

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true); // Set loading to true
        try {
            const response = await fetch(`${apiUrl}/todos`);
            const data = await response.json();
            setTodoList(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Reset errors
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
        
        setLoading(true); // Set loading to true
        try {
            if (editTodo) {
                console.log('Submitting todo:', { title, body, isComplete: editTodo.isComplete });
                const response = await fetch(`${apiUrl}/todos/${editTodo.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, body, isComplete: editTodo.isComplete }),
                });
        
                if (response.ok) {
                    const updatedTodo = await response.json();
                    console.log('Updated todo:', updatedTodo);
                    setTodoList(todoList.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
                    setEditTodo(null); // Reset edit mode
                } else {
                    console.error('Failed to update todo');
                }
            } else {
                const response = await fetch(`${apiUrl}/todos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, body }),
                });
                const newTodo = await response.json();
                setTodoList([...todoList, newTodo]);
            }
            setTitle("");
            setBody("");
        } catch (error) {
            console.error("Error adding/updating todo:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const inputTitle = (event) => {
        setTitle(event.target.value);
    };

    const inputBody = (event) => {
        setBody(event.target.value);
    };

    const changeStatus = async (id) => {
        const todoToUpdate = todoList.find(todo => todo.id === id);
        if (!todoToUpdate) {
            console.error('Todo not found');
            return;
        }
    
        setLoading(true); // Set loading to true
        try {
            const response = await fetch(`${apiUrl}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: todoToUpdate.title,
                    body: todoToUpdate.body,
                    isComplete: true
                }),
            });
    
            if (response.ok) {
                const updatedTodo = await response.json();
                setTodoList(todoList.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
            } else {
                console.error('Failed to update todo');
            }
        } catch (error) {
            console.error("Error updating todo status:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const deleteTodo = async (id) => {
        setLoading(true); // Set loading to true
        try {
            await fetch(`${apiUrl}/todos/${id}`, {
                method: "DELETE",
            });
            setTodoList(todoList.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        } finally {
            setLoading(false); // Set loading to false
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

    if (loading) return <LoadingSpinner />; // Show loading spinner while loading

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
                            <input type="submit" className="inline-block py-2 px-6 rounded-lg bg-[#7747FF] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200" />
                            {editTodo && (
                                <button type="button" onClick={cancelEdit} className="ml-4 inline-block py-2 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold leading-loose transition duration-200">
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
