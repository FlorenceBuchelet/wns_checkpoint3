import { COUNTRY } from "@/graphql/queries/country";
import type { CountryProps } from "@/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const id = (router.query.id as string)?.toUpperCase();

  const { data, loading, error } = useQuery(COUNTRY, {
    variables: {
      code: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country as CountryProps;

  return (
    <>
      <h1>Countries</h1>
      <ul>
        <li>{country.name}</li>
        <li>{country.emoji}</li>
        <li>{country.continent.name}</li>
        <li>{country.code}</li>
      </ul>
    </>
  );
}