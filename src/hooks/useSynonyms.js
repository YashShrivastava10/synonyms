import { useState } from "react";

export const useSynonyms = () => {

  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);

  const handleChange = (e) => {
    setSynonyms(prevState => {
      const { value } = e.target
      setWord(value)
      return []
    })
  }

  const getSynonym = (word) => {

    setSynonyms(undefined)

    setTimeout(() => {
      fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then(response => {
        if(!response.ok) throw Error
        return response.json()
      })
      .then(data => {

        setSynonyms(data)

        if(data.length === 0) {
          alert(`Synonym(s) for ${word} is/are not available`)
          setWord("")
          document.getElementById("word").focus()
        }
      })
      .catch(error => {
        setSynonyms([])
        alert("Some error occured")
        console.log(error);
      })
    }, 1000)
  }

  const submit = (e, word) => {
    e.preventDefault()
    getSynonym(word)
  }

  const currentSynonyms = (e, synonm) => {
    e.preventDefault()
    setWord(synonm)
    getSynonym(synonm)
  }

  const reset = () => {
    setWord(""); 
    setSynonyms([])
  }

  return { word, synonyms, handleChange, submit, currentSynonyms, reset } 
}
