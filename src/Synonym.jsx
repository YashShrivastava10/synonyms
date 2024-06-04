import "./synonm.css"
import { ShowSynonym } from './components/ShowSynonym';
import { Skeleton } from './components/Skeleton';
import { useSynonyms } from "./hooks/useSynonyms";

function Synonym() {

  const { word, synonyms, handleChange, submit, currentSynonyms, reset } = useSynonyms()
  
  return (
    <div className='main'>

      <form onSubmit={(e) => submit(e, word)} className='form'>
        <input id="word" placeholder="Enter a word" value={word} onChange={handleChange}></input>
        <button className="submit-btn btn" type="submit" disabled={word.trim() === ""}>Submit</button>
        <button className="reset-btn btn" type="button" onClick={reset} disabled={word.trim() === ""}>Reset</button>
      </form>

      <div className='synonyms'>

        <div>
          {synonyms && synonyms.length > 0 && <b>Synonms of {word} are: </b>}
        </div>
        
        <div>
          <ul>
            {!synonyms && Array.from({ length: 5 }, (_, index) => <Skeleton key={index} /> )}

            {synonyms && synonyms.map(syn => <ShowSynonym key={syn.score} method={currentSynonyms} syn={syn} />
          )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Synonym;