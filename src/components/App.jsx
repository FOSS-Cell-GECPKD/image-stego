import React, { useState } from 'react';
import { Button, Input, TextField } from '@material-ui/core';

import { loadImage, encode, decode } from '../steganography';


export default function App() {

  const [option, setOption] = useState('home');

  function handleClick(event) {
    const { name } = event.currentTarget;
    if (name === 'home') {
      setOption('home');
    } else if (name === 'encode') {
      setOption('encode');
    } else if (name === 'decode') {
      setOption('decode');
    }
  }

  return (
    <div>
      <h1>Image Steganography</h1>
      {option === 'home' && <Button name='encode' onClick={handleClick} variant="contained">Encode</Button>}
      {option === 'home' && <Button name='decode' onClick={handleClick} variant="contained">Decode</Button>}
      {option === 'encode' && <TextField variant="outlined" multiline type="text" id="secret" name="secret" placeholder="Enter secret message" />}
      {option !== 'home' && <Input onChange={loadImage} type="file" id="image" name="filename" />}
      {option === 'encode' && <Button onClick={encode} variant="contained">Encode</Button>}
      {option === 'decode' && <Button onClick={decode} variant="contained">Decode</Button>}
      {option !== 'home' && <Button name='home' onClick={handleClick} variant="contained">Return</Button>}
      <img id="encoded-image" alt='encoded output'></img>
      <canvas id="canvas"></canvas>
    </div>
  );
};
