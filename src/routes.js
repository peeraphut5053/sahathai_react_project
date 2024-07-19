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

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      

      { path: 'ExecutiveReport', element: <ExecutiveReportView /> },
      { path: 'ProductionChart', element: <ProductionReport /> },
      { path: 'ExecutiveReportPresentation', element: <ExecutiveReportPresentationView /> },
      
      { path: 'ExecutiveReportSale', element: <ExecutiveReportSaleView /> },
      { path: 'UpdateBarcodeQty', element: <UpdateBarcodeQtyView /> },
      

      { path: 'COItemSummary', element: <COItemSummaryView /> },
      { path: 'ByCOItemQTY', element: <AuditByCOItemQTYView /> },
      { path: 'ProductionOvertime', element: <ProductionOvertimeView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'dashboard?username=1', element: <DashboardView  /> },
      { path: 'ProductionDashboard', element: <ProductionDashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'ERPStep', element: <ERPStep /> },
      { path: 'ReportGeneralLedgerDomesticInvoice', element: <GeneralLedgerDomesticInvoice /> },
      { path: 'CustomerOrder', element: <RPTCustomer /> },
      { path: 'ARTransactionReport', element: <ARTransactionReport /> },
      { path: 'GeneralLedger', element: <GeneralLedger />},
      { path: 'GeneralLedgerDetail', element: <GeneralLedgerDetail />},
      { path: 'MaterialPurchase', element: <MaterialPurchase /> },
      { path: 'CollectionDay', element: <CollectionDay /> },
      { path: 'WorkbenchShipping', element: <WorkbenchShipping /> },
      { path: 'PaymentInvoice', element: <PaymentInvoice /> },
      { path: 'DoInventoryDetail', element: <DoInventory /> },
      { path: 'QCLabTagDetail', element: <QcLabTagDetail />},
      { path: 'TagStatus', element: <TagStatus /> },
      { path: 'productionMatlTrans', element: <ProductionMatlTransView /> },
      { path: 'Stock_mthly', element: <Stock_mthlyView /> },
      { path: 'DomesticBacklog', element: <DomesticBacklogView /> },
      { path: 'CerDO', element: <CerDo /> },
      { path: 'RPT_DO', element: <RPT_DO /> },
      { path: 'OrderProcessing', element: <OrderProcessing /> },
      { path: 'ADAllTemp', element: <ADAllTemp /> },
      { path: 'moveItem', element: <MoveItemView /> },
      { path: 'ManufacturingReport', element: <ManufacturingReport /> },
      { path: 'SlitReport', element: <SlitReport /> },
      { path: 'JobOrderProcessing', element: <JobOrder /> },
       // { path: 'BoatNote', element: <BoatNoteView /> },
      { path: 'BoatNote', element: <BoatNoteView /> },
      { path: 'TruckNote', element: <TruckNoteView /> },
      { path: 'FreeZoneApp', element: <FreeZoneApp /> },
      { path: 'PendingSubmitedReportEX', element: <PendingSubmitedReportEX /> },
      { path: 'SerachReport', element: <SerachReportView /> },
      { path: 'ProductionReport', element: <ProductionDailyReport /> },
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
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
