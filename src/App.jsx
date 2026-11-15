import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div><p className="topline">2026-2 SEMESTER · CS & ECONOMICS</p><h1>My Semester Planner</h1><p className="subtitle">이번 학기 수강 과목을 등록하고 완료 여부를 관리합니다</p></div>
<span className="tag">DOUBLE MAJOR</span>
      </header>
      <CourseList />
      <footer className="bottom"><span>OSS Week 11 · React</span><span>Local state only · Refresh resets data</span></footer>
    </main>
  );
}
