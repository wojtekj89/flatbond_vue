<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md4 offset-md4>
        <h1 class="display-3">Flatbond created</h1>
        <p>
          <span class="title">Rent:</span>
          {{flatbond.rent/100}}£ per week, {{(flatbond.rent / 100 * 4.4).toFixed(2)}}£ per month
        </p>
        <p>
          <span class="title">Membership fee:</span>
          {{flatbond.membership_fee / 100}}£
        </p>
        <p>
          <span class="title">Postcode:</span>
          {{flatbond.postcode}}
        </p>
        <v-spacer></v-spacer>
        <v-btn block color="primary" @click="back()">
          <v-icon left>arrow_back_ios</v-icon>New flatbond
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  beforeCreate() {
    if (!this.$store.getters.getFlatbond) this.$router.push({ name: "form" });
  },

  computed: {
    flatbond() {
      return this.$store.getters.getFlatbond;
    }
  },

  methods: {
    back() {
      this.$router.push({ name: "form" });
    }
  }
};
</script>
