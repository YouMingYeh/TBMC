import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Basic from './Components/Basic';
import Advanced from './Components/Advanced';
import 'tailwindcss/tailwind.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Basic />} />
        <Route path="/advanced" element={<Advanced />} />
      </Routes>
    </Router>
  );
}
