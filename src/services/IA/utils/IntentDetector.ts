import { IntentType, IntentRedirectTo, IntentData } from "../models/DataRequirements";

export class IntentDetector {
    private static readonly INTENT_PATTERNS = {
        packages: [
            'paquetes', 'paquete', 'tours', 'tour', 'viajes', 'viaje', 'excursiones', 'excursión',
            'paquetes turísticos', 'tours combinados', 'experiencias completas', 'viajes organizados'
        ],
        products: [
            'productos', 'producto', 'artesanías', 'artesanía', 'souvenirs', 'souvenir', 'regalos', 'regalo',
            'manualidades', 'manualidad', 'artículos', 'artículo', 'compras', 'compra', 'tienda'
        ],
        experiences: [
            'experiencias', 'experiencia', 'actividades', 'actividad', 'talleres', 'taller', 'eventos', 'evento',
            'cursos', 'curso', 'clases', 'clase', 'aprendizaje', 'aprender', 'vivir', 'vivencia'
        ],
        categories: [
            'categorías', 'categoría', 'tipos', 'tipo', 'clases de', 'qué hay', 'qué tienen', 'opciones',
            'variedades', 'variedad', 'clasificación', 'clasificar'
        ],
        top_products_by_experience: [
            'productos más vendidos', 'top productos', 'productos que más se venden', 'top 3 productos', 'productos más populares',
            'qué productos vendo más', 'productos más vendidos experiencia', 'productos más vendidos de mi experiencia', 'productos más vendidos en la experiencia', 'top productos experiencia'
        ],
        total_income_by_experience: [
            'cuánto dinero he generado', 'total de ingresos', 'cuánto he vendido', 'ingresos generados', 'cuánto dinero he ganado',
            'total ingresos experiencia', 'ingresos experiencia', 'dinero generado experiencia', 'ganancias experiencia', 'ventas totales experiencia'
        ]
    };

    private static readonly CONFIDENCE_THRESHOLDS = {
        HIGH: 0.8,
        MEDIUM: 0.6,
        LOW: 0.4
    };

        static detectIntent(prompt: string, context?: string): IntentData {
        const lowerPrompt = prompt.toLowerCase();
        let bestIntent: IntentType = 'none';
        let bestConfidence = 0;
        let bestRedirectTo: IntentRedirectTo = 'none';

        // Detectar palabras clave directas primero
        const directIntent = this.detectDirectIntent(lowerPrompt);
        if (directIntent.type !== 'none') {
            return directIntent;
        }

        // Si es una respuesta afirmativa simple y hay contexto, usar el contexto
        if (this.isSimpleAffirmative(lowerPrompt) && context) {
            const contextIntent = this.detectIntentFromContext(context);
            if (contextIntent.type !== 'none') {
                return contextIntent;
            }
        }

        // Detectar intenciones específicas
        for (const [intentType, patterns] of Object.entries(this.INTENT_PATTERNS)) {
            const confidence = this.calculateConfidence(lowerPrompt, patterns);
            
            if (confidence > bestConfidence) {
                bestConfidence = confidence;
                bestIntent = intentType as IntentType;
                bestRedirectTo = this.mapIntentToRedirect(intentType as IntentType);
            }
        }

        // Si la confianza es muy baja, no detectar intención
        if (bestConfidence < this.CONFIDENCE_THRESHOLDS.LOW) {
            return this.createNoIntentResponse();
        }

        return {
            type: bestIntent,
            confidence: bestConfidence,
            redirectTo: bestRedirectTo,
            message: this.generateIntentMessage(bestIntent, bestConfidence),
            buttonText: this.generateButtonText(bestIntent)
        };
    }

