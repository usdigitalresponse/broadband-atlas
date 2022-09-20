import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedBlock: null,
    selectedDataset: 'fcc-form-477',
    selectedMapView: 'served-blocks',
    // TODO contain options for individual map views somehow? nest under a
    // viewOptions object or something like that?
    selectedTechnology: 'fiber',
    providers: [],
  },
  getters: {
  },
  mutations: {
    setSelectedDataset(state, payload) {
      state.selectedDataset = payload;
    },
    setSelectedMapView(state, payload) {
      state.selectedMapView = payload;
    },
    setSelectedBlock(state, payload) {
      state.selectedBlock = payload;
    },
    setProviders(state, payload) {
      state.providers = payload;
    },
    setSelectedTechnology(state, payload) {
      state.selectedTechnology = payload;
    },
  },
  actions: {
    async fetchProviders({ commit, state }) {
      // console.log('fetch providers');

      const { selectedBlock } = state;

      const url = 'https://broadband-atlas-demo-api-bp3v.onrender.com/v1/query/fcc_form_477_dec_2020';

      const data = await fetch(url + '?' + new URLSearchParams({
        filter: `block_code = '${selectedBlock.census_block_id}' and consumer = '1'`,
      }));

      const json = await data.json();

      commit('setProviders', json);
    },
  },
  modules: {
  },
});
