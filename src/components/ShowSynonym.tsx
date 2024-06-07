type ShowSynoymProps = {
  method: (syn: string) => void,
  syn: {
    word: string;
    score: number;
  }; 
}

export const ShowSynonym = ({ method, syn}: ShowSynoymProps) => <li onClick={() => method(syn.word)}>{syn.word}</li>
