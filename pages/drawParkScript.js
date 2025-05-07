let parkDrawingsIndex = 0
let mapConfirmed = false
const drawParkDivEl = document.getElementById("draw-park-div")
const drawParkImgEl = document.getElementById("draw-park-img")
const drawParkDivImgChildren = drawParkDivEl.querySelectorAll("img.park-map")
const checkButtonEl = document.getElementById("map-check-btn")

class Line {
  static directions = {
    HORIZONTAL: 0,
    VERTICAL: 1,
  }

  #direction = 0
  #distance = 0
  #lastStep = 0

  constructor(direction) {
    this.#direction = direction
  }

  get direction() {
    return this.#direction
  }

  set direction(d) {
    this.#direction = d
  }

  get distance() {
    return this.#distance
  }

  get lastStep() {
    return this.#lastStep
  }

  stepForward() {
    this.#distance++
    this.#lastStep = 1
  }

  stepBackward() {
    this.#distance--
    this.#lastStep = -1
  }
}

class ParkMapDrawing {
  static facingDirections = {
    UP: 0,
    DOWN: 1,
    RIGHT: 2,
    LEFT: 3
  }

  #lines = []
  #facingDirection = ParkMapDrawing.facingDirections.UP

  get lastLine() {
    if (this.#lines.length == 0) {
      return null
    } else {
      return this.#lines[this.#lines.length-1]
    }
  }

  moveUp() {
    if (this.#facingDirection != ParkMapDrawing.facingDirections.UP) {
      this.#facingDirection = ParkMapDrawing.facingDirections.UP
      return
    } else if (this.lastLine === null ||
               this.lastLine.direction == Line.directions.HORIZONTAL) {
      const newLine = new Line(Line.directions.VERTICAL)
      this.#lines.push(newLine)
    }

    this.lastLine.stepForward()
    if (this.lastLine.distance == 0) {
      this.#lines.pop()
    }
  }

  moveDown() {
    if (this.#facingDirection != ParkMapDrawing.facingDirections.DOWN) {
      this.#facingDirection = ParkMapDrawing.facingDirections.DOWN
      return
    } else if (this.lastLine === null ||
               this.lastLine.direction == Line.directions.HORIZONTAL) {
      const newLine = new Line(Line.directions.VERTICAL)
      this.#lines.push(newLine)
    }

    this.lastLine.stepBackward()
    if (this.lastLine.distance == 0) {
      this.#lines.pop()
    }
  }

  moveRight() {
    if (this.#facingDirection != ParkMapDrawing.facingDirections.RIGHT) {
      this.#facingDirection = ParkMapDrawing.facingDirections.RIGHT
      return
    } else if (this.lastLine === null ||
               this.lastLine.direction == Line.directions.VERTICAL) {
      const newLine = new Line(Line.directions.HORIZONTAL)
      this.#lines.push(newLine)
    }

    this.lastLine.stepForward()
    if (this.lastLine.distance == 0) {
      this.#lines.pop()
    }
  }

  moveLeft() {
    if (this.#facingDirection != ParkMapDrawing.facingDirections.LEFT) {
      this.#facingDirection = ParkMapDrawing.facingDirections.LEFT
      return
    } else if (this.lastLine === null ||
               this.lastLine.direction == Line.directions.VERTICAL) {
      const newLine = new Line(Line.directions.HORIZONTAL)
      this.#lines.push(newLine)
    }

    this.lastLine.stepBackward()
    if (this.lastLine.distance == 0) {
      this.#lines.pop()
    }
  }
}

function main() {
  drawParkDivEl.addEventListener("click", changeMapImage)
  checkButtonEl.addEventListener("click", confirmNewMap)

}

function changeMapImage() {
  if (parkDrawingsIndex + 1 === drawParkDivImgChildren.length) {
    return
  }

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

function confirmNewMap(event) {
  event.preventDefault()

  const completeMapEl = document.getElementById("complete-map")
  const blurredMapEl = document.getElementById("park-map-blurred")
  const parkNameFormDiv = document.getElementById("park-name-form-div")
  const parkNameInputEl = document.getElementById("new-park-name-input")

  if (!mapConfirmed) {
    completeMapEl.style.display = "none"
    blurredMapEl.style.display = "inline"
    parkNameFormDiv.style.display = "flex"
    parkNameFormDiv.style.flexDirection = "column"
    parkNameFormDiv.style.justifyContent = "space-around"
    mapConfirmed = true
  } else {
    const newParkName = parkNameInputEl.value
    console.log("New park's name will be " + newParkName + "!")
  }
}

main()
