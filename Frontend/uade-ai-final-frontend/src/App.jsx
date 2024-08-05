import { useState, useEffect } from "react";
import './App.css'

function App() {
  const [ping, setPing] = useState("")

  useEffect(() => {
    getPing().then((data) => setPing(data));
  }, [])

  const getPing = () => {
    return fetch("http://localhost:4002/demo")
      .then((response) => response.text())
      .catch(error => console.log('error', error))
      .finally(() => console.log('promise is finished'));
  }

  return (
    <>
      <div>
        <p>
          la respuesta es:  {ping}
        </p>
      </div>
    </>
  )
}

export default App
