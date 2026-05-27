import BallotIcon from '@mui/icons-material/Ballot';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FaceIcon from '@mui/icons-material/Face';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import HomeIcon from '@mui/icons-material/Home';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ImageIcon from '@mui/icons-material/Image';
import {
    User as UserIcon,
} from 'react-feather';


const ListItems2 = [
    {
        Icon: BallotIcon,
        menutitle: 'ERPStep',
        href: '/app/ERPStep',
    },
    {
        Icon: ImageIcon,
        menutitle: 'ระบบนับท่อ',
        href: '/app/PipeCounter',
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
            {
                href: '/app/ProductionChart',
                Icon: AssignmentIcon,
                title: 'กราฟรายงานการผลิต'
            },
            {
                href: '/app/LocationItemReport',
                Icon: AssignmentIcon,
                title: 'สต๊อกท่อคงคลัง'
            },
            {
                href: '/app/ProductionReportByMonth',
                Icon: AssignmentIcon,
                title: 'รายงานการผลิตรายเดือน'
            }
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
    {}
        ]
    },
    {
        Icon: MonetizationOnOutlinedIcon,
        menutitle: 'ขายต่างประเทศ',
        submenu: [
      {}
        ]
    },
    {
        Icon: AttachMoneyIcon,
        menutitle: 'การเงิน',
        submenu: [
{}
        ]
    },
    {
        Icon: OfflinePinIcon,
        menutitle: 'QC',
        submenu: [
{
    
}
        ]
    },
    {
        Icon: HomeIcon,
        menutitle: 'คลัง',
        submenu: [
            {

            }
        ]
    },

    {
        Icon: HomeWorkIcon,
        menutitle: 'ผลิต',
        submenu: [
            {
                href: '/app/JobRecicpt',
                Icon: AssignmentIcon,
                title: 'JobReceipt'
            },
            {
                href: '/app/JobOrderProcessing',
                Icon: AssignmentIcon,
                title: 'Job Order Processing'
            },
            {
                href: '/app/JobReport',
                Icon: AssignmentIcon,
                title: 'Job Report'
            },
            {
                href: '/app/productionMatlTrans',
                Icon: AssignmentIcon,
                title: 'Material Transaction'
            },
            {
                href: '/app/moveItem',
                icon: LocalShippingIcon,
                title: 'Move Item'
            },
            {
                href: '/app/ProductionLiveBoardV2',
                Icon: AssignmentIcon,
                title: 'Production Live Board V2'
            },
                     {
                href: '/app/productionReport',
                Icon: AssignmentIcon,
                title: 'Production Report'
            }
        ]
    },
    {
        Icon: HomeWorkIcon,
        menutitle: 'จัดส่ง',
        submenu: [
            // {
            //     href: '/app/BoatNote',
            //     Icon: AssignmentIcon,
            //     title: 'Boat Note report'
            // },
            {
                href: '/app/BoatNote',
                Icon: AssignmentIcon,
                title: 'ใช้สำหรับย้ายลงเรือ (Boat Note)'
            },
            {
                href: '/app/TruckNote',
                Icon: AssignmentIcon,
                title: 'ใช้สำหรับย้ายขึ้นรถ'
            },

        ]
    },
    {
        Icon: LocalAtmIcon,
        menutitle: 'ตุ้นทุน',
        submenu: [
            {
            
        }
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


{/* 
    function convertAllLotReportV2(wordShow, LotFromData) {
    let dataNotSpiltLotQty = LotFromData.split(';')

    // write show word but dataNotSpiltLotQty have lotnum and lotqty
    let word = ""
    for (let i = 0; i < dataNotSpiltLotQty.length; i++) {
        word = word + `${dataNotSpiltLotQty[i]}`
        if (i !== dataNotSpiltLotQty.length - 1) {
            word = word + '\n_____\n'
        }
    }
    return word
}
*/}
