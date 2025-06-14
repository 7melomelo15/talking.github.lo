'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const comedians = [
    { name: '俊', image: '/model_a.jpg', followers: '243K' },
    { name: 'ぽんまい', image: '/model_h.jpg', followers: '109K' },
    { name: 'たくみ', image: '/model_e.jpg', followers: '77K' },
    { name: 'タツキ', image: '/model_f.jpg', followers: '53K' },
    { name: '康心', image: '/model_g.jpg', followers: '21K' },
    { name: 'Koshiro', image: '/model_c.jpg', followers: '5K' },
  ];

  const callTitles: { [name: string]: string } = {
    '俊': '今夜も全力！ツッコミ祭り',
    'ぽんまい': '朝から元気！テンション↑↑',
    'たくみ': 'ゆるっと弟キャラとおしゃべり',
    'タツキ': '深夜の笑い話、聞く？',
    '康心': 'ボケとツッコミどっちもOK！',
    'Koshiro': '女子トークで盛り上がろ！'
  };

  const [index, setIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % comedians.length);
      setIsLiked(false);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    touchEndX.current = e.changedTouches[0].clientX;

    const diffY = touchStartY.current - touchEndY.current;
    const diffX = touchStartX.current - touchEndX.current;

    if (Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 50) {
        // 上スワイプ → アニメーションして遷移
        const page = document.getElementById('slide-page');
        if (page) {
          page.classList.add('animate-slide-up');
          setTimeout(() => {
            router.push('/home_second');
          }, 300);
        }
      }
    } else {
      if (diffX > 50) {
        setIndex((index + 1) % comedians.length);
        setIsLiked(false);
      }
      if (diffX < -50) {
        setIndex((index - 1 + comedians.length) % comedians.length);
        setIsLiked(false);
      }
    }
  };

  const selected = comedians[index];

  return (
    <div
      id="slide-page"
      className="relative w-full h-screen overflow-hidden text-white transition-transform duration-300 ease-in-out"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image src={selected.image} alt="背景" fill className="object-cover" />
      </div>

      {/* 上部 UI */}
<div className="absolute top-2 left-0 right-0 flex justify-between items-center px-6 z-10">
  <div className="flex space-x-1">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="w-[6px] h-[6px] rounded-full bg-white" />
    ))}
  </div>
  <span className="text-sm font-semibold text-white/80">ONLINE</span>
  <button
    type="button"
    className="w-8 h-8 z-10"
    onClick={() => setIsLiked(!isLiked)}
  >
    <Image
      src={isLiked ? '/good_red.png' : '/good.png'}
      alt="いいね"
      width={32}
      height={32}
      className="transition-transform duration-200"
    />
  </button>
</div>

      {/* 下グラデーション */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FFA000]/80 to-transparent z-0" />

      {/* 中央プロフィール情報 */}
      <div className="absolute top-[78%] left-5 z-10 flex items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image src={selected.image} alt={selected.name} width={96} height={96} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold leading-snug text-white/80">{callTitles[selected.name]}</h1>
          <div className="flex items-center gap-2 text-lg text-white/80">
            <span>{selected.name}</span>
            <span>{selected.followers} followers</span>
          </div>
        </div>
      </div>

      {/* 再生ボタン */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-26 h-26 rounded-full p-[2px] bg-gradient-to-br from-black/70 via-black/50 to-black/30 shadow-lg flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-black via-neutral-700 to-black flex items-center justify-center shadow-inner overflow-hidden">
            <Image src="/logo_short_b_2.png" alt="再生" width={90} height={90} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
