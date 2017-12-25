import toast from '@u51/week-ui-toast'
import '@u51/week-ui-toast/lib/index.css'

let lastMsg = ''
let count = 0
let loadingObj = null

export default {
  loading: msg => {
    if (msg) {
      if (msg !== lastMsg) {
        if (loadingObj) {
          loadingObj.close()
        }
        count = 0
      }
      count = Math.max(0, count)
      lastMsg = msg
      count++
      loadingObj = toast.loading({
        message: msg,
        masked: true,
        duration: 0,
        maskStyle: {
          background: 'rgba(0,0,0,0)'  // 设置mask样式
        }
      }, true)
      loadingObj.open()
    }
  },
  close: msg => {
    if (msg) {
      if (msg === 'lastMsg' || msg === lastMsg) {
        count--
        if (count === 0) {
          loadingObj.close()
          loadingObj = null
        }
      }
    }
  },
  info: msg => {
    toast.info(msg)
  },
  error: msg => {
    toast.error(msg)
  }
}
