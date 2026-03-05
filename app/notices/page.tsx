import React from "react";
import { getAllBlogs } from "@/lib/actions/blog.actions";
import Image from "next/image";
import Link from "next/link";
import ErrorPage from "@/components/reusable/ErrorPage";

type Props = {};

const Page = async (props: Props) => {
  const { data: blogs, message } = await getAllBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <ErrorPage errorMessage={message} /> 
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen">
      <div className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center sr-only">notices</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/notices/${blog.slug}`}
                className="block group"
              >
                <div className="relative flex flex-col h-full bg-gradient-to-br from-gray-800/60 to-gray-900/50 border border-gray-700 hover:border-blue-500 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-xl">
                  
                  {/* Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={blog.coverImage || "/placeholder.jpg"}
                      alt={blog.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <div className="mt-auto">
                      <p className="text-sm text-gray-300">
                        By <span className="font-medium text-gray-100">{blog.author.name}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
