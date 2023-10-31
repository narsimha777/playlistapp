import React, { useState, useEffect } from 'react';
import spotify from './Playlist.mjs';
import '../App.css';
import Submit from './Submit.mjs';

function SearchResult(props) {
  const [data, setData] = useState([]);
  const [playlistdata,setplaylistdata] = useState([]);
  const [trackname,setTrackname] = useState('');
  const [userid,setUserid] = useState('');
  const [uridata,setUridata] = useState([]);
  const playlist = {
    name: props.heading,
    description: '',
    public:false
  };

  const toke = spotify.get_Accesstoken();

  function addele(e){
      if(playlistdata.includes(e)){
        return;
      }
      setplaylistdata((prev)=>[...prev,e]);
      setUridata((prev)=>[...prev,e.id]);
  }

  function removeele(e){
    setplaylistdata((prev) => prev.filter(item => item !== e));
    setUridata((prev)=>prev.filter(ele=>ele.id!==prev));
  }

  function handleSubmit(e){
    e.preventDefault();
    props.clicked(trackname);
    setTrackname('');
  } 
  useEffect(() => {
    const search = async () => {
      const res = await spotify.search(props.name);
      setData(res || []); 
    };
    search();
  }, [props.name]);
  
  return (
    <div>
      <div>
       <ul className='ulplaylist'>
        {data.map((ele) => (
          <li key={ele.id} className="playlist" onClick={()=>addele(ele)} >
            Song-Name: {ele.name} || Artist: {ele.artists}          
          </li>
        ))}
       </ul>
      </div>
      <div>
       <h1>My Playlist!!</h1>
       <form className='searchbartracklist' onSubmit={handleSubmit}>  
        <div className="input-group input-group-lg">  
          <input type="text" className="form-control" value={trackname} placeholder='Enter playlistname'
          onChange={(e)=>setTrackname(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
         <button type="submit" className="btn btn-primary">Set</button>
        </div>
       </form>
       <h2>{props.heading}</h2>
       <ul>
        {playlistdata.map((ele)=>(
          <li key={ele.id} className='tracklist' onClick={()=>removeele(ele)} >
            Song-Name: {ele.name} || Artist: {ele.artists}
          </li>
        ))}
       </ul>
      </div> 
      <input type='text' value={userid} onChange={(e)=>setUserid(e.target.value)} />
      <Submit data={playlist} userid={userid} />
    </div>
  );
}

export default SearchResult;

