import React, { useEffect, useState } from 'react'
//import { CSVReader } from 'react-papaparse'

//import Wheel from './components/wheel/old';
//import WheelComponent from './components/wheel/Spin';
//import Logo from "./components/wheel/HDG_Logo.png";


const WheelComponent = ({
    //people,
    segColors = ['#EE4040'],
    winningSegment,
    //onFinished,
    primaryColor,
    contrastColor,
    buttonText,
    isOnlyOnce = false,
    size = 290,
    upDuration = 10,
    downDuration = 200
}) => {
    const [people, setPeople] = useState(['Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan', 'Hunter', 'John', 'Doe', 'Dan'])
    let currentSegment = ''
    let isStarted = false
    const [isFinished, setFinished] = useState(false)
    let timerHandle = 0
    const timerDelay = people.length
    let angleCurrent = 0
    let angleDelta = 0
    let canvasContext = null
    let maxSpeed = Math.PI / `${people.length}`
    const upTime = people.length * upDuration
    const downTime = people.length * downDuration
    let spinStart = 0
    let frames = 0
    const centerX = 300
    const centerY = 300

    useEffect(() => {
        wheelInit()
        setTimeout(() => {
            window.scrollTo(0, 1)
        }, 0)
    }, [])



    const wheelInit = () => {
        initCanvas()
        wheelDraw()

        spin()
        onTimerTick()
    }

    const initCanvas = () => {
        let canvas = document.getElementById('canvas')
        if (navigator.appVersion.indexOf('MSIE') !== -1) {
            canvas = document.createElement('canvas')
            canvas.setAttribute('width', 1000)
            canvas.setAttribute('height', 600)
            canvas.setAttribute('id', 'canvas')
            document.getElementById('wheel').appendChild(canvas)
        }
        canvas.addEventListener('click', spin, false)
        canvasContext = canvas.getContext('2d')
    }
    const spin = () => {
        isStarted = true
        if (timerHandle === 0) {
            spinStart = new Date().getTime()
            maxSpeed = Math.PI / ((people.length * 2) + Math.random())
            //maxSpeed = Math.PI / segments.length
            frames = 0
            timerHandle = setInterval(onTimerTick, timerDelay)
        }
    }
    const onTimerTick = () => {
        frames++
        draw()
        const duration = new Date().getTime() - spinStart
        let progress = 0
        let finished = false
        if (duration < upTime) {
            progress = duration / upTime
            angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
        } else {
            if (winningSegment) {
                if (currentSegment === winningSegment && frames > people.length) {
                    progress = duration / upTime
                    angleDelta =
                        maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
                    progress = 1
                } else {
                    progress = duration / downTime
                    angleDelta =
                        maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
                }
            } else {
                progress = duration / downTime
                angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
            }
            if (progress >= 1) finished = true
        }

        angleCurrent += angleDelta
        while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2
        if (finished) {
            setFinished(true)
            onFinished(currentSegment)
            clearInterval(timerHandle)
            timerHandle = 0
            angleDelta = 0
        }
    }

    const wheelDraw = () => {
        clear()
        drawWheel()
        drawNeedle()
    }

    const draw = () => {
        clear()
        drawWheel()
        drawNeedle()
    }

    const drawSegment = (key, lastAngle, angle) => {
        const ctx = canvasContext
        const value = people[key]
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, size, lastAngle, angle, false)
        ctx.lineTo(centerX, centerY)
        ctx.closePath()
        ctx.fillStyle = segColors[key]
        ctx.fill()
        ctx.stroke()
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((lastAngle + angle) / 2)
        ctx.fillStyle = contrastColor || 'white'
        ctx.font = 'bold 1em proxima-nova'
        ctx.fillText(value.substr(0, 21), size / 2 + 20, 0)
        ctx.restore()
    }

    const drawWheel = () => {
        const ctx = canvasContext

        make_base();

        function make_base() {
            // center image on wheel
            let base = new Image();
            base.src = 'final_gif.gif';
            base.onload = function () {
                ctx.drawImage(base, 0, 0, 200, 200);
            }
        }


        let lastAngle = angleCurrent
        const len = people.length
        const PI2 = Math.PI * 2
        ctx.lineWidth = 1
        ctx.strokeStyle = primaryColor || 'black'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.font = '1em proxima-nova'
        for (let i = 1; i <= len; i++) {
            const angle = PI2 * (i / len) + angleCurrent
            drawSegment(i - 1, lastAngle, angle)
            lastAngle = angle
        }

        // Draw a center circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, 50, 0, PI2, false)
        ctx.closePath()


        ctx.fillStyle = primaryColor || 'black'
        ctx.lineWidth = 10
        ctx.strokeStyle = contrastColor || 'white'
        ctx.fill()
        ctx.font = 'bold 1em proxima-nova'
        ctx.fillStyle = contrastColor || 'white'
        ctx.textAlign = 'center'
        ctx.fillText(buttonText || 'HUAWEI', centerX, centerY + 3)
        ctx.stroke()

        // Draw outer circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, size, 0, PI2, false)
        ctx.closePath()

        ctx.lineWidth = 10
        ctx.strokeStyle = primaryColor || 'black'
        ctx.stroke()
    }

    const drawNeedle = () => {
        const ctx = canvasContext
        ctx.lineWidth = 1
        ctx.strokeStyle = contrastColor || 'white'
        ctx.fileStyle = contrastColor || 'white'
        ctx.beginPath()
        ctx.moveTo(centerX + 20, centerY - 50)
        ctx.lineTo(centerX - 20, centerY - 50)
        ctx.lineTo(centerX, centerY - 70)
        ctx.closePath()
        ctx.fill()
        const change = angleCurrent + Math.PI / 2
        let i =
            people.length -
            Math.floor((change / (Math.PI * 2)) * people.length) -
            1
        if (i < 0) i = i + people.length
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = primaryColor || 'black'
        ctx.font = 'bold 1.5em proxima-nova'
        currentSegment = people[i]
        isStarted && ctx.fillText(currentSegment, centerX + 10, centerY + size + 50)
    }
    const clear = () => {
        const ctx = canvasContext
        ctx.clearRect(0, 0, 1000, 800)
    }

    const onFinished = (winner) => {
        console.log(winner)
    }

    const saveInput = (e) => {
        setPeople({ input: e.target.value });
    };

    const addNewItem = () => {
        setPeople(prevState => ({
            people: [...prevState.people, prevState.input],
        }));
    };


    //handleKeyDown(event) {
    const handleChange = (e) => {
        if (e.keyCode === 13) {
            setPeople(prevState => ({
                people: [...prevState.people, prevState.input],
            }));
        }
    }


    return (
        <div id='wheel'>
            <canvas
                id='canvas'
                width='1000'
                height='800'
                style={{
                    pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto'
                }}
            />
            <h1>HDG Germany Kick-off: Lucky Draw</h1>
            {/* <img src={Logo} ></img> */}


            {/* <Wheel items={this.state.people} /> */}
            <br />
            <label>Name: </label>
            <input
                type="text"
                onChange={saveInput}
                onKeyDown={handleChange}
            />
asdsds
            {/* <div className="display">
                <span id="readout">
                    YOU WON:{"  "}
                    <span id="result">{this.state.people[this.state.result]}</span>
                </span>
            </div> */}

            {/* <WheelComponent
                //segments={this.setState({ people })}
                people={this.state.people}
                segColors={['#EE4040']}
                //winningSegment={segments[3]}
                //onFinished={(winner) => onFinished(winner)}
                primaryColor='black'
                contrastColor='white'
                buttonText='Spin'
                isOnlyOnce={false}
                size={290}
                upDuration={100}
                downDuration={200}
            /> */}
            {/* 
            <CSVReader
                onDrop={this.handleOnDrop}
                onError={this.handleOnError}
                addRemoveButton
                removeButtonColor='#659cef'
                onRemoveFile={this.handleOnRemoveFile}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader> */}
        </div>
    )
}
export default WheelComponent
