const AREA_NAME_MAX_CHARS_LENGTH = 8

const parkImgEl = document.getElementById("edit-park-img")
const areaDetailsSection = document.querySelector(".bottom-to-top-form-section")
const saveDetailsBtn = document.getElementById("save-park-details-btn")
const waterLevelInput = document.getElementById("water-level-input")
const editAreaBtn3 = document.getElementById("edit-area-btn-3")

function main() {
  initHTML()
  areaDetailsSection.style.display = "none"

  saveDetailsBtn.addEventListener("click", saveArea)
  waterLevelInput.addEventListener("input", waterLevelChange)
  editAreaBtn3.addEventListener("click", startAreaEdit)
}

function initHTML() {
  const localStorageCustomPark = JSON.parse(localStorage.getItem("parks"))[2]

  const parkNameH1 = document.getElementById("park-name-h1")
  const areaNameH1 = document.getElementById("area-name-h1")
  const areaNameInput = document.getElementById("area-name-input")
  const waterLevelSelectedLabel = document
        .getElementById("water-level-selected-value")

  parkNameH1.innerText = localStorageCustomPark.parkName
  areaNameH1.innerText = "Editing \"" + localStorageCustomPark.areaName + "\""
  areaNameInput.value = localStorageCustomPark.areaName
  waterLevelInput.value = localStorageCustomPark.areaWaterLevel
  for (let i = 0; i < localStorageCustomPark.areaWaterLevel; i++) {
    waterLevelSelectedLabel.innerText += "\u{1F4A7}"
  }

  let editAreaBtnInnerText = localStorageCustomPark.areaName + " "
  for (let i = 0; i < localStorageCustomPark.areaWaterLevel; i++) {
    editAreaBtnInnerText += "\u{1F4A7}"
  }
  editAreaBtn3.innerText = editAreaBtnInnerText
}

function parkMapClick() {
  parkImgEl.src = "../park-area-blurred.svg"
  areaDetailsSection.style.display = ""
}

function saveArea(event) {
  event.preventDefault()

  const areaNameInput = document.getElementById("area-name-input")
  const waterLevelInput = document.getElementById("water-level-input")

  const localStorageParks = JSON.parse(localStorage.getItem("parks"))
  const localStorageCustomPark = localStorageParks[2]
  localStorageCustomPark.areaName = areaNameInput.value
  localStorageCustomPark.areaWaterLevel = parseInt(waterLevelInput.value)

  localStorage.setItem("parks", JSON.stringify(localStorageParks))
  location.reload()
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

function startAreaEdit(event) {
  event.preventDefault()
  console.log("Will start to edit area!")

  areaDetailsSection.style.display = ""
}

main()
