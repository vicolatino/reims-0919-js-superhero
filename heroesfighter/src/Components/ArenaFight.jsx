import React from 'react';
import './ArenaFight.css';
import Card from './Card.jsx';
import { tsPropertySignature } from '@babel/types';

function ArenaFight ({ mycard, opponent, getResult,arene,getArena }) {

  return (
    <div className="arena_box" style ={{ background:`url(${arene[getArena()]})`}}>
      <div className="card_versus">
        <Card items={mycard} />
        <p className="versus_text">VS</p>
        <Card items={opponent} />
      </div>
      <div className="button_box">
        <button className="bonusButtonLightning" aria-label="Save" type="button" />
        <button className="bonusButtonBoxingGlove" aria-label="Save" type="button" />
        <button className="bonusButtonBook" aria-label="Save" type="button" />
      </div>
      <div className="fightButton_box">
        <button className="fightButton" type="button" onClick={getResult} >FIGHT</button>
      </div>
    </div>
  );
}


export default ArenaFight;
