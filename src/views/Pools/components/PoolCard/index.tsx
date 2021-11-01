import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { CardBody, Flex, Text, CardRibbon } from 'uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'
import AprRow from './AprRow'
import { StyledCard, StyledCardInner } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'
import Divider from './Divider'

const StyledUnlock = styled(UnlockButton)`
  border-radius: 6px;
`

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  return (
    <StyledCard
      isSecondary
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardInner>
        <StyledCardHeader
          isStaking={accountHasStakedBalance}
          earningToken={earningToken}
          stakingToken={stakingToken}
          isFinished={isFinished && sousId !== 0}
        />
        <CardBody backgroundColor="#361C7F" p="24px 28px 16px">
          <AprRow pool={pool} />
          <Flex mt="24px" flexDirection="column">
            {account ? (
              <CardActions pool={pool} stakedBalance={stakedBalance} />
            ) : (
              <>
                <Text
                  mb="10px"
                  textTransform="uppercase"
                  fontSize="10px"
                  fontFamily="Quicksand"
                  color="textSubtle"
                  bold
                >
                  {t('Start earning')}
                </Text>
                <StyledUnlock mt="8px" height="38px" scale="xs" bold fontFamily="Quicksand" />
              </>
            )}
          </Flex>
        </CardBody>
        <Divider />
        <CardFooter pool={pool} account={account} />
      </StyledCardInner>
    </StyledCard>
  )
}

export default PoolCard
