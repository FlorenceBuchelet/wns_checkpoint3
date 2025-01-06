import { ADD_COUNTRY } from "@/graphql/mutations/addCountry";
import { useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { CONTINENTS } from "@/graphql/queries/continents";
import type { ContinentProps } from "@/types";

export default function Home() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emojiRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const [selectedContinent, setSelectedContinent] = useState<string>("");

    const [countryData, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_COUNTRY);
    const { data: continentsData, loading: continentsLoading, error: continentsError } = useQuery(CONTINENTS);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = nameRef.current?.value;
        const emoji = emojiRef.current?.value;
        const code = codeRef.current?.value;

        if (!name || !emoji || !selectedContinent || !code) {
            alert("All fields are required!");
            return;
        }

        try {
            await countryData({
                variables: {
                    data: {
                        name,
                        emoji,
                        code,
                        continent: {
                            id: Number.parseInt(selectedContinent),
                        },
                    },
                },
            });
            alert("Country added successfully!");
        } catch (err) {
            console.error(err);
        }
    };

    if (continentsLoading) return <p>Loading continents...</p>;
    if (continentsError) return <p>Error loading continents: {continentsError.message}</p>;

    return (
        <>
            <h1>Add new country</h1>
            {mutationLoading && <p>Submitting...</p>}
            {mutationError && <p>Error: {mutationError.message}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Name:&nbsp;
                    <input type="text" name="name" ref={nameRef} />
                </label>

                <label>
                    Emoji:&nbsp;
                    <input type="text" name="emoji" ref={emojiRef} />
                </label>

                <label>
                    Continent:&nbsp;
                    <select
                        value={selectedContinent}
                        onChange={(e) => setSelectedContinent(e.target.value)}
                    >
                        <option value="" disabled>
                            Select a continent
                        </option>
                        {continentsData?.continents.map((continent: ContinentProps) => (
                            <option key={continent.id} value={continent.id}>
                                {continent.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Code:&nbsp;
                    <input type="text" name="code" ref={codeRef} />
                </label>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}
