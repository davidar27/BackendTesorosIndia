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
    'que parcero tan mierda', 'que parcero tan terrible',

    // Más jerga colombiana específica
    'piroba', 'pirobas', 'pirobo', 'pirobos',
    'hpta', 'hptas', 'hpto', 'hptos',
    'verga', 'vergas',
    'cachón', 'cachona', 'cachones', 'cachonas',
    'cachaco', 'cachaca', 'cachacos', 'cachacas',
    'costeño', 'costeña', 'costeños', 'costeñas',
    'paisa', 'paisas',
    'rolo', 'rola', 'rolos', 'rolas',
    'santandereano', 'santandereana', 'santandereanos', 'santandereanas',
    'boyacense', 'boyacenses',
    'tolimense', 'tolimenses',
    'vallecaucano', 'vallecaucana', 'vallecaucanos', 'vallecaucanas'
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
    'que parcero de producto', 'que parcero de experiencia',

    // Más jerga colombiana específica
    'piroba', 'pirobas', 'pirobo', 'pirobos',
    'hpta', 'hptas', 'hpto', 'hptos',
    'hijo de las mil putas', 'hija de las mil putas',
    'hijos de las mil putas', 'hijas de las mil putas',
    'hijo de la gran puta', 'hija de la gran puta',
    'hijos de la gran puta', 'hijas de la gran puta',
    'hijo de la madre', 'hija de la madre',
    'hijos de la madre', 'hijas de la madre',
    'hijo de la mierda', 'hija de la mierda',
    'hijos de la mierda', 'hijas de la mierda',
    'hijo de la verga', 'hija de la verga',
    'hijos de la verga', 'hijas de la verga',
    'hijo de la gonorrea', 'hija de la gonorrea',
    'hijos de la gonorrea', 'hijas de la gonorrea',
    'hijo de la marica', 'hija de la marica',
    'hijos de la marica', 'hijas de la marica',
    'hijo de la maricón', 'hija de la maricón',
    'hijos de la maricón', 'hijas de la maricón',
    'hijo de la mk', 'hija de la mk',
    'hijos de la mk', 'hijas de la mk',
    'hijo de la piroba', 'hija de la piroba',
    'hijos de la piroba', 'hijas de la piroba',
    'hijo de la hpta', 'hija de la hpta',
    'hijos de la hpta', 'hijas de la hpta',
    'hijo de la hpto', 'hija de la hpto',
    'hijos de la hpto', 'hijas de la hpto',

    // Expresiones con "verga"
    'verga', 'vergas',
    'que verga', 'qué verga',
    'que verga tan', 'qué verga tan',
    'que verga de', 'qué verga de',
    'es una verga', 'es un verga',
    'que verga tan asquerosa', 'que verga tan horrible',
    'que verga tan mierda', 'que verga tan terrible',
    'que verga de producto', 'que verga de experiencia',
    'que verga de servicio', 'que verga de lugar',

    // Expresiones con "piroba"
    'que piroba', 'qué piroba',
    'que pirobo', 'qué pirobo',
    'que piroba tan', 'qué piroba tan',
    'que pirobo tan', 'qué pirobo tan',
    'que piroba de', 'qué piroba de',
    'que pirobo de', 'qué pirobo de',
    'es una piroba', 'es un pirobo',
    'que piroba tan asquerosa', 'que piroba tan horrible',
    'que piroba tan mierda', 'que piroba tan terrible',
    'que pirobo tan asqueroso', 'que pirobo tan horrible',
    'que pirobo tan mierda', 'que pirobo tan terrible',
    'que piroba de producto', 'que piroba de experiencia',
    'que pirobo de producto', 'que pirobo de experiencia',

    // Expresiones con "hpta/hpto"
    'que hpta', 'qué hpta',
    'que hpto', 'qué hpto',
    'que hpta tan', 'qué hpta tan',
    'que hpto tan', 'qué hpto tan',
    'que hpta de', 'qué hpta de',
    'que hpto de', 'qué hpto de',
    'es una hpta', 'es un hpto',
    'que hpta tan asquerosa', 'que hpta tan horrible',
    'que hpta tan mierda', 'que hpta tan terrible',
    'que hpto tan asqueroso', 'que hpto tan horrible',
    'que hpto tan mierda', 'que hpto tan terrible',
    'que hpta de producto', 'que hpta de experiencia',
    'que hpto de producto', 'que hpto de experiencia',

    // Expresiones con "hijo de las mil putas"
    'que hijo de las mil putas', 'qué hijo de las mil putas',
    'que hija de las mil putas', 'qué hija de las mil putas',
    'que hijo de la gran puta', 'qué hijo de la gran puta',
    'que hija de la gran puta', 'qué hija de la gran puta',
    'que hijo de la madre', 'qué hijo de la madre',
    'que hija de la madre', 'qué hija de la madre',
    'que hijo de la mierda', 'qué hijo de la mierda',
    'que hija de la mierda', 'qué hija de la mierda',
    'que hijo de la verga', 'qué hijo de la verga',
    'que hija de la verga', 'qué hija de la verga',
    'que hijo de la gonorrea', 'qué hijo de la gonorrea',
    'que hija de la gonorrea', 'qué hija de la gonorrea',
    'que hijo de la marica', 'qué hijo de la marica',
    'que hija de la marica', 'qué hija de la marica',
    'que hijo de la maricón', 'qué hijo de la maricón',
    'que hija de la maricón', 'qué hija de la maricón',
    'que hijo de la mk', 'qué hijo de la mk',
    'que hija de la mk', 'qué hija de la mk',
    'que hijo de la piroba', 'qué hijo de la piroba',
    'que hija de la piroba', 'qué hija de la piroba',
    'que hijo de la hpta', 'qué hijo de la hpta',
    'que hija de la hpta', 'qué hija de la hpta',
    'que hijo de la hpto', 'qué hijo de la hpto',
    'que hija de la hpto', 'qué hija de la hpto',

    // Más jerga colombiana
    'cachón', 'cachona', 'cachones', 'cachonas',
    'que cachón', 'qué cachón',
    'que cachona', 'qué cachona',
    'que cachón tan', 'qué cachón tan',
    'que cachona tan', 'qué cachona tan',
    'que cachón de', 'qué cachón de',
    'que cachona de', 'qué cachona de',
    'es un cachón', 'es una cachona',
    'que cachón tan asqueroso', 'que cachón tan horrible',
    'que cachón tan mierda', 'que cachón tan terrible',
    'que cachona tan asquerosa', 'que cachona tan horrible',
    'que cachona tan mierda', 'que cachona tan terrible',
    'que cachón de producto', 'que cachón de experiencia',
    'que cachona de producto', 'que cachona de experiencia',

    'cachaco', 'cachaca', 'cachacos', 'cachacas',
    'que cachaco', 'qué cachaco',
    'que cachaca', 'qué cachaca',
    'que cachaco tan', 'qué cachaco tan',
    'que cachaca tan', 'qué cachaca tan',
    'que cachaco de', 'qué cachaco de',
    'que cachaca de', 'qué cachaca de',
    'es un cachaco', 'es una cachaca',
    'que cachaco tan asqueroso', 'que cachaco tan horrible',
    'que cachaco tan mierda', 'que cachaco tan terrible',
    'que cachaca tan asquerosa', 'que cachaca tan horrible',
    'que cachaca tan mierda', 'que cachaca tan terrible',
    'que cachaco de producto', 'que cachaco de experiencia',
    'que cachaca de producto', 'que cachaca de experiencia',

    'costeño', 'costeña', 'costeños', 'costeñas',
    'que costeño', 'qué costeño',
    'que costeña', 'qué costeña',
    'que costeño tan', 'qué costeño tan',
    'que costeña tan', 'qué costeña tan',
    'que costeño de', 'qué costeño de',
    'que costeña de', 'qué costeña de',
    'es un costeño', 'es una costeña',
    'que costeño tan asqueroso', 'que costeño tan horrible',
    'que costeño tan mierda', 'que costeño tan terrible',
    'que costeña tan asquerosa', 'que costeña tan horrible',
    'que costeña tan mierda', 'que costeña tan terrible',
    'que costeño de producto', 'que costeño de experiencia',
    'que costeña de producto', 'que costeña de experiencia',

    'paisa', 'paisas',
    'que paisa', 'qué paisa',
    'que paisa tan', 'qué paisa tan',
    'que paisa de', 'qué paisa de',
    'es un paisa', 'es una paisa',
    'que paisa tan asqueroso', 'que paisa tan horrible',
    'que paisa tan mierda', 'que paisa tan terrible',
    'que paisa de producto', 'que paisa de experiencia',

    'rolo', 'rola', 'rolos', 'rolas',
    'que rolo', 'qué rolo',
    'que rola', 'qué rola',
    'que rolo tan', 'qué rolo tan',
    'que rola tan', 'qué rola tan',
    'que rolo de', 'qué rolo de',
    'que rola de', 'qué rola de',
    'es un rolo', 'es una rola',
    'que rolo tan asqueroso', 'que rolo tan horrible',
    'que rolo tan mierda', 'que rolo tan terrible',
    'que rola tan asquerosa', 'que rola tan horrible',
    'que rola tan mierda', 'que rola tan terrible',
    'que rolo de producto', 'que rolo de experiencia',
    'que rola de producto', 'que rola de experiencia',

    'santandereano', 'santandereana', 'santandereanos', 'santandereanas',
    'que santandereano', 'qué santandereano',
    'que santandereana', 'qué santandereana',
    'que santandereano tan', 'qué santandereano tan',
    'que santandereana tan', 'qué santandereana tan',
    'que santandereano de', 'qué santandereano de',
    'que santandereana de', 'qué santandereana de',
    'es un santandereano', 'es una santandereana',
    'que santandereano tan asqueroso', 'que santandereano tan horrible',
    'que santandereano tan mierda', 'que santandereano tan terrible',
    'que santandereana tan asquerosa', 'que santandereana tan horrible',
    'que santandereana tan mierda', 'que santandereana tan terrible',
    'que santandereano de producto', 'que santandereano de experiencia',
    'que santandereana de producto', 'que santandereana de experiencia',

    'boyacense', 'boyacenses',
    'que boyacense', 'qué boyacense',
    'que boyacense tan', 'qué boyacense tan',
    'que boyacense de', 'qué boyacense de',
    'es un boyacense', 'es una boyacense',
    'que boyacense tan asqueroso', 'que boyacense tan horrible',
    'que boyacense tan mierda', 'que boyacense tan terrible',
    'que boyacense de producto', 'que boyacense de experiencia',

    'tolimense', 'tolimenses',
    'que tolimense', 'qué tolimense',
    'que tolimense tan', 'qué tolimense tan',
    'que tolimense de', 'qué tolimense de',
    'es un tolimense', 'es una tolimense',
    'que tolimense tan asqueroso', 'que tolimense tan horrible',
    'que tolimense tan mierda', 'que tolimense tan terrible',
    'que tolimense de producto', 'que tolimense de experiencia',

    'vallecaucano', 'vallecaucana', 'vallecaucanos', 'vallecaucanas',
    'que vallecaucano', 'qué vallecaucano',
    'que vallecaucana', 'qué vallecaucana',
    'que vallecaucano tan', 'qué vallecaucano tan',
    'que vallecaucana tan', 'qué vallecaucana tan',
    'que vallecaucano de', 'qué vallecaucano de',
    'que vallecaucana de', 'qué vallecaucana de',
    'es un vallecaucano', 'es una vallecaucana',
    'que vallecaucano tan asqueroso', 'que vallecaucano tan horrible',
    'que vallecaucano tan mierda', 'que vallecaucano tan terrible',
    'que vallecaucana tan asquerosa', 'que vallecaucana tan horrible',
    'que vallecaucana tan mierda', 'que vallecaucana tan terrible',
    'que vallecaucano de producto', 'que vallecaucano de experiencia',
    'que vallecaucana de producto', 'que vallecaucana de experiencia',

    // Expresiones con "hpta" y variaciones
    'hpta de las mil putas', 'hpto de las mil putas',
    'hpta de la gran puta', 'hpto de la gran puta',
    'hpta de la madre', 'hpto de la madre',
    'hpta de la mierda', 'hpto de la mierda',
    'hpta de la verga', 'hpto de la verga',
    'hpta de la gonorrea', 'hpto de la gonorrea',
    'hpta de la marica', 'hpto de la marica',
    'hpta de la maricón', 'hpto de la maricón',
    'hpta de la mk', 'hpto de la mk',
    'hpta de la piroba', 'hpto de la piroba',

    // Expresiones con "piroba" y variaciones
    'piroba de las mil putas', 'pirobo de las mil putas',
    'piroba de la gran puta', 'pirobo de la gran puta',
    'piroba de la madre', 'pirobo de la madre',
    'piroba de la mierda', 'pirobo de la mierda',
    'piroba de la verga', 'pirobo de la verga',
    'piroba de la gonorrea', 'pirobo de la gonorrea',
    'piroba de la marica', 'pirobo de la marica',
    'piroba de la maricón', 'pirobo de la maricón',
    'piroba de la mk', 'pirobo de la mk',
    'piroba de la hpta', 'pirobo de la hpta',
    'piroba de la hpto', 'pirobo de la hpto',

    // Expresiones con "verga" y variaciones
    'verga de las mil putas', 'vergas de las mil putas',
    'verga de la gran puta', 'vergas de la gran puta',
    'verga de la madre', 'vergas de la madre',
    'verga de la mierda', 'vergas de la mierda',
    'verga de la gonorrea', 'vergas de la gonorrea',
    'verga de la marica', 'vergas de la marica',
    'verga de la maricón', 'vergas de la maricón',
    'verga de la mk', 'vergas de la mk',
    'verga de la piroba', 'vergas de la piroba',
    'verga de la hpta', 'vergas de la hpta',
    'verga de la hpto', 'vergas de la hpto'
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
    word.includes('guevon') ||
    word.includes('piroba') ||
    word.includes('pirobo') ||
    word.includes('hpta') ||
    word.includes('hpto') ||
    word.includes('verga') ||
    word.includes('cachón') ||
    word.includes('cachona') ||
    word.includes('cachaco') ||
    word.includes('cachaca') ||
    word.includes('costeño') ||
    word.includes('costeña') ||
    word.includes('paisa') ||
    word.includes('rolo') ||
    word.includes('rola') ||
    word.includes('santandereano') ||
    word.includes('santandereana') ||
    word.includes('boyacense') ||
    word.includes('tolimense') ||
    word.includes('vallecaucano') ||
    word.includes('vallecaucana')
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
    'qué malparida': 'qué persona',
    
    // Más jerga colombiana
    'piroba': 'persona',
    'pirobo': 'persona',
    'hpta': 'persona',
    'hpto': 'persona',
    'verga': 'cosa',
    'cachón': 'persona',
    'cachona': 'persona',
    'cachaco': 'persona',
    'cachaca': 'persona',
    'costeño': 'persona',
    'costeña': 'persona',
    'paisa': 'persona',
    'rolo': 'persona',
    'rola': 'persona',
    'santandereano': 'persona',
    'santandereana': 'persona',
    'boyacense': 'persona',
    'tolimense': 'persona',
    'vallecaucano': 'persona',
    'vallecaucana': 'persona',
    
    // Frases con nuevas palabras
    'que piroba': 'que persona',
    'qué piroba': 'qué persona',
    'que pirobo': 'que persona',
    'qué pirobo': 'qué persona',
    'que hpta': 'que persona',
    'qué hpta': 'qué persona',
    'que hpto': 'que persona',
    'qué hpto': 'qué persona',
    'que verga': 'que cosa',
    'qué verga': 'qué cosa',
    'que cachón': 'que persona',
    'qué cachón': 'qué persona',
    'que cachona': 'que persona',
    'qué cachona': 'qué persona',
    'que cachaco': 'que persona',
    'qué cachaco': 'qué persona',
    'que cachaca': 'que persona',
    'qué cachaca': 'qué persona',
    'que costeño': 'que persona',
    'qué costeño': 'qué persona',
    'que costeña': 'que persona',
    'qué costeña': 'qué persona',
    'que paisa': 'que persona',
    'qué paisa': 'qué persona',
    'que rolo': 'que persona',
    'qué rolo': 'qué persona',
    'que rola': 'que persona',
    'qué rola': 'qué persona',
    'que santandereano': 'que persona',
    'qué santandereano': 'qué persona',
    'que santandereana': 'que persona',
    'qué santandereana': 'qué persona',
    'que boyacense': 'que persona',
    'qué boyacense': 'qué persona',
    'que tolimense': 'que persona',
    'qué tolimense': 'qué persona',
    'que vallecaucano': 'que persona',
    'qué vallecaucano': 'qué persona',
    'que vallecaucana': 'que persona',
    'qué vallecaucana': 'qué persona',
    
    // Frases con "hijo de las mil putas" y variaciones
    'hijo de las mil putas': 'persona',
    'hija de las mil putas': 'persona',
    'hijo de la gran puta': 'persona',
    'hija de la gran puta': 'persona',
    'hijo de la madre': 'persona',
    'hija de la madre': 'persona',
    'hijo de la mierda': 'persona',
    'hija de la mierda': 'persona',
    'hijo de la verga': 'persona',
    'hija de la verga': 'persona',
    'hijo de la gonorrea': 'persona',
    'hija de la gonorrea': 'persona',
    'hijo de la marica': 'persona',
    'hija de la marica': 'persona',
    'hijo de la maricón': 'persona',
    'hija de la maricón': 'persona',
    'hijo de la mk': 'persona',
    'hija de la mk': 'persona',
    'hijo de la piroba': 'persona',
    'hija de la piroba': 'persona',
    'hijo de la hpta': 'persona',
    'hija de la hpta': 'persona',
    'hijo de la hpto': 'persona',
    'hija de la hpto': 'persona'
  };

    for (const [bad, good] of Object.entries(replacements)) {
        const regex = new RegExp(bad, 'gi');
        replacementText = replacementText.replace(regex, good);
    }

    return replacementText;
} 