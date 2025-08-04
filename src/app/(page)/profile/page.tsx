import {Badge} from "@/components/ui/badge";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import FormUpdateProfile from "@/components/pages/profile/form.update.profile";
import {getUser} from "@/lib/actions/auth";

const ProfilePage = async () => {
    const userInfo = await getUserInfoFromCookie()
    const user = await getUser(userInfo?.id)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <p className="text-gray-600">Manage your account settings and preferences</p>
                </div>
                <Badge variant={userInfo?.role === "admin" ? "destructive" : "default"}>
                    {userInfo?.role === "admin" ? "Administrator" : "Business User"}
                </Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and profile information</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormUpdateProfile userInfo={user}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfilePage