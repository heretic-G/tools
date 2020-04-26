
function connectParams() {
  var merchantId = document.querySelector('#merchantId')
  var projectId = document.querySelector('#projectId')
  var channelSlug = document.querySelector('#channelSlug')
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
