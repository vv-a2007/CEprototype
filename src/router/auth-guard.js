import store from '../store'

export default function (to, from, next) {

    let isUser;

    if (store.state.user.user) {
       isUser = store.state.user.user.id;
    }
    else {
            isUser = false
        }

    if (isUser !== false) {
      next()
    }
    else {
      store.dispatch('setError', 'Please log in to access this page.');
      const path = `/login/?loginError=`+to.path;
      next(path);

    }
}

