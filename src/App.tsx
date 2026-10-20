import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, Plus, Check, Info, Search, Home, Film, Tv, Compass, 
  User, Shield, Settings, Trash2, Edit3, Sparkles, Star, 
  ChevronLeft, ChevronRight, X, ExternalLink, LogOut, CheckCircle,
  TrendingUp, Zap, Radio, Lock, RefreshCw, Layers, Layout, 
  Palette, Users, CreditCard, Image as ImageIcon, Video, HelpCircle, Eye, EyeOff,
  Sliders, MoveUp, MoveDown, Grid, AlertCircle, Volume2, VolumeX,
  Maximize, Minimize, RotateCcw, RotateCw, Subtitles, Save, Upload, Code,
  Share2, PlayCircle, MonitorPlay
} from 'lucide-react';

interface Branding {
  siteName: string;
  siteSuffix: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  footerText: string;
  footerLinks: string[];
}

interface Brand {
  id: string;
  name: string;
  logoText: string;
  gradient: string;
  bgImage: string;
}

interface VideoItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  brand: string;
  genre: string;
  year: string;
  rating: string;
  duration: string;
  description: string;
  bannerUrl: string;
  posterUrl: string;
  youtubeUrl: string;
  featured?: boolean;
  trending?: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  tier: string;
  status: string;
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
}

const DEFAULT_BRANDING: Branding = {
  siteName: 'DISNEY',
  siteSuffix: '+',
  logoUrl: '',
  primaryColor: '#0266e8',
  accentColor: '#3b82f6',
  footerText: '© 2026 Disney y sus entidades relacionadas. Todos los derechos reservados. El servicio de suscripción de Disney+ está sujeto a términos y condiciones.',
  footerLinks: ['Términos de uso', 'Política de privacidad', 'Anuncios basados en intereses', 'Dispositivos compatibles', 'Ayuda']
};

const DEFAULT_BRANDS: Brand[] = [
  { id: 'disney', name: 'Disney', logoText: 'Disney', gradient: 'from-blue-600/40 via-blue-900/20 to-transparent', bgImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80' },
  { id: 'pixar', name: 'Pixar', logoText: 'PIXAR', gradient: 'from-cyan-600/40 via-blue-900/20 to-transparent', bgImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' },
  { id: 'marvel', name: 'Marvel', logoText: 'MARVEL', gradient: 'from-red-600/40 via-red-950/20 to-transparent', bgImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80' },
  { id: 'starwars', name: 'Star Wars', logoText: 'STAR WARS', gradient: 'from-yellow-600/40 via-amber-950/20 to-transparent', bgImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80' },
  { id: 'natgeo', name: 'National Geographic', logoText: 'NAT GEO', gradient: 'from-amber-500/40 via-yellow-950/20 to-transparent', bgImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' },
  { id: 'star', name: 'Star', logoText: 'STAR', gradient: 'from-purple-600/40 via-indigo-950/20 to-transparent', bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' }
];

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'The Mandalorian',
    type: 'series',
    brand: 'starwars',
    genre: 'Acción / Ciencia Ficción',
    year: '2023',
    rating: '12+',
    duration: '3 Temporadas',
    description: 'Los viajes de un cazarrecompensas solitario en los confines de la galaxia, lejos de la autoridad de la Nueva República.',
    bannerUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=500&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=aOC8E8z_ifw',
    featured: true,
    trending: true
  },
  {
    id: 'v2',
    title: 'Loki - Temporada 2',
    type: 'series',
    brand: 'marvel',
    genre: 'Fantasía / Aventura',
    year: '2023',
    rating: '12+',
    duration: '2 Temporadas',
    description: 'El voluble villano Loki reanuda su papel como el Dios del Engaño en una emocionante aventura que desafía las líneas temporales del multiverso.',
    bannerUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=nTrB1Bw6yMo',
    featured: true,
    trending: true
  },
  {
    id: 'v3',
    title: 'Avatar: El Camino del Agua',
    type: 'movie',
    brand: 'disney',
    genre: 'Ciencia Ficción / Aventura',
    year: '2022',
    rating: '12+',
    duration: '3h 12m',
    description: 'Jake Sully vive con su nueva familia formada en el planeta Pandora. Una amenaza conocida regresa para acabar con lo que se había empezado.',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=d9MyW72ELq0',
    featured: true,
    trending: false
  },
  {
    id: 'v4',
    title: 'Sin Límites con Chris Hemsworth',
    type: 'series',
    brand: 'natgeo',
    genre: 'Documental / Superación',
    year: '2022',
    rating: 'PG',
    duration: '1 Temporada',
    description: 'Chris Hemsworth pone a prueba el potencial del cuerpo humano para vivir mejor durante más tiempo a través de hazañas extremas.',
    bannerUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=s83-z0yI5jY',
    featured: false,
    trending: true
  },
  {
    id: 'v5',
    title: 'Elementos (Elemental)',
    type: 'movie',
    brand: 'pixar',
    genre: 'Animación / Aventura',
    year: '2023',
    rating: 'ATP',
    duration: '1h 41m',
    description: 'En una ciudad donde los residentes de fuego, agua, tierra y aire viven juntos, una joven fogosa y un chico que se deja llevar descubren cuánto tienen en común.',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=hXzcyx9V0xw',
    featured: true,
    trending: true
  },
  {
    id: 'v6',
    title: 'Ahsoka',
    type: 'series',
    brand: 'starwars',
    genre: 'Acción / Fantasía Espacial',
    year: '2023',
    rating: '12+',
    duration: '1 Temporada',
    description: 'Ambientada tras la caída del Imperio, Ahsoka investiga una amenaza emergente para una galaxia vulnerable junto a sus antiguos aliados.',
    bannerUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=J_1EXWNETiI',
    featured: false,
    trending: true
  }
];

const DEFAULT_PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Estándar con Anuncios',
    price: '$5.99',
    period: 'mes',
    features: ['Calidad 1080p Full HD', '2 Dispositivos simultáneos', 'Con pausas comerciales', 'Audio 5.1'],
    popular: false,
    buttonText: 'Elegir Estándar con Anuncios'
  },
  {
    id: 'standard',
    name: 'Estándar',
    price: '$9.99',
    period: 'mes',
    features: ['Calidad 1080p Full HD', '2 Dispositivos simultáneos', 'Sin anuncios', 'Descargas en hasta 10 dispositivos'],
    popular: true,
    buttonText: 'Elegir Estándar'
  },
  {
    id: 'premium',
    name: 'Premium 4K UHD',
    price: '$13.99',
    period: 'mes',
    features: ['Calidad 4K UHD & HDR', '4 Dispositivos simultáneos', 'Audio Dolby Atmos', 'Sin anuncios', 'Descargas ilimitadas'],
    popular: false,
    buttonText: 'Elegir Premium 4K'
  }
];

const DEFAULT_USERS: AppUser[] = [
  { id: 'u1', name: 'Alex Disney', email: 'user@disney.com', role: 'user', tier: 'Premium 4K UHD', status: 'Activo' },
  { id: 'u2', name: 'Admin Principal', email: 'admin@disney.com', role: 'admin', tier: 'Premium 4K UHD', status: 'Activo' }
];

const PROFILES: Profile[] = [
  { id: 'p1', name: 'Alex', avatar: '🦸‍♂️', isKids: false },
  { id: 'p2', name: 'Mickey', avatar: '🐭', isKids: true },
  { id: 'p3', name: 'Star', avatar: '⭐', isKids: false }
];

/**
 * Robust YouTube video parsing:
 * Parses full <iframe> snippets, standard URLs, youtu.be, shorts, embeds, live streams, and bare IDs.
 */
function parseYouTubeSource(input: string): {
  videoId: string | null;
  embedUrl: string | null;
  directUrl: string | null;
  startTime: number | null;
  isDirectVideo?: boolean;
  videoSourceUrl?: string | null;
} {
  if (!input) {
    return { videoId: null, embedUrl: null, directUrl: null, startTime: null, isDirectVideo: false, videoSourceUrl: null };
  }

  const trimmed = input.trim();
  let stringToAnalyze = trimmed;

  if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      stringToAnalyze = srcMatch[1];
    }
  }

  // Check if it's a direct HTML5 video (mp4, webm, m4v, ogg, blob)
  const isDirect = /\.(mp4|webm|m4v|ogg|mov)(\?.*)?$/i.test(stringToAnalyze) || stringToAnalyze.startsWith('blob:') || stringToAnalyze.startsWith('data:video');
  if (isDirect) {
    return {
      videoId: null,
      embedUrl: stringToAnalyze,
      directUrl: stringToAnalyze,
      startTime: null,
      isDirectVideo: true,
      videoSourceUrl: stringToAnalyze
    };
  }

  // Extract start time if present (&t=120 or ?start=120 or &t=2m30s)
  let startTime: number | null = null;
  const timeMatch = stringToAnalyze.match(/[?&](?:t|start)=([0-9a-zA-Z]+)/);
  if (timeMatch && timeMatch[1]) {
    const rawTime = timeMatch[1];
    if (/^\d+$/.test(rawTime)) {
      startTime = parseInt(rawTime, 10);
    } else {
      let seconds = 0;
      const m = rawTime.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
      if (m) {
        if (m[1]) seconds += parseInt(m[1], 10) * 3600;
        if (m[2]) seconds += parseInt(m[2], 10) * 60;
        if (m[3]) seconds += parseInt(m[3], 10);
        if (seconds > 0) startTime = seconds;
      }
    }
  }

  let videoId: string | null = null;

  // Check if it's already an 11-char video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(stringToAnalyze)) {
    videoId = stringToAnalyze;
  } else {
    // Regular expression covering youtube.com (watch, v, embed, shorts, live) & youtu.be
    const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/i;
    const match = stringToAnalyze.match(ytRegex);
    if (match && match[1]) {
      videoId = match[1];
    } else {
      // Fallback: search for any 11-char token that resembles a youtube ID
      const anyYtMatch = stringToAnalyze.match(/([a-zA-Z0-9_-]{11})/);
      if (anyYtMatch && anyYtMatch[1]) {
        videoId = anyYtMatch[1];
      }
    }
  }

  if (videoId) {
    const startParam = startTime ? `&start=${startTime}` : '';
    return {
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1${startParam}`,
      directUrl: `https://www.youtube.com/watch?v=${videoId}${startTime ? `&t=${startTime}s` : ''}`,
      startTime,
      isDirectVideo: false,
      videoSourceUrl: null
    };
  }

  return { videoId: null, embedUrl: null, directUrl: null, startTime: null, isDirectVideo: false, videoSourceUrl: null };
}

