export const formatImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
    }
    return `/images/${imagePath}`;
};