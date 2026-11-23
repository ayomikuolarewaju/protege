'use client';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

import PageHero from '@/components/page-hero';
import { media } from '@/lib/media';

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_SCHOOL_PHONE || '+234 000 000 0000';
  const email = process.env.NEXT_PUBLIC_SCHOOL_EMAIL || 'hello@protegeschools.example';
  const wa = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2340000000000').replace(/\D/g,'');
  const [status,setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error,setError] = useState('');
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const formElement = event.currentTarget; setStatus('sending'); setError('');
    const form = new FormData(formElement);
    const payload = { fullName:String(form.get('fullName')||''), email:String(form.get('email')||''), phone:String(form.get('phone')||''), subject:String(form.get('subject')||''), message:String(form.get('message')||'') };
    try { const response = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); const data: {error?:string} = await response.json(); if(!response.ok) throw new Error(data.error || 'We could not send your message. Please try again.'); setStatus('success'); formElement.reset(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.'); setStatus('error'); }
  }
  const card = 'flex gap-4 rounded-2xl bg-white p-5 transition hover:shadow-soft';
  const icon = 'grid h-12 w-12 shrink-0 place-items-center rounded-full';
  return <>
    <PageHero title="Let’s start a conversation." text="Whether you’re exploring the school, have an admissions question, or simply want to learn more, reach out to us." />
    <section className="pb-24 pt-8"><div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <aside>
        <h2 className="font-display text-2xl font-bold">We’re here for you.</h2>
        <p className="mt-3 leading-7 text-ink/70">Choose whichever way is easiest.</p>
        <div className="mt-8 space-y-3">
          <a href={`tel:${phone.replace(/\s/g,'')}`} className={card}><span className={`${icon} bg-indigo/10 text-indigo`}><Phone size={20}/></span><span><span className="block text-sm text-ink/60">Call us</span><span className="mt-0.5 block font-semibold">{phone}</span></span></a>
          <a href={`mailto:${email}`} className={card}><span className={`${icon} bg-hibiscus/10 text-hibiscus`}><Mail size={20}/></span><span><span className="block text-sm text-ink/60">Email us</span><span className="mt-0.5 block break-all font-semibold">{email}</span></span></a>
          <a href={`https://wa.me/${wa}?text=${encodeURIComponent('Hello Protege Schools, I would like to make an enquiry.')}`} target="_blank" rel="noreferrer" className={card}><span className={`${icon} bg-[#dcfce7] text-[#16834a]`}><MessageCircle size={20}/></span><span><span className="block text-sm text-ink/60">WhatsApp</span><span className="mt-0.5 block font-semibold">Chat with our team <ArrowUpRight className="ml-1 inline" size={15}/></span></span></a>
          <div className="adire overflow-hidden rounded-2xl text-white"><img src={media.school_sign} alt="The Protege School sign at the school entrance" width={960} height={501} loading="lazy" className="h-40 w-full object-cover" /><div className="flex gap-4 p-5"><span className={`${icon} bg-white/15`}><MapPin size={20}/></span><span><span className="block text-sm text-white/70">Visit us</span><span className="mt-0.5 block font-semibold">Add your school address</span><span className="mt-1 block text-sm text-white/70">Please update with your full location.</span></span></div></div>
        </div>
      </aside>
      <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-10">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">How can we help?</h2>
        <p className="mb-7 mt-2 leading-7 text-ink/65">Fill in the form and a member of our team will get back to you.</p>
        {status==='success' && <div role="status" className="mb-5 flex gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-800"><CheckCircle2 size={20} className="shrink-0"/>Your message has been sent. Thank you for contacting Protege Schools.</div>}
        {status==='error' && <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold">Full name *<input required name="fullName" autoComplete="name" maxLength={100} className="field" placeholder="Your full name"/></label>
            <label className="block text-sm font-semibold">Email address *<input required name="email" type="email" autoComplete="email" maxLength={254} className="field" placeholder="you@example.com"/></label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold">Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={30} className="field" placeholder="Your phone number"/></label>
            <label className="block text-sm font-semibold">What is this about? *<select required name="subject" defaultValue="" className="field"><option value="" disabled>Select a topic</option><option>Admissions enquiry</option><option>School visit</option><option>General enquiry</option><option>Other</option></select></label>
          </div>
          <label className="block text-sm font-semibold">Your message *<textarea required name="message" rows={5} minLength={10} maxLength={5000} className="field resize-y" placeholder="Tell us a little about what you would like to know…"/></label>
          <button type="submit" disabled={status==='sending'} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{status==='sending'?'Sending…':'Send your message'} <Send size={16}/></button>
          <p className="text-sm leading-6 text-ink/55">By submitting this form, you agree that Protege Schools may contact you about your enquiry.</p>
        </form>
      </div>
    </div></section></>;
}
