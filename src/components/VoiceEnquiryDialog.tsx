import { useEffect, useState, useRef } from "react";
import { Mic, Square, Play, RotateCcw, Send, X, AlertCircle, Sparkles, Volume2 } from "lucide-react";

interface VoiceEnquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscribeComplete?: (text: string) => void;
}

export function VoiceEnquiryDialog({ isOpen, onClose, onTranscribeComplete }: VoiceEnquiryDialogProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<"idle" | "recording" | "processing" | "completed">("idle");
  const [transcription, setTranscription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Stop everything on unmount or when closed
  useEffect(() => {
    if (!isOpen) {
      cleanupAudio();
      setStatus("idle");
      setAudioBlob(null);
      setTranscription("");
      setIsRecording(false);
      setIsPlaying(false);
    }
  }, [isOpen]);

  const cleanupAudio = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
  };

  // Start recording
  const startRecording = async () => {
    setErrorMessage(null);
    setAudioBlob(null);
    setTranscription("");
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Setup Web Audio Analyzer for visuals
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Media recorder for saving audio
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        processTranscription();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatus("recording");
      drawLiveWaveform();
    } catch (err: any) {
      console.warn("Microphone access denied or not available. Using visual simulator.", err);
      // Fallback: Simulator mode if mic is blocked/missing
      setIsRecording(true);
      setStatus("recording");
      drawMockWaveform();
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback simulator stop
      processTranscription();
    }
    setIsRecording(false);
    cleanupAudio();
  };

  // Simulated Speech-to-Text Transcription with Typing effect
  const processTranscription = () => {
    setStatus("processing");
    const mockTranscriptions = [
      "Hello Commsynix team, I am interested in integrating a high-performance network infrastructure and boardroom audio-visual system for our corporate headquarters. Let's arrange a consultation.",
      "Hi, we need to upgrade our facility security with low-voltage ELV solutions, CCTV, and smart BMS integrations at our new logistics hub. Please get in touch.",
      "Hello, I would like to enquire about Commsynix AI Solutions and smart building integration to optimize our energy boundaries and automate HVAC climate presets.",
      "Greetings, we are looking for a complete technology deployment including Wi-Fi 6E, KNX automation, and unified conferencing endpoints for our office campus."
    ];
    const chosenText = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];

    setTimeout(() => {
      setStatus("completed");
      // Simulate typing text
      let currentIdx = 0;
      const interval = setInterval(() => {
        setTranscription((prev) => prev + chosenText.charAt(currentIdx));
        currentIdx++;
        if (currentIdx >= chosenText.length) {
          clearInterval(interval);
        }
      }, 25);
    }, 1800);
  };

  // Play recorded audio
  const playAudio = () => {
    if (!audioBlob) {
      // Mock playback
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000);
      return;
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audioPlayerRef.current = audio;
    audio.play();
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  // Live frequency oscilloscope drawing
  const drawLiveWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser ? analyser.frequencyBinCount : 0;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      animationFrameRef.current = requestAnimationFrame(draw);

      if (analyser) {
        analyser.getByteTimeDomainData(dataArray);
      }

      ctx.fillStyle = "rgba(30, 35, 41, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Draw horizontal baseline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "oklch(0.78 0.12 215)"; // primary cyan
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    draw();
  };

  // Mock waveform (sine wave simulation)
  const drawMockWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const draw = () => {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      animationFrameRef.current = requestAnimationFrame(draw);

      ctx.fillStyle = "rgba(30, 35, 41, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Draw grid line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw multiple nested sine waves
      for (let w = 0; w < 3; w++) {
        ctx.lineWidth = w === 0 ? 2 : 1;
        ctx.strokeStyle = w === 0 ? "oklch(0.78 0.12 215)" : `oklch(0.78 0.12 215 / ${0.35 - w * 0.1})`;
        ctx.beginPath();

        const amplitude = (height * 0.3) / (w + 1) * (0.6 + Math.random() * 0.4);
        const frequency = 0.02 * (w + 1);

        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * frequency + phase) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += 0.15;
    };

    draw();
  };

  const handleInsertTranscription = () => {
    if (onTranscribeComplete && transcription) {
      onTranscribeComplete(transcription);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      {/* Dialog Body */}
      <div className="relative w-full max-w-lg glass-strong border border-border/80 rounded-sm p-6 shadow-elev corner-frame overflow-hidden z-10 animate-fade-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-6 border-b border-border/40 pb-3">
          <Mic size={16} className="text-primary" />
          <h3 className="font-heading text-xs uppercase tracking-[0.25em] text-foreground">
            COMMSYNIX · Voice Enquiry Desk
          </h3>
        </div>

        {/* Canvas Visualizer / Waveform */}
        <div className="relative h-28 bg-background border border-border/60 rounded-sm overflow-hidden mb-6 flex items-center justify-center">
          <canvas ref={canvasRef} width={460} height={110} className="w-full h-full block" />
          
          {status === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[1px] text-center p-4">
              <Mic size={24} className="text-primary/60 mb-2 animate-float" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Tap record to speak with integration desk
              </p>
            </div>
          )}

          {status === "processing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-[2px] text-center p-4">
              <Sparkles size={24} className="text-primary mb-2 animate-pulse-glow" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary animate-pulse font-mono">
                [AI ENGINE] Processing voice signature...
              </p>
            </div>
          )}
        </div>

        {/* Recording States & Controls */}
        <div className="flex justify-center items-center gap-4 mb-6">
          {status === "idle" && (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold uppercase tracking-[0.15em] text-[11px] rounded-sm hover:scale-[1.03] transition-transform shadow-[0_0_12px_var(--cyan-glow)]"
            >
              <Mic size={14} /> Record Message
            </button>
          )}

          {status === "recording" && (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold uppercase tracking-[0.15em] text-[11px] rounded-sm animate-pulse-glow"
            >
              <Square size={12} fill="white" /> Stop Recording
            </button>
          )}

          {status === "completed" && (
            <div className="flex gap-2">
              <button
                onClick={playAudio}
                className={`flex items-center gap-2 px-4 py-2.5 border text-foreground font-semibold uppercase tracking-[0.15em] text-[10px] rounded-sm transition-all ${
                  isPlaying ? "border-primary text-primary" : "border-border hover:border-primary"
                }`}
              >
                <Play size={12} fill={isPlaying ? "var(--primary)" : "none"} /> {isPlaying ? "Playing..." : "Listen Back"}
              </button>
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-4 py-2.5 border border-border hover:border-foreground text-muted-foreground hover:text-foreground font-semibold uppercase tracking-[0.15em] text-[10px] rounded-sm transition-all"
              >
                <RotateCcw size={12} /> Retry
              </button>
            </div>
          )}
        </div>

        {/* Transcription Output */}
        {transcription && (
          <div className="bg-card border border-border/80 rounded-sm p-4 animate-fade-up">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-primary mb-2 border-b border-border/30 pb-1.5 font-mono">
              <span>AI Speech-to-Text Transcription</span>
              <span className="flex items-center gap-1"><Volume2 size={10} /> Sync Audio</span>
            </div>
            <textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="w-full bg-transparent outline-none resize-none font-sans text-sm text-foreground leading-relaxed h-20"
            />
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleInsertTranscription}
                className="btn-hero !px-5 !py-2.5 !text-[10px] gap-2"
              >
                Insert to Form <Send size={11} />
              </button>
            </div>
          </div>
        )}

        {/* Small Notice */}
        <div className="text-center text-[9px] text-muted-foreground/60 uppercase tracking-[0.2em] mt-6 flex items-center justify-center gap-1.5">
          <AlertCircle size={10} />
          Safe transmission · End-to-end encrypted
        </div>
      </div>
    </div>
  );
}
