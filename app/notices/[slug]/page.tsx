import { getBlogBySlug } from '@/lib/actions/blog.actions';
import Image from 'next/image';
import React from 'react';
import { notFound } from 'next/navigation';
import { ParsedElement } from '@/lib/utils';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogPage = async (props: Props) => {
  const { slug } = await props.params;
  const { data: blog, message } = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gray-900 leading-tight capitalize">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-800">
            <span>By </span>
            <span className="font-semibold text-gray-800">{blog.author.name}</span>
            <span className="mx-2">•</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative w-full h-80 md:h-[28rem] mb-12 rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-2xl shadow-lg border border-gray-600"
              style={{
                boxShadow: "0 8px 50px 0 rgba(80, 60, 220, 0.08)",
                backgroundColor: "#18181b",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        {/* Blog Content */}
        <div className="p-4 border rounded-xl bg-muted/30 min-h-[300px] prose prose-sm max-w-none">
          <div>{ParsedElement(blog.content)}</div>
        </div>

        {/* Decorative Gradient Bottom Glow */}
        <div className="mt-20 w-full h-24 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent blur-3xl rounded-full" />
      </div>
    </div>
  );
};

export default BlogPage;
