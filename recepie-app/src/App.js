import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Welcome from './Welcome';
import Recepie from './Recepie';
import RecepieName from './RecepieName';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome/>} />
        <Route exact path="/recepie/id/:id" element={<Recepie/>} />
        <Route exact path="/recepie/name/:name" element={<RecepieName/>} />
        <Route exact path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
