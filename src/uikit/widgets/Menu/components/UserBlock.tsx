import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button/Button'
import { useWalletModal } from '../../WalletModal'
import { Login } from '../../WalletModal/types'

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const StyledButton = styled(Button)`
  border-radius: 16px;
`

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  return (
    <div>
      {account ? (
        <StyledButton
          width="110px"
          height="32px"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal()
          }}
        >
          {accountEllipsis}
        </StyledButton>
      ) : (
        <StyledButton
          width="110px"
          height="32px"
          onClick={() => {
            onPresentConnectModal()
          }}
        >
          Connect
        </StyledButton>
      )}
    </div>
  )
}

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout,
)
