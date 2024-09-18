import en from '@/localization/en.json'

interface Localization {
    [key: string]: string
}

const enLocalization: Localization = en

const translate = (key: string): string => {
    // return key if value not found
    return enLocalization[key] || key
}

export { translate }
