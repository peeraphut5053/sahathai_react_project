import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Typography
} from '@mui/material';
import {
  Autorenew,
  FilterAlt,
  Fullscreen,
  PrecisionManufacturing
} from '@mui/icons-material';
import Page from 'src/components/Page';
import styles from './ProductionLiveBoardV2.module.css';

const stations = [
  {
    name: 'P1 Forming',
    plant: 'Poochao',
    status: 'RUNNING',
    job: 'J240429-018',
    item: 'PIPE 2" x 2.3mm x 6M / GRADE A',
    customer: 'Domestic',
    progress: 78,
    planPcs: 2400,
    donePcs: 1872,
    tons: 18.6,
    scrap: 12,
    speed: '312 pcs/hr',
    alert: ''
  },
  {
    name: 'P2 Forming',
    plant: 'Poochao',
    status: 'CHANGEOVER',
    job: 'J240429-022',
    item: 'PIPE 1-1/2" x 1.8mm x 6M / GRADE B',
    customer: 'Export',
    progress: 34,
    planPcs: 1800,
    donePcs: 612,
    tons: 6.4,
    scrap: 4,
    speed: 'Waiting setup',
    alert: 'Changeover 24 min'
  },
  {
    name: 'W1 Finishing',
    plant: 'Wangnoi',
    status: 'RUNNING',
    job: 'J240429-011',
    item: 'GI PIPE 3" x 3.2mm x 6M',
    customer: 'Domestic',
    progress: 91,
    planPcs: 900,
    donePcs: 819,
    tons: 21.1,
    scrap: 3,
    speed: '118 pcs/hr',
    alert: ''
  },
  {
    name: 'W2 Packing',
    plant: 'Wangnoi',
    status: 'STOPPED',
    job: 'J240429-007',
    item: 'BLACK PIPE 4" x 4.0mm x 6M',
    customer: 'Export',
    progress: 56,
    planPcs: 720,
    donePcs: 403,
    tons: 17.9,
    scrap: 0,
    speed: '0 pcs/hr',
    alert: 'Hold: waiting QC release'
  },
  {
    name: 'Slitting',
    plant: 'Poochao',
    status: 'RUNNING',
    job: 'J240429-026',
    item: 'COIL SLIT 1219mm to 184mm',
    customer: 'Internal',
    progress: 64,
    planPcs: 14,
    donePcs: 9,
    tons: 42.3,
    scrap: 1,
    speed: '5.4 ton/hr',
    alert: ''
  },
  {
    name: 'Hydro Test',
    plant: 'Wangnoi',
    status: 'RUNNING',
    job: 'J240429-015',
    item: 'PIPE 2-1/2" x 2.6mm x 6M',
    customer: 'Domestic',
    progress: 47,
    planPcs: 1300,
    donePcs: 611,
    tons: 9.7,
    scrap: 8,
    speed: '142 pcs/hr',
    alert: 'Output below target'
  }
];

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

const ProductionLiveBoardV2 = () => {
  const running = stations.filter((station) => station.status === 'RUNNING').length;
  const stopped = stations.filter((station) => station.status === 'STOPPED').length;
  const totalPcs = stations.reduce((sum, station) => sum + station.donePcs, 0);
  const totalTons = stations.reduce((sum, station) => sum + station.tons, 0);

  return (
    <Page className={styles.root} title="Production Live Board V2">
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
          <div className={styles.metricValue}>82%</div>
          <div className={styles.metricMeta}>Weighted by planned quantity</div>
        </div>
        <div className={`${styles.metricCard} ${stopped > 0 ? styles.danger : ''}`}>
          <div className={styles.metricLabel}>Needs Attention</div>
          <div className={styles.metricValue}>{stopped + 2}</div>
          <div className={styles.metricMeta}>Stop, slow output, or QC hold</div>
        </div>
      </section>

      <section className={styles.boardGrid}>
        {stations.map((station) => (
          <article className={styles.stationCard} key={station.name}>
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
                  <div className={styles.statLabel}>Plan</div>
                  <div className={styles.statValue}>{addComma(station.planPcs)}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Complete</div>
                  <div className={styles.statValue}>{addComma(station.donePcs)}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Ton</div>
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
                  <div className={styles.statLabel}>Remain</div>
                  <div className={styles.statValue}>
                    {addComma(station.planPcs - station.donePcs)}
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
    </Page>
  );
};

export default ProductionLiveBoardV2;
