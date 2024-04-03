import { ViewBlock } from "./viewBlock"
import { EditBlock } from "./editBlock"

export function MainBlock({ user, userData }){

    if(!user.isEiditing){
        user.isEiditing = false
    }

    if(user.isEiditing == false){
        return (<>
            <ViewBlock user={user} userData={ userData}></ViewBlock>
        </>)
    } else {
        return (<>
            <EditBlock user={user}></EditBlock>
        </>)
    }

}