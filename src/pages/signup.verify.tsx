import _ from "lodash";
import { useRef } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SignupVerify() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      e.target.value = value;
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(paste)) {
      paste.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      });
      inputRefs.current[3]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 overflow-y-hidden xl:gap-12">
      <div className="absolute top-0 left-0 mt-4 ml-4">
      <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center font-semibold text-[#9681FA]"
          >
            <IoChevronBackOutline className="h-5 w-5" />
            Back
          </button>
      </div>
      <img
        src="/images/effect/gradient_green_r.png"
        alt="effect"
        className="absolute bottom-0 left-0 -z-10 w-1/2 rotate-180"
      />
      <div className="relative flex w-1/2 flex-col items-center justify-center">
        <img
          src="/images/button/btn_gradient_blue_lg.png"
          alt="effect"
          className="absolute -z-10"
        />
        <img
          src="/images/icons/camera.png"
          alt="camera"
          className="absolute -top-20 -left-5 w-1/4"
        />
        <h1 className="relative z-10 text-center text-4xl font-bold text-black">
          Account Verification
        </h1>
      </div>
      <span className="text-lg text-black">
        Please enter the 4 digit code sent to your email
      </span>
      <form className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-between gap-8">
          {_.map([0, 1, 2, 3], (index) => (
            <div key={index} className="relative h-16 w-32">
              <img
                src="/images/background/bg_otp_input.png"
                alt="otp_input"
                className="absolute inset-0"
              />
              <input
                placeholder="0"
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                className="absolute inset-0 h-full w-full border-0 bg-transparent px-3 text-center text-2xl font-bold text-black focus:ring-0 focus:shadow-none focus:outline-none"
                maxLength={1}
                pattern="\d*"
                onChange={(e) => handleInputChange(e, index)}
                onPaste={handlePaste}
              />
            </div>
          ))}
        </div>
        <a href="" className="mt-2 font-bold text-black uppercase underline">
          Resend code
        </a>
        <button
          type="submit"
          className="rounded-lg border-2 border-black px-8 py-6 text-2xl font-bold text-black uppercase"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
