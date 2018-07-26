<template>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 v-if="!isUserLogin && !emailApproveWaiting">
            <v-card class="elevation-12" >
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field
                                prepend-icon="person"
                                name="email"
                                label="E-mail"
                                type="text"
                                v-model="e_mail"
                                :rules="emailRules"
                                placeholder="Enter your e-mail"
                                autocomplete="username"
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="lock"
                                name="password"
                                label="Password"
                                type="password"
                                v-model="passw"
                                :rules="passwRules"
                                placeholder="Enter your password"
                                autocomplete="current-password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="handleOk"
                        :disabled="!valid"
                    >Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>

        <v-flex xs12 sm8 md6 v-if="isUserLogin && !emailVerify && !emailApproveWaiting">
            <v-card class="elevation-12" >
                <v-card-text>
                    <h3>You are logined, but don't verify your e-mail yet. </h3>
                    <h3>Check your e-mail and go to link for verify, please.</h3>
                </v-card-text>
                <v-layout>
                    <v-flex>
                       <v-card-actions>
                           <v-btn
                            color="warning"
                            @click="close"
                            >Close
                           </v-btn>
                           <v-spacer></v-spacer>
                           <v-btn
                            color="success"
                            @click="sendVerifyLink"
                            >Send verify email again
                            </v-btn>
                         </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>

        <v-flex xs12 sm8 md6 v-if="emailApproveWaiting">
            <v-card >
                <v-card-text>
                    <h3>We sent to your e-mail verify link. </h3>
                    <h3>Check your e-mail and go to link for verify, please.</h3>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="warning"
                            @click="close"
                    >Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>

    </v-layout>
</v-container>
</template>

<script>

    import * as fb from 'firebase';

    export default {
        data() {
            return {
                name: "loginPage",
                e_mail: '',
                passw: '',
                valid: false,
                emailApproveWaiting: false,
                emailVerify: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >=8) || 'Password must be equal or more 8 characters'
                ]
            }
        },

        computed : {
            loading () {
                return this.$store.getters.loading
            },
            isUserLogin () {
                return this.$store.getters.isUserLogin
            },

        },
            beforeMount () {
                if (this.$route.query['loginError']) {
                      this.$store.dispatch('setError', 'Please log in to access this page.')
                 } else {if (this.isUserLogin) { this.emailVerifyCheck();
                                                 if (this.emailVerify) {this.$router.push("/")}
                                               }
                        }
    },
        methods: {
            clearName() {
                this.e_mail = '';
                this.passw = ''
            },
            handleOk(evt) {
                if (this.$refs.form.validate()) {
                    let user = {
                        email: this.e_mail,
                        passw: this.passw
                    };
                    this.$store.dispatch('loginUser', user)
                        .then(() => {
                            this.emailVerifyCheck();
                            const invalidPath = this.$route.query['loginError'];
                            if (invalidPath) {
                                this.$router.push(invalidPath)
                            } else
                            {
                                this.$router.push("/")
                            }
                        })
                        .catch((error) => {
                            return error
                        })
                }
            },

            async sendVerifyLink () {
                await fb.auth().currentUser.sendEmailVerification().
                then(() => {
                    this.emailApproveWaiting = true;
                    this.emailVerify = false;
                }).
                catch((error) => {
                    return error
                });
            },

            emailVerifyCheck () {
                if (fb.auth().currentUser.emailVerified) {
                    this.emailVerify = true;
                    this.emailApproveWaiting = false;
                } else {
                    $this.$store.dispatch('logOutUser');
                    this.emailVerify = false;
                    this.$router.push("/");
                }
            },
            close(){
                this.emailApproveWaiting = false;
                this.emailVerify = false;
                this.$store.dispatch('logOutUser');
                this.$router.push('/')
            }
        }
    }

</script>

<style scoped>

</style>