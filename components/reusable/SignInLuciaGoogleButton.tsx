import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";

type Props = {
  ru: string;
};

export default function SignInLuciaGoogleButton(props: Props) {
  return (
    <Button
      asChild
      size="default" // Larger button size
      className="w-auto h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <Link href={`/login/google?ru=${props.ru}`} className="flex items-center justify-center gap-3">
        <div className="bg-white p-2 rounded-full">
          <FaGoogle size={20} className="text-blue-600" />
        </div>
        <span>Continue with Google</span>
      </Link>
    </Button>
  );
}