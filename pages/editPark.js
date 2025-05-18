const AREA_NAME_MAX_CHARS_LENGTH = 8
const PRESSING_TIME_THRESHOLD = 3000

const parkImgEl = document.getElementById("edit-park-img")
const areaDetailsSection = document.querySelector("#area-details-form")
const addSprinklerSection = document
      .querySelector("#add-sprinkler-form")
const saveDetailsBtn = document.getElementById("save-park-details-btn")
const saveSprinklerBtn = document.getElementById("save-sprinkler-btn")
const waterLevelInput = document.getElementById("water-level-input")
const editAreaBtn3 = document.getElementById("edit-area-btn-3")
const parkNameH1 = document.getElementById("park-name-h1")

let pressingStartTime = 0

function main() {
  initHTML()
  areaDetailsSection.style.display = "none"
  addSprinklerSection.style.display = "none"

  saveDetailsBtn.addEventListener("click", saveArea)
  waterLevelInput.addEventListener("input", waterLevelChange)
  editAreaBtn3.addEventListener("click", startAreaEdit)
  parkImgEl.addEventListener("click", addSprinkler)
  parkNameH1.addEventListener("mousedown", startParkNamePressingTimer)
  parkNameH1.addEventListener("mouseup", changeParkName)
  saveSprinklerBtn.addEventListener("click", saveSprinkler)
}

function initHTML() {
  const localStorageCustomPark = JSON.parse(localStorage.getItem("parks"))[2]

  const areaNameH1 = document.getElementById("area-name-h1")
  const areaNameInput = document.getElementById("area-name-input")
  const waterLevelSelectedLabel = document
        .getElementById("water-level-selected-value")

  parkNameH1.innerText = localStorageCustomPark.parkName
  areaNameH1.innerText = "Editing \"" + localStorageCustomPark.areaName + "\""
  areaNameInput.value = localStorageCustomPark.areaName
  parkImgEl.src = localStorageCustomPark.editMapUrl


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
  areaDetailsSection.style.display = ""
}

function addSprinkler(event) {
  console.log("Will add sprinkler!")
  addSprinklerSection.style.display = ""
}

function startParkNamePressingTimer() {
  pressingStartTime = Date.now()
}

function changeParkName() {
  pressingTime = Date.now() - pressingStartTime
  if (pressingStartTime > PRESSING_TIME_THRESHOLD) {
    console.log("Will change park name")
  }
}

function saveSprinkler(event) {
  event.preventDefault()

  const localStorageParks = JSON.parse(localStorage.getItem("parks"))
  const localStorageCustomPark = localStorageParks[2]
  const selectedSprinklerType = document
        .getElementById("sprinkler-select-input").value
  switch (selectedSprinklerType) {
    case "100":
      parkImgEl.src = "../park-area-w-sprinkler-100.svg"
      localStorageCustomPark.editMapUrl = "../park-area-w-sprinkler-100.svg"
      break
    case "200":
      parkImgEl.src = "../park-area-w-sprinkler-200.svg"
      localStorageCustomPark.editMapUrl = "../park-area-w-sprinkler-200.svg"
      break
    default:
      parkImgEl.src = "../park-area-w-sprinkler-250.svg"
      localStorageCustomPark.editMapUrl = "../park-area-w-sprinkler-250.svg"
      break
  }
  localStorage.setItem("parks", JSON.stringify(localStorageParks))
  addSprinklerSection.style.display = "none"
}

main()
