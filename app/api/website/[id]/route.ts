import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017")

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "معرف غير صحيح" }, { status: 400 })
    }

    await client.connect()
    const db = client.db("topic-generator")
    const collection = db.collection("websites")

    const website = await collection.findOne({ _id: new ObjectId(id) })

    if (!website) {
      return Response.json({ error: "الموقع غير موجود" }, { status: 404 })
    }

    return Response.json({
      id: website._id.toString(),
      userName: website.userName,
      selectedColor: website.selectedColor,
      topics: website.topics,
      createdAt: website.createdAt,
    })
  } catch (error) {
    console.error("خطأ في تحميل الموقع:", error)
    return Response.json({ error: "فشل في تحميل الموقع" }, { status: 500 })
  } finally {
    await client.close()
  }
}
