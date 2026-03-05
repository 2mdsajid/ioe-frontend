'use client'

import QRViewer from "@/components/reusable/QrViewer"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import ImageUploaderComponent from "@/components/uploadthing/ImageUploaderComponent"
import { createSubscriptionRequest } from "@/lib/actions/users.actions"
import { PREMIUM_PRICING_DATA } from "@/lib/data/premium.data"
import { TBaseUser } from "@/lib/schema/users.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, CheckCircle, Loader2, Send, ShieldCheck, Activity, Cpu } from "lucide-react"
import Link from "next/link"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
    phone: z.string().refine(value => /^\d{10,}$/g.test(value), {
        message: "A valid 10-digit phone number is required."
    }),
});

type Props = { user: TBaseUser }

const SupportFooter = () => {
    return (
        <footer className="mt-12 text-center text-sm text-slate-500 relative z-10 border-t border-slate-200 pt-8">
            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-3">System Support Interfaces</p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                <a href="https://www.facebook.com/edu.locus" className="font-bold text-blue-600 hover:text-slate-900 transition-colors" target="_blank">Facebook</a>
                <span className="text-slate-300">•</span>
                <a href="https://wa.me/9779763249052" className="font-bold text-blue-600 hover:text-slate-900 transition-colors" target="_blank">WhatsApp</a>
                <span className="text-slate-300">•</span>
                <a href="mailto:support@ioelocus.com" className="font-bold text-blue-600 hover:text-slate-900 transition-colors">Email</a>
            </div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mt-8">
                IOE LOCUS &bull; CORE_v1.0.2
            </p>
        </footer>
    );
};

const FullSubscriptionForm = ({ user }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Kept your initial state exactly as provided
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const streamInfo = PREMIUM_PRICING_DATA;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { phone: "" },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (uploadedImages.length === 0) {
            toast.error("Missing Receipt", { description: "Please upload your transaction receipt to proceed." });
            return;
        }
        setIsSubmitting(true);
        const { data, message } = await createSubscriptionRequest({
            name: user.name,
            email: user.email,
            phone: values.phone,
            amount: streamInfo.discountPrice,
            plan: streamInfo.duration,
            transactionImage: uploadedImages[0],
        });
        setIsSubmitting(false);
        if (!data) {
            toast.error("Initialization Failed", { description: message || "Protocol error. Please try again." });
        } else {
            setIsSuccess(true);
        }
    }

    if (isSuccess) {
        return (
            <div className="flex items-center justify-center p-4 w-full relative z-10">
                <div className="w-full max-w-lg text-center bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 p-10">
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-sm">
                        <CheckCircle className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">License Requested!</h1>
                    <p className="text-slate-500 mb-8 font-medium text-sm leading-relaxed">
                        Your transaction telemetry has been received. Our team will verify the data and grant Pro access to your workspace shortly.
                    </p>
                    <Link href="/dashboard">
                        <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[11px] py-7 rounded-xl transition-all shadow-md">
                            Return to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10 pb-20 pt-5 px-4">
            <div className="max-w-2xl mx-auto">
                
                {/* --- Header --- */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-white border border-slate-200 text-blue-600 mb-6 shadow-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Node</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6">
                        Activate Pro License
                    </h1>
                    
                    {/* Pricing Badge */}
                    <div className="inline-flex justify-center items-center gap-x-4 bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">Rs {streamInfo.discountPrice}</span>
                        <div className="h-10 w-px bg-slate-200 mx-2"></div>
                        <span className="text-lg font-bold text-slate-400 line-through decoration-slate-300">Rs {streamInfo.actualPrice}</span>
                    </div>
                </header>

                <div className="space-y-6">
                    
                    {/* --- STEP 1: Payment --- */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-bold text-white shadow-sm">01</div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Initialize Payment</h3>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-center"> 
                            <QRViewer email={user.email} />
                        </div>
                    </div>

                    {/* --- STEP 2: Receipt Upload --- */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-bold text-white shadow-sm">02</div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Verify Transaction</h3>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-6 border-l-2 border-slate-200 pl-4">
                            Upload a screenshot of your successful transaction to authenticate the payment.
                        </p>
                        
                        {uploadedImages.length > 0 ? (
                            <div className="relative group overflow-hidden rounded-xl border border-blue-200 shadow-sm">
                                <img src={uploadedImages[0]} alt="Receipt" className="w-full" />
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                    <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm border border-blue-100 shadow-sm flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Receipt Verified
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-400 transition-colors p-2">
                                <ImageUploaderComponent images={uploadedImages} SetImages={setUploadedImages} />
                            </div>
                        )}
                    </div>

                    {/* --- STEP 3: Submit Details --- */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-bold text-white shadow-sm">03</div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Finalize Registration</h3>
                        </div>
                        
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-black text-slate-500 uppercase text-[10px] tracking-widest">Contact Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-14 bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-blue-600 rounded-xl px-4 font-medium"
                                                    placeholder="e.g., 9845999999"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-rose-500 text-xs font-bold" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="w-full h-14 text-[11px] font-bold bg-slate-900 hover:bg-blue-600 text-white uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                                    type="submit"
                                    disabled={isSubmitting || uploadedImages.length === 0}
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="h-5 w-5 animate-spin" /> Processing Data...</>
                                    ) : (
                                        <>Initialize Workspace <Cpu className="h-4 w-4" /></>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                <SupportFooter />
            </div>
        </div>
    );
}

export default FullSubscriptionForm;