import axios from 'axios';

const state = {};

const mutations = {};

const actions = {
    getApi() {
        return new Promise((resolve, reject) => {
            axios
                .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
                .then(res => {
                    console.log(res)
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};

const getters = {};

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
};
