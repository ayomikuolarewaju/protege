'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function BlogCommentForm({ postId }: { postId: string }) {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const authorName = String(form.get('name') || '').trim();
    const authorEmail = String(form.get('email') || '').trim();
    const content = String(form.get('content') || '').trim();
    if (!authorName || !authorEmail || !content) {
      setError('Please complete all comment fields.');
      return;
    }

    setBusy(true);
    setNotice('');
    setError('');

    try {
      const supabase = createClient();
      const { error: submitError } = await supabase.from('blog_comments').insert({
        post_id: postId,
        author_name: authorName,
        author_email: authorEmail,
        content,
        status: 'pending'
      });
      if (submitError) throw submitError;
      formElement.reset();
      setNotice('Thanks for commenting. Your comment will appear after it has been reviewed.');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit your comment.');
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submitComment} className="mt-8 border-t border-ink/10 pt-6">
    <h3 className="font-display text-xl font-bold">Leave a comment</h3>
    {notice && <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">Name
        <input required name="name" maxLength={100} autoComplete="name" className="field mt-2" />
      </label>
      <label className="text-sm font-semibold">Email
        <input required name="email" type="email" maxLength={254} autoComplete="email" className="field mt-2" />
      </label>
    </div>
    <label className="mt-4 block text-sm font-semibold">Comment
      <textarea required name="content" maxLength={3000} rows={4} className="field mt-2 resize-y" />
    </label>
    <button disabled={busy} className="btn btn-primary mt-4 disabled:opacity-60">{busy ? 'Submitting…' : 'Submit comment'}</button>
    <p className="mt-3 text-xs leading-5 text-ink/50">Your email address will not be published. Comments are reviewed before they appear.</p>
  </form>;
}
