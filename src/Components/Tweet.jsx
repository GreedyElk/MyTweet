import { useState } from 'react'

export default function Tweet({data}){
    return(
        <>
            <div className='tweet'>
                <div className='stringProps'>
                    <span className='author'>{data.author}</span>
                    <span className='date'>{data.date}</span>
                </div>
                <span className='tweetText'>{data.text}</span>
            </div>
        
        </>
    )
}