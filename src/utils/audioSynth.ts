// Web Audio API ambient cosmic soundscape & crystal chimes
class CosmicAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAmbient(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startAmbient() {
    if (!this.ctx || !this.masterGain) return;

    // Fade in
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.droneGain.gain.exponentialRampToValueAtTime(0.3, this.ctx.currentTime + 3);

    // Warm resonant low-pass filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    this.droneGain.connect(this.filter);
    this.filter.connect(this.masterGain);

    // Sacred 432 Hz Root and ethereal cosmic overtone chords (A=432Hz, E=324Hz, C#=270Hz)
    const baseFreqs = [108, 216, 324, 432, 648];

    this.oscs = baseFreqs.map((freq, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Subtle detune for hypnotic binaural pulsing
      const detuneAmount = (i - 2) * 2.5;
      osc.detune.setValueAtTime(detuneAmount, this.ctx!.currentTime);

      const oscGain = this.ctx!.createGain();
      oscGain.gain.setValueAtTime(0.15 / (i + 1), this.ctx!.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.droneGain!);
      osc.start();
      return osc;
    });

    this.isPlaying = true;
  }

  public stopAmbient() {
    if (!this.ctx || !this.droneGain) return;
    try {
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.oscs.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
        });
        this.oscs = [];
        this.isPlaying = false;
      }, 1600);
    } catch {
      this.isPlaying = false;
    }
  }

  // Heavenly Crystal Chime for message send or insight reveal
  public playCrystalChime(freqMultiplier: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.2, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      chimeGain.connect(this.masterGain);

      // Celestial Bell Harmonics (C-sharp / G-sharp bells)
      const freqs = [864, 1296, 1728].map(f => f * freqMultiplier);
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const subGain = this.ctx!.createGain();
        subGain.gain.setValueAtTime(0.12 / (idx + 1), now);
        osc.connect(subGain);
        subGain.connect(chimeGain);

        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch {
      // Audio auto-play policies fallback gracefully
    }
  }

  // Tactile Tarot card flip sound
  public playCardFlip() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.18);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  }
}

export const cosmicAudio = new CosmicAudioSynth();
