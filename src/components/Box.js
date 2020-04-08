import React from 'react'
import Count from './Count'

const Box = (props) => {
  return (
    <div className={props.classNameBox}>
      <p className={props.classNameBoxTitle}>{props.title}</p>
      <span className={props.classNameCount}>
        <Count end={props.count} onEnd={props.onEnd} />
      </span>
      {props.hasPercent && (
        <span className={props.percentVisibility}>({props.percentValue}%)</span>
      )}
    </div>
  )
}

export default Box
