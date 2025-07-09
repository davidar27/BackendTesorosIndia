// Lista de palabras y frases prohibidas en español
const SPANISH_PROFANITY_LIST = [
    // Palabras obscenas individuales
    'puta', 'puto', 'putas', 'putos',
    'mierda', 'mierdas',
    'coño', 'coños',
    'pendejo', 'pendeja', 'pendejos', 'pendejas',
    'cabrón', 'cabrona', 'cabrones', 'cabronas',
    'malparido', 'malparida', 'malparidos', 'malparidas',
    'hijueputa', 'hijueputas',

    // Insultos individuales
    'idiota', 'idiotas',
    'estúpido', 'estúpida', 'estúpidos', 'estúpidas',
    'imbécil', 'imbéciles',
    'tonto', 'tonta', 'tontos', 'tontas',
    'gilipollas', 'gilipollas',
    'mamón', 'mamona', 'mamones', 'mamonas',
    'asqueroso', 'asquerosa', 'asquerosos', 'asquerosas',
    'repugnante', 'repugnantes',
    'horrible', 'horribles',
    'terrible', 'terribles',
    'pésimo', 'pésima', 'pésimos', 'pésimas',
    'malísimo', 'malísima', 'malísimos', 'malísimas',

    // Palabras sexuales explícitas
    'follar', 'follando', 'follado',
    'coger', 'cogiendo', 'cogido',
    'polla', 'pollas',
    'pene', 'penes',
    'pito', 'pitos',
    'panocha', 'panochas',
    'chocho', 'chochos',

    // Amenazas
    'te voy a matar', 'te mato', 'te mataré',
    'te voy a partir la cara', 'te parto la cara',
    'te voy a romper', 'te rompo',
    'muérete', 'muerete',
    'vete a la mierda', 'vete al carajo',

    // Variaciones con números y símbolos
    'p3n3', 'p3n3s',
    'p0ll4', 'p0ll4s',
    'c0ñ0', 'c0ñ0s',
    'p3nd3j0', 'p3nd3j4',
    'm4m0n', 'm4m0n4',
    'h1j0 d3 put4',
    'h1j4 d3 put4'
];

