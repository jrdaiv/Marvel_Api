// CharacterDetail.js
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import md5 from 'md5';
import axios from 'axios';
import '../src/Styles/Styles.css'




const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const publicKey = '526f1d1c200a0bd9ca82d3bab24ef798';
  const privateKey = 'db911c4a3cd50f8cb3b220f589d1fc7a398f61f8';
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + privateKey + publicKey);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
        );
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    if (id) {
      fetchCharacterDetail();
    }
  }, [id]);

  if (!character) {
    return <div>Select a character to see details</div>;
  }

  return (
    <div className='card' style={{width: '60rem'}}>
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} className='card-img-top' alt={character.name} />
      <div className="card-body">
        <h3 className="card-title">{character.name}</h3>
        <p className="card-text">{character.description || 'No description available.'}</p>
      </div>
      <ul className="list-group">
        <li className='list-group-item'>Comics: {character.comics.available}</li>
        <li className='list-group-item'>Series: {character.series.available}</li>
        <li className='list-group-item'>Stories: {character.stories.available}</li>
        <li className='list-group-item'>Events: {character.events.available}</li>
        <li className='list-group-item'>URL: {character.urls[0].url}</li>
      </ul>
    </div>
  );
};


export default CharacterDetail;
