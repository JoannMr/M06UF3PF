const { useState, useContext, createContext } = React;

// CONTEXT
const AppContext = createContext();

function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [theme, setTheme] = useState('light');
  const [newUser, setNewUser] = useState('');
  const [newTask, setNewTask] = useState('');

  const addUser = () => {
    if (!newUser.trim()) return;
    setUsers([...users, { name: newUser.trim(), tasks: [] }]);
    setNewUser('');
  };

  const selectUser = (index) => setSelectedUserIndex(index);
  const deselectUser = () => setSelectedUserIndex(null);

  const addTask = () => {
    if (selectedUserIndex === null || !newTask.trim()) return;
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].tasks.push({ text: newTask.trim(), completed: false });
    setUsers(updatedUsers);
    setNewTask('');
  };

  const toggleTask = (taskIndex) => {
    const updatedUsers = [...users];
    const task = updatedUsers[selectedUserIndex].tasks[taskIndex];
    task.completed = !task.completed;
    setUsers(updatedUsers);
  };

  const editTask = (taskIndex) => {
    const newText = prompt("Editar tarea:", users[selectedUserIndex].tasks[taskIndex].text);
    if (newText !== null && newText.trim() !== "") {
      const updatedUsers = [...users];
      updatedUsers[selectedUserIndex].tasks[taskIndex].text = newText.trim();
      setUsers(updatedUsers);
    }
  };

  const deleteTask = (taskIndex) => {
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].tasks.splice(taskIndex, 1);
    setUsers(updatedUsers);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        users,
        selectedUserIndex,
        selectUser,
        deselectUser,
        addUser,
        newUser,
        setNewUser,
        addTask,
        newTask,
        setNewTask,
        toggleTask,
        editTask,
        deleteTask,
        toggleTheme,
        theme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// COMPONENTES
function Sidebar() {
  const {
    users,
    selectedUserIndex,
    selectUser,
    deselectUser,
    addUser,
    newUser,
    setNewUser,
    toggleTheme
  } = useApp();

  const selectedUser = users[selectedUserIndex];

  return (
    <aside className="sidebar card">
      <h2>Usuarios</h2>
      <ul>
        {users.length === 0 ? (
          <p>No hay usuarios.</p>
        ) : (
          users.map((user, index) => (
            <li
              key={index}
              onClick={() => selectUser(index)}
              style={{ cursor: 'pointer', fontWeight: selectedUserIndex === index ? 'bold' : 'normal' }}
            >
              {user.name}
            </li>
          ))
        )}
      </ul>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Nuevo usuario..."
      />
      <button onClick={addUser}>Añadir Usuario</button>

      {selectedUserIndex !== null && (
        <div id="userInfo">
          <hr />
          <p>{selectedUser.name}</p>
          <p>
            Tareas: {selectedUser.tasks.filter((t) => t.completed).length} / {selectedUser.tasks.length} completadas
          </p>
          <button onClick={deselectUser}>Deseleccionar</button>
        </div>
      )}

      <button onClick={toggleTheme} style={{ marginTop: 'auto' }}>
        🌙/☀️ Tema
      </button>
    </aside>
  );
}

function Main() {
  const {
    users,
    selectedUserIndex,
    addTask,
    newTask,
    setNewTask,
    toggleTask,
    editTask,
    deleteTask
  } = useApp();

  const selectedUser = users[selectedUserIndex];

  return (
    <main className="main">
      <div className="card">
        <h1>{selectedUserIndex === null ? 'Selecciona un usuario' : `Tareas de ${selectedUser.name}`}</h1>

        {selectedUserIndex !== null && (
          <div id="taskSection">
            {selectedUser.tasks.length === 0 ? (
              <p>No hay tareas.</p>
            ) : (
              <ul>
                {selectedUser.tasks.map((task, index) => (
                  <li key={index} className={task.completed ? 'completed' : ''}>
                    <span onClick={() => toggleTask(index)}>{task.text}</span>
                    <div className="actions">
                      <button onClick={() => editTask(index)}>✏️</button>
                      <button onClick={() => deleteTask(index)}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nueva tarea..."
            />
            <button onClick={addTask}>Añadir Tarea</button>
          </div>
        )}
      </div>
    </main>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Sidebar />
        <Main />
      </div>
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
