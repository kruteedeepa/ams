'use client'

import { useState, useRef } from 'react'
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
  Calendar,
  UploadCloud,
  User,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Boxes, label: 'Assets', active: true },
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Module Header */}
      <div className="mb-6 border-l-4 border-blue-600 pl-4">
        <p className="text-sm font-semibold tracking-wider text-blue-600">
          SYSTEM INTERFACE MODULE 02 OF 09
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">Add New Asset Form</h1>
      </div>

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
                return (
                  <button
                    key={idx}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-blue-600 text-white'
                        : 'text-white/85 hover:bg-white/10'
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
                <button className="p-1.5 hover:bg-gray-100 rounded-md">
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
                <button className="relative p-1.5 hover:bg-gray-100 rounded-full">
                  <Bell className="w-5 h-5 text-gray-700" />
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="flex items-center gap-2.5 cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-gray-900">Admin User</div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="flex-1 px-8 py-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Asset</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Dashboard <span className="mx-1">/</span> Assets <span className="mx-1">/</span> Add Asset
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
                        <div className="relative">
                          <input
                            type="date"
                            name="purchaseDate"
                            value={form.purchaseDate}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                          />
                        </div>
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
                        <div className="relative">
                          <input
                            type="date"
                            name="warrantyExpiry"
                            value={form.warrantyExpiry}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                          />
                        </div>
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
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
