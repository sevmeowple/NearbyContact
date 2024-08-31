interface ISiteBase {
    name: string
    description: string
}

export interface IDestination extends ISiteBase {
    genderLimit: "M" | "F" | null
}

export interface IDeparture extends ISiteBase {
    credential: string | null
}
