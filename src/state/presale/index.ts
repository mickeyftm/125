/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fetchPresale from './fetchPublicPresaleData'
import fetchPresaleUser from './fetchUserPresaleData'
import { PresaleState } from '../types'

const initialState: PresaleState = {
  presaleStartTimestamp: null,
  presaleEndTimestamp: null,
  hardCapEthAmount: null,
  totalDepositedEthBalance: null,
  minimumDepositEthAmount: null,
  maximumDepositEthAmount: null,
  userDataLoaded: false,
  userData: {
    balance: null,
    deposits: null,
  },
}

// Async thunks
export const fetchPresalePublicDataAsync = () => async (dispatch) => {
  const presale = await fetchPresale()
  dispatch(setPresalePublicData(presale))
}

export const fetchUserPresaleDataAsync =
  (account: string): any =>
  async (dispatch) => {
    const { deposits, balance } = await fetchPresaleUser(account)
    dispatch(setUserPresaleData({ deposits, balance }))
  }

export const PresaleSlice = createSlice({
  name: 'Presale',
  initialState,
  reducers: {
    setPresalePublicData: (state, action) => {
      const livePresaleData: PresaleState = action.payload
      return { ...state, ...livePresaleData }
    },
    setUserPresaleData: (state, action) => {
      const userData = action.payload
      state.userDataLoaded = true
      state.userData = { ...userData }
    },
  },
})

export const { setPresalePublicData, setUserPresaleData } = PresaleSlice.actions

export default PresaleSlice.reducer
