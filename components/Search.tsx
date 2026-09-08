import { Keyboard, Search } from "lucide-react"

import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"

 function Searchs() {
    return (
        <InputGroup className="mx-auto h-10 w-150 max-w-3xl rounded-full border border-border bg-background">

            <InputGroupInput placeholder="Search..." />
            <Keyboard  className="mr-0 w-9 cursor-pointer"/>

            <InputGroupButton
                aria-label="Search"
                size="sm"
                className="mr-0 h-full w-16 justify-center rounded-r-full border-l border-border px-0 cursor-pointer"
            >
                <Search />
            </InputGroupButton>
        </InputGroup>
    )
}

export default Searchs