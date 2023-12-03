import { useState, useEffect, useContext} from 'react'
import { globalContext } from './GlobalContext'

export default function MessageIndicator(){
    const {indicatorValue} = useContext(globalContext);

    return(
        <>
            <div id='messageIndicator'>
                <span>{indicatorValue}</span>
            </div>
        </>
    )
}