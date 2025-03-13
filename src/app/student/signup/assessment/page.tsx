"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

const questionsByStream = {
  science: [
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"], answer: "Mitochondria" },
    { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "N2"], answer: "H2O" },
    { question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"], answer: "300,000 km/s" },
    { question: "What is the largest organ in the human body?", options: ["Brain", "Liver", "Skin", "Heart"], answer: "Skin" },
    { question: "What force keeps planets in orbit?", options: ["Magnetism", "Gravity", "Friction", "Tension"], answer: "Gravity" },
    { question: "What is the primary source of Earth's energy?", options: ["Moon", "Sun", "Wind", "Core"], answer: "Sun" },
    { question: "What element is diamond made of?", options: ["Carbon", "Silicon", "Gold", "Iron"], answer: "Carbon" },
    { question: "What is the boiling point of water in Celsius?", options: ["0°C", "50°C", "100°C", "150°C"], answer: "100°C" },
  ],
  commerce: [
    { question: "What is the primary goal of a business?", options: ["Charity", "Profit", "Education", "Entertainment"], answer: "Profit" },
    { question: "What does GDP stand for?", options: ["Gross Domestic Product", "General Development Plan", "Global Demand Price", "Gross Demand Profit"], answer: "Gross Domestic Product" },
    { question: "What is a market?", options: ["A physical store", "A place for exchange", "A bank", "A factory"], answer: "A place for exchange" },
    { question: "Who is the father of modern economics?", options: ["Karl Marx", "Adam Smith", "John Keynes", "Milton Friedman"], answer: "Adam Smith" },
    { question: "What is inflation?", options: ["Price decrease", "Price increase", "Stable prices", "No prices"], answer: "Price increase" },
    { question: "What is a monopoly?", options: ["Single seller market", "Many sellers", "Government control", "No trade"], answer: "Single seller market" },
    { question: "What does ROI stand for?", options: ["Return on Investment", "Rate of Interest", "Revenue of Industry", "Risk of Inflation"], answer: "Return on Investment" },
    { question: "What is supply and demand?", options: ["A tax law", "An economic model", "A business type", "A banking system"], answer: "An economic model" },
    { question: "What is bankruptcy?", options: ["Profit gain", "Financial failure", "Market expansion", "New business"], answer: "Financial failure" },
    { question: "What is a stock?", options: ["Goods in store", "Share of company", "Type of loan", "Government bond"], answer: "Share of company" },
  ],
  arts: [
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: "Da Vinci" },
    { question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Rome"], answer: "Paris" },
    { question: "Who wrote Romeo and Juliet?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer: "Shakespeare" },
    { question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctic", "Kalahari"], answer: "Antarctic" },
    { question: "What is impressionism?", options: ["A dance style", "An art movement", "A music genre", "A literary form"], answer: "An art movement" },
    { question: "Who sculpted David?", options: ["Michelangelo", "Donatello", "Rodin", "Bernini"], answer: "Michelangelo" },
    { question: "What is haiku?", options: ["A painting style", "A Japanese poem", "A dance form", "A musical instrument"], answer: "A Japanese poem" },
    { question: "Who wrote Pride and Prejudice?", options: ["Jane Austen", "Charlotte Bronte", "Emily Dickinson", "Virginia Woolf"], answer: "Jane Austen" },
    { question: "What is the main color in Picasso's Blue Period?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Blue" },
    { question: "What ancient wonder was in Babylon?", options: ["Pyramids", "Hanging Gardens", "Colossus", "Lighthouse"], answer: "Hanging Gardens" },
  ],
};

export default function AssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stream = searchParams.get("stream") || "";
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";
  const fullName = searchParams.get("fullName") || "";
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));
  const [result, setResult] = useState<string | null>(null);

  const questions = questionsByStream[stream as keyof typeof questionsByStream] || [];

  const handleSubmit = async () => {
    const correctAnswers = questions.reduce((acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc), 0);

    if (correctAnswers >= 4) {
      setResult("passed");
      localStorage.setItem("assessmentPassed", "true");

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: fullName });

        localStorage.removeItem("assessmentPassed");
        router.push("/student/login");
      } catch (err) {
        console.error("Signup failed:", err);
        setResult("failed");
      }
    } else {
      setResult("failed");
      localStorage.removeItem("assessmentPassed");
      router.push("/student/signup?failed=true");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl transform transition-all hover:shadow-3xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          {stream.charAt(0).toUpperCase() + stream.slice(1)} Assessment
        </h1>

        {result === null ? (
          <div className="space-y-8">
            {questions.map((q, i) => (
              <div
                key={i}
                className="border-b border-gray-200 pb-6 last:border-b-0 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="text-lg font-semibold text-gray-800 mb-3">
                  {i + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {q.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${i}`}
                        value={option}
                        checked={answers[i] === option}
                        onChange={() => {
                          const newAnswers = [...answers];
                          newAnswers[i] = option;
                          setAnswers(newAnswers);
                        }}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            >
              Submit Assessment
            </button>
          </div>
        ) : result === "passed" ? (
          <div className="text-center animate-fade-in">
            <p className="text-2xl font-semibold text-green-600 mb-6">
              Congratulations! You passed with 4+ correct answers.
            </p>
            <button
              onClick={() => router.push("/student/login")}
              className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
            >
              Proceed to Login
            </button>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <p className="text-2xl font-semibold text-red-600 mb-6">
              Sorry, you failed. You need at least 4 correct answers to pass.
            </p>
            <button
              onClick={() => router.push("/student/signup?failed=true")}
              className="bg-red-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
            >
              Retake Assessment
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}