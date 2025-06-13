import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017")

export async function POST(request: Request) {
  try {
    const { userName, selectedColor, topics } = await request.json()

    if (!userName || !selectedColor || !topics || topics.length === 0) {
      return Response.json({ error: "Tüm alanlar gerekli" }, { status: 400 })
    }

    await client.connect()
    const db = client.db("topic-generator")
    const collection = db.collection("websites")

    const website = {
      userName,
      selectedColor,
      topics: topics.map((topic: any) => ({
        ...topic,
        createdAt: new Date(topic.createdAt),
        imageUrl: topic.imageUrl || null, // Include image URL
      })),
      createdAt: new Date(),
    }

    const result = await collection.insertOne(website)
    const websiteId = result.insertedId.toString()

    return Response.json({ websiteId })
  } catch (error) {
    console.error("Web sitesi oluşturma hatası:", error)
    return Response.json({ error: "Web sitesi oluşturulamadı" }, { status: 500 })
  } finally {
    await client.close()
  }
}
