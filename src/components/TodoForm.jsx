/* eslint-disable react/prop-types */
const TodoForm = ({ title, body, titleError, bodyError, editTodo, onSubmit, onTitleChange, onBodyChange, onCancelEdit }) => {
  return (
      <div className="border p-10 bg-blue-100 rounded-lg border-blue-300">
          <h1 className="text-3xl text-center font-semibold my-3">{editTodo ? 'Edit Todo' : 'Tambah Todo'}</h1>
          <form onSubmit={onSubmit}>
              <div className="mb-6">
                  <label className="block mb-2 font-medium">Judul</label>
                  {titleError && (
                      <p className="text-red-600 text-sm mb-2">{titleError}</p>
                  )}
                  <input
                      placeholder="Judul todo"
                      onChange={(e) => onTitleChange(e.target.value)}
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
                      onChange={(e) => onBodyChange(e.target.value)}
                      value={body}
                      placeholder="Isi todo"
                      type="text"
                      className={`bg-gray-50 border rounded-lg w-full p-2 ${bodyError ? 'border-red-600' : 'border-gray-300'}`}
                  />
              </div>
              <div className="mb-6">
                  <input type="submit" className="w-1/2 inline-block py-2 px-6 rounded-lg bg-[#7747FF] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200" />
                  {editTodo && (
                      <button type="button" onClick={onCancelEdit} className="w-2/5 ml-4 inline-block py-2 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold leading-loose transition duration-200">
                          Batal
                      </button>
                  )}
              </div>
          </form>
      </div>
  );
};

export default TodoForm;
