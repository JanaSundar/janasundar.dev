import React, { FormEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const LoadingSpinner = () => (
  <div role="status" className="w-fit mx-auto">
    <svg
      aria-hidden="true"
      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      ></path>
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      ></path>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

const Newsletter = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const subscribe = async (event: FormEvent) => {
    event.preventDefault();
    setIsFormLoading(true);

    const email = inputEl.current!.value;
    const res = await fetch(`/api/subscribe?email=${email}`, {
      method: 'POST',
    });

    const { error } = await res.json();
    if (error) {
      setIsFormLoading(false);
      toast.error(error.message);
      return;
    }

    inputEl.current!.value = '';
    setIsFormLoading(false);
    toast.success(`Thank you, your subscription is almost complete. Check the email and confirm the subscription.`, {
      duration: 5000,
    });
  };

  return (
    <div className="p-4 sm:p-12 text-center border-t-[1px] border-gray-700/40 mt-12 space-y-2">
      <h1 className="text-white font-bold text-xl sm:text-2xl tracking-wide">Subscribe to my newsletter</h1>
      <p className="text-gray-400/90 ">Get emails about web development, javascript and books to your inbox.</p>
      <form className="my-4 py-2 flex justify-center gap-4 flex-wrap" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="hello@apple.com"
          type="email"
          autoComplete="email"
          required
          className="max-w-[400px] w-full rounded-md shadow bg-gray-100 text-gray-800 py-2 px-4 focus:outline-none"
        />
        <button className="bg-link/70 font-bold px-4 w-[120px] py-2 rounded-md shadow" type="submit">
          {isFormLoading ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>
      <p className="text-gray-400/90">No spam - unsubscribe at any time!</p>
    </div>
  );
};

export default Newsletter;
