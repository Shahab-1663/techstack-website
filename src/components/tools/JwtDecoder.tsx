import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Clock, Copy, Check, RefreshCw } from 'lucide-react';

export function JwtDecoder() {
  // Sample token: standard JWT
  const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNoYWhhYiBTYWVlZCIsImFkbWluIjp0cnVlLCJyb2xlIjoiU29mdHdhcmUgRW5naW5lZXIiLCJpYXQiOjE3MTAwMDAwMDAsImV4cCI6MTc5MDAwMDAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  const [token, setToken] = useState(sampleToken);
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [signature, setSignature] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const decodeJwt = (jwtString: string) => {
    try {
      const parts = jwtString.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have exactly 3 parts separated by dots (header.payload.signature)');
      }

      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(escape(atob(base64)));
      };

      const parsedHeader = JSON.parse(decodeBase64Url(parts[0]));
      const parsedPayload = JSON.parse(decodeBase64Url(parts[1]));
      setHeader(parsedHeader);
      setPayload(parsedPayload);
      setSignature(parts[2]);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Failed to decode token');
      setHeader(null);
      setPayload(null);
      setSignature('');
    }
  };

  useEffect(() => {
    decodeJwt(token);
  }, [token]);

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Expiration check
  let isExpired = false;
  let expDate: Date | null = null;
  if (payload && payload.exp) {
    expDate = new Date(payload.exp * 1000);
    isExpired = Date.now() > expDate.getTime();
  }

  return (
    <div className="space-y-6">
      {/* Token Input Box */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Encoded JWT Token
          </span>
          <button
            onClick={() => setToken(sampleToken)}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Load Sample
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="Paste your JWT token here (eyJ...)"
          className="w-full bg-transparent font-mono text-xs text-cyan-300 focus:outline-none resize-none leading-relaxed break-all"
        />
      </div>

      {error ? (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Expiration Status Pill */}
          {payload && payload.exp && (
            <div className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
              isExpired 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}>
              <div className="flex items-center gap-2">
                {isExpired ? <AlertTriangle className="w-4 h-4 text-rose-400" /> : <CheckCircle className="w-4 h-4 text-emerald-400" />}
                <span className="font-semibold">
                  {isExpired ? 'Token Expired' : 'Token Active & Valid'}
                </span>
                <span>•</span>
                <span>Expiry: {expDate?.toUTCString()}</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>exp: {payload.exp}</span>
              </div>
            </div>
          )}

          {/* Header & Payload Decoded Views */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-rose-400 uppercase tracking-wider font-mono">
                  Header (Algorithm & Type)
                </span>
                <button
                  onClick={() => handleCopy(JSON.stringify(header, null, 2), 'header')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  {copied === 'header' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'header' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-rose-300 overflow-x-auto">
                {JSON.stringify(header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-violet-400 uppercase tracking-wider font-mono">
                  Payload (Claims & Data)
                </span>
                <button
                  onClick={() => handleCopy(JSON.stringify(payload, null, 2), 'payload')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  {copied === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'payload' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-violet-300 overflow-x-auto max-h-72">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </div>

          {/* Signature */}
          <div className="rounded-xl border border-white/[0.08] bg-[#070b13] p-4">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider font-mono text-xs block mb-2">
              Signature
            </span>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 break-all border border-slate-800">
              {signature || 'No signature part provided'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
