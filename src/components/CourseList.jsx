import { useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState(initialCourses);
  const [error, setError] = useState('');
  const [newName, setNewName] = useState('');

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  // TODO 1 (필수): 과목 추가 기능을 구현하세요.
  function handleAdd(event) {
    event.preventDefault();
    if (newName.trim() === '') {
      setError('과목명을 입력해주세요.');
      return;
    }
    const newCourse = {
      id: Date.now(),
      name: newName.trim(),
      category: 'Major',
      completed: false,
    };
    setCourses(previous => [...previous, newCourse]);
    setNewName('');
    setError('');
  }

  // TODO 2 (필수): 완료 상태 변경 기능을 구현하세요.
  function handleToggle(id) {
    setCourses(previous =>
      previous.map(course =>
        course.id === id ? { ...course, completed: !course.completed } : course
      )
    );
  }
// 선택 기능: 검색 + 완료/미완료 필터
// courses는 그대로 두고 화면에 보여줄 목록만 따로 만든다
  const filteredCourses = courses.filter(course => {
    const matchName = course.name.includes(keyword);
    if (filter === 'done') return matchName && course.completed;
    if (filter === 'todo') return matchName && !course.completed;
    return matchName;
  });
  const doneCount = courses.filter(course => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>
      <section className="panel">
        <div className="panel-header"><h2>My Courses</h2><span className="small-note">{courses.length} courses</span></div>
        <form className="add-form" onSubmit={handleAdd}>
          <input className="input" value={newName} onChange={event => setNewName(event.target.value)} placeholder="새 과목명을 입력하세요" aria-label="새 과목명" />
          <button className="btn primary" type="submit">+ Add Course</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="tools">
          <input className="input" value={keyword} onChange={event => setKeyword(event.target.value)} placeholder="과목명 검색" />
          <select className="input select" value={filter} onChange={event => setFilter(event.target.value)}>
            <option value="all">전체</option>
            <option value="done">완료</option>
            <option value="todo">미완료</option>
          </select>
        </div>
        <div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
        {filteredCourses.length === 0 && <div className="empty">표시할 과목이 없습니다.</div>}
        {filteredCourses.map(course => (
          <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </section>
    </>
  );
}