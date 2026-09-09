'use client'

import { Keyboard, Search } from "lucide-react";
import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Searchs() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [query, setQuery] = useState(searchParams.get("search") ?? "");

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (query.trim()) {
            params.set("search", query.trim());
        } else {
            params.delete("search");
        }

        router.push(`/?${params.toString()}`);
    };

    return (
        <form
            className="mx-auto h-10 w-150 max-w-3xl"
            onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
            }}
        >
            <InputGroup className="h-full rounded-full border border-border bg-background">
                <InputGroupInput
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search..."
                />
                <Keyboard className="mr-0 w-9 cursor-pointer" />
                <InputGroupButton
                    aria-label="Search"
                    size="sm"
                    className="mr-0 h-full w-16 cursor-pointer justify-center rounded-r-full border-l border-border px-0"
                >
                    <Search />
                </InputGroupButton>
            </InputGroup>
        </form>
    );
}

export default Searchs;