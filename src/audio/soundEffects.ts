class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    const saved = localStorage.getItem('puan_sound_enabled');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('puan_sound_enabled', String(this.enabled));
    if (this.enabled) {
      this.playBeep(440, 'triangle', 0.1);
    }
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, gainValue = 0.1, delay = 0) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    } catch {
      // Audio not permitted yet or not supported
    }
  }

  public playClick() {
    this.playTone(800, 'square', 0.04, 0.05);
  }

  public playTravel() {
    this.playTone(300, 'triangle', 0.08, 0.08);
    this.playTone(450, 'triangle', 0.12, 0.08, 0.06);
  }

  public playAction() {
    this.playTone(523.25, 'triangle', 0.08, 0.1); // C5
    this.playTone(659.25, 'triangle', 0.12, 0.1, 0.07); // E5
  }

  public playWeekAdvance() {
    this.playTone(440, 'square', 0.08, 0.08);
    this.playTone(554.37, 'square', 0.08, 0.08, 0.08);
    this.playTone(659.25, 'square', 0.15, 0.08, 0.16);
  }

  public playExamCard() {
    this.playTone(400, 'triangle', 0.1, 0.12);
    this.playTone(600, 'sine', 0.15, 0.12, 0.08);
  }

  public playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.2, 0.12, idx * 0.1);
    });
  }

  public playWarning() {
    this.playTone(220, 'sawtooth', 0.18, 0.12);
    this.playTone(196, 'sawtooth', 0.25, 0.12, 0.15);
  }

  public playGameOver() {
    const notes = [392, 349.23, 311.13, 261.63]; // G4, F4, Eb4, C4
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sawtooth', 0.35, 0.15, idx * 0.25);
    });
  }

  public playBeep(freq = 440, type: OscillatorType = 'sine', duration = 0.1) {
    this.playTone(freq, type, duration, 0.1);
  }
}

export const sound = new SoundEngine();
