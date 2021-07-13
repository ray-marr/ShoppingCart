export const formatPrice = price => {
    return price.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' });
};