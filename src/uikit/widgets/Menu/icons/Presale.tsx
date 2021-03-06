import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 18 15" {...props}>
      <path
        fill="#FDFDFD"
        d="M.818 0A.82.82 0 000 .818v6.546c0 .45.368.818.818.818H13.91a.82.82 0 00.818-.818V.818A.82.82 0 0013.91 0H.82zm1.566 1.636h9.962c.122.349.396.624.745.748v3.417a1.212 1.212 0 00-.745.744H2.384a1.225 1.225 0 00-.748-.744V2.384c.349-.124.624-.4.748-.748zm4.98.819a1.635 1.635 0 100 3.272 1.635 1.635 0 100-3.272zm9.818 4.09a.82.82 0 00-.818.819v4.982a1.212 1.212 0 00-.745.745H5.657a1.225 1.225 0 00-.748-.745v-1.71a.82.82 0 00-.818-.818.82.82 0 00-.818.818v3.273c0 .45.367.818.818.818h13.09A.82.82 0 0018 13.91V7.364a.82.82 0 00-.818-.819zM9.227 9.818a1.62 1.62 0 00-.227.818 1.635 1.635 0 103.273 0c0-.3-.087-.575-.227-.818h-2.82z"
      />{' '}
    </Svg>
  )
}

export default Icon
