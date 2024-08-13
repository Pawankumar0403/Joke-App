import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoke } from "./jokeSlice";


function App() {

  const [category, setcategory] = useState()
  const [btn, setbtn] = useState("Random")
  const { joke, loading } = useSelector((state) => state.joke);


  function handleChange(evt) {
    const value = evt.target.value;
    setcategory(value);
    setbtn(value ? value : "Random");
  }

  const Dispatch = useDispatch()
  function handleFetch() {
    Dispatch(fetchJoke(category))
  }

  return (
    <div className="joke">
      {loading ? <h3>Loading.......</h3> :
        <div className="joke-joke">
          <div className="inbtn">
            <input type="text" onChange={handleChange} placeholder="Search Random Jokes" />
            <button onClick={handleFetch} className="btn">Get {btn}</button><br />
          </div>
          <div>
            <h3>{joke}</h3>
          </div>
        </div>}
    </div>
  );
}

export default App;
