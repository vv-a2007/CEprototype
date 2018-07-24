<template>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
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
    </v-layout>
</v-container>
</template>

<script>

    export default {
        data() {
            return {
                name: "loginPage",
                e_mail: '',
                passw: '',
                valid: false,
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
            }
        },
        beforeMount () {
        if (this.$route.query['loginError']) {
            this.$store.dispatch('setError', 'Please log in to access this page.')
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
                            this.$router.push("/")
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