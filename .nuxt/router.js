import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _92f2d048 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _74e29a34 = () => import('..\\pages\\Readme.vue' /* webpackChunkName: "pages\\Readme" */).then(m => m.default || m)
const _68eb9c0c = () => import('..\\pages\\qiniu.vue' /* webpackChunkName: "pages\\qiniu" */).then(m => m.default || m)
const _331c0e1e = () => import('..\\pages\\history.vue' /* webpackChunkName: "pages\\history" */).then(m => m.default || m)
const _ffa38a1a = () => import('..\\pages\\login.vue' /* webpackChunkName: "pages\\login" */).then(m => m.default || m)
const _83baa386 = () => import('..\\pages\\blog\\ico.vue' /* webpackChunkName: "pages\\blog\\ico" */).then(m => m.default || m)
const _99e35206 = () => import('..\\pages\\blog\\option.vue' /* webpackChunkName: "pages\\blog\\option" */).then(m => m.default || m)
const _115b0d94 = () => import('..\\pages\\rbac\\node\\create.vue' /* webpackChunkName: "pages\\rbac\\node\\create" */).then(m => m.default || m)
const _216d0c9a = () => import('..\\pages\\blog\\article\\create.vue' /* webpackChunkName: "pages\\blog\\article\\create" */).then(m => m.default || m)
const _6829713e = () => import('..\\pages\\blog\\tag\\create.vue' /* webpackChunkName: "pages\\blog\\tag\\create" */).then(m => m.default || m)
const _eafe7b40 = () => import('..\\pages\\blog\\tag\\list.vue' /* webpackChunkName: "pages\\blog\\tag\\list" */).then(m => m.default || m)
const _7c26bee1 = () => import('..\\pages\\rbac\\user\\list.vue' /* webpackChunkName: "pages\\rbac\\user\\list" */).then(m => m.default || m)
const _5928f688 = () => import('..\\pages\\blog\\article\\list.vue' /* webpackChunkName: "pages\\blog\\article\\list" */).then(m => m.default || m)
const _030dd36a = () => import('..\\pages\\blog\\announcement\\create.vue' /* webpackChunkName: "pages\\blog\\announcement\\create" */).then(m => m.default || m)
const _e6ef84ac = () => import('..\\pages\\rbac\\role\\create.vue' /* webpackChunkName: "pages\\rbac\\role\\create" */).then(m => m.default || m)
const _aabf72a6 = () => import('..\\pages\\blog\\announcement\\list.vue' /* webpackChunkName: "pages\\blog\\announcement\\list" */).then(m => m.default || m)
const _7a808c68 = () => import('..\\pages\\rbac\\role\\list.vue' /* webpackChunkName: "pages\\rbac\\role\\list" */).then(m => m.default || m)
const _4c7714b8 = () => import('..\\pages\\blog\\category\\list.vue' /* webpackChunkName: "pages\\blog\\category\\list" */).then(m => m.default || m)
const _156538fc = () => import('..\\pages\\blog\\category\\create.vue' /* webpackChunkName: "pages\\blog\\category\\create" */).then(m => m.default || m)
const _04892f50 = () => import('..\\pages\\rbac\\node\\list.vue' /* webpackChunkName: "pages\\rbac\\node\\list" */).then(m => m.default || m)
const _ef5e9236 = () => import('..\\pages\\blog\\comment\\list.vue' /* webpackChunkName: "pages\\blog\\comment\\list" */).then(m => m.default || m)
const _ef7b5d02 = () => import('..\\pages\\rbac\\user\\create.vue' /* webpackChunkName: "pages\\rbac\\user\\create" */).then(m => m.default || m)
const _0134dd86 = () => import('..\\pages\\rbac\\user\\edit\\_id.vue' /* webpackChunkName: "pages\\rbac\\user\\edit\\_id" */).then(m => m.default || m)
const _5ee635c4 = () => import('..\\pages\\blog\\tag\\edit\\_id.vue' /* webpackChunkName: "pages\\blog\\tag\\edit\\_id" */).then(m => m.default || m)
const _7aaa9c5a = () => import('..\\pages\\blog\\category\\edit\\_id.vue' /* webpackChunkName: "pages\\blog\\category\\edit\\_id" */).then(m => m.default || m)
const _33093c42 = () => import('..\\pages\\blog\\article\\edit\\_id.vue' /* webpackChunkName: "pages\\blog\\article\\edit\\_id" */).then(m => m.default || m)
const _ef398bb4 = () => import('..\\pages\\rbac\\node\\edit\\_id.vue' /* webpackChunkName: "pages\\rbac\\node\\edit\\_id" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _92f2d048,
			name: "index"
		},
		{
			path: "/Readme",
			component: _74e29a34,
			name: "Readme"
		},
		{
			path: "/qiniu",
			component: _68eb9c0c,
			name: "qiniu"
		},
		{
			path: "/history",
			component: _331c0e1e,
			name: "history"
		},
		{
			path: "/login",
			component: _ffa38a1a,
			name: "login"
		},
		{
			path: "/blog/ico",
			component: _83baa386,
			name: "blog-ico"
		},
		{
			path: "/blog/option",
			component: _99e35206,
			name: "blog-option"
		},
		{
			path: "/rbac/node/create",
			component: _115b0d94,
			name: "rbac-node-create"
		},
		{
			path: "/blog/article/create",
			component: _216d0c9a,
			name: "blog-article-create"
		},
		{
			path: "/blog/tag/create",
			component: _6829713e,
			name: "blog-tag-create"
		},
		{
			path: "/blog/tag/list",
			component: _eafe7b40,
			name: "blog-tag-list"
		},
		{
			path: "/rbac/user/list",
			component: _7c26bee1,
			name: "rbac-user-list"
		},
		{
			path: "/blog/article/list",
			component: _5928f688,
			name: "blog-article-list"
		},
		{
			path: "/blog/announcement/create",
			component: _030dd36a,
			name: "blog-announcement-create"
		},
		{
			path: "/rbac/role/create",
			component: _e6ef84ac,
			name: "rbac-role-create"
		},
		{
			path: "/blog/announcement/list",
			component: _aabf72a6,
			name: "blog-announcement-list"
		},
		{
			path: "/rbac/role/list",
			component: _7a808c68,
			name: "rbac-role-list"
		},
		{
			path: "/blog/category/list",
			component: _4c7714b8,
			name: "blog-category-list"
		},
		{
			path: "/blog/category/create",
			component: _156538fc,
			name: "blog-category-create"
		},
		{
			path: "/rbac/node/list",
			component: _04892f50,
			name: "rbac-node-list"
		},
		{
			path: "/blog/comment/list",
			component: _ef5e9236,
			name: "blog-comment-list"
		},
		{
			path: "/rbac/user/create",
			component: _ef7b5d02,
			name: "rbac-user-create"
		},
		{
			path: "/rbac/user/edit/:id?",
			component: _0134dd86,
			name: "rbac-user-edit-id"
		},
		{
			path: "/blog/tag/edit/:id?",
			component: _5ee635c4,
			name: "blog-tag-edit-id"
		},
		{
			path: "/blog/category/edit/:id?",
			component: _7aaa9c5a,
			name: "blog-category-edit-id"
		},
		{
			path: "/blog/article/edit/:id?",
			component: _33093c42,
			name: "blog-article-edit-id"
		},
		{
			path: "/rbac/node/edit/:id?",
			component: _ef398bb4,
			name: "rbac-node-edit-id"
		}
    ],
    fallback: false
  })
}
