import React from 'react';
import spotify from './Playlist.mjs';

const link = await spotify.authenticate();

function  Submit(props){
    return (
      <div>
        <a href={link}><button>Create Playlist</button></a>
      </div>
    );
};

export default Submit;
