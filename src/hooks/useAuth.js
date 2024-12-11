// 인증 관련 로직
export function useAuth() {
  const [user, setUser] = useState(null);
  // 인증 로직...
  return { user, login, logout };
}

// 폼 관련 로직
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  // 폼 핸들링 로직...
  return { values, handleChange };
} 