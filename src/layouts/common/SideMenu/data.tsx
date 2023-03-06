import { ROUTES } from '@/constants/routes'
import { CreatorCenterIcon } from '@/components/icons/CreatorCenterIcon'
import { DAOIcon } from '@/components/icons/DAOIcon'
import { FanTokenIcon } from '@/components/icons/FanTokenIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { NoAvatarIcon } from '@/components/icons/NoAvatarIcon'
import { StarIcon } from '@/components/icons/StarIcon'
import { TreasuryIcon } from '@/components/icons/TreasuryIcon'
import { TSidebarData } from '../SidebarList'

export const menuData: TSidebarData = [
  {
    name: 'home',
    icon: <HomeIcon />,
    link: ROUTES.HOME,
  },
  {
    name: 'creatorCenter',
    icon: <CreatorCenterIcon />,
    link: ROUTES.CREATOR_CENTER,
    isPrivate: true,
  },
  {
    name: 'fanToken',
    icon: <FanTokenIcon />,
    commingSoon: true,
  },
  {
    name: 'dao',
    icon: <DAOIcon />,
    commingSoon: true,
  },
  {
    name: 'treasury',
    icon: <TreasuryIcon />,
    commingSoon: true,
  },
  {
    name: 'fanManagement',
    icon: <StarIcon />,
    commingSoon: true,
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
