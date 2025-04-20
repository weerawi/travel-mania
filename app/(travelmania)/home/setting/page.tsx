// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"

// const Setting = () => {
//   return (
//     <div className="container mx-auto py-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Edit Profile</CardTitle>
//         </CardHeader>
//         <CardContent>

//         <div className="mb-6">
//             <div className="relative w-24">
//               <Avatar className="h-24 w-24">
//                 <AvatarImage
//                   src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fRXHTq1XM7BEPAH2xGfoaRIKDfamQP.png"
//                   alt="Profile"
//                 />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//               <Badge className="absolute -right-2 -bottom-1 h-6 w-6 rounded-full p-1" variant="default">
//                 ✏️
//               </Badge>
//             </div>
//           </div>
//           <form className="space-y-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <div className="font-medium">Your Name</div>
//                 <Input placeholder="Charene Reed" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">User Name</div>
//                 <Input placeholder="Charene Reed" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Email</div>
//                 <Input type="email" placeholder="charenere@gmail.com" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Password</div>
//                 <Input type="password" value="********" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Date of Birth</div>
//                 <Input type="date" defaultValue="1990-01-25" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Present Address</div>
//                 <Input placeholder="San Jose, California, USA" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Permanent Address</div>
//                 <Input placeholder="San Jose, California, USA" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">City</div>
//                 <Input placeholder="San Jose" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Postal Code</div>
//                 <Input placeholder="45962" />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Country</div>
//                 <Input placeholder="USA" />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Button className="w-24" type="submit">
//                 Save
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default Setting



///////////////////////////





// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// // import { toast } from "@/components/ui/use-toast"  

// const Setting = () => {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [userData, setUserData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     dateOfBirth: "",
//     presentAddress: "",
//     permanentAddress: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     profileImage: ""
//   })
  
//   // Get user from localStorage on component mount
//   useEffect(() => {
//     const checkUser = () => {
//       const storedUser = localStorage.getItem('user')
//       if (!storedUser) {
//         router.push('/auth/signin')
//         return null
//       }
//       return JSON.parse(storedUser)
//     }
    
//     const user = checkUser()
//     if (user) {
//       fetchUserData(user.id)
//     }
//   }, [router])
  
//   const fetchUserData = async (userId) => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`/api/user/profile?userId=${userId}`)
      
//       if (response.data.success) {
//         const user = response.data.user
//         setUserData({
//           name: user.name || "",
//           username: user.username || "",
//           email: user.email || "",
//           dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "",
//           presentAddress: user.presentAddress || "",
//           permanentAddress: user.permanentAddress || "",
//           city: user.city || "",
//           postalCode: user.postalCode || "",
//           country: user.country || "",
//           profileImage: user.profileImage || ""
//         })
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error)
//       // toast({
//       //   title: "Error",
//       //   description: "Failed to load profile information",
//       //   variant: "destructive"
//       // })
//     } finally {
//       setIsLoading(false)
//     }
//   }
  
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setUserData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }
  
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     try {
//       const userId = JSON.parse(localStorage.getItem('user')).id
      
//       const response = await axios.put('/api/user/profile', {
//         userId,
//         ...userData
//       })
      
//       if (response.data.success) {
//         // Update user in localStorage
//         const updatedUser = {
//           ...JSON.parse(localStorage.getItem('user')),
//           name: userData.name,
//           email: userData.email
//         }
//         localStorage.setItem('user', JSON.stringify(updatedUser))
        
//         // toast({
//         //   title: "Success",
//         //   description: "Profile updated successfully",
//         //   variant: "success"
//         // })
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error)
//       // toast({
//       //   title: "Error",
//       //   description: error.response?.data?.error || "Failed to update profile",
//       //   variant: "destructive"
//       // })
//     } finally {
//       setIsLoading(false)
//     }
//   }
  
//   // Handle avatar upload - you'll need to implement file upload functionality
//   const handleAvatarChange = () => {
//     // Implement file upload logic here
//     // This is a placeholder for where you'd handle image upload
//     console.log("Avatar change clicked")
//   }
  
