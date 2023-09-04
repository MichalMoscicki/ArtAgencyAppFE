import React from "react";
import {getContactById, getContacts} from "../../api/contacts";

const API = () => {
    return(
        <>
            <h1>contact API</h1>
            <ul>
                <li><button>ADD</button></li>
                <li><button onClick={getALL}>GET ALL</button></li>
                <li><button onClick={getById}>GET BY ID</button></li>
                <li><button>UPDATE</button></li>
                <li><button>DELETE</button></li>
            </ul>
        </>
    )
}


const getALL = async () => {
    let data = await getContacts();
    console.log(await data)
}
const getById = async () => {
    let data = await getContactById(19);
    console.log(await data)

}

export default API;