'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"

import { useGuideModal } from "@/hooks/use-guide-modal";
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),

});

export const GuideModal = () => {
    const guideModal = useGuideModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/guides', values);
            
            window.location.assign(`/${response.data.id}`);
            } catch (error) {
            toast.error('Something went wrong');
            } finally {
            setLoading(false);
            }
        };
    
    return (
        <Modal
            title="Create a new guide"
            description="Add a new skill to teach your community"
            isOpen={guideModal.isOpen}
            onClose={guideModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading}
                                            placeholder="Munity" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-6 space-x-2 flex-items-center justify-end w-full">
                            <Button 
                                disabled={loading}
                                variant="outline" 
                                onClick={guideModal.onClose}>
                                    Cancel
                            </Button>
                            <Button 
                                disabled={loading}
                                type="submit"
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};
