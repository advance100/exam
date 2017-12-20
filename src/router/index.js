import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../components/common/login.vue'
import Index from '../components/common/index.vue'
import About from '../components/common/about.vue'
import Form from '../components/page/form.vue'
import Table from '../components/page/table.vue'
import MarkdownViewer from '../components/page/markdown-viewer.vue'
import markdownEditor1 from '../components/page/markdown-editor-1.vue'
import markdownEditor2 from '../components/page/markdown-editor-2.vue'
import Rtf from '../components/page/rtf.vue'
import Upload from '../components/page/upload.vue'
import Echarts from '../components/page/echarts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {path: '', component: About},
        {path: '/form', component: Form},
        {path: '/table', component: Table},
        {path: '/markdown-viewer', component: MarkdownViewer},
        {path: '/markdown-editor-1', component: markdownEditor1},
        {path: '/markdown-editor-2', component: markdownEditor2},
        {path: '/rtf', component: Rtf},
        {path: '/upload', component: Upload},
        {path: '/echarts', component: Echarts}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
