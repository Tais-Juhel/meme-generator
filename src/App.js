import './App.scss';
import MemesList from './vues/MemesList/MemesList';
import { Routes, Route } from 'react-router-dom';
import MemeEdit from './vues/MemeEdit/MemeEdit';
import MemeGenerate from './vues/MemeGenerate/MemeGenerate';

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<MemesList/>} />
        <Route path="/:id" element={<MemeEdit/>} />
        <Route path="/generate" element={<MemeGenerate/>} />
      </Routes>
    </div>
  )
}

export default App