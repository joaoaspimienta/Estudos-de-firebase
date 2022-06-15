import { useEffect, useState } from "react";
import firebase from "./firebaseConnection";
import "./style.css";

function App() {
  const [idPost, setIdPost] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [userLogged, setUserLogged] = useState("");

  useEffect(() => {
    async function loadPosts() {
      await firebase
        .firestore()
        .collection("posts")
        .onSnapshot((doc) => {
          let meusPosts = [];

          doc.forEach((item) => {
            meusPosts.push({
              id: item.id,
              titulo: item.data().titulo,
              autor: item.data().autor,
            });
          });
          setPosts(meusPosts);
        });
    }
    loadPosts();
  }, []);

  useEffect(() => {
    async function checkLogin() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(true);
          setUserLogged({
            uid: user.uid,
            email: user.email,
          });
        } else {
          setUser(false);
          setUserLogged({});
        }
      });
    }

    checkLogin();
  }, []);

  async function handleAdd() {
    await firebase
      .firestore()
      .collection("posts")
      .add({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        alert("Dados cadastrados com sucesso!");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        alert("GEROU ALGUM ERRO: " + error);
      });
  }
  /*  async function handleAdd(){    
    await firebase.firestore().collection('posts')
    .doc('12345')
    .set({
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      alert('Dados cadastrados com sucesso!')
    })
    .catch((error)=>{
      alert('GEROU ALGUM ERRO: ' + error)
    })
  } */

  async function buscaPost() {
    await firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(lista);
      })
      .catch();

    /*     await firebase.firestore().collection('posts')
    .doc('tuTKEq4Gtc2iEI9BXEGe')
    .get()
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo)
      setAutor(snapshot.data().autor)
    })
    .catch(()=>{
      console.log('Deu algum erro')
    }) */
  }

  async function editarPost() {
    await firebase
      .firestore()
      .collection("posts")
      .doc(idPost)
      .update({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        console.log("dados editados com sucesso");
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch(() => {
        console.log("deu merda");
      });
  }

  async function excluirPost(id) {
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("este post foi excluido");
      });
  }

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

  async function fazerLogin() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        console.log("Erro ao fazer o login" + error);
      });
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>
      {user && (
        <div>
          <strong>Seja bem vindo! (Você está logado!)</strong> <br />
          <span>
            {userLogged.uid} - {userLogged.email}
          </span>{" "}
          <br /> <br />
        </div>
      )}
      <br />
      <div className="container">
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
        <button onClick={fazerLogin}>Fazer Login</button>
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logout}>Sair da conta!</button>
      </div>
      <hr /> <br />
      <h2>Banco de dados:</h2>
      <div className="container">
        <label>ID:</label>
        <input
          type="text"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />
        <label>Titulo: </label>
        <textarea
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Autor: </label>
        <textarea
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
