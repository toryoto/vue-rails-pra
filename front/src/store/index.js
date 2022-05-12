import Vue from "vue";
import Vuex from "vuex";
import events from "./modules/events";

Vue.use(Vuex);

export default new Vuex.Store({
  //events.jsでexportしたものを入れることで、eventsストアが利用可能になる
  modules: {
    events,
  },
});
