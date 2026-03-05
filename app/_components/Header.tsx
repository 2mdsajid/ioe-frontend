"use client";

import {
  ArrowUpRight,
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  Cpu,
  ShieldCheck,
  User,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

import { logOut } from '@/lib/auth/auth';
import { LANGUAGE } from '@/lib/schema/base.schema';
import { TBaseUser } from '@/lib/schema/users.schema';

const Header: React.FC<{ user: TBaseUser | null, locale: LANGUAGE }> = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control Mobile Sheet
  const router = useRouter();

  const engineeringNavLinks = [
    { label: 'Exams', href: '/tests', icon: ClipboardCheck },
    { label: 'Resources', href: '/resources', icon: BookOpen },
    { label: 'Pro', href: '/premium', icon: ShieldCheck },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to close sheet and navigate
  const handleMobileNav = (href: string) => {
    setIsSheetOpen(false);
    router.push(href);
  };

  const headerClasses = isScrolled
    ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
    : 'bg-white/50 border-b border-transparent py-5';

  const logoTextClasses = "text-slate-900 tracking-tighter uppercase font-black transition-all duration-300";
  const userInitials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${headerClasses}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between transition-all duration-500">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-200">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl leading-none ${logoTextClasses} ${!isScrolled && 'lg:text-2xl'}`}>
                IOE <span className="text-blue-600">Locus</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.4em] uppercase mt-1">Entrance Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {engineeringNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop Profile Dropdown */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 w-11 rounded-full border border-slate-200 p-0 hover:border-blue-600/50 transition-all overflow-hidden">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user?.image ?? undefined} />
                      <AvatarFallback className="bg-slate-100 text-blue-600 font-bold">
                        {user ? userInitials : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white border-slate-200 text-slate-900 p-2" align="end">
                  {user ? (
                    <>
                      <DropdownMenuLabel className="font-normal px-4 py-3">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-bold">{user.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer rounded-lg py-3" asChild>
                        <Link href="/dashboard"> Engineering Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="focus:bg-red-50 focus:text-red-600 cursor-pointer rounded-lg py-3"
                        onClick={() => { logOut(); router.refresh(); }}
                      >
                        <LogOut className="mr-3 h-4 w-4" /> Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild className="focus:bg-blue-600 focus:text-white py-4 rounded-xl">
                      <Link href="/login" className="w-full text-center font-bold uppercase tracking-widest text-xs">Login</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-900 hover:bg-slate-100">
                    <Menu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full bg-white border-slate-200 p-0 text-slate-900 flex flex-col">
                  <SheetHeader className="p-8 border-b border-slate-100 items-start">
                    <div onClick={() => handleMobileNav('/')} className="flex items-center gap-3 group cursor-pointer">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <Cpu className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-lg font-black tracking-tighter uppercase text-slate-900">
                          IOE Locus
                        </span>
                        <span className="text-[8px] font-bold text-blue-600 tracking-[0.4em] uppercase">Nepal</span>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto px-6 py-8">
                    {user && (
                      <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-14 w-14 border-2 border-blue-600/10">
                            <AvatarImage src={user.image ?? undefined} />
                            <AvatarFallback className="bg-white text-blue-600 font-bold text-xl">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="text-lg font-black">{user.name}</p>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <nav className="space-y-4">
                      {user && (
                        <button
                          onClick={() => handleMobileNav('/dashboard')}
                          className="w-full flex items-center justify-between p-5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600"
                        >
                          <div className="flex items-center gap-4">
                            <LayoutDashboard className="h-5 w-5" />
                            <span className="font-black uppercase tracking-widest text-sm">Dashboard</span>
                          </div>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      )}

                      {engineeringNavLinks.map((link) => (
                        <button
                          key={link.href}
                          onClick={() => handleMobileNav(link.href)}
                          className="w-full flex items-center gap-4 p-5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-slate-600"
                        >
                          <link.icon className="h-5 w-5" />
                          <span className="font-black uppercase tracking-widest text-sm">{link.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-8 border-t border-slate-100 space-y-4">
                    {!user ? (
                      <Button 
                        onClick={() => handleMobileNav('/login')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-7 rounded-2xl"
                      >
                        Access Portal
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className="w-full text-rose-500 hover:bg-rose-50 font-black uppercase tracking-widest py-7 rounded-2xl border border-rose-100"
                        onClick={() => { logOut(); setIsSheetOpen(false); router.refresh(); }}
                      >
                        <LogOut className="mr-3 h-5 w-5" /> Sign Out
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;