
function connectParams() {
  var merchantId = document.querySelector('#merchantId').value || ''
  var projectId = document.querySelector('#projectId').value || ''
  var channelSlug = document.querySelector('#channelSlug').value || ''
  var concatStrCon = document.querySelector('#concatStrCon')
  var space = 'à'
  var allStr = '' + merchantId + space + projectId + space + channelSlug
  var allBaseStr = Base64.encode(allStr)
  var pEl = document.createElement('p')
  pEl.innerText = allBaseStr
  concatStrCon.appendChild(pEl)
}

var concatStrBtn = document.querySelector('#concatStr')
concatStrBtn.addEventListener('click', connectParams)
