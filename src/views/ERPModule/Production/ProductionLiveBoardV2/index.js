import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import {
  Autorenew,
  FilterAlt,
  Fullscreen,
  PrecisionManufacturing
} from '@mui/icons-material';
import Page from 'src/components/Page';
import API from 'src/views/components/API';
import ProductionDashboard from '../ProductionDashboard';
import styles from './ProductionLiveBoardV2.module.css';

const statusClass = {
  RUNNING: styles.running,
  CHANGEOVER: styles.changeover,
  STOPPED: styles.stopped
};

const progressTone = (station) => {
  if (station.status === 'STOPPED') return styles.danger;
  if (station.status === 'CHANGEOVER' || station.progress < 55) return styles.warning;
  return '';
};

const addComma = (value) => Number(value).toLocaleString('en-US');
const toNumber = (value) => Number(value || 0);

const mapDashboardRows = (rows, plant) => rows.map((row) => {
  const todayPcs = toNumber(row['Qty Today (PCS)']);
  const monthPcs = toNumber(row['Qty MTD (PCS)']);
  const todayTon = toNumber(row['Qty Today (Ton)']);
  const progress = monthPcs > 0 ? Math.min(100, Math.round((todayPcs / monthPcs) * 100)) : 0;

  return {
    name: row.Station || '-',
    plant,
    status: todayPcs > 0 || todayTon > 0 ? 'RUNNING' : 'STOPPED',
    job: '-',
    item: 'Production dashboard API',
    customer: 'All',
    progress,
    planPcs: monthPcs,
    donePcs: todayPcs,
    monthTons: toNumber(row['Qty MTD (Ton)']),
    tons: todayTon,
    scrap: '-',
    speed: todayPcs > 0 ? `${addComma(todayPcs)} pcs today` : 'No output today',
    alert: todayPcs > 0 || todayTon > 0 ? '' : 'No production output today'
  };
});

