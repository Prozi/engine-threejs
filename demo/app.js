'use strict'

import { Application, Mesh } from '../src'
import StatsScene from './statsScene'

export default class App extends Application {
  constructor() {
    super()
    this.camera.position.z = 10
    this.benchmark()
  }
  addEmptyScene() {
    this.currentScene = new StatsScene()
  }
  createCursor() {
    const $mouse = this.state.mouse
    this.cursor = this.createCube(function () {
      this.transform.position.x = $mouse.x
      this.transform.position.y = $mouse.y
    })
    return this.cursor
  }
  createCube(onUpdate) {
    return new Mesh({ onUpdate })
  }
  benchmark() {
    setTimeout(() => {
      const speedX = Math.random() * 0.1
      const speedY = Math.random() * 0.2
      const speedZ = Math.random() * 0.3
      const cube = this.createCube(function () {
        this.transform.rotation.x += speedX
        this.transform.rotation.y += speedY
        this.transform.rotation.z += speedZ
      })
      cube.transform.position.x = (Math.random() - 0.5) * 10
      cube.transform.position.y = (Math.random() - 0.5) * 10
      cube.transform.position.z = (Math.random() - 0.5) * 10
      this.addToScene(cube)
      this.benchmark()
    }, 1000 / 60)
  }
}
