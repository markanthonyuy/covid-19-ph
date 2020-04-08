import React from 'react'
import { Bar } from 'react-chartjs-2'

const BtnShowGraph = (props) => {
  return (
    <React.Fragment>
      <button
        className="btn-apply m-auto my-6 bg-green-400 py-2 text-sm text-white px-6 rounded shadow"
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
            labels: ['Cases', 'Recovered', 'Deaths'],
            datasets: [
              {
                backgroundColor: [
                  props.casesColor,
                  props.recoveredColor,
                  props.deathsColor,
                ],
                borderWidth: 1,
                hoverBorderColor: '#000',
                data: [
                  props.casesValue,
                  props.recoveredValue,
                  props.deathsValue,
                ],
              },
            ],
          }}
          legend={{
            display: false,
          }}
        ></Bar>
      </div>
    </React.Fragment>
  )
}

export default BtnShowGraph
