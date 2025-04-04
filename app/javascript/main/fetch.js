
let authToken = "";

export async function fetchObjectChildren(guid){

    const endpoint = `/objects/getchildren/${encodeURIComponent(guid)}`; 
    const response = await fetch(endpoint, {
        method  : 'GET',
        headers : {
            Authorization: "Bearer " + authToken
        }
    });

    if(!response.ok){
        throw new Error(`error querying endpoint ${endpoint} :: ${response.status}`);
    }


    const json = await response.json();
    const arrayOfChildren = json.map(item => {
        return {
            guid: item.guid,
            alias: item.alias,
            type: item.type
        };
    });


    return arrayOfChildren;
}


export async function fetchObjectData(guid){
    
    const endpoint = `/objects/getdata/${encodeURIComponent(guid)}`; 
    const response = await fetch(endpoint, {
        method  : 'GET',
        headers : {
            Authorization: "Bearer " + authToken
        }
    });

    if(!response.ok){
        throw new Error(`error querying endpoint ${endpoint} :: ${response.status}`);
    }


    const json = await response.json();
    return json;
}


export async function fetchObjectMessages(guid, index){

    const endpoint = `/objects/getmessages/${encodeURIComponent(guid)}/${index}`;
    const response = await fetch(endpoint, {
        method  : 'GET',
        headers : {
            Authorization: "Bearer " + authToken
        }
    });

    if(!response.ok){
        throw new Error(`error querying endpoint ${endpoint} :: ${response.status}`);
    }
    

    const json = await response.json();
    const arrayOfChildren = json.map(item => {
        return {
            sender:     item.sender,
            body:       item.body,
            timestamp:  item.timestamp
        };
    });


    return arrayOfChildren;
}


export async function sendObjectMessage(guid, message){
    
    const endpoint = `objects/send/${encodeURIComponent(guid)}`;
    const response = await fetch(endpoint, {
        method  : 'POST',
        headers : {
            Authorization: "Bearer " + authToken
        },
        body: message.trim()
    });

    if(!response.ok){
        throw new Error(`error querying endpoint ${endpoint} :: ${response.status}`);
    }


    const plainText = await response.text();
    return plainText;
}


export async function uploadFile(guid, blob, extension) {
    
    const endpoint = `objects/upload/${encodeURIComponent(guid)}/${encodeURIComponent(extension)}`;
    const response = await fetch(endpoint, {
        method  : 'POST',
        headers : {
            Authorization : 'Bearer ' + authToken 
        },
        body : blob
    });

    if(!response.ok) {
        throw new Error(`error querying endpoint ${endpoint} :: ${response.status}`);
    }
}


export function setToken(token){
    authToken = token;
}