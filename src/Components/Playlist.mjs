const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const authOptions = {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'grant_type=client_credentials',
};

const tokenUrl = 'https://accounts.spotify.com/api/token';

const get_Data=async()=>{
    const res=await fetch(tokenUrl, authOptions)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to obtain access token');
    }
  })
  .catch((error) => {
    console.error('Error: ', error);
  });
  return res;
}
const tok = await get_Data();

const spotify={
    get_Accesstoken(){
        return tok.access_token;
    },
    async search(term){
        const token = this.get_Accesstoken();
        const base_url = "https://api.spotify.com/v1/search";
        const query = `?q=${term}&type=track`
        const url = base_url+query;
        return await fetch(url,{
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }).then((response)=>{
            return response.json();
        }).then((jsonresponse)=>{
            if(!jsonresponse){
                return [];
            }
            return jsonresponse.tracks.items.map(track=>({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
        .catch((error) => {
            console.error('Error: ', error);
          });
    },
    async  getUserData(userid) {
      const token = `Bearer ${this.get_Accesstoken()}`; 
      const url = `https://api.spotify.com/v1/users/${userid}`;
    
      return await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        }).then((response)=>{
          return response.json();
        }).catch( ()=> new Error('Failed to fetch user data'));
    },
    
    async createPlaylist() {
      const token = `Bearer ${this.get_Accesstoken()}`; 
      const url = 'https://api.spotify.com/v1/users/31umiepxerl5lvnqwj22674y6jgm/playlists';
    
      const playlistData = {
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false
    };
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playlistData),
        });
    
        if (!response.ok) {
          const errorData = await response.json(); 
          throw new Error(`Failed to create a new playlist. Spotify error: ${errorData.error.message}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('An error occurred:', error);
        throw error; 
      }
    }
    ,
    async authenticate(){
      const REDIRECT_URI = 'http://localhost:3000/playlistapp'; 

      const scopes = ['streaming']; 
      const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join('%20')}&response_type=token`;
      
      return loginUrl;
    }
}


export default spotify;





