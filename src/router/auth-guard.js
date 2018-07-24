import store from '../store'

export default function (to, from, next) {


    const isUser = store.state.user;

    if (isUser) {
      next()
    }
    else {
      next('/login/?loginError=true')
    }
}

