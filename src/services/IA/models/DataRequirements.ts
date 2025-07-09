export type DataRequirement = {
    needsExperiences: boolean;
    needsProducts: boolean;
    needsPackages: boolean;
    needsSales: boolean;
    responseType: 'GENERAL' | 'EXPERIENCE' | 'PRODUCT' | 'PRODUCT_CATEGORIES' | 'PACKAGE' | 'SALES';
};

export type ContextData = {
    info?: string;
    experiences?: string;
    products?: string;
    productCategories?: string;
    packages?: string;
    sales?: string;
};

// Nuevos tipos para detección de intención
export type IntentType = 'packages' | 'products' | 'experiences' | 'categories' | 'none';

export type IntentRedirectTo = 'show_packages' | 'show_categories' | 'show_experiences' | 'show_products' | 'none';

export type IntentData = {
    type: IntentType;
    confidence: number;
    redirectTo: IntentRedirectTo;
    message: string;
    buttonText: string;
};

export type AIResponse = {
    text: string;
    intent: IntentData;
}; 