// Lista de frases y expresiones prohibidas
const SPANISH_PROFANITY_PHRASES = [
    // Frases con "hijo de puta"
    'hijo de puta', 'hija de puta', 'hijos de puta', 'hijas de puta',
    'que hijo de puta', 'que hija de puta',
    'eres un hijo de puta', 'eres una hija de puta',
    'soy un hijo de puta', 'soy una hija de puta',

    // Frases con "mierda"
    'que mierda', 'qué mierda',
    'que producto tan mierda', 'que experiencia tan mierda',
    'que servicio tan mierda', 'que lugar tan mierda',
    'es una mierda', 'es un mierda',
    'todo es mierda', 'todo es una mierda',
    'que mierda de', 'qué mierda de',
    'que mierda es esto', 'qué mierda es esto',
    'que mierda de producto', 'que mierda de experiencia',
    'que mierda de servicio', 'que mierda de lugar',

    // Frases con "asqueroso"
    'que asqueroso', 'qué asqueroso',
    'que producto tan asqueroso', 'que experiencia tan asqueroso',
    'que servicio tan asqueroso', 'que lugar tan asqueroso',
    'es asqueroso', 'es asquerosa',
    'que asqueroso de', 'qué asqueroso de',
    'que asqueroso es esto', 'qué asqueroso es esto',
    'que asqueroso de producto', 'que asqueroso de experiencia',
    'que asqueroso de servicio', 'que asqueroso de lugar',

    // Frases con "repugnante"
    'que repugnante', 'qué repugnante',
    'que producto tan repugnante', 'que experiencia tan repugnante',
    'es repugnante', 'es repugnante',
    'que repugnante de', 'qué repugnante de',

    // Frases con "horrible"
    'que horrible', 'qué horrible',
    'que producto tan horrible', 'que experiencia tan horrible',
    'es horrible', 'es horrible',
    'que horrible de', 'qué horrible de',

    // Frases con "terrible"
    'que terrible', 'qué terrible',
    'que producto tan terrible', 'que experiencia tan terrible',
    'es terrible', 'es terrible',
    'que terrible de', 'qué terrible de',

    // Frases con "pésimo"
    'que pésimo', 'qué pésimo',
    'que producto tan pésimo', 'que experiencia tan pésimo',
    'es pésimo', 'es pésima',
    'que pésimo de', 'qué pésimo de',

    // Frases con "malísimo"
    'que malísimo', 'qué malísimo',
    'que producto tan malísimo', 'que experiencia tan malísimo',
    'es malísimo', 'es malísima',
    'que malísimo de', 'qué malísimo de',

    // Frases con "puta"
    'que puta', 'qué puta',
    'que producto tan puta', 'que experiencia tan puta',
    'es una puta', 'es un puta',
    'que puta de', 'qué puta de',
    'que puta es esto', 'qué puta es esto',

    // Frases con "coño"
    'que coño', 'qué coño',
    'que producto tan coño', 'que experiencia tan coño',
    'es un coño', 'es una coño',
    'que coño de', 'qué coño de',
    'que coño es esto', 'qué coño es esto',

    // Frases con "pendejo"
    'que pendejo', 'qué pendejo',
    'que producto tan pendejo', 'que experiencia tan pendejo',
    'es un pendejo', 'es una pendeja',
    'que pendejo de', 'qué pendejo de',

    // Frases con "cabrón"
    'que cabrón', 'qué cabrón',
    'que producto tan cabrón', 'que experiencia tan cabrón',
    'es un cabrón', 'es una cabrona',
    'que cabrón de', 'qué cabrón de',

    // Frases con "idiota"
    'que idiota', 'qué idiota',
    'que producto tan idiota', 'que experiencia tan idiota',
    'es un idiota', 'es una idiota',
    'que idiota de', 'qué idiota de',

    // Frases con "estúpido"
    'que estúpido', 'qué estúpido',
    'que producto tan estúpido', 'que experiencia tan estúpido',
    'es un estúpido', 'es una estúpida',
    'que estúpido de', 'qué estúpido de',

    // Frases con "imbécil"
    'que imbécil', 'qué imbécil',
    'que producto tan imbécil', 'que experiencia tan imbécil',
    'es un imbécil', 'es una imbécil',
    'que imbécil de', 'qué imbécil de',

    // Frases con "tonto"
    'que tonto', 'qué tonto',
    'que producto tan tonto', 'que experiencia tan tonto',
    'es un tonto', 'es una tonta',
    'que tonto de', 'qué tonto de',

    // Frases con "gilipollas"
    'que gilipollas', 'qué gilipollas',
    'que producto tan gilipollas', 'que experiencia tan gilipollas',
    'es un gilipollas', 'es una gilipollas',
    'que gilipollas de', 'qué gilipollas de',

    // Frases con "mamón"
    'que mamón', 'qué mamón',
    'que producto tan mamón', 'que experiencia tan mamón',
    'es un mamón', 'es una mamona',
    'que mamón de', 'qué mamón de',

    // Frases genéricas de disgusto
    'que basura', 'qué basura',
    'que producto tan basura', 'que experiencia tan basura',
    'es una basura', 'es un basura',
    'que basura de', 'qué basura de',

    'que porquería', 'qué porquería',
    'que producto tan porquería', 'que experiencia tan porquería',
    'es una porquería', 'es un porquería',
    'que porquería de', 'qué porquería de',

    'que chatarra', 'qué chatarra',
    'que producto tan chatarra', 'que experiencia tan chatarra',
    'es una chatarra', 'es un chatarra',
    'que chatarra de', 'qué chatarra de',

    // Frases con "no sirve"
    'no sirve para nada', 'no sirve para nada esto',
    'no sirve este producto', 'no sirve esta experiencia',
    'no sirve este servicio', 'no sirve este lugar',
    'no sirve de nada', 'no sirve de nada esto',

    // Frases con "es una pérdida"
    'es una pérdida de tiempo', 'es una pérdida de dinero',
    'es una pérdida total', 'es una pérdida completa',
    'que pérdida de tiempo', 'qué pérdida de tiempo',
    'que pérdida de dinero', 'qué pérdida de dinero',

    // Frases con "es un fraude"
    'es un fraude', 'es una estafa',
    'que fraude', 'qué fraude',
    'que estafa', 'qué estafa',
    'es un engaño', 'es una mentira',
    'que engaño', 'qué engaño',
    'que mentira', 'qué mentira'
];

// Función para normalizar texto (quitar acentos, convertir a minúsculas, etc.)
function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/[^a-z0-9\s]/g, ' ') // Solo letras, números y espacios
        .replace(/\s+/g, ' ') // Múltiples espacios a uno
        .trim();
}

