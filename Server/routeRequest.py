import groupMessage





def route(userId, requestDestination, requestData):




    if requestDestination == "groupMessage":
        groupMessage.messageGroups(userId, requestData["groupIndexes"], requestData["message"])



#groupMessage.messageGroups("LsmDXtCrqIPhlIqU4TfS6S4XBsr1", [3], "hi")