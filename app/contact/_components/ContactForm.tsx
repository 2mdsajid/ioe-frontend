'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createUserFeedback } from "@/lib/actions/users.actions"
import Link from "next/link"
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { Mail, Cpu, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import SubmitButton from "@/components/reusable/SubmitButton"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must have at least 2 characters" }),
    email: z.string().email({
        message: "Invalid email format",
    }),
    message: z.string().max(300, { message: "Message cannot exceed 300 characters" }),
})

const FeedbackForm = () => {
    const [issubmitclicked, setIsSubmitClicked] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitClicked(true)
        const { data, message } = await createUserFeedback({
            name: values.name,
            email: values.email,
            message: values.message
        })

        if (!data) {
            toast.warning(message)
            return setIsSubmitClicked(false)
        }

        setIsSubmitClicked(false)
        form.reset();
        return toast.success("Inquiry Logged. Our technical team will review it shortly.")
    }

    return (
        <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="space-y-1 pt-8 pb-4 text-center">
                <div className="mx-auto w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-2 shadow-sm shadow-blue-50">
                    <Cpu className="w-5 h-5" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                    Technical <span className="text-blue-600">Support</span>
                </CardTitle>
                <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                    System Feedback & Inquiries
                </CardDescription>
            </CardHeader>

            <CardContent className="px-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Candidate Name</FormLabel>
                                    <FormControl>
                                        <Input className='bg-slate-50 border-slate-200 text-slate-900 rounded-lg py-5 focus:border-blue-600 transition-colors text-sm' placeholder="Arpan ..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-[10px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Return Email</FormLabel>
                                    <FormControl>
                                        <Input className='bg-slate-50 border-slate-200 text-slate-900 rounded-lg py-5 focus:border-blue-600 transition-colors text-sm' placeholder="student@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-[10px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Technical Query</FormLabel>
                                    <FormControl>
                                        <Textarea className='bg-slate-50 border-slate-200 text-slate-900 rounded-lg min-h-[100px] focus:border-blue-600 transition-colors text-sm resize-none' placeholder="Describe your issue or suggestion..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-[10px]" />
                                </FormItem>
                            )}
                        />
                        
                        <SubmitButton
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest py-6 rounded-lg transition-all shadow-md shadow-blue-100' 
                            initialstate='Log Inquiry' 
                            loadingstate='Syncing...' 
                            isLoadingState={issubmitclicked} 
                        />
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="flex flex-col items-center bg-slate-50/50 pt-6 pb-8 px-8 border-t border-slate-100">
                <div className="w-full text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Support Nodes</p>
                    <div className="flex justify-center gap-3">
                        <Link href="https://www.facebook.com/edu.locus" target="_blank" className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all group">
                            <FaFacebookF className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link href="https://wa.me/9779763249052" target="_blank" className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all group">
                            <FaWhatsapp className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link href="mailto:edulocusweb@gmail.com" className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all group">
                            <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-blue-600/50" />
                    Secure Interface &bull; <Link href="/privacy" className="text-blue-600/70 hover:text-blue-600 transition-all">Privacy</Link>
                </div>
            </CardFooter>
        </Card>
    )
}

export default FeedbackForm