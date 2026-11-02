// Web Audio Ambient Soundscape Synthesizer
// Completely offline, zero external audio asset dependencies!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop: () => void }[] = [];
  public currentTrackId: string | null = null;
  public volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    this.activeNodes.forEach(node => {
      try {
        node.stop();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
    this.currentTrackId = null;
  }

  private createNoiseBuffer(durationSec = 5): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    // Generate pink noise approximation
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // boost level
    }
    return buffer;
  }

  public play(trackId: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.stop();
    this.currentTrackId = trackId;

    switch (trackId) {
      case 'rain':
        this.startRain();
        break;
      case 'breeze':
        this.startBreeze();
        break;
      case 'waves':
        this.startWaves();
        break;
      case 'chime':
        this.startChime();
        break;
      case 'night':
        this.startNight();
        break;
      default:
        this.startRain();
    }
  }

  private startRain() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(6);
    if (!noiseBuffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    // Filter to warm rain frequencies
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    this.activeNodes.push({
      stop: () => {
        source.stop();
        source.disconnect();
      }
    });
  }

  private startBreeze() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(8);
    if (!noiseBuffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    // LFO to modulate breeze intensity
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime); // slow wind cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    lfo.start();
    source.start();

    this.activeNodes.push({
      stop: () => {
        try { lfo.stop(); } catch {}
        try { source.stop(); } catch {}
        source.disconnect();
        lfo.disconnect();
      }
    });
  }

  private startWaves() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(8);
    if (!noiseBuffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);

    // LFO for surf swelling in and out (10s cycle)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(500, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.65, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    lfo.start();
    source.start();

    this.activeNodes.push({
      stop: () => {
        try { lfo.stop(); } catch {}
        try { source.stop(); } catch {}
        source.disconnect();
      }
    });
  }

  private startChime() {
    if (!this.ctx || !this.masterGain) return;

    let isRunning = true;
    const playBell = () => {
      if (!this.ctx || !this.masterGain || !isRunning) return;
      const now = this.ctx.currentTime;
      // 528Hz Solfeggio / calm bell frequency
      const freqs = [528, 528 * 2.76, 528 * 5.4];
      const gains = [0.4, 0.15, 0.06];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(gains[idx], now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(g);
        g.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 6);
      });
    };

    // Play initial bell
    playBell();
    // Play recurring chime every 9 seconds
    const interval = setInterval(playBell, 9000);

    this.activeNodes.push({
      stop: () => {
        isRunning = false;
        clearInterval(interval);
      }
    });
  }

  private startNight() {
    if (!this.ctx || !this.masterGain) return;
    let isRunning = true;

    // Distant cricket rhythm
    const chirp = () => {
      if (!this.ctx || !this.masterGain || !isRunning) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(4600 + Math.random() * 200, now);

      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.04, now + 0.03);
      g.gain.linearRampToValueAtTime(0, now + 0.08);

      osc.connect(g);
      g.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.1);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        chirp();
        setTimeout(chirp, 90);
        setTimeout(chirp, 180);
      }
    }, 1200);

    // Warm background floor
    const noiseBuffer = this.createNoiseBuffer(5);
    if (noiseBuffer) {
      const source = this.ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;
      const f = this.ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.setValueAtTime(350, this.ctx.currentTime);
      const bgGain = this.ctx.createGain();
      bgGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      source.connect(f);
      f.connect(bgGain);
      bgGain.connect(this.masterGain);
      source.start();

      this.activeNodes.push({
        stop: () => {
          try { source.stop(); } catch {}
          source.disconnect();
        }
      });
    }

    this.activeNodes.push({
      stop: () => {
        isRunning = false;
        clearInterval(interval);
      }
    });
  }
}

export const soundEngine = new SoundEngine();