const DEFAULT_FALLBACK_POSTER = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80';
const DEFAULT_FALLBACK_BANNER = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80';
const DEFAULT_BRAND_BG = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80';

function getVideoPoster(v?: Partial<VideoItem> | null): string {
  if (v?.posterUrl && v.posterUrl.trim().length > 0) return v.posterUrl.trim();
  if (v?.bannerUrl && v.bannerUrl.trim().length > 0) return v.bannerUrl.trim();
  return DEFAULT_FALLBACK_POSTER;
}

function getVideoBanner(v?: Partial<VideoItem> | null): string {
  if (v?.bannerUrl && v.bannerUrl.trim().length > 0) return v.bannerUrl.trim();
  if (v?.posterUrl && v.posterUrl.trim().length > 0) return v.posterUrl.trim();
  return DEFAULT_FALLBACK_BANNER;
}

function getBrandBg(b?: Partial<Brand> | null): string {
  if (b?.bgImage && b.bgImage.trim().length > 0) return b.bgImage.trim();
  return DEFAULT_BRAND_BG;
}

function safeSetStorage(key: string, value: any): boolean {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (err: any) {
    console.warn(`[Storage] Failed to save key "${key}":`, err);
    if (err && (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014 || err.number === -2147024882)) {
      try {
        if (key === 'dplus_videos' && Array.isArray(value)) {
          // Prune large base64 data URLs to prevent quota crash
          const sanitized = value.map((v: VideoItem) => ({
            ...v,
            posterUrl: v.posterUrl?.startsWith('data:') && v.posterUrl.length > 20000 
              ? DEFAULT_FALLBACK_POSTER 
              : v.posterUrl,
            bannerUrl: v.bannerUrl?.startsWith('data:') && v.bannerUrl.length > 20000 
              ? DEFAULT_FALLBACK_BANNER 
              : v.bannerUrl,
          }));
          localStorage.setItem(key, JSON.stringify(sanitized));
          return true;
        }
      } catch (innerErr) {
        console.error('[Storage] Even sanitized fallback failed:', innerErr);
      }
    }
    return false;
  }
}

