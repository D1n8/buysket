export const DeclinationRubles = (num: number): string => {
    if ([0, 2, 3, 4].includes(num % 10)) return 'рубля';
    if (num % 10 === 1) return 'рубль';
    return 'рублей'
}