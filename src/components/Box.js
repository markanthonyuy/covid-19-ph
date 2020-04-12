import React from 'react'
import Count from './Count'
import Fade from 'react-reveal/Fade'

const Box = (props) => {
  return (
    <Fade delay={300}>
      <div className={props.classNameBox}>
        <p className={props.classNameBoxTitle}>{props.title}</p>
        <span className={props.classNameCount}>
          <Count end={props.count} onEnd={props.onEnd} />
        </span>
        {props.hasPercent && (
          <span className={props.percentVisibility}>
            ({props.percentValue}%)
          </span>
        )}
      </div>
    </Fade>
  )
}

export default Box
