import { Download, Eye, Loader2Icon, MoreVertical, Pen, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'


function ResumeCardItem({ resume , refreshData}) {

  const navigation = useNavigate();
  const [openAlert,setOpenAlert]=useState(false);
  const [loading,setLoading]=useState(false);


  const onDelete=()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    },(error)=>{
      setLoading(false);
    })
  }

  const documentId = resume?.documentId;
  const themeColor = resume?.themeColor;
  const title = resume?.Title;

  return (
    <div
      className="relative p-10 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 
        h-[330px] rounded-lg border-t-4 shadow-md hover:shadow-xl transition-all duration-300 
        transform hover:-translate-y-2 hover:border-opacity-80 flex flex-col items-center"
      style={{ borderColor: themeColor }}
    >
      <div className="flex items-center justify-center flex-grow">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/024/235/881/small_2x/cv-icon-resume-illustration-sign-user-data-symbol-or-logo-vector.jpg"
          alt="Resume Icon"
          className="rounded-2xl border-4 border-white w-28 h-28 transition-all duration-300 
            group-hover:scale-105"
        />
      </div>

      {/* Title and MoreVertical icon in the same row, justified between */}
      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
          {title}
        </h2>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none focus:outline-none">
              <MoreVertical className="h-4 w-4 cursor-pointer text-gray-600 hover:text-indigo-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-gray-200 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
            <DropdownMenuItem className="cursor-pointer text-gray-800 hover:bg-gray-100 hover:bg-opacity-50"
              onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}>
              <Pen /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-800 hover:bg-gray-100 hover:bg-opacity-50"
              onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>
              <Eye />View
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-800 hover:bg-gray-100 hover:bg-opacity-50"
              onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>
              <Download /> Download
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-800 hover:bg-gray-100 hover:bg-opacity-50"
            onClick={()=>setOpenAlert(true)}>
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading? <Loader2Icon className='animate-spin'/>:'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}

export default ResumeCardItem;