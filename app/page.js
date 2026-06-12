'use client'

import { useState, useRef, useEffect } from 'react'
import {
  LayoutDashboard,
  Boxes,
  FolderKanban,
  Users,
  Truck,
  UserCheck,
  RotateCcw,
  Wrench,
  QrCode,
  FileBarChart,
  Bell,
  Settings,
  UserCog,
  LogOut,
  HelpCircle,
  Menu,
  Search,
  ChevronDown,
  UploadCloud,
  User,
  Mail,
  Shield,
  Plus,
  Filter,
  Pencil,
  UserPlus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Monitor,
  CheckSquare,
  Package,
  FileText,
  Droplet,
  Printer,
  RotateCw,
  Check,
  Edit3,
  QrCode as QrIcon,
  Printer as PrintIcon,
  ArrowLeft,
  Eye,
  Camera,
  CheckCircle2,
  Smartphone,
  AtSign,
  BellRing,
  Database,
  Info,
  Save,
  HardDrive,
  Server,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  Activity,
  Clock,
  Building2,
  Laptop,
  Tablet,
  Mouse,
} from 'lucide-react'

const generateAssetHistory = (asset) => {
  const pastUsers = ['Mike Johnson', 'Sarah Wilson', 'David Lee', 'Emily Davis', 'James Taylor', 'Sophia Garcia', 'Daniel Martinez', 'William Thomas', 'Isabella Allen', 'Henry Wright']
  const idx = parseInt(asset.id.slice(1)) % pastUsers.length
  const u1 = pastUsers[idx]
  const u2 = pastUsers[(idx + 3) % pastUsers.length]

  const assignments = []
  if (asset.assignedTo && asset.assignedTo !== '-') {
    const day = String((parseInt(asset.id.slice(1)) % 26) + 1).padStart(2, '0')
    assignments.push({ name: asset.assignedTo, assignedDate: `${day}-02-2024`, returnedDate: null, status: 'Current' })
  }
  assignments.push({ name: u1, assignedDate: '10-01-2024', returnedDate: '15-02-2024', status: 'Returned' })
  if (idx % 2 === 0) {
    assignments.push({ name: u2, assignedDate: '05-06-2023', returnedDate: '08-01-2024', status: 'Returned' })
  }

  const maintenance = []
  if (asset.status === 'Maintenance') {
    maintenance.push({ id: `M2${asset.id.slice(1)}`, type: 'Hardware Inspection', date: '15-05-2024', status: 'In Progress', technician: 'TechSupport Team' })
  }
  maintenance.push({ id: `M1${asset.id.slice(1)}`, type: 'Routine Check', date: '22-03-2024', status: 'Completed', technician: 'IT Helpdesk' })
  if (idx % 3 === 0) {
    maintenance.push({ id: `M0${asset.id.slice(1)}`, type: 'Software Update', date: '10-01-2024', status: 'Completed', technician: 'IT Helpdesk' })
  }

  const activity = [
    { text: `Asset ${asset.id} created in inventory`, time: `15-02-2024 11:00 AM`, type: 'create' },
    { text: `Purchased from ${asset.vendor}`, time: `15-02-2024 11:05 AM`, type: 'purchase' },
  ]
  if (asset.assignedTo && asset.assignedTo !== '-') {
    activity.push({ text: `Assigned to ${asset.assignedTo}`, time: `16-02-2024 10:30 AM`, type: 'assign' })
  }
  activity.push({ text: `Returned by ${u1}`, time: `15-02-2024 04:12 PM`, type: 'return' })
  if (asset.status === 'Maintenance') {
    activity.push({ text: `Sent for hardware inspection`, time: `15-05-2024 09:00 AM`, type: 'maintenance' })
  }
  activity.push({ text: `Warranty registered with ${asset.vendor}`, time: `20-02-2024 02:45 PM`, type: 'warranty' })

  return { assignments, maintenance, activity }
}

const dummyAssets = [
  { id: 'A1001', name: 'Dell Latitude 5440', category: 'Laptop', manufacturer: 'Dell Latitude 5440', serial: 'DLS44OY133456', model: 'Latitude 5440', purchaseDate: '2024-02-15', purchasePrice: 75000, vendor: 'Dell India Pvt. Ltd.', warranty: '2026-02-15', location: 'IT Department', description: 'Dell Latitude 5440 Laptop', status: 'Assigned', assignedTo: 'John Doe', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80' },
  { id: 'A1002', name: 'HP LaserJet Pro', category: 'Printer', manufacturer: 'HP LaserJet Pro M404', serial: 'HPLJ778899', model: 'M404dn', purchaseDate: '2023-11-05', purchasePrice: 22000, vendor: 'HP India', warranty: '2025-11-05', location: 'Reception', description: 'Office monochrome laser printer', status: 'Available', assignedTo: '-', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80' },
  { id: 'A1003', name: 'Apple MacBook Pro', category: 'Laptop', manufacturer: 'Apple MacBook Pro 14"', serial: 'APMBP223344', model: 'M2 Pro 14"', purchaseDate: '2024-01-20', purchasePrice: 215000, vendor: 'Apple India', warranty: '2026-01-20', location: 'Design Team', description: 'MacBook Pro for designers', status: 'Assigned', assignedTo: 'Sarah Wilson', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80' },
  { id: 'A1004', name: 'Samsung 24" Monitor', category: 'Monitor', manufacturer: 'Samsung S24R350', serial: 'SMS24R998877', model: 'S24R350', purchaseDate: '2023-08-12', purchasePrice: 14500, vendor: 'Samsung India', warranty: '2025-08-12', location: 'IT Department', description: '24-inch Full HD IPS monitor', status: 'Maintenance', assignedTo: 'Mike Johnson', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80' },
  { id: 'A1005', name: 'Lenovo ThinkPad E14', category: 'Laptop', manufacturer: 'Lenovo ThinkPad E14', serial: 'LNTP445566', model: 'E14 Gen 4', purchaseDate: '2024-03-10', purchasePrice: 68000, vendor: 'Lenovo India', warranty: '2026-03-10', location: 'Finance', description: 'Business laptop for finance team', status: 'Assigned', assignedTo: 'Robert Brown', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80' },
  { id: 'A1006', name: 'Epson Projector', category: 'Projector', manufacturer: 'Epson EB-X51', serial: 'EPPRJ112233', model: 'EB-X51', purchaseDate: '2023-06-18', purchasePrice: 42000, vendor: 'Epson India', warranty: '2025-06-18', location: 'Conference Room', description: 'XGA conference room projector', status: 'Available', assignedTo: '-', image: 'https://images.unsplash.com/photo-1626218174358-7769486beb39?w=600&q=80' },
  { id: 'A1007', name: 'iPhone 15 Pro', category: 'Mobile Device', manufacturer: 'Apple iPhone 15 Pro', serial: 'APIP15P55667', model: 'iPhone 15 Pro', purchaseDate: '2024-04-02', purchasePrice: 134900, vendor: 'Apple India', warranty: '2026-04-02', location: 'Sales Team', description: 'Company phone for sales executive', status: 'Assigned', assignedTo: 'James Taylor', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80' },
  { id: 'A1008', name: 'Logitech MX Master 3S', category: 'Peripheral', manufacturer: 'Logitech MX Master 3S', serial: 'LGMX3S889900', model: 'MX Master 3S', purchaseDate: '2024-05-08', purchasePrice: 8500, vendor: 'Logitech India', warranty: '2026-05-08', location: 'IT Department', description: 'Wireless ergonomic mouse', status: 'Available', assignedTo: '-', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80' },
  { id: 'A1009', name: 'iPad Pro 12.9"', category: 'Tablet', manufacturer: 'Apple iPad Pro', serial: 'APIPD129776', model: 'iPad Pro M2', purchaseDate: '2024-02-28', purchasePrice: 109900, vendor: 'Apple India', warranty: '2026-02-28', location: 'Marketing', description: 'iPad for content creation team', status: 'Assigned', assignedTo: 'Sophia Garcia', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80' },
  { id: 'A1010', name: 'Canon EOS R6 Camera', category: 'Camera', manufacturer: 'Canon EOS R6', serial: 'CNEOSR6334455', model: 'EOS R6 Mark II', purchaseDate: '2023-12-15', purchasePrice: 245000, vendor: 'Canon India', warranty: '2025-12-15', location: 'Media Room', description: 'Mirrorless camera for marketing shoots', status: 'Maintenance', assignedTo: 'Daniel Martinez', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80' },
  { id: 'A1011', name: 'Dell OptiPlex 7090', category: 'Desktop', manufacturer: 'Dell OptiPlex', serial: 'DLOX7090776', model: 'OptiPlex 7090', purchaseDate: '2023-09-10', purchasePrice: 58000, vendor: 'Dell India Pvt. Ltd.', warranty: '2025-09-10', location: 'Finance', description: 'Business desktop tower', status: 'Assigned', assignedTo: 'Olivia Anderson', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80' },
  { id: 'A1012', name: 'HP EliteDesk 800', category: 'Desktop', manufacturer: 'HP EliteDesk', serial: 'HPED800221', model: 'EliteDesk 800 G9', purchaseDate: '2024-01-08', purchasePrice: 62000, vendor: 'HP India', warranty: '2026-01-08', location: 'IT Department', description: 'Compact business desktop', status: 'Available', assignedTo: '-', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80' },
  { id: 'A1013', name: 'HP Pavilion 24 All-in-One', category: 'Desktop', manufacturer: 'HP Pavilion', serial: 'HPPV24558', model: 'Pavilion 24-ca0xxx', purchaseDate: '2023-07-20', purchasePrice: 72000, vendor: 'HP India', warranty: '2025-07-20', location: 'Reception', description: 'All-in-one PC with touchscreen', status: 'Assigned', assignedTo: 'Mia King', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80' },
  { id: 'A1014', name: 'Brother MFC-L8900', category: 'Printer', manufacturer: 'Brother MFC', serial: 'BRMFC889922', model: 'MFC-L8900CDW', purchaseDate: '2023-10-25', purchasePrice: 48000, vendor: 'Brother India', warranty: '2025-10-25', location: 'HR Department', description: 'Multi-function color laser printer', status: 'Available', assignedTo: '-', image: 'https://images.unsplash.com/photo-1581092334577-23bdc6e0c9ce?w=600&q=80' },
  { id: 'A1015', name: 'LG UltraWide 34"', category: 'Monitor', manufacturer: 'LG UltraWide', serial: 'LGUW34112', model: '34WP65C-B', purchaseDate: '2024-02-10', purchasePrice: 48000, vendor: 'LG Electronics', warranty: '2026-02-10', location: 'Design Team', description: '34-inch curved ultrawide monitor', status: 'Assigned', assignedTo: 'Isabella Allen', image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=600&q=80' },
  { id: 'A1016', name: 'Dell P2422H Monitor', category: 'Monitor', manufacturer: 'Dell Professional', serial: 'DLP2422998', model: 'P2422H', purchaseDate: '2024-03-15', purchasePrice: 18500, vendor: 'Dell India Pvt. Ltd.', warranty: '2026-03-15', location: 'Sales Team', description: '24-inch professional Full HD monitor', status: 'Assigned', assignedTo: 'Charlotte Scott', image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=600&q=80' },
  { id: 'A1017', name: 'Samsung Galaxy S23', category: 'Mobile Device', manufacturer: 'Samsung Galaxy', serial: 'SMGS23445', model: 'Galaxy S23 Ultra', purchaseDate: '2024-04-12', purchasePrice: 124000, vendor: 'Samsung India', warranty: '2026-04-12', location: 'Operations', description: 'Flagship company phone', status: 'Assigned', assignedTo: 'William Thomas', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80' },
  { id: 'A1018', name: 'Microsoft Surface Pro 9', category: 'Laptop', manufacturer: 'Microsoft Surface', serial: 'MSSP9332', model: 'Surface Pro 9', purchaseDate: '2024-05-05', purchasePrice: 132000, vendor: 'Microsoft Store', warranty: '2026-05-05', location: 'Marketing', description: '2-in-1 detachable laptop', status: 'Available', assignedTo: '-', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&q=80' },
  { id: 'A1019', name: 'Lenovo Yoga 9i', category: 'Laptop', manufacturer: 'Lenovo Yoga', serial: 'LNYO9I223', model: 'Yoga 9i Gen 8', purchaseDate: '2024-03-28', purchasePrice: 145000, vendor: 'Lenovo India', warranty: '2026-03-28', location: 'IT Department', description: 'Premium convertible laptop', status: 'Assigned', assignedTo: 'Alexander Hill', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80' },
  { id: 'A1020', name: 'HP ProBook 450 G10', category: 'Laptop', manufacturer: 'HP ProBook', serial: 'HPPB450789', model: 'ProBook 450 G10', purchaseDate: '2024-06-01', purchasePrice: 72500, vendor: 'HP India', warranty: '2026-06-01', location: 'Sales Team', description: 'Business laptop for sales reps', status: 'Assigned', assignedTo: 'Benjamin Hall', image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600&q=80' },
]

const assignmentHistory = {
  A1001: [
    { name: 'John Doe', assignedDate: '2024-02-16', returnedDate: null, status: 'Current' },
    { name: 'Mike Johnson', assignedDate: '2024-01-10', returnedDate: '2024-02-15', status: 'Returned' },
    { name: 'Sarah Wilson', assignedDate: '2023-09-05', returnedDate: '2024-01-08', status: 'Returned' },
  ],
}
const maintenanceHistory = {
  A1001: [
    { id: 'M2003', type: 'Software Update', date: '2024-05-15', status: 'In Progress' },
    { id: 'M1991', type: 'Battery Check', date: '2024-03-22', status: 'Completed' },
  ],
}
const activityLog = {
  A1001: [
    { text: 'Assigned to John Doe', time: '2024-02-16 10:30 AM' },
    { text: 'Returned by Mike Johnson', time: '2024-02-15 04:12 PM' },
    { text: 'Software update scheduled', time: '2024-05-15 09:00 AM' },
    { text: 'Asset created in inventory', time: '2024-02-15 11:00 AM' },
  ],
}

const dummyMaintenance = [
  { id: 'M2001', assetId: 'A1004', assetName: 'Samsung 24" Monitor', type: 'Hardware Issue', serviceDate: '2024-05-10', nextDue: '2024-06-10', status: 'Completed' },
  { id: 'M2002', assetId: 'A1006', assetName: 'Epson Projector', type: 'Cleaning', serviceDate: '2024-05-12', nextDue: '2024-06-12', status: 'Completed' },
  { id: 'M2003', assetId: 'A1001', assetName: 'Dell Latitude 5440', type: 'Software Update', serviceDate: '2024-05-15', nextDue: '2024-06-15', status: 'In Progress' },
  { id: 'M2004', assetId: 'A1002', assetName: 'HP LaserJet Pro', type: 'Toner Replacement', serviceDate: '2024-05-18', nextDue: '2024-06-18', status: 'Pending' },
  { id: 'M2005', assetId: 'A1007', assetName: 'Lenovo ThinkPad E14', type: 'Hardware Issue', serviceDate: '2024-05-20', nextDue: '2024-06-20', status: 'Pending' },
  { id: 'M2006', assetId: 'A1009', assetName: 'Apple MacBook Pro', type: 'Battery Replacement', serviceDate: '2024-05-22', nextDue: '2024-06-22', status: 'Completed' },
  { id: 'M2007', assetId: 'A1011', assetName: 'Canon Scanner', type: 'Cleaning', serviceDate: '2024-05-24', nextDue: '2024-06-24', status: 'In Progress' },
  { id: 'M2008', assetId: 'A1003', assetName: 'Dell OptiPlex 7090', type: 'OS Reinstall', serviceDate: '2024-05-26', nextDue: '2024-06-26', status: 'Pending' },
  { id: 'M2009', assetId: 'A1014', assetName: 'LG UltraWide Monitor', type: 'Calibration', serviceDate: '2024-05-28', nextDue: '2024-06-28', status: 'Completed' },
  { id: 'M2010', assetId: 'A1015', assetName: 'HP EliteBook 840', type: 'Keyboard Repair', serviceDate: '2024-05-30', nextDue: '2024-06-30', status: 'In Progress' },
  { id: 'M2011', assetId: 'A1018', assetName: 'Xerox Photocopier', type: 'Drum Replacement', serviceDate: '2024-06-02', nextDue: '2024-07-02', status: 'Pending' },
  { id: 'M2012', assetId: 'A1020', assetName: 'Logitech Conference Cam', type: 'Firmware Update', serviceDate: '2024-06-04', nextDue: '2024-07-04', status: 'Completed' },
  { id: 'M2013', assetId: 'A1022', assetName: 'Acer Aspire Desktop', type: 'Power Supply', serviceDate: '2024-06-06', nextDue: '2024-07-06', status: 'In Progress' },
  { id: 'M2014', assetId: 'A1025', assetName: 'Brother MFC Printer', type: 'Ink Cartridge', serviceDate: '2024-06-08', nextDue: '2024-07-08', status: 'Pending' },
  { id: 'M2015', assetId: 'A1028', assetName: 'iPad Pro 12.9"', type: 'Screen Replacement', serviceDate: '2024-06-10', nextDue: '2024-07-10', status: 'Completed' },
]

// Donut chart component using SVG
function DonutChart({ data, size = 200, strokeWidth = 36 }) {
  const radius = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * radius
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let cumulative = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
      {data.map((seg, idx) => {
        const value = seg.value
        const dash = (value / total) * circumference
        const offset = (cumulative / total) * circumference
        cumulative += value
        return (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            className="transition-all duration-500"
          />
        )
      })}
    </svg>
  )
}

const dummyEmployees = [
  { id: 'E1001', name: 'John Doe', department: 'IT Department', designation: 'System Administrator', email: 'john.doe@company.com', phone: '9876543210' },
  { id: 'E1002', name: 'Mary Smith', department: 'IT Department', designation: 'Software Engineer', email: 'mary.smith@company.com', phone: '9876543211' },
  { id: 'E1003', name: 'Robert Brown', department: 'Finance', designation: 'Accountant', email: 'robert.brown@company.com', phone: '9876543212' },
  { id: 'E1004', name: 'David Lee', department: 'HR Department', designation: 'HR Manager', email: 'david.lee@company.com', phone: '9876543213' },
  { id: 'E1005', name: 'Mike Johnson', department: 'IT Department', designation: 'Network Engineer', email: 'mike.johnson@company.com', phone: '9876543214' },
  { id: 'E1006', name: 'Sarah Wilson', department: 'Marketing', designation: 'Marketing Lead', email: 'sarah.wilson@company.com', phone: '9876543215' },
  { id: 'E1007', name: 'James Taylor', department: 'Sales', designation: 'Sales Executive', email: 'james.taylor@company.com', phone: '9876543216' },
  { id: 'E1008', name: 'Emily Davis', department: 'HR Department', designation: 'Recruiter', email: 'emily.davis@company.com', phone: '9876543217' },
  { id: 'E1009', name: 'Daniel Martinez', department: 'IT Department', designation: 'DevOps Engineer', email: 'daniel.martinez@company.com', phone: '9876543218' },
  { id: 'E1010', name: 'Olivia Anderson', department: 'Finance', designation: 'Financial Analyst', email: 'olivia.anderson@company.com', phone: '9876543219' },
  { id: 'E1011', name: 'William Thomas', department: 'Operations', designation: 'Operations Manager', email: 'william.thomas@company.com', phone: '9876543220' },
  { id: 'E1012', name: 'Sophia Garcia', department: 'Marketing', designation: 'Content Strategist', email: 'sophia.garcia@company.com', phone: '9876543221' },
  { id: 'E1013', name: 'Benjamin Hall', department: 'Sales', designation: 'Sales Manager', email: 'benjamin.hall@company.com', phone: '9876543222' },
  { id: 'E1014', name: 'Isabella Allen', department: 'IT Department', designation: 'QA Engineer', email: 'isabella.allen@company.com', phone: '9876543223' },
  { id: 'E1015', name: 'Lucas Young', department: 'Finance', designation: 'Auditor', email: 'lucas.young@company.com', phone: '9876543224' },
  { id: 'E1016', name: 'Mia King', department: 'HR Department', designation: 'HR Executive', email: 'mia.king@company.com', phone: '9876543225' },
  { id: 'E1017', name: 'Henry Wright', department: 'Operations', designation: 'Logistics Lead', email: 'henry.wright@company.com', phone: '9876543226' },
  { id: 'E1018', name: 'Amelia Lopez', department: 'Marketing', designation: 'SEO Specialist', email: 'amelia.lopez@company.com', phone: '9876543227' },
  { id: 'E1019', name: 'Alexander Hill', department: 'IT Department', designation: 'Frontend Developer', email: 'alexander.hill@company.com', phone: '9876543228' },
  { id: 'E1020', name: 'Charlotte Scott', department: 'Sales', designation: 'Account Executive', email: 'charlotte.scott@company.com', phone: '9876543229' },
]

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Boxes, label: 'Assets' },
  { icon: FolderKanban, label: 'Categories' },
  { icon: Users, label: 'Employees' },
  { icon: Truck, label: 'Vendors' },
  { icon: UserCheck, label: 'Asset Assignment' },
  { icon: RotateCcw, label: 'Return Assets' },
  { icon: Wrench, label: 'Maintenance' },
  { icon: QrCode, label: 'QR Code Scanner' },
  { icon: FileBarChart, label: 'Reports' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
  { icon: UserCog, label: 'Users' },
  { icon: LogOut, label: 'Logout' },
  { icon: HelpCircle, label: 'Need Help?' },
]

function App() {
  const [activeMenu, setActiveMenu] = useState('Assets')
  const [profileOpen, setProfileOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)
  const profileRef = useRef(null)

  // Employees state
  const [empSearch, setEmpSearch] = useState('')
  const [empPage, setEmpPage] = useState(1)
  const EMP_PER_PAGE = 5

  // Reports state
  const [reportType, setReportType] = useState('Asset Summary')
  const [fromDate, setFromDate] = useState('2024-01-01')
  const [toDate, setToDate] = useState('2024-12-31')
  const [reportGenerated, setReportGenerated] = useState(0)

  // Maintenance state
  const [maintPage, setMaintPage] = useState(1)
  const MAINT_PER_PAGE = 5

  // Categories state
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [catSearch, setCatSearch] = useState('')

  // Assets view state: 'list' | 'add' | 'details'
  const [assetView, setAssetView] = useState('list')
  const [selectedAssetId, setSelectedAssetId] = useState(null)
  const [detailsTab, setDetailsTab] = useState('Assignment History')

  // QR Scanner state: 'idle' | 'scanning' | 'scanned'
  const [qrState, setQrState] = useState('idle')
  const [scannedAssetIdx, setScannedAssetIdx] = useState(0)
  const qrTimerRef = useRef(null)

  // Settings state
  const [settingsTab, setSettingsTab] = useState('General Settings')
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'ABC Company Pvt. Ltd.',
    address: '123, Business Park, Mumbai, India',
    phone: '+91 9876543210',
    email: 'info@abccompany.com',
    currency: 'INR (₹)',
    dateFormat: 'dd-mm-yyyy',
    timeZone: '(GMT+05:30) Asia/Kolkata',
  })
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    username: 'notifications@abccompany.com',
    password: '',
    fromName: 'AMS Notifications',
    encryption: 'TLS',
  })
  const [notifSettings, setNotifSettings] = useState({
    emailNotif: true,
    pushNotif: true,
    smsNotif: false,
    assetAssignment: true,
    maintenanceAlerts: true,
    warrantyExpiry: true,
    weeklyReport: false,
  })
  const [savedToast, setSavedToast] = useState(false)

  const startScan = () => {
    setQrState('scanning')
    qrTimerRef.current = setTimeout(() => {
      // Pick a random asset from the 10 dummy assets
      setScannedAssetIdx(Math.floor(Math.random() * dummyAssets.length))
      setQrState('scanned')
    }, 2800)
  }
  const stopScan = () => {
    if (qrTimerRef.current) clearTimeout(qrTimerRef.current)
    setQrState('idle')
  }
  const resetScan = () => {
    if (qrTimerRef.current) clearTimeout(qrTimerRef.current)
    setQrState('idle')
  }

  const [form, setForm] = useState({
    assetName: '',
    category: '',
    serialNumber: '',
    modelNumber: '',
    purchaseDate: '',
    purchasePrice: '',
    vendor: '',
    warrantyExpiry: '',
    location: '',
    description: '',
  })
  const [image, setImage] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (file) => {
    if (!file) return
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      alert('Only PNG or JPG files are allowed')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be under 2MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.assetName || !form.category || !form.serialNumber || !form.purchaseDate) {
      alert('Please fill in all required fields')
      return
    }
    console.log('Asset Saved:', { ...form, image })
    alert('Asset added successfully!')
  }

  const handleCancel = () => {
    setForm({
      assetName: '',
      category: '',
      serialNumber: '',
      modelNumber: '',
      purchaseDate: '',
      purchasePrice: '',
      vendor: '',
      warrantyExpiry: '',
      location: '',
      description: '',
    })
    setImage(null)
  }

  const handleLogout = () => {
    setProfileOpen(false)
    setLoggedIn(false)
  }

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const handleMenuClick = (label) => {
    if (label === 'Logout') {
      handleLogout()
      return
    }
    setActiveMenu(label)
  }

  // Login screen
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#0d1b4c] flex items-center justify-center mb-3">
              <div className="w-6 h-6 border-2 border-white rotate-45"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AMS Login</h1>
            <p className="text-sm text-gray-500 mt-1">Asset Management System</p>
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Sign In as Admin
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Main Application Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex min-h-[900px]">
          {/* Sidebar */}
          <aside className="w-64 bg-[#0d1b4c] text-white flex-shrink-0 flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
              <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white rotate-45"></div>
              </div>
              <div className="leading-tight">
                <div className="text-2xl font-bold">AMS</div>
                <div className="text-[10px] font-semibold tracking-wider text-white/80">
                  ASSET<br />MANAGEMENT<br />SYSTEM
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {sidebarItems.map((item, idx) => {
                const Icon = item.icon
                const isActive = activeMenu === item.label
                return (
                  <button
                    key={idx}
                    onClick={() => handleMenuClick(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-white/85 hover:bg-white/10 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col bg-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search assets, categories, employees..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-5">
                <button className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell className="w-5 h-5 text-gray-700" />
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2.5 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="leading-tight text-left">
                      <div className="text-sm font-semibold text-gray-900">Admin User</div>
                      <div className="text-xs text-gray-500">Administrator</div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        profileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                      {/* User info header */}
                      <div className="bg-gradient-to-r from-[#0d1b4c] to-blue-700 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">Admin User</div>
                            <div className="text-xs text-white/80">Administrator</div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-4 space-y-3 border-b border-gray-100">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">admin@ams.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">Full Access</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <UserCog className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">ID: ADM-001</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setProfileOpen(false)
                            setActiveMenu('Settings')
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Account Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="flex-1 px-8 py-6">
              {selectedAssetId ? (
                (() => {
                  const asset = dummyAssets.find((a) => a.id === selectedAssetId) || dummyAssets[0]
                  const { assignments, maintenance, activity } = generateAssetHistory(asset)
                  const formatDate = (d) => {
                    if (!d) return '-'
                    if (d.includes('-') && d.split('-')[0].length === 4) {
                      const [y, m, dd] = d.split('-')
                      return `${dd}-${m}-${y}`
                    }
                    return d
                  }
                  const statusBadge =
                    asset.status === 'Assigned' ? 'bg-green-100 text-green-700 border-green-200'
                    : asset.status === 'Available' ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-red-100 text-red-700 border-red-200'
                  const rowStatusCls = (s) =>
                    s === 'Current' ? 'bg-green-100 text-green-700 border-green-200'
                    : s === 'Returned' ? 'bg-gray-100 text-gray-700 border-gray-200'
                    : s === 'In Progress' ? 'bg-orange-100 text-orange-700 border-orange-200'
                    : 'bg-blue-100 text-blue-700 border-blue-200'

                  const activityIconMap = {
                    create: { icon: Plus, color: 'text-blue-600', bg: 'bg-blue-100' },
                    purchase: { icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                    assign: { icon: UserPlus, color: 'text-green-600', bg: 'bg-green-100' },
                    return: { icon: RotateCw, color: 'text-cyan-600', bg: 'bg-cyan-100' },
                    maintenance: { icon: Wrench, color: 'text-red-600', bg: 'bg-red-100' },
                    warranty: { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100' },
                  }

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Asset Details</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span>{' '}
                            <button onClick={() => setSelectedAssetId(null)} className="hover:text-blue-600 underline-offset-2 hover:underline">Assets</button>{' '}
                            <span className="mx-1">/</span> {asset.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button onClick={() => setSelectedAssetId(null)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                          </button>
                          <button onClick={() => alert(`Edit ${asset.id}`)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                            <PrintIcon className="w-4 h-4" />
                            Print
                          </button>
                          <button onClick={() => alert(`QR Code generated for ${asset.id}`)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm">
                            <QrIcon className="w-4 h-4" />
                            Generate QR
                          </button>
                        </div>
                      </div>

                      {/* Asset Info Card */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Image */}
                        <div className="lg:col-span-4 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden p-6 min-h-[320px]">
                          <img src={asset.image} alt={asset.name} className="max-h-[320px] w-full object-contain" />
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-8">
                          {/* Top row: Asset ID + Status */}
                          <div className="grid grid-cols-2 gap-6 pb-5 border-b border-gray-100">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Asset ID</p>
                              <p className="text-xl font-bold text-blue-600 mt-1">{asset.id}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</p>
                              <span className={`inline-flex px-3 py-1 mt-1 rounded-md text-xs font-bold border ${statusBadge}`}>
                                {asset.status}
                              </span>
                            </div>
                          </div>

                          {/* Detail rows */}
                          <div className="divide-y divide-gray-100">
                            {[
                              [['Asset Name', asset.name], ['Category', asset.category]],
                              [['Manufacturer', asset.manufacturer], ['Model Number', asset.model]],
                              [['Serial No.', asset.serial], ['Purchase Date', formatDate(asset.purchaseDate)]],
                              [['Purchase Price', `₹ ${asset.purchasePrice.toLocaleString('en-IN')}.00`], ['Warranty Expiry', formatDate(asset.warranty)]],
                              [['Vendor', asset.vendor], ['Location', asset.location]],
                              [['Assigned To', asset.assignedTo || '-'], ['Description', asset.description]],
                            ].map((pair, i) => (
                              <div key={i} className="grid grid-cols-2 gap-6 py-3.5">
                                {pair.map(([k, v]) => (
                                  <div key={k} className="grid grid-cols-2 gap-3 items-center">
                                    <span className="text-sm text-gray-500">{k}</span>
                                    <span className="text-sm font-semibold text-gray-900 break-words">{v}</span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tabs Card */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="border-b border-gray-200 px-6 flex items-center gap-2 overflow-x-auto">
                          {['Assignment History', 'Maintenance History', 'Activity Log'].map((tab) => {
                            const active = detailsTab === tab
                            return (
                              <button
                                key={tab}
                                onClick={() => setDetailsTab(tab)}
                                className={`relative px-4 py-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                                  active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                {tab}
                                {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-600 rounded-t" />}
                              </button>
                            )
                          })}
                        </div>

                        {/* ASSIGNMENT HISTORY */}
                        {detailsTab === 'Assignment History' && (
                          <div className="animate-in fade-in duration-200 overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned Date</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Returned Date</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {assignments.length === 0 ? (
                                  <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">No assignment history yet</td>
                                  </tr>
                                ) : (
                                  assignments.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">{row.name}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{row.assignedDate}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{row.returnedDate || '-'}</td>
                                      <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${rowStatusCls(row.status)}`}>
                                          {row.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* MAINTENANCE HISTORY */}
                        {detailsTab === 'Maintenance History' && (
                          <div className="animate-in fade-in duration-200 overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Maintenance ID</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service Date</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Technician</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {maintenance.map((row, i) => (
                                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{row.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{row.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{row.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{row.technician}</td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${row.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                                        {row.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* ACTIVITY LOG */}
                        {detailsTab === 'Activity Log' && (
                          <div className="animate-in fade-in duration-200 p-6">
                            <div className="relative pl-4">
                              <span className="absolute left-[15px] top-1 bottom-1 w-0.5 bg-gray-200" />
                              <ul className="space-y-5">
                                {activity.map((act, i) => {
                                  const meta = activityIconMap[act.type] || activityIconMap.create
                                  const Icon = meta.icon
                                  return (
                                    <li key={i} className="relative flex gap-4">
                                      <div className={`relative z-10 w-8 h-8 rounded-full ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className={`w-4 h-4 ${meta.color}`} />
                                      </div>
                                      <div className="flex-1 leading-tight pt-1">
                                        <p className="text-sm text-gray-800">{act.text}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                                      </div>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })()
              ) : activeMenu === 'Assets' ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Asset</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Dashboard <span className="mx-1">/</span> Assets{' '}
                      <span className="mx-1">/</span> Add Asset
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Asset Information Card */}
                      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-5">Asset Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Asset Name */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Asset Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="assetName"
                              value={form.assetName}
                              onChange={handleChange}
                              placeholder="Enter asset name"
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Category */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Category <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                              >
                                <option value="" disabled>Select category</option>
                                <option value="laptop">Laptop</option>
                                <option value="desktop">Desktop</option>
                                <option value="monitor">Monitor</option>
                                <option value="printer">Printer</option>
                                <option value="furniture">Furniture</option>
                                <option value="mobile">Mobile Device</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                          </div>

                          {/* Serial Number */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Serial Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="serialNumber"
                              value={form.serialNumber}
                              onChange={handleChange}
                              placeholder="Enter serial number"
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Model Number */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Model Number
                            </label>
                            <input
                              type="text"
                              name="modelNumber"
                              value={form.modelNumber}
                              onChange={handleChange}
                              placeholder="Enter model number"
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Purchase Date */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Purchase Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              name="purchaseDate"
                              value={form.purchaseDate}
                              onChange={handleChange}
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                            />
                          </div>

                          {/* Purchase Price */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Purchase Price
                            </label>
                            <input
                              type="number"
                              name="purchasePrice"
                              value={form.purchasePrice}
                              onChange={handleChange}
                              placeholder="Enter purchase price"
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Vendor */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Vendor
                            </label>
                            <div className="relative">
                              <select
                                name="vendor"
                                value={form.vendor}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                              >
                                <option value="" disabled>Select vendor</option>
                                <option value="dell">Dell</option>
                                <option value="hp">HP</option>
                                <option value="lenovo">Lenovo</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                          </div>

                          {/* Warranty Expiry */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Warranty Expiry
                            </label>
                            <input
                              type="date"
                              name="warrantyExpiry"
                              value={form.warrantyExpiry}
                              onChange={handleChange}
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                            />
                          </div>

                          {/* Location */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Location
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={form.location}
                              onChange={handleChange}
                              placeholder="Enter location"
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Description */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              Description
                            </label>
                            <textarea
                              name="description"
                              value={form.description}
                              onChange={handleChange}
                              placeholder="Enter description"
                              rows={3}
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Upload Image Card */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-5">Upload Image</h3>

                        <div
                          onDragOver={(e) => {
                            e.preventDefault()
                            setDragActive(true)
                          }}
                          onDragLeave={() => setDragActive(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`flex-1 min-h-[360px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer transition-colors ${
                            dragActive
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/40'
                          }`}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt="Asset preview"
                              className="max-h-full max-w-full object-contain rounded-lg"
                            />
                          ) : (
                            <>
                              <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                                <UploadCloud className="w-8 h-8 text-blue-500" />
                              </div>
                              <p className="text-sm text-gray-700 text-center">
                                Click to <span className="text-blue-600 font-semibold">upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                            </>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files?.[0])}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        Save Asset
                      </button>
                    </div>
                  </form>
                </>
              ) : activeMenu === 'Employees' ? (
                (() => {
                  const filtered = dummyEmployees.filter((e) => {
                    const q = empSearch.toLowerCase()
                    return (
                      e.id.toLowerCase().includes(q) ||
                      e.name.toLowerCase().includes(q) ||
                      e.department.toLowerCase().includes(q) ||
                      e.designation.toLowerCase().includes(q) ||
                      e.email.toLowerCase().includes(q) ||
                      e.phone.includes(q)
                    )
                  })
                  const totalPages = Math.max(1, Math.ceil(filtered.length / EMP_PER_PAGE))
                  const currentPage = Math.min(empPage, totalPages)
                  const startIdx = (currentPage - 1) * EMP_PER_PAGE
                  const pageRows = filtered.slice(startIdx, startIdx + EMP_PER_PAGE)
                  const showFrom = filtered.length === 0 ? 0 : startIdx + 1
                  const showTo = Math.min(startIdx + EMP_PER_PAGE, filtered.length)

                  return (
                    <>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span> Employees
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => alert('Add Employee form would open here')}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                            Add Employee
                          </button>
                          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" />
                            Filters
                          </button>
                        </div>
                      </div>

                      {/* Table Card */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        {/* Search */}
                        <div className="p-5 border-b border-gray-100">
                          <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={empSearch}
                              onChange={(e) => {
                                setEmpSearch(e.target.value)
                                setEmpPage(1)
                              }}
                              placeholder="Search employees..."
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee ID</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {pageRows.length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                                    No employees found
                                  </td>
                                </tr>
                              ) : (
                                pageRows.map((emp) => (
                                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{emp.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{emp.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{emp.department}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{emp.designation}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{emp.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{emp.phone}</td>
                                    <td className="px-6 py-4">
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => alert(`Edit ${emp.name}`)}
                                          title="Edit"
                                          className="w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm"
                                        >
                                          <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => alert(`Assign asset to ${emp.name}`)}
                                          title="Assign"
                                          className="w-8 h-8 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors shadow-sm"
                                        >
                                          <UserPlus className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => {
                                            if (confirm(`Delete ${emp.name}?`)) alert('Deleted (demo)')
                                          }}
                                          title="Delete"
                                          className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 flex-wrap gap-3">
                          <p className="text-sm text-gray-600">
                            Showing {showFrom} to {showTo} of {filtered.length} entries
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEmpPage((p) => Math.max(1, p - 1))}
                              disabled={currentPage === 1}
                              className="w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                              <button
                                key={p}
                                onClick={() => setEmpPage(p)}
                                className={`w-9 h-9 rounded-md text-sm font-semibold flex items-center justify-center transition-colors ${
                                  p === currentPage
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                            <button
                              onClick={() => setEmpPage((p) => Math.min(totalPages, p + 1))}
                              disabled={currentPage === totalPages}
                              className="w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })()
              ) : activeMenu === 'Reports' ? (
                (() => {
                  const categoryData = [
                    { label: 'Laptops', value: 540, color: '#3b82f6' },
                    { label: 'Desktops', value: 320, color: '#22c55e' },
                    { label: 'Printers', value: 150, color: '#f59e0b' },
                    { label: 'SSD', value: 100, color: '#8b5cf6' },
                    { label: 'Peripherals', value: 70, color: '#f97316' },
                    { label: 'Others', value: 70, color: '#ef4444' },
                  ]
                  const statusData = [
                    { label: 'Assigned', value: 945, color: '#22c55e' },
                    { label: 'Available', value: 210, color: '#f59e0b' },
                    { label: 'Maintenance', value: 95, color: '#ef4444' },
                  ]
                  const totalCat = categoryData.reduce((s, d) => s + d.value, 0)
                  const totalStat = statusData.reduce((s, d) => s + d.value, 0)
                  const stats = [
                    { label: 'Total Assets', value: 1250, icon: Monitor, bg: 'bg-blue-100', color: 'text-blue-500' },
                    { label: 'Assigned Assets', value: 945, icon: CheckSquare, bg: 'bg-emerald-100', color: 'text-emerald-500' },
                    { label: 'Available Assets', value: 210, icon: Package, bg: 'bg-amber-100', color: 'text-amber-500' },
                    { label: 'Under Maintenance', value: 95, icon: Wrench, bg: 'bg-red-100', color: 'text-red-500' },
                  ]
                  const activities = [
                    { icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-100', text: 'Dell Laptop (A1001) assigned to John Doe', time: '10 min ago' },
                    { icon: Printer, color: 'text-amber-500', bg: 'bg-amber-50', text: 'HP Printer (A1002) added to inventory', time: '1 hour ago' },
                    { icon: RotateCw, color: 'text-red-500', bg: 'bg-red-100', text: 'Apple MacBook (A1003) returned/exited', time: '2 hours ago' },
                    { icon: Wrench, color: 'text-purple-500', bg: 'bg-purple-100', text: 'Canon Scanner (A1010) sent for maintenance', time: '5 hours ago' },
                    { icon: UserPlus, color: 'text-green-500', bg: 'bg-green-100', text: 'New employee Mary Smith (E1002) added', time: 'Yesterday' },
                  ]

                  return (
                    <div key={reportGenerated} className="animate-in fade-in duration-300">
                      {/* Header */}
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Dashboard <span className="mx-1">/</span> Reports
                        </p>
                      </div>

                      {/* Filter Bar */}
                      <div className="flex items-end gap-4 flex-wrap mb-6">
                        <div className="flex-1 min-w-[600px] bg-white border border-gray-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Select Report</label>
                            <div className="relative">
                              <select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                              >
                                <option>Asset Summary</option>
                                <option>Assignment Report</option>
                                <option>Maintenance Report</option>
                                <option>Vendor Report</option>
                                <option>Depreciation Report</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">From Date</label>
                            <input
                              type="date"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">To Date</label>
                            <input
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => setReportGenerated((n) => n + 1)}
                          className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm h-[58px]"
                        >
                          <FileText className="w-4 h-4" />
                          Generate Report
                        </button>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        {stats.map((s, idx) => {
                          const Icon = s.icon
                          return (
                            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                              <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center`}>
                                <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={2.2} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-0.5">{s.value.toLocaleString()}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Charts Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Assets by Category */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-5">Assets by Category</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <DonutChart data={categoryData} size={180} strokeWidth={32} />
                            </div>
                            <div className="flex-1 space-y-2.5">
                              {categoryData.map((d, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: d.color }} />
                                  <div className="leading-tight">
                                    <div className="font-semibold text-gray-800">{d.label}</div>
                                    <div className="text-xs text-gray-500">
                                      {d.value} ({((d.value / totalCat) * 100).toFixed(1)}%)
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Assets by Status */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-5">Assets by Status</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <DonutChart data={statusData} size={180} strokeWidth={32} />
                            </div>
                            <div className="flex-1 space-y-3">
                              {statusData.map((d, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: d.color }} />
                                  <div className="leading-tight">
                                    <div className="font-semibold text-gray-800">{d.label}</div>
                                    <div className="text-xs text-gray-500">
                                      {d.value} ({((d.value / totalStat) * 100).toFixed(1)}%)
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
                          <h3 className="text-lg font-bold text-gray-900 mb-5">Recent Activity</h3>
                          <div className="flex-1 space-y-4">
                            {activities.map((a, i) => {
                              const Icon = a.icon
                              return (
                                <div key={i} className="flex gap-3">
                                  <div className={`w-9 h-9 rounded-full ${a.bg} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-4 h-4 ${a.color}`} />
                                  </div>
                                  <div className="flex-1 leading-tight">
                                    <p className="text-sm text-gray-800">{a.text}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <button
                            onClick={() => alert('Full report view would open here')}
                            className="w-full mt-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            View Full Report
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })()
              ) : activeMenu === 'Maintenance' ? (
                (() => {
                  const totalPages = Math.max(1, Math.ceil(dummyMaintenance.length / MAINT_PER_PAGE))
                  const currentPage = Math.min(maintPage, totalPages)
                  const startIdx = (currentPage - 1) * MAINT_PER_PAGE
                  const pageRows = dummyMaintenance.slice(startIdx, startIdx + MAINT_PER_PAGE)
                  const showFrom = startIdx + 1
                  const showTo = Math.min(startIdx + MAINT_PER_PAGE, dummyMaintenance.length)

                  const statusBadge = (status) => {
                    if (status === 'Completed')
                      return 'bg-green-100 text-green-700 border border-green-200'
                    if (status === 'In Progress')
                      return 'bg-orange-100 text-orange-700 border border-orange-200'
                    return 'bg-amber-100 text-amber-700 border border-amber-200'
                  }

                  const formatDate = (d) => {
                    const parts = d.split('-')
                    return `${parts[2]}-${parts[1]}-${parts[0]}`
                  }

                  return (
                    <>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Maintenance</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span> Maintenance
                          </p>
                        </div>
                        <button
                          onClick={() => alert('Add Maintenance form would open here')}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add Maintenance
                        </button>
                      </div>

                      {/* Table Card */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Maintenance ID</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset ID</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset Name</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Maintenance Type</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service Date</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Next Due Date</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {pageRows.map((m) => (
                                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{m.id}</td>
                                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{m.assetId}</td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{m.assetName}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{m.type}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(m.serviceDate)}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(m.nextDue)}</td>
                                  <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${statusBadge(m.status)}`}>
                                      {m.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                      <button
                                        onClick={() => alert(`Edit ${m.id}`)}
                                        title="Edit"
                                        className="w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm"
                                      >
                                        <Pencil className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => alert(`Mark ${m.id} as completed`)}
                                        title="Mark Complete"
                                        className="w-8 h-8 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors shadow-sm"
                                      >
                                        <Check className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (confirm(`Delete ${m.id}?`)) alert('Deleted (demo)')
                                        }}
                                        title="Delete"
                                        className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 flex-wrap gap-3">
                          <p className="text-sm text-gray-600">
                            Showing {showFrom} to {showTo} of {dummyMaintenance.length} entries
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setMaintPage((p) => Math.max(1, p - 1))}
                              disabled={currentPage === 1}
                              className="w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                              <button
                                key={p}
                                onClick={() => setMaintPage(p)}
                                className={`w-9 h-9 rounded-md text-sm font-semibold flex items-center justify-center transition-colors ${
                                  p === currentPage
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                            <button
                              onClick={() => setMaintPage((p) => Math.min(totalPages, p + 1))}
                              disabled={currentPage === totalPages}
                              className="w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })()
              ) : activeMenu === 'QR Code Scanner' ? (
                qrState !== 'scanned' ? (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">QR Code Scanner</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Dashboard <span className="mx-1">/</span> QR Code Scanner
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Scanner Box */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-center text-lg font-bold text-gray-900 mb-5">Scan Asset QR Code</h3>

                        <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-gray-900">
                          {/* Background: blurred scene */}
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url('https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=60')",
                              filter: 'blur(10px) brightness(0.45)',
                              transform: 'scale(1.1)',
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

                          {/* Corner brackets */}
                          {qrState !== 'idle' && (
                            <>
                              <span className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-md" />
                              <span className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-md" />
                              <span className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-green-400 rounded-bl-md" />
                              <span className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-green-400 rounded-br-md" />
                              {/* Animated scan line */}
                              <div className="absolute inset-x-10 top-6 bottom-6 overflow-hidden pointer-events-none">
                                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_20px_2px_rgba(74,222,128,0.7)] animate-scan-line" />
                              </div>
                            </>
                          )}

                          {/* Idle state center */}
                          {qrState === 'idle' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
                              <Camera className="w-14 h-14 mb-3 text-white/70" />
                              <p className="text-sm font-medium">Camera is off</p>
                              <p className="text-xs text-white/60 mt-1">Click "Start Camera" to scan</p>
                            </div>
                          )}

                          {/* Scanning state center */}
                          {qrState === 'scanning' && (
                            <div className="absolute inset-x-0 bottom-24 flex flex-col items-center text-green-300">
                              <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-semibold border border-green-400/50">
                                Scanning...
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center mt-5">
                          {qrState === 'idle' ? (
                            <button
                              onClick={startScan}
                              className="flex items-center gap-2 px-7 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                            >
                              <Camera className="w-4 h-4" />
                              Start Camera
                            </button>
                          ) : (
                            <button
                              onClick={stopScan}
                              className="flex items-center gap-2 px-7 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
                            >
                              <Camera className="w-4 h-4" />
                              Stop Camera
                            </button>
                          )}
                        </div>
                      </div>

                      {/* How It Works */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-5">How It Works?</h3>
                        <ol className="space-y-5">
                          {[
                            'Click on "Start Camera" button',
                            'Allow camera access',
                            'Point camera to QR Code',
                            'Asset details will appear automatically',
                          ].map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center">
                                {i + 1}
                              </span>
                              <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                            </li>
                          ))}
                        </ol>

                        {/* Illustration */}
                        <div className="flex-1 flex items-end justify-center mt-6">
                          <div className="relative w-full max-w-xs flex items-center justify-center gap-3">
                            <div className="relative w-32 h-56 rounded-[1.5rem] bg-gradient-to-b from-slate-100 to-slate-200 border-2 border-slate-800 flex items-center justify-center shadow-md">
                              <div className="w-20 h-20 bg-white rounded-md p-1.5 grid grid-cols-5 grid-rows-5 gap-0.5">
                                {Array.from({ length: 25 }).map((_, i) => (
                                  <div key={i} className={`${[0,1,3,4,5,9,15,19,20,21,23,24,7,12,17].includes(i) ? 'bg-slate-900' : 'bg-transparent'} rounded-sm`} />
                                ))}
                              </div>
                              {/* Corner brackets on phone screen */}
                              <span className="absolute top-7 left-7 w-4 h-4 border-t-2 border-l-2 border-green-500" />
                              <span className="absolute top-7 right-7 w-4 h-4 border-t-2 border-r-2 border-green-500" />
                              <span className="absolute bottom-7 left-7 w-4 h-4 border-b-2 border-l-2 border-green-500" />
                              <span className="absolute bottom-7 right-7 w-4 h-4 border-b-2 border-r-2 border-green-500" />
                            </div>
                            <div className="w-28 h-44 rounded-md bg-slate-50 border-2 border-slate-300 flex items-center justify-center">
                              <QrIcon className="w-16 h-16 text-slate-700" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Scanned Result */
                  (() => {
                    const scanned = dummyAssets[scannedAssetIdx]
                    const statusStyle =
                      scanned.status === 'Assigned'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : scanned.status === 'Available'
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : 'bg-red-100 text-red-700 border-red-200'
                    return (
                      <div className="animate-in fade-in duration-500">
                        {/* Success Header */}
                        <div className="flex flex-col items-center text-center mb-6">
                          <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center mb-3">
                            <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={2.5} />
                          </div>
                          <h2 className="text-2xl font-bold text-green-600">QR Code Scanned Successfully!</h2>
                          <p className="text-sm text-gray-600 mt-1">
                            Asset ID: <span className="font-bold text-gray-900">{scanned.id}</span>
                          </p>
                        </div>

                        {/* Asset Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden p-4 min-h-[260px]">
                            <img src={scanned.image} alt={scanned.name} className="max-h-[260px] object-contain" />
                          </div>
                          <div className="space-y-4">
                            {[
                              ['Asset Name', scanned.name],
                              ['Category', scanned.category],
                              ['Serial Number', scanned.serial],
                            ].map(([k, v]) => (
                              <div key={k} className="grid grid-cols-2 gap-2">
                                <span className="text-sm text-gray-500">{k}</span>
                                <span className="text-sm font-semibold text-gray-900">{v}</span>
                              </div>
                            ))}
                            <div className="grid grid-cols-2 gap-2 items-center">
                              <span className="text-sm text-gray-500">Status</span>
                              <span>
                                <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold border ${statusStyle}`}>
                                  {scanned.status}
                                </span>
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-sm text-gray-500">Assigned To</span>
                              <span className="text-sm font-semibold text-gray-900">{scanned.assignedTo}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-sm text-gray-500">Location</span>
                              <span className="text-sm font-semibold text-gray-900">{scanned.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                          <button
                            onClick={() => alert(`View details of ${scanned.id}`)}
                            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => alert('Assign asset')}
                            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
                          >
                            <UserPlus className="w-4 h-4" />
                            Assign Asset
                          </button>
                          <button
                            onClick={() => alert('Return asset')}
                            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
                          >
                            <RotateCw className="w-4 h-4" />
                            Return Asset
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenu('Maintenance')
                              resetScan()
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
                          >
                            <Wrench className="w-4 h-4" />
                            Maintenance
                          </button>
                        </div>

                        {/* Scan Again */}
                        <div className="flex justify-center mt-6">
                          <button
                            onClick={resetScan}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <Camera className="w-4 h-4" />
                            Scan Another QR Code
                          </button>
                        </div>
                      </div>
                    )
                  })()
                )
              ) : activeMenu === 'Settings' ? (
                (() => {
                  const tabs = [
                    { name: 'General Settings', icon: Settings },
                    { name: 'Email Settings', icon: AtSign },
                    { name: 'Notification Settings', icon: BellRing },
                    { name: 'Backup & Restore', icon: HardDrive },
                    { name: 'System Information', icon: Info },
                  ]

                  const handleSave = () => {
                    setSavedToast(true)
                    setTimeout(() => setSavedToast(false), 2200)
                  }

                  const inputCls = 'w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  const labelCls = 'block text-sm font-semibold text-gray-800 mb-1.5'

                  const Toggle = ({ checked, onChange }) => (
                    <button
                      type="button"
                      onClick={() => onChange(!checked)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  )

                  return (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Dashboard <span className="mx-1">/</span> Settings
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[640px]">
                        {/* Left tab nav */}
                        <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 p-5">
                          <h3 className="text-lg font-bold text-gray-900 mb-5">Settings</h3>
                          <nav className="space-y-1">
                            {tabs.map((t) => {
                              const Icon = t.icon
                              const isActive = settingsTab === t.name
                              return (
                                <button
                                  key={t.name}
                                  onClick={() => setSettingsTab(t.name)}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                                    isActive
                                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                  {t.name}
                                </button>
                              )
                            })}
                          </nav>
                        </aside>

                        {/* Right content */}
                        <div className="flex-1 p-6 md:p-8 relative">
                          {savedToast && (
                            <div className="absolute top-4 right-4 z-20 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
                              <Check className="w-4 h-4" />
                              Settings saved successfully!
                            </div>
                          )}

                          {/* GENERAL SETTINGS */}
                          {settingsTab === 'General Settings' && (
                            <div className="animate-in fade-in duration-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-6">General Settings</h3>
                              <div className="space-y-5 max-w-3xl">
                                <div>
                                  <label className={labelCls}>Company Name</label>
                                  <input type="text" value={generalSettings.companyName} onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                  <label className={labelCls}>Address</label>
                                  <input type="text" value={generalSettings.address} onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })} className={inputCls} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className={labelCls}>Phone Number</label>
                                    <input type="text" value={generalSettings.phone} onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })} className={inputCls} />
                                  </div>
                                  <div>
                                    <label className={labelCls}>Email</label>
                                    <input type="email" value={generalSettings.email} onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })} className={inputCls} />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className={labelCls}>Currency</label>
                                    <div className="relative">
                                      <select value={generalSettings.currency} onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })} className={`${inputCls} appearance-none bg-white pr-10`}>
                                        <option>INR (₹)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>JPY (¥)</option>
                                      </select>
                                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                  </div>
                                  <div>
                                    <label className={labelCls}>Date format</label>
                                    <div className="relative">
                                      <select value={generalSettings.dateFormat} onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })} className={`${inputCls} appearance-none bg-white pr-10`}>
                                        <option>dd-mm-yyyy</option>
                                        <option>mm-dd-yyyy</option>
                                        <option>yyyy-mm-dd</option>
                                        <option>dd/mm/yyyy</option>
                                      </select>
                                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                                <div className="md:max-w-[calc(50%-10px)]">
                                  <label className={labelCls}>Time Zone</label>
                                  <div className="relative">
                                    <select value={generalSettings.timeZone} onChange={(e) => setGeneralSettings({ ...generalSettings, timeZone: e.target.value })} className={`${inputCls} appearance-none bg-white pr-10`}>
                                      <option>(GMT+05:30) Asia/Kolkata</option>
                                      <option>(GMT+00:00) UTC</option>
                                      <option>(GMT-05:00) America/New_York</option>
                                      <option>(GMT-08:00) America/Los_Angeles</option>
                                      <option>(GMT+01:00) Europe/London</option>
                                      <option>(GMT+09:00) Asia/Tokyo</option>
                                      <option>(GMT+08:00) Asia/Singapore</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* EMAIL SETTINGS */}
                          {settingsTab === 'Email Settings' && (
                            <div className="animate-in fade-in duration-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-6">Email Settings</h3>
                              <div className="space-y-5 max-w-3xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className={labelCls}>SMTP Host</label>
                                    <input type="text" value={emailSettings.smtpHost} onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })} className={inputCls} />
                                  </div>
                                  <div>
                                    <label className={labelCls}>SMTP Port</label>
                                    <input type="text" value={emailSettings.smtpPort} onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })} className={inputCls} />
                                  </div>
                                </div>
                                <div>
                                  <label className={labelCls}>Username</label>
                                  <input type="text" value={emailSettings.username} onChange={(e) => setEmailSettings({ ...emailSettings, username: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                  <label className={labelCls}>Password</label>
                                  <input type="password" placeholder="••••••••" value={emailSettings.password} onChange={(e) => setEmailSettings({ ...emailSettings, password: e.target.value })} className={inputCls} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className={labelCls}>From Name</label>
                                    <input type="text" value={emailSettings.fromName} onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })} className={inputCls} />
                                  </div>
                                  <div>
                                    <label className={labelCls}>Encryption</label>
                                    <div className="relative">
                                      <select value={emailSettings.encryption} onChange={(e) => setEmailSettings({ ...emailSettings, encryption: e.target.value })} className={`${inputCls} appearance-none bg-white pr-10`}>
                                        <option>TLS</option>
                                        <option>SSL</option>
                                        <option>None</option>
                                      </select>
                                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                                <button onClick={() => alert('Test email sent to ' + emailSettings.username)} className="px-5 py-2 rounded-lg text-sm font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors">
                                  Send Test Email
                                </button>
                              </div>
                            </div>
                          )}

                          {/* NOTIFICATION SETTINGS */}
                          {settingsTab === 'Notification Settings' && (
                            <div className="animate-in fade-in duration-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h3>
                              <div className="space-y-7 max-w-3xl">
                                <div>
                                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Channels</h4>
                                  <div className="space-y-3">
                                    {[
                                      { key: 'emailNotif', label: 'Email Notifications', desc: 'Receive notifications via email' },
                                      { key: 'pushNotif', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                                      { key: 'smsNotif', label: 'SMS Notifications', desc: 'Receive notifications via SMS (charges may apply)' },
                                    ].map((opt) => (
                                      <div key={opt.key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                        <div>
                                          <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                                          <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                                        </div>
                                        <Toggle checked={notifSettings[opt.key]} onChange={(v) => setNotifSettings({ ...notifSettings, [opt.key]: v })} />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Event Types</h4>
                                  <div className="space-y-3">
                                    {[
                                      { key: 'assetAssignment', label: 'Asset Assignment', desc: 'When an asset is assigned or returned' },
                                      { key: 'maintenanceAlerts', label: 'Maintenance Alerts', desc: 'Upcoming and overdue maintenance' },
                                      { key: 'warrantyExpiry', label: 'Warranty Expiry', desc: 'Warranty due in 30 days' },
                                      { key: 'weeklyReport', label: 'Weekly Summary Report', desc: 'A weekly digest every Monday' },
                                    ].map((opt) => (
                                      <div key={opt.key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                        <div>
                                          <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                                          <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                                        </div>
                                        <Toggle checked={notifSettings[opt.key]} onChange={(v) => setNotifSettings({ ...notifSettings, [opt.key]: v })} />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* BACKUP & RESTORE */}
                          {settingsTab === 'Backup & Restore' && (
                            <div className="animate-in fade-in duration-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-6">Backup & Restore</h3>
                              <div className="space-y-5 max-w-3xl">
                                <div className="p-5 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                                  <Database className="w-5 h-5 text-blue-600 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">Last Backup</p>
                                    <p className="text-xs text-gray-600 mt-1">June 11, 2025 at 02:30 AM &middot; 12.4 MB</p>
                                  </div>
                                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-md border border-green-200">Healthy</span>
                                </div>

                                <div className="border border-gray-200 rounded-xl p-5">
                                  <h4 className="text-sm font-bold text-gray-900 mb-1">Create Backup</h4>
                                  <p className="text-xs text-gray-500 mb-4">Generate a full backup of your AMS data right now.</p>
                                  <button onClick={() => alert('Backup created successfully (demo)')} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                                    <Database className="w-4 h-4" />
                                    Backup Now
                                  </button>
                                </div>

                                <div className="border border-gray-200 rounded-xl p-5">
                                  <h4 className="text-sm font-bold text-gray-900 mb-1">Restore from Backup</h4>
                                  <p className="text-xs text-gray-500 mb-4">Upload a backup file to restore your data. This will overwrite current data.</p>
                                  <div className="flex items-center gap-3">
                                    <input type="file" accept=".sql,.zip,.bak" className="text-sm" />
                                    <button onClick={() => alert('Restore initiated (demo)')} className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors">
                                      Restore
                                    </button>
                                  </div>
                                </div>

                                <div className="border border-gray-200 rounded-xl p-5">
                                  <h4 className="text-sm font-bold text-gray-900 mb-1">Automatic Backups</h4>
                                  <p className="text-xs text-gray-500 mb-4">Schedule automatic backups every day at 2:30 AM.</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Enable daily backups</span>
                                    <Toggle checked={true} onChange={() => {}} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* SYSTEM INFORMATION */}
                          {settingsTab === 'System Information' && (
                            <div className="animate-in fade-in duration-200">
                              <h3 className="text-xl font-bold text-gray-900 mb-6">System Information</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
                                {[
                                  { label: 'App Version', value: 'AMS v2.4.1', icon: Info, color: 'text-blue-600 bg-blue-50' },
                                  { label: 'Environment', value: 'Production', icon: Server, color: 'text-green-600 bg-green-50' },
                                  { label: 'Database', value: 'MongoDB 7.0.5', icon: Database, color: 'text-emerald-600 bg-emerald-50' },
                                  { label: 'Server Uptime', value: '42 days, 7h 18m', icon: Server, color: 'text-purple-600 bg-purple-50' },
                                  { label: 'Storage Used', value: '4.2 GB / 50 GB', icon: HardDrive, color: 'text-amber-600 bg-amber-50' },
                                  { label: 'Total Assets', value: '1,250', icon: Boxes, color: 'text-indigo-600 bg-indigo-50' },
                                  { label: 'Total Users', value: '28', icon: Users, color: 'text-rose-600 bg-rose-50' },
                                  { label: 'License', value: 'Enterprise (valid till Dec 2026)', icon: Shield, color: 'text-cyan-600 bg-cyan-50' },
                                ].map((info) => {
                                  const Icon = info.icon
                                  return (
                                    <div key={info.label} className="p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-4">
                                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${info.color}`}>
                                        <Icon className="w-5 h-5" />
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">{info.label}</p>
                                        <p className="text-sm font-bold text-gray-900 mt-0.5">{info.value}</p>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                              <button onClick={() => alert('Checking for updates... You are on the latest version.')} className="mt-6 px-5 py-2 rounded-lg text-sm font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors">
                                Check for Updates
                              </button>
                            </div>
                          )}

                          {/* Save Changes button */}
                          {settingsTab !== 'System Information' && settingsTab !== 'Backup & Restore' && (
                            <div className="flex justify-end mt-8 pt-5 border-t border-gray-100">
                              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                                <Save className="w-4 h-4" />
                                Save Changes
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )
                })()
              ) : activeMenu === 'Dashboard' ? (
                (() => {
                  const stats = [
                    { label: 'Total Assets', value: 1245, percentLabel: 'View all assets', sub: 'arrow', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-100', trend: 5.2, trendUp: true, onClick: () => setActiveMenu('Assets') },
                    { label: 'Assigned Assets', value: 945, percentLabel: '75.90% of total', sub: 'percent', icon: CheckSquare, color: 'text-emerald-500', bg: 'bg-emerald-100', trend: 3.4, trendUp: true, percentColor: 'text-emerald-600' },
                    { label: 'Available Assets', value: 210, percentLabel: '16.87% of total', sub: 'percent', icon: Package, color: 'text-amber-500', bg: 'bg-amber-100', trend: 1.1, trendUp: false, percentColor: 'text-amber-600' },
                    { label: 'Under Maintenance', value: 90, percentLabel: '7.23% of total', sub: 'percent', icon: Wrench, color: 'text-red-500', bg: 'bg-red-100', trend: 0.8, trendUp: true, percentColor: 'text-red-600' },
                  ]
                  const totalCatVal = 540 + 320 + 150 + 120 + 115
                  const categoryData = [
                    { label: 'Laptops', value: 540, color: '#3b82f6' },
                    { label: 'Desktops', value: 320, color: '#22c55e' },
                    { label: 'Printers', value: 150, color: '#f59e0b' },
                    { label: 'Monitors', value: 120, color: '#8b5cf6' },
                    { label: 'Others', value: 115, color: '#ef4444' },
                  ]
                  const statusData = [
                    { label: 'Assigned', value: 945, color: '#22c55e' },
                    { label: 'Available', value: 210, color: '#f59e0b' },
                    { label: 'Maintenance', value: 90, color: '#ef4444' },
                  ]
                  const recentActivity = [
                    { icon: User, bg: 'bg-blue-100', color: 'text-blue-500', text: 'Dell Laptop (A1001) assigned to John Doe', time: '2 minutes ago' },
                    { icon: Printer, bg: 'bg-emerald-100', color: 'text-emerald-500', text: 'HP Printer (P2002) added to inventory', time: '15 minutes ago' },
                    { icon: RotateCw, bg: 'bg-cyan-100', color: 'text-cyan-500', text: 'Apple MacBook (A1003) returned by Mary Smith', time: '1 hour ago' },
                    { icon: Wrench, bg: 'bg-red-100', color: 'text-red-500', text: 'Logitech Mouse (A1004) under maintenance', time: '2 hours ago' },
                    { icon: FolderKanban, bg: 'bg-amber-100', color: 'text-amber-500', text: "New asset category 'Projectors' added", time: '3 hours ago' },
                  ]
                  const recentAssets = [
                    { id: 'A1001', name: 'Dell Latitude 5440', category: 'Laptop', serial: 'DL5440X123456', status: 'Assigned', assignedTo: 'John Doe' },
                    { id: 'P2002', name: 'HP LaserJet Pro', category: 'Printer', serial: 'HPLJ123789', status: 'Available', assignedTo: '-' },
                    { id: 'A1003', name: 'Apple MacBook Air', category: 'Laptop', serial: 'MBA2023X456', status: 'Assigned', assignedTo: 'Mary Smith' },
                    { id: 'M3001', name: 'Samsung 24" Monitor', category: 'Monitor', serial: 'SM24F450X789', status: 'Maintenance', assignedTo: '-' },
                    { id: 'A1004', name: 'Logitech Wireless Mouse', category: 'Accessory', serial: 'LOGMOU123456', status: 'Available', assignedTo: '-' },
                  ]
                  const monthlyData = [
                    { month: 'Jan', value: 85 }, { month: 'Feb', value: 110 },
                    { month: 'Mar', value: 95 }, { month: 'Apr', value: 140 },
                    { month: 'May', value: 165 }, { month: 'Jun', value: 130 },
                    { month: 'Jul', value: 175 }, { month: 'Aug', value: 155 },
                    { month: 'Sep', value: 195 }, { month: 'Oct', value: 180 },
                    { month: 'Nov', value: 210 }, { month: 'Dec', value: 245 },
                  ]
                  const maxMonth = Math.max(...monthlyData.map(m => m.value))
                  const alerts = [
                    { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', title: '12 warranties expiring this month', desc: 'Review warranty details to avoid disruption' },
                    { icon: Wrench, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', title: '5 maintenance tasks overdue', desc: 'Action required to keep assets operational' },
                    { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', title: '8 assets pending assignment', desc: 'New hires waiting for equipment allocation' },
                  ]
                  const topDepts = [
                    { name: 'IT Department', count: 425, percent: 34 },
                    { name: 'Finance', count: 215, percent: 17 },
                    { name: 'Marketing', count: 180, percent: 14 },
                    { name: 'HR Department', count: 145, percent: 12 },
                    { name: 'Sales', count: 130, percent: 10 },
                  ]
                  const statusBadgeCls = (s) =>
                    s === 'Assigned' ? 'bg-green-100 text-green-700 border-green-200'
                    : s === 'Available' ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-red-100 text-red-700 border-red-200'

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                          <p className="text-sm text-gray-500 mt-1">Welcome back, Admin User!</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <button
                            onClick={() => setActiveMenu('Assets')}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:-translate-y-0.5 transform"
                          >
                            <Plus className="w-4 h-4" />
                            Add Asset
                          </button>
                          <button
                            onClick={() => { setActiveMenu('QR Code Scanner'); resetScan() }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm hover:-translate-y-0.5 transform"
                          >
                            <QrIcon className="w-4 h-4" />
                            Scan QR Code
                          </button>
                          <button
                            onClick={() => setActiveMenu('Reports')}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm hover:-translate-y-0.5 transform"
                          >
                            <FileText className="w-4 h-4" />
                            Generate Report
                          </button>
                        </div>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((s, idx) => {
                          const Icon = s.icon
                          const Trend = s.trendUp ? TrendingUp : TrendingDown
                          return (
                            <div
                              key={idx}
                              onClick={s.onClick}
                              className={`bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all ${s.onClick ? 'cursor-pointer' : ''}`}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center`}>
                                  <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={2.2} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold ${s.trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded-md`}>
                                  <Trend className="w-3 h-3" />
                                  {s.trend}%
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                              <p className="text-3xl font-bold text-gray-900 mt-1">{s.value.toLocaleString()}</p>
                              {s.sub === 'arrow' ? (
                                <button onClick={(e) => { e.stopPropagation(); s.onClick?.() }} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-3">
                                  {s.percentLabel}
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <p className={`text-sm font-semibold ${s.percentColor} mt-3`}>{s.percentLabel}</p>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* Alerts strip */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {alerts.map((a, i) => {
                          const Icon = a.icon
                          return (
                            <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${a.bg} ${a.border}`}>
                              <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 ${a.color}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                                <p className="text-xs text-gray-600 mt-0.5">{a.desc}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Middle row: Category / Activity / Status */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Assets by Category</h3>
                          <div className="flex items-center gap-4">
                            <DonutChart data={categoryData} size={180} strokeWidth={34} />
                            <div className="flex-1 space-y-2.5">
                              {categoryData.map((d, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: d.color }} />
                                  <div className="leading-tight">
                                    <div className="font-semibold text-gray-800">{d.label}</div>
                                    <div className="text-xs text-gray-500">{d.value} ({((d.value / totalCatVal) * 100).toFixed(2)}%)</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                          <div className="flex-1 space-y-4">
                            {recentActivity.map((a, i) => {
                              const Icon = a.icon
                              return (
                                <div key={i} className="flex gap-3">
                                  <div className={`w-9 h-9 rounded-full ${a.bg} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-4 h-4 ${a.color}`} />
                                  </div>
                                  <div className="flex-1 leading-tight">
                                    <p className="text-sm text-gray-800">{a.text}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <button onClick={() => setActiveMenu('Notifications')} className="flex items-center justify-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-4">
                            View all activity
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Assets by Status</h3>
                          <div className="flex items-center gap-4">
                            <DonutChart data={statusData} size={180} strokeWidth={34} />
                            <div className="flex-1 space-y-3">
                              {statusData.map((d, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: d.color }} />
                                  <div className="leading-tight">
                                    <div className="font-semibold text-gray-800">{d.label}</div>
                                    <div className="text-xs text-gray-500">{d.value} ({((d.value / 1245) * 100).toFixed(2)}%)</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monthly trend + top departments */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-5">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">Asset Additions — Last 12 Months</h3>
                              <p className="text-xs text-gray-500 mt-0.5">Total acquisitions over time</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                              <TrendingUp className="w-3.5 h-3.5" />
                              +18.2% YoY
                            </div>
                          </div>
                          <div className="flex items-end justify-between gap-2 h-48">
                            {monthlyData.map((m, i) => {
                              const h = (m.value / maxMonth) * 100
                              return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                  <div className="relative w-full flex items-end h-full">
                                    <div
                                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                                      style={{ height: `${h}%`, minHeight: '8px' }}
                                      title={`${m.month}: ${m.value} assets`}
                                    />
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-200 whitespace-nowrap">
                                      {m.value}
                                    </span>
                                  </div>
                                  <span className="text-[11px] font-medium text-gray-500">{m.month}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-5">Top Departments</h3>
                          <div className="space-y-4">
                            {topDepts.map((d, i) => (
                              <div key={i}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-semibold text-gray-800">{d.name}</span>
                                  </div>
                                  <span className="text-sm font-bold text-gray-900">{d.count}</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700"
                                    style={{ width: `${d.percent * 2.5}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Recent Assets table */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                          <h3 className="text-lg font-bold text-gray-900">Recent Assets</h3>
                          <button onClick={() => setActiveMenu('Assets')} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
                            View all assets
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset ID</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset Name</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Serial Number</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                                <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {recentAssets.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{a.id}</td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{a.name}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{a.category}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{a.serial}</td>
                                  <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${statusBadgeCls(a.status)}`}>
                                      {a.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{a.assignedTo}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                      <button onClick={() => alert(`Edit ${a.id}`)} title="Edit" className="w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                        <Pencil className="w-4 h-4" />
                                      </button>
                                      <button onClick={() => { setActiveMenu('QR Code Scanner'); resetScan() }} title="View QR" className="w-8 h-8 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                        <QrIcon className="w-4 h-4" />
                                      </button>
                                      <button onClick={() => { if (confirm(`Delete ${a.id}?`)) alert('Deleted (demo)') }} title="Delete" className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                })()
              ) : activeMenu === 'Categories' ? (
                (() => {
                  const categoryIconMap = {
                    'Laptop': { icon: Laptop, color: 'text-blue-600', bg: 'bg-blue-100' },
                    'Desktop': { icon: Monitor, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                    'Monitor': { icon: Monitor, color: 'text-violet-600', bg: 'bg-violet-100' },
                    'Printer': { icon: Printer, color: 'text-amber-600', bg: 'bg-amber-100' },
                    'Mobile Device': { icon: Smartphone, color: 'text-pink-600', bg: 'bg-pink-100' },
                    'Tablet': { icon: Tablet, color: 'text-cyan-600', bg: 'bg-cyan-100' },
                    'Camera': { icon: Camera, color: 'text-rose-600', bg: 'bg-rose-100' },
                    'Projector': { icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                    'Peripheral': { icon: Mouse, color: 'text-orange-600', bg: 'bg-orange-100' },
                  }
                  const counts = {}
                  dummyAssets.forEach((a) => { counts[a.category] = (counts[a.category] || 0) + 1 })
                  const categories = Object.entries(counts)
                    .map(([name, count]) => ({ name, count, ...(categoryIconMap[name] || { icon: Package, color: 'text-gray-600', bg: 'bg-gray-100' }) }))
                    .sort((a, b) => b.count - a.count)

                  const filtered = dummyAssets.filter((a) => {
                    const inCat = selectedCategory === 'All' || a.category === selectedCategory
                    const q = catSearch.toLowerCase()
                    const inSearch = !q || a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.serial.toLowerCase().includes(q)
                    return inCat && inSearch
                  })

                  const statusBadgeCls = (s) =>
                    s === 'Assigned' ? 'bg-green-100 text-green-700 border-green-200'
                    : s === 'Available' ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-red-100 text-red-700 border-red-200'

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span> Categories
                          </p>
                        </div>
                        <button
                          onClick={() => alert('Add Category form would open here')}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add Category
                        </button>
                      </div>

                      {/* Category Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <button
                          onClick={() => setSelectedCategory('All')}
                          className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-md hover:-translate-y-0.5 transform ${
                            selectedCategory === 'All'
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                            <Boxes className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-sm font-semibold text-gray-900">All Categories</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{dummyAssets.length}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Total Assets</p>
                        </button>

                        {categories.map((c) => {
                          const Icon = c.icon
                          const isActive = selectedCategory === c.name
                          return (
                            <button
                              key={c.name}
                              onClick={() => setSelectedCategory(c.name)}
                              className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-md hover:-translate-y-0.5 transform ${
                                isActive
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-gray-200 bg-white hover:border-blue-300'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-full ${c.bg} flex items-center justify-center mb-3`}>
                                <Icon className={`w-6 h-6 ${c.color}`} />
                              </div>
                              <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                              <p className="text-2xl font-bold text-gray-900 mt-1">{c.count}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{c.count === 1 ? 'asset' : 'assets'}</p>
                            </button>
                          )
                        })}
                      </div>

                      {/* Asset Grid */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-gray-900">
                              {selectedCategory === 'All' ? 'All Assets' : `${selectedCategory}s`}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              {filtered.length}
                            </span>
                          </div>
                          <div className="relative w-full max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={catSearch}
                              onChange={(e) => setCatSearch(e.target.value)}
                              placeholder="Search assets..."
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>

                        {filtered.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-sm font-semibold text-gray-700">No assets found</p>
                            <p className="text-xs text-gray-500 mt-1">Try changing the category or search query</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                            {filtered.map((a) => {
                              const meta = categoryIconMap[a.category] || { icon: Package, color: 'text-gray-600', bg: 'bg-gray-100' }
                              const Icon = meta.icon
                              return (
                                <div
                                  key={a.id}
                                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group bg-white"
                                  onClick={() => { setSelectedAssetId(a.id); setDetailsTab('Assignment History') }}
                                >
                                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
                                    <img
                                      src={a.image}
                                      alt={a.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="p-4">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${meta.bg} ${meta.color}`}>
                                        <Icon className="w-3 h-3" />
                                        {a.category}
                                      </div>
                                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadgeCls(a.status)}`}>
                                        {a.status}
                                      </span>
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1" title={a.name}>{a.name}</h4>
                                    <p className="text-xs font-semibold text-blue-600 mt-0.5">{a.id}</p>
                                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                                      <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Location</span>
                                        <span className="text-gray-800 font-medium truncate ml-2 max-w-[60%] text-right">{a.location}</span>
                                      </div>
                                      <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Assigned</span>
                                        <span className="text-gray-800 font-medium truncate ml-2 max-w-[60%] text-right">{a.assignedTo}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })()
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[600px] text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <LayoutDashboard className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeMenu}</h2>
                  <p className="text-sm text-gray-500 max-w-md">
                    This is the <span className="font-semibold">{activeMenu}</span> section. Content for this module is coming soon.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
