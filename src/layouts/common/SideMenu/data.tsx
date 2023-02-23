import { CreatorCenterIcon } from '@/components/icons/CreatorCenterIcon'
import { DAOIcon } from '@/components/icons/DAOIcon'
import { FanTokenIcon } from '@/components/icons/FanTokenIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { NoAvatarIcon } from '@/components/icons/NoAvatarIcon'
import { StarIcon } from '@/components/icons/StarIcon'
import { TreasuryIcon } from '@/components/icons/TreasuryIcon'
import { ROUTES } from '@/constants/routes'
import { TSidebarData } from '../SidebarList'

export const menuData: TSidebarData = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    link: ROUTES.HOME,
  },
  {
    name: 'Creator center',
    icon: <CreatorCenterIcon />,
  },
  {
    name: 'Fan Token EX',
    icon: <FanTokenIcon />,
  },
  {
    name: 'DAO',
    icon: <DAOIcon />,
  },
  {
    name: 'Treasury',
    icon: <TreasuryIcon />,
  },
  {
    name: 'Fan management',
    icon: <StarIcon />,
  },
]

export const followingMockData: TSidebarData = [
  {
    name: 'John Dou',
    icon: <NoAvatarIcon />,
  },
  {
    name: 'Will Smith',
    icon: <NoAvatarIcon />,
  },
  {
    name: 'Abraham Yelow',
    icon: <NoAvatarIcon />,
  },
  {
    name: 'Mango Montenegro',
    icon: <NoAvatarIcon />,
  },
]
