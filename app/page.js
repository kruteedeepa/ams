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
} from 'lucide-react'

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
