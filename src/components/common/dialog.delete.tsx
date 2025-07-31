'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";


interface DialogDeleteProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    name: string
    onConfirm: () => Promise<boolean>
    successMessage?: string
    errorMessage?: string
}

const DialogDelete = ({
                          open,
                          onOpenChange,
                          name,
                          onConfirm,
                          successMessage,
                          errorMessage
                      }: DialogDeleteProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const result = await onConfirm()
            if (!result) return toast.error(errorMessage || `Unable to delete ${name}`)
            toast.success(successMessage || `${name} has been successfully deleted`)
            router.refresh()
            onOpenChange(false)
        } catch (error) {
            console.error(error)
            toast.error(errorMessage || `Error deleting ${name}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-4 text-red-600">
                        <AlertTriangle className="size-5" />
                        Confirm delete
                    </DialogTitle>
                </DialogHeader>

                <div className="text-sm text-muted-foreground px-1 py-2">
                    Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isLoading}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        className="text-white"
                        onClick={handleDelete}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogDelete
