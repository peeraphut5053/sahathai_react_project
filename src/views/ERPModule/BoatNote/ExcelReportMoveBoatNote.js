import * as XLSX from 'xlsx';

function ExcelReportMoveBoatNote(data, loc, boatPosition) {
   // 1. กำหนด header ภาษาไทย
   const headers = ['STS_PO', 'City', 'Uf_NPS', 'Uf_spec', 'Uf_Grade', 'Uf_Schedule', 'Uf_length', 'Uf_TypeEnd', 'PCS/BDL', 'Countlot', 'Weight'];
    
   // 2. แปลงข้อมูลให้อยู่ในรูปแบบ array
   const rows = data.map(item => [
     item.STS_PO,
     item.city,
     item.Uf_NPS,
     item.Uf_spec,
     item.Uf_Grade,
     item.Uf_Schedule,
     item.Uf_length,
     item.Uf_TypeEnd,
     item.PCSperBundle,
     item.countlot,
     item.weight
   ]);
   
   // 3. รวม header และข้อมูล
   const worksheet_data = [headers, ...rows];
   
   // 4. สร้าง worksheet
   const worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);
   
   // 5. กำหนดความกว้างของคอลัมน์
   worksheet['!cols'] = [
     { width: 15 }, // STS_PO
     { width: 15 }, // City
     { width: 15 }, // Uf_NPS
     { width: 15 }, // Uf_spec
     { width: 15 }, // Uf_Grade
     { width: 15 }, // Uf_Schedule
     { width: 15 }, // Uf_length
     { width: 15 }, // Uf_TypeEnd
     { width: 15 }, // PCS/BDL
     { width: 15 }, // Countlot
     { width: 15 }  // Weight
   ];
   
   // 6. สร้าง workbook และเพิ่ม worksheet
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, 'รายงาน');
   
   // 7. สร้างไฟล์และดาวน์โหลด
   XLSX.writeFile(workbook, 'รายงานการเคลื่อนย้ายเรือ.xlsx');
}

export { ExcelReportMoveBoatNote };