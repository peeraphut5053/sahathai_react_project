import React, { useMemo } from 'react';
import { Container, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import moment from 'moment';
import API from 'src/views/components/API';
import * as XLSX from 'xlsx';

// ─── รายการสาเหตุหลัก (Mechanical) ───
// ต้องตรงกับ reason_detail_id จาก API
const MAIN_REASONS = [
    'เปลี่ยนโรล',
    'ปรับโรล',
    'เปลี่ยนโรล SQ',
    'เปลี่ยนสลิงรูดน้ำ',
    'เปลี่ยนมืดขูดตะเข็บ',
    'เปลี่ยนใบเลื่อย',
    'เปลี่ยนโซ่',
    'เปลี่ยนใบมีดคว้านหัวท่อ',
    'เปลี่ยนลูกยางหัวเทส',
    'เปลี่ยนไส้ถ่าน',
    'เปลี่ยนคอยล์เชื่อม',
    'เปลี่ยนลูกปืนแสตนด์',
    'เปลี่ยนลูกปืนเครื่องสำรองเหล็ก',
    'เปลี่ยนลูกปืนล้อแท่นเลื่อย',
    'เปลี่ยนยอยลูกกลิ้ง',
    'เปลี่ยนขาเตะท่อ',
    'เปลี่ยนแคมป์จับ',
    'เปลี่ยนกระบอกลม',
    'เปลี่ยนลูกปืนเพลาลูกกลิ้ง',
    'เปลี่ยนสายพานมอเตอร์',
    'เปลี่ยนลูกปืนลูกกลิ้ง',
    'เปลี่ยนลูกปืนยอยท์',
];

// 3 rows สีแดง
const ROL_GROUP = ['เปลี่ยนโรล', 'ปรับโรล', 'เปลี่ยนโรล SQ'];

// ชื่อ category (จาก reason_description) ที่มี sub-reason อยู่ใน MAIN_REASONS → นับเป็น "หลัก"
const FORMING_MAIN_CATEGORIES = [
    'จานเก็บเหล็ก',   // reason_id 1
    'ฟอร์มมิ่ง',      // reason_id 2
    'แท่นเลื่อย',      // reason_id 3
    'รางคอนเวนเยอร์',  // reason_id 4
    'เครื่องตัดทรง',   // reason_id 5
    'เครื่องคว้านหัว',  // reason_id 6
    'เครื่องเทสน้ำ',   // reason_id 7
    // อื่นๆ (reason_id 8) → ไม่ใส่ นับเป็น "อื่น" category
];

// mapping: category → sub-reasons (จาก description ใน reason_detail table)
const CATEGORY_SUB_REASONS = {
    'จานเก็บเหล็ก': ['เปลี่ยนลูกปืนเพลาลูกกลิ้ง', 'เปลี่ยนยอยลูกกลิ้ง', 'เปลี่ยนลูกปืนเครื่องสำรองเหล็ก'],
    'ฟอร์มมิ่ง': ['เปลี่ยนโรล', 'เปลี่ยนลูกปืนแสตนด์', 'เปลี่ยนมืดขูดตะเข็บ', 'เปลี่ยนสลิงรูดน้ำ', 'เปลี่ยนไส้ถ่าน', 'เปลี่ยนคอยล์เชื่อม', 'เปลี่ยนโรล SQ', 'ปรับโรล'],
    'แท่นเลื่อย': ['เปลี่ยนใบเลื่อย', 'เปลี่ยนสายพานมอเตอร์', 'เปลี่ยนแคมป์จับ', 'เปลี่ยนกระบอกลม', 'เปลี่ยนลูกปืนล้อแท่นเลื่อย'],
    'รางคอนเวนเยอร์': ['เปลี่ยนโซ่', 'เปลี่ยนลูกปืนลูกกลิ้ง', 'เปลี่ยนขาเตะท่อ'],
    'เครื่องตัดทรง': ['เปลี่ยนลูกปืนยอยท์', 'เปลี่ยนลูกโรล'],
    'เครื่องคว้านหัว': ['เปลี่ยนกระบอกลม', 'เปลี่ยนใบมีดคว้านหัวท่อ'],
    'เครื่องเทสน้ำ': ['เปลี่ยนลูกยางหัวเทส'],
};

// ─── รายการสาเหตุ paretoData2 (Fixed list) ───
const PARETO2_REASONS = [
    'ทำความสะอาดเครื่องจักร',
    'ระบบอินเตอร์เน็ต',
    'เครื่องจักรมีปัญหา / เสีย',
    'เปลี่ยนไซส์',
    'ปรับตั้งเครื่องจักร (ไม่ได้เปลี่ยนไซส์)',
    'ปรับหัวพ่นสี',
    'ระบบไฟฟ้าภายในโรงงานดับ',
    'อื่น ๆ',
];

// ─── Helpers ───
function hhmmToHours(str) {
    if (!str || str === '00:00') return 0;
    const [h, m] = String(str).split(':').map(Number);
    return (h || 0) + (m || 0) / 60;
}

// นาที → ชั่วโมง (decimal)
function minToHours(val) {
    const n = Number(val);
    return isNaN(n) ? 0 : n / 60;
}

function fmtHr(val) {
    if (!val || val === 0) return '-';

    let hrs = Math.floor(val);
    let mins = Math.round((val - hrs) * 60);

    if (mins === 60) {
        hrs += 1;
        mins = 0;
    }

    return `${hrs}:${mins.toString().padStart(2, '0')}`;
}

function fmtPct(num, den) {
    if (!den || den === 0) return '-';
    return ((num / den) * 100).toFixed(2) + '%';
}

function getFirstAndLastDayOfMonth(year, month) {
    return {
        firstDay: new Date(year, month - 1, 1),
        lastDay: new Date(year, month, 0),
    };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const TableFormingStop = ({ data, month, group, wc }) => {

    console.log(group, 'group');
    console.log(wc, 'wc');

    // ---- Fetch pareto detail data (reason_detail_id + time_used นาที) ----
    const { data: paretoRows = [], isLoading } = useQuery({
        queryKey: ['FormingStopDetail', month, group],
        queryFn: async () => {
            let load = group === 'Forming' ? 'paretoData' : 'paretoData2';
            const y = moment(month).format('YYYY');
            const m = moment(month).format('MM');
            const date = getFirstAndLastDayOfMonth(y, m);
            const response = await API.get('RPT_QC_Lab_Tag_Detail/data.php', {
                params: {
                    load: load,
                    StartDate: moment(date.firstDay).format('YYYY-MM-DD'),
                    EndDate: moment(date.lastDay).format('YYYY-MM-DD'),
                    GroupBy: wc.map(item => `'${item}'`).join(',')
                }
            });
            return response.data[0] || [];
        },
        enabled: !!month && !!group,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    // ── data.res จาก GroupBarChart (shift-level: work_hour, TOT_work_hour, stop_hour) ──
    const rows = data?.res || [];

    // ---- 1. รายชื่อ wc จาก props (ครบทุก wc ที่ถูกส่งมา) ----
    const wcList = useMemo(() => {
        return [...new Set(wc || [])];
    }, [wc]);

    // ---- 2. คำนวณ work_hour ต่อ wc (จาก data.res) ----
    const wcWorkMap = useMemo(() => {
        const map = {};
        wcList.forEach(w => { map[w] = { workHour: 0 }; });

        rows.forEach(item => {
            const w = item.wc;
            if (!w || !map[w]) return;
            const workHr = hhmmToHours(item.work_hour);
            map[w].workHour += workHr;
        });
        return map;
    }, [rows, wcList]);

    // ---- 3. คำนวณ reasonHours ต่อ wc (จาก paretoRows) ----
    // reason_detail_id คือชื่อ sub-reason, time_used คือนาที, w_c คือ work center
    const wcReasonMap = useMemo(() => {
        const map = {};
        wcList.forEach(w => { map[w] = {}; }); // wc → { reason: hours }

        paretoRows.forEach(item => {
            const w = item.w_c;
            if (!w || !map[w]) return;

            // paretoData2 (กลุ่มอื่น) → ใช้ reason_description
            // paretoData  (Forming)   → ใช้ reason_detail_id || reason_id
            const reason = group === 'Forming'
                ? (item.reason_detail_id || item.reason_id)
                : item.reason_description;
            if (!reason) return;

            const hr = minToHours(group === 'Forming' ? item.time_used : item.down_time);
            if (!map[w][reason]) map[w][reason] = 0;
            map[w][reason] += hr;
        });
        return map;
    }, [paretoRows, wcList]);

    // ---- 4. mainStop / otherStop ต่อ wc (จาก paretoRows) ----
    const wcStopMap = useMemo(() => {
        const map = {};
        wcList.forEach(w => { map[w] = { mainStop: 0, otherStop: 0 }; });

        wcList.forEach(w => {
            let main = 0;
            let other = 0;
            Object.entries(wcReasonMap[w] || {}).forEach(([r, h]) => {
                if (group === 'Forming') {
                    // Forming: หลัก = MAIN_REASONS (ดีเทล) + FORMING_MAIN_CATEGORIES (คัดสรุปที่ไม่มี detail)
                    if (MAIN_REASONS.includes(r) || FORMING_MAIN_CATEGORIES.includes(r)) main += h; else other += h;
                } else {
                    // paretoData2: หลัก = ทุก reason ยกเว้น "อื่น ๆ", อื่น = "อื่น ๆ" เท่านั้น
                    if (r === 'อื่น ๆ') other += h; else main += h;
                }
            });
            map[w].mainStop = main;
            map[w].otherStop = other;
        });
        return map;
    }, [group, wcList, wcReasonMap]);

    // ---- 5. รายชื่อ reasons (แสดงทุก reason แม้ไม่มีข้อมูล) ----
    const allReasons = useMemo(() => {
        if (group !== 'Forming') {
            // paretoData2: ใช้ fixed list เสมอ
            return PARETO2_REASONS;
        }
        // Forming: MAIN_REASONS ทั้งหมด → FORMING_MAIN_CATEGORIES ที่มีข้อมูล → others ที่เหลือ
        const seen = new Set();
        wcList.forEach(w => Object.keys(wcReasonMap[w] || {}).forEach(r => seen.add(r)));
        const formingCats = FORMING_MAIN_CATEGORIES.filter(r => seen.has(r));
        const others = [...seen].filter(r => !MAIN_REASONS.includes(r) && !FORMING_MAIN_CATEGORIES.includes(r)).sort();
        return [...MAIN_REASONS, ...formingCats, ...others];
    }, [group, wcList, wcReasonMap]);

    // ---- 6. Sum column ----
    const reasonSum = useMemo(() => {
        const s = {};
        allReasons.forEach(r => {
            s[r] = wcList.reduce((acc, w) => acc + (wcReasonMap[w]?.[r] || 0), 0);
        });
        return s;
    }, [allReasons, wcList, wcReasonMap]);

    // ---- 7. Category total (sub-reasons ทั้งหมด + category-level) ต่อ wc ----
    const categoryWcMap = useMemo(() => {
        const map = {};
        FORMING_MAIN_CATEGORIES.forEach(cat => {
            const subs = CATEGORY_SUB_REASONS[cat] || [];
            map[cat] = {};
            wcList.forEach(w => {
                // sub-reasons + category-level (records ที่ไม่ระบุ detail)
                map[cat][w] = subs.reduce((s, r) => s + (wcReasonMap[w]?.[r] || 0), 0)
                    + (wcReasonMap[w]?.[cat] || 0);
            });
        });
        return map;
    }, [wcList, wcReasonMap]);

    const categorySum = useMemo(() => {
        const s = {};
        FORMING_MAIN_CATEGORIES.forEach(cat => {
            s[cat] = wcList.reduce((acc, w) => acc + (categoryWcMap[cat]?.[w] || 0), 0);
        });
        return s;
    }, [wcList, categoryWcMap]);

    const grandCategorySum = FORMING_MAIN_CATEGORIES.reduce((s, cat) => s + (categorySum[cat] || 0), 0);

    // ---- Grand totals ----
    const totalMain = wcList.reduce((s, w) => s + wcStopMap[w].mainStop, 0);
    const totalOther = wcList.reduce((s, w) => s + wcStopMap[w].otherStop, 0);
    const totalStop = totalMain + totalOther;
    const totalTarget = wcList.reduce((s, w) => s + wcWorkMap[w].workHour, 0);
    // เวลาเดินเครื่องจริง = เป้าหมาย − รวมเวลาหยุดทุกสาเหตุ
    const totalReal = totalTarget - totalStop;
    const grandReasonSum = Object.values(reasonSum).reduce((s, v) => s + v, 0);

    // ─────────────── Styles ───────────────
    const cell = { border: '1px solid #ccc', padding: '5px 10px', textAlign: 'center', fontSize: '14px', whiteSpace: 'nowrap' };
    const headerCell = { ...cell, backgroundColor: '#c8e6fa', fontWeight: 'bold', fontSize: '15px', padding: '8px 12px', position: 'sticky', top: 0, zIndex: 2 };
    const labelCell = { ...cell, textAlign: 'left', backgroundColor: '#f5f5f5' };
    const summaryLbl = { ...labelCell, fontWeight: 'bold', backgroundColor: '#e8f4fb' };
    const blueCell = (x = {}) => ({ ...cell, fontWeight: 'bold', color: '#1565c0', backgroundColor: '#e8f4fb', ...x });
    const redCell = (x = {}) => ({ ...cell, fontWeight: 'bold', color: '#b71c1c', ...x });
    const yellowCell = { ...cell, fontWeight: 'bold', backgroundColor: '#fff9c4', color: '#b71c1c' };
    const spacer = { height: 6, backgroundColor: '#e3f2fd' };
    const colCount = wcList.length + 3;

    if (isLoading) return <div style={{ padding: 16, textAlign: 'center' }}>กำลังโหลดข้อมูล...</div>;

    // ─────────────── Export Excel ───────────────
    const handleExportExcel = () => {
        const fmtN = (v) => {
            if (!v || v === 0) return '-';
            let hrs = Math.floor(v);
            let mins = Math.round((v - hrs) * 60);
            if (mins === 60) { hrs += 1; mins = 0; }
            return `${hrs}:${mins.toString().padStart(2, '0')}`;
        };
        const headers = ['รายละเอียด', ...wcList, 'Sum (ชม.)', '%'];
        const dataRows = [];

        const addRow = (label, wcVals, sum, pct) =>
            dataRows.push([label, ...wcVals, sum, pct]);

        if (group === 'Forming') {
            ROL_GROUP.filter(r => allReasons.includes(r)).forEach(r =>
                addRow(r, wcList.map(w => fmtN(wcReasonMap[w]?.[r] || 0)),
                    fmtN(reasonSum[r] || 0), fmtPct(reasonSum[r] || 0, grandReasonSum)));
            allReasons.filter(r => MAIN_REASONS.includes(r) && !ROL_GROUP.includes(r)).forEach(r =>
                addRow(r, wcList.map(w => fmtN(wcReasonMap[w]?.[r] || 0)),
                    fmtN(reasonSum[r] || 0), fmtPct(reasonSum[r] || 0, grandReasonSum)));
            FORMING_MAIN_CATEGORIES.forEach(cat =>
                addRow(`${cat} (รวม)`, wcList.map(w => fmtN(categoryWcMap[cat]?.[w] || 0)),
                    fmtN(categorySum[cat] || 0), fmtPct(categorySum[cat] || 0, grandCategorySum)));
        } else {
            allReasons.forEach(r =>
                addRow(r, wcList.map(w => fmtN(wcReasonMap[w]?.[r] || 0)),
                    fmtN(reasonSum[r] || 0), fmtPct(reasonSum[r] || 0, grandReasonSum)));
        }

        dataRows.push([]);
        addRow('หยุดโดยสาเหตุหลัก (ชม)', wcList.map(w => fmtN(wcStopMap[w].mainStop)), fmtN(totalMain), fmtPct(totalMain, totalStop));
        addRow('หยุดโดยสาเหตุอื่น (ชม)', wcList.map(w => fmtN(wcStopMap[w].otherStop)), fmtN(totalOther), fmtPct(totalOther, totalStop));
        dataRows.push([]);
        addRow('รวมเวลาหยุดเครื่องทุกสาเหตุ', wcList.map(w => fmtN(wcStopMap[w].mainStop + wcStopMap[w].otherStop)), fmtN(totalStop), '-');
        addRow('เป้าหมายชั่วโมงการทำงาน', wcList.map(w => fmtN(wcWorkMap[w].workHour)), fmtN(totalTarget), '-');
        addRow('เวลาเดินเครื่องจริง', wcList.map(w => fmtN(wcWorkMap[w].workHour - (wcStopMap[w].mainStop + wcStopMap[w].otherStop))), fmtN(totalReal), '-');
        dataRows.push([]);
        addRow('% ในการเดินเครื่องจักร', wcList.map(w => fmtPct(wcWorkMap[w].workHour - (wcStopMap[w].mainStop + wcStopMap[w].otherStop), wcWorkMap[w].workHour)), fmtPct(totalReal, totalTarget), '-');
        addRow('% หยุดโดยสาเหตุหลัก', wcList.map(w => fmtPct(wcStopMap[w].mainStop, wcWorkMap[w].workHour)), fmtPct(totalMain, totalTarget), '-');
        addRow('% หยุดโดยสาเหตุอื่นๆ', wcList.map(w => fmtPct(wcStopMap[w].otherStop, wcWorkMap[w].workHour)), fmtPct(totalOther, totalTarget), '-');
        addRow('% หยุดรวม', wcList.map(w => fmtPct(wcStopMap[w].mainStop + wcStopMap[w].otherStop, wcWorkMap[w].workHour)), fmtPct(totalStop, totalTarget), '-');

        const title = `รายงานบันทึกการหยุดเครื่อง (${group}) — ${month ? moment(month).format('MMMM YYYY') : ''}`;
        const wsData = [[title], [], headers, ...dataRows];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        ws['!cols'] = [{ wch: 42 }, ...wcList.map(() => ({ wch: 12 })), { wch: 12 }, { wch: 10 }];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'StopReport');
        XLSX.writeFile(wb, `StopReport_${group}_${month ? moment(month).format('YYYY-MM') : 'all'}.xlsx`);
    };

    return (
        <Container maxWidth={false} style={{ overflowX: 'auto', padding: '4px 4px', marginTop: '20px' }}>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #1a237e 0%, #1565c0 60%, #0288d1 100%)',
                borderRadius: 10, padding: '16px 24px', marginBottom: 8,
                boxShadow: '0 4px 12px rgba(21,101,192,0.25)',
                marginBottom: '20px'
            }}>
                {/* Left: icon + title + badge */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 26 }}>📋</span>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: 0.3 }}>
                            รายงานบันทึกการหยุดเครื่อง
                        </span>
                        <span style={{
                            backgroundColor: 'rgba(255,255,255,0.2)', color: '#e3f2fd',
                            borderRadius: 20, padding: '3px 14px', fontSize: 14, fontWeight: 600,
                            border: '1px solid rgba(255,255,255,0.35)', letterSpacing: 0.5,
                        }}>
                            {group}
                        </span>
                    </div>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', paddingLeft: 36 }}>
                        {month ? moment(month).format('MMMM YYYY') : ''}
                    </span>
                </div>

                {/* Right: Export button */}
                <button
                    onClick={handleExportExcel}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#2e7d32';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#43a047';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
                    }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 18px', backgroundColor: '#43a047', color: '#fff',
                        border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6,
                        cursor: 'pointer', fontSize: '13px', fontWeight: 700,
                        boxShadow: '0 3px 8px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
                        transition: 'all 0.18s ease', letterSpacing: 0.3,
                    }}
                >
                    <span style={{ fontSize: 15 }}>📥</span> Export Excel
                </button>
            </div>


            <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(92vh)', marginTop: 4 }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '12px' }}>
                    <thead>
                        <tr>
                            <th style={{ ...headerCell, minWidth: 210, textAlign: 'left' }}>รายละเอียด</th>
                            {wcList.map(w => <th key={w} style={{ ...headerCell, minWidth: 80 }}>{w}</th>)}
                            <th style={{ ...headerCell, backgroundColor: '#a5d6a7', minWidth: 90 }}>Sum (ชม.)</th>
                            <th style={{ ...headerCell, backgroundColor: '#ffe082', minWidth: 75 }}>%</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* ── Forming Main Categories (ผลรวม sub-reasons ต่อ category) ── */}
                        {group === 'Forming' && FORMING_MAIN_CATEGORIES.map(cat => (
                            <tr key={cat} style={{ backgroundColor: '#f0f4ff' }}>
                                <td style={{ ...labelCell, backgroundColor: '#f0f4ff', color: '#1a3a6a', fontWeight: 'bold' }}>
                                    {cat}
                                    <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#888', marginLeft: 4 }}>(รวม)</span>
                                </td>
                                {wcList.map(w => (
                                    <td key={w} style={{ ...cell, color: '#1a3a6a', fontWeight: 'bold' }}>
                                        {fmtHr(categoryWcMap[cat]?.[w] || 0)}
                                    </td>
                                ))}
                                <td style={{ ...cell, fontWeight: 'bold', color: '#1a3a6a' }}>{fmtHr(categorySum[cat] || 0)}</td>
                                <td style={{ ...cell, color: '#1a3a6a' }}>{fmtPct(categorySum[cat] || 0, totalStop)}</td>
                            </tr>
                        ))}

                        {/* ── ROL group (สีแดง) ── */}
                        {ROL_GROUP.filter(r => allReasons.includes(r)).map(reason => (
                            <tr key={reason}>
                                <td style={{ ...labelCell, color: '#c62828' }}>{reason}</td>
                                {wcList.map(w => (
                                    <td key={w} style={{ ...cell, color: '#c62828' }}>
                                        {fmtHr(wcReasonMap[w]?.[reason] || 0)}
                                    </td>
                                ))}
                                <td style={{ ...cell, color: '#c62828', fontWeight: 'bold' }}>{fmtHr(reasonSum[reason] || 0)}</td>
                                <td style={{ ...cell, color: '#c62828' }}>{fmtPct(reasonSum[reason] || 0, grandReasonSum)}</td>
                            </tr>
                        ))}

                        {/* ── Main reasons (Forming: เฉพาะ MAIN_REASONS, กลุ่มอื่น: แสดงทั้งหมด) ── */}
                        {allReasons
                            .filter(r => group === 'Forming' ? (MAIN_REASONS.includes(r) && !ROL_GROUP.includes(r)) : true)
                            .map(reason => (
                                <tr key={reason}>
                                    <td style={labelCell}>{reason}</td>
                                    {wcList.map(w => (
                                        <td key={w} style={cell}>{fmtHr(wcReasonMap[w]?.[reason] || 0)}</td>
                                    ))}
                                    <td style={{ ...cell, fontWeight: 'bold' }}>{fmtHr(reasonSum[reason] || 0)}</td>
                                    <td style={cell}>{fmtPct(reasonSum[reason] || 0, grandReasonSum)}</td>
                                </tr>
                            ))}

                        {/* Spacer */}
                        <tr><td colSpan={colCount} style={spacer} /></tr>

                        {/* หยุดโดยสาเหตุหลัก */}
                        <tr>
                            <td style={{ ...summaryLbl, color: '#1565c0' }}>หยุดโดยสาเหตุหลัก (ชม)</td>
                            {wcList.map(w => <td key={w} style={blueCell()}>{fmtHr(wcStopMap[w].mainStop)}</td>)}
                            <td style={blueCell()}>{fmtHr(totalMain)}</td>
                            <td style={blueCell()}>{fmtPct(totalMain, totalStop)}</td>
                        </tr>

                        {/* หยุดโดยสาเหตุอื่น */}
                        <tr>
                            <td style={{ ...summaryLbl, color: '#1565c0' }}>หยุดโดยสาเหตุอื่น (ชม)</td>
                            {wcList.map(w => <td key={w} style={blueCell()}>{fmtHr(wcStopMap[w].otherStop)}</td>)}
                            <td style={blueCell()}>{fmtHr(totalOther)}</td>
                            <td style={blueCell()}>{fmtPct(totalOther, totalStop)}</td>
                        </tr>

                        {/* Spacer */}
                        <tr><td colSpan={colCount} style={{ height: 4 }} /></tr>

                        {/* รวมเวลาหยุด */}
                        <tr>
                            <td style={summaryLbl}>รวมเวลาหยุดเครื่องทุกสาเหตุ</td>
                            {wcList.map(w => (
                                <td key={w} style={{ ...cell, fontWeight: 'bold' }}>
                                    {fmtHr(wcStopMap[w].mainStop + wcStopMap[w].otherStop)}
                                </td>
                            ))}
                            <td style={{ ...cell, fontWeight: 'bold' }}>{fmtHr(totalStop)}</td>
                            <td style={cell} />
                        </tr>

                        {/* เป้าหมาย */}
                        <tr>
                            <td style={{ ...summaryLbl, color: '#b71c1c' }}>เป้าหมายชั่วโมงการทำงาน</td>
                            {wcList.map(w => <td key={w} style={redCell()}>{fmtHr(wcWorkMap[w].workHour)}</td>)}
                            <td style={redCell()}>{fmtHr(totalTarget)}</td>
                            <td style={cell} />
                        </tr>

                        {/* เวลาเดินจริง = เป้าหมาย - หยุดรวม */}
                        <tr>
                            <td style={{ ...summaryLbl, color: '#1a6a3a' }}>เวลาเดินเครื่องจริง</td>
                            {wcList.map(w => {
                                const realHr = wcWorkMap[w].workHour - (wcStopMap[w].mainStop + wcStopMap[w].otherStop);
                                return (
                                    <td key={w} style={{ ...cell, fontWeight: 'bold', color: '#1a6a3a' }}>
                                        {fmtHr(realHr)}
                                    </td>
                                );
                            })}
                            <td style={{ ...cell, fontWeight: 'bold', color: '#1a6a3a' }}>{fmtHr(totalReal)}</td>
                            <td style={cell} />
                        </tr>

                        {/* Spacer */}
                        <tr><td colSpan={colCount} style={{ height: 4 }} /></tr>

                        {/* % เดินเครื่อง */}
                        <tr>
                            <td style={summaryLbl}>% ในการเดินเครื่องจักร</td>
                            {wcList.map(w => {
                                const realHr = wcWorkMap[w].workHour - (wcStopMap[w].mainStop + wcStopMap[w].otherStop);
                                return (
                                    <td key={w} style={{ ...cell, color: '#1565c0' }}>
                                        {fmtPct(realHr, wcWorkMap[w].workHour)}
                                    </td>
                                );
                            })}
                            <td style={{ ...cell, fontWeight: 'bold', color: '#1565c0' }}>{fmtPct(totalReal, totalTarget)}</td>
                            <td style={cell} />
                        </tr>

                        {/* % หยุดสาเหตุหลัก (เฉพาะ Forming) */}
                        {/* % หยุดสาเหตุหลัก */}
                        <tr>
                            <td style={summaryLbl}>% หยุดโดยสาเหตุหลัก</td>
                            {wcList.map(w => (
                                <td key={w} style={cell}>
                                    {fmtPct(wcStopMap[w].mainStop, wcWorkMap[w].workHour)}
                                </td>
                            ))}
                            <td style={{ ...cell, fontWeight: 'bold' }}>{fmtPct(totalMain, totalTarget)}</td>
                            <td style={cell} />
                        </tr>

                        {/* % หยุดสาเหตุอื่น (highlight เหลือง) */}
                        <tr>
                            <td style={{ ...summaryLbl, backgroundColor: '#fff9c4' }}>% หยุดโดยสาเหตุอื่นๆ</td>
                            {wcList.map(w => (
                                <td key={w} style={yellowCell}>
                                    {fmtPct(wcStopMap[w].otherStop, wcWorkMap[w].workHour)}
                                </td>
                            ))}
                            <td style={{ ...yellowCell, backgroundColor: '#fff176' }}>{fmtPct(totalOther, totalTarget)}</td>
                            <td style={cell} />
                        </tr>

                        {/* % หยุดรวม */}
                        <tr>
                            <td style={summaryLbl}>% หยุดรวม</td>
                            {wcList.map(w => (
                                <td key={w} style={cell}>
                                    {fmtPct(wcStopMap[w].mainStop + wcStopMap[w].otherStop, wcWorkMap[w].workHour)}
                                </td>
                            ))}
                            <td style={{ ...cell, fontWeight: 'bold' }}>{fmtPct(totalStop, totalTarget)}</td>
                            <td style={cell} />
                        </tr>

                        {/* รวม % = 100% */}
                        <tr>
                            <td style={summaryLbl}>รวม %</td>
                            {wcList.map(w => (
                                <td key={w} style={{ ...cell, color: '#555' }}>
                                    {wcWorkMap[w].workHour > 0 ? '100.00%' : '-'}
                                </td>
                            ))}
                            <td style={{ ...cell, color: '#555', fontWeight: 'bold' }}>100.00%</td>
                            <td style={cell} />
                        </tr>

                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default TableFormingStop;