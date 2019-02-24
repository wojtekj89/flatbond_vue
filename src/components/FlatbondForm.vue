<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <h1>Create Flatbond</h1>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 md3 offset-md3>
            <v-text-field
              v-model="rent"
              label="Rent"
              suffix="£"
              mask="####"
              :rules="[rules.required, true]"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md3>
            <v-layout row wrap mb-4>
              <v-flex xs6>
                <v-btn large>weekly</v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn large>monthly</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md6 offset-md3>
        <v-text-field
          v-model="postcode"
          label="Postcode"
          hint="Your postcode"
          :rules="[rules.required]"
          outline
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md6 offset-md3>
        <v-layout row wrap>
          <v-flex xs6>
            <v-btn large>clear</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn large>Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: x => !!x || "Required"
      },
      id: 123, // 123 - fixed fee, 321 - non fixed fee with fake amount
      fee: 0
    };
  },
  mounted() {
    this.$store.dispatch("getConfig", id);
  }
};
</script>
