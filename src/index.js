import dat from 'dat.gui'
import p5 from 'p5'

const imageSize = { width: 1024, height: 1288 }

const state = {
    trippiness: 0.08,
    separation: 0.2,
    frequency: 10,
    time: 1,
}

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(state, 'trippiness')
        .min(0)
        .max(1)
        .step(0.01)
    gui.add(state, 'separation')
        .min(0)
        .max(1)
        .step(0.01)
    gui.add(state, 'frequency')
        .min(0)
        .max(100)
        .step(1)
}

function getCanvasSize(p) {
    const width = Math.min(p.windowWidth, imageSize.width)
    const height = width * (imageSize.height / imageSize.width)
    return { width, height }
}

const sketch = p => {
    let shader, image, result

    p.preload = () => {
        /** @todo use proper webpack loaders */
        shader = p.loadShader('./assets/shaders/shader.vert', './assets/shaders/shader.frag')
        image = p.loadImage('./assets/images/masks.jpg')
    }

    p.setup = () => {
        const { width, height } = getCanvasSize(p)
        p.createCanvas(width, height, p.WEBGL)
        p.noStroke()
    }

    p.draw = () => {
        p.shader(shader)

        shader.setUniform('time', state.time / 1000)
        shader.setUniform('mouse', [
            p.mouseX / p.width,
            p.map(p.mouseY, 0, p.height, p.height, 0) / p.height
        ])
        shader.setUniform('freq', state.frequency + 2 * Math.sin(0.0007 * state.time))
        shader.setUniform('amp', state.trippiness + Math.max(0, 0.03 * Math.cos(0.001 * state.time)))
        shader.setUniform('moving', 0)
        shader.setUniform('separation', state.separation)
        shader.setUniform('image', image)

        p.rect(0, 0, p.width, p.height)

        state.time += 0.1
    }

    p.windowResized = () => {
        const { width, height } = getCanvasSize(p)
        p.resizeCanvas(width, height)
    }
}

new p5(sketch)
