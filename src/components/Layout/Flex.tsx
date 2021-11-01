import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 24.5%;
    width: 100%;
    margin: 0 27px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
