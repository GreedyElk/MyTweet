import React from 'react';
import { useEffect, useState} from 'react'

export const globalContext = React.createContext(null)

export default function GlobalContext({children}){

    const defValue = 'default'

    const [tweets, setTweets] = useState([])

    tweets.sort((a, b) => {                                     /*Sorting tweets by date*/
        if(a.dateTime < b.dateTime){
            return -1
        }else if(a.dateTime > b.dateTime){
            return 1
        }else if(a.dateTime == b.dateTime){
            return 0
        }
    })

    useEffect(() => {
        async function getTweets(){                     /*getting value for tweets from server*/
        try{
            let tweetsList
            tweetsList = await fetch('https://65648686ceac41c0761e5b9a.mockapi.io/storage/tweets');
            tweetsList = await tweetsList.json();

            setTweets([...tweetsList])

        }catch{alert(`can't find tweets on server`)}
        };

        if(tweets.length == 0){getTweets()}

        const refreshingTweets = setInterval(() => {getTweets()}, 9000)
        return () => clearInterval(refreshingTweets)
    }, [])

    let indicatorValue = tweets.length


    return(
        <>
            <globalContext.Provider value = {{tweets, setTweets, indicatorValue}}>
                {children}
            </globalContext.Provider>
        </>
    )
}