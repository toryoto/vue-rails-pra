<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>

      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>

    <v-sheet height="94vh">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        @change="fetchEvents"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="
          (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
        "
        @click:event="showEvent"
      ></v-calendar>
    </v-sheet>

    <v-dialog :value="event !== null" @click:outside="closeDialog" width="600">
      <!-- eventがnullでなければEventDetailDialogを表示 -->
      <EventDetailDialog v-if="event !== null" />
    </v-dialog>
  </div>
</template>

<script>
import { format } from "date-fns"; // 日付を表示用の文字列に変換
import { mapGetters, mapActions } from "vuex";
import EventDetailDialog from "./EventDetailDialog.vue";

export default {
  name: "CalendarIndex",
  components: {
    EventDetailDialog,
  },
  data: () => ({
    value: format(new Date(), "yyyy/MM/dd"),
  }),
  computed: {
    // vuexのstateを呼び出しで使用できるように
    ...mapGetters("events", ["events", "event"]),
    title() {
      //return format(this.value, 'yyyy年 M月');
      return format(new Date(this.value), "yyyy年 M月");
    },
  },
  methods: {
    // vuexのactionを呼び出しで使用できるように
    ...mapActions("events", ["fetchEvents", "setEvent"]),
    setToday() {
      this.value = format(new Date(), "yyyy/MM/dd");
    },
    showEvent({ event }) {
      // showEventメソッドを呼び出したらストアにイベントデータを保持するようにする
      this.setEvent(event);
    },
    closeDialog() {
      this.setEvent(null);
    },
  },
};
</script>
