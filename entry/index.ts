import '../src/app.css'
import App from '../src/App.svelte'

if (import.meta.env.DEV) {
  window.start = function start(mins, task) {
    alert(`mins: ${mins}, task: ${task}`)
  }

  window.tasks = ['Coding', 'SuperMemo']
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
