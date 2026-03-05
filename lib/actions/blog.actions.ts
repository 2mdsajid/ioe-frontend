'use server'

import { cookies } from "next/headers";
import { LANGUAGE, STREAM, TypeOfTest } from "../schema/base.schema";
import { TBaseCustomTest, TBaseUserScore, TCreateTestAnalytic, TSaveUserScore, TSingleTestWithQuestionsAndUserAccess, TTestViewMetaData } from "../schema/tests.schema";
import { TBlogData, TBlogMetadata, TBlogPostBase } from "../schema/blog.schema";

const stream: STREAM = 'IOE'


//  this will get all custom tests fo the given type
export const getAllBlogs = async (): Promise<{
    data: TBlogMetadata[] | null;
    message: string;
}> => {
    try {

        const response = await fetch(`${process.env.BACKEND}/blog/get-blogs-by-stream/${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ getall blogs ~ error:", error)
        return { data: null, message: "Some Error Occured while fetching all blogs!" };
    }
};



//  this will get all custom tests fo the given type
export const getBlogBySlug = async (slug:string): Promise<{
    data: TBlogData | null;
    message: string;
}> => {
    try {

        const response = await fetch(`${process.env.BACKEND}/blog/get-single-blog/${slug}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ getall blog ~ error:", error)
        return { data: null, message: "Some Error Occured while fetching blog data!" };
    }
};