import React from 'react'
import Png from '../Raw/DarkMatterRound.png'

const Icon = ({ m, w }) => {
  return <img src={Png} alt="dark-matter-round" style={{ margin: m, width: w, height: w }} />
}

export default Icon
