"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Share2, Star, Sparkles, BookOpen, Calendar, Home } from "lucide-react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"

interface Topic {
  id: string
  title: string
  content: string
  summary: string
  imageUrl?: string
  createdAt: Date
}

interface Website {
  id: string
  userName: string
  selectedColor: string
  topics: Topic[]
  createdAt: Date
}

const colors = {
  green: {
    bg: "from-emerald-900 via-green-900 to-teal-900",
    accent: "from-emerald-400 to-teal-400",
    card: "from-emerald-500/20 to-teal-500/20",
  },
  orange: {
    bg: "from-orange-900 via-red-900 to-pink-900",
    accent: "from-orange-400 to-pink-400",
    card: "from-orange-500/20 to-pink-500/20",
  },
  blue: {
    bg: "from-blue-900 via-indigo-900 to-purple-900",
    accent: "from-blue-400 to-purple-400",
    card: "from-blue-500/20 to-purple-500/20",
  },
  yellow: {
    bg: "from-yellow-900 via-orange-900 to-red-900",
    accent: "from-yellow-400 to-orange-400",
    card: "from-yellow-500/20 to-orange-500/20",
  },
  red: {
    bg: "from-red-900 via-pink-900 to-purple-900",
    accent: "from-red-400 to-pink-400",
    card: "from-red-500/20 to-pink-500/20",
  },
  pink: {
    bg: "from-pink-900 via-purple-900 to-indigo-900",
    accent: "from-pink-400 to-purple-400",
    card: "from-pink-500/20 to-purple-500/20",
  },
}

export default function WebsitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [website, setWebsite] = useState<Website | null>(null)
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWebsite()
  }, [id])

  const fetchWebsite = async () => {
    try {
      const response = await fetch(`/api/website/${id}`)
      if (!response.ok) throw new Error("Web sitesi yüklenemedi")

      const data = await response.json()
      setWebsite(data)
    } catch (error) {
      console.error("Web sitesi yükleme hatası:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics)
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId)
    } else {
      newExpanded.add(topicId)
    }
    setExpandedTopics(newExpanded)
  }

  const shareWebsite = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${website?.userName} Web Sitesi`,
          text: "İngilizce ödevlerimi görün",
          url: url,
        })
      } catch (error) {
        console.log("Paylaşım başarısız:", error)
      }
    } else {
      navigator.clipboard.writeText(url)
      alert("🎉 Link kopyalandı!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-white text-2xl font-bold animate-pulse">✨ Yükleniyor...</div>
        </div>
      </div>
    )
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-6xl animate-bounce">😔</div>
          <div className="text-white text-2xl font-bold">Web sitesi bulunamadı</div>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl">
              <Home className="mr-2 h-5 w-5" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const colorData = colors[website.selectedColor as keyof typeof colors] || colors.blue

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colorData.bg} text-white relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/25 rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-white/15 rounded-full animate-float"></div>

        {/* Gradient Orbs */}
        <div
          className={`absolute top-10 right-10 w-40 h-40 bg-gradient-to-r ${colorData.accent} rounded-full blur-3xl opacity-20 animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r ${colorData.accent} rounded-full blur-2xl opacity-15 animate-bounce`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r ${colorData.accent} rounded-full blur-xl opacity-10 animate-float`}
        ></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-24 border border-white/5 rounded-full animate-pulse"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 relative z-10 p-4 md:p-6">
        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Link href="/">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              <Home className="mr-2 h-4 w-4" />
              Ana Sayfa
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-6 md:space-y-8 py-8 md:py-12">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
            <div className={`p-3 md:p-4 bg-gradient-to-r ${colorData.accent} rounded-2xl shadow-2xl animate-bounce`}>
              <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <div className={`p-3 md:p-4 bg-gradient-to-r ${colorData.accent} rounded-2xl shadow-2xl animate-pulse`}>
              <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1
              className={`text-4xl md:text-6xl font-black bg-gradient-to-r ${colorData.accent} bg-clip-text text-transparent animate-pulse`}
            >
              {website.userName} Web Sitesi
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-400 animate-spin" />
              <Star className="h-6 w-6 md:h-8 md:w-8 text-yellow-300 animate-pulse" />
              <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-400 animate-spin" />
            </div>
          </div>

          <p className="text-lg md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed font-light">
            🎯 Özel konular koleksiyonu ({website.topics.length} muhteşem konu)
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Button
              onClick={shareWebsite}
              className={`bg-gradient-to-r ${colorData.accent} hover:scale-110 text-white font-bold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-2xl transition-all duration-300 rounded-2xl border-0`}
            >
              <Share2 className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />🚀 Web sitesini paylaş
            </Button>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 md:gap-8">
          {website.topics.map((topic, index) => {
            const isExpanded = expandedTopics.has(topic.id)
            return (
              <Card
                key={topic.id}
                className="bg-black/40 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${colorData.accent}`}></div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-xl md:text-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                    <span
                      className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${colorData.accent} rounded-full flex items-center justify-center text-sm md:text-lg font-bold shadow-lg flex-shrink-0`}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 break-words">{topic.title}</span>
                    <div className="flex gap-2 flex-shrink-0">
                      <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-400 animate-pulse" />
                      <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-blue-400 animate-bounce" />
                    </div>
                  </CardTitle>
                  <CardDescription className="text-white/80 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-base md:text-lg">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                    <span>
                      Oluşturulma tarihi:{" "}
                      {new Date(topic.createdAt).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 md:space-y-6">
                  {/* Topic Image */}
                  {topic.imageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                      <Image
                        src={topic.imageUrl || "/placeholder.svg"}
                        alt={topic.title}
                        width={800}
                        height={600}
                        className="w-full h-64 md:h-80 object-contain"
                      />
                    </div>
                  )}

                  <div className={`p-4 md:p-6 bg-gradient-to-r ${colorData.card} rounded-2xl border border-white/10`}>
                    <div className="text-white/95 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                      {isExpanded ? topic.content : topic.summary}
                    </div>
                  </div>

                  <Button
                    onClick={() => toggleTopic(topic.id)}
                    className={`bg-gradient-to-r ${colorData.accent} hover:scale-110 text-white font-bold px-4 md:px-6 py-2 md:py-3 shadow-xl transition-all duration-300 rounded-xl border-0`}
                  >
                    {isExpanded ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4 md:h-5 md:w-5" />🙈 Gizle
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4 md:h-5 md:w-5" />👀 Daha fazla göster
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Developer Credit Footer */}
        <div className="text-center py-8 md:py-12 space-y-6">
          <div
            className={`inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${colorData.accent} rounded-full shadow-2xl animate-pulse`}
          >
            <span className="text-white font-bold text-base md:text-lg">
              🎓 Bu web sitesi Akıllı İngilizce Ödev Asistanı ile oluşturulmuştur
            </span>
          </div>

          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/20">
            <p className="text-white/90 text-base md:text-lg mb-3">⚡ Bu muhteşem platform geliştirildi:</p>
            <a
              href="https://www.instagram.com/jamal_mohafil/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${colorData.accent} rounded-full text-white font-bold text-base md:text-lg shadow-2xl hover:scale-110 transition-all duration-300`}
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