    private static detectDirectIntent(prompt: string): IntentData {
        const lowerPrompt = prompt.trim().toLowerCase();
        
        // Detectar palabras clave directas
        if (lowerPrompt === 'experiencias' || lowerPrompt === 'experiencia') {
            return {
                type: 'experiences',
                confidence: 0.95,
                redirectTo: 'show_experiences',
                message: "¡Perfecto! Te muestro las experiencias.",
                buttonText: "Ver experiencias"
            };
        }
        
        if (lowerPrompt === 'productos' || lowerPrompt === 'producto') {
            return {
                type: 'products',
                confidence: 0.95,
                redirectTo: 'show_products',
                message: "¡Perfecto! Para ver nuestros productos, primero elige una categoría.",
                buttonText: "Ver categorías"
            };
        }
        
        if (lowerPrompt === 'paquetes' || lowerPrompt === 'paquete') {
            return {
                type: 'packages',
                confidence: 0.95,
                redirectTo: 'show_packages',
                message: "¡Perfecto! Te muestro los paquetes.",
                buttonText: "Ver paquetes"
            };
        }
        
        if (lowerPrompt === 'categorías' || lowerPrompt.includes('categoria') || lowerPrompt.includes('categorias')) {
            return {
                type: 'categories',
                confidence: 0.95,
                redirectTo: 'show_categories',
                message: "¡Claro! Te muestro las categorías.",
                buttonText: "Ver categorías"
            };
        }
        
        // Detección directa para top productos más vendidos por experiencia
        if (
            lowerPrompt.includes('productos más vendidos') ||
            lowerPrompt.includes('top productos') ||
            lowerPrompt.includes('top 3 productos') ||
            lowerPrompt.includes('productos que más se venden')
        ) {
            return {
                type: 'top_products_by_experience',
                confidence: 0.95,
                redirectTo: 'show_top_products_by_experience',
                message: 'Aquí tienes el top de productos más vendidos de tu experiencia.',
                buttonText: 'Ver top productos'
            };
        }
        // Detección directa para total de ingresos por experiencia
        if (
            lowerPrompt.includes('cuánto dinero he generado') ||
            lowerPrompt.includes('total de ingresos') ||
            lowerPrompt.includes('ingresos generados') ||
            lowerPrompt.includes('cuánto he vendido') ||
            lowerPrompt.includes('cuánto dinero he ganado')
        ) {
            return {
                type: 'total_income_by_experience',
                confidence: 0.95,
                redirectTo: 'show_total_income_by_experience',
                message: 'Aquí tienes el total de ingresos generados por tu experiencia.',
                buttonText: 'Ver ingresos'
            };
        }
        
        // Detección directa para recomendaciones generales
        if (
            lowerPrompt.includes('qué me recomiendas') ||
            lowerPrompt.includes('que me recomiendas') ||
            lowerPrompt.includes('qué me puedes recomendar') ||
            lowerPrompt.includes('que me puedes recomendar') ||
            lowerPrompt.includes('qué recomiendas de este sitio') ||
            lowerPrompt.includes('que recomiendas de este sitio') ||
            lowerPrompt.includes('recomiéndame') ||
            lowerPrompt.includes('recomiendame') ||
            lowerPrompt.includes('que recomiendas')

        ) {
            return {
                type: 'experiences',
                confidence: 0.95,
                redirectTo: 'show_experiences',
                message: 'Presiona el boton para ver las experiencias',
                buttonText: 'Ver experiencias'
            };
        }
        
        return this.createNoIntentResponse();
    }

    private static isSimpleAffirmative(prompt: string): boolean {
        const affirmatives = ["sí", "si", "ok", "dale", "claro", "bueno", "perfecto", "vale"];
        return affirmatives.includes(prompt.trim());
    }

    private static detectIntentFromContext(context: string): IntentData {
        const lowerContext = context.toLowerCase();

        // Si el contexto menciona opciones generales (después de "no se"), 
        // devolver intención de mostrar experiencias por defecto
        if (lowerContext.includes('opciones') || lowerContext.includes('explorar') ||
            lowerContext.includes('descubrir') || lowerContext.includes('ayudarte')) {
            return {
                type: 'experiences',
                confidence: 0.8,
                redirectTo: 'show_experiences',
                message: "¡Perfecto! Te muestro las experiencias.",
                buttonText: "Ver experiencias"
            };
        }

        // Buscar la intención más específica en el contexto
        // Priorizar palabras más específicas sobre generales

        if (lowerContext.includes('paquetes') || lowerContext.includes('tours')) {
            return {
                type: 'packages',
                confidence: 0.9,
                redirectTo: 'show_packages',
                message: "¡Perfecto! Te muestro los paquetes.",
                buttonText: "Ver paquetes"
            };
        }

        if (lowerContext.includes('productos') || lowerContext.includes('artesanías')) {
            return {
                type: 'products',
                confidence: 0.9,
                redirectTo: 'show_categories',
                message: "¡Perfecto! Para ver nuestros productos, primero elige una categoría.",
                buttonText: "Ver categorías"
            };
        }

        if (lowerContext.includes('experiencias') || lowerContext.includes('actividades')) {
            return {
                type: 'experiences',
                confidence: 0.9,
                redirectTo: 'show_experiences',
                message: "¡Perfecto! Te muestro las experiencias.",
                buttonText: "Ver experiencias"
            };
        }

        return this.createNoIntentResponse();
    }