const ProductionLiveBoardV2Content = () => {
  const [stations, setStations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [lastUpdated, setLastUpdated] = React.useState(null);

  const loadProductionBoard = React.useCallback(() => {
    setLoading(true);
    setError('');

    Promise.all([
      API.get('API_ExecutiveReport/data.php?load=ProductionDashboardP'),
      API.get('API_ExecutiveReport/data.php?load=ProductionDashboardW')
    ])
      .then(([poochaoResponse, wangnoiResponse]) => {
        setStations([
          ...mapDashboardRows(poochaoResponse.data || [], 'Poochao'),
          ...mapDashboardRows(wangnoiResponse.data || [], 'Wangnoi')
        ]);
        setLastUpdated(new Date());
      })
      .catch(() => {
        setError('Cannot load production live data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    loadProductionBoard();
    const timerID = setInterval(loadProductionBoard, 60000);

    return () => {
      clearInterval(timerID);
    };
  }, [loadProductionBoard]);

  const running = stations.filter((station) => station.status === 'RUNNING').length;
  const stopped = stations.filter((station) => station.status === 'STOPPED').length;
  const totalPcs = stations.reduce((sum, station) => sum + station.donePcs, 0);
  const totalTons = stations.reduce((sum, station) => sum + station.tons, 0);
  const totalMonthPcs = stations.reduce((sum, station) => sum + station.planPcs, 0);
  const onPlanPercent = totalMonthPcs > 0 ? Math.round((totalPcs / totalMonthPcs) * 100) : 0;

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.titleBlock}>
          <div className={styles.eyebrow}>Production command center</div>
          <div className={styles.title}>Production Live Board V2</div>
        </div>

        <div className={styles.actions}>
          <Chip
            color="success"
            icon={<Autorenew />}
            label="Auto refresh: 60 sec"
            variant="outlined"
          />
          {lastUpdated && (
            <Chip
              label={`Updated: ${lastUpdated.toLocaleTimeString('th-TH')}`}
              variant="outlined"
            />
          )}
          <ButtonGroup variant="outlined" size="small">
            <Button startIcon={<FilterAlt />}>Plant</Button>
            <Button startIcon={<PrecisionManufacturing />}>Station</Button>
            <Button startIcon={<Fullscreen />}>TV Mode</Button>
          </ButtonGroup>
        </div>
      </div>

      <section className={styles.summaryGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Running Stations</div>
          <div className={styles.metricValue}>{running}/{stations.length}</div>
          <div className={styles.metricMeta}>Live from Poochao and Wangnoi</div>
        </div>
        <div className={`${styles.metricCard} ${styles.warning}`}>
          <div className={styles.metricLabel}>Today Output</div>
          <div className={styles.metricValue}>{addComma(totalPcs)} pcs</div>
          <div className={styles.metricMeta}>{totalTons.toFixed(1)} ton completed</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>On Plan</div>
          <div className={styles.metricValue}>{onPlanPercent}%</div>
          <div className={styles.metricMeta}>Today output compared with MTD quantity</div>
        </div>
        <div className={`${styles.metricCard} ${stopped > 0 ? styles.danger : ''}`}>
          <div className={styles.metricLabel}>Needs Attention</div>
          <div className={styles.metricValue}>{stopped}</div>
          <div className={styles.metricMeta}>Stations with no output today</div>
        </div>
      </section>

      {loading && (
        <div className={styles.stateBox}>
          <CircularProgress size={24} />
          <span>Loading production live data...</span>
        </div>
      )}

      {error && !loading && (
        <div className={`${styles.stateBox} ${styles.dangerState}`}>
          {error}
        </div>
      )}

      {!loading && !error && stations.length === 0 && (
        <div className={styles.stateBox}>
          No production live data.
        </div>
      )}

      <section className={styles.boardGrid}>
        {stations.map((station, index) => (
          <article className={styles.stationCard} key={`${station.plant}-${station.name}-${index}`}>
            <header className={styles.stationHeader}>
              <Box minWidth={0}>
                <Typography className={styles.stationName}>{station.name}</Typography>
                <Typography className={styles.stationSub}>
                  {station.plant} | {station.customer}
                </Typography>
              </Box>
              <span className={`${styles.statusPill} ${statusClass[station.status]}`}>
                {station.status}
              </span>
            </header>

            <div className={styles.stationBody}>
              <div className={styles.jobLine}>
                <div className={styles.jobNo}>{station.job}</div>
                <div className={styles.itemText}>{station.item}</div>
              </div>

              <div className={styles.progressRow}>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${progressTone(station)}`}
                    style={{ width: `${station.progress}%` }}
                  />
                </div>
                <div className={styles.progressText}>{station.progress}%</div>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>MTD PCS</div>
                  <div className={styles.statValue}>{addComma(station.planPcs)}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Today PCS</div>
                  <div className={styles.statValue}>{addComma(station.donePcs)}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Today Ton</div>
                  <div className={styles.statValue}>{station.tons.toFixed(1)}</div>
                </div>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Scrap</div>
                  <div className={styles.statValue}>{station.scrap}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Speed</div>
                  <div className={styles.statValue}>{station.speed}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>MTD Ton</div>
                  <div className={styles.statValue}>
                    {station.monthTons.toFixed(1)}
                  </div>
                </div>
              </div>

              {station.alert && (
                <div className={`${styles.alertBox} ${station.status === 'STOPPED' ? styles.danger : ''}`}>
                  {station.alert}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

const ProductionLiveBoardV2 = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Page className={styles.root} title="Production Live Board V2">
      <div className={styles.tabShell}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          className={styles.tabs}
        >
          <Tab label="Production Live" />
          <Tab label="Production Live V2" />
        </Tabs>
      </div>

      <div className={styles.tabPanel} hidden={activeTab !== 0}>
        {activeTab === 0 && <ProductionDashboard />}
      </div>

      <div className={styles.tabPanel} hidden={activeTab !== 1}>
        {activeTab === 1 && <ProductionLiveBoardV2Content />}
      </div>
    </Page>
  );
};

export default ProductionLiveBoardV2;
