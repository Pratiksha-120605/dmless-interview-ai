import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Apply() {
  const { linkId } = useParams();
  const [linkData, setLinkData] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resultMsg, setResultMsg] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const docSnap = await getDoc(doc(db, "links", linkId));
        if (docSnap.exists()) setLinkData(docSnap.data());
        else toast.error("Test link not found!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch test link");
      }
    };
    fetchLink();
  }, [linkId]);

  if (!linkData) return <p className="text-white p-10">Loading...</p>;

  const handleAnswerChange = (optionIndex) => {
    setAnswers({ ...answers, [currentQ]: optionIndex });
  };

  const handleSubmit = async () => {
    let totalScore = 0;
    let knockedOut = false;

    linkData.questions.forEach((q, idx) => {
      const selected = answers[idx];
      if (q.type === "mcq") {
        if (selected === q.correctIndex) totalScore += Number(q.score);
        else knockedOut = true;
      } else if (q.type === "boolean") {
        // If you want, you can implement boolean logic here
      }
    });

    const status = knockedOut ? "knockedOut" : "shortlisted";

    try {
      await addDoc(collection(db, "submissions"), {
        linkId,
        answers,
        totalScore,
        status,
        createdAt: new Date(),
      });

      toast.success(
        knockedOut
          ? `You are knocked out! Score: ${totalScore}`
          : `Congratulations! You are shortlisted! Score: ${totalScore}`,
      );

      setResultMsg(
        knockedOut
          ? `You are knocked out! Score: ${totalScore}`
          : `Congratulations! You are shortlisted! Score: ${totalScore}`,
      );
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit answers!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 space-y-6">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-bold">{linkData.title}</h1>
      <p className="text-gray-400">{linkData.description}</p>

      {!submitted ? (
        <>
          <div className="bg-slate-800 p-4 rounded-xl space-y-2">
            <p className="font-semibold">
              Q{currentQ + 1}. {linkData.questions[currentQ].question}
            </p>

            {linkData.questions[currentQ].options.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={answers[currentQ] === idx}
                  onChange={() => handleAnswerChange(idx)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentQ((prev) => prev - 1)}
              disabled={currentQ === 0}
              className="px-4 py-2 bg-gray-600 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {currentQ < linkData.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ((prev) => prev + 1)}
                className="px-4 py-2 bg-indigo-600 rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-xl font-bold">{resultMsg}</p>
      )}
    </div>
  );
}
