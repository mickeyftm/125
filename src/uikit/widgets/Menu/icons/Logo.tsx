import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

interface LogoProps extends SvgProps {
  isDark: boolean
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? '#FFFFFF' : '#000000'
  return (
    <Svg viewBox="0 0 234 27" {...props}>
      <path d="M56.8872 14C56.8979 15.0587 56.6935 16.1079 56.2875 17.08C55.8843 18.0287 55.3209 18.8955 54.6237 19.64C53.9116 20.3722 53.0701 20.9561 52.1449 21.36C51.1992 21.7865 50.1779 22.0045 49.1462 22H44L46.5634 19.32H49.1365C49.826 19.323 50.5094 19.1872 51.1486 18.92C51.7665 18.65 52.3263 18.2557 52.7954 17.7599C53.2581 17.2658 53.6316 16.6901 53.8982 16.06C54.1669 15.4087 54.3055 14.708 54.3055 14C54.3055 13.2919 54.1669 12.5912 53.8982 11.94C53.6317 11.3049 53.2509 10.728 52.7761 10.24C52.3018 9.75056 51.7433 9.35714 51.1292 9.07996C50.4963 8.81462 49.8195 8.67878 49.1365 8.67996H46.5634L44 5.99996H49.1462C50.1777 5.99774 51.1986 6.21562 52.1449 6.63995C53.0616 7.04918 53.8958 7.63262 54.6043 8.35996C55.3172 9.09744 55.8913 9.96552 56.2971 10.92C56.6999 11.8927 56.9009 12.9419 56.8872 14Z" />
      <path d="M70.0404 19.32L68.7249 22H65.8616L73.6002 6L78.7657 16.68H75.8637L73.6002 11.98L71.3173 16.68L70.0404 19.32ZM81.3388 22H78.4562L77.1793 19.34H80.0426L81.3388 22Z" />
      <path d="M95.8972 16.25L99.07 22H96.1003L91.6119 13.98L93.9142 14C94.597 13.9902 95.2489 13.7041 95.7299 13.203C96.211 12.702 96.4829 12.0259 96.4873 11.32C96.4918 10.9712 96.4252 10.6253 96.2919 10.3048C96.1585 9.98436 95.9614 9.69651 95.7134 9.46C95.4809 9.20987 95.2013 9.01161 94.8919 8.87746C94.5824 8.74331 94.2497 8.67611 93.9142 8.68H88.7486L88.4584 8.38L87.1235 6H93.9142C95.2786 6.00132 96.5868 6.56225 97.5516 7.55965C98.5165 8.55706 99.0591 9.90945 99.0603 11.32C99.0774 12.4013 98.7587 13.4597 98.1511 14.34C97.6003 15.1943 96.8155 15.8593 95.8972 16.25Z" />
      <path d="M110.359 14L118.097 22H114.47L107.776 15.12L106.692 14.02L107.776 12.9L114.46 6H118.087L110.359 14ZM107.766 12.9L114.46 6L107.766 12.9ZM114.46 22L107.766 15.12L114.46 22Z" />
      <path d="M129.995 6L137.753 14L145.492 6V22H142.938V12.44L137.753 17.78L129.995 9.72V6Z" />
      <path d="M158.435 19.32L157.119 22H154.256L161.994 6L167.16 16.68H164.258L161.994 11.98L159.712 16.68L158.435 19.32ZM169.733 22H166.85L165.574 19.34H168.447L169.733 22Z" />
      <path d="M183.256 6V8.68H178.12V22H175.518V6H183.256Z" />
      <path d="M197.95 6V8.68H192.814V22H190.211V6H197.95Z" />
      <path d="M215.236 6V8.68H207.498L204.925 6H215.236ZM207.498 12.68H215.236V15.34H204.925V12.68H207.498ZM207.498 19.32H215.236V22H204.925V21.78L207.498 19.32Z" />
      <path d="M230.839 16.25L234.012 22H231.042L226.554 13.98L228.856 14C229.539 13.9902 230.191 13.7041 230.672 13.203C231.153 12.702 231.425 12.0259 231.429 11.32C231.434 10.9712 231.367 10.6253 231.234 10.3048C231.101 9.98436 230.904 9.69651 230.656 9.46C230.423 9.20987 230.143 9.01161 229.834 8.87746C229.525 8.74331 229.192 8.67611 228.856 8.68H223.691L223.401 8.38L222.066 6H228.856C230.221 6.00132 231.529 6.56225 232.494 7.55965C233.459 8.55706 234.001 9.90945 234.003 11.32C234.02 12.4013 233.701 13.4597 233.093 14.34C232.542 15.1943 231.758 15.8593 230.839 16.25Z" />

      <path d="M23.4283 11.6937C23.1819 11.5757 22.9897 11.3624 22.8927 11.0994C22.7958 10.8363 22.8018 10.5444 22.9094 10.2859C24.1553 7.29053 24.2518 4.67668 22.9018 3.26571C20.4131 0.66448 13.949 3.13407 8.46339 8.78348C7.62318 9.65055 6.08863 11.663 4.92025 13.2418C4.73836 13.4876 4.49991 13.682 4.22678 13.8073C3.95365 13.9326 3.65458 13.9847 3.35699 13.9589C3.0594 13.9331 2.77281 13.8302 2.52352 13.6596C2.27422 13.489 2.0702 13.2562 1.93015 12.9825C0.428268 10.0455 -1.34938 5.04716 1.58146 1.58989C3.21021 -0.330295 6.29147 -0.393354 9.60974 0.773259C9.74146 0.819573 9.86274 0.893161 9.96623 0.989561C10.0697 1.08596 10.1533 1.20316 10.2118 1.33407C10.2703 1.46497 10.3026 1.60684 10.3067 1.75108C10.3109 1.89532 10.2867 2.03893 10.2357 2.17319C10.1388 2.42897 9.95007 2.63579 9.70922 2.75016C9.46837 2.86453 9.19417 2.87754 8.94426 2.78645C6.451 1.87523 4.3201 1.93593 3.10689 3.18531C1.64907 4.68299 1.83443 7.57272 3.30897 10.8432C3.33171 10.894 3.36685 10.9377 3.41089 10.9701C3.45493 11.0025 3.50636 11.0223 3.56009 11.0278C3.61381 11.0332 3.66796 11.0239 3.71719 11.001C3.76641 10.978 3.809 10.9421 3.84074 10.8968C4.77148 9.57342 5.80315 8.32976 6.9258 7.17781C13.2615 0.65108 21.1044 -1.80827 24.4425 1.67817C26.3645 3.68743 26.3728 7.23298 24.8223 11.1254C24.7688 11.2594 24.6898 11.3809 24.5901 11.4825C24.4903 11.5842 24.3719 11.6639 24.2417 11.717C24.1116 11.77 23.9725 11.7953 23.8327 11.7913C23.693 11.7873 23.5554 11.7541 23.4283 11.6937Z" />
      <path d="M24.3591 25.403C22.7706 27.3602 19.6491 27.3863 16.3247 26.2165C16.094 26.1362 15.8983 25.9734 15.7725 25.7572C15.6468 25.541 15.5993 25.2854 15.6385 25.0362C15.6777 24.787 15.801 24.5603 15.9864 24.3968C16.1718 24.2332 16.4073 24.1434 16.6506 24.1434C16.7661 24.1431 16.8807 24.1636 16.9895 24.2041C19.4842 25.1177 21.6182 25.0585 22.8329 23.8099C24.3067 22.2918 24.0993 19.3547 22.5784 16.0378C22.5604 15.9988 22.533 15.9654 22.4989 15.9407C22.4647 15.9161 22.4249 15.9011 22.3835 15.8972C22.3421 15.8933 22.3003 15.9006 22.2625 15.9185C22.2246 15.9364 22.1918 15.9642 22.1674 15.9992C20.1845 18.8344 17.7552 21.3025 14.9816 23.3C14.2979 23.7879 13.6142 24.2285 12.9305 24.6211C8.29037 27.2885 3.80827 27.7299 1.49732 25.3116C-0.444414 23.2826 -0.433778 19.6874 1.16079 15.7509C1.21407 15.6189 1.29206 15.4993 1.39023 15.3988C1.48839 15.2984 1.60479 15.2191 1.73268 15.1657C1.86056 15.1122 1.9974 15.0856 2.13526 15.0875C2.27312 15.0893 2.40926 15.1194 2.53581 15.1762C2.66169 15.2329 2.77553 15.3148 2.87077 15.4173C2.96602 15.5199 3.04079 15.6409 3.09077 15.7735C3.14076 15.9061 3.16498 16.0476 3.16205 16.19C3.15911 16.3324 3.12907 16.4727 3.07366 16.603C1.78752 19.6417 1.67433 22.2973 3.03871 23.724C4.55199 25.3068 7.53601 25.0128 10.8763 23.2684C11.5811 22.8996 12.2658 22.4909 12.9274 22.0443C14.5682 20.9305 16.0939 19.6441 17.4802 18.2055C18.3158 17.3486 19.801 15.3875 20.9451 13.8354C21.1329 13.5813 21.3783 13.3794 21.6596 13.2477C21.9409 13.116 22.2493 13.0586 22.5571 13.0807C22.865 13.1028 23.1628 13.2037 23.4239 13.3743C23.6851 13.5449 23.9014 13.78 24.0537 14.0585C25.6027 16.8899 27.375 21.6817 24.3591 25.403Z" />
      <path d="M13.1021 16.4335C14.6629 16.4335 15.9281 15.1206 15.9281 13.5012C15.9281 11.8817 14.6629 10.5689 13.1021 10.5689C11.5414 10.5689 10.2761 11.8817 10.2761 13.5012C10.2761 15.1206 11.5414 16.4335 13.1021 16.4335Z" />
    </Svg>
  )
}

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark)
