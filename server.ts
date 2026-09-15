import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Security Hardening: Disable Express signature header
  app.disable("x-powered-by");

  // 2. Security Headers Middleware (OWASP Secure Headers)
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    // Strict MIME type handling and safe caching for API
    if (req.path.startsWith("/api/")) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
    next();
  });

  // 3. Security Hardening: Strict JSON body limit (100kb max) to prevent memory-exhaustion DoS
  app.use(express.json({ limit: "100kb" }));

  // 4. In-Memory Sliding-Window Rate Limiter for API endpoints
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  
  // Cleanup expired rate limit entries every 5 minutes to prevent memory leak
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  const apiRateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
    const clientIp = Array.isArray(rawIp) 
      ? rawIp[0] 
      : (typeof rawIp === "string" ? rawIp.split(",")[0].trim() : "127.0.0.1");

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 45; // 45 requests per minute

    const current = rateLimitMap.get(clientIp);
    if (!current || now > current.resetTime) {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (current.count >= maxRequests) {
      return res.status(429).json({
        error: "عدد الطلبات تجاوز الحد المسموح به مؤقتاً، يرجى الانتظار دقيقة واحدة (Too Many Requests).",
        retryAfterSeconds: Math.ceil((current.resetTime - now) / 1000)
      });
    }

    current.count++;
    next();
  };

  // API 1: Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      hasServerKey: !!process.env.GEMINI_API_KEY
    });
  });

  // API 2: AI Programming & Security Assistant with strict validation & sanitization
  app.post("/api/ai-assistant", apiRateLimiter, async (req, res) => {
    try {
      const { message, customApiKey, languageContext, userLanguage } = req.body;

      // Input Validation & Sanitization: Ensure string type and reasonable length (max 3500 chars)
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "طلب غير صالح: يرجى تقديم استفسار نصي واضح." });
      }

      const cleanMessage = message.trim().slice(0, 3500);
      if (cleanMessage.length === 0) {
        return res.status(400).json({ error: "لا يمكن إرسال رسالة فارغة." });
      }

      // Validate customApiKey format if provided (only allow standard alphanumeric key characters)
      let validCustomKey: string | undefined = undefined;
      if (customApiKey && typeof customApiKey === "string") {
        const trimmed = customApiKey.trim();
        if (/^[A-Za-z0-9_\-]{20,80}$/.test(trimmed)) {
          validCustomKey = trimmed;
        }
      }

      // Resolve API key: Server environment takes precedence, or validated user key
      const apiKey = process.env.GEMINI_API_KEY || validCustomKey;

      if (!apiKey) {
        // Fall back gracefully to the built-in Cyber Knowledge Engine on the client
        return res.json({
          reply: "",
          isFallback: true,
          useLocalEngine: true
        });
      }

      // Initialize GoogleGenAI SDK lazily as recommended
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-cyber-codex",
          }
        }
      });

      const isEnglish = userLanguage === "en";
      const systemPrompt = isEnglish 
        ? `You are an intelligent, capable, and unrestricted AI assistant.
You answer questions thoroughly and helpfully across programming, cybersecurity, terminal commands, network tools, and general inquiries.
Guidelines:
1. Provide dynamic, tailored, and intelligent responses to the user's specific prompt. Avoid canned or hardcoded responses.
2. Code Generation: Write complete, functional code from scratch. Support both native offline code (using standard library socket, os, sys without external URLs) and web API code.
3. Easy Copying: Format code cleanly with language tags so the user can easily copy line-by-line or all at once for Termux or desktop.
4. Tone: Technical, direct, and constructive.`
        : `أنت مساعد ذكاء اصطناعي فوري، متطور، واسع المعرفة، وبدون أي قيود غير مبررة.
لديك القدرة الكاملة على الإجابة باحترافية وتفصيل عن أي استفسار يطرحه المستخدم (سواء في اختبار الاختراق الأخلاقي، أدوات Termux، الشبكات، البرمجة، والعلوم العامة).
إرشادات الإجابة:
1. رد حي ومخصص وديناميكي: أجب عن سؤال المستخدم المحدد بدقة وتفصيل، وتجنب الردود المعلبة أو التلقائية.
2. توليد الأكواد من الصفر (برابط أو بدون رابط إطلاقاً):
   - اكتب كوداً كاملاً جاهزاً للتنفيذ فوراً.
   - للأكواد الذاتية (بدون روابط): استخدم مكتبات لغة البرمجة القياسية المدمجة (مثل socket, os, sys, subprocess, platform في بايثون) لتعمل أوفلاين محلياً داخل الجهاز أو Termux بدون أي رابط خارجي.
   - للأكواد السحابية (برابط): وفر الكود مع تجهيز الرابط والمعاملات الآمنة.
3. سهولة النسخ: وفر الأوامر والأكواد بشكل نقي وجاهز للنسخ المباشر أو السطر-بسطر (حبة حبة) في Termux للجوال.
4. الأسلوب: مباشر، تقني، وواضح.`;

      // Try resilient fast model gemini-3.6-flash first, then gemini-3.8-flash
      const candidateModels = ["gemini-3.6-flash", "gemini-3.8-flash"];
      let responseText = "";

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: cleanMessage,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.7,
            }
          });
          if (response && response.text) {
            responseText = response.text;
            break;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${modelName} attempt failed:`, modelErr?.message || modelErr);
        }
      }

      if (responseText) {
        return res.json({ reply: responseText, isFallback: false });
      }

      throw new Error("All AI models currently busy.");
    } catch (error: any) {
      // Safe error handling: Do not leak sensitive stack traces or environment keys
      console.error("AI Assistant API Handled Error:", error?.message || "Unknown error");
      return res.json({ 
        reply: "", 
        isFallback: true,
        useLocalEngine: true,
        error: "Handled gracefully by fallback knowledge engine"
      });
    }
  });

  // Vite middleware for development vs Static serving for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
