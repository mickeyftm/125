import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'

const Hero = styled.div`
  background-image: url('/images/home/background-image.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.background_2};
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

const HeroContainer = styled.div`
  margin-bottom: 62px;
  ${({ theme }) => theme.mediaQueries.sm} {
    background-color: ${({ theme }) => theme.colors.background_2};
    border: 16px solid ${({ theme }) => theme.colors.background_2};
    border-radius: 20px;
    margin-bottom: 32px;
  }
`

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 15px;
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const PageContent = styled.div`
  margin: 0px 45px 0px 45px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0px 30px 0px 30px;
  }
`

const Cards = styled(BaseLayout)`
  display: flex;
  justify-content: center;

  & > div {
    // grid-column: span 6;
    // width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    & > div {
      grid-column: span 8;
      margin-bottom: 32px;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
      margin-bottom: 32px;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  grid-gap: 24px;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-wrap: nowrap;
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <HeroContainer>
        <Hero>
          <Title>{t('Welcome To')}</Title>
          <img src="images/home/logo.png" alt="logo" />
        </Hero>
      </HeroContainer>
      <PageContent>
        <Cards>
          <FarmStakingCard />
        </Cards>
        <Cards>
          <TotalValueLockedCard />
        </Cards>
        <CTACards>
          <EarnAPRCard />
          <EarnAssetCard />
        </CTACards>
      </PageContent>
    </Page>
  )
}

export default Home
// <Heading as="h1" scale="xl" mb="24px" color="secondary">
//   {t('Welcome To')}
// </Heading>
// <Text>{t('The #1 AMM and yield farm on Binance Smart Chain.')}</Text>
