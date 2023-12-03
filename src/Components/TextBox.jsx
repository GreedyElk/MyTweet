import { useEffect, useState } from 'react'

export default function TextBox({createTweet, getText, activeOrNo}){

    const [boxText, setBoxText] = useState('')

    useEffect(() => setBoxText(''), [activeOrNo])

    const status = (boxText.length > 140) ? 'active' : 'inactive'   /*wet status to 'more140charts' element*/

    getText(boxText)                                                /*callback with inserted text to parent element*/

    return(
        <>
            <div id='textBox'>
                <div id='textBoxLoader' className={activeOrNo}>
                    <span className="loader"></span>
                </div>
                <textarea id='textInput' onChange={(e) => {setBoxText(e.target.value)}} placeholder='What you have in mind...' value={boxText}></textarea>
                <div id='boxStr'>
                    <span id='more140charts' className={status}>The tweet can't contain more then 140 chars.</span>
                    <button id='addButton' onClick={() => {createTweet()}}>Tweet</button>
                </div>
            </div>
        </>
    )
}