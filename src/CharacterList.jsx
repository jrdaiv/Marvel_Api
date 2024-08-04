import React, { useEffect, useState } from 'react'
import md5 from 'md5'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../src/Styles/Styles.css'



const publicKey = '526f1d1c200a0bd9ca82d3bab24ef798';
const privateKey = 'db911c4a3cd50f8cb3b220f589d1fc7a398f61f8';
const ts = new Date().getTime().toString();
const hash = md5(ts + privateKey + publicKey);

export default function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                setCharacters(response.data.data.results);
            } catch (error) {
                setError('Error fetching characters');
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    const handleCharacterClick = (id) => {
        navigate(`/character/${id}`);
    }
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="character-grid">
            {characters.map((character) => (
                <div key={character.id} className="character-card" onClick={() => handleCharacterClick(character.id)}>
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                    <h3>{character.name}</h3>
                </div>
            ))}
        </div>
    );
}




