import { ViewBlock } from "./viewBlock"
import { EditBlock } from "./editBlock"
import { useState, useEffect } from "react"

export function MainBlock({ user, userData, index, updateUserData, forceClose, forceCloseEdit }){

    const [isEiditing, setEditing] = useState(false)


    console.log("force close: ", forceClose)

    useEffect(() => {
        if(forceClose){
            setEditing(false);
        }
    }, [forceClose]);


    const flipEditState = () => {
        if(forceClose){
            forceCloseEdit()
        }
        setEditing(!isEiditing)
    }


    const confirmUser = (updatedUser) => {

        //update userData
        userData.clientData[index] = updatedUser
        // send new user data to be updated
        updateUserData(userData)

        // revert block
        flipEditState()

    }


    function removeElementAtIndex(list, index) {

        if (index >= 0 && index < list.length) {
            return list.slice(0, index).concat(list.slice(index + 1));
            
        }
        return list.slice(); // Return a copy of the list if the index is out of bounds
    }

    const deleteUser = () => {
        // Check if index is within the range of the array

        userData.clientData = removeElementAtIndex(userData.clientData, index)

        // Call the function to toggle the edit state
        flipEditState();
        // Update the userData with the new array
        updateUserData(userData);

    };


    if((isEiditing == true) && !forceClose){
        return (<>
            <EditBlock user={user}  userData={ userData} flipEditState={flipEditState} confirmUser={confirmUser} deleteUser={deleteUser}></EditBlock>

        </>)
    } else {
        return (<>
            <ViewBlock user={user} userData={ userData} flipEditState={flipEditState}></ViewBlock>
        </>)
    }

}