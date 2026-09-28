import React, { useState, useId } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Sparkles, 
  RotateCcw, 
  Download, 
  Award, 
  TrendingUp, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Course {
  id: string;
  name: string;
  grade: string;
  creditHours: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

const GRADE_POINTS: Record<string, number> = {
  'A': 4.0,
  'A+': 4.0,
  'A-': 3.7,
  'B+': 3.5,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.5,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
};

export function CgpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 'sem-1',
      name: 'Semester 1',
      courses: [
        { id: 'c-1', name: 'Data Structures & Algorithms', grade: 'A', creditHours: 3 },
        { id: 'c-2', name: 'Computer Architecture', grade: 'B+', creditHours: 3 },
        { id: 'c-3', name: 'Calculus & Analytical Geometry', grade: 'A-', creditHours: 4 },
        { id: 'c-4', name: 'Technical & Business Writing', grade: 'A', creditHours: 3 },
      ],
    }
  ]);

  const [activeSemIndex, setActiveSemIndex] = useState(0);
  const [targetCgpa, setTargetCgpa] = useState<number>(3.8);

  const activeSemester = semesters[activeSemIndex] || semesters[0];

  const addCourse = () => {
    const newCourse: Course = {
      id: 'c-' + Date.now(),
      name: `Course ${activeSemester.courses.length + 1}`,
      grade: 'A',
      creditHours: 3,
    };
    const updated = [...semesters];
    updated[activeSemIndex].courses.push(newCourse);
    setSemesters(updated);
  };

  const removeCourse = (courseId: string) => {
    if (activeSemester.courses.length <= 1) return;
    const updated = [...semesters];
    updated[activeSemIndex].courses = updated[activeSemIndex].courses.filter(c => c.id !== courseId);
    setSemesters(updated);
  };

  const updateCourse = (courseId: string, field: keyof Course, value: any) => {
    const updated = [...semesters];
    const course = updated[activeSemIndex].courses.find(c => c.id === courseId);
    if (course) {
      (course as any)[field] = value;
      setSemesters(updated);
    }
  };

  const addSemester = () => {
    const newSem: Semester = {
      id: 'sem-' + (semesters.length + 1),
      name: `Semester ${semesters.length + 1}`,
      courses: [
        { id: 'c-' + Date.now() + '-1', name: 'Subject 1', grade: 'A', creditHours: 3 },
        { id: 'c-' + Date.now() + '-2', name: 'Subject 2', grade: 'B+', creditHours: 3 },
        { id: 'c-' + Date.now() + '-3', name: 'Subject 3', grade: 'A', creditHours: 3 },
      ],
    };
    setSemesters([...semesters, newSem]);
    setActiveSemIndex(semesters.length);
  };

  const removeSemester = (index: number) => {
    if (semesters.length <= 1) return;
    const updated = semesters.filter((_, i) => i !== index);
    setSemesters(updated);
    setActiveSemIndex(Math.max(0, index - 1));
  };

  // Calculations
  const calculateSemesterStats = (sem: Semester) => {
    let totalPoints = 0;
    let totalCredits = 0;
    sem.courses.forEach(c => {
      const gp = GRADE_POINTS[c.grade] ?? 0;
      totalPoints += gp * (c.creditHours || 0);
      totalCredits += Number(c.creditHours) || 0;
    });
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return { totalPoints, totalCredits, gpa };
  };

  const currentSemStats = calculateSemesterStats(activeSemester);

  let cumulativePoints = 0;
  let cumulativeCredits = 0;
  semesters.forEach(s => {
    const { totalPoints, totalCredits } = calculateSemesterStats(s);
    cumulativePoints += totalPoints;
    cumulativeCredits += totalCredits;
  });
  const overallCgpa = cumulativeCredits > 0 ? cumulativePoints / cumulativeCredits : 0;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b'],
    });
  };

  const getGpaGradeTier = (gpa: number) => {
    if (gpa >= 3.8) return { label: 'Summa Cum Laude / High Distinction', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (gpa >= 3.5) return { label: 'Magna Cum Laude / Dean’s List', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    if (gpa >= 3.0) return { label: 'First Class / Good Standing', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
    if (gpa >= 2.0) return { label: 'Satisfactory / Passing', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { label: 'Academic Probation Warning', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const tier = getGpaGradeTier(overallCgpa);

  const exportSummary = () => {
    const report = {
      calculatedAt: new Date().toISOString(),
      gradingScale: '4.0 Scale Standard',
      overallCgpa: overallCgpa.toFixed(3),
      totalCredits: cumulativeCredits,
      semesters: semesters.map(s => {
        const stats = calculateSemesterStats(s);
        return {
          name: s.name,
          semesterGpa: stats.gpa.toFixed(3),
          credits: stats.totalCredits,
          courses: s.courses.map(c => ({
            name: c.name,
            grade: c.grade,
            points: GRADE_POINTS[c.grade],
            creditHours: c.creditHours,
          })),
        };
      }),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Academic_CGPA_Report_${overallCgpa.toFixed(2)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cumulative CGPA Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0d1424] to-slate-900/90 border border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-cyan-400 tracking-wider">
              Cumulative CGPA
            </span>
            <button
              onClick={triggerCelebration}
              className="p-1 rounded-md text-cyan-400 hover:text-cyan-200 transition-colors"
              title="Celebrate GPA"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-5xl font-black text-white tracking-tight font-mono">
              {overallCgpa.toFixed(2)}
            </span>
            <span className="text-slate-400 text-sm font-mono">/ 4.00</span>
          </div>
          <div className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border ${tier.bg} ${tier.color}`}>
            <Award className="w-3.5 h-3.5" />
            <span>{tier.label}</span>
          </div>
        </div>

        {/* Current Semester GPA */}
        <div className="rounded-2xl bg-slate-900/70 border border-white/[0.08] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">
              {activeSemester.name} GPA
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-5xl font-black text-emerald-400 tracking-tight font-mono">
              {currentSemStats.gpa.toFixed(2)}
            </span>
            <span className="text-slate-400 text-sm font-mono">/ 4.00</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center gap-2">
            <span>{currentSemStats.totalCredits} Credit Hours</span>
            <span>•</span>
            <span>{activeSemester.courses.length} Enrolled Courses</span>
          </div>
        </div>

        {/* Total Program Credits & Target Simulator */}
        <div className="rounded-2xl bg-slate-900/70 border border-white/[0.08] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">
              Total Credits Completed
            </span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-5xl font-black text-indigo-300 tracking-tight font-mono">
              {cumulativeCredits}
            </span>
            <span className="text-slate-400 text-sm font-mono">hours</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>{semesters.length} Semester{semesters.length > 1 ? 's' : ''} tracked</span>
            <button
              onClick={exportSummary}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
            >
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Semester Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {semesters.map((sem, idx) => {
            const isActive = idx === activeSemIndex;
            const stats = calculateSemesterStats(sem);
            return (
              <button
                key={sem.id}
                onClick={() => setActiveSemIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                <span>{sem.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-black/40 text-slate-300 font-mono">
                  {stats.gpa.toFixed(2)}
                </span>
                {semesters.length > 1 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSemester(idx);
                    }}
                    className="hover:text-rose-400 ml-1 cursor-pointer text-slate-500"
                    title="Remove Semester"
                  >
                    ×
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={addSemester}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-slate-900/40 hover:bg-slate-800/60 text-slate-300 border border-dashed border-slate-700 hover:border-slate-500 transition-colors"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Semester</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>Scale: Standard 4.0</span>
          <span>•</span>
          <button
            onClick={() => {
              setSemesters([
                {
                  id: 'sem-1',
                  name: 'Semester 1',
                  courses: [
                    { id: 'c-1', name: 'Course 1', grade: 'A', creditHours: 3 },
                    { id: 'c-2', name: 'Course 2', grade: 'B', creditHours: 3 },
                  ]
                }
              ]);
              setActiveSemIndex(0);
            }}
            className="text-slate-500 hover:text-slate-300 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Courses List Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              {activeSemester.name} Courses
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter subject titles, select awarded letter grades, and specify credit weights.
            </p>
          </div>
          <button
            onClick={addCourse}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-mono text-slate-400 uppercase">
                <th className="py-2.5 px-3">Subject / Course Name</th>
                <th className="py-2.5 px-3 w-40">Grade</th>
                <th className="py-2.5 px-3 w-32">Credit Hours</th>
                <th className="py-2.5 px-3 w-28">Grade Points</th>
                <th className="py-2.5 px-3 w-16 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {activeSemester.courses.map((course, idx) => {
                const points = GRADE_POINTS[course.grade] ?? 0;
                const totalPoints = points * (course.creditHours || 0);
                return (
                  <tr key={course.id} className="group hover:bg-white/[0.02]">
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        placeholder={`e.g. Course ${idx + 1}`}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-1.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/50"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 font-mono"
                      >
                        {Object.entries(GRADE_POINTS).map(([letter, val]) => (
                          <option key={letter} value={letter}>
                            {letter} ({val.toFixed(1)})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={course.creditHours}
                        onChange={(e) => updateCourse(course.id, 'creditHours', Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 font-mono"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      <span className="text-cyan-400 font-semibold">{totalPoints.toFixed(1)}</span>
                      <span className="text-slate-500 text-xs ml-1">pts</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => removeCourse(course.id)}
                        disabled={activeSemester.courses.length <= 1}
                        className="p-1.5 text-slate-500 hover:text-rose-400 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                        title="Delete course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Scale Reference Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-400">
        <h4 className="font-semibold text-slate-200 uppercase tracking-wider mb-2">
          Standard 4.0 Grading Reference Scale
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {Object.entries(GRADE_POINTS).map(([gr, pt]) => (
            <div key={gr} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono">
              <span className="font-bold text-white">{gr}</span>
              <span className="text-cyan-400">{pt.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
