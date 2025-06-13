import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  try {
    const { title, generateImage = false } = await request.json()

    if (!title) {
      return Response.json({ error: "Başlık gerekli" }, { status: 400 })
    }

    // Analyze the request to understand what the user wants
    const lowerTitle = title.toLowerCase()

    // Check if asking for explanation in Turkish
    const isExplanationRequest =
      lowerTitle.includes("açıkla") ||
      lowerTitle.includes("explain") ||
      lowerTitle.includes("nasıl") ||
      lowerTitle.includes("nedir") ||
      lowerTitle.includes("anlat") ||
      lowerTitle.includes("anlatır") ||
      lowerTitle.includes("örnekle")

    // Extract word count if specified
    const wordCountMatch = title.match(/(\d+)\s*(kelime|word|sözcük)/i)
    const requestedWordCount = wordCountMatch ? Number.parseInt(wordCountMatch[1]) : null

    // Detect content type
    const contentType = detectContentType(lowerTitle)

    // Detect difficulty level
    const difficultyLevel = detectDifficultyLevel(lowerTitle)

    let prompt = ""
    let imageUrl = null

    if (isExplanationRequest) {
      // Turkish explanation
      prompt = `Aşağıdaki İngilizce konusu hakkında Türkçe olarak detaylı bir açıklama yap: "${title}"
      
      Açıklama şu özelliklere sahip olmalı:
      - Türkçe olarak yazılmış ve anlaşılır
      - Öğretici ve pratik örneklerle desteklenmiş
      - Gramer kuralları varsa net bir şekilde açıklanmış
      - Günlük hayattan örnekler içeren
      - Yaygın hatalar ve bunlardan kaçınma yolları
      - Pratik kullanım ipuçları
      - Öğrenci seviyesine uygun
      
      ${difficultyLevel !== "intermediate" ? `Seviye: ${getDifficultyInTurkish(difficultyLevel)} seviyesinde açıkla.` : ""}
      
      Açıklamayı doğrudan yaz, ek başlık kullanma.`
    } else {
      // English homework help
      const wordCountInstruction = requestedWordCount
        ? `The response should be approximately ${requestedWordCount} words.`
        : getDefaultWordCount(contentType)

      prompt = `Help with this English ${contentType} assignment: "${title}"
      
      Provide a well-written response in English that:
      - Is written in proper, natural English
      - Has excellent grammar and varied vocabulary
      - Is appropriate for ${difficultyLevel} level students
      - ${getContentStructure(contentType)}
      - ${wordCountInstruction}
      - Uses varied sentence structures and transitions
      - Is original, engaging, and educational
      - Includes relevant examples and details
      - Has a clear and logical flow
      
      ${getSpecialInstructions(contentType, lowerTitle)}
      
      Write the content directly without additional titles or headers.`
    }

    // Generate text content
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
    })

    // Generate image if requested (using a placeholder for now)
    if (generateImage && !isExplanationRequest) {
      try {
        // For now, we'll use a placeholder image service
        // You can replace this with actual Fal AI integration later
        const imagePrompt = createImagePrompt(title, contentType)

        // Using a placeholder image service that generates images based on text
        const encodedPrompt = encodeURIComponent(imagePrompt)
        imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&seed=${Math.floor(Math.random() * 1000)}`

        console.log("Generated image URL:", imageUrl)
      } catch (imageError) {
        console.error("Resim oluşturma hatası:", imageError)
        // Continue without image if generation fails
      }
    }

    return Response.json({
      content: text,
      imageUrl: imageUrl,
    })
  } catch (error) {
    console.error("Konu oluşturma hatası:", error)
    return Response.json({ error: "Konu oluşturulamadı" }, { status: 500 })
  }
}

function createImagePrompt(title: string, contentType: string): string {
  const basePrompt = "A beautiful, educational, and inspiring illustration representing"

  // Clean the title for image generation
  const cleanTitle = title.replace(/write|essay|paragraph|story|letter/gi, "").trim()

  let stylePrompt = ""

  switch (contentType) {
    case "story":
      stylePrompt = "in a storytelling illustration style, colorful and imaginative"
      break
    case "essay":
      stylePrompt = "in an academic and professional style, clean and modern"
      break
    case "letter":
      stylePrompt = "in a communication theme, warm and friendly"
      break
    case "description":
      stylePrompt = "in a detailed and realistic style, vivid and clear"
      break
    default:
      stylePrompt = "in a modern educational style, bright and engaging"
  }

  return `${basePrompt} "${cleanTitle}" ${stylePrompt}, high quality, professional, suitable for educational content, 4K resolution`
}

function detectContentType(title: string): string {
  if (title.includes("essay") || title.includes("makale") || title.includes("deneme")) {
    return "essay"
  }
  if (title.includes("letter") || title.includes("mektup") || title.includes("email")) {
    return "letter"
  }
  if (title.includes("story") || title.includes("hikaye") || title.includes("öykü")) {
    return "story"
  }
  if (title.includes("paragraph") || title.includes("paragraf") || title.includes("fıkra")) {
    return "paragraph"
  }
  if (title.includes("dialogue") || title.includes("conversation") || title.includes("diyalog")) {
    return "dialogue"
  }
  if (title.includes("report") || title.includes("rapor")) {
    return "report"
  }
  if (title.includes("review") || title.includes("değerlendirme") || title.includes("eleştiri")) {
    return "review"
  }
  if (title.includes("speech") || title.includes("konuşma") || title.includes("sunum")) {
    return "speech"
  }
  if (title.includes("description") || title.includes("tanımlama") || title.includes("betimleme")) {
    return "description"
  }
  return "general writing"
}

function detectDifficultyLevel(title: string): string {
  if (
    title.includes("beginner") ||
    title.includes("başlangıç") ||
    title.includes("temel") ||
    title.includes("basic") ||
    title.includes("simple") ||
    title.includes("easy")
  ) {
    return "beginner"
  }
  if (
    title.includes("advanced") ||
    title.includes("ileri") ||
    title.includes("üst") ||
    title.includes("difficult") ||
    title.includes("complex") ||
    title.includes("zor")
  ) {
    return "advanced"
  }
  return "intermediate"
}

function getDifficultyInTurkish(level: string): string {
  switch (level) {
    case "beginner":
      return "başlangıç"
    case "advanced":
      return "ileri"
    default:
      return "orta"
  }
}

function getDefaultWordCount(contentType: string): string {
  switch (contentType) {
    case "essay":
      return "The response should be 300-500 words."
    case "paragraph":
      return "The response should be 100-150 words."
    case "letter":
      return "The response should be 200-300 words."
    case "story":
      return "The response should be 250-400 words."
    case "dialogue":
      return "The response should be 150-250 words."
    case "report":
      return "The response should be 300-400 words."
    case "review":
      return "The response should be 200-300 words."
    case "speech":
      return "The response should be 250-350 words."
    case "description":
      return "The response should be 150-200 words."
    default:
      return "The response should be 200-300 words."
  }
}

function getContentStructure(contentType: string): string {
  switch (contentType) {
    case "essay":
      return "Includes a clear introduction with thesis statement, well-developed body paragraphs, and a strong conclusion"
    case "paragraph":
      return "Has a clear topic sentence, supporting details, and concluding sentence"
    case "letter":
      return "Follows proper letter format with greeting, body paragraphs, and appropriate closing"
    case "story":
      return "Has engaging characters, clear setting, plot development, and satisfying resolution"
    case "dialogue":
      return "Features natural conversation with proper dialogue formatting and character development"
    case "report":
      return "Presents information clearly with introduction, findings, and recommendations"
    case "review":
      return "Provides balanced evaluation with specific examples and clear judgment"
    case "speech":
      return "Has attention-grabbing opening, clear main points, and memorable conclusion"
    case "description":
      return "Uses vivid sensory details and descriptive language to create clear mental images"
    default:
      return "Has clear structure with introduction, development, and conclusion"
  }
}

function getSpecialInstructions(contentType: string, title: string): string {
  let instructions = ""

  // Add specific instructions based on content type
  switch (contentType) {
    case "essay":
      instructions += "Use formal academic tone and provide strong arguments with evidence."
      break
    case "letter":
      if (title.includes("formal") || title.includes("resmi")) {
        instructions += "Use formal language and professional tone."
      } else if (title.includes("informal") || title.includes("arkadaş")) {
        instructions += "Use friendly, casual tone while maintaining proper structure."
      }
      break
    case "story":
      instructions += "Create engaging characters and use descriptive language to bring the story to life."
      break
    case "dialogue":
      instructions += "Make the conversation sound natural and realistic with proper punctuation."
      break
  }

  // Add topic-specific instructions
  if (title.includes("future") || title.includes("gelecek")) {
    instructions += " Focus on future plans and aspirations using appropriate future tenses."
  }
  if (title.includes("past") || title.includes("geçmiş")) {
    instructions += " Use past tenses effectively to describe past events and experiences."
  }
  if (title.includes("opinion") || title.includes("görüş")) {
    instructions += " Express clear opinions with supporting reasons and examples."
  }
  if (title.includes("compare") || title.includes("karşılaştır")) {
    instructions += " Use comparison structures and contrast different aspects clearly."
  }
  if (title.includes("environment") || title.includes("çevre")) {
    instructions += " Include relevant environmental issues and solutions."
  }
  if (title.includes("technology") || title.includes("teknoloji")) {
    instructions += " Discuss modern technology and its impact on daily life."
  }

  return instructions
}
