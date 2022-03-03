import axios from "axios";

const my_token="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";
const my_user="marrikaa";
const url='https://api.github.com/search/users?q=';


const fetchUsers = (userInput) => {
    return axios.get(url + userInput, {
        'auth': {
            'username': my_user,
            'token': my_token,
        },
        'headers': {
            'Authorization': `token ${my_token}` 
        }
    }).then(response => {
        const users = response.data.items;
        const updatedUsers = users.map(users => {
            return {
                ...users,
            }
        })
        return updatedUsers;
    })
}

export default fetchUsers;