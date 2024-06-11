"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";




const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const { singleData, type, refetch, isDeleting } = useAppSelector(
    (state) => state.tableReducer
  );
  const { activeTab } = useAppSelector((state) => state.authReducer);





  const { language } = useAppSelector((state) => state.dashboardReducer);

  const handleDelete = async () => {


  };

  return (
    <Dialog>
      <DialogTrigger
        className={`${
       
        " w-full flex items-center gap-2 py-3 px-4 hover:bg-secondary "
        }cursor-pointer`}
      >
         <RiDeleteBin6Line fontSize={20} />
        <p
          className={`
           text-[13.4px] leading-5 text-textColor`}
        >
         
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[484px] rounded-t-lg rounded-b-none  py-4 px-5 flex flex-col justify-between gap-3">
        <DialogHeader className="pt-1 pb-4">
          <h1 className="text-textColor font-semibold text-2xl tracking-tight">
            Are you sure you want to delete?
          </h1>
        </DialogHeader>

        <p className="text-[13.4px] leading-[22px]">
          <span className="font-semibold">
            {type === "comment"
              ? singleComment.comment_text
              : singleData.title ||
                singleData.name ||
                singleData.media_name ||
                singleData.member?.label ||
                singleData.agenda}
          </span>{" "}
          will be permanently deleted from the system. Do you want to delete?
        </p>
        <div className="flex justify-end pt-4 pb-2 gap-4">
          <DialogClose className="text-primary hover:text-red-800">
            Cancel
          </DialogClose>
          <Button
            disabled={isDeleting}
            className={`${
              isDeleting ? "bg-primary" : "bg-secondary"
            } text-textColor text-base font-semibold rounded-sm hover:bg-primary hover:text-white`}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <RotatingLines
                visible={true}
                width="20"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor="white"
              />
            ) : (
              " Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
