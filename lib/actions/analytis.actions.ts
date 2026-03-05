import { cookies } from "next/headers";
import { TDashboardAnalyticData } from "../schema/analytics.schema";
import { STREAM } from "../schema/base.schema";


const stream:STREAM = 'IOE'

export const getDashboardAnalytics = async (userId: string): Promise<{
    data: TDashboardAnalyticData | null;
    message: string;
}> => {
    try {
        const cookieStore =await  cookies();
        const authToken = cookieStore.get("ioe-auth-token")?.value;

        if (!authToken || authToken === undefined || authToken === null) {
            return { data: null, message: "User not logged in!" };
        }


        const response = await fetch(`${process.env.BACKEND}/analytics/get-dashboard-analytics`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
                "Authorization": `Bearer ${authToken}`,
            },
        });


        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};

