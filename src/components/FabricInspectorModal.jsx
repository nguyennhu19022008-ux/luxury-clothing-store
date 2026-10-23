import React, { useState } from 'react';
import { X, ZoomIn, Sparkles, Check, ArrowRight } from 'lucide-react';

const FABRICS = [
  {
    id: 'cashmere',
    name: 'Cashmere Mông Cổ 14.5 Micron',
    category: 'ÁO KHOÁC & MĂNG TÔ',
    spec: '14.5μm · 2-Ply Weave · 480g/m²',
    origin: 'Nội Mông (Chải tay thủ công mùa xuân)',
    description: 'Sợi len tơ dưới lớp lông ngoài của dê núi Mông Cổ, chỉ thu hoạch vào mùa xuân bằng lược gỗ chải tay. Cực kỳ mềm mại, cách nhiệt gấp 8 lần len thông thường và có độ bóng mờ quý phái.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
    textureImage: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1200&auto=format&fit=crop',
    colorHex: '#D4C4B5',
  },
  {
    id: 'silk',
    name: 'Lụa Tơ Tằm Hà Đông 16 Momme',
    category: 'VÁY DẠ HỘI & SƠ MI LỤA',
    spec: '16 Momme · 100% Raw Mulberry · Hand-dyed',
    origin: 'Làng lụa cổ truyền Vạn Phúc, Hà Đông',
    description: 'Dệt từ sợi tơ tằm dâu tằm tự nhiên 100% không pha trộn sợi tổng hợp. Bề mặt có độ rủ mềm mại như làn nước, thoáng mát vào mùa hạ và giữ nhiệt êm ái vào mùa đông.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop',
    textureImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
    colorHex: '#F0ECE1',
  },
  {
    id: 'merino',
    name: 'Len Lông Cừu Merino Super 130s',
    category: 'QUẦN TÂY & BLAZER MAY ĐO',
    spec: 'Super 130s · 17.2μm · Crease-resistant',
    origin: 'Vùng dệt Biella, Bắc Ý',
    description: 'Sợi len cừu Merino tinh tuyển được chải kỹ lưỡng đạt chỉ số Super 130s, cho cảm giác đứng dáng tuyệt đối nhưng vẫn mềm mại và có khả năng phục hồi nếp nhăn tự nhiên sau khi mặc.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    textureImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop',
    colorHex: '#3D3B38',
  },
];

export const FabricInspectorModal = ({ isOpen, onClose }) => {
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Heavy Glass Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Double-Bezel Modal Container */}
      <div className="relative w-full max-w-5xl bg-luxury-bone/95 backdrop-blur-2xl border border-luxury-sand/80 shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 z-10 animate-fadeUp overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-luxury-sand">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1.5px] bg-luxury-gold inline-block" />
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-luxury-gold uppercase font-bold block">
                Atelier Material Archive /// 2026
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-luxury-dark font-normal">
                Kính Lúp Khảo Cứu Sợi Dệt Thượng Tuyển
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-luxury-sand hover:border-luxury-dark bg-luxury-ivory hover:bg-luxury-dark text-luxury-dark hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Đóng kính lúp khảo cứu"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* 2-Column Widescreen Split 16:9 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8 items-center">
          
          {/* Left: 16:9 Double-Bezel Interactive Visual Lens */}
          <div className="relative w-full">
            <div className="p-2.5 bg-luxury-ivory/60 rounded-3xl border border-luxury-sand/80 shadow-xl">
              <div className="aspect-[16/9] w-full rounded-[calc(1.5rem-0.625rem)] overflow-hidden relative bg-neutral-900 group satin-sheen-box">
                <img
                  src={selectedFabric.textureImage}
                  alt={selectedFabric.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
                
                {/* Floating Specs Pill */}
                <div className="absolute top-3 left-3 bg-luxury-dark/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono text-luxury-gold tracking-wider uppercase rounded-full">
                  {selectedFabric.spec}
                </div>

                {/* Zoom Controller Pill */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-luxury-bone/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-luxury-sand shadow-md">
                  <ZoomIn className="w-3.5 h-3.5 text-luxury-dark" />
                  <button
                    onClick={() => setZoomLevel((prev) => (prev >= 2 ? 1 : prev + 0.5))}
                    className="text-[10px] font-mono tracking-wider font-bold text-luxury-dark uppercase cursor-pointer"
                  >
                    Độ phóng đại: {zoomLevel}x
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Fabric Details & Switcher */}
          <div className="flex flex-col space-y-6">
            
            {/* Fabric Tabs */}
            <div className="flex flex-wrap gap-2">
              {FABRICS.map((fabric) => {
                const isActive = fabric.id === selectedFabric.id;
                return (
                  <button
                    key={fabric.id}
                    onClick={() => {
                      setSelectedFabric(fabric);
                      setZoomLevel(1);
                    }}
                    className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all rounded-full border cursor-pointer ${
                      isActive
                        ? 'bg-luxury-dark text-luxury-bone border-luxury-dark shadow-sm'
                        : 'bg-luxury-ivory text-luxury-muted border-luxury-sand hover:border-luxury-dark/60'
                    }`}
                  >
                    {fabric.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Selected Fabric Content */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-luxury-muted uppercase">
                {selectedFabric.category}
              </span>
              <h3 className="font-serif text-2xl text-luxury-dark font-medium">
                {selectedFabric.name}
              </h3>
              <p className="font-sans text-sm text-luxury-charcoal leading-relaxed text-pretty">
                {selectedFabric.description}
              </p>
            </div>

            {/* Technical Parameters */}
            <div className="pt-4 border-t border-luxury-sand space-y-2 text-xs font-sans">
              <div className="flex items-center justify-between">
                <span className="text-luxury-muted">Vùng nguyên liệu:</span>
                <span className="font-medium text-luxury-dark">{selectedFabric.origin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-luxury-muted">Tiêu chuẩn kỹ thuật:</span>
                <span className="font-mono text-luxury-gold font-bold">{selectedFabric.spec}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-luxury-sand flex items-center justify-between text-xs text-luxury-muted font-sans">
          <span>Cam kết 100% sợi tự nhiên nguyên chất, không pha trộn sợi tổng hợp.</span>
          <span className="font-mono text-[11px] text-luxury-gold uppercase font-bold">Maison Vuonggia Atelier</span>
        </div>

      </div>
    </div>
  );
};
