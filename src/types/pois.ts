export interface POI {
    id: number
    type: string
    name: string
    lang: number
    lat: number
    icon: string
    description: string
    bookable: boolean
    services?: string[]
    amenities?: string[]
    activities?: string[]
    rating?: number
    terminals?: number
    entry_fee?: number
}