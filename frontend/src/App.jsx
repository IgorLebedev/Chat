import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/notFound.jsx';
import MainPage from './components/mainPage.jsx';
import Login from './components/login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
