import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface PopupNotificationProps {
  message: string;
}

export const PopupNotification: React.FC<PopupNotificationProps> = ({ message }) => {
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
    <Alert className="w-96 animate-pulse shadow-lg border-4 border-gray-600 flex flex-col items-center text-center space-y-4 p-4">
        <div className="flex items-center justify-center space-x-2">
        <AlertCircle className="h-8 w-8 text-red-600" />
        <AlertTitle className="text-2xl font-bold">Session Expired</AlertTitle>
        </div>
        <AlertDescription className="text-lg">
        {message}
        </AlertDescription>
    </Alert>
    </div>
  </>
  );
};

