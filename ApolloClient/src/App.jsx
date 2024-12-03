import {
  BrowserRouter as Router,
  Routes, Route, useNavigate,
} from 'react-router-dom'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm';
import { useState, useEffect } from 'react';

const App = () => {
  const padding = {
    padding: 5,
    border: '1px solid black',
  }

  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('user-token');
    setToken(savedToken);
  }, []);

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  const NavigationButtons = () => {
    const navigate = useNavigate()

    return (
      <div>
        <button style={padding} onClick={() => navigate('/')}>Authors</button>
        <button style={padding} onClick={() => navigate('/books')}>Books</button>
        {token && <button style={padding} onClick={() => navigate('/addbooks')}>Add Book</button>}
        {token === null ?
          <button style={padding} onClick={() => navigate('/login')}>Login</button>
          : <button style={padding} onClick={logout}>Log out</button>}
      </div>
    )
  }

  return (
    <Router>
      <NavigationButtons />
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        {token && <Route path="/addbooks" element={<NewBook />} />}
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
