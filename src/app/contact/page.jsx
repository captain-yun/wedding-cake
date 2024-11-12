export default function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <input type="text" placeholder="이름" />
        <input type="email" placeholder="이메일" />
        <textarea placeholder="메시지를 입력하세요"></textarea>
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}
