import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Mic, Wifi, Radio, Sliders } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(85);
  const [activeTab, setActiveTab] = useState<'player' | 'voice' | 'pins'>('player');
  const [voiceLog, setVoiceLog] = useState<string[]>(["ESP32-S3 Voice Intercom ready."]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleVoice = (cmd: string) => {
    setVoiceLog(prev => [...prev, `You: "${cmd}"`, `ESP32: Streaming command to I2S DAC (GPIO 8, 9, 10)`]);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 font-sans flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-[#161618] border border-[#222225] rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#222225] pb-3">
          <div>
            <h1 className="text-lg font-black italic font-mono">BLENTRONIX <span className="text-[#00F0FF]">S3</span></h1>
            <p className="text-[10px] text-zinc-400 font-mono">ESP32-S3 I2S COMPANION APP</p>
          </div>
          <span className="text-[10px] font-mono bg-[#0A0A0B] text-[#00F0FF] border border-[#00F0FF]/40 px-2 py-0.5 rounded">
            ONLINE
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#0A0A0B] p-1 rounded-xl font-mono text-xs">
          <button onClick={() => setActiveTab('player')} className={`flex-1 py-1.5 rounded-lg ${activeTab === 'player' ? 'bg-[#00F0FF] text-black font-bold' : 'text-zinc-400'}`}>PLAYER</button>
          <button onClick={() => setActiveTab('voice')} className={`flex-1 py-1.5 rounded-lg ${activeTab === 'voice' ? 'bg-[#00F0FF] text-black font-bold' : 'text-zinc-400'}`}>VOICE AGENT</button>
          <button onClick={() => setActiveTab('pins')} className={`flex-1 py-1.5 rounded-lg ${activeTab === 'pins' ? 'bg-[#00F0FF] text-black font-bold' : 'text-zinc-400'}`}>PINOUT</button>
        </div>

        {/* Tab 1: Music Player */}
        {activeTab === 'player' && (
          <div className="space-y-6 text-center">
            <div className="w-48 h-48 mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-lg shadow-[#00F0FF]/10">
              <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600" alt="Cover" className="w-full h-full object-cover" />
            </div>

            <div>
              <h2 className="text-xl font-bold">-Beat it.mp3</h2>
              <p className="text-xs text-[#00F0FF] font-mono">AWS S3 EU-NORTH-1 STREAM</p>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6">
              <button className="p-3 bg-zinc-900 rounded-full border border-zinc-800"><SkipBack className="w-5 h-5" /></button>
              <button onClick={togglePlay} className="p-4 bg-[#00F0FF] text-black rounded-full shadow-lg shadow-[#00F0FF]/30">
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>
              <button className="p-3 bg-zinc-900 rounded-full border border-zinc-800"><SkipForward className="w-5 h-5" /></button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 bg-[#0A0A0B] p-3 rounded-xl border border-zinc-800">
              <Volume2 className="w-4 h-4 text-[#00F0FF]" />
              <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-[#00F0FF]" />
              <span className="text-xs font-mono">{volume}%</span>
            </div>
          </div>
        )}

        {/* Tab 2: Voice Agent */}
        {activeTab === 'voice' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex flex-col items-center p-6 bg-[#0A0A0B] rounded-2xl border border-zinc-800">
              <button onClick={() => handleVoice("Alexa, play Beat It on ESP32")} className="p-5 bg-[#00F0FF] text-black rounded-full shadow-lg shadow-[#00F0FF]/40 mb-3">
                <Mic className="w-6 h-6" />
              </button>
              <span>TAP TO TALK (INMP441 MIC)</span>
            </div>
            <div className="bg-[#0A0A0B] p-3 rounded-xl border border-zinc-800 max-h-40 overflow-y-auto space-y-1">
              {voiceLog.map((log, i) => (
                <div key={i} className="text-zinc-300">{log}</div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Pinout */}
        {activeTab === 'pins' && (
          <div className="bg-[#0A0A0B] p-4 rounded-xl border border-zinc-800 font-mono text-xs space-y-2">
            <div className="flex justify-between"><span>I2S Bit Clock (BCLK):</span><span className="text-[#00F0FF] font-bold">GPIO 8</span></div>
            <div className="flex justify-between"><span>I2S Word Select (LRCK):</span><span className="text-[#00F0FF] font-bold">GPIO 9</span></div>
            <div className="flex justify-between"><span>I2S Data Out (DOUT):</span><span className="text-[#00F0FF] font-bold">GPIO 10</span></div>
            <div className="flex justify-between"><span>I2S Mic (INMP441 SD):</span><span className="text-[#00F0FF] font-bold">GPIO 11</span></div>
            <div className="flex justify-between"><span>DAC Board:</span><span className="text-white">PCM5102A</span></div>
          </div>
        )}

      </div>
    </div>
  );
}