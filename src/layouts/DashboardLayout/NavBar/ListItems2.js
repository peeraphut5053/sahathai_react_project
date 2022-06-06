import BallotIcon from '@material-ui/icons/Ballot';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import FaceIcon from '@material-ui/icons/Face';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import HomeIcon from '@material-ui/icons/Home';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

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


const ListItems2 = [
    {
        Icon: BallotIcon,
        menutitle: 'ERPStep',
        href: '/app/ERPStep',
    },
    
    {
        Icon: LocalLibraryIcon,
        menutitle: 'รายงานผู้บริหาร',
        submenu: [
            {
                href: '/app/ExecutiveReport',
                Icon: AssignmentIcon,
                title: 'รายงานการผลิต'
            },
        ]
    },
    {
        Icon: LocalLibraryIcon,
        menutitle: 'Audit Log',
        submenu: [
            {
                href: '/app/COItemSummary',
                Icon: AssignmentIcon,
                title: 'รายงาน CO summary'
            },
            {
                href: '/app/ByCOItemQTY',
                Icon: AssignmentIcon,
                title: 'รายงาน Log by CO item QTY'
            },
        ]
    },
    {
        Icon: LocalShippingIcon,
        menutitle: 'จัดซื้อ',
        submenu: [
            {
                href: '/app/UpdateBarcodeQty',
                Icon: AssignmentIcon,
                title: 'Update Barcode Qty'
            },
        ]
    },
    // {
    //     Icon: FindInPageIcon,
    //     menutitle: 'Search Report',
    //     href: '/app/SerachReport',
    // },
    {
        Icon: MonetizationOnIcon,
        menutitle: 'ขายในประเทศ',
        submenu: [
            {
                href: '/app/DomesticBacklog',
                Icon: AssignmentIcon,
                title: 'รายงานค้างส่งในประเทศ'
            },
            {
                href: '/app/DomesticItemStock',
                Icon: AssignmentIcon,
                title: 'รายงาน Item คงเหลือ(คลังย่อย)'
            },
            {
                href: '/app/2',
                Icon: AssignmentIcon,
                title: 'รายงาน Item Invoice'
            },
            {
                href: '/app/3',
                Icon: AssignmentIcon,
                title: 'รายงานใบมัดจำ'
            },
            {
                href: '/app/4',
                Icon: AssignmentIcon,
                title: 'Domestic Ledger Posted '
            },
            {
                href: '/app/5',
                Icon: AssignmentIcon,
                title: 'รายงาน DO ที่ยังไม่เปิด INV'
            },
        ]
    },
    {
        Icon: MonetizationOnOutlinedIcon,
        menutitle: 'ขายต่างประเทศ',
        submenu: [
            {
                href: '/app/PendingSubmitedReportEX',
                Icon: AssignmentIcon,
                title: 'รายงานค้างส่งต่างประเทศ'
            },
            {
                href: '/app/2',
                Icon: AssignmentIcon,
                title: 'รายงาน Item Invoice'
            },
            {
                href: '/app/3',
                Icon: AssignmentIcon,
                title: 'Export Ledger Posted '
            },
        ]
    },
    {
        Icon: AttachMoneyIcon,
        menutitle: 'การเงิน',
        submenu: [
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'รายงาน AR Transaction'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'General Ledger'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Collection Day'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Material Purchase'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Workbanch shipping'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Payment Invice Checking'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'กำหนดกลุ่ม Work center'
            },
        ]
    },
    {
        Icon: OfflinePinIcon,
        menutitle: 'QC',
        submenu: [
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'รายงานการมัดท่อ'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Hotroll Checking'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'DO Packing'
            },
        ]
    },
    {
        Icon: HomeIcon,
        menutitle: 'คลัง',
        submenu: [
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'รายงานสต็อคเหล็กม้วนคงเหลือ'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Check Item Location'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Quantity Move'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'DO Checking'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'พิมพ์ใบนับสต๊อคสินค้า'
            },
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'ใบนับสด๊อค Item'
            },
        ]
    },
    
    {
        Icon: HomeWorkIcon,
        menutitle: 'ผลิต',
        submenu: [
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Production report'
            },
            {
                href: '/app/productionMatlTrans',
                Icon: AssignmentIcon,
                title: 'Material Transaction'
            },
            {
                href: '/app/Stock_mthly',
                Icon: AssignmentIcon,
                title: 'Stock monthly '
            },
            {
                href: '/app/moveItem',
                icon: LocalShippingIcon,
                title: 'Move Item'
            },
            {
                href: '/app/productionDashboard',
                Icon: AssignmentIcon,
                title: 'Production Dashboard'
            },
            {
                Icon: WatchLaterIcon,
                menutitle: 'รายงาน OT พนักงาน',
                href: '/app/ProductionOvertime',
            },
        ]
    },
    {
        Icon: HomeWorkIcon,
        menutitle: 'จัดส่ง',
        submenu: [
            {
                href: '/app/BoatNote',
                Icon: AssignmentIcon,
                title: 'Boat Note report'
            },
        ]
    },
    {
        Icon: LocalAtmIcon,
        menutitle: 'ตุ้นทุน',
        submenu: [
            {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Production report'
            },
            {
                href: '/app/productionMatlTrans',
                Icon: AssignmentIcon,
                title: 'Production MatlTrans'
            },
            {
                href: '/app/moveItem',
                icon: LocalShippingIcon,
                title: 'move Item'
            },
        ]
    },
    {
        Icon: FaceIcon,
        menutitle: 'การจัดการผู้ใช้งาน',
        submenu: [
            {
                href: '/app/account',
                icon: UserIcon,
                title: 'Account'
            },
            {
                href: '/app/users',
                icon: PeopleAltIcon,
                title: 'Users'
            },
        ]
    },
];


export default ListItems2;