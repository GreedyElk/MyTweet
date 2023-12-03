import { useEffect, useState, useContext, useRef, useCallback} from 'react'

import TextBox from './TextBox'
import Tweet from './Tweet'

import GlobalContext, { globalContext } from './GlobalContext'

export default function TweetingComponent(){

    const {tweets, setTweets} = useContext(globalContext)    /*Tweet array and it's setting function from context*/

    let boxText = ''                  /*for TextBox*/
    function getText(textItem){       /*callback for gaining text without refreshing the whole page*/
        boxText = textItem;
    }

    const [activeOrNo, setActiveOrNo] = useState('inactive')    /*sets status of loader in TextBox*/

    const [tweetId, setTweetId] = useState((tweets.length == 0) ? 0 : tweets.length - 1)                   /*Tweet content*/
    const [authorName, setAuthorName] = useState('authorUnknown')

    useEffect(() => {                                           
        if(localStorage.getItem('userName') != ''){setAuthorName(localStorage.getItem('userName'))}
    }, [tweetId])
    
    async function createTweet(){                                     /*Creating new tweets*/
        if(boxText == ''){return(alert('Tweet must contain text'))}

        if (boxText.length > 140) {return}

        let date = new Date

        setActiveOrNo('active')                                       /*Enabling loader*/

        const newTweet = {
            id : tweetId,
            text : boxText,
            dateTime : date.getTime(),
            date : `${date.getHours()}:${date.getMinutes()} ${date.getDay() + 3}.${date.getMonth() + 1}.${date.getFullYear()}`,
            author : authorName
        }

        try{
            await fetch('https://65648686ceac41c0761e5b9a.mockapi.io/storage/tweets', {
                method : 'POST',
                body : JSON.stringify(newTweet),
                headers : {
                    'Content-type': 'application/json; charset=UTF-8',
                  }
        })
        }catch{alert('Failed to post tweet')
        }finally{setTimeout(setActiveOrNo('inactive'))}               /*Disabling loader*/

        setTweetId(tweetId + 1)
        setTweets([...tweets, newTweet])
    }

    /*Loading on scrolling*/

    const containerRef = useRef()
    
    const [scrollCount, setScrollCount] = useState(10)

    const [scrollDist, setScrollDist] = useState(400)

    const onScroll = () => {
        const elem = containerRef.current

        if(elem.scrollTop > scrollDist){
            setScrollDist(scrollDist + 1150)

            if(tweets.length >= scrollCount){setScrollCount(scrollCount + 10)}
        }

    }

    useEffect(() => {
        if((tweets.length - scrollCount) == 1){setScrollCount(scrollCount + 10)}
    }, [tweets])

    ///////////////////////////////////

    return(
        <>
            <div id='tweetContainer'>
                <TextBox  createTweet = {createTweet} onChange = {(e) => boxText = e.target.value} getText = {getText} activeOrNo = {activeOrNo}/>
                <div className='tweetsScroll' ref={containerRef} onScroll={() => onScroll()}>
                    {tweets.slice(0, scrollCount).map((e) => {return(<Tweet key={e.id} data = {e}/>)})}
                </div>
            </div>
        
        </>
    )
}