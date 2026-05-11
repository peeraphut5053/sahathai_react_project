import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/UserAccountManagement/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import ExecutiveReportView from 'src/views/ExecutiveReport/';
import ExecutiveReportPresentationView from 'src/views/ExecutiveReport/ExecutiveReportPresentation/';
import ExecutiveReportSaleView from 'src/views/ExecutiveReportSale/';
import COItemSummaryView from 'src/views/ERPModule/AuditLog/COItemSummary';
import AuditByCOItemQTYView from 'src/views/ERPModule/AuditLog/ByCOItemQTY';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductionMatlTransView from 'src/views/ERPModule/Production/productionMatlTrans';
import UpdateBarcodeQtyView from 'src/views/ERPModule/Buyer/UpdateBarcodeQty';
import Stock_mthlyView from 'src/views/ERPModule/Production/Stock_mthly';
import ProductionDashboardView from 'src/views/ERPModule/Production/ProductionDashboard';
import ProductionLiveBoardV2View from 'src/views/ERPModule/Production/ProductionLiveBoardV2';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/UserAccountManagement/SettingsView';
import MoveItemView from 'src/views/ERPModule/Production/moveItem';
import BoatNoteView from 'src/views/ERPModule/BoatNote';
import TruckNoteView from 'src/views/ERPModule/TruckNote';
import ERPStep from 'src/views/ERPStep';
import UsersListView from 'src/views/UserAccountManagement/users';
import JobOrder from './views/ERPModule/Production/JobOrder';
import ProductionReport from './views/ExecutiveReport/ProductionReport';
import ProductionDailyReport from './views/ERPModule/Production/productionReport';
import ProductionJob from './views/ERPModule/Stock/JobReceipt';
import JobReport from './views/ERPModule/Production/JobReport';
import ProtectRoute from './components/ProtectRoute';
import PipeCounterApp from './views/PipeCounter/PipeCounterApp';
import LocationItemReport from './views/ExecutiveReport/LocationItemReport';
import ProductionReportByMonth from './views/ExecutiveReport/ProductionReportByMonth/ProductionReportByMonth';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [


      { path: 'ExecutiveReport', element: <ProtectRoute><ExecutiveReportView /></ProtectRoute> },
      { path: 'ProductionChart', element: <ProtectRoute><ProductionReport /></ProtectRoute> },
      { path: 'LocationItemReport', element: <ProtectRoute><LocationItemReport /></ProtectRoute> },
      { path: 'ProductionReportByMonth', element: <ProtectRoute><ProductionReportByMonth /></ProtectRoute> },
      { path: 'ExecutiveReportPresentation', element: <ProtectRoute><ExecutiveReportPresentationView /></ProtectRoute> },
      { path: 'ExecutiveReportSale', element: <ProtectRoute><ExecutiveReportSaleView /></ProtectRoute> },
      { path: 'UpdateBarcodeQty', element: <ProtectRoute><UpdateBarcodeQtyView /></ProtectRoute> },
      { path: 'COItemSummary', element: <ProtectRoute><COItemSummaryView /></ProtectRoute> },
      { path: 'ByCOItemQTY', element: <ProtectRoute><AuditByCOItemQTYView /></ProtectRoute> },
      { path: 'account', element: <ProtectRoute><AccountView /></ProtectRoute> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'dashboard?username=1', element: <ProtectRoute><DashboardView /></ProtectRoute> },
      { path: 'ProductionDashboard', element: <ProtectRoute><ProductionDashboardView /></ProtectRoute> },
      { path: 'ProductionLiveBoardV2', element: <ProtectRoute><ProductionLiveBoardV2View /></ProtectRoute> },
      { path: 'JobReport', element: <ProtectRoute><JobReport /></ProtectRoute> },
      { path: 'ERPStep', element: <ProtectRoute><ERPStep /></ProtectRoute> },
      { path: 'productionMatlTrans', element: <ProtectRoute><ProductionMatlTransView /></ProtectRoute> },
      { path: 'Stock_mthly', element: <ProtectRoute><Stock_mthlyView /></ProtectRoute> },
      { path: 'moveItem', element: <ProtectRoute><MoveItemView /></ProtectRoute> },
      { path: 'JobOrderProcessing', element: <ProtectRoute><JobOrder /></ProtectRoute> },
      { path: 'JobRecicpt', element: <ProtectRoute><ProductionJob /></ProtectRoute> },
      { path: 'BoatNote', element: <ProtectRoute><BoatNoteView /></ProtectRoute> },
      { path: 'TruckNote', element: <ProtectRoute><TruckNoteView /></ProtectRoute> },
      { path: 'ProductionReport', element: <ProtectRoute><ProductionDailyReport /></ProtectRoute> },
      { path: 'PipeCounter', element: <ProtectRoute><PipeCounterApp /></ProtectRoute> },
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
