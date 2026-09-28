import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode as QrIcon, Download, Wifi, Link, FileText, User, Sparkles } from 'lucide-react';

export function QrCodeGenerator() {
  const [qrType, setQrType] = useState<'url' | 'wifi' | 'text'>('url');
  
  // Inputs
  const [urlInput, setUrlInput] = useState('https://github.com/Shahab-1663');
  const [textInput, setTextInput] = useState('TechStack Developer Workspace by Shahab Saeed');
  const [wifiSsid, setWifiSsid] = useState('Office_WiFi_5G');
  const [wifiPassword, setWifiPassword] = useState('SuperSecretKey');
  const [wifiSecurity, setWifiSecurity] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // Styling
  const [fgColor, setFgColor] = useState('#06b6d4');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvg, setQrSvg] = useState<string>('');

  const generateDataPayload = () => {
    if (qrType === 'url') return urlInput;
    if (qrType === 'text') return textInput;
    if (qrType === 'wifi') {
      return `WIFI:S:${wifiSsid};T:${wifiSecurity};P:${wifiPassword};;`;
    }
    return '';
  };

  useEffect(() => {
    const payload = generateDataPayload();
    if (!payload) return;

    // Generate PNG Data URL
    QRCode.toDataURL(payload, {
      width: 400,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorCorrection,
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));

    // Generate SVG string
    QRCode.toString(payload, {
      type: 'svg',
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorCorrection,
    })
      .then((svg) => setQrSvg(svg))
      .catch((err) => console.error(err));
  }, [qrType, urlInput, textInput, wifiSsid, wifiPassword, wifiSecurity, fgColor, bgColor, errorCorrection]);

  const downloadPng = () => {
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `TechStack_QRCode_${qrType}.png`;
    a.click();
  };

  const downloadSvg = () => {
    const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TechStack_QRCode_${qrType}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left 2 Columns: Input Controls */}
      <div className="md:col-span-2 space-y-6">
        {/* QR Type Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08]">
          <button
            onClick={() => setQrType('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              qrType === 'url' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Website URL</span>
          </button>
          <button
            onClick={() => setQrType('wifi')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              qrType === 'wifi' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>WiFi Connect</span>
          </button>
          <button
            onClick={() => setQrType('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              qrType === 'text' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plain Text</span>
          </button>
        </div>

        {/* Dynamic Input Form */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl space-y-4">
          {qrType === 'url' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Target Website URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500/50 font-mono"
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Network SSID (Name)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                  className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Password
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Network password"
                  className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500/50 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Encryption Mode
                </label>
                <select
                  value={wifiSecurity}
                  onChange={(e) => setWifiSecurity(e.target.value as any)}
                  className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Recommended)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
          )}

          {qrType === 'text' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Plain Text Message or Notes
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={4}
                placeholder="Enter any text content..."
                className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500/50 leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Color & Level Customizer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl border border-white/[0.08] bg-slate-900/40">
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">QR Modules Color</label>
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-white">{fgColor.toUpperCase()}</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Background Color</label>
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-white">{bgColor.toUpperCase()}</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Error Correction</label>
            <select
              value={errorCorrection}
              onChange={(e) => setErrorCorrection(e.target.value as any)}
              className="w-full bg-slate-950 py-2.5 px-3 rounded-lg border border-slate-800 text-white text-xs font-mono"
            >
              <option value="L">Low (~7%)</option>
              <option value="M">Medium (~15%)</option>
              <option value="Q">Quartile (~25%)</option>
              <option value="H">High (~30%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Column: Live QR Preview & Downloads */}
      <div className="flex flex-col items-center justify-between p-6 rounded-2xl border border-white/[0.08] bg-[#070b13] shadow-2xl">
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <QrIcon className="w-4 h-4 text-cyan-400" />
            Live QR Preview
          </span>
          <span className="text-emerald-400 font-mono text-[11px]">Instant Render</span>
        </div>

        <div className="my-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Generated QR Code" className="w-56 h-56 rounded-lg object-contain shadow-lg" />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-slate-500 text-xs">
              Generating...
            </div>
          )}
        </div>

        <div className="w-full space-y-2">
          <button
            onClick={downloadPng}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res PNG</span>
          </button>
          <button
            onClick={downloadSvg}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Vector SVG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
