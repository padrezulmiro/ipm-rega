const park1 = {
  parkName: "Pq. da Paz",
  numRegions: 11,
  waterConsumption: 2300,
  mapUrl: "../park-map-example.png"
}

const park2 = {
  parkName: "Pq. Urbano Comandante Julio Ferraz",
  numRegions: 6,
  waterConsumption: 540,
  mapUrl: "../park-map-example.png"
}

function main() {
  initLocalStorage()
  fillParkList(JSON.parse(localStorage.getItem("parks")))
}

function initLocalStorage() {
  const isParksInStorage = localStorage.getItem("parks") !== null
  if (!isParksInStorage) {
    const parks = [park1, park2]
    localStorage.setItem("parks", JSON.stringify(parks))
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

    // TODO(pip) Fill values in clone:
    // [] link URL
    // [] map img source URL
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

main()
