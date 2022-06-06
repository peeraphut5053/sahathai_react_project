import BallotIcon from '@material-ui/icons/Ballot';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FindInPageIcon from '@material-ui/icons/FindInPage';

import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';

const ListItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/ERPStep',
    icon: BallotIcon,
    title: 'ERPStep'
  },
  {
    href: '/app/productionReport',
    icon: AssignmentIcon,
    title: 'production report'
  },
  {
    href: '/app/productionMatlTrans',
    icon: AssignmentIcon,
    title: 'production MatlTrans'
  },
  {
    href: '/app/moveItem',
    icon: LocalShippingIcon,
    title: 'move Item'
  },
  // {
  //   href: '/app/FreeZoneApp',
  //   icon: DirectionsBoatIcon,
  //   title: 'Free Zone'
  // },
  {
    href: '/app/users',
    icon: PeopleAltIcon,
    title: 'Users'
  },
  {
    href: '/app/SerachReport',
    icon: FindInPageIcon,
    title: 'Search Report'
  },
  
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];


export default ListItems;