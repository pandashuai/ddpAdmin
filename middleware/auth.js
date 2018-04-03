import Logc from '~/plugins/logc.js'
export default async({ store, redirect, route, req }, next) => {
    // if (process.browser) {
    let token = '';
    if (!process.browser) {
        token = Logc.cookie.get('ddp_token', req.headers.cookie)
    } else {
        token = Logc.cookie.get('ddp_token')
    }
    await store.dispatch('login/auth/root', token);
    if (route.path === '/login') {
        if (store.state.login.auth.root) {
            return redirect('/')
        }
        return next();
    } else {
        if (!store.state.login.auth.root) {
            Logc.cookie.set('ddp_token', null)
            return redirect('/login')
        }
        return next();
    }
    // }
    // return next();
}