// Función para verificar si el texto contiene palabras prohibidas
export function checkSpanishProfanity(text: string): {
    hasProfanity: boolean;
    foundWords: string[];
    severity: 'low' | 'medium' | 'high';
} {
    const normalizedText = normalizeText(text);
    const words = normalizedText.split(' ');
    const foundWords: string[] = [];

    // Verificar palabras individuales
    for (const word of words) {
        if (SPANISH_PROFANITY_LIST.includes(word)) {
            foundWords.push(word);
        }
    }

    // Verificar frases completas (tanto de la lista de palabras como de frases)
    for (const phrase of [...SPANISH_PROFANITY_LIST, ...SPANISH_PROFANITY_PHRASES]) {
        if (phrase.includes(' ') && normalizedText.includes(phrase)) {
            foundWords.push(phrase);
        }
    }

    // Verificar frases específicas de la lista de frases
    for (const phrase of SPANISH_PROFANITY_PHRASES) {
        if (normalizedText.includes(phrase)) {
            foundWords.push(phrase);
        }
    }

    const hasProfanity = foundWords.length > 0;

    // Determinar severidad basada en el tipo de palabras encontradas
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (foundWords.some(word =>
        word.includes('puta') ||
        word.includes('mierda') ||
        word.includes('coño') ||
        word.includes('follar') ||
        word.includes('coger') ||
        word.includes('hijo de puta') ||
        word.includes('hija de puta')
    )) {
        severity = 'high';
    } else if (foundWords.some(word =>
        word.includes('pendejo') ||
        word.includes('cabrón') ||
        word.includes('idiota') ||
        word.includes('estúpido') ||
        word.includes('asqueroso') ||
        word.includes('repugnante') ||
        word.includes('horrible') ||
        word.includes('terrible') ||
        word.includes('pésimo') ||
        word.includes('malísimo')
    )) {
        severity = 'medium';
    }

    return {
        hasProfanity,
        foundWords: [...new Set(foundWords)], // Eliminar duplicados
        severity
    };
}

// Función para obtener sugerencias de reemplazo
export function getReplacementSuggestions(text: string): string {
    const normalizedText = normalizeText(text);
    let replacementText = text;

    // Reemplazos comunes
    const replacements: { [key: string]: string } = {
        // Palabras obscenas
        'puta': 'persona',
        'puto': 'persona',
        'mierda': 'basura',
        'coño': 'vaya',

        // Insultos
        'pendejo': 'tonto',
        'pendeja': 'tonta',
        'cabrón': 'persona',
        'cabrona': 'persona',
        'idiota': 'tonto',
        'estúpido': 'tonto',
        'imbécil': 'tonto',
        'tonto': 'persona',
        'tonta': 'persona',
        'gilipollas': 'persona',
        'mamón': 'persona',
        'mamona': 'persona',

        // Adjetivos negativos
        'asqueroso': 'desagradable',
        'asquerosa': 'desagradable',
        'repugnante': 'desagradable',
        'horrible': 'malo',
        'terrible': 'malo',
        'pésimo': 'malo',
        'pésima': 'mala',
        'malísimo': 'malo',
        'malísima': 'mala',

        // Frases completas
        'que mierda': 'que mal',
        'qué mierda': 'qué mal',
        'que asqueroso': 'que desagradable',
        'qué asqueroso': 'qué desagradable',
        'que horrible': 'que malo',
        'qué horrible': 'qué malo',
        'que terrible': 'que malo',
        'qué terrible': 'qué malo',
        'que pésimo': 'que malo',
        'qué pésimo': 'qué malo',
        'que malísimo': 'que malo',
        'qué malísimo': 'qué malo',

        // Frases con productos/experiencias
        'que producto tan mierda': 'que producto tan malo',
        'que experiencia tan mierda': 'que experiencia tan mala',
        'que producto tan asqueroso': 'que producto tan desagradable',
        'que experiencia tan asqueroso': 'que experiencia tan desagradable',
        'que producto tan horrible': 'que producto tan malo',
        'que experiencia tan horrible': 'que experiencia tan mala',
        'que producto tan terrible': 'que producto tan malo',
        'que experiencia tan terrible': 'que experiencia tan mala',
        'que producto tan pésimo': 'que producto tan malo',
        'que experiencia tan pésimo': 'que experiencia tan mala',
        'que producto tan malísimo': 'que producto tan malo',
        'que experiencia tan malísimo': 'que experiencia tan mala',

        // Otras frases
        'no sirve para nada': 'no funciona bien',
        'es una pérdida de tiempo': 'no vale la pena',
        'es una pérdida de dinero': 'no vale la pena',
        'es un fraude': 'no es bueno',
        'es una estafa': 'no es bueno',
        'es un engaño': 'no es bueno',
        'es una mentira': 'no es cierto'
    };

    for (const [bad, good] of Object.entries(replacements)) {
        const regex = new RegExp(bad, 'gi');
        replacementText = replacementText.replace(regex, good);
    }

    return replacementText;
} 