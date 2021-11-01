import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useFetchPublicPresaleData, usePresale } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { BaseLayout } from 'uikit'
import Page from 'components/Layout/Page'
import Timeline from './components/Timeline'
import Remaining from './components/Remaining'
import Details from './components/Details'
import InputAction from './components/InputAction'

const PageContainer = styled.div`
  background: linear-gradient(rgba(0, 24, 35, 1) 0%, rgba(46, 0, 85, 1) 75%);
`

const StyledPage = styled.div`
  background-image: none;
  ${({ theme }) => theme.mediaQueries.md} {
    background-image: url('/images/presale/token.png'), url('/images/presale/token-180.png'),
      url('/images/presale/token-180.png'), url('/images/presale/token-flip.png'), url('/images/presale/token-blur.png'),
      url('/images/presale/token-flip-blur.png');
    background-repeat: no-repeat;
    background-position: 120% 20%, 10% 30%, 90% 90%, -10% 110%, 15% 50%, 50% 95%;
    background-size: 482px 482px, 176px 176px, 152px 152px, 320px 320px, 68px 68px, 44px 44px;
  }
`

const Hero = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 270px;
  margin: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 28px;
    border-radius: 20px;
  }
`

const Title = styled.p`
  font-size: 40px;
  font-weight: 300;
  margin-bottom: 22px;
  line-height: 60px;
  letter-spacing: 8px;
`

const Cards = styled(BaseLayout)`
  display: flex;
  justify-content: center;

  & > div {
    grid-column: span 8;
    width: 90%;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const PreSale: React.FC = () => {
  const { t } = useTranslation()
  useFetchPublicPresaleData()
  const { account } = useWeb3React()
  const { presale, userDataLoaded } = usePresale(account)
  return (
    <PageContainer>
      <StyledPage>
        <Page>
          <Hero>
            <Title>{t('PRESALE')}</Title>
            <img src="images/home/logo.png" alt="logo" />
          </Hero>
          <Cards>
            <Timeline presale={presale} />
          </Cards>
          <Cards>
            <Remaining presale={presale} />
          </Cards>
          <Cards>
            <Details presale={presale} />
          </Cards>
          <Cards>
            <InputAction presale={presale} />
          </Cards>
        </Page>
      </StyledPage>
    </PageContainer>
  )
}

export default PreSale
