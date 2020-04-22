import React from 'react'

const Hotlines = () => {
  return (
    <table className="table-auto mx-auto shadow rounded-b-md">
      <colgroup>
        <col width="60%" />
        <col width="40%" />
      </colgroup>
      <thead>
        <tr className="bg-gray-200">
          <th className="border-b px-2 md:px-4 py-4 font-medium text-left rounded-tl-md text-sm md:text-base">
            Department
          </th>
          <th className="border-b border-l px-2 md:px-4 py-4 font-medium rounded-tr-md text-sm md:text-base">
            Contact Number
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base">
            DILG / DOH
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base">
            <a href="tel:+63289426843" className="text-blue-400 block p-1">
              (02) 894-26843
            </a>

            <span className="text-xs">(02) 894-COVID</span>
          </td>
        </tr>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base">
            RITM{' '}
            <span className="text-xs">
              (RESEARCH INSTITUTE FOR TROPICAL MEDICINE)
            </span>
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base">
            <a href="tel:+63288072628" className="text-blue-400 block p-1">
              (02) 880-72628
            </a>

            <a href="tel:+63288072629" className="text-blue-400 block p-1">
              (02) 880-72629
            </a>

            <a href="tel:+63288072630" className="text-blue-400 block p-1">
              (02) 880-72630
            </a>

            <a href="tel:+63288072631" className="text-blue-400 block p-1">
              (02) 880-72631
            </a>

            <a href="tel:+63288072632" className="text-blue-400 block p-1">
              (02) 880-72632
            </a>

            <a href="tel:+63288072637" className="text-blue-400 block p-1">
              (02) 880-72637
            </a>

            <span className="text-xs">local 297 / 440 / 441</span>
          </td>
        </tr>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base">
            RITM LABORATORY CONFIRMATION RESULT
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base">
            <a href="tel:+639199279180" className="text-blue-400 block p-1">
              (63) 919 927-9180
            </a>

            <a href="tel:+639199279204" className="text-blue-400 block p-1">
              (63) 919 927-9204
            </a>
          </td>
        </tr>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base">
            EMERGENCY HOTLINE
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base">
            <a href="tel:911" className="text-blue-400 block p-1">
              911
            </a>
          </td>
        </tr>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base">
            PRESIDENTIAL COMPLAINT CENTER
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base">
            <a href="tel:8888" className="text-blue-400 block p-1">
              8888
            </a>
          </td>
        </tr>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base">
            SMART, PLDT, SUN and TNT
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base">
            <a href="tel:1555" className="text-blue-400 block p-1">
              1555
            </a>
          </td>
        </tr>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base">
            PHILIPPINE NATIONAL RED CROSS
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base">
            <a href="tel:143" className="text-blue-400 block p-1">
              143
            </a>
          </td>
        </tr>
        <tr className="bg-white">
          <td className="border-b px-2 md:px-4 py-2 text-left text-sm md:text-base rounded-b-md">
            RED CROSS EMERGENCY RESPONSE UNIT
          </td>
          <td className="border-b border-l px-2 md:px-4 py-2 text-sm md:text-base rounded-b-md">
            <a href="tel:+63287902300" className="text-blue-400 block p-1">
              (02) 879-02300
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Hotlines
