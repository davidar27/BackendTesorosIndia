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
    'h1j4 d3 put4',

    // Abreviaturas y jerga colombiana
    'pta', 'ptas', 'pto', 'ptos',
    'mrd', 'mrda', 'mrdas',
    'cn', 'cno', 'cnos',
    'pndj', 'pndja', 'pndjs', 'pndjas',
    'cbrn', 'cbrna', 'cbrns', 'cbrnas',
    'idta', 'idtas',
    'stpd', 'stpda', 'stpds', 'stpdas',
    'mbcl', 'mbcls',
    'tnt', 'tnta', 'tnts', 'tntas',
    'glplls', 'glplls',
    'mmn', 'mmna', 'mmns', 'mmnas',
    'sqrs', 'sqrsa', 'sqrss', 'sqrsas',
    'rpgnt', 'rpgnts',
    'hrbl', 'hrbls',
    'trbl', 'trbls',
    'psm', 'psma', 'psms', 'psmas',
    'mlsm', 'mlsma', 'mlsms', 'mlsmas',

    // Jerga colombiana específica
    'gonorrea', 'gonorreas',
    'hpta', 'hptas', 'hpto', 'hptos',
    'malparido', 'malparida', 'malparidos', 'malparidas',
    'hijueputa', 'hijueputas',
    'huevon', 'huevona', 'huevones', 'huevonas',
    'huevón', 'huevóna', 'huevónes', 'huevónas',
    'marica', 'maricas', 'maricón', 'maricones',
    'marik', 'mariks',
    'mk', 'mks',
    'parce', 'parcero', 'parceros',
    'parcerito', 'parceritos',
    'chimba', 'chimbas',
    'chimbo', 'chimbos',
    'chimba de', 'chimbo de',
    'que chimba', 'qué chimba',
    'que chimbo', 'qué chimbo',
    'que chimba de', 'qué chimba de',
    'que chimbo de', 'qué chimbo de',
    'que chimba tan', 'qué chimba tan',
    'que chimbo tan', 'qué chimbo tan',
    'que chimba de producto', 'que chimba de experiencia',
    'que chimbo de producto', 'que chimbo de experiencia',
    'que chimba tan asquerosa', 'que chimbo tan asqueroso',
    'que chimba tan mierda', 'que chimbo tan mierda',
    'que chimba tan horrible', 'que chimbo tan horrible',
    'que chimba tan terrible', 'que chimbo tan terrible',
    'que chimba tan pésimo', 'que chimbo tan pésimo',
    'que chimba tan malísimo', 'que chimbo tan malísimo',

    // Expresiones colombianas negativas
    'que vaina', 'qué vaina',
    'que vaina tan', 'qué vaina tan',
    'que vaina de', 'qué vaina de',
    'que vaina tan asquerosa', 'que vaina tan horrible',
    'que vaina tan mierda', 'que vaina tan terrible',
    'que vaina tan pésimo', 'que vaina tan malísimo',
    'es una vaina', 'es un vaina',
    'que vaina de producto', 'que vaina de experiencia',
    'que vaina de servicio', 'que vaina de lugar',

    'que berraquera', 'qué berraquera',
    'que berraquera tan', 'qué berraquera tan',
    'que berraquera de', 'qué berraquera de',
    'que berraquera tan asquerosa', 'que berraquera tan horrible',
    'que berraquera tan mierda', 'que berraquera tan terrible',
    'es una berraquera', 'es un berraquera',

    'que mamera', 'qué mamera',
    'que mamera tan', 'qué mamera tan',
    'que mamera de', 'qué mamera de',
    'que mamera tan asquerosa', 'que mamera tan horrible',
    'que mamera tan mierda', 'que mamera tan terrible',
    'es una mamera', 'es un mamera',

    'que pereza', 'qué pereza',
    'que pereza tan', 'qué pereza tan',
    'que pereza de', 'qué pereza de',
    'que pereza tan asquerosa', 'que pereza tan horrible',
    'que pereza tan mierda', 'que pereza tan terrible',
    'es una pereza', 'es un pereza',

    // Expresiones con "güevón" (variación colombiana)
    'güevón', 'güevóna', 'güevónes', 'güevónas',
    'guevon', 'guevona', 'guevones', 'guevonas',
    'que güevón', 'qué güevón',
    'que guevon', 'qué guevon',
    'que güevón tan', 'qué güevón tan',
    'que guevon tan', 'qué guevon tan',
    'que güevón de', 'qué güevón de',
    'que guevon de', 'qué guevon de',
    'es un güevón', 'es una güevóna',
    'es un guevon', 'es una guevona',

    // Expresiones con "malparido" (muy común en Colombia)
    'que malparido', 'qué malparido',
    'que malparida', 'qué malparida',
    'que malparido tan', 'qué malparido tan',
    'que malparida tan', 'qué malparida tan',
    'que malparido de', 'qué malparido de',
    'que malparida de', 'qué malparida de',
    'es un malparido', 'es una malparida',
    'que malparido de producto', 'que malparido de experiencia',
    'que malparida de producto', 'que malparida de experiencia',

    // Expresiones con "gonorrea" (muy colombiana)
    'que gonorrea', 'qué gonorrea',
    'que gonorrea tan', 'qué gonorrea tan',
    'que gonorrea de', 'qué gonorrea de',
    'es una gonorrea', 'es un gonorrea',
    'que gonorrea de producto', 'que gonorrea de experiencia',
    'que gonorrea tan asquerosa', 'que gonorrea tan horrible',
    'que gonorrea tan mierda', 'que gonorrea tan terrible',

    // Expresiones con "marica" (común en Colombia)
    'que marica', 'qué marica',
    'que maricas', 'qué maricas',
    'que maricón', 'qué maricón',
    'que maricones', 'qué maricones',
    'que marica tan', 'qué marica tan',
    'que maricón tan', 'qué maricón tan',
    'que marica de', 'qué marica de',
    'que maricón de', 'qué maricón de',
    'es un marica', 'es una marica',
    'es un maricón', 'es una maricón',
    'que marica de producto', 'que marica de experiencia',
    'que maricón de producto', 'que maricón de experiencia',

    // Expresiones con "mk" (abreviatura de marica)
    'que mk', 'qué mk',
    'que mk tan', 'qué mk tan',
    'que mk de', 'qué mk de',
    'es un mk', 'es una mk',
    'que mk de producto', 'que mk de experiencia',
    'que mk tan asqueroso', 'que mk tan horrible',
    'que mk tan mierda', 'que mk tan terrible',

    // Expresiones con "parce" (colombiano pero puede ser negativo)
    'que parce', 'qué parce',
    'que parce tan', 'qué parce tan',
    'que parce de', 'qué parce de',
    'es un parce', 'es una parce',
    'que parce de producto', 'que parce de experiencia',
    'que parce tan asqueroso', 'que parce tan horrible',
    'que parce tan mierda', 'que parce tan terrible',

    // Expresiones con "parcero" (variación de parce)
    'que parcero', 'qué parcero',
    'que parcero tan', 'qué parcero tan',
    'que parcero de', 'qué parcero de',
    'es un parcero', 'es una parcero',
    'que parcero de producto', 'que parcero de experiencia',
    'que parcero tan asqueroso', 'que parcero tan horrible',
    'que parcero tan mierda', 'que parcero tan terrible'
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
    'que mentira', 'qué mentira',

    // Frases colombianas específicas
    'que chimba tan asquerosa', 'que chimba tan horrible',
    'que chimba tan mierda', 'que chimba tan terrible',
    'que chimba tan pésimo', 'que chimba tan malísimo',
    'que chimbo tan asqueroso', 'que chimbo tan horrible',
    'que chimbo tan mierda', 'que chimbo tan terrible',
    'que chimbo tan pésimo', 'que chimbo tan malísimo',

    'que vaina tan asquerosa', 'que vaina tan horrible',
    'que vaina tan mierda', 'que vaina tan terrible',
    'que vaina tan pésimo', 'que vaina tan malísimo',

    'que berraquera tan asquerosa', 'que berraquera tan horrible',
    'que berraquera tan mierda', 'que berraquera tan terrible',
    'que berraquera tan pésimo', 'que berraquera tan malísimo',

    'que mamera tan asquerosa', 'que mamera tan horrible',
    'que mamera tan mierda', 'que mamera tan terrible',
    'que mamera tan pésimo', 'que mamera tan malísimo',

    'que pereza tan asquerosa', 'que pereza tan horrible',
    'que pereza tan mierda', 'que pereza tan terrible',
    'que pereza tan pésimo', 'que pereza tan malísimo',

    // Frases con jerga colombiana
    'que güevón tan asqueroso', 'que güevón tan horrible',
    'que güevón tan mierda', 'que güevón tan terrible',
    'que guevon tan asqueroso', 'que guevon tan horrible',
    'que guevon tan mierda', 'que guevon tan terrible',

    'que malparido tan asqueroso', 'que malparido tan horrible',
    'que malparido tan mierda', 'que malparido tan terrible',
    'que malparida tan asquerosa', 'que malparida tan horrible',
    'que malparida tan mierda', 'que malparida tan terrible',

    'que gonorrea tan asquerosa', 'que gonorrea tan horrible',
    'que gonorrea tan mierda', 'que gonorrea tan terrible',

    'que marica tan asqueroso', 'que marica tan horrible',
    'que marica tan mierda', 'que marica tan terrible',
    'que maricón tan asqueroso', 'que maricón tan horrible',
    'que maricón tan mierda', 'que maricón tan terrible',

    'que mk tan asqueroso', 'que mk tan horrible',
    'que mk tan mierda', 'que mk tan terrible',

    'que parce tan asqueroso', 'que parce tan horrible',
    'que parce tan mierda', 'que parce tan terrible',
    'que parcero tan asqueroso', 'que parcero tan horrible',
    'que parcero tan mierda', 'que parcero tan terrible',

    // Frases con productos/experiencias en jerga colombiana
    'que chimba de producto', 'que chimba de experiencia',
    'que chimbo de producto', 'que chimbo de experiencia',
    'que vaina de producto', 'que vaina de experiencia',
    'que berraquera de producto', 'que berraquera de experiencia',
    'que mamera de producto', 'que mamera de experiencia',
    'que pereza de producto', 'que pereza de experiencia',
    'que güevón de producto', 'que güevón de experiencia',
    'que guevon de producto', 'que guevon de experiencia',
    'que malparido de producto', 'que malparido de experiencia',
    'que malparida de producto', 'que malparida de experiencia',
    'que gonorrea de producto', 'que gonorrea de experiencia',
    'que marica de producto', 'que marica de experiencia',
    'que maricón de producto', 'que maricón de experiencia',
    'que mk de producto', 'que mk de experiencia',
    'que parce de producto', 'que parce de experiencia',
    'que parcero de producto', 'que parcero de experiencia'
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
        word.includes('hija de puta') ||
        word.includes('malparido') ||
        word.includes('malparida') ||
        word.includes('gonorrea') ||
        word.includes('marica') ||
        word.includes('maricón') ||
        word.includes('huevon') ||
        word.includes('huevón') ||
        word.includes('güevón') ||
        word.includes('guevon')
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
        word.includes('malísimo') ||
        word.includes('chimba') ||
        word.includes('chimbo') ||
        word.includes('vaina') ||
        word.includes('berraquera') ||
        word.includes('mamera') ||
        word.includes('pereza') ||
        word.includes('mk') ||
        word.includes('parce') ||
        word.includes('parcero')
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
        'basura': 'pta',

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
        'es una mentira': 'no es cierto',

        // Jerga colombiana
        'chimba': 'bueno',
        'chimbo': 'bueno',
        'vaina': 'cosa',
        'berraquera': 'cosa',
        'mamera': 'molestia',
        'pereza': 'molestia',
        'gonorrea': 'persona',
        'marica': 'persona',
        'maricón': 'persona',
        'mk': 'persona',
        'parce': 'amigo',
        'parcero': 'amigo',
        'huevon': 'persona',
        'huevón': 'persona',
        'güevón': 'persona',
        'guevon': 'persona',
        'malparido': 'persona',
        'malparida': 'persona',

        // Frases colombianas
        'que chimba': 'que bueno',
        'qué chimba': 'qué bueno',
        'que chimbo': 'que bueno',
        'qué chimbo': 'qué bueno',
        'que vaina': 'que cosa',
        'qué vaina': 'qué cosa',
        'que berraquera': 'que cosa',
        'qué berraquera': 'qué cosa',
        'que mamera': 'que molestia',
        'qué mamera': 'qué molestia',
        'que pereza': 'que molestia',
        'qué pereza': 'qué molestia',
        'que gonorrea': 'que persona',
        'qué gonorrea': 'qué persona',
        'que marica': 'que persona',
        'qué marica': 'qué persona',
        'que maricón': 'que persona',
        'qué maricón': 'qué persona',
        'que mk': 'que persona',
        'qué mk': 'qué persona',
        'que parce': 'que amigo',
        'qué parce': 'qué amigo',
        'que parcero': 'que amigo',
        'qué parcero': 'qué amigo',
        'que huevon': 'que persona',
        'qué huevon': 'qué persona',
        'que huevón': 'que persona',
        'qué huevón': 'qué persona',
        'que güevón': 'que persona',
        'qué güevón': 'qué persona',
        'que guevon': 'que persona',
        'qué guevon': 'qué persona',
        'que malparido': 'que persona',
        'qué malparido': 'qué persona',
        'que malparida': 'que persona',
        'qué malparida': 'qué persona'
    };

    for (const [bad, good] of Object.entries(replacements)) {
        const regex = new RegExp(bad, 'gi');
        replacementText = replacementText.replace(regex, good);
    }

    return replacementText;
} 