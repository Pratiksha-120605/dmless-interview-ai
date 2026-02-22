import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [stats, setStats] = useState({ applicants: 0, shortlisted: 0 });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minScore, setMinScore] = useState("");

  const defaultQuestion = {
    question: "",
    type: "mcq",
    options: ["", "", "", ""],
    correctIndex: 0,
    score: 10,
  };
  const [questions, setQuestions] = useState([defaultQuestion]);

  // Real-time listener for links
  useEffect(() => {
    const unsubscribeLinks = onSnapshot(collection(db, "links"), (snapshot) => {
      const fetchedLinks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinks(fetchedLinks);
    });

    return () => unsubscribeLinks();
  }, []);

  // Real-time listener for submissions stats
  useEffect(() => {
    const unsubscribeSubs = onSnapshot(
      collection(db, "submissions"),
      (snapshot) => {
        const submissions = snapshot.docs.map((doc) => doc.data());
        const shortlistedCount = submissions.filter(
          (s) => s.status === "shortlisted",
        ).length;
        setStats({
          applicants: submissions.length,
          shortlisted: shortlistedCount,
        });
      },
    );

    return () => unsubscribeSubs();
  }, []);

  // Create new hiring link
  const handleCreateLink = async () => {
    try {
      await addDoc(collection(db, "links"), {
        title,
        description,
        minScore: Number(minScore),
        questions,
        createdBy: auth.currentUser?.uid || "anonymous",
        createdAt: new Date(),
      });

      toast.success("Link Created Successfully ");

      // Reset form
      setShowModal(false);
      setTitle("");
      setDescription("");
      setMinScore("");
      setQuestions([defaultQuestion]);
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("Error creating link ");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 p-6 space-y-6">
        <h2 className="text-2xl font-bold">Dmless</h2>
        <div className="space-y-4 text-gray-300">
          {/* <p className="cursor-pointer hover:text-white">Dashboard</p> */}
          {/* <p className="cursor-pointer hover:text-white">Create Link</p>
          <p className="cursor-pointer hover:text-white">Settings</p> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Dashboard Overview </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Create Link
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-800">
            <p className="text-sm text-gray-400">Total Links</p>
            <h2 className="text-3xl font-bold mt-3">{links.length}</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-800">
            <p className="text-sm text-gray-400">Applicants</p>
            <h2 className="text-3xl font-bold mt-3">{stats.applicants}</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-800">
            <p className="text-sm text-gray-400">Active Links</p>
            <h2 className="text-3xl font-bold mt-3">{links.length}</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-800">
            <p className="text-sm text-gray-400">Shortlisted</p>
            <h2 className="text-3xl font-bold mt-3">{stats.shortlisted}</h2>
          </div>
        </div>

        {/* Created Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Hiring Links</h2>

          {links.length === 0 ? (
            <p className="text-gray-400">No links created yet.</p>
          ) : (
            links.map((link) => (
              <div
                key={link.id}
                className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {link.description}
                  </p>
                  <div className="mt-3 text-sm text-gray-300">
                    <p>Minimum Score: {link.minScore}</p>
                    <p>Questions: {link.questions.length}</p>
                  </div>
                </div>

                {/* Copy Link Button */}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/apply/${link.id}`,
                    )
                  }
                  className="bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                >
                  Copy Link
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold">Create Hiring Link</h2>

            <input
              type="text"
              placeholder="Job Title"
              className="w-full p-3 rounded-lg bg-slate-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Job Description"
              className="w-full p-3 rounded-lg bg-slate-800"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Minimum Score"
              className="w-full p-3 rounded-lg bg-slate-800"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
            />

            {/* Knockout Questions */}
            <div className="space-y-6">
              <h3 className="text-sm text-gray-400">Knockout Questions</h3>

              {questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-4 rounded-xl space-y-4"
                >
                  {/* Question Text */}
                  <input
                    type="text"
                    placeholder="Enter Question"
                    className="w-full p-2 rounded bg-slate-700"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[index].question = e.target.value;
                      setQuestions(updated);
                    }}
                  />

                  {/* Question Type */}
                  <select
                    className="w-full p-2 rounded bg-slate-700"
                    value={q.type}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[index].type = e.target.value;
                      setQuestions(updated);
                    }}
                  >
                    <option value="mcq">MCQ</option>
                    <option value="boolean">Yes / No</option>
                  </select>

                  {/* MCQ Options */}
                  {q.type === "mcq" &&
                    q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex gap-3 items-center">
                        <input
                          type="radio"
                          name={`correct-${index}`}
                          checked={q.correctIndex === optIndex}
                          onChange={() => {
                            const updated = [...questions];
                            updated[index].correctIndex = optIndex;
                            setQuestions(updated);
                          }}
                        />

                        <input
                          type="text"
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1 p-2 rounded bg-slate-700"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[index].options[optIndex] = e.target.value;
                            setQuestions(updated);
                          }}
                        />
                      </div>
                    ))}

                  {/* Score */}
                  <input
                    type="number"
                    placeholder="Score"
                    className="w-24 p-2 rounded bg-slate-700"
                    value={q.score}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[index].score = e.target.value;
                      setQuestions(updated);
                    }}
                  />
                </div>
              ))}

              <button
                onClick={() => setQuestions([...questions, defaultQuestion])}
                className="text-indigo-400 text-sm"
              >
                + Add Question
              </button>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateLink}
                className="px-4 py-2 bg-indigo-600 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
