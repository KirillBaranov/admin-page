import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use( VueRouter )

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const SESSION = localStorage.getItem( 'user' ) ? JSON.parse( localStorage.getItem( 'user' ) ) : null;

  const isAuthenticated = SESSION && SESSION.success ? SESSION.success : false;

  if ( to.name !== 'Login' && !isAuthenticated ) {
    next({ name: 'Login' } );

  }

  else if ( to.name === 'Login' && isAuthenticated ) {
    next({ path: '/' } );
  }

  else {
    next();
  }
})

export default router
