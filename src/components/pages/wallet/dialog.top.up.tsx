'use client';

import {
    Dialog,
    DialogContent, DialogDescription, DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Coins, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import FormTopUp from "@/components/pages/wallet/form.top.up";
import {TWallet} from "@/types/data";
import {useState} from "react";

const DialogTopUp = ({userId}
                           : {userId: number}) => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus></Plus>
                    Top up
                </Button>
            </DialogTrigger>
            <DialogContent className='h-[80vh] px-0'>
              <div className='overflow-y-auto custom-scroll px-6 space-y-6'>
                  <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                          <Coins className="h-5 w-5 text-primary"/>
                          <span>Top Up Points</span>
                      </DialogTitle>
                      <DialogDescription>Add funds to your account and convert them to points for
                          campaigns</DialogDescription>
                  </DialogHeader>

                  <FormTopUp
                      onClose={() => setOpen(false)}
                      userId={userId}
                  />
              </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogTopUp