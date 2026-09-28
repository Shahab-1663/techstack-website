import React, { useState } from 'react';
import { Copy, Check, Upload, Binary, Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';

export function Base64Converter() {
  const [mode, setMode] = useState<'text' | 'file'>('text');
  const [direction, setDirection] = useState<'encode' | 'decode'>('encode');

  // Text Mode state
  const [textInput, setTextInput] = useState('TechStack Developer Portal by Shahab Saeed');
  const [textOutput, setTextOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // File Mode state
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);

  // Process text on changes
  React.useEffect(() => {
    try {
      if (!textInput) {
        setTextOutput('');
        setError(null);
        return;
      }
      if (direction === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(textInput)));
        setTextOutput(encoded);
        setError(null);
      } else {
        const decoded = decodeURIComponent(escape(atob(textInput.trim())));
        setTextOutput(decoded);
        setError(null);
      }
    } catch (e: any) {
      setError('Invalid input for Base64 ' + direction);
      setTextOutput('');
    }
  }, [textInput, direction]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileType(file.type);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Navigation */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-white/[0.08]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode('text')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              mode === 'text'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Text String
          </button>
          <button
            onClick={() => setMode('file')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              mode === 'file'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Image & File
          </button>
        </div>

        {mode === 'text' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Operation:</span>
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setDirection('encode')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  direction === 'encode' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setDirection('decode')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  direction === 'decode' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
                }`}
              >
                Decode
              </button>
            </div>
          </div>
        )}
      </div>

      {mode === 'text' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 uppercase tracking-wider">
                {direction === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
              </span>
              <span>{textInput.length} chars</span>
            </div>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              rows={10}
              placeholder={direction === 'encode' ? 'Type or paste plain text...' : 'Paste base64 encoded string...'}
              className="w-full bg-transparent font-mono text-sm text-slate-200 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Output */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 uppercase tracking-wider">
                {direction === 'encode' ? 'Base64 Output' : 'Plain Text Decoded'}
              </span>
              {textOutput && (
                <button
                  onClick={() => handleCopy(textOutput)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            {error ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : (
              <textarea
                readOnly
                value={textOutput}
                rows={10}
                placeholder="Result will appear here..."
                className="w-full bg-transparent font-mono text-sm text-cyan-300 focus:outline-none resize-none leading-relaxed"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Upload Zone */}
          <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500/50 bg-slate-900/30 cursor-pointer transition-colors group">
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 mb-3 transition-colors" />
            <span className="text-sm font-medium text-slate-200">
              Choose an image or file to encode to Base64
            </span>
            <span className="text-xs text-slate-500 mt-1">PNG, JPG, SVG, WebP, GIF, or PDF (up to 5MB)</span>
            <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,application/pdf" />
          </label>

          {fileBase64 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl border border-white/[0.08] bg-[#070b13] p-5">
              {/* File details & Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white truncate max-w-xs">{fileName}</h4>
                    <p className="text-xs text-slate-400">
                      {fileType} • {(fileSize / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                {fileType.startsWith('image/') && (
                  <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-2 flex items-center justify-center max-h-48 overflow-hidden">
                    <img src={fileBase64} alt={fileName} className="max-h-44 object-contain rounded-lg" />
                  </div>
                )}
              </div>

              {/* Base64 Data String */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
                  <span>Data URI ({fileBase64.length} chars)</span>
                  <button
                    onClick={() => handleCopy(fileBase64)}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy URI'}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  value={fileBase64}
                  rows={8}
                  className="w-full bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
