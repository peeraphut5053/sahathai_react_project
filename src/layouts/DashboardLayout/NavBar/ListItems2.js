import BallotIcon from '@material-ui/icons/Ballot';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
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
    User as UserIcon,
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
            {
                href: '/app/ProductionChart',
                Icon: AssignmentIcon,
                title: 'กราฟรายงานการผลิต'
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
            {
                href: '/app/DomesticBacklog',
                Icon: AssignmentIcon,
                title: 'รายงานค้างส่งในประเทศ'
            },
            {
                href: '/app/CerDo',
                Icon: AssignmentIcon,
                title: 'สร้างใบ Cer DO'
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
                href: '/app/RPT_DO',
                Icon: AssignmentIcon,
                title: 'รายงาน DO ที่ยังไม่เปิด INV'
            },
            {
                href: '/app/CustomerOrder',
                Icon: AssignmentIcon,
                title: 'RPT Customer Order'
            }
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
            {
                href: '/app/OrderProcessing',
                Icon: AssignmentIcon,
                title: 'Order Processing'
            },
            {
                href: '/app/ADAllTemp',
                Icon: AssignmentIcon,
                title: 'AD All Temp'
            }
        ]
    },
    {
        Icon: AttachMoneyIcon,
        menutitle: 'การเงิน',
        submenu: [
            {
                href: '/app/ARTransactionReport',
                Icon: AssignmentIcon,
                title: 'รายงาน AR Transaction Report'
            },
            {
                href: '/app/GeneralLedger',
                Icon: AssignmentIcon,
                title: 'General Ledger'
            },
            {
                href: '/app/GeneralLedgerDetail',
                Icon: AssignmentIcon,
                title: 'General Ledger Detail'
            },
            {
                href: '/app/ReportGeneralLedgerDomesticInvoice',
                Icon: AssignmentIcon,
                title: 'รายงาน GL Domestic Invoice'
            },
            {
                href: '/app/CollectionDay',
                Icon: AssignmentIcon,
                title: 'Collection Day'
            },
            {
                href: '/app/MaterialPurchase',
                Icon: AssignmentIcon,
                title: 'Material Purchase'
            },
            {
                href: '/app/WorkbenchShipping',
                Icon: AssignmentIcon,
                title: 'Workbench Shipping'
            },
            {
                href: '/app/PaymentInvoice',
                Icon: AssignmentIcon,
                title: 'Payment Invoice Checking'
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
                href: '/app/DoInventoryDetail',
                Icon: AssignmentIcon,
                title: 'Do Inventory Detail'
            },
            {
                href: '/app/TagStatus',
                Icon: AssignmentIcon,
                title: 'Tag Status'
            },
            {
                href: '/app/QCLabTagDetail',
                Icon: AssignmentIcon,
                title: 'QC Lab Tag Detail'
            }
        ]
    },
    {
        Icon: HomeIcon,
        menutitle: 'คลัง',
        submenu: [
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
                href: '/app/JobRecicpt',
                Icon: AssignmentIcon,
                title: 'JobRecicpt'
            },
            {
                href: '/app/JobOrderProcessing',
                Icon: AssignmentIcon,
                title: 'Job Order Processing'
            },
            {
                href: '/app/ManufacturingReport',
                Icon: AssignmentIcon,
                title: 'Manufacturing Report'
            },
            {
                href: '/app/SlitReport',
                Icon: AssignmentIcon,
                title: 'Slit Report'

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