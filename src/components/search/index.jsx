import { useState } from "react";
import api from "../../services/api";

const Search = () => {
    const [clickSearch, setClickSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [word, setWord] = useState(null);

    function handleClick() {
        api.get(`${searchTerm}`).then((response) => {
            console.log('response: ', response.data);
            setWord(response.data[0])
        }).catch((err) => {
            console.error("ops! ocorreu um erro: " + err);
        })
        setClickSearch(true);
    }

    return (
        <main>
            <section>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button type="button" onClick={handleClick}>Search</button>
            </section>
            <section>
                {
                    clickSearch && word && (
                        <div>
                            <section>
                                <h1>{word.word}</h1>
                                <p>{word.phonetic}</p>
                            </section>
                            <section>
                                {word.phonetics.find(phonetic => phonetic.audio !== '') ? (
                                    <audio
                                        key={word.phonetics.find(phonetic => phonetic.audio !== '').audio}
                                        controls>
                                        <source src={word.phonetics.find(phonetic => phonetic.audio !== '').audio} type="audio/mpeg" />
                                        Seu navegador não suporta o elemento de áudio.
                                    </audio>
                                ) : (
                                    <p>Áudio não disponível</p>
                                )}
                            </section>
                            <section>
                                {word.meanings.map((items, index) => (
                                    <section key={index}>
                                        <div>
                                            <p>{items.partOfSpeech}</p>
                                        </div>
                                        <div>
                                            <p>Meaning</p>
                                        </div>
                                        <ul>
                                            {items.definitions.map((meanings, index) => (
                                                <li key={index}>
                                                    {meanings.definition}
                                                </li>
                                            ))}
                                        </ul>
                                        {
                                            items.synonyms.length > 0 && (
                                                <div>
                                                    <p>Synonyms:</p>
                                                    <ul>
                                                        {items.synonyms.map((synonym, index) => (
                                                            <li key={index}>{synonym}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </section>
                                ))}
                            </section>
                            <section>
                                Source
                                <a href={word.sourceUrls[0]}>{word.sourceUrls[0]}</a>
                            </section>
                        </div>
                    )
                }
            </section>
        </main>
    );
}

export default Search;