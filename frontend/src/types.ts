// TODO

export interface CountryProps {
    id: number;
    code: string;
    name: string;
    emoji: string;
    continent: ContinentProps;
}

export interface ContinentProps {
    id: number;
    name: string;
}