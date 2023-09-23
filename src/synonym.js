import React, { useState } from 'react';
import "./synonm.css"

function Synonym() {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);

  const getSynonym = (word) => {
    setSynonyms(undefined)
    setTimeout(() => {
      fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then(response => response.json())
      .then(data => setSynonyms(data))
      .catch(error => {setSynonyms([]); alert("Some error occured")})
    }, 3000)
  }

  const submit = (e, word) => {
    e.preventDefault()
    getSynonym(word)
  }

  const currentSynonyms = (synonm) => {
    setWord(synonm)
    getSynonym(synonm)
  }

  return (
    <div className='main'>
      <form onSubmit={(e) => submit(e, word)} className='form'>
        <input id="word" placeholder="Enter a word" value={word} onChange={(e) => setWord(e.target.value)}></input>
        <button className="submit-btn btn">Submit</button>
        <button className="reset-btn btn" onClick={() => {setWord(""); setSynonyms([])}}>Reset</button>
      </form>
      <div className='synonyms'>
        <div>
          {synonyms && synonyms.length > 0 && <b>Synonms of {word} are: </b>}
        </div>
        <div>
          <ul>
            {!synonyms && Array.from({ length: 5 }, (_, index) => (
              <li key={index} className='skeleton' />
            ))}
            {synonyms && synonyms.map(syn => <li key={syn.score} onClick={(e) => currentSynonyms(syn.word)}>{syn.word}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Synonym;