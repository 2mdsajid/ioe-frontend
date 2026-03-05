'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { createTrialRequest } from '@/lib/actions/users.actions'
import { trialPageText } from "@/lib/data/premium.data"
import { TBaseUser } from "@/lib/schema/users.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, CheckCircle, Gift, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

type Props = {
  user: TBaseUser;
  language: 'en' | 'np'; // Language prop for localization
}

const CreateTrialForm = (props: Props) => {
  const { user, language } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const text = trialPageText[language];

  const formSchema = z.object({
    phone: z.string()
      .refine(value => /^\d{10,}$/g.test(value), {
        message: text.form.phoneError
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { data, message } = await createTrialRequest({
      name: user.name,
      email: user.email,
      phone: values.phone,
    });

    if (!data) {
      toast.error(text.toast.errorTitle, {
        description: message || text.toast.errorDesc,
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  }

  // --- Success State Card ---
  if (isSuccess) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-gray-800 border-2 border-green-500 shadow-2xl shadow-green-900/20 rounded-xl">
          <CardHeader className="items-center p-8">
            <CheckCircle className="h-20 w-20 text-green-400 mb-4" />
            <CardTitle className="text-3xl font-bold text-white">
              {text.success.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8">
            <p className="text-lg text-gray-300">
              {text.success.description(user.name)}
            </p>
          </CardContent>
          <CardFooter className="p-6">
            <Button asChild className="w-full py-6 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg transition-transform transform hover:scale-105">
              <Link href="/tests">
                {text.success.button}
                <ArrowRight className="ml-2 h-5 w-5"/>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --- Initial Form Card ---
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-2xl shadow-black/30 rounded-xl overflow-hidden">
        <CardHeader className="items-center space-y-2 p-8 text-center bg-gray-800/50">
          <div className="p-4 rounded-full bg-purple-500/10 text-purple-400">
            <Gift className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            {text.form.title}, {user.name}!
          </CardTitle>
          <CardDescription className="text-gray-400">
            {text.form.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-300">{text.form.phoneLabel} <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                        placeholder={text.form.phonePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                className="w-full py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/40 transform hover:scale-[1.02] transition-all duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {text.form.submittingButton}
                  </>
                ) : (
                  text.form.submitButton
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center border-t border-gray-700 p-6 text-center text-sm text-gray-400">
          <Link href="/premium/register" className="font-semibold mb-4 text-gray-300">
            {text.form.footerLink} <span className="text-purple-400 hover:text-purple-300 underline underline-offset-4">{text.form.footerAction}</span>
          </Link>
          <p className="font-medium text-gray-300">{text.form.supportTitle}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-2">
            <a href="https://www.facebook.com/edu.locus" className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <span className="text-gray-600">•</span>
            <a href="https://wa.me/9779763249052" className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <span className="text-gray-600">•</span>
            <a href="mailto:edulocusweb@gmail.com" className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4">
              Email
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateTrialForm;