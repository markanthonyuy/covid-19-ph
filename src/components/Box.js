import React, { useState } from 'react'
import Count from './Count'
import { SVGInfo } from '../components'
import Fade from 'react-reveal/Fade'

const Box = (props) => {
  const [helpVisibility, setHelpVisibility] = useState(false)
  return (
    <Fade delay={props.delay}>
      <div className="relative md:float-left md:w-1/3 border-8 border-transparent select-none">
        <div
          className={`box shadow-md bg-white rounded-md box flex flex-col justify-center md:justify-start p-3 md:p-5 align-center ${
            props.help && 'hover:shadow-lg has-info'
          }`}
          onMouseLeave={() => setHelpVisibility(false)}
          onMouseEnter={() => setHelpVisibility(true)}
        >
          <p className="text-sm tracking-wider uppercase text-gray-600">
            {props.title}
          </p>
          <span className={`${props.classNameCount} font-medium`}>
            <Count end={props.count} onEnd={props.onEnd} delay={1} />
          </span>
          {props.hasPercent && (
            <span className={props.percentVisibility}>
              ({props.percentValue}%)
            </span>
          )}
          {props.help && (
            <React.Fragment>
              <span className="info absolute">
                <SVGInfo fill={props.svgFill} width="17" />
              </span>
              <div
                className={`help absolute w-full text-xs text-gray-700 shadow-md p-3 border-l-4 leading-normal ${
                  props.helpBg || 'bg-white'
                } ${props.helpBorder || 'border-gray-600'} ${
                  helpVisibility ? 'appear' : ''
                }`}
              >
                {props.help}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Fade>
  )
}

export default Box
