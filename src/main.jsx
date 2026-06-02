import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import { Camera, Download, ImageUp, RotateCcw, Sparkles, Star } from 'lucide-react';
import './styles.css';

const types = [
  '조화로운 나선형',
  '피보나치 감성형',
  '황금직사각형형',
  '균형 설계자형',
  '빛나는 대칭형',
  '부드러운 곡선형',
  '비례 탐험가형',
  '감각적 프레임형',
  '수학적 아우라형',
  '우아한 리듬형',
  '정교한 컴퍼스형',
  '미소 방정식형',
  '포토그래픽 균형형',
  '나선 관찰자형',
  '비율 큐레이터형',
  '골든 스튜디오형'
];

function pickResult(fileName = '') {
  const seed = [...fileName].reduce((sum, char) => sum + char.charCodeAt(0), 2026);
  const ratio = (1.54 + (seed % 16) / 100).toFixed(2);
  const score = Math.min(98, Math.round(82 + (seed % 17)));
  const type = types[seed % types.length];
  const stars = Math.max(4, Math.round(score / 20));
  return { ratio, score, type, stars };
}

function GoldenOverlay({ compact = false }) {
  return (
    <div className={`golden-overlay ${compact ? 'compact' : ''}`} aria-hidden="true">
      <div className="face-zone">
        <div className="rect rect-a" />
        <div className="rect rect-b" />
        <div className="rect rect-c" />
        <div className="rect rect-d" />
        <svg className="spiral" viewBox="0 0 220 220" preserveAspectRatio="none">
          <path d="M 202 202 C 202 134 149 96 104 104 C 55 113 45 166 75 189 C 111 216 158 195 162 153 C 166 114 131 91 96 101 C 65 110 56 143 73 166 C 94 194 134 184 144 151 C 153 119 126 96 97 104" />
        </svg>
        <span className="ratio-mark top">1</span>
        <span className="ratio-mark side">1.618</span>
      </div>
    </div>
  );
}

function StarRating({ count }) {
  return (
    <div className="stars" aria-label={`별점 ${count}점`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={16} fill={index < count ? 'currentColor' : 'none'} />
      ))}
    </div>
  );
}

function App() {
  const uploadRef = useRef(null);
  const cameraRef = useRef(null);
  const cardRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const result = useMemo(() => pickResult(fileName), [fileName]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (photo) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const resetPhoto = () => {
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(null);
    setFileName('');
    if (uploadRef.current) uploadRef.current.value = '';
    if (cameraRef.current) cameraRef.current.value = '';
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = 'golden-ratio-photo-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="intro">
        <div className="brand-row">
          <span className="brand-badge"><Sparkles size={16} /> PHI LAB</span>
        </div>
        <h1>황금비 포토 연구소</h1>
        <p>수학이 발견한 나만의 조화</p>
      </section>

      <section className="upload-panel">
        <input ref={uploadRef} id="photo-upload" type="file" accept="image/*" onChange={handleFile} />
        <input ref={cameraRef} id="photo-camera" type="file" accept="image/*" capture="user" onChange={handleFile} />
        <button type="button" className="primary-action" onClick={() => uploadRef.current?.click()}>
          <ImageUp size={20} />
          사진 업로드
        </button>
        <button type="button" className="secondary-action" onClick={() => cameraRef.current?.click()}>
          <Camera size={20} />
          촬영하기
        </button>
      </section>

      {photo ? (
        <>
          <section className="preview-card">
            <div className="photo-frame">
              <img src={photo} alt="업로드한 학생 사진" />
              <GoldenOverlay />
            </div>
            <div className="result-grid">
              <div>
                <span>황금비 지수</span>
                <strong>{result.ratio}</strong>
              </div>
              <div>
                <span>황금비 점수</span>
                <strong>{result.score}</strong>
              </div>
              <div className="wide">
                <span>나의 유형</span>
                <strong>{result.type}</strong>
              </div>
            </div>
          </section>

          <section className="photocard-wrap">
            <div ref={cardRef} className="photocard">
              <div className="photocard-photo">
                <img src={photo} alt="포토카드 학생 사진" />
                <GoldenOverlay compact />
              </div>
              <div className="photocard-info">
                <span className="type-pill">{result.type}</span>
                <h2>Golden Ratio Portrait</h2>
                <div className="metric-row">
                  <span>PHI {result.ratio}</span>
                  <span>{result.score}점</span>
                </div>
                <StarRating count={result.stars} />
                <p>2026 부산수학축전</p>
              </div>
            </div>
            <div className="card-actions">
              <button type="button" className="secondary-action icon-action" onClick={resetPhoto}>
                <RotateCcw size={18} />
                다시 선택
              </button>
              <button type="button" className="primary-action icon-action" onClick={saveCard} disabled={isSaving}>
                <Download size={18} />
                {isSaving ? '저장 중' : 'PNG 저장'}
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className="empty-state">
          <div className="sample-face">
            <GoldenOverlay />
          </div>
          <p>사진을 선택하면 중앙 얼굴 영역에 황금직사각형과 황금나선이 표시됩니다.</p>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
