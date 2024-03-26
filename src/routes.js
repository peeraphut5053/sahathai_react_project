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
import ProductionReportView from 'src/views/ERPModule/Production/productionReport';
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

import ERPStep from 'src/views/ERPStep';
import FreeZoneApp from 'src/views/ERPModule/SaleExport/FreeZoneApp';
import PendingSubmitedReportEX from 'src/views/ERPModule/SaleExport/PendingSubmitedReportEX';

import UsersListView from 'src/views/UserAccountManagement/users';
import SerachReportView from 'src/views/SerachReport';
import { useParams } from 'react-router';


const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      

      { path: 'ExecutiveReport', element: <ExecutiveReportView /> },
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
      { path: 'productionReport', element: <ProductionReportView /> },
      { path: 'productionMatlTrans', element: <ProductionMatlTransView /> },
      { path: 'Stock_mthly', element: <Stock_mthlyView /> },
      { path: 'DomesticBacklog', element: <DomesticBacklogView /> },
      { path: 'moveItem', element: <MoveItemView /> },
       // { path: 'BoatNote', element: <BoatNoteView /> },
      { path: 'BoatNote', element: <BoatNoteView /> },
      { path: 'FreeZoneApp', element: <FreeZoneApp /> },
      { path: 'PendingSubmitedReportEX', element: <PendingSubmitedReportEX /> },
      { path: 'SerachReport', element: <SerachReportView /> },
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
