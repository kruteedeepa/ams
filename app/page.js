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
  Phone,
  MessageCircle,
  BookOpen,
  PlayCircle,
  Send,
  LifeBuoy,
  ExternalLink,
  Globe,
  Sparkles,
  Headphones,
  Zap,
  Lock,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

const initialUsers = [
  { id: 'U001', name: 'Admin User', email: 'admin@ams.com', phone: '+91 98765 00001', role: 'Super Admin', department: 'IT Department', status: 'Active', lastLogin: '2 minutes ago', twoFactor: true, joined: '01-01-2022', avatarColor: 'bg-purple-600' },
  { id: 'U002', name: 'Rohan Verma', email: 'rohan.verma@ams.com', phone: '+91 98765 00002', role: 'Admin', department: 'IT Department', status: 'Active', lastLogin: '1 hour ago', twoFactor: true, joined: '15-03-2022', avatarColor: 'bg-blue-600' },
  { id: 'U003', name: 'Priya Nair', email: 'priya.nair@ams.com', phone: '+91 98765 00003', role: 'Manager', department: 'HR Department', status: 'Active', lastLogin: '3 hours ago', twoFactor: true, joined: '20-05-2022', avatarColor: 'bg-emerald-600' },
  { id: 'U004', name: 'Karthik Reddy', email: 'karthik.reddy@ams.com', phone: '+91 98765 00004', role: 'Manager', department: 'Finance', status: 'Active', lastLogin: 'Yesterday', twoFactor: false, joined: '10-07-2022', avatarColor: 'bg-amber-600' },
  { id: 'U005', name: 'Anjali Singh', email: 'anjali.singh@ams.com', phone: '+91 98765 00005', role: 'Manager', department: 'Operations', status: 'Active', lastLogin: '2 days ago', twoFactor: true, joined: '05-09-2022', avatarColor: 'bg-rose-600' },
  { id: 'U006', name: 'Vikram Iyer', email: 'vikram.iyer@ams.com', phone: '+91 98765 00006', role: 'Employee', department: 'IT Department', status: 'Active', lastLogin: '5 hours ago', twoFactor: true, joined: '12-11-2022', avatarColor: 'bg-cyan-600' },
  { id: 'U007', name: 'Neha Kapoor', email: 'neha.kapoor@ams.com', phone: '+91 98765 00007', role: 'Employee', department: 'Marketing', status: 'Active', lastLogin: '4 hours ago', twoFactor: false, joined: '01-02-2023', avatarColor: 'bg-indigo-600' },
  { id: 'U008', name: 'Sandeep Joshi', email: 'sandeep.joshi@ams.com', phone: '+91 98765 00008', role: 'IT Support', department: 'IT Department', status: 'Active', lastLogin: '30 minutes ago', twoFactor: true, joined: '18-04-2023', avatarColor: 'bg-orange-600' },
  { id: 'U009', name: 'Meera Patel', email: 'meera.patel@ams.com', phone: '+91 98765 00009', role: 'Viewer', department: 'Audit', status: 'Active', lastLogin: '1 week ago', twoFactor: true, joined: '25-06-2023', avatarColor: 'bg-teal-600' },
  { id: 'U010', name: 'Arjun Mehta', email: 'arjun.mehta@ams.com', phone: '+91 98765 00010', role: 'Employee', department: 'Sales', status: 'Inactive', lastLogin: '2 months ago', twoFactor: false, joined: '10-08-2023', avatarColor: 'bg-pink-600' },
  { id: 'U011', name: 'Pooja Shah', email: 'pooja.shah@ams.com', phone: '+91 98765 00011', role: 'Manager', department: 'Design Team', status: 'Suspended', lastLogin: '3 weeks ago', twoFactor: false, joined: '15-09-2023', avatarColor: 'bg-red-600' },
  { id: 'U012', name: 'Rajiv Khanna', email: 'rajiv.khanna@ams.com', phone: '+91 98765 00012', role: 'Employee', department: 'Sales', status: 'Pending', lastLogin: 'Never', twoFactor: false, joined: '08-06-2025', avatarColor: 'bg-slate-500' },
]

const rolePermissions = {
  'Super Admin': ['Full system access', 'User management', 'Settings', 'Reports', 'All assets', 'Vendor management'],
  'Admin': ['Manage assets', 'User management', 'Reports', 'Maintenance', 'Vendor management'],
  'Manager': ['View team assets', 'Approve assignments', 'Reports', 'Maintenance requests'],
  'Employee': ['View assigned assets', 'Request assignments', 'Submit maintenance tickets'],
  'IT Support': ['Manage maintenance', 'View all assets', 'QR scanner', 'Asset details'],
  'Viewer': ['Read-only access', 'View reports', 'View asset details'],
}

const initialNotifications = [
  { id: 'N001', type: 'assignment', title: 'New Asset Assignment', desc: 'Dell Latitude 5440 (A1001) assigned to John Doe', time: '2 minutes ago', timestamp: Date.now() - 2*60*1000, read: false, target: 'Asset Assignment' },
  { id: 'N002', type: 'maintenance', title: 'Maintenance Due', desc: 'Samsung 24" Monitor (A1004) is due for scheduled maintenance tomorrow', time: '15 minutes ago', timestamp: Date.now() - 15*60*1000, read: false, target: 'Maintenance' },
  { id: 'N003', type: 'warranty', title: 'Warranty Expiring Soon', desc: '12 assets have warranties expiring this month — review now', time: '1 hour ago', timestamp: Date.now() - 60*60*1000, read: false, target: 'Reports' },
  { id: 'N004', type: 'return', title: 'Asset Returned', desc: 'Apple MacBook Pro (A1003) returned by Sarah Wilson in Good condition', time: '2 hours ago', timestamp: Date.now() - 2*60*60*1000, read: false, target: 'Return Assets' },
  { id: 'N005', type: 'system', title: 'System Backup Successful', desc: 'Daily backup completed (12.4 MB) at 02:30 AM', time: '5 hours ago', timestamp: Date.now() - 5*60*60*1000, read: true, target: 'Settings' },
  { id: 'N006', type: 'overdue', title: 'Overdue Return Alert', desc: 'HP Pavilion 24 (A1013) was due for return on 01-06-2024 — Mia King', time: '8 hours ago', timestamp: Date.now() - 8*60*60*1000, read: false, target: 'Return Assets' },
  { id: 'N007', type: 'inventory', title: 'New Asset Added', desc: 'HP ProBook 450 G10 (A1020) added to inventory', time: 'Yesterday', timestamp: Date.now() - 26*60*60*1000, read: true, target: 'Assets' },
  { id: 'N008', type: 'assignment', title: 'Asset Assignment Updated', desc: 'iPhone 15 Pro (A1007) reassigned from Sales Team to James Taylor', time: 'Yesterday', timestamp: Date.now() - 30*60*60*1000, read: true, target: 'Asset Assignment' },
  { id: 'N009', type: 'vendor', title: 'New Vendor Onboarded', desc: 'TechServ IT Services added to the vendor list', time: '2 days ago', timestamp: Date.now() - 2*24*60*60*1000, read: true, target: 'Vendors' },
  { id: 'N010', type: 'maintenance', title: 'Maintenance Completed', desc: 'Canon EOS R6 Camera (A1010) maintenance completed successfully', time: '3 days ago', timestamp: Date.now() - 3*24*60*60*1000, read: true, target: 'Maintenance' },
  { id: 'N011', type: 'warranty', title: 'Warranty Renewed', desc: 'Dell Latitude 5440 warranty extended until 15-02-2027', time: '3 days ago', timestamp: Date.now() - 3*24*60*60*1000, read: true, target: 'Assets' },
  { id: 'N012', type: 'system', title: 'Settings Updated', desc: 'Notification preferences updated by Admin User', time: '4 days ago', timestamp: Date.now() - 4*24*60*60*1000, read: true, target: 'Settings' },
  { id: 'N013', type: 'overdue', title: 'Overdue Return', desc: 'HP ProBook (A1020) was due 08-06-2024 — Benjamin Hall', time: '5 days ago', timestamp: Date.now() - 5*24*60*60*1000, read: false, target: 'Return Assets' },
  { id: 'N014', type: 'inventory', title: 'Low Stock Alert', desc: 'Available laptop inventory dropped below 5 units', time: '6 days ago', timestamp: Date.now() - 6*24*60*60*1000, read: true, target: 'Categories' },
  { id: 'N015', type: 'system', title: 'License Expiring', desc: 'Enterprise license valid till December 2026 — renew soon', time: '1 week ago', timestamp: Date.now() - 7*24*60*60*1000, read: true, target: 'Settings' },
]

const helpFaqs = [
  { id: 'F01', category: 'Getting Started', q: 'How do I add a new asset to the system?', a: 'Navigate to the Assets module from the sidebar, then click the "+ Add New Asset" button. Fill in the required fields (Asset ID, Name, Category, Status, Assigned To, Purchase Date), upload an optional image, and click Save. The asset will appear instantly in your inventory list.' },
  { id: 'F02', category: 'Getting Started', q: 'How can I assign an asset to an employee?', a: 'Go to Asset Assignment from the sidebar. Pick an available asset, click "Assign", then select the employee from the dropdown. You can also set a return-by date and add notes. The assignment is logged in the audit history automatically.' },
  { id: 'F03', category: 'Getting Started', q: 'What do the different asset status colors mean?', a: 'Green = In Use (actively assigned), Blue = Available (in stock), Amber = Under Maintenance (with vendor or IT team), Red = Retired/Damaged (no longer usable), Gray = Pending Approval.' },
  { id: 'F04', category: 'Assets', q: 'Can I generate and print QR codes for my assets?', a: 'Yes. Open any asset details page and click the "QR Code" tab. You can print individual QR labels or use the bulk-print feature from the Assets module. Scan them later via the QR Code Scanner section to instantly fetch asset info.' },
  { id: 'F05', category: 'Assets', q: 'How do I track an asset that has been lost or damaged?', a: 'Open the asset detail page, change its status to "Damaged" or "Lost", add a note describing the situation, and optionally upload a photo. The incident is added to the asset history timeline and a notification is sent to admins.' },
  { id: 'F06', category: 'Assets', q: 'Where can I see the complete history of an asset?', a: 'Click on any asset row to open its details. The "Maintenance History" and "Assignment History" tabs show every past event with date, employee, and notes — including return condition and warranty events.' },
  { id: 'F07', category: 'Users & Roles', q: 'How do I add a new user and assign permissions?', a: 'Open the Users module, click "+ Add New User", fill in name/email/department, then choose a role (Super Admin, Admin, Manager, Employee, IT Support, Viewer). Each role comes with a pre-configured permission set which you can review before saving.' },
  { id: 'F08', category: 'Users & Roles', q: 'What is Two-Factor Authentication and how do I enable it?', a: '2FA adds a second verification step at login. Go to Settings → Security tab and enable "Two-Factor Authentication". Users will then be prompted to install an authenticator app and scan a QR to register.' },
  { id: 'F09', category: 'Users & Roles', q: 'Can a user have access to only specific departments?', a: 'Yes. Managers and Employees have automatic department-scoped access. For custom scoping, edit the user profile and set the "Department Scope" field — they will only see assets/employees within that department.' },
  { id: 'F10', category: 'Maintenance', q: 'How do I schedule preventive maintenance for an asset?', a: 'Visit the Maintenance module, click "+ Schedule Maintenance", select the asset, the vendor, the date, and the type (Preventive / Repair / Inspection). You will receive notifications 7 days, 3 days, and 1 day before the due date.' },
  { id: 'F11', category: 'Maintenance', q: 'Can vendors be linked to specific maintenance jobs?', a: 'Absolutely. When creating a maintenance ticket, the Vendor dropdown lists all active vendors. Once linked, the job and its cost appear in both the maintenance log and the vendor’s spend history.' },
  { id: 'F12', category: 'Reports', q: 'What types of reports can I generate?', a: 'You can generate Asset Summary, Category-wise, Department-wise, Vendor Spend, Maintenance Cost, Depreciation, and Warranty Expiry reports. Each report supports custom date ranges and can be exported as PDF or CSV.' },
  { id: 'F13', category: 'Reports', q: 'How do I export a report to PDF or Excel?', a: 'Open the Reports module, choose the report type and date range, then click "Generate Report". Once the preview appears, use the Export menu in the top-right (PDF / CSV / Excel). Exports respect the filters you applied.' },
  { id: 'F14', category: 'Security', q: 'Is my data encrypted and backed up?', a: 'Yes. All data is encrypted at rest with AES-256 and in transit via TLS 1.3. Automatic daily backups are taken at 02:30 AM and retained for 30 days. You can trigger manual backups from Settings → System.' },
  { id: 'F15', category: 'Security', q: 'How do I reset my password if I forget it?', a: 'On the login screen, click "Forgot Password?". Enter your registered email and a reset link valid for 30 minutes will be sent. Admins can also force-reset any user’s password from the Users module.' },
  { id: 'F16', category: 'Billing', q: 'How do I upgrade my plan or buy more user seats?', a: 'Open Settings → Billing tab. You will see the current plan, seat usage, and next invoice date. Click "Upgrade Plan" to switch tiers or "Add Seats" to purchase more user licenses. All upgrades are pro-rated automatically.' },
  { id: 'F17', category: 'Billing', q: 'Can I download my past invoices?', a: 'Yes. Settings → Billing → Invoices shows the last 24 months. Each entry has a Download PDF button. You can also email a copy directly to your accounts team from the same screen.' },
]

