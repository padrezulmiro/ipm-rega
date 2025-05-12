const parkImgEl = document.getElementById("edit-park-img")
const areaDetailsSection = document.querySelector(".bottom-to-top-form-section")
const saveDetailsBtn = document.getElementById("save-park-details-btn")
const waterLevelInput = document.getElementById("water-level-input")

function main() {
  areaDetailsSection.style.display = "none"

  parkImgEl.addEventListener("click", parkMapClick)
  saveDetailsBtn.addEventListener("click", saveArea)
  waterLevelInput.addEventListener("input", waterLevelChange)
}

function parkMapClick(event) {
  parkImgEl.src = "../park-area-blurred.svg"
  areaDetailsSection.style.display = ""
}

function saveArea(event) {
  event.preventDefault()
}

function waterLevelChange() {
  console.log("Changed water level value to " + waterLevelInput.value)

  const waterLevelInputValueEl = document
        .getElementById("water-level-selected-value")
  switch(waterLevelInput.value) {
    case "1":
      waterLevelInputValueEl.innerText = "\u{1F4A7}"
      break
    case "2":
      waterLevelInputValueEl.innerText = "\u{1F4A7}\u{1F4A7}"
      break
    default:
      waterLevelInputValueEl.innerText = "\u{1F4A7}\u{1F4A7}\u{1F4A7}"
  }
}

main()
