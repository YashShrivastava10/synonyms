import React from 'react'

export const ShowSynonym = ({ method, syn}) => <li onClick={(e) => method(e, syn.word)}>{syn.word}</li>
