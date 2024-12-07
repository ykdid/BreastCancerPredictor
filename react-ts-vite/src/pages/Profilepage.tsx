import { useState,useEffect,useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

interface User {
  userName: string;
  email: string;
  predictionResults?: number[] | null;
  hashPassword?: string | null;
}

export default function ProfilePage() {
  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState<User>({
    userName: '',
    email: '',
    predictionResults: null,
    hashPassword:null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState<User>(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/User/get-user/${userId}`,{
            
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }); 
        setUser(response.data); 
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };
    if (userId) {
        fetchUser();
      }
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempUser(user);
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(`http://localhost:8082/api/User/update-user/${userId}`, {
        userName: tempUser.userName,
        email: tempUser.email,
        hashPassword: tempUser.hashPassword || "string", // Backend'in kabul edeceği bir değer
        predictionResults: tempUser.predictionResults || null,
      });
      setUser({
        ...response.data,
        email: tempUser.email, 
      }); 
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating user data");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempUser(user);
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="bg-white shadow-md rounded-lg p-12 w-full max-w-xl ">
        <h1 className="text-2xl font-bold mb-4 text-pink-500">Profile</h1>
        <div className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            {isEditing ? (
              <Input
                id="username"
                value={tempUser.userName}
                onChange={(e) => setTempUser({ ...tempUser, userName: e.target.value })}
              />
            ) : (
              <p>{user.userName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={tempUser.email}
                onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>
          {isEditing ? (
            <div>
              <Button onClick={handleSave} className="mr-2">Save</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={handleEdit} className='mr-4'>Edit Profile</Button>
          )}
          <ChangePasswordDialog />
        </div>
      </div>
    </div>
  );
}

function ChangePasswordDialog() {
  const { userId } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
        await axios.patch(`http://localhost:8082/api/User/change-password/${userId}`, { 
        currentPassword,
        newPassword,
      });
        toast.success("Password changed successfully");
        setCurrentPassword('');
        setNewPassword('');
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Error changing password");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and a new password to change it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-password" className="text-right">
              Current
            </Label>
            <Input
              id="current-password"
              type="password"
              className="col-span-3"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-password" className="text-right">
              New
            </Label>
            <Input
              id="new-password"
              type="password"
              className="col-span-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleChangePassword}>Change Password</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
