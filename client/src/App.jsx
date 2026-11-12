import { useEffect, useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/cartass")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        setErro(error.message);
      });
  }, []);

  if (erro) {
    return <h1>Erro: {erro}</h1>;
  }

  return (
    <div>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas.</p>
    </div>
  );
}

export default App;