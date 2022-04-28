import { useState } from 'react';
import firebase from './firebaseConnection'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

  function handleAdd(){
    alert('clicou')
  }

  return (
    <div className="container">
      <h1>ReactJS + Firebase</h1><br/>
    </div>
  );
}

export default App;
