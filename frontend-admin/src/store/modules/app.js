import Cookies from 'js-cookie';
// import AWS from 'aws-sdk'

const state = {
  language: 'tai heo'
};

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language;
    Cookies.set('language', language);
  }
};

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
