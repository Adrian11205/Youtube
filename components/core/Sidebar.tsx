import { Menu, House } from 'lucide-react'

function Sidebar() {
    return (
        <div>
            <div className="flex h-14 items-center bg-background w-16">
                <Menu className="ml-4" />
                <House className="ml-4 " />
            </div>
        </div>
    )
}

export default Sidebar