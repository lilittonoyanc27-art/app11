/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Trophy,
  Lightbulb,
  BookOpen,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

/// --- Types ---

interface QuizQuestion {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

// --- Data ---

const STRESS_THEORY = [
  { rule: "1. Եթե բառը վերջանում է ձայնավորով, n կամ s տառերով, շեշտը սովորաբար ընկնում է նախավերջին վանկի վրա (օր.՝ Casa, Libro):" },
  { rule: "2. Եթե բառը վերջանում է այլ բաղաձայնով, շեշտը ընկնում է վերջին վանկի վրա (օր.՝ Ciudad, Reloj):" },
  { rule: "3. Եթե շեշտը չի համապատասխանում այս կանոններին, ապա դրվում է գրավոր շեշտ (tilde)՝ ´ (օր.՝ Café, Árbol):" },
  { rule: "4. Esdrújulas (շեշտը վերջից երրորդ վանկի վրա) բառերը միշտ ունեն գրավոր շեշտ (օր.՝ Música, Pájaro):" },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Ինչպե՞ս է ճիշտ գրվում «Երգ» բառը իսպաներենում:",
    options: [
      { id: 'a', text: "Cancion" },
      { id: 'b', text: "Canción" },
      { id: 'c', text: "Cáncion" }
    ],
    correctOptionId: 'b',
    explanation: "Canción-ը վերջանում է n-ով, բայց շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 2,
    question: "Ինչպե՞ս է ճիշտ գրվում «Ծառ» բառը:",
    options: [
      { id: 'a', text: "Arbol" },
      { id: 'b', text: "Arból" },
      { id: 'c', text: "Árbol" }
    ],
    correctOptionId: 'c',
    explanation: "Árbol-ը վերջանում է l-ով, շեշտը նախավերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 3,
    question: "Ինչպե՞ս է ճիշտ գրվում «Թռչուն» բառը:",
    options: [
      { id: 'a', text: "Pajaro" },
      { id: 'b', text: "Pájaro" },
      { id: 'c', text: "Pajaró" }
    ],
    correctOptionId: 'b',
    explanation: "Pájaro-ն esdrújula բառ է (շեշտը 3-րդ վանկի վրա), ուստի միշտ ունի գրավոր շեշտ:"
  },
  {
    id: 4,
    question: "Ինչպե՞ս է ճիշտ գրվում «Հեռախոս» բառը:",
    options: [
      { id: 'a', text: "Telefono" },
      { id: 'b', text: "Telefóno" },
      { id: 'c', text: "Teléfono" }
    ],
    correctOptionId: 'c',
    explanation: "Teléfono-ն esdrújula բառ է, ուստի միշտ ունի գրավոր շեշտ:"
  },
  {
    id: 5,
    question: "Ինչպե՞ս է ճիշտ գրվում «Սուրճ» բառը:",
    options: [
      { id: 'a', text: "Cafe" },
      { id: 'b', text: "Café" },
      { id: 'c', text: "Cáfe" }
    ],
    correctOptionId: 'b',
    explanation: "Café-ն վերջանում է ձայնավորով, բայց շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 6,
    question: "Ինչպե՞ս է ճիշտ գրվում «Օր» բառը:",
    options: [
      { id: 'a', text: "Dia" },
      { id: 'b', text: "Día" },
      { id: 'c', text: "Diá" }
    ],
    correctOptionId: 'b',
    explanation: "Día բառում i-ն և a-ն կազմում են հիատուս, և i-ն շեշտվում է:"
  },
  {
    id: 7,
    question: "Ինչպե՞ս է ճիշտ գրվում «Ինքնաթիռ» բառը:",
    options: [
      { id: 'a', text: "Avion" },
      { id: 'b', text: "Avión" },
      { id: 'c', text: "Ávion" }
    ],
    correctOptionId: 'b',
    explanation: "Avión-ը վերջանում է n-ով, շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 8,
    question: "Ինչպե՞ս է ճիշտ գրվում «Երաժշտություն» բառը:",
    options: [
      { id: 'a', text: "Musica" },
      { id: 'b', text: "Música" },
      { id: 'c', text: "Musicá" }
    ],
    correctOptionId: 'b',
    explanation: "Música-ն esdrújula բառ է, ուստի միշտ ունի գրավոր շեշտ:"
  },
  {
    id: 9,
    question: "Ինչպե՞ս է ճիշտ գրվում «Անգլերեն» բառը:",
    options: [
      { id: 'a', text: "Ingles" },
      { id: 'b', text: "Inglés" },
      { id: 'c', text: "Íngles" }
    ],
    correctOptionId: 'b',
    explanation: "Inglés-ը վերջանում է s-ով, շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 10,
    question: "Ինչպե՞ս է ճիշտ գրվում «Պերու» երկրի անունը:",
    options: [
      { id: 'a', text: "Peru" },
      { id: 'b', text: "Perú" },
      { id: 'c', text: "Péru" }
    ],
    correctOptionId: 'b',
    explanation: "Perú-ն վերջանում է ձայնավորով, շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 11,
    question: "Ինչպե՞ս է ճիշտ գրվում «Մուկ» բառը:",
    options: [
      { id: 'a', text: "Raton" },
      { id: 'b', text: "Ratón" },
      { id: 'c', text: "Ráton" }
    ],
    correctOptionId: 'b',
    explanation: "Ratón-ը վերջանում է n-ով, շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 12,
    question: "Ինչպե՞ս է ճիշտ գրվում «Բազմոց» բառը:",
    options: [
      { id: 'a', text: "Sofa" },
      { id: 'b', text: "Sofá" },
      { id: 'c', text: "Sófa" }
    ],
    correctOptionId: 'b',
    explanation: "Sofá-ն վերջանում է ձայնավորով, շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 13,
    question: "Ինչպե՞ս է ճիշտ գրվում «Այգի» բառը:",
    options: [
      { id: 'a', text: "Jardin" },
      { id: 'b', text: "Jardín" },
      { id: 'c', text: "Járdin" }
    ],
    correctOptionId: 'b',
    explanation: "Jardín-ը վերջանում է n-ով, շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 14,
    question: "Ինչպե՞ս է ճիշտ գրվում «Մատիտ» բառը:",
    options: [
      { id: 'a', text: "Lapiz" },
      { id: 'b', text: "Lápiz" },
      { id: 'c', text: "Lapíz" }
    ],
    correctOptionId: 'b',
    explanation: "Lápiz-ը վերջանում է z-ով, շեշտը նախավերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 15,
    question: "Ինչպե՞ս է ճիշտ գրվում «Շաքարավազ» բառը:",
    options: [
      { id: 'a', text: "Azucar" },
      { id: 'b', text: "Azúcar" },
      { id: 'c', text: "Ázucar" }
    ],
    correctOptionId: 'b',
    explanation: "Azúcar-ը վերջանում է r-ով, շեշտը նախավերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 16,
    question: "Ինչպե՞ս է ճիշտ գրվում «Դժվար» բառը:",
    options: [
      { id: 'a', text: "Dificil" },
      { id: 'b', text: "Difícil" },
      { id: 'c', text: "Dificíl" }
    ],
    correctOptionId: 'b',
    explanation: "Difícil-ը վերջանում է l-ով, շեշտը նախավերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 17,
    question: "Ինչպե՞ս է ճիշտ գրվում «Հեշտ» բառը:",
    options: [
      { id: 'a', text: "Facil" },
      { id: 'b', text: "Fácil" },
      { id: 'c', text: "Facíl" }
    ],
    correctOptionId: 'b',
    explanation: "Fácil-ը վերջանում է l-ով, շեշտը նախավերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  },
  {
    id: 18,
    question: "Ինչպե՞ս է ճիշտ գրվում «Քննություն» բառը:",
    options: [
      { id: 'a', text: "Examen" },
      { id: 'b', text: "Exámen" },
      { id: 'c', text: "Examén" }
    ],
    correctOptionId: 'a',
    explanation: "Examen-ը վերջանում է n-ով, շեշտը նախավերջին վանկի վրա է, ինչը համապատասխանում է կանոնին, ուստի շեշտ չի դրվում:"
  },
  {
    id: 19,
    question: "Ինչպե՞ս է ճիշտ գրվում «Երիտասարդ» բառը:",
    options: [
      { id: 'a', text: "Joven" },
      { id: 'b', text: "Jóven" },
      { id: 'c', text: "Jovén" }
    ],
    correctOptionId: 'a',
    explanation: "Joven-ը վերջանում է n-ով, շեշտը նախավերջին վանկի վրա է, ինչը համապատասխանում է կանոնին, ուստի շեշտ չի դրվում:"
  },
  {
    id: 20,
    question: "Ինչպե՞ս է ճիշտ գրվում «Սիրտ» բառը:",
    options: [
      { id: 'a', text: "Corazon" },
      { id: 'b', text: "Corazón" },
      { id: 'c', text: "Córazon" }
    ],
    correctOptionId: 'b',
    explanation: "Corazón-ը վերջանում է n-ով, շեշտը վերջին վանկի վրա է, ուստի պահանջվում է գրավոր շեշտ:"
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (optionId: string) => {
    if (feedback) return;
    setSelectedOptionId(optionId);
  };

  const handleCheck = () => {
    if (!selectedOptionId || feedback) return;
    if (selectedOptionId === currentQuestion.correctOptionId) {
      setFeedback('correct');
      setScore(prev => prev + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  const progress = ((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex items-center justify-center p-6 font-sans text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-[40px] border border-white/20 text-center max-w-md w-full shadow-2xl"
        >
          <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl font-black mb-4 tracking-tight">Ավարտ!</h1>
          <p className="text-xl opacity-90 mb-2 font-medium">Դուք ավարտեցիք շեշտադրության վիկտորինան:</p>
          <p className="text-2xl font-bold mb-8 text-white">Միավորներ՝ {score} / {QUIZ_QUESTIONS.length}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-[#1e40af] rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Սկսել նորից
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center gap-4 max-w-2xl mx-auto w-full">
        <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
        <div className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full border border-white/30">
          {currentIdx + 1} / {QUIZ_QUESTIONS.length}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar">
        
        {/* Theory Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 mb-8 shadow-xl text-gray-800 text-sm leading-relaxed border-b-4 border-gray-200 w-full"
        >
          <p className="font-bold mb-3 text-[#1e40af] flex items-center gap-2 text-base">
            <BookOpen className="w-5 h-5" />
            Իսպաներենի շեշտադրության կանոններ
          </p>
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {STRESS_THEORY.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-2 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-600 font-medium">{item.rule}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Question Area */}
        <div className="w-full text-center mb-8">
          <h2 className="text-2xl font-black text-white drop-shadow-md leading-tight">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="w-full space-y-4 mb-8">
          {currentQuestion.options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full p-5 rounded-2xl font-bold text-xl transition-all border-b-4 shadow-lg flex items-center justify-between
                ${selectedOptionId === option.id 
                  ? 'bg-[#1e40af] text-white border-[#1e3a8a]' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
            >
              <span className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                  {option.id.toUpperCase()}
                </span>
                {option.text}
              </span>
              {feedback && option.id === currentQuestion.correctOptionId && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
              {feedback && selectedOptionId === option.id && option.id !== currentQuestion.correctOptionId && (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Action Button */}
        <div className="w-full mt-auto pb-6">
          <button 
            onClick={feedback ? handleNext : handleCheck}
            disabled={!selectedOptionId}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl uppercase tracking-wider border-b-4 flex items-center justify-center gap-2
              ${!selectedOptionId 
                ? 'bg-white/20 text-white/50 border-transparent cursor-not-allowed' 
                : 'bg-[#1e40af] text-white border-[#1e3a8a] hover:bg-[#1e3a8a]'
              }`}
          >
            {feedback ? (
              <>Շարունակել <ChevronRight className="w-5 h-5" /></>
            ) : (
              'Ստուգել'
            )}
          </button>
        </div>
      </main>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className={`fixed bottom-0 left-0 right-0 p-8 pb-10 z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]
              ${feedback === 'correct' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`}
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-inner">
                    {feedback === 'correct' ? (
                      <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                    ) : (
                      <XCircle className="w-8 h-8 text-[#ef4444]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է'}
                    </h3>
                    <p className="text-white/90 font-medium">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
                <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={handleNext}
                className="w-full bg-[#1e40af] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1e3a8a] transition-all shadow-lg border-b-4 border-[#1e3a8a]"
              >
                Շարունակել
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
