import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setStocks] = useState<Array<Schema["Stock"]["type"]>>([]);

  useEffect(() => {
    client.models.Stock.observeQuery().subscribe({
      next: (data) => setStocks([...data.items]),
    });
  }, []);

  function createStocks() {
    client.models.Stock.create({ content: window.prompt("Stock content") });
  }

  return (
    <main>
      <h1>My stocks</h1>
      <button onClick={createStocks}>+ new</button>
      <ul>
        {todos.map((stock) => (
          <li key={stock.id}>{stock.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new stock.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
