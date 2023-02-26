import { BaseButton } from '@/components/buttons/BaseButton'
import { NetworksIcon } from '@/components/icons/NetworksIcon'
import { NETWORKS } from '@/constants/networks'
import Box from '@/styles/Box'
import { INetworkPalette } from '@/styles/styled'
import React, { FC, useState } from 'react'
import styled, { css } from 'styled-components'

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.palette.accent300};
  min-width: 80px;
  height: 40px;
  border-radius: 8px;
`

const Button = styled(BaseButton)<{ network: keyof INetworkPalette }>`
  width: 52px;
  height: 40px;
  background-color: ${({ theme, network }) => theme.network[network]};
  border-radius: 5px;
  display: flex;
  position: relative;
  z-index: 2;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const DropdownButton = styled(Button)<{ itemId: number; open: boolean }>((props) => {
  const { itemId, open } = props

  const closedStyles = css`
    opacity: 0;
    pointer-events: none;
  `
  const openStyles = css`
    opacity: 1;
    transform: translateY(${itemId * 100}%);
  `
  const baseStyles = css`
    position: absolute;
    left: 0;
    z-index: 1;
    transition: 0.3s;
  `
  return css`
    ${baseStyles}
    ${open ? openStyles : closedStyles}
  `
})

const networksList: {
  network: keyof typeof NETWORKS
  amount: string
}[] = [
  {
    network: 'BNB',
    amount: '1.005',
  },
  {
    network: 'ETH',
    amount: '2.05',
  },
  {
    network: 'POLYGON',
    amount: '1.1',
  },
]

export const NetworksDropdown: FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(networksList[0])
  const [openNetworks, setOpenNetworks] = useState(false)

  const openNetworksToggle = () => setOpenNetworks(!openNetworks)

  return (
    <Box position="relative" display="flex" alignItems="center" gridGap="12px">
      {networksList
        .filter((item) => selectedNetwork.network !== item.network)
        .map((item, i) => (
          <DropdownButton
            itemId={i + 1}
            open={openNetworks}
            network={NETWORKS[item.network]}
            key={item.network}
            onClick={() => setSelectedNetwork(item)}
          >
            <NetworksIcon network={item.network} />
          </DropdownButton>
        ))}
      <Button onClick={openNetworksToggle} network={NETWORKS[selectedNetwork.network]}>
        <NetworksIcon network={selectedNetwork.network} />
      </Button>
      <AmountWrapper>${selectedNetwork.amount}</AmountWrapper>
    </Box>
  )
}
