import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, CheckCircle2, Plus, Trash2, Volume2, Sparkles } from 'lucide-react';

export function PomodoroTimer() {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  // Simple task list
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Code Architecture', done: true },
    { id: 2, text: 'Deploy University Calculator Tools', done: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const durations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Audio might be blocked until user interaction
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      playChime();
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedSessions((prev) => prev + 1);
        setMode('shortBreak');
        setTimeLeft(durations.shortBreak);
      } else {
        setMode('focus');
        setTimeLeft(durations.focus);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = durations[mode];
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), done: false }]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Timer Section (Col 1 & 2) */}
      <div className="md:col-span-2 flex flex-col items-center justify-center p-8 rounded-2xl border border-white/[0.08] bg-[#070b13] shadow-2xl relative overflow-hidden">
        {/* Ambient glow behind timer */}
        <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Mode Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-8 z-10">
          <button
            onClick={() => switchMode('focus')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'focus' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            25m Deep Work
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            5m Rest
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'longBreak' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            15m Long Break
          </button>
        </div>

        {/* Big Digital Countdown */}
        <div className="relative flex flex-col items-center justify-center z-10 my-4">
          <div className="text-7xl sm:text-8xl font-black font-mono tracking-tight text-white select-none">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mt-2">
            {mode === 'focus' ? 'Focus Sprint In Progress' : 'Break Time • Recharge'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md h-2 bg-slate-900 rounded-full my-6 overflow-hidden border border-slate-800 z-10">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
          />
        </div>

        {/* Play / Pause / Reset Actions */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reset interval"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 text-xs text-slate-500 flex items-center gap-2 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Completed Sprints Today: <strong className="text-white">{completedSessions}</strong></span>
        </div>
      </div>

      {/* Task checklist (Col 3) */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl flex flex-col justify-between space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Sprint Task List
          </h4>

          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add sprint task..."
              className="flex-1 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500/50"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
            >
              Add
            </button>
          </form>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs group"
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center ${task.done ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-700'}`}>
                    {task.done && '✓'}
                  </span>
                  <span className={`truncate ${task.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-600 hover:text-rose-400 ml-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          Tip: 25 minutes of deep focus followed by 5 minutes of rest keeps your cognitive processing in flow state.
        </div>
      </div>
    </div>
  );
}
