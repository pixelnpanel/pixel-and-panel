// Requested quantities are inquiry details, not confirmed order prices.
export function validQuantity(value) {
    const quantity = Number(value)
    return Number.isInteger(quantity) && quantity > 0 && quantity <= 100000 ? String(quantity) : ''
}

export function quoteSelectionLines({ size = '', side = '', quantity = '', language = 'English' }) {
    const spanish = language === 'Spanish'
    return [
        size && `${spanish ? 'Tamaño' : 'Size'}: ${size}`,
        side && `${spanish ? 'Opción' : 'Option'}: ${side}`,
        validQuantity(quantity) && `${spanish ? 'Cantidad' : 'Quantity'}: ${validQuantity(quantity)}`,
    ].filter(Boolean)
}
