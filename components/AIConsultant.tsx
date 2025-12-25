
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserData, AppPhase } from '../types';
import { Brain, Sparkles, Send, Loader2, Bot, Target, AlertCircle, PauseCircle } from 'lucide-react';

interface Props {
  userData: UserData;
  daysRemaining: number;
  currentPhase: AppPhase;
}

const AIConsultant: React.FC<Props> = ({ userData, daysRemaining, currentPhase }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const askMentor = async () => {
    if (!userData.isStarted) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const completed = userData.subjects.reduce((acc, s) => acc + s.chapters.filter(c => c.status === 'Completed').length, 0);
      const total = userData.subjects.reduce((acc, s) => acc + s.chapters.length, 0);
      const weakSubjects = userData.subjects.filter(s => s.isWeak).map(s => s.name).join(', ');

      const prompt = `
        As a supportive and expert Study Mentor for a Maharashtra 10th SSC Board student, give me a quick daily strategy.
        Context:
        - Board: Maharashtra State Board (SSC)
        - Days Left: ${daysRemaining} days
        - Phase: ${currentPhase}
        - Overall Progress: ${completed}/${total} chapters completed.
        - Weak Subjects: ${weakSubjects || 'None specifically marked'}
        - Available Self-Study Time: ~4.5 hours daily.

        Focus specifically on:
        1. English Mastery: Suggest 1 daily reading task and 1 writing topic.
        2. Grammar/Vocabulary: Provide a quick vocabulary challenge or grammar rule to review.
        3. Today's Focus: 1-2 core subject goals (Math/Science).
        4. Mentor's Advice: A short motivational tip.

        Keep it concise, encouraging, and in a friendly student-mentor tone. Use emojis.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setResponse(result.text || "I'm thinking... please try again!");
    } catch (error) {
      console.error(error);
      setResponse("I'm currently resting. Please check your internet or try later! 🔋");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
            <Bot size={28} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold font-heading">AI Mentor</h3>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Smart Study Advisor</p>
          </div>
        </div>
        <button 
          onClick={askMentor}
          disabled={loading || !userData.isStarted}
          className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          {loading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
        </button>
      </div>

      <div className="flex-1 overflow-auto max-h-[400px] pr-2 custom-scrollbar">
        {!userData.isStarted ? (
           <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-50 space-y-4">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
               <PauseCircle size={32} />
            </div>
            <p className="text-sm font-medium">Mentor is currently resting. <br/>Press "START" on Dashboard <br/>to unlock AI guidance.</p>
          </div>
        ) : !response && !loading ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-50 space-y-4">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
               <Brain size={32} />
            </div>
            <p className="text-sm font-medium">Tap the stars to get your <br/>AI-generated daily strategy!</p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-up">
            {response && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                 <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium text-left">
                   {response}
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-500 tracking-widest">
           <Target size={14} />
           <span>Phase: {userData.isStarted ? currentPhase : 'Locked'}</span>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
