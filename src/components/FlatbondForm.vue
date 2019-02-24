<template>
  <v-form ref="flatbondForm" v-model="valid" lazy-validation>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-dialog v-model="loadingConfig" persistent width="100px" light class="center">
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
        </v-dialog>
        <v-flex xs12 md6 offset-md3>
          <h1>Create Flatbond</h1>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 md3 offset-md3>
              <v-text-field
                color="primary"
                v-model="rent"
                label="Rent"
                suffix="£"
                mask="#####"
                :rules="[rules.required, weekly ? rules.weekly : rules.monthly]"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
              <v-layout row wrap mb-4>
                <v-flex xs6>
                  <v-btn large :flat="monthly" color="primary" @click="rentWeekly()">weekly</v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-btn large :flat="weekly" color="primary" @click="rentMonthly()">monthly</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6 offset-md3>
          <v-text-field
            v-model="postcode"
            label="Postcode"
            hint="Your postcode in UK standard"
            :rules="[rules.required]"
            outline
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md6 offset-md3>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block large outline color="primary" @click="clear()">clear</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn color="primary" block large @click="submit()" :disabled="!valid">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6 offset-md3>
          <p class="caption text-xs-center">Membership fee (including VAT): {{ fee.toFixed(2) }}£</p>
          <p class="caption text-xs-center red--text">{{error}}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: x => !!x || "Required",
        weekly: x =>
          (x >= 25 && x <= 2000) ||
          "Minimum weekly rent is 25£, maximum 2000£.",
        monthly: x =>
          (x >= 110 && x <= 8660) ||
          "Minimum monthly rent is 110£, maximum 8660£."
      },
      id: 123, // 123 - fixed fee, 321 - non fixed fee with fake amount
      fee: 144,
      rent: null,
      postcode: null,
      config: null,
      loadingConfig: true,
      weekly: true,
      monthly: false,
      valid: false,
      error: ""
    };
  },
  watch: {
    rent: function() {
      this.calculateFee();
    }
  },
  mounted() {
    this.valid = false;
    this.loadingConfig = true;
    this.$store
      .dispatch("getConfig", this.id)
      .then(result => {
        this.config = result;
        this.loadingConfig = false;
        this.calculateFee();
      })
      .catch(err => {
        // users config not found, using normal rules
        this.loadingConfig = false;
        this.error = `[DEBUG] User with id: ${
          this.id
        } not found in the database`;
      });
  },
  methods: {
    rentWeekly() {
      this.weekly = true;
      this.monthly = false;
      this.calculateFee();
    },
    rentMonthly() {
      this.weekly = false;
      this.monthly = true;
      this.calculateFee();
    },
    calculateFee() {
      if (this.config) {
        if (this.config.fixed_membership_fee)
          this.fee = (this.config.fixed_membership_amount / 100) * 1.2; // fixed fee from pences to punds + 20% VAT
      } else if (this.weekly) this.fee = this.rent * 1.2;
      else this.fee = (this.rent / 4.4) * 1.2; // 1 month = 4.4 weeks
      if (this.fee < 144) this.fee = 144; // minimum fee
    },
    submit() {
      if (!this.weekly) this.rent /= 4.4; // monthly to weekly
      this.$store
        .dispatch("postFlatbond", {
          rent: Math.floor(this.rent * 100), // weekly rent in pences
          membership_fee: Math.round(this.fee * 100), // fee in pences
          postcode: this.postcode,
          client_id: this.id
        })
        .then(result => {
          this.$router.push({ name: "confirmation" });
        })
        .catch(err => {
          this.error = err.response.data.msg;
        });
    },
    clear() {
      this.$refs.flatbondForm.reset();
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>