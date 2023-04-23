export default {
  '/ts/': getTsSidebar(),
  // '/components/': getComponentsSidebar(),
  '/vue3/': getVue3Sidebar(),
}

function getTsSidebar() {
  return [
    {
      text: 'TypeScript',
      collapsible: true,
      items: [
        {
          text: 'TypeScript起步',
          link: '/ts/',
        },
        {
          text: 'TypeScript核心',
          link: '/ts/cores',
        },
        {
          text: 'TypeScript应用',
          link: '/ts/pro',
        },
      ],
    },
  ]
}

function getVue3Sidebar() {
  return [
    {
      text: 'Vue3核心',
      items: [
        {
          text: 'Vue3基础',
          link: '/vue3/',
        },
        {
          text: '组合式API',
          link: '/vue3/composition',
        },
        {
          text: '综合案例',
          link: '/vue3/case',
        },
      ],
    },
  ]
}
