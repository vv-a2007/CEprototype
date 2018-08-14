<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 md5  justify-center wrap >
                <v-card>
                    <v-card-title primary-title >
                        <div class="headline">Personal and contact information</div>
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                                    :name="firstName"
                                    label="First name"
                                    type="text"
                                    v-model="firstName"
                                    :rules="nameRules"
                                    placeholder="Enter your first name"
                                    autocomplete="given-name"
                                    @change="change=true"
                            ></v-text-field>
                            <v-text-field
                                    :name="lastName"
                                    label="Last name"
                                    type="text"
                                    v-model="lastName"
                                    :rules="nameRules"
                                    placeholder="Enter your lastname"
                                    autocomplete="family-name"
                                    @change="change=true"
                            ></v-text-field>
                            <!--добавить валидацию тел номера -->
                            <v-text-field
                                    :name="phone"
                                    label="Phone"
                                    type="text"
                                    v-model="phone"
                                    :rules="nameRules"
                                    placeholder="Enter your phone number"
                                    autocomplete="tel"
                                    @change="change=true"
                            ></v-text-field>
                            <v-text-field
                                    :name="emailBasic"
                                    label="Basic e-mail"
                                    type="text"
                                    v-model="emailBasic"
                                    :rules="emailRules"
                                    placeholder="Enter your basic e-mail"
                                    autocomplete="email"
                                    @change="change=true"
                            ></v-text-field>
                            <v-text-field
                                    :name="emailReserve"
                                    label="Reserve e-mail"
                                    type="text"
                                    v-model="emailReserve"
                                    :rules="emailRules"
                                    placeholder="Enter your reserve e-mail"
                                    autocomplete="email"
                                    @change="change=true"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="success"
                                @click="savePersonalData"
                                :disabled="(!valid) || (!change)"
                        >Save personal data</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12 md5  justify-center >
                <v-card>
                    <v-layout row   d-flex>
                      <v-flex xs11 justify-center>
                        <v-card-title primary-title>
                           <div class="headline">Delivery addreses</div>
                        </v-card-title>
                      </v-flex>
                      <v-flex xs1  justify-center align-content-center >
                        <location-modal
                           :id-user="idUser"
                           :id="null"
                           icon="add_circle_outline"
                           :address-line="true"
                           :postcode="true"
                        >
                        </location-modal>
                      </v-flex>
                    </v-layout>
                </v-card>
                <v-card
                    v-for="locate in deliveryList"
                    :key="locate.id"
                    color='blue lighten-3'

                >
                    <v-layout mt-2 row  d-flex>
                        <v-flex xs2>
                            <v-card-title primary-title >
                                <div class="text--primary">{{locate.postcode}}</div>
                            </v-card-title>
                        </v-flex>
                        <v-flex xs4>
                           <v-card-title primary-title >
                               <div class="text--primary">{{locate.str}}</div>
                           </v-card-title>
                        </v-flex>
                        <v-flex xs5 justify-center>
                           <v-card-title primary-title >
                              <div class="text--primary">{{locate.adr}}</div>
                           </v-card-title>
                        </v-flex>
                        <v-flex xs1 justify-center  >
                            <location-modal
                                    :id-user="idUser"
                                    :id="locate.id"
                                     icon="edit"
                                    :address-line="true"
                                    :postcode="true"
                            >
                            </location-modal>
                        </v-flex>
                    </v-layout>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import  LocationModal from '../Services/Location_modal'

    export default {
        name: "Account",
        components:{LocationModal},
        data () {
            return {
                valid:false,
                change:false,

                firstName: "",
                lastName: "",
                phone: "",
                emailBasic: "",
                emailReserve: "",


                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                nameRules: [
                    v => !!v || 'Title is required'
                ]
            }
        },

        computed : { idUser () {return this.$store.getters.userId},
                     deliveryList () { return this.$store.getters.getLocateList}
        },

        created () {
            if (this.idUser) {
                this.firstName = this.$store.getters.user.firstName;
                this.lastName = this.$store.getters.user.lastName;
                this.phone = this.$store.getters.user.phone;
                this.emailBasic = this.$store.getters.user.emailBasic;
                this.emailReserve = this.$store.getters.user.emailReserve;
                this.$store.dispatch('getDeliveryLoc',{idUser: this.idUser});
            }
        },

        methods : {
          savePersonalData() {
              if (this.$refs.form.validate()) {
                  const user = {
                      id: this.idUser,
                      firstName: this.firstName,
                      lastName: this.lastName,
                      phone: this.phone,
                      emailBasic: this.emailBasic,
                      emailReserve: this.emailReserve
                  };
                  this.$store.dispatch('savePersonalData', user)
                      .then(() => {
                          this.$store.dispatch('loadPersonalData', user).
                          then(()=>{
                              this.change = false;
                          }).
                          catch((error) => {
                              return error
                          });

                      })
                      .catch((error) => {
                          return error
                      })
              }
          }
      }
    }
</script>

<style scoped>

</style>