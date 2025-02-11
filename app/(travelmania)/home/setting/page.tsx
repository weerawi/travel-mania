"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const Setting = () => {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>

        <div className="mb-6">
            <div className="relative w-24">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fRXHTq1XM7BEPAH2xGfoaRIKDfamQP.png"
                  alt="Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Badge className="absolute -right-2 -bottom-1 h-6 w-6 rounded-full p-1" variant="default">
                ✏️
              </Badge>
            </div>
          </div>
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="font-medium">Your Name</div>
                <Input placeholder="Charene Reed" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">User Name</div>
                <Input placeholder="Charene Reed" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Email</div>
                <Input type="email" placeholder="charenere@gmail.com" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Password</div>
                <Input type="password" value="********" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Date of Birth</div>
                <Input type="date" defaultValue="1990-01-25" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Present Address</div>
                <Input placeholder="San Jose, California, USA" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Permanent Address</div>
                <Input placeholder="San Jose, California, USA" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">City</div>
                <Input placeholder="San Jose" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Postal Code</div>
                <Input placeholder="45962" />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Country</div>
                <Input placeholder="USA" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="w-24" type="submit">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Setting

