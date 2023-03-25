/**
 * Format the number to comma separated readable number
 * @param numToConvert number
 * @returns the readable number
*/
export function formatNumber(numToConvert: number = 0): string {
    if (!numToConvert || typeof numToConvert !== 'number') return '0';
    
    const options = { 
        style: 'decimal', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
        currency: 'INR' 
    };

    return numToConvert.toLocaleString('en-IN', options);
}