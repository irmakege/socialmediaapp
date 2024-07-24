"use client";

import { useFormState } from "react-dom";
import signupAction from "./signupAction";

export default function Signup() {
  const [error, formAction] = useFormState(signupAction, undefined);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div className="space-y-6">
              <input type="text" name="username" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">E-mail address</label>
            <div className="space-y-6">
              <input type="email" name="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="flex items-center justify-between">
              <input type="password" name="password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          {error && <p>{error}</p>}
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          <a href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Already have an account?</a>
        </p>
      </div>
    </div>
  );
}