import React from 'react'

import WheelComponent from './Spin.js'

const App = () => {
  // const segments = [
  //   'better luck next time',
  //   'won 70',
  //   'won 10',
  //   'better luck next time',
  //   'won 2',
  //   'won uber pass',
  //   'better luck next time',
  //   'won a voucher',
  //   'won 70',
  //   'won 10',
  //   'better luck next time',
  //   'won 2',
  //   'won uber pass',
  //   'better luck next time',
  //   'won a voucher'
  // ]
  // const segColors = [
  //   '#EE4040',
  //   '#F0CF50',
  //   '#815CD1',
  //   '#3DA5E0',
  //   '#34A24F',
  //   '#F9AA1F',
  //   '#EC3F3F',
  //   '#FF9000',
  //   '#F0CF50',
  //   '#815CD1',
  //   '#3DA5E0',
  //   '#34A24F',
  //   '#F9AA1F',
  //   '#EC3F3F',
  //   '#FF9000'
  // ]
  const onFinished = (winner) => {
    console.log(winner)
  }
  return (
    <React.Fragment>
      <WheelComponent
        //segments={segments}
        //segColors={segColors}
        //winningSegment={segments[3]}
        //onFinished={(winner) => onFinished(winner)}
        primaryColor='black'
        contrastColor='white'
        buttonText='Spin'
        isOnlyOnce={false}
        size={290}
        upDuration={100}
        downDuration={200}
      />
    </React.Fragment>
  )
}

export default App
