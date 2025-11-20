
export const parsePrice = (priceString: string): number => {
    return parseInt(priceString.replace(/\$|\./g, ''), 10);
};

export const formatPrice = (priceNumber: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(priceNumber);
};
