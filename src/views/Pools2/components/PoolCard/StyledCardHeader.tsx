import React from 'react'
import { CardHeader, Heading, Text, Flex } from 'uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import TokenPairImage from 'components/TokenPairImage'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: linear-gradient(90deg, #c45bec, #9112ff);
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false, isStaking = false }) => {
  const { t } = useTranslation()
  const isCakePool = earningToken.symbol === 'CAKE' && stakingToken.symbol === 'CAKE'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isCakePool) {
      // manual cake
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    if (isCakePool) {
      return t('Earn CAKE, stake CAKE')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper p="32px 32px 28px 22px" isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color="#FFFFFF" scale="md">
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          <Text fontSize="10px" bold color="tertiary">
            {getSubHeading()}
          </Text>
        </Flex>
        <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={44} height={44} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
