const STEPS = [
  { n: 1, title: "Chọn trang phục",   desc: "Lọc theo dịp, size, giá; xem video thử đồ." },
  { n: 2, title: "Chọn ngày & đặt cọc", desc: "Chọn ngày trên lịch, cọc bằng QR hoặc ví." },
  { n: 3, title: "Nhận & trả đồ",     desc: "Trả đúng hẹn để được hoàn cọc." },
];

export default function Steps() {
  return (
    <section className="steps" aria-label="Quy trình thuê đồ">
      {STEPS.map((s) => (
        <div className="step" key={s.n}>
          <span className="step__num">{s.n}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}