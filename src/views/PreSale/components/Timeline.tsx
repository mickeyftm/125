/* eslint-disable prefer-template */
import React from 'react'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { Text, Flex, Skeleton } from 'uikit'
import styled from 'styled-components'
import { PresaleState } from 'state/types'

const StyledTimelineContainer = styled.div`
  display: flex;
  max-width: 564px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Pill = styled.div`
  width: 51px;
  height: 18px;
  border-radius: 14.5px;
  padding: 3px 13px;
  background-color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 77px;
    height: 30px;
    padding: 4px 18px;
  }
`

const PillText = styled(Text)`
  font-size: 8px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`

const TimelineText = styled(Text)`
  margin-left: 16px;
  font-size: 8px;
  margin-top: auto;
  margin-bottom: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`
interface TimelineProps {
  presale: PresaleState
}
const Timeline: React.FC<TimelineProps> = ({ presale }) => {
  const startTime = presale.presaleStartTimestamp
    ? new Date(new BigNumber(presale.presaleStartTimestamp).toNumber() * 1000)
    : null
  const endTime = presale.presaleEndTimestamp
    ? new Date(new BigNumber(presale.presaleEndTimestamp).toNumber() * 1000)
    : null
  const formatDate = (date: Date) => {
    let hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours %= 12
    hours = hours || 12 // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes
    const strTime = hours + ':' + strMinutes + ' ' + ampm

    return date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + ' - ' + strTime + ' UTC'
  }
  return (
    <StyledTimelineContainer>
      <Flex mb={['14px', '14px', '0px']}>
        <Pill>
          <PillText color="contrast" textTransform="uppercase">
            Start
          </PillText>
        </Pill>
        <TimelineText>{startTime ? formatDate(startTime) : <Skeleton />}</TimelineText>
      </Flex>
      <Flex>
        <Pill>
          <PillText color="contrast" textTransform="uppercase">
            End
          </PillText>
        </Pill>
        <TimelineText> {endTime ? formatDate(endTime) : <Skeleton />}</TimelineText>
      </Flex>
    </StyledTimelineContainer>
  )
}

export default Timeline
