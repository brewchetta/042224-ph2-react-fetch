import { useState } from 'react'

function MemeForm({ memes, setMemes }) {

    const URL = 'http://localhost:3000/memes'

    const [img_url, setImgURL] = useState('')
    const [caption, setCaption] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify( { img_url, caption, likes: 0 } )
            // body: JSON.stringify( { img_url: img_url, caption: caption, likes: 0 } )
        })
        .then(res => res.json())
        .then( newMeme => setMemes( [...memes, newMeme] ) )

        setImgURL('')
        setCaption('')
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="img_url">Image URL:</label>

            <input name="img_url" 
            type="text"
            onChange={e => setImgURL(e.target.value)}
            value={img_url}
            placeholder='type your image url here'
            />

            <label htmlFor="caption">Caption:</label>

            <input name="caption" 
            type="text"
            onChange={e => setCaption(e.target.value.toLowerCase())}
            value={caption}
            />

            <input type="submit" value="Add Meme" />

        </form>
    )

}

export default MemeForm