import '../src/app.css'
import Tracker from '../src/Tracker.svelte'

const tracker = new Tracker({
  target: document.getElementById('app'),
})

export default tracker