//   return (
//     <div className="container mx-auto py-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Edit Profile</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-6">
//             <div className="relative w-24">
//               <Avatar className="h-24 w-24">
//                 <AvatarImage
//                   src={userData.profileImage || "/default-avatar.png"}
//                   alt="Profile"
//                 />
//                 <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
//               </Avatar>
//               <Badge 
//                 className="absolute -right-2 -bottom-1 h-6 w-6 rounded-full p-1 cursor-pointer" 
//                 variant="default"
//                 onClick={handleAvatarChange}
//               >
//                 ✏️
//               </Badge>
//             </div>
//           </div>
          
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <div className="font-medium">Your Name</div>
//                 <Input 
//                   name="name"
//                   value={userData.name} 
//                   onChange={handleChange}
//                   placeholder="Your Name" 
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">User Name</div>
//                 <Input 
//                   name="username"
//                   value={userData.username} 
//                   onChange={handleChange}
//                   placeholder="Username" 
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Email</div>
//                 <Input 
//                   type="email" 
//                   name="email"
//                   value={userData.email} 
//                   onChange={handleChange}
//                   placeholder="email@example.com" 
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Password</div>
//                 <Input 
//                   type="password" 
//                   value="********" 
//                   readOnly
//                   onClick={() => router.push('/settings/change-password')}
//                   className="cursor-pointer"
//                 />
//                 <p className="text-xs text-gray-500">Click to change password</p>
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Date of Birth</div>
//                 <Input 
//                   type="date" 
//                   name="dateOfBirth"
//                   value={userData.dateOfBirth} 
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Present Address</div>
//                 <Input 
//                   name="presentAddress"
//                   value={userData.presentAddress} 
//                   onChange={handleChange}
//                   placeholder="Your current address" 
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Permanent Address</div>
//                 <Input 
//                   name="permanentAddress"
//                   value={userData.permanentAddress} 
//                   onChange={handleChange}
//                   placeholder="Your permanent address" 
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">City</div>
//                 <Input 
//                   name="city"
//                   value={userData.city} 
//                   onChange={handleChange}
//                   placeholder="City" 
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Postal Code</div>
//                 <Input 
//                   name="postalCode"
//                   value={userData.postalCode} 
//                   onChange={handleChange}
//                   placeholder="Postal Code" 
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="font-medium">Country</div>
//                 <Input 
//                   name="country"
//                   value={userData.country} 
//                   onChange={handleChange}
//                   placeholder="Country" 
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Button 
//                 className="w-24" 
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Saving..." : "Save"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default Setting










"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const Setting = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
    profileImage: ""
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }
        
        const userData = await response.json()
        console.log("Fetched user data:", userData)
        
        // Format the date of birth if it exists
        if (userData.dateOfBirth) {
          const date = new Date(userData.dateOfBirth)
          userData.dateOfBirth = date.toISOString().split('T')[0]
        }
        
        setUser(userData)
      } catch (error) {
        console.log('Error fetching user data:', error)
        // setError('Failed to load user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Update form field values
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      console.log("Submitting user data:", user)
      
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('Profile updated successfully:', result)
    } catch (error) {
      console.log('Error updating profile:', error)
    }
  }

  if (loading) {
    return <div className="container mx-auto py-6">Loading user data...</div>
  }

  if (error) {
    return <div className="container mx-auto py-6">Error: {error}</div>
  }

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
                  src={user.profileImage || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fRXHTq1XM7BEPAH2xGfoaRIKDfamQP.png"}
                  alt="Profile"
                />
                <AvatarFallback>{user.name?.substring(0, 2).toUpperCase() || "CN"}</AvatarFallback>
              </Avatar>
              <Badge className="absolute -right-2 -bottom-1 h-6 w-6 rounded-full p-1" variant="default">
                ✏️
              </Badge>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="font-medium">Your Name</div>
                <Input 
                  name="name" 
                  value={user.name} 
                  onChange={handleChange} 
                  placeholder="Enter your name" 
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">User Name</div>
                <Input 
                  name="username" 
                  value={user.username} 
                  onChange={handleChange} 
                  placeholder="Enter username" 
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Email</div>
                <Input 
                  type="email" 
                  name="email" 
                  value={user.email} 
                  onChange={handleChange} 
                  placeholder="Enter email" 
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Date of Birth</div>
                <Input 
                  type="date" 
                  name="dateOfBirth" 
                  value={user.dateOfBirth || ''} 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Present Address</div>
                <Input 
                  name="presentAddress" 
                  value={user.presentAddress} 
                  onChange={handleChange} 
                  placeholder="Enter present address" 
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Permanent Address</div>
                <Input 
                  name="permanentAddress" 
                  value={user.permanentAddress} 
                  onChange={handleChange} 
                  placeholder="Enter permanent address" 
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">City</div>
                <Input 
                  name="city" 
                  value={user.city} 
                  onChange={handleChange} 
                  placeholder="Enter city" 
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Postal Code</div>
                <Input 
                  name="postalCode" 
                  value={user.postalCode} 
                  onChange={handleChange} 
                  placeholder="Enter postal code" 
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Country</div>
                <Input 
                  name="country" 
                  value={user.country} 
                  onChange={handleChange} 
                  placeholder="Enter country" 
                />
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