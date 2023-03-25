import { iThemeProperties } from "../interface/theme.interface"

/**
 * Light theme configuration for ProACT 
*/
export const lightTheme: iThemeProperties = {
    name: 'light',
    properties: {
        '--text-color': '#1E1E1E',
        '--background-color': '#fff',
        '--background-cards': '#FFF',
        '--model-color': '#fff',
        '--border-color': '#485E90',
        '--shadow': '#00000033',
        '--border': '#1e1e1e1f',
        '--primary-color': '#113785',
        '--base-black': '#000',
        '--base-white' : '#FAFAFA',
        '--brand-green': '#26C16E',
        '--brand-blue': '#3278B3',
        '--brand-red': '#B13335',
        '--brand-yellow':'#FFA800',
        '--brand-light-green': '#26C16E',
        '--brand-light-blue': '#3278B3',
        '--brand-light-red': '#B13335',
        '--brand-light-yellow':'#FFA800',
        '--brand-grey': '#7F7F7F',
        '--brand-light-grey': '#DDDDDD',
        '--gray-base': '#CCC',
        '--transparent-text': '#1e1e1e5f',
        '--transparent-container': '#1e1e1e14',
        '--secondary-text-color': '#363636',   
        '--table-odd-color': '#F3F9FF',
        '--table-even-color': '#e1f1ff',
        '--table-row-selection': '#d3e8ff',
        '--secondary-card': '#f7f7f7'
    }
}


/**
 * Dark theme configuration for ProACT 
*/
export const darkTheme: iThemeProperties = {
    name: 'dark',
    properties: {
        '--text-color': '#FAFAFA',
        '--background-color': '#000',
        '--background-cards': '#1E1E1E',
        '--model-color': '#424242',
        '--border-color': '#485E90',
        '--shadow': '#0000005c',
        '--border': '#fafafa1f',
        '--primary-color': '#113785',
        '--base-black': '#000',
        '--base-white' : '#FAFAFA',
        '--brand-green': '#26C16E',
        '--brand-blue': '#3278B3',
        '--brand-red': '#B13335',
        '--brand-yellow':'#FFA800',
        '--brand-light-green': '#26C16E',
        '--brand-light-blue': '#3278B3',
        '--brand-light-red': '#B13335',
        '--brand-light-yellow':'#FFA800',
        '--brand-grey': '#7F7F7F',
        '--brand-light-grey': '#DDDDDD',
        '--gray-base': '#CCC',
        '--transparent-text': '#cccccc2b',
        '--transparent-container': '#cccccc2f',
        '--secondary-text-color': '#A7A7A7', 
        '--table-odd-color': '#333333',
        '--table-even-color': '#555555',
        '--table-row-selection': '#293d53',
        '--secondary-card': '#90909033'
    }
}