import React, { useState } from "react";

const Content = () => {

    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheck = async () => {
        if (!input.trim()) {
            setError("Please enter some symptoms.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await fetch("https://web-production-1c8aa.up.railway.app/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: input }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setInput("");
        setResult(null);
        setError("");
    };


    return (
        <>
            <div className="min-h-screen relative overflow-hidden flex flex-col justify-between">
                <img src="assets/blob1new.svg" alt="" className="absolute z-0 min-w-[1400px]" style={{ top: -300, left: -300 }} />
                {/* Header */}
                <div className="relative z-10 flex justify-center sm:justify-end pt-2 pr-5">
                    <div>
                        <img src="assets/LogoWeb.svg" alt="" className="w-[150px] sm:w-[250px]" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col font-nunito items-center mx-2">
                    {/* Input */}
                    <h1 className="text-4xl font-bold mb-5">Ask AI</h1>
                    <p className="font-light text-center text-sm sm:text-md">Please enter the symptoms you are currently experiencing, such as headache or any other symptoms.</p>
                    {!result && (
                        <>
                            <textarea
                                name=""
                                id=""
                                className="min-h-[150px] w-full sm:w-1/3 p-4 my-5 bg-white border-2 border-gray-300 rounded-tr-xl rounded-tl-xl rounded-bl-xl"
                                placeholder="Enter your symptoms..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <button
                                className="bg-button-cek w-4/5 sm:w-1/4 py-2 font-semibold rounded-full shadow-xl hover:bg-button-cek-hover gap-2 transition duration-200 cursor-pointer flex justify-center items-center"
                                onClick={handleCheck}
                                disabled={loading}
                            >
                                {loading ? "Checking..." : <>
                                    <img src="assets/search.png" alt="" className="w-[15px] h-[15px]" /> Check Now
                                </>}
                            </button>
                        </>
                    )}

                    {/* Output */}
                    {result && (
                        <>
                            <h1 className="text-2xl font-light mb-5">Disease :</h1>
                            <h1 className="text-4xl font-bold mb-2 text-center">{result.disease}</h1>
                            <p className="font-light text-center text-sm sm:text-md mb-5">💊 {result.desc}</p>
                            <p className="font-bold text-center text-sm sm:text-lg mb-5">🧑‍⚕️ {result.solution}</p>

                            <button
                                className="bg-button-cek w-4/5 sm:w-1/4 py-2 font-semibold rounded-full shadow-xl hover:bg-button-cek-hover gap-2 transition duration-200 cursor-pointer flex justify-center items-center "
                                onClick={handleReset}
                            >
                                <img src="assets/angle-left.png" alt="" className="w-[15px] h-[15px]" /> Back
                            </button>
                        </>
                    )}

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>

                {/* Footer */}
                <div className="relative z-10 font-nunito text-center mt-10 mb-2">
                    <p>© Kelompok 2: 3 TI F</p>
                </div>
            </div>
        </>
    );
};

export default Content;