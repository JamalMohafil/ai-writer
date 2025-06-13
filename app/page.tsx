"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, BookOpen, Plus, Eye, GraduationCap, Languages, Sparkles, Star, Zap, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const colors = [
  {
    name: "Yeşil",
    value: "green",
    class: "from-emerald-900 via-green-900 to-teal-900",
    accent: "from-emerald-400 to-teal-400",
  },
  {
    name: "Turuncu",
    value: "orange",
    class: "from-orange-900 via-red-900 to-pink-900",
    accent: "from-orange-400 to-pink-400",
  },
  {
    name: "Mavi",
    value: "blue",
    class: "from-blue-900 via-indigo-900 to-purple-900",
    accent: "from-blue-400 to-purple-400",
  },
  {
    name: "Sarı",
    value: "yellow",
    class: "from-yellow-900 via-orange-900 to-red-900",
    accent: "from-yellow-400 to-orange-400",
  },
  {
    name: "Kırmızı",
    value: "red",
    class: "from-red-900 via-pink-900 to-purple-900",
    accent: "from-red-400 to-pink-400",
  },
  {
    name: "Pembe",
    value: "pink",
    class: "from-pink-900 via-purple-900 to-indigo-900",
    accent: "from-pink-400 to-purple-400",
  },
]

interface Topic {
  id: string
  title: string
  content: string
  summary: string
  imageUrl?: string
  createdAt: Date
}

