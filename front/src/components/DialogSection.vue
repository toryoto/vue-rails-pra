<template>
  <v-row>
    <v-col cols="2" class="d-flex justify-center align-center">
      <v-icon size="20px" :color="color">{{ icon }}</v-icon>
    </v-col>
    <v-col class="d-flex align-center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DialogSection",
  // 動的にiconとcolorの値を変更できる
  props: ["icon", "color"],
};
</script>
