import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/UserAccountManagement/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import ProductionOvertimeView from 'src/views/ProductionOvertime/';
import ExecutiveReportView from 'src/views/ExecutiveReport/';
import ExecutiveReportPresentationView from 'src/views/ExecutiveReport/ExecutiveReportPresentation/';  

import ExecutiveReportSaleView from 'src/views/ExecutiveReportSale/';

import COItemSummaryView from 'src/views/ERPModule/AuditLog/COItemSummary';
import AuditByCOItemQTYView from 'src/views/ERPModule/AuditLog/ByCOItemQTY';

import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/ERPModule/Production/ProductListView';
import ProductionMatlTransView from 'src/views/ERPModule/Production/productionMatlTrans';

import UpdateBarcodeQtyView from 'src/views/ERPModule/Buyer/UpdateBarcodeQty';

import Stock_mthlyView from 'src/views/ERPModule/Production/Stock_mthly';
import ProductionDashboardView from 'src/views/ERPModule/Production/ProductionDashboard';
import DomesticBacklogView from 'src/views/ERPModule/SaleDomestic/DomesticBacklog/DomesticBacklog';

import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/UserAccountManagement/SettingsView';
import MoveItemView from 'src/views/ERPModule/Production/moveItem';
// import BoatNoteView from 'src/views/ERPModule/Shipping/BoatNote';
import BoatNoteView from 'src/views/ERPModule/BoatNote';
import TruckNoteView from 'src/views/ERPModule/TruckNote';

import ERPStep from 'src/views/ERPStep';
import FreeZoneApp from 'src/views/ERPModule/SaleExport/FreeZoneApp';
import PendingSubmitedReportEX from 'src/views/ERPModule/SaleExport/PendingSubmitedReportEX';

