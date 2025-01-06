import { COUNTRIES } from "@/graphql/queries/countries";
import type { CountryProps } from "@/types";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { data, loading, error } = useQuery(COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Countries</h1>
      <ul>
        {data.countries.map((country: CountryProps) => (
          <li key={country.code}>{country.name} {country.emoji}</li>
        ))}
      </ul>
    </>
  );
}
