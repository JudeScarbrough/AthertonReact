import { ViewBlock } from "./viewBlock"
import { EditBlock } from "./editBlock"
import { useState } from "react"

export function MainBlock({ user, userData }){

    const [isEiditing, setEditing] = useState(false)

    const flipEditState = () => {
        setEditing(!isEiditing)
    }

    if(isEiditing == false){
        return (<>
            <ViewBlock user={user} userData={ userData} flipEditState={flipEditState}></ViewBlock>
        </>)
    } else {
        return (<>
            <EditBlock user={user}  userData={ userData} flipEditState={flipEditState}></EditBlock>
        </>)
    }

}