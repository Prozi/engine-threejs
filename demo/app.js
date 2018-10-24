'use strict'

import { Application, Mesh, Scene } from '../src'
import Stats from 'stats-js'

const stats = new Stats()

document.body.appendChild(stats.domElement)

export default class App extends Application {
  constructor() {
    super()
    this.camera.position.z = 10
  }
  createCube(onUpdate) {
    return new Mesh({ onUpdate })
  }
  addCube() {
    const speedX = Math.random() * 0.1
    const speedY = Math.random() * 0.2
    const speedZ = Math.random() * 0.3
    const cube = this.createCube(function () {
      this.transform.rotation.x += speedX
      this.transform.rotation.y += speedY
      this.transform.rotation.z += speedZ
    })
    cube.transform.position.x = (Math.random() - 0.5) * 15
    cube.transform.position.y = (Math.random() - 0.5) * 10
    cube.transform.position.z = 0
    this.addToScene(cube)
  }
  beforeUpdate() {
    stats.begin()
    super.beforeUpdate()
  }
  loop() {
    this.addCube()
    super.loop()
  }
  afterUpdate() {
    super.afterUpdate()
    stats.end()
  }
}
