const park1 = {
  parkName: "Pq. da Paz",
  numRegions: 11,
  waterConsumption: 2300,
  mapUrl: "../pq-da-paz-thumbnail.svg"
}

const park2 = {
  parkName: "Pq. Cmdte. Ferraz",
  numRegions: 6,
  waterConsumption: 540,
  mapUrl: "../pq-cmdte-ferraz-thumbnail.svg"
}


function main() {
  initLocalStorage()
  fillParkList(JSON.parse(localStorage.getItem("parks")))

}

function initLocalStorage() {
  const isParksInStorage = localStorage.getItem("parks") !== null
  if (!isParksInStorage) {
    resetLocalStorage()
  }
}

function fillParkList(parkList) {
  const parkListDivEl = document.getElementById("park-list-div")
  const parkLiTemplate = document.getElementById("park-list-element-template")
  const parkListEl = document.createElement("ul")
  parkListEl.id = "park-list"

  for (let park of parkList) {
    // build html for each park
    const templateClone = parkLiTemplate.content.cloneNode(true)

    templateClone.querySelector("li.park-list-element-map > img").src = park
      .mapUrl
    templateClone.querySelector("li.park-list-element-map > img").alt = park
      .parkName + "'s map"
    templateClone.querySelector("li.park-list-element-name").innerText = park
      .parkName
    templateClone.querySelector("li.park-list-element-nregions").innerText = park
      .numRegions + " regions"
    templateClone.querySelector("li.park-list-element-water-max")
                 .innerText = park.waterConsumption + " L/d"

    parkListEl.appendChild(templateClone)
  }
  parkListDivEl.appendChild(parkListEl)
}

function resetLocalStorage() {
  const parks = [park1, park2]
  localStorage.setItem("parks", JSON.stringify(parks))
}

main()
