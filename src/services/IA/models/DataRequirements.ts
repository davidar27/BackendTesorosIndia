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