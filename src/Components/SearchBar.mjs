import React, { useState } from 'react';
import '../App.css';

function Searchbar(props) {
    const [name, setName] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        props.clicked(name);
        setName('');
    }

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className="input-group input-group-lg">
                    <input type="text" className="form-control" value={name} placeholder='Enter name of song, artist, etc'
                        onChange={(e) => setName(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>
        </div>
    );
}

export default Searchbar;