import UsersListView from 'src/views/UserAccountManagement/users';
import SerachReportView from 'src/views/SerachReport';
import GeneralLedgerDomesticInvoice from './views/ERPModule/Finance/GL-DomesticInvoice';
import ARTransactionReport from './views/ERPModule/Finance/AR-TransactionReport';
import MaterialPurchase from './views/ERPModule/Finance/MaterialPurchaseReport';
import WorkbenchShipping from './views/ERPModule/Finance/WorkbenchShipping';
import PaymentInvoice from './views/ERPModule/Finance/PaymentInvoice';
import TagStatus from './views/ERPModule/QC/TagStatus';
import GeneralLedger from './views/ERPModule/Finance/GeneralLedger';
import CollectionDay from './views/ERPModule/Finance/CollectionDay';
import GeneralLedgerDetail from './views/ERPModule/Finance/GL-Detail';
import DoInventory from './views/ERPModule/QC/DoInventory';
import RPTCustomer from './views/ERPModule/SaleDomestic/RPT_Customer';
import JobOrder from './views/ERPModule/Production/JobOrder';
import QcLabTagDetail from './views/ERPModule/QC/QCLabTagDetail';
import ProductionReport from './views/ExecutiveReport/ProductionReport';
import ProductionDailyReport from './views/ERPModule/Production/productionReport';
import SlitReport from './views/ERPModule/Production/SlitReport';
import ManufacturingReport from './views/ERPModule/Production/Manufacturing';
import CerDo from './views/ERPModule/SaleDomestic/CerDo';
import RPT_DO from './views/ERPModule/SaleDomestic/RPT_DO';
import OrderProcessing from './views/ERPModule/SaleDomestic/OrderProcessing';
import ADAllTemp from './views/ERPModule/SaleDomestic/ADAllTemp';
import JobRecicpt from './views/ERPModule/Stock/JobReceipt/JobRecipt';
import ProductionJob from './views/ERPModule/Stock/JobReceipt';
import ProtectRoute from './components/ProtectRoute';
import PipeCounterApp from './views/PipeCounter/PipeCounterApp';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      

      { path: 'ExecutiveReport', element: <ProtectRoute><ExecutiveReportView /></ProtectRoute> },
      { path: 'ProductionChart', element: <ProtectRoute><ProductionReport /></ProtectRoute> },
      { path: 'ExecutiveReportPresentation', element: <ProtectRoute><ExecutiveReportPresentationView /></ProtectRoute> },
      
      { path: 'ExecutiveReportSale', element: <ProtectRoute><ExecutiveReportSaleView /></ProtectRoute> },
      { path: 'UpdateBarcodeQty', element: <ProtectRoute><UpdateBarcodeQtyView /></ProtectRoute> },
      

      { path: 'COItemSummary', element: <ProtectRoute><COItemSummaryView /></ProtectRoute> },
      { path: 'ByCOItemQTY', element: <ProtectRoute><AuditByCOItemQTYView /></ProtectRoute> },
      { path: 'ProductionOvertime', element: <ProtectRoute><ProductionOvertimeView /></ProtectRoute> },
      { path: 'account', element: <ProtectRoute><AccountView /></ProtectRoute> },
      { path: 'customers', element: <ProtectRoute><CustomerListView /></ProtectRoute> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'dashboard?username=1', element: <ProtectRoute><DashboardView  /></ProtectRoute> },
      { path: 'ProductionDashboard', element: <ProtectRoute><ProductionDashboardView /></ProtectRoute> },
      { path: 'products', element: <ProtectRoute><ProductListView /></ProtectRoute> },
      { path: 'ERPStep', element: <ProtectRoute><ERPStep /></ProtectRoute> },
      { path: 'ReportGeneralLedgerDomesticInvoice', element: <ProtectRoute><GeneralLedgerDomesticInvoice /></ProtectRoute> },
      { path: 'CustomerOrder', element: <ProtectRoute><RPTCustomer /></ProtectRoute> },
      { path: 'ARTransactionReport', element: <ProtectRoute><ARTransactionReport /></ProtectRoute> },
      { path: 'GeneralLedger', element: <ProtectRoute><GeneralLedger /></ProtectRoute>},
      { path: 'GeneralLedgerDetail', element: <ProtectRoute><GeneralLedgerDetail /></ProtectRoute>},
      { path: 'MaterialPurchase', element: <ProtectRoute><MaterialPurchase /></ProtectRoute> },
      { path: 'CollectionDay', element: <ProtectRoute><CollectionDay /></ProtectRoute> },
      { path: 'WorkbenchShipping', element: <ProtectRoute><WorkbenchShipping /></ProtectRoute> },
      { path: 'PaymentInvoice', element: <ProtectRoute><PaymentInvoice /></ProtectRoute> },
      { path: 'DoInventoryDetail', element: <ProtectRoute><DoInventory /></ProtectRoute> },
      { path: 'QCLabTagDetail', element: <ProtectRoute><QcLabTagDetail /></ProtectRoute>},
      { path: 'TagStatus', element: <ProtectRoute><TagStatus /></ProtectRoute> },
      { path: 'productionMatlTrans', element: <ProtectRoute><ProductionMatlTransView /></ProtectRoute> },
      { path: 'Stock_mthly', element: <ProtectRoute><Stock_mthlyView /></ProtectRoute> },
      { path: 'DomesticBacklog', element: <ProtectRoute><DomesticBacklogView /></ProtectRoute> },
      { path: 'CerDO', element: <ProtectRoute><CerDo /></ProtectRoute> },
      { path: 'RPT_DO', element: <ProtectRoute><RPT_DO /></ProtectRoute> },
      { path: 'OrderProcessing', element: <ProtectRoute><OrderProcessing /></ProtectRoute> },
      { path: 'ADAllTemp', element: <ProtectRoute><ADAllTemp /></ProtectRoute> },
      { path: 'moveItem', element: <ProtectRoute><MoveItemView /></ProtectRoute> },
      { path: 'ManufacturingReport', element: <ProtectRoute><ManufacturingReport /></ProtectRoute> },
      { path: 'SlitReport', element: <ProtectRoute><SlitReport /></ProtectRoute> },
      { path: 'JobOrderProcessing', element: <ProtectRoute><JobOrder /></ProtectRoute> },
      { path: 'JobRecicpt', element: <ProtectRoute><ProductionJob /></ProtectRoute> },
       // { path: 'BoatNote', element: <BoatNoteView /> },
      { path: 'BoatNote', element: <ProtectRoute><BoatNoteView /></ProtectRoute> },
      { path: 'TruckNote', element: <ProtectRoute><TruckNoteView /></ProtectRoute> },
      { path: 'FreeZoneApp', element: <ProtectRoute><FreeZoneApp /></ProtectRoute> },
      { path: 'PendingSubmitedReportEX', element: <ProtectRoute><PendingSubmitedReportEX /></ProtectRoute> },
      { path: 'SerachReport', element: <ProtectRoute><SerachReportView /></ProtectRoute> },
      { path: 'ProductionReport', element: <ProtectRoute><ProductionDailyReport /></ProtectRoute> },
      { path: 'users', element: <UsersListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'PipeCounter', element: <PipeCounterApp /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
