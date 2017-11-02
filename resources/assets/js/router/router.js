import Main from '../layout/main.vue';

/*
导航和标签基于name匹配，面包屑基于path匹配；
所有附加属性均写在meta属性中（包括权限）；
为每个路由配置title属性；
为缓存的页面配置面包屑；
为导航页面配置icon；
 */

/**
 * 登录路由
 * @type {{path: string, name: string, meta: {title: string}, component: ((p1?:*))}}
 */
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => require(['../pages/login.vue'], resolve)
};

/**
 * 404
 * @type {{path: string, name: string, meta: {title: string}, component: ((p1?:*))}}
 */
export const page404 = {
  path: '/*',
  name: 'error_404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => require(['../pages/errors/error_404.vue'], resolve)
};

/**
 * 加载main组件，但是不显示在左侧导航栏中写在这
 * @type {{path: string, name: string, component: {components, data, computed, methods}, meta: {requiresAuth: boolean}, children: [*]}}
 */
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: Main,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'user-detail/:userId',
      name: 'user_detail',
      meta: {
        title: '用户详情'
      },
      component: resolve => require(['../pages/user/userDetail.vue'], resolve)
    }
  ]
}

/**
 * 加载main组件，并且显示在左侧导航栏中的路由写在这
 * @type {[*]}
 */
export const appRouter = [
  {
    path: '/home',
    name: 'home',
    component: Main,
    meta: {
      requiresAuth: true,
      icon: 'ios-speedometer',
      title: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'home_index',
        meta: {
          icon: 'ios-speedometer',
          title: '首页'
        },
        component: resolve => require(['../pages/dashboard.vue'], resolve)
      }
    ]
  },

  {
    path: '/frontend',
    name: 'frontend',
    component: Main,
    meta: {
      requiresAuth: true,
      title: '前台用户管理',
      icon: 'ios-people'
    },
    children: [
      {
        path: 'student',
        name: 'frontend_student',
        meta: {
          icon: 'ios-body',
          title: '学生管理',
          breadCrumbs: [{'name': '学生列表', 'href': '/frontend/student', 'active': true}]
        },
        component: resolve => require(['../pages/student/student.vue'], resolve)
      },
      {
        path: 'teacher',
        name: 'frontend_teacher',
        meta: {
          icon: 'person',
          title: '教师管理',
          breadCrumbs: [{'name': '教师列表', 'href': '/frontend/teacher', 'active': true}]
        },
        component: resolve => require(['../pages/teacher/teacher.vue'], resolve)
      },
      {
        path: 'company',
        name: 'frontend_company',
        meta: {
          icon: 'person-stalker',
          title: '社会人士管理',
          breadCrumbs: [{'name': '社会用户列表', 'href': '/frontend/company', 'active': true}]
        },
        component: resolve => require(['../pages/company/company.vue'], resolve)
      }
    ]
  },

  {
    path: '/award',
    name: 'award',
    component: Main,
    meta: {
      requiresAuth: true,
      title: '赛事相关',
      icon: 'ios-analytics'
    },
    children: [
      {
        path: 'index',
        name: 'award_index',
        meta: {
          title: '赛事管理',
          icon: 'trophy',
          breadCrumbs: [{'name': '赛事列表', 'href': '/award/index', 'active': true}]
        },
        component: resolve => require(['../pages/award/award.vue'], resolve)
      },
      {
        meta: {
          title: '命题管理',
          icon: 'ribbon-b'
        },
        path: 'proposition',
        name: 'proposition'
      },
      {
        meta: {
          title: '作品类别管理',
          icon: 'podium'
        },
        path: 'works-type',
        name: 'works_type'
      },
      {
        meta: {
          title: '奖项管理',
          icon: 'ribbon-a'
        },
        path: 'vote-award',
        name: 'vote_award'
      }
    ]
  },

  {
    path: '/works',
    name: 'works',
    component: Main,
    meta: {
      requiresAuth: true,
      icon: 'planet',
      title: '作品相关'
    },
    children: [
      {
        path: 'index',
        name: 'works_index',
        meta: {
          icon: 'ios-list',
          title: '作品列表',
          breadCrumbs: [{'name': '作品列表', 'href': '/works/index', 'active': true}]
        },
        component: resolve => require(['../pages/works/worksList.vue'], resolve)
      }
    ]
  },

  {
    path: '/report',
    name: 'report',
    meta: {
      requiresAuth: true,
      icon: 'alert-circled',
      title: '举报管理'
    },
    component: Main,
    children: [
      {
        path: 'works',
        name: 'report_works',
        meta: {
          title: '举报管理',
          icon: 'alert-circled',
          breadCrumbs: [{'name': '举报作品列表', 'href': '/report/works', 'active': true}]
        },
        component: resolve => require(['../pages/report-works/reportWorks.vue'], resolve)
      }
    ]
  },

  {
    path: '/identity',
    name: 'identity',
    meta: {
      requiresAuth: true,
      icon: 'funnel',
      title: '身份审核'
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: 'identity_index',
        meta: {
          icon: 'funnel',
          title: '身份审核',
          breadCrumbs: [{'name': '审核管理', 'href': '/identity/index', 'active': true}]
        },
        component: resolve => require(['../pages/identity/identity.vue'], resolve)
      }
    ]
  }
];

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter,
  page404,
];