export default function HomePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [userName, setUserName] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [generateImage, setGenerateImage] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [topics, setTopics] = useState<Topic[]>([])
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const router = useRouter()
  const [imageGenerationError, setImageGenerationError] = useState("")

  const generateTopic = async () => {
    if (!title.trim()) return

    setIsGenerating(true)
    setIsGeneratingImage(generateImage)
    setImageGenerationError("")

    try {
      const response = await fetch("/api/generate-topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          generateImage,
        }),
      })

      if (!response.ok) throw new Error("Konu oluşturulamadı")

      const data = await response.json()
      setContent(data.content)

      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
        console.log("Image URL received:", data.imageUrl)
      } else if (generateImage) {
        setImageGenerationError("Görsel oluşturulamadı, ancak metin başarıyla oluşturuldu.")
      }
    } catch (error) {
      console.error("Konu oluşturma hatası:", error)
      alert("Konu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsGenerating(false)
      setIsGeneratingImage(false)
    }
  }

  const addTopic = () => {
    if (!title.trim() || !content.trim()) return

    const newTopic: Topic = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      summary: content.trim().substring(0, 150) + "...",
      imageUrl: imageUrl || undefined,
      createdAt: new Date(),
    }

    setTopics([...topics, newTopic])
    setTitle("")
    setContent("")
    setImageUrl("")
  }

  const createWebsite = async () => {
    if (!userName.trim() || !selectedColor || topics.length === 0) {
      alert("Lütfen tüm alanları doldurun ve en az bir konu ekleyin")
      return
    }

    try {
      const response = await fetch("/api/create-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          selectedColor,
          topics,
        }),
      })

      if (!response.ok) throw new Error("Web sitesi oluşturulamadı")

      const data = await response.json()
      router.push(`/website/${data.websiteId}`)
    } catch (error) {
      console.error("Web sitesi oluşturma hatası:", error)
      alert("Web sitesi oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.")
    }
  }

  const selectedColorData = colors.find((c) => c.value === selectedColor)
  const selectedColorClass = selectedColorData?.class || "from-slate-900 via-gray-900 to-black"
  const selectedAccentClass = selectedColorData?.accent || "from-blue-400 to-purple-400"

  return (
    <div className={`min-h-screen bg-gradient-to-br ${selectedColorClass} text-white relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/25 rounded-full animate-pulse"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-24 border border-white/5 rounded-full animate-pulse"></div>

        {/* Gradient Orbs */}
        <div
          className={`absolute top-10 right-10 w-40 h-40 bg-gradient-to-r ${selectedAccentClass} rounded-full blur-3xl opacity-20 animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r ${selectedAccentClass} rounded-full blur-2xl opacity-15 animate-bounce`}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10 p-6">
        {/* Header */}
        <div className="text-center space-y-8 py-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`p-4 bg-gradient-to-r ${selectedAccentClass} rounded-2xl shadow-2xl animate-bounce`}>
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div className={`p-4 bg-gradient-to-r ${selectedAccentClass} rounded-2xl shadow-2xl animate-pulse`}>
              <Languages className="h-10 w-10 text-white" />
            </div>
            <div className={`p-4 bg-gradient-to-r ${selectedAccentClass} rounded-2xl shadow-2xl animate-bounce`}>
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1
              className={`text-7xl font-black bg-gradient-to-r ${selectedAccentClass} bg-clip-text text-transparent animate-pulse`}
            >
              İngilizce Ödev Asistanı
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Star className={`h-6 w-6 text-yellow-400 animate-spin`} />
              <Star className={`h-8 w-8 text-yellow-300 animate-pulse`} />
              <Star className={`h-6 w-6 text-yellow-400 animate-spin`} />
            </div>
          </div>

          <p className="text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed font-light">
            🚀 Yapay zeka ile İngilizce ödevlerinizi çözün ve muhteşem web sitenizi oluşturun
          </p>

          <div
            className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${selectedAccentClass} rounded-full text-white font-semibold shadow-2xl animate-pulse`}
          >
            <BookOpen className="h-5 w-5" />
            <span>İngilizce Cevaplar • Türkçe Açıklamalar • AI Görseller</span>
            <Zap className="h-5 w-5" />
          </div>
        </div>

        {/* User Info Section */}
        <Card className="bg-black/40 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-2xl">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className={`bg-gradient-to-r ${selectedAccentClass} bg-clip-text text-transparent`}>
                Kullanıcı Bilgileri
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="userName" className="text-white font-semibold text-lg">
                  ✨ Adınız
                </Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Muhteşem adınızı girin"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 rounded-xl h-12 text-lg hover:border-white/50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="color" className="text-white font-semibold text-lg">
                  🎨 Web Sitesi Teması
                </Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white focus:bg-white/20 rounded-xl h-12 text-lg hover:border-white/50">
                    <SelectValue placeholder="Harika tema seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 backdrop-blur-xl">
                    {colors.map((color) => (
                      <SelectItem key={color.value} value={color.value} className="text-white hover:bg-white/10">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.class} border-2 border-white/30 shadow-lg`}
                          />
                          <span className="font-medium">{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topic Generation Section */}
        <Card className="bg-black/40 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-3 text-2xl">
              <BookOpen className={`h-7 w-7 text-blue-400 animate-pulse`} />
              <span className={`bg-gradient-to-r ${selectedAccentClass} bg-clip-text text-transparent`}>
                İngilizce Ödev Yardımı
              </span>
            </CardTitle>
            <CardDescription className="text-white/80 text-lg leading-relaxed">
              🎯 Ödev sorunuzu yazın - İngilizce cevap alın. Açıklama istiyorsanız "açıkla" yazın - Türkçe açıklama
              alın.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-white font-semibold text-lg">
                📝 Ödev Sorusu veya Konusu
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örnek: Write a paragraph about your future dreams / Past tense açıkla"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 rounded-xl h-14 text-lg hover:border-white/50"
              />
            </div>

            {/* Image Generation Option */}
            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
              <Checkbox
                id="generateImage"
                checked={generateImage}
                onCheckedChange={checked => setGenerateImage(checked === true)}
                className="border-white/30 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
              <Label htmlFor="generateImage" className="text-white font-medium text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />🎨 Konu için AI görsel oluştur
              </Label>
            </div>

            <Button
              onClick={generateTopic}
              disabled={!title.trim() || isGenerating}
              className={`w-full bg-gradient-to-r ${selectedAccentClass} hover:scale-105 text-white font-bold py-4 text-xl shadow-2xl transition-all duration-300 rounded-2xl h-16 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-2xl"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>{isGeneratingImage ? "✨ Metin ve görsel oluşturuluyor..." : "✨ Oluşturuluyor..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6" />
                    <span>🚀 Ödev Yardımı Al</span>
                  </>
                )}
              </div>
            </Button>

            {/* Generated Image Preview */}
            {imageUrl && (
              <div className="space-y-3">
                <Label className="text-white font-semibold text-lg">🖼️ Oluşturulan Görsel</Label>
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt="Generated topic image"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    onError={() => {
                      console.error("Image failed to load:", imageUrl)
                      setImageGenerationError("Görsel yüklenemedi")
                    }}
                  />
                </div>
              </div>
            )}

            {/* Image Generation Error */}
            {imageGenerationError && (
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-200 text-sm">⚠️ {imageGenerationError}</p>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="content" className="text-white font-semibold text-lg">
                ✨ Oluşturulan İçerik
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="🎉 Muhteşem ödev cevabınız veya açıklamanız burada görünecek..."
                className="min-h-[300px] bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 resize-none rounded-xl text-lg hover:border-white/50"
              />
            </div>

            <Button
              onClick={addTopic}
              disabled={!title.trim() || !content.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 font-bold py-4 text-xl shadow-2xl transition-all duration-300 rounded-2xl h-16"
            >
              <Plus className="mr-3 h-6 w-6" />🎯 Konuyu Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Topics Preview */}
        {topics.length > 0 && (
          <Card className="bg-black/40 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-3 text-2xl">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className={`bg-gradient-to-r ${selectedAccentClass} bg-clip-text text-transparent`}>
                  🎉 Eklenen Konular ({topics.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {topics.map((topic, index) => (
                <Card
                  key={topic.id}
                  className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 rounded-2xl shadow-xl"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-xl flex items-center gap-3">
                      <span
                        className={`w-8 h-8 bg-gradient-to-r ${selectedAccentClass} rounded-full flex items-center justify-center text-sm font-bold shadow-lg`}
                      >
                        {index + 1}
                      </span>
                      <span className="flex-1">{topic.title}</span>
                      <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
                    </CardTitle>

                    {/* Topic Image */}
                    {topic.imageUrl && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-white/20">
                        <Image
                          src={topic.imageUrl || "/placeholder.svg"}
                          alt={topic.title}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <CardDescription className="text-white/80 leading-relaxed text-base">
                      {expandedTopic === topic.id ? topic.content : topic.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                      className="border-white/30 text-white hover:bg-white/20 transition-all duration-300 rounded-xl"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {expandedTopic === topic.id ? "🙈 Gizle" : "👀 Daha fazla göster"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Debug Info - Remove this after testing */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-black/20 p-4 rounded-xl text-white/60 text-sm">
            Debug: Topics: {topics.length}, UserName: {userName ? "Yes" : "No"}, Color: {selectedColor ? "Yes" : "No"}
          </div>
        )}

        {/* Create Website Button */}
        {topics.length > 0 && userName.trim() && selectedColor && (
          <Card className="bg-black/40 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-3xl">
            <CardContent className="pt-8">
              <Button
                onClick={createWebsite}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:scale-105 text-white font-black py-6 text-2xl shadow-2xl transition-all duration-300 rounded-2xl h-20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-center gap-4">
                  <GraduationCap className="h-8 w-8" />
                  <span>🚀 Web Sitemi Oluştur</span>
                  <Sparkles className="h-8 w-8" />
                </div>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Developer Credit Footer */}
        <div className="text-center py-12 space-y-6">
          <div
            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${selectedAccentClass} rounded-full shadow-2xl`}
          >
            <span className="text-white font-bold text-lg">🎓 İngilizce öğreniminde başarılar dileriz!</span>
          </div>

          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <p className="text-white/90 text-lg mb-3">⚡ Bu muhteşem platform geliştirildi:</p>
            <a
              href="https://www.instagram.com/jamal_mohafil/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${selectedAccentClass} rounded-full text-white font-bold text-lg shadow-2xl hover:scale-110 transition-all duration-300`}
            >
              <span>👨‍💻 Jamal Mohafil</span>
              <span>📱 Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
