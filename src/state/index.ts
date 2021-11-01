import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import poolsReducer from './pools'
import presaleReducer from './presale'
// import predictionsReducer from './predictions'
// import profileReducer from './profile'
// import teamsReducer from './teams'
// import achievementsReducer from './achievements'
import blockReducer from './block'
// import collectiblesReducer from './collectibles'
// import votingReducer from './voting'
// import lotteryReducer from './lottery'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    // achievements: achievementsReducer,
    block: blockReducer,
    farms: farmsReducer,
    pools: poolsReducer,
    presale: presaleReducer,
    // predictions: predictionsReducer,
    // profile: profileReducer,
    // teams: teamsReducer,
    // collectibles: collectiblesReducer,
    // voting: votingReducer,
    // lottery: lotteryReducer,
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
