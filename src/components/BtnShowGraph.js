import React from 'react'
import { Bar } from 'react-chartjs-2'
import Fade from 'react-reveal/Fade'

const BtnShowGraph = (props) => {
  return (
    <Fade delay={100}>
      <button
        className="btn-apply m-auto my-6 bg-blue-500 py-2 text-sm text-white px-6 rounded shadow"
        onClick={props.clickFn}
      >
        {props.chartVisible ? 'Hide' : 'Show'} Chart
      </button>
      <div
        className={
          props.chartVisible
            ? 'chart w-full md:w-2/4 lg:w-5/12 mx-auto mt-8 block'
            : 'chart w-full md:w-2/4 lg:w-5/12 mx-auto mt-8 hidden'
        }
      >
        <Bar
          data={{
            labels: ['Cases', 'Recovered', 'Deaths', 'Active Case'],
            datasets: [
              {
                backgroundColor: [
                  props.casesColor,
                  props.recoveredColor,
                  props.deathsColor,
                  props.activeColor,
                ],
                borderWidth: 1,
                hoverBorderColor: '#000',
                data: [
                  props.casesValue,
                  props.recoveredValue,
                  props.deathsValue,
                  props.activeValue,
                ],
              },
            ],
          }}
          legend={{
            display: false,
          }}
        ></Bar>
      </div>
    </Fade>
  )
}

export default BtnShowGraph
