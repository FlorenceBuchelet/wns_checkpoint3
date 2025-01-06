import Link from "next/link";
import { COUNTRIES } from "@/graphql/queries/countries";
import type { CountryProps } from "@/types";
import { useQuery } from "@apollo/client";

function Sidebar() {
    const { data, loading, error } = useQuery(COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <aside className="sidebar">
            <ul>
                {data.countries.map((country: CountryProps) => (
                    <Link href={`/country/${country.code}`} key={country.code}>{country.name} {country.emoji}</Link>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;