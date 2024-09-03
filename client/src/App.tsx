import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    axios.get('http://localhost:3000/ping').then(response => {
      console.log(response.data);
    })
  }, [])
  return (
    <div>Hello world</div>
  )
}

export default App
