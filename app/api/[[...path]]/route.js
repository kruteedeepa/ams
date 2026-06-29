import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const getCollection = async (name) => {
  const client = await clientPromise
  const db = client.db('ams')
  return db.collection(name)
}

const COLLECTIONS = ['assets', 'users', 'vendors', 'maintenances', 'assignments']

export async function GET(request, { params }) {
  const endpoint = params.path[0]
  if (endpoint === 'assets') {
    const assets = await db.collection('assets').find({}).toArray()
    const serialized = assets.map(a => ({
      ...a,
      _id: a._id.toString(),
      // Map your DB fields to what the UI expects
      id: a.id || a._id.toString(),
      name: a.Asset_Name || a.name || '',
      category: a.Asset_Type ? a.Asset_Type.charAt(0).toUpperCase() + a.Asset_Type.slice(1).toLowerCase() : 'Other',
      serial: a.Serial_No || a.serial || '',
      purchaseDate: a.Purchase_Date || a.purchaseDate || '',
      warranty: a.Warranty || a.warranty || '',
      status: a.Status || a.status || 'Available',
      assignedTo: a.assignedTo || '-',
      image: a.image || '',
      vendor: a.vendor || '',
      location: a.location || '',
      description: a.description || '',
      model: a.model || '',
      manufacturer: a.manufacturer || '',
      purchasePrice: a.purchasePrice || 0,
    }))
  return NextResponse.json(serialized)
}
  try {
    const col = await getCollection(endpoint)
    const data = await col.find({}).toArray()
    const serialized = data.map(d => ({ ...d, _id: d._id.toString() }))
    return NextResponse.json(serialized)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  const endpoint = params.path[0]
  if (!COLLECTIONS.includes(endpoint)) {
    return NextResponse.json({ success: false, error: 'Unknown endpoint' }, { status: 404 })
  }
  try {
    const body = await request.json()
    const col = await getCollection(endpoint)
    const result = await col.insertOne(body)
    return NextResponse.json({ success: true, id: result.insertedId.toString() })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  const endpoint = params.path[0]
  const id = params.path[1]
  if (!COLLECTIONS.includes(endpoint) || !id) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
  try {
    const body = await request.json()
    const col = await getCollection(endpoint)
    const { _id, ...updateData } = body
    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const endpoint = params.path[0]
  const id = params.path[1]
  if (!COLLECTIONS.includes(endpoint) || !id) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
  try {
    const col = await getCollection(endpoint)
    await col.deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}