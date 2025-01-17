import { gql } from "@apollo/client";

export const COUNTRY = gql`
    query Country($code: String!) {
        country(code: $code) {
            id
            code
            name
            emoji
            continent {
                name
            }
        }
    }
`;