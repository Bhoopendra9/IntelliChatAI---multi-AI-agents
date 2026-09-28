import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { useGoogleLogin } from "../hooks/mutations/user.google.js";

import { useCurrentUser } from "../hooks/queries/user.get.js";

import { FcGoogle } from "react-icons/fc";

import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/userSlice.js";

export default function Home() {
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { data: currentUser } = useCurrentUser();
  dispatch(setUserData(currentUser));

  const { mutateAsync: handleAxiosLogin } = useGoogleLogin();

  const handleGoogleSignIn = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.accessToken;
    const response = await handleAxiosLogin({ token });
    console.log("Response from backend:", response);
    dispatch(setUserData(response));
  };
  return (
    <div className="bg-[#0d0f14] flex h-screen w-screen text-white overflow-hidden">
      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-around bg-black/60 backdrop-blur-md ">
          <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5 ">
            <div className="flex flex-col gap-2 items-center">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight ">
                Welcome to IntelliChatAI
              </h2>
              <p className=" text-[13px] text-slate-500 ">
                Please login to continue using the app{" "}
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1669c1] transition-colors text-white rounded-lg py-2 px-4 text-sm font-medium cursor-pointer "
                onClick={handleGoogleSignIn}
              >
                <FcGoogle size={15} />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
