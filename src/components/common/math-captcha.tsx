import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MathCaptcha: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 100);
    const newNum2 = Math.floor(Math.random() * 100);
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      onSuccess();
    } else {
      setError("Incorrect answer. Please try again.");
      generateQuestion();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>
          What is {num1} + {num2}?
          <Input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            required
          />
        </label>
        <Button type="submit">Submit</Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MathCaptcha;