function compressImageFile(file: File, maxWidth = 800, maxHeight = 800, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageInputWithUpload({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedUrl = await compressImageFile(file);
        onChange(compressedUrl);
      } catch (err) {
        console.error('Error compressing image:', err);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            onChange(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const clearImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-gray-400 font-bold">{label}</label>
        {value && (
          <button
            type="button"
            onClick={clearImage}
            className="text-[10px] text-red-400 hover:text-red-300 flex items-center space-x-1 font-bold transition px-1.5 py-0.5 rounded hover:bg-red-950/40"
            title="Borrar imagen seleccionada"
          >
            <Trash2 size={11} />
            <span>Borrar imagen</span>
          </button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="https://... o sube una imagen"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 pr-8 text-white text-xs focus:border-blue-500 focus:outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              title="Borrar texto"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1 flex-shrink-0 transition"
          title="Subir archivo desde la computadora"
        >
          <Upload size={14} />
          <span className="hidden sm:inline">Subir</span>
        </button>

        {value && (
          <button
            type="button"
            onClick={clearImage}
            className="p-2.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 rounded-lg border border-red-800/40 transition flex-shrink-0"
            title="Borrar imagen"
          >
            <Trash2 size={14} />
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {value && value.trim() ? (
        <div className="flex items-center space-x-2 pt-1 bg-gray-950/50 p-1.5 rounded-lg border border-gray-800/80">
          <img src={value.trim()} alt="Preview" className="w-9 h-9 object-cover rounded border border-gray-700 flex-shrink-0" />
          <span className="text-[10px] text-gray-400 truncate max-w-xs">{value.startsWith('data:') ? 'Imagen cargada en memoria' : value}</span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Enhanced Cinema Disney Player Compatible with YouTube:
/**
 * Authentic Disney+ Video Player:
 * - Signature Disney+ HUD (Heads-Up Display) overlay
 * - YouTube IFrame API integration with custom controls (play/pause, 10s rewind/forward, scrub bar, volume, speed)
 * - Auto-hide HUD on inactivity with cinema backlight glow
 * - Disney+ 2-column Audio & Subtitles dialog
 * - Next Up / Siguiente Episodio card & countdown
 * - Fullscreen, theater mode, keyboard shortcuts (Space, Arrow keys, F, Esc, M)
 */

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function DisneySeek10Icon({ direction }: { direction: 'backward' | 'forward' }) {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 group cursor-pointer">
      {direction === 'backward' ? (
        <RotateCcw className="w-10 h-10 text-white/90 group-hover:text-white group-hover:scale-110 transition duration-200" />
      ) : (
        <RotateCw className="w-10 h-10 text-white/90 group-hover:text-white group-hover:scale-110 transition duration-200" />
      )}
      <span className="absolute text-[11px] font-black text-white select-none pointer-events-none -mt-0.5">10</span>
    </div>
  );
}

function formatDisneyTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const totalSecs = Math.floor(seconds);
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  if (hrs > 0) {
    return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function getBrandBadge(brandId: string) {
  switch (brandId) {
    case 'marvel':
      return <span className="bg-red-600 text-white font-black text-[10px] px-2.5 py-0.5 tracking-widest rounded shadow uppercase">MARVEL STUDIOS</span>;
    case 'starwars':
      return <span className="border border-amber-400 text-amber-300 bg-black/60 font-black text-[10px] px-2.5 py-0.5 tracking-widest rounded shadow uppercase">STAR WARS</span>;
    case 'pixar':
      return <span className="bg-gradient-to-r from-sky-400 to-cyan-500 text-black font-black text-[10px] px-2.5 py-0.5 tracking-widest rounded shadow uppercase">PIXAR</span>;
    case 'natgeo':
      return <span className="bg-yellow-400 text-black font-black text-[10px] px-2.5 py-0.5 tracking-widest rounded shadow uppercase">NATIONAL GEOGRAPHIC</span>;
    case 'star':
      return <span className="bg-purple-600 text-white font-black text-[10px] px-2.5 py-0.5 tracking-widest rounded shadow uppercase">STAR</span>;
    default:
      return <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[10px] px-2.5 py-0.5 tracking-widest rounded shadow uppercase">DISNEY+ ORIGINAL</span>;
  }
}

interface CustomDisneyPlayerProps {
  video: VideoItem;
  onClose: () => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
  nextVideo?: VideoItem;
  onSelectNextVideo?: (next: VideoItem) => void;
}

function CustomDisneyPlayer({
  video,
  onClose,
  isInWatchlist,
  onToggleWatchlist,
  nextVideo,
  onSelectNextVideo
}: CustomDisneyPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const directVideoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = useRef<any>(null);

  // Aspect ratio mode: '16/9' (Standard / Original - default, no distortion or cropping), '21/9' (Cinema), '4/3' (Classic), 'fill'
  const [aspectRatioMode, setAspectRatioMode] = useState<'16/9' | '21/9' | '4/3' | 'fill'>('16/9');

  // Playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedFraction, setBufferedFraction] = useState(0);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showRemainingTime, setShowRemainingTime] = useState(false);
  const [hasEmbedError, setHasEmbedError] = useState(false);

  // HUD & Modals state
  const [showControls, setShowControls] = useState(true);
  const [showSubtitlesModal, setShowSubtitlesModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNextUpCard, setShowNextUpCard] = useState(false);
  const [nextCountdown, setNextCountdown] = useState(10);
  const [seekFlash, setSeekFlash] = useState<string | null>(null);

  // Scrubbing hover state
  const [isHoveringScrubber, setIsHoveringScrubber] = useState(false);
  const [scrubberHoverTime, setScrubberHoverTime] = useState(0);
  const [scrubberHoverPos, setScrubberHoverPos] = useState(0);

  // Subtitle & Audio selection state
  const [selectedAudio, setSelectedAudio] = useState('es-latam');
  const [selectedSubtitle, setSelectedSubtitle] = useState('es-latam');

  const parsed = useMemo(() => {
    return parseYouTubeSource(video.youtubeUrl || '');
  }, [video.youtubeUrl]);

  const AUDIO_TRACKS = [
    { id: 'es-latam', label: 'Español (Latinoamérica)', tag: 'Original' },
    { id: 'en-orig', label: 'English', tag: 'Original' },
    { id: 'es-es', label: 'Español (España)', tag: 'Doblaje' },
    { id: 'pt-br', label: 'Português (Brasil)', tag: '' },
    { id: 'fr-fr', label: 'Français', tag: '' }
  ];

  const SUBTITLE_TRACKS = [
    { id: 'off', label: 'Desactivados' },
    { id: 'es-latam', label: 'Español (Latinoamérica)' },
    { id: 'en-cc', label: 'English [CC]' },
    { id: 'es-es', label: 'Español (España)' },
    { id: 'pt-br', label: 'Português (Brasil)' },
    { id: 'fr-fr', label: 'Français' }
  ];

  const triggerSeekFlash = (text: string) => {
    setSeekFlash(text);
    setTimeout(() => setSeekFlash(null), 800);
  };

  const resetControlsTimer = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    if (isPlaying && !showSubtitlesModal && !showSettingsModal) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, [isPlaying, showSubtitlesModal, showSettingsModal]);

  // Send command to YouTube iframe safely
  const sendCommand = (func: string, ...args: any[]) => {
    if (playerRef.current && typeof playerRef.current[func] === 'function') {
      try {
        playerRef.current[func](...args);
        return;
      } catch {}
    }
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  // Listen to postMessage from YouTube iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
          }
          if (typeof data.info.duration === 'number' && data.info.duration > 0) {
            setDuration(data.info.duration);
          }
          if (typeof data.info.playerState === 'number') {
            if (data.info.playerState === 1) {
              setIsPlaying(true);
              setIsBuffering(false);
            } else if (data.info.playerState === 2) {
              setIsPlaying(false);
              setIsBuffering(false);
            } else if (data.info.playerState === 3) {
              setIsBuffering(true);
            } else if (data.info.playerState === 0) {
              setIsPlaying(false);
              setShowNextUpCard(true);
            }
          }
          if (typeof data.info.videoLoadedFraction === 'number') {
            setBufferedFraction(data.info.videoLoadedFraction);
          }
        }
      } catch {}
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Poll for time and duration updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
      }
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const cur = playerRef.current.getCurrentTime();
          if (typeof cur === 'number') setCurrentTime(cur);
          const dur = playerRef.current.getDuration();
          if (typeof dur === 'number' && dur > 0) setDuration(dur);
          const buf = playerRef.current.getVideoLoadedFraction();
          if (typeof buf === 'number') setBufferedFraction(buf);
        } catch {}
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  // Initialize YouTube API if available to attach to existing iframe
  useEffect(() => {
    if (!parsed.videoId) return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const initYT = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        try {
          playerRef.current = new window.YT.Player(iframeRef.current, {
            events: {
              onReady: (e: any) => {
                const dur = e.target.getDuration();
                if (dur > 0) setDuration(dur);
                e.target.setVolume(volume);
                if (isMuted) e.target.mute();
                e.target.setPlaybackRate(playbackSpeed);
                setIsBuffering(false);
              },
              onStateChange: (e: any) => {
                if (e.data === 1) {
                  setIsPlaying(true);
                  setIsBuffering(false);
                } else if (e.data === 2) {
                  setIsPlaying(false);
                  setIsBuffering(false);
                } else if (e.data === 3) {
                  setIsBuffering(true);
                } else if (e.data === 0) {
                  setIsPlaying(false);
                  setShowNextUpCard(true);
                }
              },
              onError: () => {
                setHasEmbedError(true);
              }
            }
          });
        } catch {}
      }
    };

    const timer = setTimeout(initYT, 500);
    return () => {
      clearTimeout(timer);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try { playerRef.current.destroy(); } catch {}
      }
    };
  }, [parsed.videoId]);

  // Controls actions
  const togglePlay = () => {
    resetControlsTimer();
    if (parsed.isDirectVideo && directVideoRef.current) {
      if (isPlaying) {
        directVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        directVideoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const handleSeekOffset = (seconds: number) => {
    resetControlsTimer();
    const newTime = Math.max(0, Math.min(duration || 99999, currentTime + seconds));
    setCurrentTime(newTime);
    if (parsed.isDirectVideo && directVideoRef.current) {
      directVideoRef.current.currentTime = newTime;
    } else {
      sendCommand('seekTo', newTime, true);
    }
    triggerSeekFlash(seconds > 0 ? '+10s' : '-10s');
  };

  const handleScrubberAction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pos * duration;
    setCurrentTime(targetTime);
    if (parsed.isDirectVideo && directVideoRef.current) {
      directVideoRef.current.currentTime = targetTime;
    } else {
      sendCommand('seekTo', targetTime, true);
    }
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setScrubberHoverPos(pos * 100);
    setScrubberHoverTime(pos * duration);
    setIsHoveringScrubber(true);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (parsed.isDirectVideo && directVideoRef.current) {
      directVideoRef.current.volume = newVol / 100;
      directVideoRef.current.muted = newVol === 0;
    }
    if (newVol === 0) {
      setIsMuted(true);
      sendCommand('mute');
    } else {
      if (isMuted) {
        setIsMuted(false);
        sendCommand('unMute');
      }
      sendCommand('setVolume', newVol);
    }
  };

  const toggleMute = () => {
    if (parsed.isDirectVideo && directVideoRef.current) {
      const willMute = !isMuted;
      setIsMuted(willMute);
      directVideoRef.current.muted = willMute;
      if (!willMute) directVideoRef.current.volume = (volume || 50) / 100;
      return;
    }
    if (isMuted) {
      setIsMuted(false);
      sendCommand('unMute');
      sendCommand('setVolume', volume || 50);
    } else {
      setIsMuted(true);
      sendCommand('mute');
    }
  };

  const handleSpeedSelect = (rate: number) => {
    setPlaybackSpeed(rate);
    if (parsed.isDirectVideo && directVideoRef.current) {
      directVideoRef.current.playbackRate = rate;
    } else {
      sendCommand('setPlaybackRate', rate);
    }
    setShowSettingsModal(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }

      resetControlsTimer();

      switch (e.key) {
        case 'Escape':
          if (showSubtitlesModal) setShowSubtitlesModal(false);
          else if (showSettingsModal) setShowSettingsModal(false);
          else onClose();
          break;
        case ' ':
        case 'k':
        case 'K':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
        case 'j':
        case 'J':
          e.preventDefault();
          handleSeekOffset(-10);
          break;
        case 'ArrowRight':
        case 'l':
        case 'L':
          e.preventDefault();
          handleSeekOffset(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange(Math.min(100, volume + 10));
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 10));
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, volume, isMuted, currentTime, duration, showSubtitlesModal, showSettingsModal]);

  // Next up countdown
  useEffect(() => {
    if (!showNextUpCard || !nextVideo) return;
    const interval = setInterval(() => {
      setNextCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onSelectNextVideo && nextVideo) {
            onSelectNextVideo(nextVideo);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showNextUpCard, nextVideo, onSelectNextVideo]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = bufferedFraction * 100;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimer}
      onClick={resetControlsTimer}
      className={`fixed inset-0 z-50 bg-[#07070b] select-none overflow-hidden flex items-center justify-center ${showControls ? 'cursor-default' : 'cursor-none'}`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[80vw] h-[60vh] bg-blue-600/10 rounded-full blur-[140px] transform scale-110" />
      </div>

      {/* Main Video Screen Container: Preserves original aspect ratio without distortion or cropping */}
      <div className="w-full h-full relative flex items-center justify-center bg-black overflow-hidden select-none">
        {parsed.videoId || (parsed.isDirectVideo && parsed.videoSourceUrl) ? (
          <div
            className="relative flex items-center justify-center transition-all duration-300"
            style={{
              width: '100%',
              height: '100%',
              maxWidth:
                aspectRatioMode === '21/9'
                  ? 'min(100vw, calc(100vh * (21 / 9)))'
                  : aspectRatioMode === '4/3'
                  ? 'min(100vw, calc(100vh * (4 / 3)))'
                  : aspectRatioMode === 'fill'
                  ? '100%'
                  : 'min(100vw, calc(100vh * (16 / 9)))',
              maxHeight:
                aspectRatioMode === '21/9'
                  ? 'min(100vh, calc(100vw * (9 / 21)))'
                  : aspectRatioMode === '4/3'
                  ? 'min(100vh, calc(100vw * (3 / 4)))'
                  : aspectRatioMode === 'fill'
                  ? '100%'
                  : 'min(100vh, calc(100vw * (9 / 16)))',
              aspectRatio:
                aspectRatioMode === 'fill'
                  ? 'unset'
                  : aspectRatioMode === '21/9'
                  ? '21 / 9'
                  : aspectRatioMode === '4/3'
                  ? '4 / 3'
                  : '16 / 9',
            }}
          >
            {parsed.isDirectVideo && parsed.videoSourceUrl ? (
              <video
                ref={directVideoRef}
                src={parsed.videoSourceUrl}
                className="w-full h-full object-contain absolute inset-0 select-none bg-black"
                autoPlay
                playsInline
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  setCurrentTime(v.currentTime);
                  if (v.duration && !isNaN(v.duration)) setDuration(v.duration);
                }}
                onProgress={(e) => {
                  const v = e.currentTarget;
                  if (v.buffered.length > 0 && v.duration > 0) {
                    setBufferedFraction(v.buffered.end(v.buffered.length - 1) / v.duration);
                  }
                }}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => { setIsBuffering(false); setIsPlaying(true); }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => { setIsPlaying(false); setShowNextUpCard(true); }}
              />
            ) : (
              <iframe
                id="disney-yt-iframe"
                ref={iframeRef}
                src={`https://www.youtube-nocookie.com/embed/${parsed.videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}${parsed.startTime ? `&start=${parsed.startTime}` : ''}`}
                title={video.title}
                className="w-full h-full absolute inset-0 border-0 pointer-events-none select-none bg-black"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}

            {/* Transparent click/double-click layer on top of video */}
            <div 
              onClick={togglePlay}
              onDoubleClick={toggleFullscreen}
              className="absolute inset-0 z-20 cursor-pointer bg-transparent"
            />
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-800 space-y-4 max-w-md z-20">
            <AlertCircle size={48} className="mx-auto text-amber-500" />
            <h3 className="text-lg font-bold text-white">Video no disponible</h3>
            <p className="text-xs text-gray-400">Pega un enlace o código embed de YouTube válido en el panel de administración.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
            >
              Regresar
            </button>
          </div>
        )}
      </div>

      {/* Transient Seek Indicator (-10s / +10s) */}
      {seekFlash && (
        <div className="absolute z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="px-6 py-3 rounded-full bg-black/80 border border-blue-500/40 text-blue-400 font-black text-xl tracking-wider backdrop-blur-md animate-ping flex items-center space-x-2">
            <span>{seekFlash}</span>
          </div>
        </div>
      )}

      {/* Buffering Spinner */}
      {isBuffering && (
        <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-cyan-400 animate-spin shadow-[0_0_20px_rgba(56,189,248,0.5)]" />
        </div>
      )}

      {/* YouTube Embed Restriction Notice */}
      {hasEmbedError && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 bg-red-950/90 border border-red-500/40 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center space-x-4 max-w-lg">
          <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-white">Restricción de inserción en YouTube</p>
            <p className="text-gray-300">El canal creador restringió la reproducción fuera de YouTube.</p>
          </div>
          {parsed.directUrl && (
            <a
              href={parsed.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1 whitespace-nowrap"
            >
              <span>Ver en YouTube</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* DISNEY+ HEADS-UP DISPLAY (HUD) OVERLAY */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 z-30 flex flex-col justify-between pointer-events-none transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Top Gradient Shadow & Header Bar */}
        <div className="bg-gradient-to-b from-black/95 via-black/60 to-transparent pt-4 pb-12 px-6 lg:px-12 flex items-center justify-between pointer-events-auto">
          {/* Left Title & Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition transform hover:scale-105 flex items-center space-x-2 border border-white/10"
              title="Volver (Esc)"
            >
              <ChevronLeft size={22} />
              <span className="text-xs font-black uppercase tracking-wider hidden sm:inline pr-1">VOLVER</span>
            </button>

            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                {getBrandBadge(video.brand)}
                <span className="text-gray-400 text-xs font-semibold">• {video.year}</span>
                <span className="px-1.5 py-0.2 bg-white/10 text-[10px] text-gray-300 rounded border border-white/10 font-bold">{video.rating || 'ATP'}</span>
              </div>
              <h1 className="text-lg md:text-2xl font-black text-white tracking-tight drop-shadow-md line-clamp-1">{video.title}</h1>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2.5">
            {/* Audio & Subtitles */}
            <button
              onClick={() => { setShowSubtitlesModal(true); setShowSettingsModal(false); }}
              className={`p-2.5 rounded-full transition flex items-center space-x-1.5 ${showSubtitlesModal ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
              title="Audio y Subtítulos"
            >
              <Subtitles size={18} />
              <span className="text-[11px] font-bold tracking-wider hidden md:inline uppercase pr-1">AUDIO Y SUBTÍTULOS</span>
            </button>

            {/* Quality & Speed Settings */}
            <button
              onClick={() => { setShowSettingsModal(!showSettingsModal); setShowSubtitlesModal(false); }}
              className={`p-2.5 rounded-full transition ${showSettingsModal ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
              title="Configuración de reproducción"
            >
              <Settings size={18} />
            </button>

            {/* Add to Watchlist */}
            <button
              onClick={() => onToggleWatchlist(video.id)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition"
              title={isInWatchlist ? 'En Mi Lista' : 'Añadir a Mi Lista'}
            >
              {isInWatchlist ? <Check size={18} className="text-green-400" /> : <Plus size={18} />}
            </button>

            {/* Direct YouTube link if user wants external viewing */}
            {parsed.directUrl && (
              <a
                href={parsed.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-600 text-white border border-white/10 transition"
                title="Abrir en YouTube"
              >
                <ExternalLink size={18} />
              </a>
            )}

            {/* Exit Player */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition"
              title="Cerrar reproductor"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Center Giant Disney+ Playback Controls */}
        <div className="flex items-center justify-center space-x-8 md:space-x-16 pointer-events-auto">
          {/* Rewind 10s */}
          <button
            onClick={() => handleSeekOffset(-10)}
            className="p-3 rounded-full hover:bg-white/10 transition transform active:scale-90"
            title="Rebobinar 10 segundos"
          >
            <DisneySeek10Icon direction="backward" />
          </button>

          {/* Giant Center Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/40 hover:bg-black/60 border-2 border-white/30 hover:border-cyan-400 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(2,102,232,0.4)] backdrop-blur-md group"
            title={isPlaying ? 'Pausa (Espacio)' : 'Reproducir (Espacio)'}
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white fill-white group-hover:scale-105 transition" />
            ) : (
              <Play className="w-10 h-10 text-white fill-white ml-1 group-hover:scale-105 transition" />
            )}
          </button>

          {/* Fast-Forward 10s */}
          <button
            onClick={() => handleSeekOffset(10)}
            className="p-3 rounded-full hover:bg-white/10 transition transform active:scale-90"
            title="Adelantar 10 segundos"
          >
            <DisneySeek10Icon direction="forward" />
          </button>
        </div>

        {/* Bottom Gradient Shadow & Controls Bar */}
        <div className="bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-12 pb-6 px-6 lg:px-12 space-y-4 pointer-events-auto">
          {/* Interactive Scrub Bar (Disney+ Blue glowing line) */}
          <div className="relative group/scrub py-2 cursor-pointer">
            {/* Tooltip on Hover */}
            {isHoveringScrubber && (
              <div 
                className="absolute -top-7 transform -translate-x-1/2 bg-gray-900 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-gray-700 shadow-xl pointer-events-none"
                style={{ left: `${scrubberHoverPos}%` }}
              >
                {formatDisneyTime(scrubberHoverTime)}
              </div>
            )}

            <div
              ref={progressBarRef}
              onClick={handleScrubberAction}
              onMouseMove={handleScrubberMouseMove}
              onMouseLeave={() => setIsHoveringScrubber(false)}
              className="relative w-full h-1.5 group-hover/scrub:h-2.5 bg-white/20 rounded-full transition-all duration-200"
            >
              {/* Buffer progress */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-white/30 rounded-full"
                style={{ width: `${bufferedPercent}%` }}
              />

              {/* Played progress (Disney+ cyan-blue gradient) */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Scrub Thumb Handle */}
              <div
                className="absolute top-1/2 w-4 h-4 bg-white rounded-full ring-4 ring-cyan-500/40 shadow-xl transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/scrub:opacity-100 transition-opacity"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-200">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              {/* Small Play/Pause */}
              <button
                onClick={togglePlay}
                className="p-1.5 hover:text-white transition"
                title={isPlaying ? 'Pausa' : 'Reproducir'}
              >
                {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
              </button>

              {/* Rewind / Forward Mini */}
              <button
                onClick={() => handleSeekOffset(-10)}
                className="p-1 hover:text-white transition"
                title="10s Atrás"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => handleSeekOffset(10)}
                className="p-1 hover:text-white transition"
                title="10s Adelante"
              >
                <RotateCw size={18} />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center space-x-2 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-white transition"
                  title={isMuted ? 'Activar sonido (M)' : 'Silenciar (M)'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                  className="w-16 md:w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Timestamp */}
              <div 
                onClick={() => setShowRemainingTime(!showRemainingTime)}
                className="cursor-pointer font-mono text-gray-300 hover:text-white transition select-none tracking-tight text-xs flex items-center space-x-1"
                title="Click para alternar tiempo restante"
              >
                <span>{formatDisneyTime(currentTime)}</span>
                <span className="text-gray-500">/</span>
                <span>
                  {showRemainingTime && duration > 0 ? `-${formatDisneyTime(Math.max(0, duration - currentTime))}` : formatDisneyTime(duration)}
                </span>
              </div>
            </div>

            {/* Center Information */}
            <div className="hidden lg:flex items-center space-x-2 text-gray-400">
              <span className="text-white font-bold">{video.title}</span>
              <span>•</span>
              <span className="text-blue-400 uppercase tracking-widest text-[10px]">{video.genre}</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              {/* Restart from beginning */}
              <button
                onClick={() => {
                  setCurrentTime(0);
                  sendCommand('seekTo', 0, true);
                  sendCommand('playVideo');
                  setIsPlaying(true);
                }}
                className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white"
                title="Ver desde el principio"
              >
                <RotateCcw size={14} />
                <span className="text-[11px] uppercase tracking-wider font-bold">Reiniciar</span>
              </button>

              {/* Next Video */}
              {nextVideo && onSelectNextVideo && (
                <button
                  onClick={() => onSelectNextVideo(nextVideo)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
                  title={`Siguiente: ${nextVideo.title}`}
                >
                  <span className="text-[11px] uppercase tracking-wider font-bold">Siguiente</span>
                  <ChevronRight size={14} />
                </button>
              )}

              {/* Aspect Ratio Toggle Button */}
              <button
                onClick={() => {
                  const modes: ('16/9' | '21/9' | '4/3' | 'fill')[] = ['16/9', '21/9', '4/3', 'fill'];
                  const curIdx = modes.indexOf(aspectRatioMode);
                  const next = modes[(curIdx + 1) % modes.length];
                  setAspectRatioMode(next);
                  triggerSeekFlash(`Aspecto: ${next === '16/9' ? '16:9 Original' : next === '21/9' ? '21:9 Cine' : next === '4/3' ? '4:3 Clásico' : 'Rellenar'}`);
                }}
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition border border-white/10"
                title={`Relación de aspecto: ${aspectRatioMode}. Haz clic para cambiar.`}
              >
                <MonitorPlay size={14} className="text-cyan-400" />
                <span className="text-[10px] font-mono font-bold">{aspectRatioMode === '16/9' ? '16:9 (Original)' : aspectRatioMode === '21/9' ? '21:9' : aspectRatioMode === '4/3' ? '4:3' : 'FILL'}</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 hover:text-white transition"
                title="Pantalla Completa (F)"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DISNEY+ AUDIO & SUBTITLES MODAL */}
      {/* ========================================================================= */}
      {showSubtitlesModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12141f]/95 border border-white/15 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-base font-extrabold uppercase tracking-widest text-white flex items-center space-x-2">
                <Subtitles size={18} className="text-cyan-400" />
                <span>Audio y Subtítulos</span>
              </h2>
              <button
                onClick={() => setShowSubtitlesModal(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              {/* Audio Column */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[11px]">AUDIO</h3>
                <div className="space-y-1.5">
                  {AUDIO_TRACKS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedAudio(t.id)}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${selectedAudio === t.id ? 'bg-blue-600/30 border border-blue-500/50 text-white font-bold' : 'hover:bg-white/5 text-gray-300'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{t.label}</span>
                        {t.tag && <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">{t.tag}</span>}
                      </div>
                      {selectedAudio === t.id && <Check size={16} className="text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtitles Column */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[11px]">SUBTÍTULOS</h3>
                <div className="space-y-1.5">
                  {SUBTITLE_TRACKS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedSubtitle(t.id)}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${selectedSubtitle === t.id ? 'bg-blue-600/30 border border-blue-500/50 text-white font-bold' : 'hover:bg-white/5 text-gray-300'}`}
                    >
                      <span>{t.label}</span>
                      {selectedSubtitle === t.id && <Check size={16} className="text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSubtitlesModal(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition"
              >
                Aplicar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PLAYBACK SETTINGS MODAL (Speed & Quality) */}
      {/* ========================================================================= */}
      {showSettingsModal && (
        <div className="absolute top-20 right-6 z-50 bg-[#12141f]/95 border border-white/15 rounded-2xl p-5 w-80 shadow-2xl backdrop-blur-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Ajustes de Video</span>
            <button onClick={() => setShowSettingsModal(false)} className="text-gray-400 hover:text-white">
              <X size={16} />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="space-y-2">
            <span className="text-gray-400 font-semibold block">Velocidad de Reproducción:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[0.75, 1, 1.25, 1.5].map(rate => (
                <button
                  key={rate}
                  onClick={() => handleSpeedSelect(rate)}
                  className={`py-1.5 rounded-lg font-bold text-center transition ${playbackSpeed === rate ? 'bg-cyan-500 text-black shadow' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                >
                  {rate === 1 ? '1x' : `${rate}x`}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Tag */}
          <div className="space-y-1 pt-2 border-t border-gray-800">
            <span className="text-gray-400 font-semibold block">Calidad de Imagen:</span>
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Automática (Máxima)</p>
                <p className="text-[10px] text-gray-400">4K Ultra HD • HDR10 • Dolby Vision</p>
              </div>
              <Sparkles size={16} className="text-cyan-400" />
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-semibold block">Relación de Aspecto:</span>
              <span className="text-[10px] text-cyan-400 font-bold">{aspectRatioMode === '16/9' ? 'Original (16:9)' : aspectRatioMode === '21/9' ? 'Cine (21:9)' : aspectRatioMode === '4/3' ? 'Clásico (4:3)' : 'Rellenar'}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: '16/9', label: '16:9 (Original)', desc: 'Sin recorte ni distorsión' },
                { id: '21/9', label: '21:9 (Cine)', desc: 'Ultra panorámico' },
                { id: '4/3', label: '4:3 (Clásico)', desc: 'Formato clásico' },
                { id: 'fill', label: 'Rellenar Pantalla', desc: 'Ajuste forzado' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setAspectRatioMode(item.id as any);
                    triggerSeekFlash(`Aspecto: ${item.label}`);
                  }}
                  className={`p-2 rounded-xl text-left transition border ${aspectRatioMode === item.id ? 'bg-cyan-500/20 border-cyan-400 text-white shadow' : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'}`}
                >
                  <p className="font-bold text-xs">{item.label}</p>
                  <p className="text-[9px] text-gray-400">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DISNEY+ "SIGUIENTE VIDEO / NEXT UP" CARD */}
      {/* ========================================================================= */}
      {showNextUpCard && nextVideo && (
        <div className="absolute bottom-24 right-8 z-40 bg-[#12141f]/95 border border-cyan-500/40 rounded-2xl p-4 max-w-sm w-full shadow-2xl backdrop-blur-xl animate-bounce-short space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center space-x-1">
              <Sparkles size={12} />
              <span>A CONTINUACIÓN EN {nextCountdown}s</span>
            </span>
            <button onClick={() => setShowNextUpCard(false)} className="text-gray-400 hover:text-white">
              <X size={14} />
            </button>
          </div>

          <div className="flex space-x-3 items-center">
            <img src={getVideoPoster(nextVideo)} alt={nextVideo.title} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
            <div className="space-y-1 overflow-hidden">
              <span className="text-[9px] uppercase font-bold text-blue-400">{nextVideo.brand}</span>
              <h4 className="text-xs font-black text-white line-clamp-1">{nextVideo.title}</h4>
              <p className="text-[10px] text-gray-400 line-clamp-2">{nextVideo.description}</p>
            </div>
          </div>

          <div className="flex space-x-2 pt-1">
            <button
              onClick={() => {
                if (onSelectNextVideo) onSelectNextVideo(nextVideo);
                setShowNextUpCard(false);
              }}
              className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1 shadow-lg"
            >
              <Play size={12} fill="white" />
              <span>Reproducir Ahora</span>
            </button>
            <button
              onClick={() => setShowNextUpCard(false)}
              className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-bold"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [branding, setBranding] = useState<Branding>(() => {
    try {
      const saved = localStorage.getItem('dplus_branding');
      return saved ? JSON.parse(saved) : DEFAULT_BRANDING;
    } catch {
      return DEFAULT_BRANDING;
    }
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    try {
      const saved = localStorage.getItem('dplus_brands');
      return saved ? JSON.parse(saved) : DEFAULT_BRANDS;
    } catch {
      return DEFAULT_BRANDS;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('dplus_videos');
      if (saved) {
        const list = JSON.parse(saved);
        if (Array.isArray(list) && list.length > 0) {
          return list.map((v: any) => {
            const parsed = parseYouTubeSource(v.youtubeUrl || '');
            const cleanPoster = typeof v.posterUrl === 'string' && v.posterUrl.startsWith('data:') && v.posterUrl.length > 30000 
              ? DEFAULT_FALLBACK_POSTER 
              : (v.posterUrl || '');
            const cleanBanner = typeof v.bannerUrl === 'string' && v.bannerUrl.startsWith('data:') && v.bannerUrl.length > 30000 
              ? DEFAULT_FALLBACK_BANNER 
              : (v.bannerUrl || '');
            return {
              ...v,
              posterUrl: cleanPoster,
              bannerUrl: cleanBanner,
              youtubeUrl: parsed.videoId ? `https://www.youtube.com/watch?v=${parsed.videoId}` : (v.youtubeUrl || '')
            };
          });
        }
      }
      return DEFAULT_VIDEOS;
    } catch {
      return DEFAULT_VIDEOS;
    }
  });

  const [plans, setPlans] = useState<Plan[]>(() => {
    try {
      const saved = localStorage.getItem('dplus_plans');
      return saved ? JSON.parse(saved) : DEFAULT_PLANS;
    } catch {
      return DEFAULT_PLANS;
    }
  });

  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem('dplus_users');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentTab, setCurrentTab] = useState<'home' | 'movies' | 'series' | 'watchlist' | 'search' | 'subscription' | 'admin'>('home');
  const [currentProfile, setCurrentProfile] = useState<Profile>(PROFILES[0]);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dplus_watchlist');
      return saved ? JSON.parse(saved) : ['v1', 'v3'];
    } catch {
      return ['v1', 'v3'];
    }
  });

  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<{
    email: string;
    role: 'guest' | 'user' | 'admin';
    loggedIn: boolean;
  }>({
    email: '',
    role: 'guest',
    loggedIn: false
  });

  const [adminLoginModal, setAdminLoginModal] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const [adminError, setAdminError] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState<'videos' | 'brands' | 'branding' | 'plans' | 'users'>('videos');

  const [editingVideo, setEditingVideo] = useState<Partial<VideoItem> | null>(null);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Persist storage safely without crashing on quota exceeded
  useEffect(() => { safeSetStorage('dplus_branding', branding); }, [branding]);
  useEffect(() => { safeSetStorage('dplus_brands', brands); }, [brands]);
  useEffect(() => { safeSetStorage('dplus_videos', videos); }, [videos]);
  useEffect(() => { safeSetStorage('dplus_plans', plans); }, [plans]);
  useEffect(() => { safeSetStorage('dplus_users', users); }, [users]);
  useEffect(() => { safeSetStorage('dplus_watchlist', watchlist); }, [watchlist]);

  const featuredVideos = useMemo(() => videos.filter(v => v.featured), [videos]);

  // Carousel auto-rotate
  useEffect(() => {
    if (featuredVideos.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % featuredVideos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredVideos.length]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCredentials.email === 'admin@disney.com' && adminCredentials.password === 'admin123') {
      setCurrentUser({
        email: 'admin@disney.com',
        role: 'admin',
        loggedIn: true
      });
      setAdminLoginModal(false);
      setCurrentTab('admin');
      showToast('¡Bienvenido al Panel de Administración!');
    } else {
      setAdminError('Credenciales incorrectas. (Prueba: admin@disney.com / admin123)');
    }
  };

  const handleLogout = () => {
    setCurrentUser({ email: '', role: 'guest', loggedIn: false });
    if (currentTab === 'admin') setCurrentTab('home');
    showToast('Sesión cerrada correctamente');
  };

  const toggleWatchlist = (videoId: string) => {
    if (watchlist.includes(videoId)) {
      setWatchlist(watchlist.filter(id => id !== videoId));
      showToast('Eliminado de Mi Lista');
    } else {
      setWatchlist([...watchlist, videoId]);
      showToast('Añadido a Mi Lista');
    }
  };

  const handleSaveVideo = (videoData: Partial<VideoItem>) => {
    if (!videoData.title || !videoData.title.trim()) {
      showToast('⚠️ Por favor especifica un título para el video');
      return;
    }

    if (videoData.id) {
      setVideos(videos.map(v => v.id === videoData.id ? (videoData as VideoItem) : v));
      showToast('Video actualizado con éxito');
    } else {
      const newVideo: VideoItem = {
        id: 'v_' + Date.now(),
        title: videoData.title || 'Sin título',
        type: videoData.type || 'movie',
        brand: videoData.brand || 'disney',
        genre: videoData.genre || 'General',
        year: videoData.year || '2026',
        rating: videoData.rating || 'ATP',
        duration: videoData.duration || '1h 30m',
        description: videoData.description || '',
        bannerUrl: videoData.bannerUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        posterUrl: videoData.posterUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
        youtubeUrl: videoData.youtubeUrl || '',
        featured: videoData.featured || false,
        trending: videoData.trending || false
      };
      setVideos([newVideo, ...videos]);
      showToast('Nuevo contenido agregado');
    }
    setEditingVideo(null);
  };

  const handleDeleteVideo = (video: VideoItem) => {
    const id = video.id;
    const deletedTitle = video.title;
    setVideos(prev => {
      const updated = prev.filter(v => v.id !== id);
      safeSetStorage('dplus_videos', updated);
      return updated;
    });
    setWatchlist(prev => {
      const updated = prev.filter(wid => wid !== id);
      safeSetStorage('dplus_watchlist', updated);
      return updated;
    });
    if (activeVideoModal?.id === id) {
      setActiveVideoModal(null);
    }
    if (editingVideo?.id === id) {
      setEditingVideo(null);
    }
    showToast(`"${deletedTitle}" eliminado`);
  };

  const handleClearAllVideos = () => {
    setVideos([]);
    setWatchlist([]);
    safeSetStorage('dplus_videos', []);
    safeSetStorage('dplus_watchlist', []);
    if (activeVideoModal) setActiveVideoModal(null);
    if (editingVideo) setEditingVideo(null);
    showToast('Catálogo vaciado');
  };

  const handleResetDefaults = () => {
    try {
      localStorage.clear();
      safeSetStorage('dplus_branding', DEFAULT_BRANDING);
      safeSetStorage('dplus_brands', DEFAULT_BRANDS);
      safeSetStorage('dplus_videos', DEFAULT_VIDEOS);
      safeSetStorage('dplus_plans', DEFAULT_PLANS);
      safeSetStorage('dplus_users', DEFAULT_USERS);
      safeSetStorage('dplus_watchlist', ['v1', 'v3']);
    } catch (e) {
      console.error(e);
    }
    setBranding(DEFAULT_BRANDING);
    setBrands(DEFAULT_BRANDS);
    setVideos(DEFAULT_VIDEOS);
    setPlans(DEFAULT_PLANS);
    setUsers(DEFAULT_USERS);
    setWatchlist(['v1', 'v3']);
    if (activeVideoModal) setActiveVideoModal(null);
    if (editingVideo) setEditingVideo(null);
    showToast('Valores predeterminados restaurados');
  };

  // Preview helper in video editor modal
  const editPreviewParsed = useMemo(() => {
    if (!editingVideo?.youtubeUrl) return null;
    return parseYouTubeSource(editingVideo.youtubeUrl);
  }, [editingVideo?.youtubeUrl]);

  return (
    <div className="min-h-screen bg-[#0e0b14] text-gray-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-blue-400/30 animate-bounce">
          <Sparkles size={18} />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#0e0b14] via-[#0e0b14]/90 to-transparent backdrop-blur-md px-4 lg:px-12 py-3 flex items-center justify-between transition-all border-b border-white/5">
        <div className="flex items-center space-x-8">
          <div 
            onClick={() => { setCurrentTab('home'); setActiveCategoryFilter(null); }}
            className="cursor-pointer flex items-center space-x-1 font-extrabold text-2xl tracking-wider hover:opacity-90 transition transform hover:scale-105 select-none"
          >
            {branding.logoUrl && branding.logoUrl.trim().length > 0 ? (
              <img src={branding.logoUrl.trim()} alt={branding.siteName} className="h-8 object-contain" />
            ) : (
              <>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
                  {branding.siteName}
                </span>
                <span className="text-blue-500 text-3xl font-serif">{branding.siteSuffix}</span>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6 text-xs font-bold tracking-widest uppercase">
            <button 
              onClick={() => { setCurrentTab('home'); setActiveCategoryFilter(null); }}
              className={`flex items-center space-x-2 py-1 border-b-2 transition ${currentTab === 'home' && !activeCategoryFilter ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              <Home size={16} />
              <span>INICIO</span>
            </button>
            <button 
              onClick={() => setCurrentTab('search')}
              className={`flex items-center space-x-2 py-1 border-b-2 transition ${currentTab === 'search' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              <Search size={16} />
              <span>BÚSQUEDA</span>
            </button>
            <button 
              onClick={() => setCurrentTab('watchlist')}
              className={`flex items-center space-x-2 py-1 border-b-2 transition ${currentTab === 'watchlist' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              <Plus size={16} />
              <span>MI LISTA ({watchlist.length})</span>
            </button>
            <button 
              onClick={() => setCurrentTab('movies')}
              className={`flex items-center space-x-2 py-1 border-b-2 transition ${currentTab === 'movies' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              <Film size={16} />
              <span>PELÍCULAS</span>
            </button>
            <button 
              onClick={() => setCurrentTab('series')}
              className={`flex items-center space-x-2 py-1 border-b-2 transition ${currentTab === 'series' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              <Tv size={16} />
              <span>SERIES</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentTab('subscription')}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-[11px] font-extrabold uppercase tracking-wider shadow-md shadow-blue-900/30 transition transform hover:scale-105"
          >
            <Sparkles size={13} />
            <span>SUSCRIPCIÓN</span>
          </button>

          {/* User/Profile Dropdown */}
          <div className="relative group">
            <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full border border-gray-700 hover:border-blue-400 transition bg-gray-900/50">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-base font-bold shadow">
                {currentProfile.avatar}
              </span>
            </div>

            <div className="absolute right-0 top-full mt-2 w-56 bg-[#161926] border border-gray-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="px-3 py-2 border-b border-gray-800">
                <p className="text-xs font-extrabold text-white uppercase tracking-wider">{currentProfile.name}</p>
                <p className="text-[10px] text-blue-400">{currentUser.role === 'admin' ? 'Administrador' : 'Usuario Suscripto'}</p>
              </div>

              <div className="py-2 border-b border-gray-800">
                <p className="px-3 text-[10px] uppercase font-semibold text-gray-400 mb-1">Cambiar Perfil</p>
                {PROFILES.map(prof => (
                  <button
                    key={prof.id}
                    onClick={() => setCurrentProfile(prof)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center space-x-2 rounded transition ${currentProfile.id === prof.id ? 'bg-blue-600/30 text-white font-bold' : 'text-gray-300 hover:bg-gray-800'}`}
                  >
                    <span>{prof.avatar}</span>
                    <span>{prof.name}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  if (currentUser.role === 'admin') {
                    setCurrentTab('admin');
                  } else {
                    setAdminLoginModal(true);
                  }
                }} 
                className="w-full text-left px-3 py-2 text-xs font-bold text-amber-400 hover:bg-amber-400/10 rounded my-1 flex items-center space-x-2"
              >
                <Shield size={14} />
                <span>{currentUser.role === 'admin' ? 'Panel Administrador (CMS)' : 'Acceso Admin (CMS)'}</span>
              </button>

              {currentUser.loggedIn ? (
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded flex items-center space-x-2"
                >
                  <LogOut size={14} />
                  <span>Cerrar Sesión</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pt-16 pb-12">
        {currentTab === 'home' && (
          <div className="space-y-10">
            {/* Featured Hero Carousel */}
            {featuredVideos.length > 0 && (
              <div className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
                {featuredVideos.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <img 
                      src={getVideoBanner(item)} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b14] via-[#0e0b14]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0e0b14] via-[#0e0b14]/60 to-transparent w-full md:w-3/4" />

                    <div className="absolute bottom-12 left-6 lg:left-16 max-w-2xl space-y-4 z-20">
                      <div className="flex items-center space-x-3 text-xs font-bold text-blue-400 tracking-wider uppercase">
                        <span className="px-2 py-0.5 bg-blue-600/30 border border-blue-500/40 rounded">{item.rating || 'PG-13'}</span>
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                        <span>•</span>
                        <span className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-0.5 rounded font-extrabold">ORIGINAL {branding.siteName}{branding.siteSuffix}</span>
                      </div>

                      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">{item.title}</h1>
                      <p className="text-gray-300 text-xs md:text-sm line-clamp-3 leading-relaxed drop-shadow">{item.description}</p>

                      <div className="flex items-center space-x-4 pt-2">
                        <button 
                          onClick={() => setActiveVideoModal(item)}
                          className="px-6 py-3 bg-white hover:bg-gray-200 text-black rounded-xl font-black text-xs md:text-sm uppercase tracking-wider flex items-center space-x-2 transition transform hover:scale-105 shadow-xl shadow-white/10"
                        >
                          <Play size={18} fill="black" />
                          <span>REPRODUCIR</span>
                        </button>

                        <button 
                          onClick={() => toggleWatchlist(item.id)}
                          className="p-3 bg-gray-900/80 hover:bg-white/20 text-white border border-gray-700 rounded-xl backdrop-blur-md transition transform hover:scale-105 shadow-xl"
                          title={watchlist.includes(item.id) ? 'Quitar de Mi Lista' : 'Añadir a Mi Lista'}
                        >
                          {watchlist.includes(item.id) ? <Check size={20} className="text-green-400" /> : <Plus size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Carousel Indicators & Controls */}
                <div className="absolute bottom-6 right-8 z-30 flex items-center space-x-3">
                  <button 
                    onClick={() => setHeroIndex(prev => (prev - 1 + featuredVideos.length) % featuredVideos.length)}
                    className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white transition"
                    title="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex space-x-2">
                    {featuredVideos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeroIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === heroIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600/60 hover:bg-gray-400'}`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => setHeroIndex(prev => (prev + 1) % featuredVideos.length)}
                    className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white transition"
                    title="Siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Brand / Universe Hubs */}
            <div className="px-6 lg:px-16 space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-400">UNIVERSOS CREADOS</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {brands.map(brand => (
                  <div
                    key={brand.id}
                    onClick={() => setActiveCategoryFilter(activeCategoryFilter === brand.id ? null : brand.id)}
                    className={`relative h-24 rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/30 ${activeCategoryFilter === brand.id ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105' : 'border-gray-800 hover:border-gray-500'}`}
                  >
                    <img src={getBrandBg(brand)} alt={brand.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${brand.gradient}`} />
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                      <span className="font-black text-sm lg:text-base tracking-widest text-white drop-shadow-md uppercase">{brand.logoText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Lists */}
            <div className="px-6 lg:px-16 space-y-8">
              {activeCategoryFilter && (
                <div className="flex items-center justify-between bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl">
                  <span className="text-sm font-bold text-blue-300">
                    Filtrando por Universo: <strong className="uppercase text-white">{brands.find(b => b.id === activeCategoryFilter)?.name}</strong>
                  </span>
                  <button onClick={() => setActiveCategoryFilter(null)} className="text-xs text-gray-400 hover:text-white underline">
                    Limpiar Filtro
                  </button>
                </div>
              )}

              {/* Trending Row */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold tracking-wider text-gray-300 flex items-center space-x-2">
                  <TrendingUp size={16} className="text-blue-500" />
                  <span>TENDENCIAS EN {branding.siteName}{branding.siteSuffix}</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {videos
                    .filter(v => !activeCategoryFilter || v.brand === activeCategoryFilter)
                    .filter(v => v.trending)
                    .map(video => (
                      <div
                        key={video.id}
                        onClick={() => setActiveVideoModal(video)}
                        className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/40"
                      >
                        <div className="aspect-[2/3] w-full relative">
                          <img src={getVideoPoster(video)} alt={video.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">{video.brand}</span>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{video.title}</h4>
                            <p className="text-[10px] text-gray-400">{video.genre}</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="px-2 py-1 bg-white text-black text-[10px] font-black rounded flex items-center space-x-1">
                                <Play size={10} fill="black" />
                                <span>VER</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* All Catalog Row */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold tracking-wider text-gray-300 flex items-center space-x-2">
                  <Film size={16} className="text-blue-500" />
                  <span>TODO EL CATÁLOGO ({videos.filter(v => !activeCategoryFilter || v.brand === activeCategoryFilter).length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {videos
                    .filter(v => !activeCategoryFilter || v.brand === activeCategoryFilter)
                    .map(video => (
                      <div
                        key={video.id}
                        onClick={() => setActiveVideoModal(video)}
                        className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/40"
                      >
                        <div className="aspect-[2/3] w-full relative">
                          <img src={getVideoPoster(video)} alt={video.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">{video.brand}</span>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{video.title}</h4>
                            <p className="text-[10px] text-gray-400">{video.genre}</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="px-2 py-1 bg-white text-black text-[10px] font-black rounded flex items-center space-x-1">
                                <Play size={10} fill="black" />
                                <span>VER</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'movies' && (
          <div className="px-6 lg:px-16 pt-6 space-y-6">
            <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center space-x-3">
              <Film className="text-blue-500" />
              <span>PELÍCULAS ({videos.filter(v => v.type === 'movie').length})</span>
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {videos.filter(v => v.type === 'movie').map(video => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideoModal(video)}
                  className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-[2/3] w-full">
                    <img src={getVideoPoster(video)} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-extrabold text-blue-400 uppercase">{video.brand}</span>
                    <h3 className="text-xs font-bold text-white line-clamp-1">{video.title}</h3>
                    <p className="text-[10px] text-gray-400">{video.duration} • {video.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'series' && (
          <div className="px-6 lg:px-16 pt-6 space-y-6">
            <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center space-x-3">
              <Tv className="text-blue-500" />
              <span>SERIES ({videos.filter(v => v.type === 'series').length})</span>
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {videos.filter(v => v.type === 'series').map(video => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideoModal(video)}
                  className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-[2/3] w-full">
                    <img src={getVideoPoster(video)} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-extrabold text-blue-400 uppercase">{video.brand}</span>
                    <h3 className="text-xs font-bold text-white line-clamp-1">{video.title}</h3>
                    <p className="text-[10px] text-gray-400">{video.duration} • {video.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'watchlist' && (
          <div className="px-6 lg:px-16 pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center space-x-3">
                <Plus className="text-blue-500" />
                <span>MI LISTA ({watchlist.length})</span>
              </h1>
              {watchlist.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setWatchlist([]);
                    safeSetStorage('dplus_watchlist', []);
                    showToast('Se vació Mi Lista');
                  }}
                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                  title="Eliminar todos los elementos de Mi Lista"
                >
                  <Trash2 size={13} />
                  <span>Vaciar Mi Lista</span>
                </button>
              )}
            </div>
            {watchlist.length === 0 ? (
              <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-gray-800 space-y-3">
                <Plus size={48} className="mx-auto text-gray-600" />
                <p className="text-sm text-gray-400 font-medium">Tu lista está vacía. Guarda películas y series para verlas más tarde.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {videos.filter(v => watchlist.includes(v.id)).map(video => (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideoModal(video)}
                    className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="aspect-[2/3] w-full">
                      <img src={getVideoPoster(video)} alt={video.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div className="overflow-hidden pr-2">
                        <h3 className="text-xs font-bold text-white line-clamp-1">{video.title}</h3>
                        <p className="text-[10px] text-gray-400">{video.genre}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(video.id);
                        }}
                        className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white rounded-lg transition flex-shrink-0 border border-red-800/30"
                        title="Quitar de Mi Lista"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentTab === 'search' && (
          <div className="px-6 lg:px-16 pt-6 space-y-6 max-w-6xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Buscar por título, género o universo..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/90 border border-gray-700 rounded-2xl py-4 pl-14 pr-10 text-white text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-2xl"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {videos
                .filter(v => 
                  v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  v.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  v.brand.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(video => (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideoModal(video)}
                    className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-blue-500 transition transform hover:scale-105"
                  >
                    <div className="aspect-[2/3] w-full">
                      <img src={getVideoPoster(video)} alt={video.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-extrabold text-blue-400 uppercase">{video.brand}</span>
                      <h3 className="text-xs font-bold text-white line-clamp-1">{video.title}</h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {currentTab === 'subscription' && (
          <div className="px-6 lg:px-16 pt-10 max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-5xl font-black text-white">Elije el plan ideal para ti</h1>
              <p className="text-gray-400 text-sm max-w-lg mx-auto">Cancela en cualquier momento. Sin compromisos ni cargos ocultos.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`bg-gray-900/80 rounded-2xl p-6 border flex flex-col justify-between space-y-6 relative ${plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-900/40 bg-gradient-to-b from-blue-950/30 to-gray-900' : 'border-gray-800'}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white font-extrabold text-[10px] uppercase rounded-full tracking-widest shadow-md">
                      MÁS POPULAR
                    </span>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-gray-400 text-xs">/{plan.period}</span>
                    </div>
                    <ul className="space-y-2.5 pt-4">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs text-gray-300">
                          <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => showToast(`Seleccionaste el plan: ${plan.name}`)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition transform hover:scale-105"
                  >
                    {plan.buttonText || 'Elegir Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CMS / Admin Panel */}
        {currentTab === 'admin' && currentUser.role === 'admin' && (
          <div className="px-6 lg:px-16 pt-6 space-y-8 max-w-7xl mx-auto">
            <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Shield className="text-amber-400" size={24} />
                  <h1 className="text-2xl font-black text-white tracking-wider">PANEL DE ADMINISTRACIÓN (CMS)</h1>
                </div>
                <p className="text-xs text-gray-400 mt-1">Gestiona todo el sitio web: Videos de YouTube, Marca, Universos y Suscripciones.</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 rounded-xl text-xs font-bold flex items-center space-x-2 transition"
                >
                  <RefreshCw size={14} />
                  <span>Restablecer Fábrica</span>
                </button>

                <button
                  onClick={() => setCurrentTab('home')}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold transition"
                >
                  Ver Plataforma
                </button>
              </div>
            </div>

            <div className="flex border-b border-gray-800 space-x-6 overflow-x-auto">
              <button
                onClick={() => setAdminActiveTab('videos')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition ${adminActiveTab === 'videos' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <Video size={16} />
                <span>Catálogo de Videos ({videos.length})</span>
              </button>

              <button
                onClick={() => setAdminActiveTab('brands')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition ${adminActiveTab === 'brands' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <Layers size={16} />
                <span>Universos / Marcas</span>
              </button>

              <button
                onClick={() => setAdminActiveTab('branding')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition ${adminActiveTab === 'branding' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <Settings size={16} />
                <span>Branding & Ajustes</span>
              </button>

              <button
                onClick={() => setAdminActiveTab('plans')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition ${adminActiveTab === 'plans' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <CreditCard size={16} />
                <span>Planes & Suscripción</span>
              </button>

              <button
                onClick={() => setAdminActiveTab('users')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition ${adminActiveTab === 'users' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <Users size={16} />
                <span>Usuarios Registrados</span>
              </button>
            </div>

            {/* Videos Tab */}
            {adminActiveTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-extrabold text-white">Videos en Plataforma ({videos.length})</h2>
                    <p className="text-xs text-gray-400">Agrega, edita o elimina videos compatibles con YouTube</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {videos.length > 0 && (
                      <button
                        onClick={handleClearAllVideos}
                        className="px-3.5 py-2.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-800/50 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                        title="Eliminar todos los videos del catálogo"
                      >
                        <Trash2 size={14} />
                        <span>Borrar Catálogo</span>
                      </button>
                    )}
                    <button
                      onClick={() => setEditingVideo({
                        title: '',
                        type: 'movie',
                        brand: 'disney',
                        genre: 'Acción',
                        year: '2026',
                        rating: 'ATP',
                        duration: '1h 30m',
                        description: '',
                        bannerUrl: '',
                        posterUrl: '',
                        youtubeUrl: '',
                        featured: false,
                        trending: false
                      })}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg"
                    >
                      <Plus size={16} />
                      <span>Añadir Nuevo Video</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map(video => (
                    <div key={video.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex space-x-4">
                      <img src={getVideoPoster(video)} alt={video.title} className="w-20 h-28 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-extrabold text-blue-400 uppercase">{video.brand} • {video.type}</span>
                          <h3 className="text-sm font-bold text-white line-clamp-1">{video.title}</h3>
                          <p className="text-[10px] text-gray-400 line-clamp-1">{video.genre}</p>
                          <div className="mt-1 flex items-center space-x-1">
                            {video.featured && <span className="text-[9px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded">Destacado</span>}
                            {video.trending && <span className="text-[9px] bg-indigo-900/60 text-indigo-300 px-1.5 py-0.5 rounded">Tendencia</span>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                          <button
                            onClick={() => setActiveVideoModal(video)}
                            className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition"
                            title="Probar reproducción"
                          >
                            <Play size={14} />
                          </button>
                          <button
                            onClick={() => setEditingVideo(video)}
                            className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition"
                            title="Editar video"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(video)}
                            className="p-2 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/40 rounded-lg transition"
                            title="Eliminar este video"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Brands Tab */}
            {adminActiveTab === 'brands' && (
              <div className="space-y-6">
                <h2 className="text-base font-extrabold text-white">Universos Personalizados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brands.map(b => (
                    <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
                      <div className="h-16 rounded-lg overflow-hidden relative flex items-center justify-center">
                        <img src={getBrandBg(b)} alt={b.name} className="w-full h-full object-cover opacity-50 absolute inset-0" />
                        <span className="relative font-black text-white text-lg uppercase tracking-widest">{b.logoText}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-bold">{b.name}</span>
                        <button 
                          onClick={() => setEditingBrand(b)}
                          className="px-3 py-1 bg-gray-800 hover:bg-blue-600 text-white rounded transition"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Branding Tab */}
            {adminActiveTab === 'branding' && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6 max-w-2xl">
                <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Palette size={18} className="text-blue-500" />
                  <span>Personalización Global de la Plataforma</span>
                </h2>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Nombre Principal del Sitio</label>
                    <input
                      type="text"
                      value={branding.siteName}
                      onChange={e => setBranding({ ...branding, siteName: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Sufijo del Nombre</label>
                    <input
                      type="text"
                      value={branding.siteSuffix}
                      onChange={e => setBranding({ ...branding, siteSuffix: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <ImageInputWithUpload
                    label="Logo Personalizado del Sitio"
                    value={branding.logoUrl}
                    onChange={(url) => setBranding({ ...branding, logoUrl: url })}
                  />

                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Texto Legal del Pie de Página</label>
                    <textarea
                      rows={3}
                      value={branding.footerText}
                      onChange={e => setBranding({ ...branding, footerText: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => showToast('Configuración del sitio guardada')}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </div>
            )}

            {/* Plans Tab */}
            {adminActiveTab === 'plans' && (
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map(p => (
                  <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-4">
                    <h3 className="font-bold text-white text-sm">{p.name}</h3>
                    <p className="text-2xl font-black text-blue-400">{p.price} <span className="text-xs text-gray-400">/{p.period}</span></p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {p.features.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setEditingPlan(p)}
                      className="w-full py-2 bg-gray-800 hover:bg-blue-600 text-white text-xs font-bold rounded transition"
                    >
                      Modificar Plan
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Users Tab */}
            {adminActiveTab === 'users' && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-950 text-gray-400 font-bold border-b border-gray-800">
                    <tr>
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Rol</th>
                      <th className="p-3">Plan</th>
                      <th className="p-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-800/50">
                        <td className="p-3 font-bold text-white">{u.name}</td>
                        <td className="p-3 text-gray-400">{u.email}</td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-blue-500/20 text-blue-400'}`}>{u.role}</span></td>
                        <td className="p-3 text-gray-300">{u.tier}</td>
                        <td className="p-3 text-green-400 font-bold">{u.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0b0810] border-t border-gray-800/60 py-8 px-6 text-center text-xs text-gray-500 space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 font-medium">
          {branding.footerLinks.map((link, idx) => (
            <span key={idx} className="hover:text-white cursor-pointer transition">{link}</span>
          ))}
        </div>
        <p className="max-w-2xl mx-auto leading-relaxed">{branding.footerText}</p>
      </footer>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <CustomDisneyPlayer 
          video={activeVideoModal} 
          onClose={() => setActiveVideoModal(null)} 
          isInWatchlist={watchlist.includes(activeVideoModal.id)}
          onToggleWatchlist={toggleWatchlist}
          nextVideo={videos.length > 1 ? videos[(videos.findIndex(v => v.id === activeVideoModal.id) + 1) % videos.length] : undefined}
          onSelectNextVideo={(next) => setActiveVideoModal(next)}
        />
      )}

      {/* Admin Login Modal */}
      {adminLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161926] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setAdminLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
                <Shield size={24} />
              </div>
              <h2 className="text-xl font-black text-white">Acceso Administrador</h2>
              <p className="text-xs text-gray-400">Inicia sesión para gestionar todo el contenido de la plataforma.</p>
              <div className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-[11px] text-gray-300">
                <p>Credenciales de acceso rápido:</p>
                <p className="font-mono text-blue-400">admin@disney.com / admin123</p>
              </div>
            </div>

            {adminError && (
              <div className="p-3 bg-red-900/30 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="admin@disney.com"
                  value={adminCredentials.email}
                  onChange={e => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminCredentials.password}
                  onChange={e => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Video Create/Edit Modal with Realtime YouTube Preview */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161926] border border-gray-800 rounded-2xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative my-8">
            <button 
              onClick={() => setEditingVideo(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-black text-white">
              {editingVideo.id ? 'Editar Video' : 'Nuevo Video'}
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-gray-400 font-bold">Título</label>
                  {editingVideo.title && (
                    <button
                      type="button"
                      onClick={() => setEditingVideo({ ...editingVideo, title: '' })}
                      className="text-[10px] text-red-400 hover:text-red-300 flex items-center space-x-1 font-bold transition"
                      title="Borrar título"
                    >
                      <Trash2 size={11} />
                      <span>Borrar</span>
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={editingVideo.title || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })}
                    placeholder="Ej. The Mandalorian"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 pr-8 text-white focus:border-blue-500 focus:outline-none"
                  />
                  {editingVideo.title && (
                    <button
                      type="button"
                      onClick={() => setEditingVideo({ ...editingVideo, title: '' })}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      title="Borrar texto"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-gray-400 font-bold mb-1">Tipo</label>
                  <select
                    value={editingVideo.type || 'movie'}
                    onChange={e => setEditingVideo({ ...editingVideo, type: e.target.value as 'movie' | 'series' })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="movie">Película</option>
                    <option value="series">Serie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1">Universo</label>
                  <select
                    value={editingVideo.brand || 'disney'}
                    onChange={e => setEditingVideo({ ...editingVideo, brand: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {brands.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1">Año</label>
                  <input
                    type="text"
                    value={editingVideo.year || '2026'}
                    onChange={e => setEditingVideo({ ...editingVideo, year: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1">Duración</label>
                  <input
                    type="text"
                    value={editingVideo.duration || '1h 30m'}
                    onChange={e => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* YouTube URL or Embed field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-gray-400 font-bold">Enlace de YouTube, ID o código &lt;iframe...&gt;</label>
                  <div className="flex items-center space-x-2">
                    {editingVideo.youtubeUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingVideo({ ...editingVideo, youtubeUrl: '' });
                          showToast('Enlace de YouTube borrado');
                        }}
                        className="text-[10px] text-red-400 hover:text-red-300 flex items-center space-x-1 font-bold transition px-2 py-0.5 rounded bg-red-950/40 border border-red-800/40"
                        title="Borrar enlace de YouTube"
                      >
                        <Trash2 size={11} />
                        <span>Borrar enlace</span>
                      </button>
                    )}
                    <Code size={14} className="text-blue-400" />
                  </div>
                </div>
                <textarea
                  rows={2}
                  placeholder='Pega una URL normal (https://www.youtube.com/watch?v=...), o enlace corto (https://youtu.be/...), o el código <iframe...>'
                  value={editingVideo.youtubeUrl || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white font-mono text-[11px] focus:border-blue-500 focus:outline-none"
                />

                {/* Real-time YouTube parsing badge and preview */}
                {editPreviewParsed && (
                  <div className="mt-2 p-2.5 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editPreviewParsed.videoId ? (
                        <>
                          <CheckCircle size={15} className="text-green-400" />
                          <span className="text-gray-300 font-semibold">Video ID detectado:</span>
                          <span className="font-mono text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">{editPreviewParsed.videoId}</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={15} className="text-amber-400" />
                          <span className="text-gray-400">Verifica el enlace o código embed de YouTube</span>
                        </>
                      )}
                    </div>
                    {editPreviewParsed.directUrl && (
                      <a 
                        href={editPreviewParsed.directUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                      >
                        <span>Probar enlace</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ImageInputWithUpload
                  label="Póster Vertical"
                  value={editingVideo.posterUrl || ''}
                  onChange={(url) => setEditingVideo({ ...editingVideo, posterUrl: url })}
                />

                <ImageInputWithUpload
                  label="Banner Horizontal"
                  value={editingVideo.bannerUrl || ''}
                  onChange={(url) => setEditingVideo({ ...editingVideo, bannerUrl: url })}
                />
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-1">Género(s)</label>
                <input
                  type="text"
                  placeholder="Ej. Ciencia Ficción / Aventura"
                  value={editingVideo.genre || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, genre: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-gray-400 font-bold">Descripción</label>
                  {editingVideo.description && (
                    <button
                      type="button"
                      onClick={() => setEditingVideo({ ...editingVideo, description: '' })}
                      className="text-[10px] text-red-400 hover:text-red-300 flex items-center space-x-1 font-bold transition"
                      title="Borrar descripción"
                    >
                      <Trash2 size={11} />
                      <span>Borrar</span>
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={editingVideo.description || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.featured || false}
                    onChange={e => setEditingVideo({ ...editingVideo, featured: e.target.checked })}
                    className="rounded bg-gray-950 border-gray-800 text-blue-600 focus:ring-0"
                  />
                  <span className="text-gray-300 font-bold">Destacado en Carrusel Principal</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.trending || false}
                    onChange={e => setEditingVideo({ ...editingVideo, trending: e.target.checked })}
                    className="rounded bg-gray-950 border-gray-800 text-blue-600 focus:ring-0"
                  />
                  <span className="text-gray-300 font-bold">En Tendencias</span>
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  {editingVideo.id && (
                    <button
                      type="button"
                      onClick={() => {
                        const v = videos.find(item => item.id === editingVideo.id) || (editingVideo as VideoItem);
                        handleDeleteVideo(v);
                      }}
                      className="px-4 py-2 bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-white border border-red-800/60 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition"
                      title="Eliminar este video del catálogo"
                    >
                      <Trash2 size={14} />
                      <span>Eliminar este video</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setEditingVideo({
                        id: editingVideo.id,
                        title: '',
                        type: editingVideo.type || 'movie',
                        brand: editingVideo.brand || 'disney',
                        genre: '',
                        year: '2026',
                        rating: 'ATP',
                        duration: '',
                        description: '',
                        bannerUrl: '',
                        posterUrl: '',
                        youtubeUrl: '',
                        featured: false,
                        trending: false
                      });
                      showToast('Campos del formulario borrados');
                    }}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                    title="Borrar todos los campos del formulario"
                  >
                    <RotateCcw size={13} />
                    <span>Borrar campos</span>
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingVideo(null)}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl font-bold hover:bg-gray-700 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveVideo(editingVideo)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition"
                  >
                    Guardar Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Edit Modal */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161926] border border-gray-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setEditingBrand(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-black text-white">Editar Universo / Marca</h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 font-bold mb-1">Nombre</label>
                <input
                  type="text"
                  value={editingBrand.name}
                  onChange={e => setEditingBrand({ ...editingBrand, name: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-1">Texto del Logo</label>
                <input
                  type="text"
                  value={editingBrand.logoText}
                  onChange={e => setEditingBrand({ ...editingBrand, logoText: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <ImageInputWithUpload
                label="Fondo del Universo"
                value={editingBrand.bgImage}
                onChange={(url) => setEditingBrand({ ...editingBrand, bgImage: url })}
              />

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setEditingBrand(null)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setBrands(brands.map(b => b.id === editingBrand.id ? editingBrand : b));
                    setEditingBrand(null);
                    showToast('Universo actualizado');
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg"
                >
                  Guardar Universo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Edit Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161926] border border-gray-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setEditingPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-black text-white">Modificar Plan de Suscripción</h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 font-bold mb-1">Nombre del Plan</label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={e => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-1">Precio</label>
                <input
                  type="text"
                  value={editingPlan.price}
                  onChange={e => setEditingPlan({ ...editingPlan, price: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
                    setEditingPlan(null);
                    showToast('Plan de suscripción actualizado');
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg"
                >
                  Guardar Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
