const ADD_TOKEN = "ADD_TOKEN"

const addTokenToState = (token) => {
    return {
        type: ADD_TOKEN,
        payload: "Bearer ".concat(token)
    }
}

export {ADD_TOKEN, addTokenToState}