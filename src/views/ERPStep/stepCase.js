const stepCase = [

    {
        "CaseTitle": "บันทึก/แก้ไขเปลี่ยนแปลง PR",
        "detail":
            [
                {
                    "title": "การบันทึก PR",
                    "description": "เพิ่ม ลบ แก้ไข ข้อมูล PR เพื่อทำการขอซื้อสินค้า ",
                    "link": "",
                    "value": "การบันทึก PR",
                    "subdetail": [
                        {
                            "title": "Purchase Order Requisitions",
                            "description": "สร้าง Purchase Order Requisitions header กรอก requisition เป็นเลขที่เอกสาร ,Status resquested , Converted, History,Requester,Approver,Warehouse ",
                            "department": "ฝ่ายจัดซื้อ",
                            "page": "Purchase Order Requisitions",
                            "link": "",
                            "img": "/static/images/ERPStep/1/1.jpg"
                        },
                        {
                            "title": "Purchase Order Requisition Line",
                            "description": "สร้างรายการ Purchase Order Requisitions กรอกผู้ซื้อ ประเภทสินค้า บัญชี ต่อรายการที่ต้องการซื้อ",
                            "department": "ฝ่ายจัดซื้อ",
                            "page": "Purchase Order Requisition Line",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        },
                        {
                            "title": "Purchase Requisition Report",
                            "description": "เลือก Status ของรายงานเพื่อ พิมพ์รายงาน Purchase Requisition Report",
                            "department": "ฝ่ายจัดซื้อ",
                            "page": "Purchase Requisition Report",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "การอนุมัติ PR",
                    "description": "ตรวจสอบข้อมูล PR / ราคาสินค้าจากใบขอซื้อ / อนุมัติ PR",
                    "link": "",
                    "value": "การอนุมัติ PR",
                    "subdetail": [
                        {
                            "title": "Approved Purchase Order Requisition Lines",
                            "description": " 1) Enter Due Date 2) Enter Ordered Qty 3) Change Status Requested to Approved",
                            "department": "จัดซื้อ",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "สร้าง PO/Convert PR to PO",
        "detail":
            [
                {
                    "title": "การสร้าง PO",
                    "description": "สร้าง PO Header / สร้าง PO Line ",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "สร้าง PO Header",
                            "description": " 1) Vendor 2) Terms 3) Status",
                            "department": "จัดซื้อ",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        },
                        {
                            "title": "สร้าง PO Lines",
                            "description": "Create Lines of PO 1) Enter Line number 2) Enter Ordered Qty 3) Change Status Planed to Orderd",
                            "department": "จัดซื้อ",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Convert To PO ในประเทศ ",
                    "link": "",
                    "value": "Convert To PO ในประเทศ ",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Convert To PO ต่างประเทศ",
                    "link": "",
                    "value": "Convert To PO ต่างประเทศ",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "พิมพ์ใบ PO",
        "detail":
            [
                {
                    "title": "ตรวจสอบรูปแบบและข้อมูล PO",
                    "link": "",
                    "value": "Convert To PO ในประเทศ ",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "การแก้ไขเปลี่ยนแปลง PO",
        "detail":
            [
                {
                    "title": "การแก้ไข Due",
                    "link": "",
                    "value": "ยกเลิก PO",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "การแก้ไขราคา",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ยกเลิก PO",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "การรับสินค้า",
        "detail":
            [
                {
                    "title": "Load Weight List",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "Import weight List",
                            "description": "Import excel weight List to web application",
                            "department": "จัดซื้อ",
                            "page": "",
                            "link": "http://172.18.1.193/po_qc/up.php",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ GRN",
                    "description": "Create GRN / Create GRN Line",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "Create GRN",
                            "description": "Create GRN Header",
                            "department": "QC",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        },
                        {
                            "title": "Create GRN Lines",
                            "description": "Create GRN Lines",
                            "department": "QC",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Scan GRN & PO จาก GRN Report / Print Barcode",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "Print GRN List",
                            "description": "Print GRN List",
                            "department": "QC",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        },
                        {
                            "title": "Scan GRN & PO จาก GRN Report ",
                            "description": "Create GRN Lines",
                            "department": "QC",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        },
                        {
                            "title": "Process GRN to SL web",
                            "description": "Create GRN Lines",
                            "department": "QC",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Receipt Tag",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ PO Receiving",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Approve GRN",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ GRN  ตรวจสอบ Rate ",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ระบุค่า Landed Cost",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Allocate Landed Cost  เข้า PO",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Load Weight List",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Scan GRN & PO จาก GRN Report / Print Barcode",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Receipt Tag",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ PO Receiving",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Approve GRN",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "(ในกรณีที่ส่งเกิน PO )Add  PO Line  Material Cost = 0",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "(ในกรณีที่ส่งเกิน PO ) ทำ PO Receiving + GRN",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ตรวจสอบรายงานการเคลื่อนไหวสินค้าประจำวัน1",
        "detail":
            [
                {
                    "title": "Material Transaction Report",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Inventory Balance Report",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ตรวจสอบยอดสินค้าคงเหลือ1",
        "detail":
            [
                {
                    "title": "Item Stockroom Location",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ตรวจสอบเอกสารและส่งใบรับสินค้าให้บัญชี",
        "detail":
            [
                {
                    "title": "ส่งเอกสาร Invoice และใบรับ GRN ให้กับบัญชี",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "การโอนวัตถุดิบ",
        "detail":
            [
                {
                    "title": "1 โอนกรณีที่ย้ายสินค้าและคนดูแล Location ต่างหน่วยงาน \nเปิด Transfer Order",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Quantity Move",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ Transfer Order Ship",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "พิมพ์ใบ Transfer Order Ship Pick List",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ Transfer Order Receive",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "2 โอนในกรณีที่หน่วยงานที่ดูแลเป็นหน่วยงานเดียวกัน \n Quantity Move",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ตรวจสอบรายงานการเคลื่อนไหวสินค้าประจำวัน2",
        "detail":
            [
                {
                    "title": "Material Transaction Report",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Inventory Balance Report",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ตรวจสอบยอดสินค้าคงเหลือ2",
        "detail":
            [
                {
                    "title": "Item Stockroom Location",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "การทำ Job Receipt - Finish Goods",
        "detail":
            [
                {
                    "title": "ทำ Job Receipt ",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ตรวจสอบความถูกต้อง",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ยอด Stock",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ยอดที่ Job Order",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Print Tag Barcode",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "บันทึก/แก้ไขเปลี่ยนแปลง Customer Order",
        "detail":
            [
                {
                    "title": "การบันทึก Customer Order (Regular / Blanket)",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "การแก้ไข Customer Order (Regular / Blanket)",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "Generate DO ดึงรายการ Customer Order มา Gen สร้าง DO",
        "detail":
            [
                {
                    "title": "ทำการ Gen DO From CO",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "preship DO",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ออกใบส่งสินค้า",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "Order Shipping",
        "detail":
            [
                {
                    "title": "ทำการตัด Stock (Order Shipping) Barcode",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ตรวจสอบความถูกต้อง",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ยอด Stock",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "รายงาน Pre Invoice",
        "detail":
            [
                {
                    "title": "ออกรายงาน Pre Invoice ก่อนออก Invoice จริง (Export)",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "Order Invoicing",
        "detail":
            [
                {
                    "title": "ทำ Consolidated Invoice Generation",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ซื้อมาขายไป",
        "detail":
            [
                {
                    "title": "การบันทึก PR",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "การอนุมัติ PR",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Convert To PO",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ตรวจสอบข้อมูล PO",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ PO Receiving",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "การบันทึก Customer Order",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำการ Gen DO From CO",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ออกใบส่งสินค้า",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำการตัด Stock (Order Shipping) Barcode",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "ทำ Consolidated Invoice Generation",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "พิมพ์ใบ Invoice",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ตรวจสอบรายงานการเคลื่อนไหวสินค้าประจำวัน3",
        "detail":
            [
                {
                    "title": "Material Transaction Report",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                },
                {
                    "title": "Inventory Balance Report",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    },
    {
        "CaseTitle": "ตรวจสอบยอดสินค้าคงเหลือ3",
        "detail":
            [
                {
                    "title": "Item Stockroom Location",
                    "link": "",
                    "value": "",
                    "subdetail": [
                        {
                            "title": "",
                            "description": "",
                            "department": "",
                            "page": "",
                            "link": "",
                            "img": "/static/images/products/product_1.png"
                        }
                    ]
                }
            ]
    }
]

export default stepCase;
