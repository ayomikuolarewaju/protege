import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase-server';
import type { ContactFormInput } from '@/lib/types';

function isValidEmail(value: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254; }
export async function POST(request: Request) {
  let input: ContactFormInput;
  try { input = await request.json() as ContactFormInput; } catch { return NextResponse.json({error:'Please submit a valid form.'},{status:400}); }
  const fullName = typeof input.fullName === 'string' ? input.fullName.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const phone = typeof input.phone === 'string' ? input.phone.trim().slice(0,30) : '';
  const subject = typeof input.subject === 'string' ? input.subject.trim() : '';
  const message = typeof input.message === 'string' ? input.message.trim() : '';
  if (!fullName || fullName.length > 100 || !isValidEmail(email) || !subject || subject.length > 100 || message.length < 10 || message.length > 5000) return NextResponse.json({error:'Please check your details and try again.'},{status:400});
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return NextResponse.json({error:'The contact form is not configured yet. Please use the phone or WhatsApp option.'},{status:503});
  try {
    const supabase = await createClient();
    const {error: dbError} = await supabase.from('contact_inquiries').insert({full_name:fullName,email,phone:phone || null,subject,message,status:'new'});
    if (dbError) { console.error('Could not save contact inquiry:', dbError.message); return NextResponse.json({error:'We could not save your message. Please try again later.'},{status:500}); }
  } catch (error) { console.error('Supabase contact error:',error); return NextResponse.json({error:'The contact form is temporarily unavailable.'},{status:503}); }

  // Email is a notification. The enquiry remains saved in Supabase if SMTP is unavailable.
  try {
    const {SMTP_HOST,SMTP_PORT,SMTP_SECURE,SMTP_USER,SMTP_APP_PASSWORD,CONTACT_TO_EMAIL} = process.env;
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_APP_PASSWORD && CONTACT_TO_EMAIL) {
      const transporter = nodemailer.createTransport({host:SMTP_HOST,port:Number(SMTP_PORT),secure:SMTP_SECURE === 'true',auth:{user:SMTP_USER,pass:SMTP_APP_PASSWORD}});
      await transporter.sendMail({from:`Protege Schools Website <${SMTP_USER}>`,to:CONTACT_TO_EMAIL,replyTo:email,subject:`Website enquiry: ${subject}`,text:`New enquiry from the Protege Schools website\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nTopic: ${subject}\n\nMessage:\n${message}`});
    } else console.warn('SMTP is not configured. Enquiry saved to Supabase; email notification skipped.');
  } catch (error) { console.error('SMTP notification failed; enquiry remains saved:',error); }
  return NextResponse.json({success:true},{status:201});
}
