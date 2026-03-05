"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Cpu, Loader2, Send, Mail, MapPin } from 'lucide-react';
import { toast } from "sonner";

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Existing API action and types preserved
import { createUserFeedback } from '@/lib/actions/users.actions';
import { TCreateUserFeedback } from '@/lib/schema/users.schema';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<Omit<TCreateUserFeedback, 'image'>>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createUserFeedback(formData);

      if (result.data) {
        toast.success("Inquiry Logged", {
          description: result.message || "Your technical inquiry has been routed to the IOE Locus team.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error("Submission Failed", {
          description: result.message || "Protocol error. Please try again.",
        });
      }
    } catch (error) {
      toast.error("Connection Error", {
        description: "An unexpected error occurred. Please check your uplink.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-white py-24 overflow-hidden text-slate-900">
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="flex flex-col lg:flex-row">
            
            {/* Engineering Info Sidebar */}
            <div className="lg:w-1/3 p-10 lg:p-12 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
               {/* Subtle Dark Blueprint Overlay */}
               <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                 style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
               </div>

               <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-white/10 border border-white/10 text-slate-300 mb-8">
                    <Cpu className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">System Support</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tighter leading-tight">
                    Technical <br />
                    <span className="text-blue-500">Support.</span>
                  </h2>

                  {/* Signature Locus Left-Border Paragraph */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 border-l-2 border-slate-700 pl-4">
                    Need help with the Mock Exam simulator or syllabus breakdown? Our technical team is on standby.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Interface</p>
                        <p className="text-sm font-medium text-slate-200">support@ioelocus.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Location</p>
                        <p className="text-sm font-medium text-slate-200">Pulchowk, Lalitpur, Nepal</p>
                      </div>
                    </div>
                  </div>
               </div>
              
              <div className="mt-12 text-[10px] font-bold tracking-widest uppercase text-slate-700 relative z-10">
                IOE LOCUS // CORE_v1.0.2
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:w-2/3 p-10 lg:p-16 bg-white">
              <div className="mb-10">
                 <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Send an Inquiry</h3>
                 <p className="text-sm text-slate-500 mt-2">Fill out the parameters below to open a ticket.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Applicant Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-50 border-slate-200 h-14 rounded-xl focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all"
                      placeholder="e.g. Arpan Adhikari"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Academic Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-50 border-slate-200 h-14 rounded-xl focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all"
                      placeholder="student@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical Query</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-slate-50 border-slate-200 rounded-xl resize-none focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all p-4"
                    placeholder="Describe your issue or question regarding the IOE entrance..."
                  />
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-6 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                    ) : (
                      <>Submit Query <Send className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;