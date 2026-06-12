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
} from 'lucide-react'

const dummyAssets = [
  { id: 'A1001', name: 'Dell Latitude 5440', category: 'Laptop', manufacturer: 'Dell Latitude 5440', serial: 'DLS44OY133456', model: 'Latitude 5440', purchaseDate: '2024-02-15', purchasePrice: 75000, vendor: 'Dell India Pvt. Ltd.', warranty: '2026-02-15', location: 'IT Department', description: 'Dell Latitude 5440 Laptop', status: 'Assigned', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80' },
  { id: 'A1002', name: 'HP LaserJet Pro', category: 'Printer', manufacturer: 'HP LaserJet Pro M404', serial: 'HPLJ778899', model: 'M404dn', purchaseDate: '2023-11-05', purchasePrice: 22000, vendor: 'HP India', warranty: '2025-11-05', location: 'Reception', description: 'Office monochrome laser printer', status: 'Available', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80' },
  { id: 'A1003', name: 'Apple MacBook Pro', category: 'Laptop', manufacturer: 'Apple MacBook Pro 14"', serial: 'APMBP223344', model: 'M2 Pro 14"', purchaseDate: '2024-01-20', purchasePrice: 215000, vendor: 'Apple India', warranty: '2026-01-20', location: 'Design Team', description: 'MacBook Pro for designers', status: 'Assigned', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80' },
  { id: 'A1004', name: 'Samsung 24" Monitor', category: 'Monitor', manufacturer: 'Samsung S24R350', serial: 'SMS24R998877', model: 'S24R350', purchaseDate: '2023-08-12', purchasePrice: 14500, vendor: 'Samsung India', warranty: '2025-08-12', location: 'IT Department', description: '24-inch Full HD IPS monitor', status: 'Maintenance', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80' },
  { id: 'A1005', name: 'Lenovo ThinkPad E14', category: 'Laptop', manufacturer: 'Lenovo ThinkPad E14', serial: 'LNTP445566', model: 'E14 Gen 4', purchaseDate: '2024-03-10', purchasePrice: 68000, vendor: 'Lenovo India', warranty: '2026-03-10', location: 'Finance', description: 'Business laptop for finance team', status: 'Assigned', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80' },
  { id: 'A1006', name: 'Epson Projector', category: 'Projector', manufacturer: 'Epson EB-X51', serial: 'EPPRJ112233', model: 'EB-X51', purchaseDate: '2023-06-18', purchasePrice: 42000, vendor: 'Epson India', warranty: '2025-06-18', location: 'Conference Room', description: 'XGA conference room projector', status: 'Available', image: 'https://images.unsplash.com/photo-1626218174358-7769486beb39?w=600&q=80' },
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

  // Assets view state: 'list' | 'add' | 'details'
  const [assetView, setAssetView] = useState('list')
  const [selectedAssetId, setSelectedAssetId] = useState(null)
  const [detailsTab, setDetailsTab] = useState('Assignment History')

  // QR Scanner state: 'idle' | 'scanning' | 'scanned'
  const [qrState, setQrState] = useState('idle')
  const qrTimerRef = useRef(null)

  const startScan = () => {
    setQrState('scanning')
    qrTimerRef.current = setTimeout(() => {
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
              {activeMenu === 'Assets' ? (
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
                    const scanned = dummyAssets[0] // A1001 Dell Latitude
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
                                <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                  {scanned.status}
                                </span>
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-sm text-gray-500">Assigned To</span>
                              <span className="text-sm font-semibold text-gray-900">John Doe</span>
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
              ) : (
                /* Placeholder for other menu items */
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
