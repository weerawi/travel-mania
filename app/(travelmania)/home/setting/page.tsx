"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const Setting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    username: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
    profileImage: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const profile = "/assets/profile.png";

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Get user email from localStorage
        const user = localStorage.getItem("user");
        const userEmail = JSON.parse(user)?.email ;
        // console.log("User email from localStorage:", userEmail);
        if (!userEmail) {
          setErrorMessage("User not logged in");
          setIsLoading(false);
          return;
        }
        
        const response = await axios.get(`/api/user/profile?email=${userEmail}`);

        // Format date for input if it exists
        const userDataFromServer = response.data;
        if (userDataFromServer.dateOfBirth) {
          const date = new Date(userDataFromServer.dateOfBirth);
          userDataFromServer.dateOfBirth = date.toISOString().split("T")[0];
        }

        setUserData(userDataFromServer);
        console.log("Fetched user data:", userDataFromServer);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      console.log("Submitting user data:", userData);
      // Get user email from localStorage
      const user = localStorage.getItem("user");
      const userEmail = JSON.parse(user)?.email ;
      
      const response = await axios.put(`/api/user/profile?email=${userEmail}`, userData);

      setSuccessMessage("Profile updated successfully");
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(
        error.response?.data?.error || "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto pt-5">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          <div className="mb-2">
            <div className="relative w-20">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={userData.profileImage || profile}
                  alt="Profile"
                />
                <AvatarFallback>
                  {userData.name?.substring(0, 2).toUpperCase() || "UN"}
                </AvatarFallback>
              </Avatar>
              {/* <Badge
                className="absolute -right-2 -bottom-1 h-6 w-6 rounded-full p-1"
                variant="default"
              >
                ✏️
              </Badge> */}
            </div>
          </div>
          <form className="space-y-1" onSubmit={handleSubmit}>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <div className="font-medium">Your Name</div>
                <Input
                  name="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">User Name</div>
                <Input
                  name="username"
                  value={userData.username || ""}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">Email</div>
                <Input
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                  readOnly
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">Date of Birth</div>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">Present Address</div>
                <Input
                  name="presentAddress"
                  value={userData.presentAddress || ""}
                  onChange={handleChange}
                  placeholder="Present Address"
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">Permanent Address</div>
                <Input
                  name="permanentAddress"
                  value={userData.permanentAddress || ""}
                  onChange={handleChange}
                  placeholder="Permanent Address"
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">City</div>
                <Input
                  name="city"
                  value={userData.city || ""}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">Postal Code</div>
                <Input
                  name="postalCode"
                  value={userData.postalCode || ""}
                  onChange={handleChange}
                  placeholder="Postal Code"
                />
              </div>

              <div className="space-y-1">
                <div className="font-medium">Country</div>
                <Input
                  name="country"
                  value={userData.country || ""}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>

              <div className="flex justify-end items-end">
              <Button className="w-20" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
            </div>

            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;