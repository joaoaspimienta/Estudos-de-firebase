import { useState } from "react";
import firebase from "./firebaseConnection";
import "./style.css";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [nome, setNome] = useState("");

  async function novoUsuario() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("senha muito fraca");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Esse email ja existe!");
        }
      });
  }

  async function logout() {
    await firebase.auth().signOut();
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>
      <br />
      <div className="container">
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logout}>Sair da conta!</button>
      </div>
    </div>
  );
}

export default App;
