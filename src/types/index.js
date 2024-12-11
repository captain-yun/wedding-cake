// TypeScript가 아니더라도 JSDoc으로 타입 정의 가능
// API 응답, 컴포넌트 props 등의 타입을 중앙 관리


/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {any} data
 */ 