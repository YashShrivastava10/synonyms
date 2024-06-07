import { useState } from "react";

export const useSynonyms = () => {

  const [word, setWord] = useState<string>('');
  const [synonyms, setSynonyms] = useState<[] | undefined>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSynonyms(prevState => {
      const { value } = e.target
      setWord(value)
      return []
    })
  }

  const getSynonym = (word: string) => {

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

  const submit = (e: React.FormEvent, word: string) => {
    e.preventDefault()
    getSynonym(word)
  }

  const currentSynonyms = (synonm: string) => {
    setWord(synonm)
    getSynonym(synonm)
  }

  const reset = () => {
    setWord(""); 
    setSynonyms([])
  }

  return { word, synonyms, handleChange, submit, currentSynonyms, reset } 
}
