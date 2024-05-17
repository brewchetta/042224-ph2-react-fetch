import { useEffect, useState } from 'react'
import MemeCard from './MemeCard'
import MemeForm from './MemeForm'

function MemesContainer() {

    const URL = "http://localhost:3000/memes"
    const [memes, setMemes] = useState([])

    useEffect(() => {
        fetch(URL)
        .then(res => res.json())
        .then(data => setMemes(data))
        .catch(err => console.warn(err))
    }, []) // [] --> depedency array

    function updateMeme(updatedMeme) {
        const updatedMemesArray = memes.map(meme => {
            if (meme.id !== updatedMeme.id) {
                return meme
            } else {
                return updatedMeme
            }
        })
        setMemes(updatedMemesArray)
    }

    function deleteMeme(id) {
        const updatedMemesArray = memes.filter(meme => meme.id !== id)
        setMemes(updatedMemesArray)
    }

    const mappedCards = memes.map(m => <MemeCard key={m.id} meme={m} updateMeme={updateMeme} deleteMeme={deleteMeme} />)

    return (
        <div>

            <MemeForm memes={memes} setMemes={setMemes} />

            { mappedCards }

        </div>
    )

}

export default MemesContainer