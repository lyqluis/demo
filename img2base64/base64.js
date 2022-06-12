function getBase64(files) {
  const file = files[0]
  const reader = new FileReader()

  return new Promise(resolve => {
    reader.onloadend = function () {
      resolve(reader.result)
    }

    reader.readAsDataURL(file)
  })
}

// dom
function getEl(el) {
  return document.querySelector(el)
}


function showOutput(url, output, img, p) {
  img.src = url
  img.className = ''
  output.innerText = url
  p.style.display = 'none'
}

function preventDefatult(e) {
  e.stopPropagation()
  e.preventDefault()
}

function hasClass(el, name) {
  const classList = Array.from(el.classList)
  return classList.includes(name)
}

function addClass(el, name) {
  if (hasClass(el, name)) return
  el.className = `${name} ${el.className}`
}

function removeClass(el, name) {
  if (hasClass(el, name)) {
    let classes = el.className
    el.className = classes.replace(name, "")
  }
}
