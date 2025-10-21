export const DeclinationRubles = (num: number): string => {
    if ([11,12,13,14,15,16,17,18,19].includes(num % 100)) return 'рублей'
    if ([2, 3, 4].includes(num % 10)) return 'рубля';
    if (num % 10 === 1) return 'рубль';
    return 'рублей'
}