import { ROUTES } from '@/constants/routes'
import { CreatorCenterIcon } from '@/components/icons/CreatorCenterIcon'
import { DAOIcon } from '@/components/icons/DAOIcon'
import { FanTokenIcon } from '@/components/icons/FanTokenIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { StarIcon } from '@/components/icons/StarIcon'
import { TreasuryIcon } from '@/components/icons/TreasuryIcon'
import { TSidebarData } from '../SidebarList'

export const menuData: TSidebarData = [
  {
    name: 'home',
    icon: (props) => <HomeIcon {...props} />,
    link: ROUTES.HOME,
  },
  {
    name: 'creatorCenter',
    icon: (props) => <CreatorCenterIcon {...props} />,
    link: ROUTES.CREATOR_CENTER,
    isPrivate: true,
  },
  {
    name: 'fanToken',
    icon: (props) => <FanTokenIcon {...props} />,
  },
  {
    name: 'dao',
    icon: (props) => <DAOIcon {...props} />,
  },
  {
    name: 'treasury',
    icon: (props) => <TreasuryIcon {...props} />,
  },
  {
    name: 'fanManagement',
    icon: (props) => <StarIcon {...props} />,
  },
]
