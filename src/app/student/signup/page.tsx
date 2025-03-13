"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [stream, setStream] = useState("");
  const [assessmentPassed, setAssessmentPassed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAssessmentPassed = localStorage.getItem("assessmentPassed");
    setAssessmentPassed(storedAssessmentPassed === "true");

    if (searchParams.get("failed") === "true") {
      setError("You failed the assessment. Please try again.");
      localStorage.removeItem("assessmentPassed");
      setAssessmentPassed(false);
    }
  }, [searchParams]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !dob || !password || !stream) {
      setError("All fields are required.");
      return;
    }

    if (!assessmentPassed) {
      localStorage.removeItem("assessmentPassed");

      // Ensure parameters are properly encoded
      router.push(
        `/student/signup/assessment?stream=${encodeURIComponent(stream)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&fullName=${encodeURIComponent(fullName)}`
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });

      localStorage.removeItem("assessmentPassed");
      router.push("/student/dashboard");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Student Signup</h1>
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            >
              <option value="" disabled>Select Stream</option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            {assessmentPassed ? "Sign Up" : "Start Assessment"}
          </button>
        </form>
      </div>
    </div>
  );
}
