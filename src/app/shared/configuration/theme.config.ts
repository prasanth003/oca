import { iThemeProperties } from "../interface/theme.interface"

/**
 * Light theme configuration for ProACT 
*/
export const lightTheme: iThemeProperties = {
    name: 'light',
    properties: {
        '--primary-color': '#113785',
        '--secondary-color': '#ff97a3',
        '--background-color': '#fff',
        '--transparent-container': '#7e7e7e0f',
        '--border-color': '#ccc',
        '--text-color': '#1E1E1E',
        '--text-color-light': '#3e3e3e',
        '--scroll-bar': '#11378547',
        '--progress-bar': '#e6e6e6',
        '--green-color': '#008A19',
        '--red-color': '#C83A3A',
        '--green-light': '#CCE8D1',
        '--green-extra-light': '#cce8d19c',
        '--red-light': '#EFC4C4',
        '--red-extra-light': '#efc4c46f'
    }
}


/**
 * Dark theme configuration for ProACT 
*/
export const darkTheme: iThemeProperties = {
    name: 'dark',
    properties: {
        '--primary-color': '#113785',
        '--secondary-color': '#ff97a3',
        '--background-color': '#000',
        '--transparent-container': '#8f8f8f2f',
        '--border-color': '#2b2b2b',
        '--text-color': '#FAFAFA',
        '--text-color-light': '#c9c9c9',
        '--scroll-bar': '#424242f0',
        '--progress-bar': '#383838',
        '--green-color': '#41854d',
        '--red-color': '#a52f2f',
        '--green-light': '#2c4b32',
        '--green-extra-light': '#102614',
        '--red-light': '#591919',
        '--red-extra-light': '#78000054'  
    }
}