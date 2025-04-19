let parkDrawingsIndex = 0
const drawParkDivEl = document.getElementById("draw-park-div")
const drawParkImgEl = document.getElementById("draw-park-img")
const drawParkDivImgChildren = drawParkDivEl.querySelectorAll("img.park-map")
const checkButtonEl = document.getElementById("map-check-btn")

function main() {
  document.addEventListener("click", changeMapImage)
}

function changeMapImage() {
  let selectedParkEl = drawParkDivImgChildren[parkDrawingsIndex]
  selectedParkEl.style.display = "none"

  parkDrawingsIndex = (parkDrawingsIndex + 1) % drawParkDivImgChildren.length
  selectedParkEl = drawParkDivImgChildren[parkDrawingsIndex]
  selectedParkEl.style.display = "inline"

  if (parkDrawingsIndex === drawParkDivImgChildren.length-1) {
    checkButtonEl.style.display = "inline"
  } else {
    checkButtonEl.style.display = "none"
  }
}

main()
