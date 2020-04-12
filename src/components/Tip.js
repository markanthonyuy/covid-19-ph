import React from 'react'
import Fade from 'react-reveal/Fade'

const Tip = (props) => {
  return (
    <Fade delay={300}>
      <div className={props.last ? 'md:flex' : 'md:flex mb-6'}>
        <figure className="text-left md:w-2/12 lg:w-1/12 mr-4 flex justify-center items-start mb-2 md:mb-0 md:mt-2">
          <img src={props.image} alt={props.title} width="50" />
        </figure>
        <div className="text md:w-10/12 lg:w-11/12">
          <h3 className="text-xl mb-2 text-gray-800 leading-relaxed text-center md:text-left">
            {props.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed text-center md:text-left">
            {props.description}
          </p>
        </div>
      </div>
    </Fade>
  )
}

export default Tip
