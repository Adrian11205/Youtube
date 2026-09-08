import AuthGuard from "@/components/layout/AuthGuard";
import UploadVideo from "@/components/video/UploadVideo"

function Upload() {
    return (
        <AuthGuard>
            <UploadVideo />
        </AuthGuard>
    )
}

export default Upload