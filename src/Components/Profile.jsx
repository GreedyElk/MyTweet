import { useEffect, useState } from 'react'

export default function Profile({getUserName}){

    const [userName, setUserName] = useState(localStorage.getItem('userName'))
    const [inputValue, setInputValue] = useState('')

    useEffect(()=>setUserName(localStorage.getItem('userName')))

    return(
        <>
            <div id='profile'>
                <span id='profileTitle'>Profile</span>
                <div id='inputContainer'>
                    <span>User Name</span>
                    <input placeholder={(userName != '') ? userName : 'Your Name'} onChange = {(e) => {setInputValue(e.target.value)}}></input>
                    <button id='addButton' onClick={() => {if(inputValue != ''){getUserName(inputValue)}}}>Save</button>
                </div>
            </div>
        </>
    )
}