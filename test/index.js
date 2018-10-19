'use strict'

const {
  Application, Mesh, Scene
} = require('../src')

/*global describe,it,expect*/
describe('Base TEST', () => {

  it('Sprite should gracefully work', () => {
    expect(() => new Mesh()).not.toThrow()
  })

  it('Scene should gracefully work', () => {
    expect(() => new Scene()).not.toThrow()
  })

  it('Proper initialize and lifecycle flow test', (done) => {
    const game = new Application()
    game.addToScene(new Mesh({
      onUpdate() {
        done()
      }
    }))
  })

})