    private static calculateConfidence(prompt: string, patterns: string[]): number {
        let matches = 0;
        let totalPatterns = patterns.length;

        for (const pattern of patterns) {
            if (prompt.includes(pattern)) {
                matches++;
            }
        }

        // Calcular confianza basada en coincidencias
        const baseConfidence = matches / totalPatterns;

        // Ajustar confianza basada en la longitud del prompt
        const lengthFactor = Math.min(prompt.length / 50, 1); // Normalizar por longitud

        // Ajustar confianza basada en palabras clave adicionales
        const keywordBonus = this.calculateKeywordBonus(prompt);

        return Math.min(baseConfidence * 0.7 + lengthFactor * 0.2 + keywordBonus * 0.1, 1);
    }

    private static calculateKeywordBonus(prompt: string): number {
        const positiveKeywords = ['quiero', 'deseo', 'busco', 'necesito', 'muéstrame', 'muestra', 'ver', 'ver', 'conocer'];
        const negativeKeywords = ['no', 'no quiero', 'no busco', 'no necesito', 'no me interesa'];

        let bonus = 0;

        // Bonus por palabras positivas
        for (const keyword of positiveKeywords) {
            if (prompt.includes(keyword)) {
                bonus += 0.1;
            }
        }

        // Penalización por palabras negativas
        for (const keyword of negativeKeywords) {
            if (prompt.includes(keyword)) {
                bonus -= 0.2;
            }
        }

        return Math.max(0, Math.min(bonus, 0.3));
    }

    private static mapIntentToRedirect(intent: IntentType): IntentRedirectTo {
        const mapping: Record<IntentType, IntentRedirectTo> = {
            packages: 'show_packages',
            products: 'show_categories',
            experiences: 'show_experiences',
            categories: 'show_categories',
            top_products_by_experience: 'show_top_products_by_experience',
            total_income_by_experience: 'show_total_income_by_experience',
            none: 'none'
        };

        return mapping[intent];
    }

    private static generateIntentMessage(intent: IntentType, confidence: number): string {
        if (intent === 'none') {
            return "Entiendo tu consulta. Te ayudo con eso.";
        }

        const messages = {
            packages: {
                high: "¡Perfecto! Te ayudo a descubrir nuestros paquetes turísticos. ¿Te gustaría ver las opciones disponibles?",
                medium: "Parece que te interesan nuestros paquetes. ¿Quieres explorar las opciones?",
                low: "Si te interesan los paquetes turísticos, puedo mostrarte nuestras opciones."
            },
            products: {
                high: "¡Perfecto! Para ver nuestros productos, primero elige una categoría.",
                medium: "Para productos, elige una categoría primero.",
                low: "Productos organizados por categorías."
            },
            experiences: {
                high: "¡Genial! Tenemos experiencias culturales increíbles. ¿Quieres conocerlas?",
                medium: "Si te interesan las experiencias, puedo mostrarte lo que tenemos disponible.",
                low: "Para experiencias culturales, puedo mostrarte nuestras opciones."
            },
            categories: {
                high: "¡Claro! Te muestro todas nuestras categorías de productos.",
                medium: "Puedo mostrarte las categorías disponibles.",
                low: "Para ver categorías, puedo mostrarte nuestras opciones."
            },
            top_products_by_experience: {
                high: "Aquí tienes el top de productos más vendidos de tu experiencia.",
                medium: "Te muestro los productos más vendidos de tu experiencia.",
                low: "Estos son los productos más vendidos de tu experiencia."
            },
            total_income_by_experience: {
                high: "Aquí tienes el total de ingresos generados por tu experiencia.",
                medium: "Te muestro los ingresos generados por tu experiencia.",
                low: "Estos son los ingresos de tu experiencia."
            }
        };

        const confidenceLevel = confidence >= this.CONFIDENCE_THRESHOLDS.HIGH ? 'high' :
            confidence >= this.CONFIDENCE_THRESHOLDS.MEDIUM ? 'medium' : 'low';

        return messages[intent][confidenceLevel];
    }

    private static generateButtonText(intent: IntentType): string {
        const buttonTexts = {
            packages: "Ver paquetes",
            products: "Ver categorías",
            experiences: "Ver experiencias",
            categories: "Ver categorías",
            top_products_by_experience: "Ver top productos",
            total_income_by_experience: "Ver ingresos",
            none: ""
        };

        return buttonTexts[intent];
    }

    private static createNoIntentResponse(): IntentData {
        return {
            type: 'none',
            confidence: 0,
            redirectTo: 'none',
            message: "",
            buttonText: ""
        };
    }

    // Método para verificar si se debe mostrar la intención (umbral de confianza)
    static shouldShowIntent(intent: IntentData): boolean {
        return intent.confidence >= this.CONFIDENCE_THRESHOLDS.MEDIUM;
    }
} 