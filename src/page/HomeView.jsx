import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import TitleHead from "../components/TitleHead";
import LoadingSpinner from "../components/LoadingSpinner";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const HomeView = () => {
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

    const handleSubmit = async (event) => {
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
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Todo berhasil diperbarui.',
                    confirmButtonText: 'OK'
                });
            } else {
                const newTodo = {
                    id: Date.now(),
                    title,
                    body,
                    isComplete: false,
                    createdAt: new Date().toLocaleString(), 
                    completedAt: null
                };
                const updatedList = [...todoList, newTodo];
                setTodoList(updatedList);
                saveTodos(updatedList);
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Todo berhasil ditambahkan.',
                    confirmButtonText: 'OK'
                });
            }
            setTitle("");
            setBody("");
        } catch (error) {
            console.error("Error adding/updating todo:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan!',
                text: 'Gagal menambahkan/memperbarui todo.',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    const changeStatus = async (id) => {
        setLoading(true);
        try {
            const updatedList = todoList.map(todo => 
                todo.id === id ? { 
                    ...todo, 
                    isComplete: !todo.isComplete,
                    completedAt: !todo.isComplete ? new Date().toLocaleString() : null
                } : todo
            );
            setTodoList(updatedList);
            saveTodos(updatedList);
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Todo berhasil di selesaikan.',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error("Error updating todo status:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan!',
                text: 'Gagal mengubah status todo.',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id) => {
        setLoading(true);
        try {
            await Swal.fire({
                title: 'Konfirmasi Hapus',
                text: 'Apakah Anda yakin ingin menghapus todo ini?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Hapus',
                cancelButtonText: 'Batal'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const updatedList = todoList.filter(todo => todo.id !== id);
                    setTodoList(updatedList);
                    saveTodos(updatedList);
                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'Todo berhasil dihapus.',
                        confirmButtonText: 'OK'
                    });
                }
            });
        } catch (error) {
            console.error("Error deleting todo:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan!',
                text: 'Gagal menghapus todo.',
                confirmButtonText: 'OK'
            });
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
                <TodoForm 
                    title={title}
                    body={body}
                    titleError={titleError}
                    bodyError={bodyError}
                    editTodo={editTodo}
                    onSubmit={handleSubmit}
                    onTitleChange={setTitle}
                    onBodyChange={setBody}
                    onCancelEdit={cancelEdit}
                />
                <TodoList 
                    todos={todoList}
                    onEdit={startEdit}
                    onDelete={deleteTodo}
                    onChangeStatus={changeStatus}
                />
            </div>
        </>
    );
};

export default HomeView;
