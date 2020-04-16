import React from 'react'
import Count from './Count'
import Fade from 'react-reveal/Fade'

const Box = (props) => {
  return (
    <Fade delay={props.delay}>
      <div className="md:float-left md:w-1/3 border-8 border-transparent">
        <div className="box shadow-md bg-white rounded-md box flex flex-col justify-center md:justify-start p-3 md:p-5 align-center">
          <p className="text-md">{props.title}</p>
          <span className={`${props.classNameCount} font-medium`}>
            <Count end={props.count} onEnd={props.onEnd} />
          </span>
          {props.hasPercent && (
            <span className={props.percentVisibility}>
              ({props.percentValue}%)
            </span>
          )}
          {props.help && props.help}
        </div>
      </div>
    </Fade>
  )
}

export default Box