const helpVideos = [
  { id: 'V01', title: 'Getting Started with AMS', desc: 'A 5-minute walkthrough covering the dashboard, sidebar and key workflows.', duration: '5:12', thumb: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
  { id: 'V02', title: 'Adding & Categorizing Assets', desc: 'Learn to create assets, attach categories and bulk-import via CSV.', duration: '7:38', thumb: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
  { id: 'V03', title: 'Assignments & Returns Workflow', desc: 'End-to-end demo of assigning, tracking and returning assets safely.', duration: '6:21', thumb: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { id: 'V04', title: 'Scanning QR Codes on the Go', desc: 'Use the mobile-friendly scanner to look up and update assets instantly.', duration: '3:47', thumb: 'bg-gradient-to-br from-rose-500 to-pink-600' },
  { id: 'V05', title: 'Generating Powerful Reports', desc: 'Filter, segment, export — and schedule automated weekly summaries.', duration: '8:05', thumb: 'bg-gradient-to-br from-purple-500 to-fuchsia-600' },
  { id: 'V06', title: 'Managing Users & Permissions', desc: 'Set up roles, scopes and 2FA across your team in minutes.', duration: '4:30', thumb: 'bg-gradient-to-br from-cyan-500 to-sky-600' },
]

const helpArticles = [
  { id: 'A01', title: 'Complete Asset Lifecycle Guide', cat: 'Guide', read: '8 min read' },
  { id: 'A02', title: 'Best Practices for Asset Tagging', cat: 'Best Practice', read: '5 min read' },
  { id: 'A03', title: 'Setting Up Bulk Imports via CSV', cat: 'How-to', read: '6 min read' },
  { id: 'A04', title: 'Configuring Email Notifications', cat: 'Setup', read: '4 min read' },
  { id: 'A05', title: 'Understanding Depreciation Methods', cat: 'Reference', read: '10 min read' },
  { id: 'A06', title: 'Integrating AMS with Slack & Teams', cat: 'Integration', read: '7 min read' },
  { id: 'A07', title: 'Mobile App Quick-Start Checklist', cat: 'Guide', read: '3 min read' },
  { id: 'A08', title: 'GDPR Compliance & Data Retention', cat: 'Compliance', read: '9 min read' },
]

const dummyVendors = [
  { id: 'V001', name: 'Dell India Pvt. Ltd.', contact: 'Rahul Sharma', email: 'rahul.sharma@dell.com', phone: '+91 98765 11234', city: 'Bangalore', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 4, totalSpend: 568000, rating: 5, since: 2019 },
  { id: 'V002', name: 'HP India', contact: 'Priya Mehta', email: 'priya@hp.com', phone: '+91 98765 22345', city: 'Mumbai', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 4, totalSpend: 224500, rating: 4.5, since: 2018 },
  { id: 'V003', name: 'Apple India', contact: 'Vikram Singh', email: 'vikram@apple.com', phone: '+91 98765 33456', city: 'Mumbai', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 3, totalSpend: 458900, rating: 5, since: 2020 },
  { id: 'V004', name: 'Samsung India', contact: 'Anita Desai', email: 'anita@samsung.com', phone: '+91 98765 44567', city: 'Delhi', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 2, totalSpend: 138500, rating: 4, since: 2017 },
  { id: 'V005', name: 'Lenovo India', contact: 'Karthik Nair', email: 'karthik@lenovo.com', phone: '+91 98765 55678', city: 'Bangalore', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 2, totalSpend: 213000, rating: 4.5, since: 2019 },
  { id: 'V006', name: 'Epson India', contact: 'Sneha Patil', email: 'sneha@epson.com', phone: '+91 98765 66789', city: 'Pune', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 1, totalSpend: 42000, rating: 4, since: 2021 },
  { id: 'V007', name: 'Brother India', contact: 'Rajesh Kumar', email: 'rajesh@brother.com', phone: '+91 98765 77890', city: 'Chennai', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 1, totalSpend: 48000, rating: 3.5, since: 2022 },
  { id: 'V008', name: 'LG Electronics', contact: 'Pooja Reddy', email: 'pooja@lg.com', phone: '+91 98765 88901', city: 'Hyderabad', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 1, totalSpend: 48000, rating: 4, since: 2020 },
  { id: 'V009', name: 'Microsoft Store', contact: 'Arjun Kapoor', email: 'arjun@microsoft.com', phone: '+91 98765 99012', city: 'Hyderabad', country: 'India', category: 'Software', status: 'Active', assetsCount: 1, totalSpend: 132000, rating: 5, since: 2018 },
  { id: 'V010', name: 'Canon India', contact: 'Neha Joshi', email: 'neha@canon.com', phone: '+91 98765 01234', city: 'Mumbai', country: 'India', category: 'Hardware', status: 'Active', assetsCount: 1, totalSpend: 245000, rating: 4.5, since: 2019 },
  { id: 'V011', name: 'Logitech India', contact: 'Sanjay Verma', email: 'sanjay@logitech.com', phone: '+91 98765 12121', city: 'Bangalore', country: 'India', category: 'Hardware', status: 'Inactive', assetsCount: 0, totalSpend: 8500, rating: 4, since: 2023 },
  { id: 'V012', name: 'TechServ IT Services', contact: 'Manish Gupta', email: 'manish@techserv.in', phone: '+91 98765 23232', city: 'Noida', country: 'India', category: 'Services', status: 'Inactive', assetsCount: 0, totalSpend: 0, rating: 3, since: 2024 },
]

const dummyAssignments = [
  { id: 'AS5001', assetId: 'A1001', assetName: 'Dell Latitude 5440', empId: 'E1001', employee: 'John Doe', department: 'IT Department', assignedDate: '14-02-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5002', assetId: 'A1003', assetName: 'Apple MacBook Pro', empId: 'E1006', employee: 'Sarah Wilson', department: 'Design Team', assignedDate: '21-01-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5003', assetId: 'A1005', assetName: 'Lenovo ThinkPad E14', empId: 'E1003', employee: 'Robert Brown', department: 'Finance', assignedDate: '10-03-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5004', assetId: 'A1007', assetName: 'iPhone 15 Pro', empId: 'E1007', employee: 'James Taylor', department: 'Sales', assignedDate: '02-04-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5005', assetId: 'A1009', assetName: 'iPad Pro 12.9"', empId: 'E1012', employee: 'Sophia Garcia', department: 'Marketing', assignedDate: '28-02-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5006', assetId: 'A1011', assetName: 'Dell OptiPlex 7090', empId: 'E1010', employee: 'Olivia Anderson', department: 'Finance', assignedDate: '10-09-2023', returnDate: '-', status: 'Active' },
  { id: 'AS5007', assetId: 'A1015', assetName: 'LG UltraWide 34"', empId: 'E1014', employee: 'Isabella Allen', department: 'Design Team', assignedDate: '10-02-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5008', assetId: 'A1016', assetName: 'Dell P2422H Monitor', empId: 'E1020', employee: 'Charlotte Scott', department: 'Sales', assignedDate: '15-03-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5009', assetId: 'A1017', assetName: 'Samsung Galaxy S23', empId: 'E1011', employee: 'William Thomas', department: 'Operations', assignedDate: '12-04-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5010', assetId: 'A1019', assetName: 'Lenovo Yoga 9i', empId: 'E1019', employee: 'Alexander Hill', department: 'IT Department', assignedDate: '28-03-2024', returnDate: '-', status: 'Active' },
  { id: 'AS5011', assetId: 'A1004', assetName: 'Samsung 24" Monitor', empId: 'E1005', employee: 'Mike Johnson', department: 'IT Department', assignedDate: '12-08-2023', returnDate: '20-04-2024', status: 'Returned' },
  { id: 'AS5012', assetId: 'A1001', assetName: 'Dell Latitude 5440', empId: 'E1005', employee: 'Mike Johnson', department: 'IT Department', assignedDate: '10-01-2024', returnDate: '15-02-2024', status: 'Returned' },
  { id: 'AS5013', assetId: 'A1002', assetName: 'HP LaserJet Pro', empId: 'E1004', employee: 'David Lee', department: 'HR Department', assignedDate: '20-12-2023', returnDate: '18-03-2024', status: 'Returned' },
  { id: 'AS5014', assetId: 'A1013', assetName: 'HP Pavilion 24', empId: 'E1016', employee: 'Mia King', department: 'Reception', assignedDate: '01-05-2024', returnDate: '01-06-2024', status: 'Overdue' },
  { id: 'AS5015', assetId: 'A1020', assetName: 'HP ProBook 450 G10', empId: 'E1013', employee: 'Benjamin Hall', department: 'Sales', assignedDate: '01-06-2024', returnDate: '08-06-2024', status: 'Overdue' },
]

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
  const [loggedIn, setLoggedIn] = useState(false)
  const profileRef = useRef(null)

  // Auth state
  const [authMode, setAuthMode] = useState('signin') // 'signin' | 'signup'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [registeredUsers, setRegisteredUsers] = useState([
    { name: 'Admin User', email: 'admin@ams.com', password: 'admin123', role: 'Administrator' },
  ])
  const [currentUser, setCurrentUser] = useState({ name: 'Admin User', email: 'admin@ams.com', role: 'Administrator' })

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

  // Asset Assignment state
  const [assignFilter, setAssignFilter] = useState('All')
  const [assignSearch, setAssignSearch] = useState('')
  const [assignPage, setAssignPage] = useState(1)
  const ASSIGN_PER_PAGE = 6
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [newAssign, setNewAssign] = useState({ assetId: '', empId: '', returnDate: '' })

  // Return Assets state
  const [returnTab, setReturnTab] = useState('Pending')
  const [returnSearch, setReturnSearch] = useState('')
  const [selectedReturns, setSelectedReturns] = useState([])
  const [returnModalRow, setReturnModalRow] = useState(null)
  const [returnForm, setReturnForm] = useState({ date: new Date().toISOString().slice(0,10), condition: 'Good', notes: '' })
  const [returnedRecords, setReturnedRecords] = useState([
    { id: 'RT4001', assetId: 'A1004', assetName: 'Samsung 24" Monitor', employee: 'Mike Johnson', returnDate: '20-04-2024', condition: 'Good', notes: 'Working perfectly' },
    { id: 'RT4002', assetId: 'A1002', assetName: 'HP LaserJet Pro', employee: 'David Lee', returnDate: '18-03-2024', condition: 'Damaged', notes: 'Paper tray cracked' },
    { id: 'RT4003', assetId: 'A1001', assetName: 'Dell Latitude 5440', employee: 'Mike Johnson', returnDate: '15-02-2024', condition: 'Good', notes: 'Returned in original condition' },
  ])

  // Vendors state
  const [vendorFilter, setVendorFilter] = useState('All')
  const [vendorSearch, setVendorSearch] = useState('')
  const [vendorView, setVendorView] = useState('grid')
  const [selectedVendor, setSelectedVendor] = useState(null)

  // Notifications state
  const [notifications, setNotifications] = useState(initialNotifications)
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)
  const [notifFilter, setNotifFilter] = useState('All')
  const notifDropdownRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length
  const markNotifRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const markAllNotifRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const clearAllNotifs = () => setNotifications([])
  const deleteNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id))

  // Users state
  const [users, setUsers] = useState(initialUsers)
  const [userRoleFilter, setUserRoleFilter] = useState('All')
  const [userStatusFilter, setUserStatusFilter] = useState('All')
  const [userSearch, setUserSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'Employee', department: '' })

  // Need Help state
  const [helpSearch, setHelpSearch] = useState('')
  const [helpCategory, setHelpCategory] = useState('All')
  const [helpOpenFaq, setHelpOpenFaq] = useState(null)
  const [helpTab, setHelpTab] = useState('FAQs')
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'General Inquiry', priority: 'Medium', description: '' })
  const [ticketSent, setTicketSent] = useState(false)

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
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target)) {
        setNotifDropdownOpen(false)
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
    setActiveMenu('Dashboard')
    setAuthMode('signin')
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
    setAuthError('')
  }

  const handleAdminLogin = () => {
    setAuthLoading(true)
    setAuthError('')
    setTimeout(() => {
      setCurrentUser({ name: 'Admin User', email: 'admin@ams.com', role: 'Administrator' })
      setLoggedIn(true)
      setActiveMenu('Dashboard')
      setAuthLoading(false)
      setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
    }, 700)
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    setAuthError('')

    if (authMode === 'signin') {
      const email = authForm.email.trim().toLowerCase()
      const pwd = authForm.password
      if (!email || !pwd) {
        setAuthError('Please enter both email and password.')
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setAuthError('Please enter a valid email address.')
        return
      }
      setAuthLoading(true)
      setTimeout(() => {
        const user = registeredUsers.find(u => u.email.toLowerCase() === email && u.password === pwd)
        if (!user) {
          setAuthError('Invalid email or password. Please try again.')
          setAuthLoading(false)
          return
        }
        setCurrentUser({ name: user.name, email: user.email, role: user.role })
        setLoggedIn(true)
        setActiveMenu('Dashboard')
        setAuthLoading(false)
        setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
      }, 800)
    } else {
      const name = authForm.name.trim()
      const email = authForm.email.trim().toLowerCase()
      const pwd = authForm.password
      const cpwd = authForm.confirmPassword
      if (!name || !email || !pwd || !cpwd) {
        setAuthError('Please fill in all the fields.')
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setAuthError('Please enter a valid email address.')
        return
      }
      if (pwd.length < 6) {
        setAuthError('Password must be at least 6 characters long.')
        return
      }
      if (pwd !== cpwd) {
        setAuthError('Passwords do not match.')
        return
      }
      if (!acceptTerms) {
        setAuthError('Please accept the Terms & Privacy Policy to continue.')
        return
      }
      if (registeredUsers.some(u => u.email.toLowerCase() === email)) {
        setAuthError('An account with this email already exists. Please sign in.')
        return
      }
      setAuthLoading(true)
      setTimeout(() => {
        const newAccount = { name, email, password: pwd, role: 'User' }
        setRegisteredUsers(prev => [...prev, newAccount])
        setCurrentUser({ name, email, role: 'User' })
        setLoggedIn(true)
        setActiveMenu('Dashboard')
        setAuthLoading(false)
        setAuthForm({ name: '', email: '', password: '', confirmPassword: '' })
      }, 900)
    }
  }

  // Password strength meter helpers
  const getPwdStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-gray-200', text: 'text-gray-400' }
    let score = 0
    if (pwd.length >= 6) score++
    if (pwd.length >= 10) score++
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
    if (/\d/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    const map = [
      { label: 'Too weak', color: 'bg-red-500', text: 'text-red-600' },
      { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-600' },
      { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600' },
      { label: 'Good', color: 'bg-lime-500', text: 'text-lime-600' },
      { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' },
      { label: 'Very strong', color: 'bg-emerald-600', text: 'text-emerald-700' },
    ]
    return { score, ...map[Math.min(score, 5)] }
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
    const isSignup = authMode === 'signup'
    const pwdStrength = getPwdStrength(authForm.password)
    return (
      <div className="min-h-screen flex bg-gray-50 font-sans">
        {/* Left brand panel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0a1547] via-[#0d1b4c] to-[#1e3a8a] text-white p-12 flex-col justify-between">
          {/* Decorative blobs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full bg-indigo-400/15 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"></div>

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          {/* Top: Logo */}
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl border-2 border-white/80 flex items-center justify-center bg-white/5 backdrop-blur">
              <div className="w-5 h-5 border-2 border-white rotate-45"></div>
            </div>
            <div className="leading-tight">
              <div className="text-2xl font-black tracking-tight">AMS</div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-white/70">ASSET MANAGEMENT SYSTEM</div>
            </div>
          </div>

          {/* Middle: Heading & features */}
          <div className="relative max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[11px] font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Trusted by 5,000+ companies worldwide
            </div>
            <h1 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight mb-5">
              Manage every<br />
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">asset</span> with confidence.
            </h1>
            <p className="text-base text-blue-100/90 leading-relaxed mb-8">
              Track, assign, maintain and report on every device in your organization — all from a single, elegant control center.
            </p>
            <div className="space-y-3.5">
              {[
                { icon: CheckCircle, t: 'Real-time inventory across 14+ modules' },
                { icon: CheckCircle, t: 'QR-code scanning, audit logs & maintenance alerts' },
                { icon: CheckCircle, t: 'Role-based access, 2FA & encrypted at rest' },
              ].map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-emerald-300" />
                    </div>
                    <span className="text-sm text-white/90 font-medium">{f.t}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom: testimonial */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 max-w-md">
              <div className="flex gap-0.5 mb-2 text-amber-300">{'★★★★★'}</div>
              <p className="text-sm leading-relaxed text-white/95">
                &ldquo;AMS transformed how our IT team manages 12,000+ devices. The QR workflow alone saves us 20 hours a week.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">PN</div>
                <div>
                  <div className="text-sm font-bold">Priya Nair</div>
                  <div className="text-xs text-white/70">Head of IT · Acme Corp</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex flex-col px-6 sm:px-10 md:px-16 py-8 md:py-10 overflow-y-auto">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-[#0d1b4c] flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rotate-45"></div>
            </div>
            <div>
              <div className="text-lg font-black text-gray-900 tracking-tight">AMS</div>
              <div className="text-[9px] font-bold tracking-widest text-gray-500">ASSET MANAGEMENT SYSTEM</div>
            </div>
          </div>

          {/* Top right: switch */}
          <div className="flex items-center justify-end text-sm text-gray-500 mb-8 md:mb-12">
            <span className="hidden sm:inline mr-2">{isSignup ? 'Already have an account?' : "Don't have an account?"}</span>
            <button
              onClick={() => { setAuthMode(isSignup ? 'signin' : 'signup'); setAuthError(''); }}
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              {isSignup ? 'Sign in' : 'Create one'}
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2 leading-none">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-sm md:text-base text-gray-500 mb-7">
                {isSignup
                  ? 'Get started in less than 60 seconds — no credit card required.'
                  : 'Sign in to access your asset management dashboard.'}
              </p>

              {/* Admin one-click */}
              <button
                onClick={handleAdminLogin}
                disabled={authLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 text-gray-800 font-bold text-sm transition-all duration-200 mb-5 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <span>Quick Sign In as Admin</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 ml-1">DEMO</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">or {isSignup ? 'sign up' : 'sign in'} with email</span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Error */}
                {authError && (
                  <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-medium">{authError}</p>
                  </div>
                )}

                {isSignup && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                        placeholder="John Doe"
                        autoComplete="name"
                        className="w-full pl-10 pr-3.5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      placeholder="you@company.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-3.5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-700">Password</label>
                    {!isSignup && (
                      <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">Forgot?</button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPwd ? 'text' : 'password'}
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      placeholder={isSignup ? 'At least 6 characters' : 'Enter your password'}
                      autoComplete={isSignup ? 'new-password' : 'current-password'}
                      className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                      tabIndex={-1}
                    >
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {isSignup && authForm.password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= pwdStrength.score ? pwdStrength.color : 'bg-gray-100'}`}></div>
                        ))}
                      </div>
                      <p className={`text-[11px] font-semibold mt-1 ${pwdStrength.text}`}>Password strength: {pwdStrength.label}</p>
                    </div>
                  )}
                </div>

                {isSignup && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPwd2 ? 'text' : 'password'}
                        value={authForm.confirmPassword}
                        onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd2(!showPwd2)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                        tabIndex={-1}
                      >
                        {showPwd2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {authForm.confirmPassword && (
                      <p className={`text-[11px] font-semibold mt-1.5 flex items-center gap-1 ${authForm.password === authForm.confirmPassword ? 'text-emerald-600' : 'text-red-500'}`}>
                        {authForm.password === authForm.confirmPassword
                          ? (<><CheckCircle className="w-3.5 h-3.5" /> Passwords match</>)
                          : (<><AlertCircle className="w-3.5 h-3.5" /> Passwords do not match</>)}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-start gap-2 pt-1">
                  {isSignup ? (
                    <>
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed select-none">
                        I agree to the <a href="#" className="font-bold text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-blue-600 hover:underline">Privacy Policy</a>.
                      </label>
                    </>
                  ) : (
                    <>
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="remember" className="text-xs text-gray-600 leading-relaxed select-none">
                        Keep me signed in on this device for 30 days
                      </label>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold tracking-wide shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      {isSignup ? 'Creating account…' : 'Signing in…'}
                    </>
                  ) : (
                    <>
                      {isSignup ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Social row */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { name: 'Google', svg: (<svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>) },
                  { name: 'Microsoft', svg: (<svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#F25022" d="M2 2h9.5v9.5H2z"/><path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z"/><path fill="#00A4EF" d="M2 12.5h9.5V22H2z"/><path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z"/></svg>) },
                  { name: 'GitHub', svg: (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="#181717"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>) },
                ].map(p => (
                  <button
                    key={p.name}
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                  >
                    {p.svg}
                    <span className="hidden sm:inline">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400">
            <div>© 2026 AMS. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-700">Privacy</a>
              <a href="#" className="hover:text-gray-700">Terms</a>
              <a href="#" className="hover:text-gray-700">Support</a>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                All systems operational
              </span>
            </div>
          </div>
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
                {/* Notifications Bell */}
                <div className="relative" ref={notifDropdownRef}>
                  <button
                    onClick={() => setNotifDropdownOpen((v) => !v)}
                    className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Bell className="w-5 h-5 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* Header */}
                      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">Notifications</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>
                        </div>
                        {unreadCount > 0 && (
                          <button onClick={markAllNotifRead} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                            Mark all read
                          </button>
                        )}
                      </div>

                      {/* List */}
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="py-12 text-center">
                            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-gray-600">All caught up!</p>
                            <p className="text-xs text-gray-400 mt-0.5">No new notifications</p>
                          </div>
                        ) : (
                          notifications.slice(0, 6).map((n) => {
                            const meta = ({
                              assignment: { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-100' },
                              maintenance: { icon: Wrench, color: 'text-red-600', bg: 'bg-red-100' },
                              warranty: { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100' },
                              return: { icon: RotateCw, color: 'text-cyan-600', bg: 'bg-cyan-100' },
                              system: { icon: Settings, color: 'text-gray-600', bg: 'bg-gray-100' },
                              overdue: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
                              inventory: { icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                              vendor: { icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                            }[n.type]) || { icon: Bell, color: 'text-gray-600', bg: 'bg-gray-100' }
                            const Icon = meta.icon
                            return (
                              <button
                                key={n.id}
                                onClick={() => {
                                  markNotifRead(n.id)
                                  setNotifDropdownOpen(false)
                                  if (n.target) setActiveMenu(n.target)
                                }}
                                className={`w-full text-left flex items-start gap-3 px-5 py-3 border-b border-gray-50 hover:bg-blue-50/50 transition-colors ${!n.read ? 'bg-blue-50/30' : ''}`}
                              >
                                <div className={`w-9 h-9 rounded-full ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                                  <Icon className={`w-4 h-4 ${meta.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className={`text-sm ${!n.read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'} truncate`}>{n.title}</p>
                                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{n.desc}</p>
                                  <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                                </div>
                              </button>
                            )
                          })
                        )}
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                        <button
                          onClick={() => { setActiveMenu('Notifications'); setNotifDropdownOpen(false) }}
                          className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1"
                        >
                          View all notifications
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

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
                      <div className="text-sm font-semibold text-gray-900">{currentUser.name}</div>
                      <div className="text-xs text-gray-500">{currentUser.role}</div>
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
                            <div className="font-semibold">{currentUser.name}</div>
                            <div className="text-xs text-white/80">{currentUser.role}</div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-4 space-y-3 border-b border-gray-100">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{currentUser.email}</span>
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
                          <p className="text-sm text-gray-500 mt-1">Welcome back, {currentUser.name}!</p>
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
              ) : activeMenu === 'Users' ? (
                (() => {
                  const roleColors = {
                    'Super Admin': 'bg-purple-100 text-purple-700 border-purple-200',
                    'Admin': 'bg-blue-100 text-blue-700 border-blue-200',
                    'Manager': 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    'Employee': 'bg-amber-100 text-amber-700 border-amber-200',
                    'IT Support': 'bg-orange-100 text-orange-700 border-orange-200',
                    'Viewer': 'bg-teal-100 text-teal-700 border-teal-200',
                  }
                  const statusColors = {
                    'Active': 'bg-green-100 text-green-700 border-green-200',
                    'Inactive': 'bg-gray-100 text-gray-700 border-gray-200',
                    'Suspended': 'bg-red-100 text-red-700 border-red-200',
                    'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
                  }
                  const roles = ['All', 'Super Admin', 'Admin', 'Manager', 'Employee', 'IT Support', 'Viewer']
                  const statuses = ['All', 'Active', 'Inactive', 'Suspended', 'Pending']

                  const filtered = users.filter(u => {
                    const inRole = userRoleFilter === 'All' || u.role === userRoleFilter
                    const inStatus = userStatusFilter === 'All' || u.status === userStatusFilter
                    const q = userSearch.toLowerCase()
                    const inSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.department.toLowerCase().includes(q) || u.id.toLowerCase().includes(q)
                    return inRole && inStatus && inSearch
                  })

                  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()

                  const stats = [
                    { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
                    { label: 'Active', value: users.filter(u => u.status === 'Active').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                    { label: 'Admins', value: users.filter(u => u.role === 'Super Admin' || u.role === 'Admin').length, icon: Shield, color: 'text-purple-500', bg: 'bg-purple-100' },
                    { label: 'Pending Invites', value: users.filter(u => u.status === 'Pending').length, icon: Mail, color: 'text-amber-500', bg: 'bg-amber-100' },
                  ]

                  const handleAddUser = () => {
                    if (!newUser.name || !newUser.email) return alert('Please fill name and email')
                    const next = {
                      id: `U${String(users.length + 1).padStart(3, '0')}`,
                      ...newUser,
                      status: 'Pending',
                      lastLogin: 'Never',
                      twoFactor: false,
                      joined: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
                      avatarColor: ['bg-blue-600','bg-emerald-600','bg-amber-600','bg-rose-600','bg-cyan-600','bg-indigo-600'][users.length % 6],
                    }
                    setUsers([...users, next])
                    setNewUser({ name: '', email: '', phone: '', role: 'Employee', department: '' })
                    setShowAddUser(false)
                    alert(`✓ Invite sent to ${next.email}`)
                  }

                  const toggleStatus = (id) => {
                    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
                  }
                  const deleteUser = (id) => {
                    if (confirm('Delete this user permanently?')) {
                      setUsers(prev => prev.filter(u => u.id !== id))
                      setSelectedUser(null)
                    }
                  }

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                          <p className="text-sm text-gray-500 mt-1">Dashboard <span className="mx-1">/</span> Users · Manage system users and their access</p>
                        </div>
                        <button
                          onClick={() => setShowAddUser(true)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:-translate-y-0.5 transform"
                        >
                          <Plus className="w-4 h-4" />
                          Add User
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((s, i) => {
                          const Icon = s.icon
                          return (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                              <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center`}>
                                <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={2.2} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Toolbar */}
                      <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role:</span>
                            <div className="relative">
                              <select value={userRoleFilter} onChange={(e) => setUserRoleFilter(e.target.value)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                                {roles.map(r => <option key={r}>{r}</option>)}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
                            <div className="relative">
                              <select value={userStatusFilter} onChange={(e) => setUserStatusFilter(e.target.value)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                                {statuses.map(s => <option key={s}>{s}</option>)}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full sm:w-72">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" />
                        </div>
                      </div>

                      {/* Users Table */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">2FA</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {filtered.length === 0 ? (
                                <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">No users match your filters</td></tr>
                              ) : filtered.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4">
                                    <button onClick={() => setSelectedUser(u)} className="flex items-center gap-3 text-left">
                                      <div className={`w-10 h-10 rounded-full ${u.avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                        {getInitials(u.name)}
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">{u.name}</p>
                                        <p className="text-xs text-gray-500">{u.email}</p>
                                      </div>
                                    </button>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${roleColors[u.role] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                      {u.role}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{u.department}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{u.lastLogin}</td>
                                  <td className="px-6 py-4">
                                    {u.twoFactor ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
                                        <Shield className="w-3 h-3" />
                                        Enabled
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-500">
                                        Off
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${statusColors[u.status]}`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-green-500' : u.status === 'Pending' ? 'bg-amber-500' : u.status === 'Suspended' ? 'bg-red-500' : 'bg-gray-400'}`} />
                                      {u.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                      <button onClick={() => setSelectedUser(u)} title="View" className="w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <button onClick={() => alert(`Reset password email sent to ${u.email}`)} title="Reset Password" className="w-8 h-8 rounded-md bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                        <RotateCw className="w-4 h-4" />
                                      </button>
                                      <button onClick={() => toggleStatus(u.id)} title={u.status === 'Active' ? 'Suspend' : 'Activate'} className={`w-8 h-8 rounded-md ${u.status === 'Active' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white flex items-center justify-center transition-colors shadow-sm`}>
                                        {u.status === 'Active' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                      </button>
                                      <button onClick={() => deleteUser(u.id)} title="Delete" disabled={u.role === 'Super Admin'} className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-500">
                          Showing {filtered.length} of {users.length} users
                        </div>
                      </div>

                      {/* User Detail Modal */}
                      {selectedUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200" onClick={() => setSelectedUser(null)}>
                          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className={`h-24 ${selectedUser.avatarColor} relative`}>
                              <button onClick={() => setSelectedUser(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center text-white">✕</button>
                              <div className={`absolute -bottom-10 left-6 w-20 h-20 rounded-full ${selectedUser.avatarColor} ring-4 ring-white shadow-lg flex items-center justify-center text-white text-2xl font-bold`}>
                                {getInitials(selectedUser.name)}
                              </div>
                            </div>
                            <div className="pt-12 px-6 pb-6">
                              <div className="flex items-start justify-between flex-wrap gap-2">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                                  <p className="text-sm text-gray-500 mt-0.5">{selectedUser.id} · Joined {selectedUser.joined}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${roleColors[selectedUser.role]}`}>{selectedUser.role}</span>
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${statusColors[selectedUser.status]}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${selectedUser.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                    {selectedUser.status}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Contact</h4>
                                  <div className="space-y-2.5 text-sm">
                                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-gray-400" /><a href={`mailto:${selectedUser.email}`} className="text-blue-600 hover:underline">{selectedUser.email}</a></div>
                                    <div className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-gray-400" /><span className="text-gray-800">{selectedUser.phone}</span></div>
                                    <div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-gray-400" /><span className="text-gray-800">{selectedUser.department}</span></div>
                                    <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-gray-400" /><span className="text-gray-800">Last login: {selectedUser.lastLogin}</span></div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Security</h4>
                                  <div className="space-y-2.5">
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                                      <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-800">Two-Factor Auth</span>
                                      </div>
                                      <span className={`text-xs font-bold ${selectedUser.twoFactor ? 'text-emerald-600' : 'text-gray-400'}`}>{selectedUser.twoFactor ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                    <button onClick={() => alert(`Password reset email sent to ${selectedUser.email}`)} className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                                      <div className="flex items-center gap-2">
                                        <RotateCw className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-800">Reset Password</span>
                                      </div>
                                      <ArrowRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6">
                                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Role Permissions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {(rolePermissions[selectedUser.role] || []).map((p, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                      <span className="text-sm text-gray-700">{p}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                              <button onClick={() => deleteUser(selectedUser.id)} disabled={selectedUser.role === 'Super Admin'} className="px-5 py-2 rounded-lg text-sm font-semibold text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Delete User
                              </button>
                              <button onClick={() => { toggleStatus(selectedUser.id); setSelectedUser({ ...selectedUser, status: selectedUser.status === 'Active' ? 'Suspended' : 'Active' }) }} className="px-5 py-2 rounded-lg text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors">
                                {selectedUser.status === 'Active' ? 'Suspend' : 'Activate'}
                              </button>
                              <button onClick={() => alert(`Edit ${selectedUser.name}`)} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                                <Edit3 className="w-4 h-4" />
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Add User Modal */}
                      {showAddUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200" onClick={() => setShowAddUser(false)}>
                          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                              <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
                              <button onClick={() => setShowAddUser(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                                  <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="e.g. Rahul Kumar" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Phone</label>
                                  <input type="text" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} placeholder="+91 98765 00000" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email <span className="text-red-500">*</span></label>
                                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="user@ams.com" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Role</label>
                                  <div className="relative">
                                    <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                      {['Super Admin','Admin','Manager','Employee','IT Support','Viewer'].map(r => <option key={r}>{r}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Department</label>
                                  <input type="text" value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} placeholder="e.g. IT Department" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                              </div>
                              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-2">
                                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-gray-700">An invitation email will be sent to the user. They&apos;ll set their password on first login.</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                              <button onClick={() => setShowAddUser(false)} className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors">Cancel</button>
                              <button onClick={handleAddUser} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                                <Mail className="w-4 h-4" />
                                Send Invitation
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()
              ) : activeMenu === 'Notifications' ? (
                (() => {
                  const filters = ['All', 'Unread', 'Read', 'Assignment', 'Maintenance', 'Warranty', 'System']
                  const filterMap = { Assignment: 'assignment', Maintenance: 'maintenance', Warranty: 'warranty', System: 'system' }
                  const filtered = notifications.filter(n => {
                    if (notifFilter === 'All') return true
                    if (notifFilter === 'Unread') return !n.read
                    if (notifFilter === 'Read') return n.read
                    return n.type === filterMap[notifFilter]
                  })

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span> Notifications
                            {unreadCount > 0 && <span className="ml-2 inline-flex px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">{unreadCount} unread</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button onClick={markAllNotifRead} disabled={unreadCount === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <Check className="w-4 h-4" />
                            Mark all as read
                          </button>
                          <button onClick={() => { if (confirm('Clear all notifications?')) clearAllNotifs() }} disabled={notifications.length === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 bg-white border border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <Trash2 className="w-4 h-4" />
                            Clear all
                          </button>
                          <button onClick={() => setActiveMenu('Settings')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                            <Settings className="w-4 h-4" />
                            Preferences
                          </button>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                          { label: 'Total', value: notifications.length, icon: Bell, color: 'text-blue-500', bg: 'bg-blue-100' },
                          { label: 'Unread', value: unreadCount, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' },
                          { label: 'Read', value: notifications.length - unreadCount, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                          { label: 'Action Required', value: notifications.filter(n => n.type === 'overdue' || (n.type === 'warranty' && !n.read)).length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
                        ].map((s, i) => {
                          const Icon = s.icon
                          return (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                              <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center`}>
                                <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={2.2} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Filter pills */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {filters.map(f => (
                          <button
                            key={f}
                            onClick={() => setNotifFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                              notifFilter === f
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>

                      {/* List */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        {filtered.length === 0 ? (
                          <div className="py-20 text-center">
                            <Bell className="w-14 h-14 text-gray-300 mx-auto mb-3" />
                            <p className="text-base font-semibold text-gray-700">No notifications</p>
                            <p className="text-sm text-gray-500 mt-1">You&apos;re all caught up!</p>
                          </div>
                        ) : (
                          <ul className="divide-y divide-gray-100">
                            {filtered.map((n) => {
                              const meta = ({
                                assignment: { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-100', accent: 'border-l-blue-500' },
                                maintenance: { icon: Wrench, color: 'text-red-600', bg: 'bg-red-100', accent: 'border-l-red-500' },
                                warranty: { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100', accent: 'border-l-purple-500' },
                                return: { icon: RotateCw, color: 'text-cyan-600', bg: 'bg-cyan-100', accent: 'border-l-cyan-500' },
                                system: { icon: Settings, color: 'text-gray-600', bg: 'bg-gray-100', accent: 'border-l-gray-400' },
                                overdue: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100', accent: 'border-l-amber-500' },
                                inventory: { icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-100', accent: 'border-l-emerald-500' },
                                vendor: { icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-100', accent: 'border-l-indigo-500' },
                              }[n.type]) || { icon: Bell, color: 'text-gray-600', bg: 'bg-gray-100', accent: 'border-l-gray-400' }
                              const Icon = meta.icon
                              return (
                                <li key={n.id} className={`group flex items-start gap-4 px-6 py-4 border-l-4 ${meta.accent} hover:bg-gray-50 transition-colors ${!n.read ? 'bg-blue-50/30' : ''}`}>
                                  <div className={`w-11 h-11 rounded-full ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-5 h-5 ${meta.color}`} />
                                  </div>
                                  <button
                                    onClick={() => { markNotifRead(n.id); if (n.target) setActiveMenu(n.target) }}
                                    className="flex-1 min-w-0 text-left"
                                  >
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className={`text-sm ${!n.read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{n.title}</h4>
                                      {!n.read && <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">NEW</span>}
                                      <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 capitalize">· {n.type}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{n.desc}</p>
                                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {n.time}
                                    </p>
                                  </button>
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {!n.read && (
                                      <button onClick={() => markNotifRead(n.id)} title="Mark as read" className="w-8 h-8 rounded-md text-gray-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors">
                                        <Check className="w-4 h-4" />
                                      </button>
                                    )}
                                    <button onClick={() => deleteNotif(n.id)} title="Delete" className="w-8 h-8 rounded-md text-gray-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  )
                })()
              ) : activeMenu === 'Vendors' ? (
                (() => {
                  const filtered = dummyVendors.filter((v) => {
                    const inFilter = vendorFilter === 'All' || v.status === vendorFilter || v.category === vendorFilter
                    const q = vendorSearch.toLowerCase()
                    const inSearch = !q || v.name.toLowerCase().includes(q) || v.contact.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || v.city.toLowerCase().includes(q)
                    return inFilter && inSearch
                  })
                  const totalSpend = dummyVendors.reduce((s, v) => s + v.totalSpend, 0)
                  const topVendor = [...dummyVendors].sort((a, b) => b.totalSpend - a.totalSpend)[0]
                  const stats = [
                    { label: 'Total Vendors', value: dummyVendors.length, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-100' },
                    { label: 'Active', value: dummyVendors.filter(v => v.status === 'Active').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                    { label: 'Total Spend', value: `₹${(totalSpend / 100000).toFixed(1)}L`, icon: Package, color: 'text-amber-500', bg: 'bg-amber-100' },
                    { label: 'Top Vendor', value: topVendor.name.split(' ')[0], icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100', sub: `₹${topVendor.totalSpend.toLocaleString('en-IN')}` },
                  ]
                  const filters = ['All', 'Active', 'Inactive', 'Hardware', 'Software', 'Services']
                  const vendorAccent = (id) => {
                    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-orange-500', 'bg-indigo-500']
                    return colors[parseInt(id.slice(1)) % colors.length]
                  }
                  const Stars = ({ rating }) => {
                    const full = Math.floor(rating)
                    const half = rating - full >= 0.5
                    return (
                      <div className="flex items-center gap-0.5">
                        {[0,1,2,3,4].map(i => (
                          <span key={i} className={`text-xs ${i < full ? 'text-amber-400' : i === full && half ? 'text-amber-300' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                        <span className="text-xs text-gray-600 ml-1 font-semibold">{rating}</span>
                      </div>
                    )
                  }

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Vendors</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span> Vendors
                          </p>
                        </div>
                        <button
                          onClick={() => alert('Add Vendor form would open here')}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:-translate-y-0.5 transform"
                        >
                          <Plus className="w-4 h-4" />
                          Add Vendor
                        </button>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((s, i) => {
                          const Icon = s.icon
                          return (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                              <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center`}>
                                <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={2.2} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                                <p className="text-xl font-bold text-gray-900 mt-0.5 truncate">{s.value}</p>
                                {s.sub && <p className="text-xs text-gray-500 mt-0.5 truncate">{s.sub}</p>}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Toolbar */}
                      <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          {filters.map((f) => (
                            <button
                              key={f}
                              onClick={() => setVendorFilter(f)}
                              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                                vendorFilter === f
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" value={vendorSearch} onChange={(e) => setVendorSearch(e.target.value)} placeholder="Search vendors..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" />
                          </div>
                          <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                            <button onClick={() => setVendorView('grid')} className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${vendorView === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>Grid</button>
                            <button onClick={() => setVendorView('list')} className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${vendorView === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>List</button>
                          </div>
                        </div>
                      </div>

                      {/* GRID VIEW */}
                      {vendorView === 'grid' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-in fade-in duration-200">
                          {filtered.map((v) => (
                            <div key={v.id} onClick={() => setSelectedVendor(v)} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">
                              <div className={`h-16 ${vendorAccent(v.id)} relative`}>
                                <div className="absolute -bottom-6 left-5 w-14 h-14 rounded-xl bg-white border-4 border-white shadow-md flex items-center justify-center">
                                  <span className={`text-xl font-bold ${vendorAccent(v.id).replace('bg-', 'text-')}`}>
                                    {v.name.slice(0, 2).toUpperCase()}
                                  </span>
                                </div>
                                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold ${v.status === 'Active' ? 'bg-white/95 text-green-700' : 'bg-white/95 text-gray-600'}`}>
                                  {v.status}
                                </span>
                              </div>
                              <div className="pt-8 px-5 pb-5">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-bold text-gray-900 truncate" title={v.name}>{v.name}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{v.id} · {v.category}</p>
                                  </div>
                                  <Stars rating={v.rating} />
                                </div>
                                <div className="mt-4 space-y-1.5 text-xs">
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="truncate">{v.contact}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="truncate" title={v.email}>{v.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="truncate">{v.city}, {v.country}</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
                                  <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Assets</p>
                                    <p className="text-base font-bold text-gray-900">{v.assetsCount}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Total Spend</p>
                                    <p className="text-base font-bold text-blue-600">₹{(v.totalSpend/1000).toFixed(1)}k</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {filtered.length === 0 && (
                            <div className="col-span-full text-center py-16">
                              <p className="text-sm text-gray-500">No vendors match your filters</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* LIST VIEW */}
                      {vendorView === 'list' && (
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-in fade-in duration-200">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vendor</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assets</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Spend</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                  <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {filtered.map((v) => (
                                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg ${vendorAccent(v.id)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                          {v.name.slice(0,2).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                          <p className="text-sm font-semibold text-gray-800 truncate">{v.name}</p>
                                          <p className="text-xs text-gray-500">{v.id}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <p className="text-sm font-medium text-gray-800">{v.contact}</p>
                                      <p className="text-xs text-gray-500">{v.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{v.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{v.city}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{v.assetsCount}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-blue-600">₹{v.totalSpend.toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-4"><Stars rating={v.rating} /></td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${v.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                        {v.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => setSelectedVendor(v)} title="View" className="w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                          <Eye className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => alert(`Edit ${v.name}`)} title="Edit" className="w-8 h-8 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                          <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => { if (confirm(`Delete ${v.name}?`)) alert('Deleted (demo)') }} title="Delete" className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                {filtered.length === 0 && (
                                  <tr><td colSpan={9} className="px-6 py-12 text-center text-sm text-gray-500">No vendors match your filters</td></tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Vendor Detail Modal */}
                      {selectedVendor && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200" onClick={() => setSelectedVendor(null)}>
                          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <div className={`h-24 ${vendorAccent(selectedVendor.id)} relative`}>
                              <button onClick={() => setSelectedVendor(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center text-white">✕</button>
                              <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                                <span className={`text-3xl font-bold ${vendorAccent(selectedVendor.id).replace('bg-', 'text-')}`}>
                                  {selectedVendor.name.slice(0,2).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="pt-12 px-6 pb-6">
                              <div className="flex items-start justify-between flex-wrap gap-3">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">{selectedVendor.name}</h3>
                                  <p className="text-sm text-gray-500 mt-0.5">{selectedVendor.id} · {selectedVendor.category} · Partnered since {selectedVendor.since}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Stars rating={selectedVendor.rating} />
                                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${selectedVendor.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                    {selectedVendor.status}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Contact Information</h4>
                                  <div className="space-y-2.5 text-sm">
                                    <div className="flex items-center gap-3"><User className="w-4 h-4 text-gray-400" /><span className="text-gray-800 font-semibold">{selectedVendor.contact}</span></div>
                                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-gray-400" /><a href={`mailto:${selectedVendor.email}`} className="text-blue-600 hover:underline">{selectedVendor.email}</a></div>
                                    <div className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-gray-400" /><span className="text-gray-800">{selectedVendor.phone}</span></div>
                                    <div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-gray-400" /><span className="text-gray-800">{selectedVendor.city}, {selectedVendor.country}</span></div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Performance</h4>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                                      <p className="text-xs text-gray-600">Assets Supplied</p>
                                      <p className="text-xl font-bold text-blue-700 mt-1">{selectedVendor.assetsCount}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                                      <p className="text-xs text-gray-600">Total Spend</p>
                                      <p className="text-xl font-bold text-emerald-700 mt-1">₹{selectedVendor.totalSpend.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                                      <p className="text-xs text-gray-600">Rating</p>
                                      <p className="text-xl font-bold text-amber-700 mt-1">{selectedVendor.rating}/5</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                                      <p className="text-xs text-gray-600">Years</p>
                                      <p className="text-xl font-bold text-purple-700 mt-1">{2025 - selectedVendor.since}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Assets supplied */}
                              <div className="mt-6">
                                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Assets Supplied ({selectedVendor.assetsCount})</h4>
                                {selectedVendor.assetsCount === 0 ? (
                                  <p className="text-sm text-gray-500 italic">No assets currently supplied by this vendor.</p>
                                ) : (
                                  <div className="space-y-2 max-h-44 overflow-y-auto">
                                    {dummyAssets.filter(a => a.vendor === selectedVendor.name).map(a => (
                                      <button
                                        key={a.id}
                                        onClick={() => { setSelectedAssetId(a.id); setDetailsTab('Assignment History'); setSelectedVendor(null) }}
                                        className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 transition-colors text-left"
                                      >
                                        <img src={a.image} alt={a.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-semibold text-gray-800 truncate">{a.name}</p>
                                          <p className="text-xs text-gray-500">{a.id} · {a.category}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                              <button onClick={() => setSelectedVendor(null)} className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors">
                                Close
                              </button>
                              <button onClick={() => alert(`Edit ${selectedVendor.name}`)} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                                <Edit3 className="w-4 h-4" />
                                Edit Vendor
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()
              ) : activeMenu === 'Return Assets' ? (
                (() => {
                  // Pending = Active + Overdue assignments
                  const pending = dummyAssignments.filter(a => a.status === 'Active' || a.status === 'Overdue')
                  const q = returnSearch.toLowerCase()
                  const pendingFiltered = pending.filter(a => !q || a.id.toLowerCase().includes(q) || a.assetName.toLowerCase().includes(q) || a.assetId.toLowerCase().includes(q) || a.employee.toLowerCase().includes(q))
                  const recentFiltered = returnedRecords.filter(a => !q || a.id.toLowerCase().includes(q) || a.assetName.toLowerCase().includes(q) || a.assetId.toLowerCase().includes(q) || a.employee.toLowerCase().includes(q))

                  const overdueCount = pending.filter(a => a.status === 'Overdue').length
                  const today = new Date().toISOString().slice(0,10)
                  const returnedToday = returnedRecords.filter(r => {
                    const parts = r.returnDate.split('-')
                    return `${parts[2]}-${parts[1]}-${parts[0]}` === today
                  }).length
                  const stats = [
                    { label: 'Pending Returns', value: pending.length, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100' },
                    { label: 'Overdue', value: overdueCount, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' },
                    { label: 'Returned This Month', value: returnedRecords.length, icon: RotateCw, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                    { label: 'Returned Today', value: returnedToday, icon: CheckCircle2, color: 'text-amber-500', bg: 'bg-amber-100' },
                  ]

                  const conditionBadge = (c) =>
                    c === 'Good' ? 'bg-green-100 text-green-700 border-green-200'
                    : c === 'Damaged' ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-red-100 text-red-700 border-red-200'

                  const toggleSelect = (id) => {
                    setSelectedReturns((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
                  }
                  const toggleSelectAll = () => {
                    if (selectedReturns.length === pendingFiltered.length) setSelectedReturns([])
                    else setSelectedReturns(pendingFiltered.map(a => a.id))
                  }
                  const handleSingleReturn = (row) => {
                    setReturnModalRow(row)
                    setReturnForm({ date: new Date().toISOString().slice(0,10), condition: 'Good', notes: '' })
                  }
                  const handleBulkReturn = () => {
                    if (selectedReturns.length === 0) return alert('Select at least one assignment to return')
                    if (!confirm(`Return ${selectedReturns.length} assets in bulk?`)) return
                    const newRecords = pending
                      .filter(a => selectedReturns.includes(a.id))
                      .map((a, i) => ({
                        id: `RT${4100 + returnedRecords.length + i}`,
                        assetId: a.assetId, assetName: a.assetName, employee: a.employee,
                        returnDate: today.split('-').reverse().join('-'),
                        condition: 'Good', notes: 'Bulk return',
                      }))
                    setReturnedRecords([...newRecords, ...returnedRecords])
                    setSelectedReturns([])
                    alert(`✓ ${newRecords.length} assets returned successfully`)
                  }
                  const submitReturn = () => {
                    const row = returnModalRow
                    const dateParts = returnForm.date.split('-')
                    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                    const newRecord = {
                      id: `RT${4100 + returnedRecords.length}`,
                      assetId: row.assetId, assetName: row.assetName, employee: row.employee,
                      returnDate: formattedDate, condition: returnForm.condition, notes: returnForm.notes || '-',
                    }
                    setReturnedRecords([newRecord, ...returnedRecords])
                    setSelectedReturns((prev) => prev.filter(x => x !== row.id))
                    setReturnModalRow(null)
                    setReturnTab('Recent')
                  }

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Return Assets</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span> Return Assets
                          </p>
                        </div>
                        {selectedReturns.length > 0 && (
                          <button
                            onClick={handleBulkReturn}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
                          >
                            <RotateCw className="w-4 h-4" />
                            Return Selected ({selectedReturns.length})
                          </button>
                        )}
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((s, i) => {
                          const Icon = s.icon
                          return (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                              <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center`}>
                                <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={2.2} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Table Card */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-gray-100 flex-wrap">
                          <div className="flex items-center gap-2">
                            {['Pending', 'Recent'].map((t) => (
                              <button
                                key={t}
                                onClick={() => { setReturnTab(t); setSelectedReturns([]) }}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                                  returnTab === t
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {t === 'Pending' ? 'Pending Returns' : 'Recent Returns'}
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${returnTab === t ? 'bg-white text-blue-600' : 'bg-white text-gray-700'}`}>
                                  {t === 'Pending' ? pending.length : returnedRecords.length}
                                </span>
                              </button>
                            ))}
                          </div>
                          <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={returnSearch}
                              onChange={(e) => setReturnSearch(e.target.value)}
                              placeholder="Search..."
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>

                        {/* PENDING TAB */}
                        {returnTab === 'Pending' && (
                          <div className="overflow-x-auto animate-in fade-in duration-200">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="px-6 py-3.5 text-left">
                                    <input
                                      type="checkbox"
                                      checked={pendingFiltered.length > 0 && selectedReturns.length === pendingFiltered.length}
                                      onChange={toggleSelectAll}
                                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                  </th>
                                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assignment</th>
                                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset</th>
                                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
                                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned</th>
                                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due</th>
                                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {pendingFiltered.length === 0 ? (
                                  <tr><td colSpan={9} className="px-6 py-12 text-center text-sm text-gray-500">All caught up — no pending returns</td></tr>
                                ) : pendingFiltered.map((a) => (
                                  <tr key={a.id} className={`hover:bg-gray-50 transition-colors ${selectedReturns.includes(a.id) ? 'bg-blue-50/50' : ''}`}>
                                    <td className="px-6 py-4">
                                      <input
                                        type="checkbox"
                                        checked={selectedReturns.includes(a.id)}
                                        onChange={() => toggleSelect(a.id)}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                      />
                                    </td>
                                    <td className="px-4 py-4 text-sm font-semibold text-blue-600">{a.id}</td>
                                    <td className="px-4 py-4">
                                      <button onClick={() => { setSelectedAssetId(a.assetId); setDetailsTab('Assignment History') }} className="text-left">
                                        <p className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">{a.assetName}</p>
                                        <p className="text-xs text-blue-600">{a.assetId}</p>
                                      </button>
                                    </td>
                                    <td className="px-4 py-4">
                                      <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                                          {a.employee.split(' ').map(n => n[0]).join('').slice(0,2)}
                                        </div>
                                        <div className="leading-tight">
                                          <p className="text-sm font-semibold text-gray-800">{a.employee}</p>
                                          <p className="text-xs text-gray-500">{a.empId}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{a.department}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{a.assignedDate}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{a.returnDate}</td>
                                    <td className="px-4 py-4">
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${a.status === 'Overdue' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                                        {a.status === 'Overdue' && <AlertTriangle className="w-3 h-3" />}
                                        {a.status}
                                      </span>
                                    </td>
                                    <td className="px-4 py-4">
                                      <div className="flex justify-center">
                                        <button
                                          onClick={() => handleSingleReturn(a)}
                                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
                                        >
                                          <RotateCw className="w-3.5 h-3.5" />
                                          Return
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* RECENT TAB */}
                        {returnTab === 'Recent' && (
                          <div className="overflow-x-auto animate-in fade-in duration-200">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Return ID</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Returned By</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Return Date</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Condition</th>
                                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {recentFiltered.length === 0 ? (
                                  <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">No returns yet</td></tr>
                                ) : recentFiltered.map((r) => (
                                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{r.id}</td>
                                    <td className="px-6 py-4">
                                      <button onClick={() => { setSelectedAssetId(r.assetId); setDetailsTab('Assignment History') }} className="text-left">
                                        <p className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">{r.assetName}</p>
                                        <p className="text-xs text-blue-600">{r.assetId}</p>
                                      </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{r.employee}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{r.returnDate}</td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${conditionBadge(r.condition)}`}>
                                        {r.condition}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={r.notes}>{r.notes}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Return Modal */}
                      {returnModalRow && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200" onClick={() => setReturnModalRow(null)}>
                          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                              <h3 className="text-lg font-bold text-gray-900">Return Asset</h3>
                              <button onClick={() => setReturnModalRow(null)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Returning</p>
                                <p className="text-sm font-bold text-gray-900 mt-1">{returnModalRow.assetName} <span className="text-blue-600">({returnModalRow.assetId})</span></p>
                                <p className="text-xs text-gray-600 mt-0.5">From: <span className="font-semibold">{returnModalRow.employee}</span> · {returnModalRow.department}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Return Date</label>
                                <input type="date" value={returnForm.date} onChange={(e) => setReturnForm({ ...returnForm, date: e.target.value })} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700" />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Asset Condition</label>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    { name: 'Good', color: 'green' },
                                    { name: 'Damaged', color: 'amber' },
                                    { name: 'Lost', color: 'red' },
                                  ].map((c) => {
                                    const active = returnForm.condition === c.name
                                    return (
                                      <button
                                        key={c.name}
                                        onClick={() => setReturnForm({ ...returnForm, condition: c.name })}
                                        className={`px-4 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                                          active
                                            ? c.color === 'green' ? 'border-green-500 bg-green-50 text-green-700'
                                              : c.color === 'amber' ? 'border-amber-500 bg-amber-50 text-amber-700'
                                              : 'border-red-500 bg-red-50 text-red-700'
                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        }`}
                                      >
                                        {c.name}
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Notes (optional)</label>
                                <textarea value={returnForm.notes} onChange={(e) => setReturnForm({ ...returnForm, notes: e.target.value })} rows={3} placeholder="Any observations on the returned asset..." className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 resize-none" />
                              </div>
                            </div>
                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                              <button onClick={() => setReturnModalRow(null)} className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors">
                                Cancel
                              </button>
                              <button onClick={submitReturn} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Confirm Return
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()
              ) : activeMenu === 'Asset Assignment' ? (
                (() => {
                  const filtered = dummyAssignments.filter((a) => {
                    const inFilter = assignFilter === 'All' || a.status === assignFilter
                    const q = assignSearch.toLowerCase()
                    const inSearch = !q || a.id.toLowerCase().includes(q) || a.assetName.toLowerCase().includes(q) || a.assetId.toLowerCase().includes(q) || a.employee.toLowerCase().includes(q) || a.department.toLowerCase().includes(q)
                    return inFilter && inSearch
                  })
                  const totalPages = Math.max(1, Math.ceil(filtered.length / ASSIGN_PER_PAGE))
                  const currentPage = Math.min(assignPage, totalPages)
                  const startIdx = (currentPage - 1) * ASSIGN_PER_PAGE
                  const pageRows = filtered.slice(startIdx, startIdx + ASSIGN_PER_PAGE)

                  const stats = [
                    { label: 'Total Assignments', value: dummyAssignments.length, icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-100' },
                    { label: 'Active', value: dummyAssignments.filter(a => a.status === 'Active').length, icon: CheckSquare, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                    { label: 'Returned', value: dummyAssignments.filter(a => a.status === 'Returned').length, icon: RotateCw, color: 'text-gray-500', bg: 'bg-gray-100' },
                    { label: 'Overdue', value: dummyAssignments.filter(a => a.status === 'Overdue').length, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' },
                  ]
                  const filters = ['All', 'Active', 'Returned', 'Overdue']
                  const statusBadge = (s) =>
                    s === 'Active' ? 'bg-green-100 text-green-700 border-green-200'
                    : s === 'Returned' ? 'bg-gray-100 text-gray-700 border-gray-200'
                    : 'bg-red-100 text-red-700 border-red-200'

                  const handleAssignSubmit = () => {
                    if (!newAssign.assetId || !newAssign.empId) {
                      alert('Please select an asset and an employee')
                      return
                    }
                    const asset = dummyAssets.find(a => a.id === newAssign.assetId)
                    const emp = dummyEmployees.find(e => e.id === newAssign.empId)
                    alert(`✓ ${asset?.name} assigned to ${emp?.name} (demo — not persisted)`)
                    setShowAssignModal(false)
                    setNewAssign({ assetId: '', empId: '', returnDate: '' })
                  }

                  return (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Asset Assignment</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Dashboard <span className="mx-1">/</span> Asset Assignment
                          </p>
                        </div>
                        <button
                          onClick={() => setShowAssignModal(true)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:-translate-y-0.5 transform"
                        >
                          <Plus className="w-4 h-4" />
                          Assign New Asset
                        </button>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((s, i) => {
                          const Icon = s.icon
                          return (
                            <div
                              key={i}
                              onClick={() => { setAssignFilter(s.label === 'Total Assignments' ? 'All' : s.label); setAssignPage(1) }}
                              className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                            >
                              <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center`}>
                                <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={2.2} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Table */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-gray-100 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            {filters.map((f) => (
                              <button
                                key={f}
                                onClick={() => { setAssignFilter(f); setAssignPage(1) }}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                                  assignFilter === f
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                          <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={assignSearch}
                              onChange={(e) => { setAssignSearch(e.target.value); setAssignPage(1) }}
                              placeholder="Search assignments..."
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assignment ID</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned Date</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Return Date</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {pageRows.length === 0 ? (
                                <tr>
                                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500">No assignments found</td>
                                </tr>
                              ) : (
                                pageRows.map((a) => (
                                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{a.id}</td>
                                    <td className="px-6 py-4">
                                      <button onClick={() => { setSelectedAssetId(a.assetId); setDetailsTab('Assignment History') }} className="text-left">
                                        <p className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">{a.assetName}</p>
                                        <p className="text-xs text-blue-600 font-medium">{a.assetId}</p>
                                      </button>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                                          {a.employee.split(' ').map(n => n[0]).join('').slice(0,2)}
                                        </div>
                                        <div className="leading-tight">
                                          <p className="text-sm font-semibold text-gray-800">{a.employee}</p>
                                          <p className="text-xs text-gray-500">{a.empId}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{a.department}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{a.assignedDate}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{a.returnDate}</td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${statusBadge(a.status)}`}>
                                        {a.status === 'Overdue' && <AlertTriangle className="w-3 h-3" />}
                                        {a.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => { setSelectedAssetId(a.assetId); setDetailsTab('Assignment History') }} title="View" className="w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                          <Eye className="w-4 h-4" />
                                        </button>
                                        {a.status === 'Active' || a.status === 'Overdue' ? (
                                          <button onClick={() => { if (confirm(`Mark ${a.assetName} as returned by ${a.employee}?`)) alert('Returned (demo)') }} title="Mark Returned" className="w-8 h-8 rounded-md bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow-sm">
                                            <RotateCw className="w-4 h-4" />
                                          </button>
                                        ) : (
                                          <button title="Already returned" disabled className="w-8 h-8 rounded-md bg-gray-200 text-gray-400 flex items-center justify-center cursor-not-allowed">
                                            <Check className="w-4 h-4" />
                                          </button>
                                        )}
                                        <button onClick={() => { if (confirm(`Delete assignment ${a.id}?`)) alert('Deleted (demo)') }} title="Delete" className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm">
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
                            Showing {filtered.length === 0 ? 0 : startIdx + 1} to {Math.min(startIdx + ASSIGN_PER_PAGE, filtered.length)} of {filtered.length} entries
                          </p>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setAssignPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                              <button key={p} onClick={() => setAssignPage(p)} className={`w-9 h-9 rounded-md text-sm font-semibold flex items-center justify-center transition-colors ${p === currentPage ? 'bg-blue-600 text-white shadow-sm' : 'border border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                                {p}
                              </button>
                            ))}
                            <button onClick={() => setAssignPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Assign Modal */}
                      {showAssignModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200" onClick={() => setShowAssignModal(false)}>
                          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                              <h3 className="text-lg font-bold text-gray-900">Assign New Asset</h3>
                              <button onClick={() => setShowAssignModal(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                              <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Select Asset <span className="text-red-500">*</span></label>
                                <div className="relative">
                                  <select value={newAssign.assetId} onChange={(e) => setNewAssign({ ...newAssign, assetId: e.target.value })} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 pr-10">
                                    <option value="">Choose available asset</option>
                                    {dummyAssets.filter(a => a.status === 'Available').map(a => (
                                      <option key={a.id} value={a.id}>{a.id} — {a.name} ({a.category})</option>
                                    ))}
                                  </select>
                                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Select Employee <span className="text-red-500">*</span></label>
                                <div className="relative">
                                  <select value={newAssign.empId} onChange={(e) => setNewAssign({ ...newAssign, empId: e.target.value })} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 pr-10">
                                    <option value="">Choose employee</option>
                                    {dummyEmployees.map(e => (
                                      <option key={e.id} value={e.id}>{e.id} — {e.name} ({e.department})</option>
                                    ))}
                                  </select>
                                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Expected Return Date</label>
                                <input type="date" value={newAssign.returnDate} onChange={(e) => setNewAssign({ ...newAssign, returnDate: e.target.value })} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700" />
                                <p className="text-xs text-gray-500 mt-1">Leave blank for indefinite assignment</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                              <button onClick={() => setShowAssignModal(false)} className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors">
                                Cancel
                              </button>
                              <button onClick={handleAssignSubmit} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                                <UserPlus className="w-4 h-4" />
                                Assign Asset
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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
              ) : activeMenu === 'Need Help?' ? (
                (() => {
                  const categories = ['All', 'Getting Started', 'Assets', 'Users & Roles', 'Maintenance', 'Reports', 'Security', 'Billing']
                  const filteredFaqs = helpFaqs.filter(f => {
                    const matchCat = helpCategory === 'All' || f.category === helpCategory
                    const q = helpSearch.toLowerCase().trim()
                    const matchQ = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
                    return matchCat && matchQ
                  })
                  const handleTicketSubmit = (e) => {
                    e.preventDefault()
                    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) return
                    setTicketSent(true)
                    setTimeout(() => {
                      setTicketSent(false)
                      setTicketForm({ subject: '', category: 'General Inquiry', priority: 'Medium', description: '' })
                    }, 3500)
                  }
                  return (
                    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-b from-blue-50/40 via-white to-white min-h-full">
                      {/* Hero */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1b4c] via-[#1e2d6b] to-blue-700 text-white px-6 md:px-10 py-10 md:py-12 shadow-xl">
                        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -right-20 bottom-0 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl"></div>
                        <div className="relative">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold mb-4">
                            <LifeBuoy className="w-3.5 h-3.5" />
                            Help & Support Center
                          </div>
                          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">Hello Admin, how can we help?</h1>
                          <p className="text-blue-100 text-sm md:text-base max-w-2xl mb-6">Search our knowledge base, browse FAQs, watch quick tutorials, or reach out to our support team — we usually reply within an hour.</p>
                          <div className="relative max-w-2xl">
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={helpSearch}
                              onChange={(e) => { setHelpSearch(e.target.value); setHelpTab('FAQs') }}
                              placeholder="Search for answers, e.g. 'How to add an asset?'"
                              className="w-full pl-12 pr-32 py-4 rounded-xl bg-white text-gray-900 text-sm shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 placeholder:text-gray-400"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-md">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quick contact strip */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { icon: Phone, label: 'Call Support', value: '+1 (800) 555-AMS-1', sub: 'Mon – Fri · 9 AM to 8 PM IST', accent: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-700' },
                          { icon: Mail, label: 'Email Us', value: 'support@ams.com', sub: 'Reply within 1 business hour', accent: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-700' },
                          { icon: MessageCircle, label: 'Live Chat', value: 'Start a conversation', sub: '3 agents online right now', accent: 'from-purple-500 to-fuchsia-600', bg: 'bg-purple-50', text: 'text-purple-700' },
                        ].map((c, i) => {
                          const Icon = c.icon
                          return (
                            <div key={i} className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                              <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.accent} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                                  <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{c.label}</div>
                                  <div className="text-base font-bold text-gray-900 mt-0.5 truncate">{c.value}</div>
                                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {c.sub}
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Tabs */}
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200 px-2 md:px-6 flex items-center gap-1 overflow-x-auto">
                          {[
                            { id: 'FAQs', label: 'FAQs', icon: HelpCircle, count: helpFaqs.length },
                            { id: 'Videos', label: 'Video Tutorials', icon: PlayCircle, count: helpVideos.length },
                            { id: 'Knowledge', label: 'Knowledge Base', icon: BookOpen, count: helpArticles.length },
                            { id: 'Ticket', label: 'Submit a Ticket', icon: Send, count: null },
                          ].map(t => {
                            const Icon = t.icon
                            const active = helpTab === t.id
                            return (
                              <button
                                key={t.id}
                                onClick={() => setHelpTab(t.id)}
                                className={`relative flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                              >
                                <Icon className="w-4 h-4" />
                                {t.label}
                                {t.count !== null && (
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{t.count}</span>
                                )}
                                {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t"></span>}
                              </button>
                            )
                          })}
                        </div>

                        <div className="p-6">
                          {/* FAQs Tab */}
                          {helpTab === 'FAQs' && (
                            <div>
                              <div className="flex flex-wrap gap-2 mb-5">
                                {categories.map(c => (
                                  <button
                                    key={c}
                                    onClick={() => setHelpCategory(c)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${helpCategory === c ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
                                  >
                                    {c}
                                  </button>
                                ))}
                              </div>

                              {filteredFaqs.length === 0 ? (
                                <div className="text-center py-16">
                                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                                    <Search className="w-7 h-7 text-gray-400" />
                                  </div>
                                  <h3 className="text-base font-semibold text-gray-900 mb-1">No results found</h3>
                                  <p className="text-sm text-gray-500">Try a different keyword or browse the knowledge base.</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {filteredFaqs.map((f) => {
                                    const open = helpOpenFaq === f.id
                                    return (
                                      <div key={f.id} className={`border rounded-xl transition-all duration-200 ${open ? 'border-blue-300 bg-blue-50/30 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                        <button
                                          onClick={() => setHelpOpenFaq(open ? null : f.id)}
                                          className="w-full flex items-center gap-4 px-5 py-4 text-left"
                                        >
                                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${open ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            <HelpCircle className="w-4 h-4" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">{f.category}</div>
                                            <div className="text-sm font-semibold text-gray-900">{f.q}</div>
                                          </div>
                                          <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-blue-600' : ''}`} />
                                        </button>
                                        {open && (
                                          <div className="px-5 pb-5 pl-[68px]">
                                            <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
                                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-blue-100">
                                              <span className="text-xs text-gray-500">Was this helpful?</span>
                                              <button className="text-xs font-semibold text-emerald-600 hover:underline">👍 Yes</button>
                                              <button className="text-xs font-semibold text-gray-500 hover:underline">👎 No</button>
                                              <span className="text-xs text-gray-300">·</span>
                                              <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                                                Open full article <ExternalLink className="w-3 h-3" />
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Videos Tab */}
                          {helpTab === 'Videos' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                              {helpVideos.map(v => (
                                <div key={v.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                  <div className={`relative h-40 ${v.thumb} flex items-center justify-center`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                                    <div className="relative w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                      <PlayCircle className="w-8 h-8 text-blue-600 fill-current" />
                                    </div>
                                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 text-white text-xs font-semibold">{v.duration}</div>
                                  </div>
                                  <div className="p-4">
                                    <h4 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{v.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Knowledge Base Tab */}
                          {helpTab === 'Knowledge' && (
                            <div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {helpArticles.map(a => (
                                  <div key={a.id} className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center flex-shrink-0">
                                      <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-700">{a.cat}</span>
                                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {a.read}</span>
                                      </div>
                                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{a.title}</h4>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                  </div>
                                ))}
                              </div>
                              <div className="mt-6 p-5 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <Globe className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-bold text-gray-900">Browse the full documentation</h4>
                                  <p className="text-xs text-gray-600">Over 120+ in-depth articles covering every feature of AMS.</p>
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors">
                                  Visit Docs <ExternalLink className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Submit a Ticket Tab */}
                          {helpTab === 'Ticket' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              <div className="lg:col-span-2">
                                {ticketSent ? (
                                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                                      <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Ticket submitted successfully!</h3>
                                    <p className="text-sm text-gray-600">Your ticket ID is <span className="font-mono font-bold text-emerald-700">#T{Math.floor(100000 + Math.random()*900000)}</span>. We will email you a confirmation shortly.</p>
                                  </div>
                                ) : (
                                  <form onSubmit={handleTicketSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                                    <div>
                                      <h3 className="text-base font-bold text-gray-900">Tell us what is going on</h3>
                                      <p className="text-xs text-gray-500 mt-0.5">Provide as much detail as possible so we can help you faster.</p>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
                                      <input
                                        type="text"
                                        value={ticketForm.subject}
                                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                                        placeholder="Brief summary of your issue"
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                                        <select
                                          value={ticketForm.category}
                                          onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                        >
                                          <option>General Inquiry</option>
                                          <option>Bug / Technical Issue</option>
                                          <option>Feature Request</option>
                                          <option>Billing & Subscription</option>
                                          <option>Account Access</option>
                                          <option>Integrations</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Priority</label>
                                        <div className="grid grid-cols-3 gap-2">
                                          {['Low', 'Medium', 'High'].map(p => (
                                            <button
                                              type="button"
                                              key={p}
                                              onClick={() => setTicketForm({ ...ticketForm, priority: p })}
                                              className={`px-2 py-2 rounded-lg text-xs font-semibold border transition-all ${ticketForm.priority === p ? (p === 'High' ? 'bg-red-50 border-red-300 text-red-700' : p === 'Medium' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-emerald-50 border-emerald-300 text-emerald-700') : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                            >
                                              {p}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Describe your issue <span className="text-red-500">*</span></label>
                                      <textarea
                                        value={ticketForm.description}
                                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                                        rows={6}
                                        placeholder="Steps to reproduce, what you expected vs what happened, screenshots / asset IDs etc."
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                      />
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                      <button type="button" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200">
                                        <UploadCloud className="w-4 h-4" />
                                        Attach files
                                      </button>
                                      <button
                                        type="submit"
                                        disabled={!ticketForm.subject.trim() || !ticketForm.description.trim()}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                      >
                                        <Send className="w-4 h-4" />
                                        Submit Ticket
                                      </button>
                                    </div>
                                  </form>
                                )}
                              </div>

                              <div className="space-y-4">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white shadow-lg">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Headphones className="w-5 h-5" />
                                    <h4 className="text-sm font-bold uppercase tracking-wider">Premium Support</h4>
                                  </div>
                                  <p className="text-xs text-blue-100 mb-4 leading-relaxed">Get priority access to a dedicated account manager, 24/7 phone support and quarterly business reviews.</p>
                                  <button className="w-full py-2 rounded-lg bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Upgrade Plan
                                  </button>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    Average response times
                                  </h4>
                                  <div className="space-y-3">
                                    {[
                                      { label: 'High priority', value: '< 15 min', color: 'bg-red-500', width: 'w-1/5' },
                                      { label: 'Medium priority', value: '< 1 hour', color: 'bg-amber-500', width: 'w-2/5' },
                                      { label: 'Low priority', value: '< 4 hours', color: 'bg-emerald-500', width: 'w-3/5' },
                                    ].map((r, i) => (
                                      <div key={i}>
                                        <div className="flex items-center justify-between text-xs mb-1">
                                          <span className="text-gray-600 font-medium">{r.label}</span>
                                          <span className="font-bold text-gray-900">{r.value}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                          <div className={`h-full ${r.color} ${r.width} rounded-full`}></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-500" />
                                    System status
                                  </h4>
                                  <div className="space-y-2.5 text-xs">
                                    {[
                                      { name: 'API Service', status: 'Operational' },
                                      { name: 'Database', status: 'Operational' },
                                      { name: 'File Storage', status: 'Operational' },
                                      { name: 'Email Delivery', status: 'Operational' },
                                    ].map((s, i) => (
                                      <div key={i} className="flex items-center justify-between">
                                        <span className="text-gray-600">{s.name}</span>
                                        <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                          {s.status}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                  <button className="w-full mt-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center gap-1.5">
                                    View status page <ExternalLink className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer / Community CTA */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow">
                            <Users className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">Join the AMS community</h4>
                            <p className="text-xs text-gray-500">Connect with 5,000+ asset managers, share tips, and shape the product roadmap.</p>
                          </div>
                          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold whitespace-nowrap">Join now</button>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow">
                            <Info className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">App version & changelog</h4>
                            <p className="text-xs text-gray-500">You are on AMS <span className="font-mono font-semibold text-gray-700">v3.4.1</span> — see what is new in the latest release.</p>
                          </div>
                          <button className="px-4 py-2 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 text-xs font-semibold whitespace-nowrap">View changelog</button>
                        </div>
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
